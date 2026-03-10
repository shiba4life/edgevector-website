# EdgeVector Roadmap

This document tracks the foundation-level roadmap across all EdgeVector repositories.

---

## Phase 0: Foundation (Complete)

What's built and working today.

- [x] **FoldDB core database** — schema system, field-level types, Sled storage, encrypted-at-rest (AES-256-GCM via HKDF-SHA256)
- [x] **AI-powered ingestion** — file-to-JSON conversion via OpenRouter/Ollama, natural language query, schema inference
- [x] **file_to_json crate** — published to crates.io (v0.4.0), supports CSV, JSON, YAML, TOML, PDF, images
- [x] **Cloud deployment** — AWS CDK infrastructure, 3 Rust Lambda functions, 11 DynamoDB tables, S3, CloudFront, API Gateway
- [x] **Multi-tenant isolation** — user_hash-based partitioning across DynamoDB and S3
- [x] **Ed25519 node identity** — keypair generation for node identity
- [x] **Web UI** — React frontend for local FoldDB interaction
- [x] **CI/CD** — GitHub Actions across fold_db, fold_db_node, exemem-infra, file_to_json
- [x] **Formal access control model** — trust distance, capability tokens, payment gates, security labels (fold_db_core)
- [x] **Design documentation** — architecture decisions, authorization flow, data access model

---

## Phase 1: Core Access Control Integration (Current)

Integrate the formal access control model from fold_db_core into the production FoldDB database.

- [ ] **Integrate trust distance graph** — port from fold_db_core into fold_db
- [ ] **Integrate capability tokens** — bounded read/write quotas (WX_k / RX_k)
- [ ] **Integrate security labels** — classification-based access filtering
- [ ] **Integrate payment gates** — linear, exponential, fixed cost models
- [ ] **Field-level access control enforcement** — evaluate all four layers at query time
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

- [ ] **Transform folds** — WASM-based computed views over source schemas
- [ ] **Invertibility verification** — round-trip testing at registration
- [ ] **Lazy evaluation** — compute on read, cache with staleness tracking
- [ ] **Dependency tracking** — invalidate derived data when source changes
- [ ] **Canonical schema standards** — define standard schemas for common data types (posts, media, contacts, health)
- [ ] **Schema similarity detection** — prevent duplicate schemas across the ecosystem

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
| Access control | Trust distance + capabilities + labels + payment | Implemented in fold_db_core, not integrated into fold_db |
| App access | Scoped JWTs + encrypted requests | Basic API key auth |
| Transform views | WASM-based computed folds | Design doc only |
| Multi-device | Encrypted config blob on Exemem | Not implemented |
| Delta scanner | Incremental indexing with filesystem events | Not implemented |
