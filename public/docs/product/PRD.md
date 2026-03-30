# Product Requirements Document (PRD)

## Product

**FoldDB**

## Organization

**Edge Vector Foundation** (non-profit)
with a **for-profit subsidiary** building commercial products.

---

# Problem Statement

Modern AI assistants can reason about code or documents, but they **cannot safely understand a user's entire data corpus**.

Current limitations:

* Cloud AI requires **uploading private data**
* File systems are **not structured for AI retrieval**
* AI tools operate on **individual documents or repos**, not a personal knowledge corpus
* Local models lack **structured indexing systems**

Users need:

> A local system that turns their entire drive into a database that AI can reason over.

---

# Target Users

**Primary users (v1)**

Technical professionals:

* Software engineers
* Researchers
* AI developers
* Security-focused technologists
* Advanced knowledge workers

Characteristics:

* Comfortable with command line tools
* Interested in local AI
* Concerned about data privacy

---

# Product Vision

FoldDB converts a user's local storage into an **AI-queryable knowledge database** while preserving full local control.

The system:

* indexes files across formats
* creates structured retrieval layers
* exposes an API to local AI models
* ensures **data never leaves the machine**

---

# Core Value Proposition

**AI that knows your data without leaking it.**

---

# Key Features

## Local Knowledge Database

Convert a user's NVMe drive into a structured AI query system.

Capabilities:

* Index documents
* Extract structured metadata
* Generate embeddings
* Provide semantic search

---

## Multi-Filetype Ingestion

Supported types (initial whitelist):

* Markdown
* Text
* Code repositories
* PDFs
* Notes
* JSON
* CSV
* Emails
* Documents

Code ingestion extracts:

* function names
* comments
* docstrings
* file structure

---

## Background Delta Scanner

Daemon process:

* scans for file changes
* performs incremental updates
* re-indexes modified content

---

## AI Query Layer

Expose APIs for AI agents.

Interfaces:

* Local API
* MCP interface

Example usage:

```
query("What documents mention distributed encryption?")
```

---

## Privacy Architecture

* All content stored locally
* Content encrypted end-to-end
* Metadata optionally visible
* Keys encrypted at rest

---

# Installation Experience

Goal: **One-step install**

Workflow:

1. Download app
2. Drag to Applications
3. Launch

---

# First-Time Setup

1. Generate public/private keys
2. Choose default LLM

   * bundled **2B parameter model**
3. Choose ingestion folder

   * suggest home directory
4. Start ingestion
5. Background indexing begins

Users can **chat with AI during indexing**.

---

# P0 Requirements

Must include:

* local indexing
* delta scanning
* AI query API
* chat interface
* key generation
* background ingestion

---

# P1 Features

* Cloud sync / resilience
* Mobile app
* meeting-context suggestions
* shared knowledge graph

---

# Success Metrics

* installation < 2 minutes
* indexing speed > 200k files/hour
* query latency < 1 second
* zero data exfiltration
