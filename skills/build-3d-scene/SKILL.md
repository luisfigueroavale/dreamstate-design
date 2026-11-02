---
name: build-3d-scene
description: "Build a new 3D scene in Blender from a script, clay first, then brand, then a still for the owner, then the loop. Use when a post or a thumbnail needs one 3D hero object. It does not publish, download assets, or generate models."
---
# Build a 3D scene

Turn an accepted idea into `3d/scenes/<name>/build.py`, render it headless, and hand the owner a still. Read `brand/AGENTS.md` first and follow [docs/3d-playbook.md](../../docs/3d-playbook.md).

## Use when

- The Head of Content accepted the words and the piece needs a 3D hero object.
- An existing scene in `3d/scenes/` does not fit. If one fits, use `rebrand-3d-scene`.

## Steps

1. Write three metaphor options, one line each, each with one hero object and a loop idea. Wait for the owner to pick one (`references/metaphors.md`). No face or body in any option.

2. Write `3d/scenes/<name>/scene.md` first: metaphor, reading order, hero object, frame size, loop angle and frames, palette slots (`references/scene-file.md`).

3. Write `build.py` with `3d/lib/ds3d.py`: `parse_args`, `load_palette`, `reset`, materials, `camera`, `three_point`, `clay_layer`, `spin_loop`, `run`. Copy the shape of `3d/scenes/signal-funnel/build.py`.

4. Render the clay still: `3d/scripts/render.sh <name> clay still`. Look at it at full size and at 390 px. Fix spacing and crop here.

5. Render the review still with the preview palette, then with `brand` once `brand.local/3d.json` is filled. Stop if a slot is missing.

6. Render the final still: `3d/scripts/render.sh <name> final still brand`. Run `skills/review-3d-render`. Hand the owner the still and wait.

7. Only after the owner accepts the still: render the loop, make the GIF and MP4, and run `3d/scripts/seam-check.sh`.

8. Save a small grey `preview.png` (preview palette, 540 px wide) in the scene folder. Deliver `build.py`, the still, the GIF, the MP4 and the seam result.

## Dreamstate tools

None to build. Attaching a finished file to a social draft follows the Graphic Designer charter in the gtm-team repo.

## Stop rules

- Do not build before the owner picks a metaphor.
- Do not name a color in `build.py`. Colors come from the palette slots.
- Do not download an asset or generate a model. That needs a credit quote and the owner's yes on that item.
- Do not put words in 3D. Text goes in an HTML frame over the still.
- Do not render motion before the still is accepted.
- A script exit is not a review.
- It does not publish or schedule.
