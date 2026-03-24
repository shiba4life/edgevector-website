# Global Transform Registry — Spec

**Date:** 2026-03-23  
**Status:** Draft  
**Repo:** `fold_db_node` (schema_service binary) + `fold_db` (client)

---

## Problem

Views reference WASM transforms by embedding raw bytes. This means:
- No shared, reusable transforms across nodes
- No public verifiability ("anyone can audit the transform code")
- No content-addressable identity for transforms
- No global deduplication (same transform reinvented by every node)

The schema service already does this for schemas (`schema.folddb.com`). The transform registry is the same pattern applied to WASM transforms.

---

## Design

### Core Principle

> Transforms are public. Data is private. Structure and computation are verifiable by anyone.

A transform is:
- **Content-addressed** — `sha256(wasm_bytes)` is its identity
- **Immutable** — once registered, never changes (content-addressed = tamper-evident)
- **Self-describing** — carries input/output type declarations
- **Source-linked** — optionally links to the open-source code it was compiled from

Views reference transforms by hash, not by embedding bytes. The node fetches WASM from the registry on demand and caches locally.

---

## Data Model

### `TransformRecord`

```rust
pub struct TransformRecord {
    /// sha256(wasm_bytes) — the canonical identity
    pub hash: String,
    /// Human-readable name (e.g. "downgrade_medical_to_summary")
    pub name: String,
    /// Semver version string
    pub version: String,
    /// Optional description
    pub description: Option<String>,
    /// Input field types expected by the transform
    pub input_schema: HashMap<String, FieldValueType>,
    /// Output field types produced by the transform
    pub output_schema: HashMap<String, FieldValueType>,
    /// URL to source code (GitHub, etc.) — for verifiability
    pub source_url: Option<String>,
    /// The compiled WASM bytes
    pub wasm_bytes: Vec<u8>,
    /// When registered (Unix timestamp)
    pub registered_at: u64,
    /// Classification assigned by the transform service — not declared by the transform.
    /// The service is the authority; the transform is pure computation (JSON in, JSON out).
    pub assigned_classification: Option<DataClassification>,
}
```

### How `TransformView` Changes

Currently:
```rust
pub struct TransformView {
    pub wasm_transform: Option<Vec<u8>>,  // raw bytes embedded
    ...
}
```

After:
```rust
pub struct TransformView {
    /// sha256 hash referencing registry — fetched on demand
    pub transform_hash: Option<String>,
    /// Fallback: inline bytes (for local/dev use only, not registered)
    #[serde(default)]
    pub wasm_transform: Option<Vec<u8>>,
    ...
}
```

---

## API Endpoints (schema_service)

Mirrors the existing schema service pattern exactly.

### Transforms

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/transforms` | List all transform hashes + names |
| `POST` | `/api/transforms` | Register a new transform |
| `GET` | `/api/transforms/available` | Full transform records (no wasm_bytes) |
| `GET` | `/api/transform/{hash}` | Get transform metadata by hash |
| `GET` | `/api/transform/{hash}/wasm` | Download WASM bytes |
| `POST` | `/api/transforms/verify` | Verify a WASM blob matches a hash |
| `GET` | `/api/transforms/similar/{name}` | Find semantically similar transforms |

### Request/Response

```rust
// POST /api/transforms
pub struct RegisterTransformRequest {
    pub name: String,
    pub version: String,
    pub description: Option<String>,
    /// Queries defining what this transform reads — checked against the schema service.
    /// The service resolves field classifications from these at registration time.
    pub input_queries: Vec<Query>,
    /// Output field types produced by the transform
    pub output_fields: HashMap<String, FieldValueType>,
    pub source_url: Option<String>,
    pub wasm_bytes: Vec<u8>,  // base64 in JSON
    // assigned_classification is computed by the service — not provided by caller
}

// Response
pub struct RegisterTransformResponse {
    pub hash: String,         // computed sha256
    pub record: TransformRecord,
    pub outcome: TransformAddOutcome,
}

pub enum TransformAddOutcome {
    Added,
    AlreadyExists,  // idempotent — same hash already registered
}
```

---

## Node Integration (fold_db / fold_db_node)

### Transform Resolver

New component in `fold_db_node`: `TransformResolver`

```rust
pub struct TransformResolver {
    registry_url: String,
    cache: HashMap<String, Vec<u8>>,  // hash → wasm_bytes, persisted to Sled
}

