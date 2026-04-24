#!/bin/bash
# Copy .md docs from workspace into public/ so the website can fetch them at runtime.
# Source of truth is always the .md files in docs/ — this just makes them serveable.
#
# On Vercel (or any CI where the parent workspace doesn't exist), the committed
# public/docs/ is used as-is — we skip the copy so we don't delete it.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SITE_DIR="$(dirname "$SCRIPT_DIR")"
WORKSPACE="$(dirname "$SITE_DIR")"
DEST="$SITE_DIR/public/docs"

if [ ! -d "$WORKSPACE/docs" ]; then
  echo "Workspace docs/ not found — using committed public/docs/ as-is."
  exit 0
fi

rm -rf "$DEST"
mkdir -p "$DEST/product" "$DEST/design" "$DEST/corporate" "$DEST/progress"

# Product docs
cp "$WORKSPACE/docs/product/PITCH_DECK.md" "$DEST/product/"
cp "$WORKSPACE/docs/product/WHITEPAPER.md" "$DEST/product/"
cp "$WORKSPACE/docs/product/PRD.md" "$DEST/product/"

# Design docs
cp "$WORKSPACE/docs/design/SYSTEMS_OVERVIEW.md" "$DEST/design/"

# Corporate
cp "$WORKSPACE/docs/corporate/nonprofit_edge_vector_foundation.md" "$DEST/corporate/"
cp "$WORKSPACE/docs/corporate/filing_checklist.md" "$DEST/corporate/"
cp "$WORKSPACE/docs/corporate/articles_of_incorporation.md" "$DEST/corporate/"
cp "$WORKSPACE/docs/corporate/bylaws.md" "$DEST/corporate/"
cp "$WORKSPACE/docs/corporate/conflict_of_interest_policy.md" "$DEST/corporate/"
cp "$WORKSPACE/docs/corporate/patent_vectorized_discovery.md" "$DEST/corporate/"
cp "$WORKSPACE/docs/corporate/patent_vectorized_discovery.pdf" "$DEST/corporate/"
cp "$WORKSPACE/docs/corporate/patent_schema_canonical_service.md" "$DEST/corporate/"
cp "$WORKSPACE/docs/corporate/patent_schema_canonical_service.pdf" "$DEST/corporate/"
cp "$WORKSPACE/docs/corporate/patent_verified_wasm_execution.pdf" "$DEST/corporate/"

# Progress
cp "$WORKSPACE/docs/progress/roadmap.md" "$DEST/progress/"


echo "Copied docs to $DEST"
