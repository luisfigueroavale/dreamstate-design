#!/bin/sh
# Frames (0001.png, 0002.png, ...) to a looping GIF with one shared palette.
#   3d/scripts/to-gif.sh <frames dir> <out.gif> [width=720] [fps=12]
# Needs ffmpeg. Check the size: aim under about 5 MB, to-check per platform.
set -eu
DIR=${1:?frames dir}; OUT=${2:?out.gif}; W=${3:-720}; FPS=${4:-12}
PAL="${TMPDIR:-/tmp}/ds-palette-$$.png"
ffmpeg -v error -y -framerate "$FPS" -i "$DIR/%04d.png" \
  -vf "scale=$W:-2:flags=lanczos,palettegen=stats_mode=full:reserve_transparent=0" "$PAL"
ffmpeg -v error -y -framerate "$FPS" -i "$DIR/%04d.png" -i "$PAL" \
  -lavfi "scale=$W:-2:flags=lanczos[v];[v][1:v]paletteuse=dither=sierra2_4a" \
  -loop 0 "$OUT"
rm -f "$PAL"
ls -lh "$OUT"
