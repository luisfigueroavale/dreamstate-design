#!/bin/bash
# Usage: encode.sh <frames_dir> <out_basename> [fps=15]
# frames_dir holds f0000.png, f0001.png ... (1080x1350). Writes <out>.gif (720x900) and <out>.mp4 (1080x1350).
# Why both: GIF is the shareable preview; some uploaders (Dreamstate media API) reject GIF bytes, MP4 always works.
set -e
D="$1"; OUT="$2"; FPS="${3:-15}"
ffmpeg -loglevel error -y -framerate "$FPS" -i "$D/f%04d.png" \
  -vf "scale=720:900:flags=lanczos,split[a][b];[a]palettegen=max_colors=256:stats_mode=diff[p];[b][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle" \
  -loop 0 "$OUT.gif"
# If the GIF is over ~4 MB, re-encode with fewer colours and ordered dithering.
if [ "$(stat -f%z "$OUT.gif" 2>/dev/null || stat -c%s "$OUT.gif")" -gt 4000000 ]; then
  ffmpeg -loglevel error -y -framerate "$FPS" -i "$D/f%04d.png" \
    -vf "scale=720:900:flags=lanczos,split[a][b];[a]palettegen=max_colors=160:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" \
    -loop 0 "$OUT.gif"
fi
ffmpeg -loglevel error -y -framerate "$FPS" -i "$D/f%04d.png" -vf "scale=1080:1350,format=yuv420p" \
  -c:v libx264 -crf 20 -movflags +faststart "$OUT.mp4"
ls -la "$OUT.gif" "$OUT.mp4"
