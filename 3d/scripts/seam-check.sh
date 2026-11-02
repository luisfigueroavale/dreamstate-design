#!/bin/sh
# Does the loop close? Renders frame 1 and frame N+1 at the clay preset
# and prints how alike they are. PSNR of "inf" or above about 40 dB means
# the two frames match and the loop has no jump.
#   3d/scripts/seam-check.sh <scene> <frames per loop>
set -eu
SCENE=${1:?scene}; N=${2:?frames per loop}
BLENDER=${BLENDER:-blender}
OUT="work/3d/$SCENE/seam"; mkdir -p "$OUT"
for F in 1 $((N + 1)); do
  "$BLENDER" -b --factory-startup -P "3d/scenes/$SCENE/build.py" -- --preset clay --frame "$F" --still "$OUT/f$F.png" >/dev/null
done
ffmpeg -v info -i "$OUT/f1.png" -i "$OUT/f$((N + 1)).png" -lavfi psnr -f null - 2>&1 | grep -o "average:[^ ]*"
