#!/bin/bash
# Renders the email-signature SVGs to the PNGs served from /sig.
# Icons render at 2x their display size (11px shown, 22px file); the mark
# renders at 144px for a 72px slot. Requires rsvg-convert (brew install librsvg).
set -euo pipefail

cd "$(dirname "$0")"
OUT=../public/sig

for icon in phone mail globe pin; do
  rsvg-convert -w 22 -h 22 "$icon.svg" -o "$OUT/$icon.png"
done

rsvg-convert -w 144 -h 144 mark.svg -o "$OUT/faro-mark.png"

echo "Rendered to $OUT:"
ls -la "$OUT"
