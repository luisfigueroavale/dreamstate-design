# Pipeline: preview, record, encode

Needs: Python 3, ffmpeg, and any Chromium-based browser you can open a page in (Chrome, Arc, an in-app browser pane). No Playwright browser download is required.

Run the commands below from the repo root. Keep exports under `work/`. The house rules in [SKILL.md](../SKILL.md) apply: accept the still before motion and get Luis's yes before any upload or attachment.

## 1. Project layout
```
work/my-gif/
  scene.js  base.css           # copied from assets/template
  post1.html                   # your page (start from an example)
```

Create `work/my-gif/`, `work/frames/post1/` and `work/out/`. Copy the template files and an example page into `work/my-gif/`. Change the copied page's links from `../template/base.css` and `../template/scene.js` to `base.css` and `scene.js`. The bundled examples keep the `../template/` links so they open in place.

## 2. Preview
```bash
python3 -m http.server 8790 --directory work/my-gif
```
Open `http://localhost:8790/post1.html?capture` at a 1080x1350 viewport. In the console run `window.__seek(1.9)` (try 0, 3.1, 5, 7). Without `?capture` the page plays live. Add `&v=2` to bust the cache after edits.

## 3. Record frames (in-page recorder)
`scene.js` contains a recorder: with `?rec=15` the page renders all 120 frames itself (SVG foreignObject to canvas to PNG) and POSTs each to `http://localhost:8788`.

```bash
2d/funnel/skills/viral-gif-studio/scripts/receiver.py work/frames/post1      # leave running
```
Then open `http://localhost:8790/post1.html?rec=15`. The tab title counts `rec 37/120` and ends at `rec done`. Restart the receiver with a new output dir for each post.

Notes: all CSS must be in linked stylesheets or `<style>` blocks (the recorder inlines `<link rel=stylesheet>` text). Canvas elements are snapshotted automatically. External images/fonts will not render in foreignObject; use inline SVG or data URIs, and system fonts (Inter falls back to the system sans).

## 4. Encode
```bash
2d/funnel/skills/viral-gif-studio/scripts/encode.sh work/frames/post1 work/out/post1-name 15
```
Produces `post1-name.gif` (720x900, 256-colour palette, auto-reduces if over 4 MB) and `post1-name.mp4` (1080x1350 H.264, faststart).

## 5. Verify
```bash
ffprobe -v error -count_frames -select_streams v -show_entries stream=width,height,nb_read_frames -of csv=p=0 work/out/post1-name.gif   # 720,900,120
ffmpeg -y -i a.gif -i b.gif -i c.gif -filter_complex "[0]select=eq(n\,75)[a];[1]select=eq(n\,45)[b];[2]select=eq(n\,30)[c];[a][b][c]hstack=3,scale=1350:-1" -frames:v 1 check.png
```
Look at `check.png`. Compare frame 0 and frame 119 for a smooth transition; the last sampled frame need not equal the first. Repeat the layout check at 390px phone width and verify exact portrait colors in the encoded GIF palette.

## Troubleshooting
| Symptom | Cause / fix |
|---|---|
| `Executable doesn't exist ... headless_shell` | Playwright browser not installed and the download may hang. Skip Playwright; use the in-page recorder. |
| Recorder stops at a frame / `rec error` | An image or font URL is external. Inline it. Check the console. |
| Edits not visible | Browser cache. Add `&v=N`. |
| Text wraps or collides | Fix at the CSS level, then re-preview at several `t`. Callouts are 250 px wide; shorten copy rather than shrink fonts. |
| Choppy loop | A motion uses a period that does not divide 8, or state outside `t`. |
| GIF too big | `encode.sh` retries at 160 colours; or reduce particles/gradients; or ship the MP4. |
| Upload API rejects the GIF | Keep the MP4 too (some APIs reject GIF encodings). Upload only after Luis's yes on that item. |
| Output names shifted | zsh arrays are 1-indexed; avoid bash-style arrays in zsh scripts. |