impl TransformResolver {
    /// Fetch WASM bytes for a transform hash.
    /// 1. Check local Sled cache
    /// 2. Fetch from registry if not cached
    /// 3. Verify sha256(bytes) == hash before caching
    pub async fn resolve(&self, hash: &str) -> Result<Vec<u8>, SchemaError>;
}
```

### View Execution Flow (updated)

```
QueryExecutor::query(view_name)
  → ViewRegistry::get(view_name) → TransformView { transform_hash: Some("abc123...") }
  → TransformResolver::resolve("abc123...")
      → Sled cache hit? → return bytes
      → cache miss → GET /api/transform/abc123.../wasm
      → verify sha256(bytes) == "abc123..."
      → cache to Sled
      → return bytes
  → WasmTransformEngine::execute(bytes, input_data)
  → return typed output
```

**Security**: the node ALWAYS verifies `sha256(fetched_bytes) == transform_hash` before executing. A compromised registry cannot inject malicious WASM — the hash in the view definition is the trust anchor.

---

## Classification Assignment

Classification is a two-phase process at registration time.

### Phase 1 — Input ceiling (from queries)

Transforms declare their inputs as **queries** — the same `Query` type used throughout FoldDB. The schema service resolves field classifications from those queries:

```
input_queries → schema_service.get_field_classifications(schema, fields)
             → input_ceiling = max(all input field classifications)
```

This is the upper bound. A transform that reads HIGH-classified fields cannot produce output *higher* than HIGH. But it might produce output *lower* — if it genuinely discards, aggregates, or anonymizes the sensitive fields.

### Phase 2 — Output floor (via mutual information estimation)

To determine the actual output classification, the service runs the WASM against many synthetic samples and measures **how much information about each input field is preserved in each output field** using mutual information.

#### Theoretical foundation: Data Processing Inequality

For any Markov chain `X → WASM → Y`:

```
I(X_input_field ; Y_output_field) ≤ H(X_input_field)
```

A transform can only discard information, never create new information about its inputs. This gives us a rigorous upper bound — and measuring how much MI is actually preserved tells us the true leakage.

#### Synthetic data generation

Generate N samples (N = 512–1024) per input field, varying each field independently while holding others at a fixed baseline:

```
for each sensitive input field X_i:
    generate N values of X_i drawn from its FieldValueType distribution
    hold all other input fields constant at baseline values
    run WASM on each sample
    collect N output values for each output field Y_j
    estimate I(X_i ; Y_j)
```

Field type → synthetic distribution:
```
String (name/id)    → random alphanumeric, length ~ field's observed entropy
String (text)       → random sentences from fixed vocabulary
Integer             → uniform over plausible range
Float               → Gaussian with plausible mean/std
Boolean             → Bernoulli(0.5)
Array(t)            → length 1–5, each element from distribution(t)
Enum                → uniform over known values
```

#### Mutual information estimation

Since fields are mixed types, use **discretized MI estimation** (bin continuous values, compute histogram-based MI):

```
MI(X_i, Y_j) = Σ_{x,y} p(x,y) · log( p(x,y) / (p(x)·p(y)) )
```

Normalize to get **Normalized Mutual Information (NMI)**:
```
NMI(X_i, Y_j) = I(X_i ; Y_j) / sqrt( H(X_i) · H(Y_j) )
```

NMI ranges 0–1. NMI = 1 means Y_j is a deterministic function of X_i (full passthrough). NMI ≈ 0 means Y_j is independent of X_i (no leakage).

#### Leakage threshold and classification assignment

```
for each output field Y_j:
    leaking_inputs = { X_i : NMI(X_i, Y_j) > θ }
    output_field_classification(Y_j) = max(classification(X_i) for X_i in leaking_inputs)
    if leaking_inputs is empty:
        output_field_classification(Y_j) = LOW  (generated, not derived)

assigned_classification = max(output_field_classification(Y_j) for all Y_j)
```

Threshold θ = 0.1 (configurable). Above θ means the output field carries meaningful information about the input field.

```
Example:
  Inputs:
    MedicalSchema.name         → LOW,  H = 3.2 bits
    MedicalSchema.age          → LOW,  H = 2.8 bits
    MedicalSchema.diagnosis    → HIGH, H = 4.1 bits
    MedicalSchema.rx_list      → HIGH, H = 5.3 bits

  Synthetic run results (NMI matrix):
                      patient_name  age_group  has_condition
    name              0.91          0.02        0.01          ← passthrough
    age               0.03          0.73        0.04          ← bucketed, but meaningful
    diagnosis         0.02          0.01        0.88          ← leaks into has_condition!
    rx_list           0.01          0.02        0.03          ← genuinely stripped

  Output classifications:
    patient_name  → LOW  (NMI > θ only from name)
    age_group     → LOW  (NMI > θ only from age)
    has_condition → HIGH (NMI > θ from diagnosis)

  assigned_classification = HIGH  (correct — diagnosis leaked)

  Better transform that maps diagnosis → boolean bucket:
    has_condition NMI with diagnosis = 0.06  (below θ)
    → assigned_classification = LOW  ✓ (genuine downgrade verified)
