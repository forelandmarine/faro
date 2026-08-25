#!/bin/bash
# Wraps docs/email-signature.html in the MIME headers Apple Mail expects and
# writes docs/faro.mailsignature. The leading HTML comment is stripped so the
# installed file is only the signature markup.
set -euo pipefail

cd "$(dirname "$0")/.."
SRC=docs/email-signature.html
OUT=docs/faro.mailsignature

{
  printf 'Content-Transfer-Encoding: 7bit\n'
  printf 'Content-Type: text/html;\n\tcharset=utf-8\n\n'
  sed '1,/^-->$/d' "$SRC"
} > "$OUT"

echo "Wrote $OUT"
