#!/bin/sh
# Frames to an H.264 MP4 that plays in browsers and social apps.
#   3d/scripts/to-mp4.sh <frames dir> <out.mp4> [fps=12] [loops=3]
# A short loop is repeated so the clip lasts long enough to read.
set -eu
DIR=${1:?frames dir}; OUT=${2:?out.mp4}; FPS=${3:-12}; LOOPS=${4:-3}
ffmpeg -v error -y -stream_loop $((LOOPS - 1)) -framerate "$FPS" -i "$DIR/%04d.png" \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -preset slow -movflags +faststart \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "$OUT"
ls -lh "$OUT"
