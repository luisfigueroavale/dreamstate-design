#!/bin/sh
# The copied 2D folders read brand.local/ next to their own brand/.
# This links each one to the single brand.local/ at the repo root.
# The links are gitignored. Run from the repo root.
set -eu
[ -d brand.local ] || { echo "brand.local/ is missing at the repo root. Fill it from brand/ first." >&2; exit 1; }
for d in 2d/gtm-team 2d/funnel; do
  [ -e "$d/brand.local" ] || ln -s ../../brand.local "$d/brand.local"
  echo "linked $d/brand.local"
done
