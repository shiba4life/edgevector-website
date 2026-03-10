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
mkdir -p "$DEST/design" "$DEST/corporate" "$DEST/progress"

# Top-level docs
cp "$WORKSPACE/docs/PITCH_DECK.md" "$DEST/"
cp "$WORKSPACE/docs/WHITEPAPER.md" "$DEST/"
cp "$WORKSPACE/docs/PRD.md" "$DEST/"

# Design docs
cp "$WORKSPACE/docs/design/DATA_ACCESS_ARCHITECTURE.md" "$DEST/design/"
cp "$WORKSPACE/docs/design/THIRD_PARTY_APP_AUTHORIZATION.md" "$DEST/design/"

# Corporate
cp "$WORKSPACE/docs/corporate/nonprofit_edge_vector_foundation.md" "$DEST/corporate/"

# Progress
cp "$WORKSPACE/docs/progress/roadmap.md" "$DEST/progress/"

echo "Copied docs to $DEST"
