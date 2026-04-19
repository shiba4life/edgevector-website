# EdgeVector Roadmap

This document tracks the foundation-level roadmap across all EdgeVector repositories.

---

## Phase 0: Foundation (Complete)

What's built and working today.

- [x] **FoldDB core database** — schema system, field-level types, Sled storage, encrypted-at-rest (AES-256-GCM via HKDF-SHA256)
- [x] **AI-powered ingestion** — file-to-JSON conversion via OpenRouter/Ollama/Anthropic, natural language query, schema inference
- [x] **Cloud deployment** — AWS CDK infrastructure, 10+ Rust Lambda functions (layered architecture), S3, CloudFront, API Gateway
- [x] **Multi-tenant isolation** — user_hash-based partitioning across DynamoDB and S3
- [x] **Ed25519 node identity + molecule signing** — every node has a keypair; every molecule write is signed by the writer, providing cryptographic provenance on all data changes
- [x] **Web UI** — React frontend: schemas, queries, mutations, ingestion, AI queries, personas, fingerprints, sharing
- [x] **CI/CD** — GitHub Actions across fold_db, fold_db_node, exemem-infra, schema-infra
- [x] **AccessTier access control** — per-field access tiers (0=Public … 4=Owner); formerly TrustTier (manifesto #4)
- [x] **Passkey / Ed25519 auth** — node activation via Ed25519 keypair, passkey web recovery
- [x] **Design documentation** — architecture decisions, authorization flow, data access model

---

## Phase 1: Core Systems (Current)

Shipped or in progress.

- [x] **AccessTier integration** — three-layer field access (AccessTier, capability tokens, payment gates) in fold_db
- [x] **Cross-user sharing** — share rules as signed molecules, pending invites store, from:{sender} query scans, sync engine auto-refresh (PRs #545–#549)
- [x] **Fingerprints Phase 1–3** — Fingerprint/Persona/Identity schemas; face detection endpoint (`POST /detect-faces`); Identity Card issue/receive/import; auto-polling received cards; QR scanner
- [x] **Schema registry canonical fields** — builtin_canonical_fields seeded at cold start in schema-infra; S3 blob persistence; fastembed Lambda Layer
- [x] **Exemem cloud hardening** — API Gateway throttling, CORS wildcard fix, session token drift tightening, ApiError standardization, API key revocation isolation
- [x] **Lambda architecture refactor** — org_service split, storage_admin_service split, exemem_common consolidation, data-driven CDK Lambda config
- [ ] **Monadic fold evaluation** — all-or-nothing semantics, uniform `Nothing` on failure
- [ ] **Complete fold_db/fold_db_node split** — finish extracting app layer from fold_db monolith

---

## Phase 2: Passkey Authentication & Key Management

Replace local-secret-based encryption with passkey-derived key hierarchy.

- [ ] **Passkey registration** — WebAuthn-based account creation on Exemem
- [ ] **Argon2id KDF** — derive master key from user passkey (replace current HKDF-SHA256 from local secret)
- [ ] **HKDF key derivation** — content key, metadata key, node private key from master key
- [ ] **Encrypted config blob** — node config (including private key) encrypted with passkey-derived key, stored on Exemem
- [ ] **Node bootstrap** — new device downloads encrypted blob, decrypts with passkey, starts node
- [ ] **Passkey recovery** — iCloud Keychain / Google Password Manager / hardware key backup

---

## Phase 3: E2E Encrypted Relay

Transform Exemem from a read-write service into a dumb encrypted relay.

- [ ] **Client-side request encryption** — apps encrypt requests with node's public key before sending to Exemem
- [ ] **Node-side response encryption** — node encrypts responses with app's public key
- [ ] **Exemem relay mode** — validate JWT, relay ciphertext, enforce mechanical limits (access counts, expiration)
- [ ] **Remove plaintext access** — Exemem no longer reads request/response bodies
- [ ] **Persistent node connections** — Exemem maintains connections to online nodes, routes requests
- [ ] **Audit logging** — access metadata (who, when, quota remaining) without seeing content

---

## Phase 4: Transform Views & Schema Convergence

Computed views over source data. Required before third-party app access — apps need to define their own views over user data rather than being locked into the user's raw schema.

- [x] **Schema similarity detection** — live at schema.folddb.com; fastembed embedding + S3 blob persistence
- [x] **Canonical schema registry** — Phase 1 built-in canonical fields seeded globally (fingerprints, identities)
- [ ] **Transform folds** — WASM-based computed views over source schemas (design doc: `docs/design/transform_views_design.md`)
- [ ] **Invertibility verification** — round-trip testing at registration
- [ ] **Lazy evaluation** — compute on read, cache with staleness tracking
- [ ] **Dependency tracking** — invalidate derived data when source changes
- [ ] **Canonical schema standards** — standard schemas for common types (posts, media, contacts, health)

---

## Phase 5: Third-Party App Access

Enable external applications to access user data through the consent flow. Depends on transform views (Phase 4) so apps can register their own views over user data.

- [ ] **App registry** — DynamoDB table for registered apps (`app_id`, `name`, `redirect_uris`, `owner`)
- [ ] **Consent page** — UI showing permission request + passkey authentication
- [ ] **Scoped JWT issuance** — sign JWT with `user_hash`, `app_id`, `scope`, `exp`
- [ ] **API middleware** — validate JWT, extract context, enforce scope before relay
- [ ] **Developer SDK** — JavaScript/TypeScript SDK for app integration
- [ ] **Permission revocation** — user revokes app access from node, takes effect immediately
- [ ] **Developer dashboard** — register apps, view usage, manage API keys

---

## Phase 6: Data Portability & Ecosystem

- [ ] **Bulk export** — export any fold as structured data
- [ ] **Data deletion** — delete all user data across all stores
- [ ] **Delta scanner** — background incremental indexing with filesystem watchers (FSEvents/inotify)
- [ ] **Webhook subscriptions** — apps subscribe to data changes with user consent
- [ ] **Micropayments** — payment-gated folds for data monetization
- [ ] **Mobile node** — run FoldDB on a phone for always-available access
- [ ] **Multi-node sync** — multiple devices share identity and data via encrypted config blob

---

## Architecture Gap Summary

| Component | Whitepaper | Current State |
|:---|:---|:---|
| Passkey auth | Passkey → Argon2id → HKDF → master key | HKDF-SHA256 from local secret |
| E2E relay | Exemem sees only ciphertext | Exemem sees plaintext |
| Access control | Trust distance + capabilities + labels + payment | AccessTier + capability tokens + payment gates shipped in fold_db; trust distance and security labels not yet implemented |
| App access | Scoped JWTs + encrypted requests | Basic API key auth |
| Transform views | WASM-based computed folds | Design doc only |
| Multi-device | Encrypted config blob on Exemem | Not implemented |
| Delta scanner | Incremental indexing with filesystem events | Not implemented |
