# Shared-brain system GIF (d3-v2, Nov 15 2026)

Reference build for the viral-gif-studio shared-brain pattern. This is the best result so far. The final piece is `out/d3-v2.gif`, with still `out/d3-v2-still.png`. It was made for the Nov 16 LinkedIn draft. The MP4 is not in this folder; prefer an MP4 export when photo colors must stay exact.

This folder is self-contained. Open `d3b.html` from here (a local static server is fine). House-frame assets live in `shared/`: `house.css`, `house.js`, `scene.js`, `dreamstate-logo.png`, and `luis-photo-crop.png`. Luis's cropped photo is included only so this approved example can be opened; do not reuse it outside this piece.

## What you are looking at

Flat 2D dashboard on the white house frame, with the brain panel in the center and a ring of 8 framed sections. All 16 seats appear by name, each with a mini scene. Each bot works in its frame, flies a gutter path to the brain carrying a doc chip, docks (brain nodes light in its color, the matching doc row shows +1), then flies back. Departures are staggered. Name pills fold while a bot is flying. The blue banner (`hf-foot blue`) is the supported solid brand-color variant: white text and a white pill with black WORD text. WORD comes from `window.CTA_WORD` at the top of `d3b.html`, filled by `shared/house.js`. Numbers in the UI are example data, labelled in the toolbar.

Motion is a pure function of `t` in `[0, 8)`, driven by the trip and work specs in `d3b.spec.js`. Timeline: build 0 to about 5.6 s (top row first), hold with live motion, then a 0.55 s soft reset so frame 119 flows into frame 0. Row heights stay fixed when a line is empty, so the loop seam does not jump.

## Files

- `d3b.spec.js` and `d3b.html`: the v2 source. HTML is the built page; the spec is the editable source for layout, copy, bot trips and work beats.
- `d-kit.css`, `d-kit.js`: cards, brain, self-check helpers.
- `d-anim.css`: motion styles on top of the kit.
- `check-anim.mjs`: samples frames and flags overlaps, crossing lines, text under 15px, long dashes, and cursors resting on text.
- `shared/`: house frame CSS, JS, logo and the approved cropped portrait for this example.
- `out/d3-v2.gif` and `out/d3-v2-still.png`: the encoded reference (GIF is 3,362,600 bytes, 720x900, 15 fps). That is over the repo's usual 1.5 MB guideline for committed skill examples; it is kept unslimmed as the pattern reference.

Earlier still and motion experiments (d1, d2, d3, d3a), frame folders and the MP4 are not in this folder.

## Checks and recapture

From this folder, with Playwright available (the repo root `node_modules` is enough) and an already installed Chrome:

```
node check-anim.mjs d3b
```

Do not download a browser without approval. Recapture stays under the repo's uncommitted `work/` folder, not this `out/` directory. Use the skill scripts from the repo root: `scripts/receiver.py` and `scripts/encode.sh`, as described in `references/pipeline.md`. Attaching or publishing still needs Luis's yes on that exact item.
