#!/bin/sh
# Render one scene headless. Run from the repo root.
#   3d/scripts/render.sh <scene> <clay|review|final> [still|loop|blend] [preview|brand]
# Output goes to work/3d/<scene>/, which git ignores.
set -eu
SCENE=${1:?scene name, for example signal-funnel}
PRESET=${2:-review}
WHAT=${3:-still}
PALETTE=${4:-preview}
BLENDER=${BLENDER:-blender}
SRC="3d/scenes/$SCENE/build.py"
OUT="work/3d/$SCENE"
[ -f "$SRC" ] || { echo "no scene at $SRC" >&2; exit 1; }
mkdir -p "$OUT"
case "$WHAT" in
  still) ARGS="--still $OUT/$PRESET.png" ;;
  loop)  rm -rf "$OUT/frames"; ARGS="--frames $OUT/frames" ;;
  blend) ARGS="--save $OUT/$SCENE.blend" ;;
  *) echo "what must be still, loop or blend" >&2; exit 1 ;;
esac
# shellcheck disable=SC2086
"$BLENDER" -b --factory-startup -P "$SRC" -- --palette "$PALETTE" --preset "$PRESET" $ARGS