```

#### Why NMI over simpler approaches

| Approach | Problem |
|---|---|
| Field name matching | Misses renames, derived fields, embedded values |
| Value equality check | Misses partial leakage, bucketing, encoding |
| Static WASM analysis | Requires WASM expertise, misses runtime behavior |
| NMI over synthetic samples | Catches all of the above; grounded in information theory; black-box |

The key insight: **NMI doesn't care what the transform does internally** — it only measures the statistical relationship between inputs and outputs over many samples. A transform that renames `diagnosis` to `condition` will still show NMI ≈ 0.9 between those fields.

### Final assignment

```
assigned_classification = max(Phase 1 ceiling, Phase 2 output)
```

Phase 2 can lower classification below Phase 1 (genuine downgrade confirmed). Phase 1 is the safety net — if Phase 2 fails (WASM error, insufficient output entropy, too few samples), fall back to the ceiling conservatively.

```rust
pub struct TransformRecord {
    ...
    pub input_ceiling: DataClassification,         // Phase 1: max of all input field classifications
    pub output_classification: DataClassification, // Phase 2: NMI-derived (or ceiling if inconclusive)
    pub nmi_matrix: HashMap<(String, String), f32>, // input_field → output_field → NMI score
    pub classification_verified: bool,             // true if Phase 2 ran with sufficient samples
    pub assigned_classification: DataClassification, // enforced: max(ceiling, output)
    pub sample_count: u32,                         // how many synthetic samples Phase 2 used
}
```

**Tests needed:**
- `test_nmi_passthrough_field_scores_near_one`
- `test_nmi_independent_field_scores_near_zero`
- `test_bucketed_field_shows_partial_mi`
- `test_renamed_high_field_still_detected`
- `test_genuine_downgrade_confirmed_by_nmi`
- `test_phase1_ceiling_used_when_phase2_inconclusive`
- `test_unknown_schema_in_query_fails_registration`
- `test_view_chain_inherits_upstream_classification`

---

## Storage

Schema service already uses Sled. Add two new namespaces:

| Namespace | Key | Value |
|-----------|-----|-------|
| `transform_metadata` | `sha256_hash` | `TransformRecord` (no wasm_bytes) |
| `transform_wasm` | `sha256_hash` | raw WASM bytes |

Separation keeps metadata queries fast and avoids loading WASM into memory unnecessarily.

---

## Deduplication

Same transform registered twice → `AlreadyExists` outcome, same hash returned. Clients should check for existing transforms before uploading. Add a `GET /api/transforms/similar/{name}` endpoint (using the same embedding similarity logic as schemas) to surface near-duplicate transforms.

---

## Implementation Order

1. **`TransformRecord` + storage** in `fold_db_node/src/schema_service/` — new state methods, Sled namespaces
2. **HTTP endpoints** — mirrors schema routes, add to `server.rs`
3. **`TransformResolver`** in `fold_db_node` — cache layer with hash verification
4. **Update `TransformView`** in `fold_db` — `transform_hash` field, keep `wasm_bytes` as fallback
5. **Wire into `QueryExecutor`** — resolve hash → bytes before calling `WasmTransformEngine`
6. **Classification assignment** — service analyzes transform on registration, assigns `DataClassification` to the record; view output inherits this classification
7. **Tests** — unit tests for dedup/hash verification + integration tests for classification downgrade

---

## What This Unlocks

Once built, the full trust chain from your March 10 note becomes possible:

```
Developer publishes transform source (GitHub)
    → Exemem (or anyone) compiles to WASM
    → Registers to Global Transform Registry (content-addressed)
    → User's node fetches WASM by hash
    → Node verifies hash before executing
    → User's data never leaves the node
    → Third party gets only the view output
    → Anyone can audit the transform code
```

Public verifiability without plaintext data exposure.
