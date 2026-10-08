#!/bin/sh
# Genera public/og-es.png y public/og-en.png desde tools/og.html con Chrome headless.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
for lang in es en; do
  "$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1200,630 \
    --virtual-time-budget=5000 --screenshot="public/og-$lang.png" "file://$PWD/tools/og.html?lang=$lang" 2>/dev/null
  echo "public/og-$lang.png"
done
