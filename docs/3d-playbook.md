# 3D playbook

How the Graphic Designer makes a 3D graphic. Read [brand/AGENTS.md](../brand/AGENTS.md) first. The Graphic Designer charter in the gtm-team repo and its rules still apply.

## 0. Before anything

- The Head of Content accepted the words. The render supports the post. It does not replace it.
- `brand.local/` is filled, including `brand.local/3d.json` (form: [brand/3d.md](../brand/3d.md)). Until then, renders use the grey preview palette and are labeled as such.
- Blender 5.2 and ffmpeg are on the Mac. Check with `blender --version` and `ffmpeg -version`.

## 1. Pick the metaphor

Write three options, one line each, and wait for the owner to pick one. Each option has one hero object, a symmetry that loops, and no face or body. See `skills/build-3d-scene/references/metaphors.md`.

## 2. Write the scene file

`3d/scenes/<name>/scene.md` comes before code. It states the metaphor, reading order, hero object, frame, loop and palette slots.

## 3. Block out in code

`3d/scenes/<name>/build.py` builds the whole scene from an empty file with `3d/lib/ds3d.py`. Exact sizes, one root empty, an orthographic or long lens camera aimed at that empty, the frame from `ds3d.SIZES`. A scene built by clicking in the viewport is not done until it is written back into `build.py`.

## 4. Clay check

`3d/scripts/render.sh <name> clay still` renders a matte grey override at 16 samples and half size. Check spacing, contact and crop at full size and at 390 px. Fix shape here. Glass and metal hide shape problems and take several times longer to render.

## 5. Brand pass

Colors come only from the five slots in `brand.local/3d.json`. Keep the backdrop darker than the object, or raise the rim light, so the edges read. AgX with Medium High Contrast is the default view transform.

## 6. The still

`3d/scripts/render.sh <name> final still brand` renders 128 samples at full size with the denoiser. Run `skills/review-3d-render`. The owner reviews the still. Nothing moves until they accept it.

## 7. The loop

Turn the hero object by its symmetry angle over the loop with `ds3d.spin_loop`. The driver keeps the speed constant, and frame N+1 equals frame 1, so the loop never jumps. Then:

```sh
3d/scripts/render.sh <name> final loop brand
3d/scripts/to-gif.sh work/3d/<name>/frames work/3d/<name>/loop.gif 720 12
3d/scripts/to-mp4.sh work/3d/<name>/frames work/3d/<name>/loop.mp4 12 3
3d/scripts/seam-check.sh <name> <frames>
```

GIF width, frame rate and file size are working numbers, marked to-check per platform. Keep the still PNG as the fallback.

## 8. Words over the render

Text is real HTML. Place the still in a frame from `2d/` and set the headline there, under 25 words on the whole graphic. Do not model text in 3D.

## 9. Deliver

`build.py`, `scene.md`, the still, the GIF, the MP4 and the seam result. The `.blend` and frames stay in `work/`. Attaching to a social draft and asking for a yes follow the gtm-team charter.

## Driving Blender live

Codex can drive a running Blender through the bridge. See [3d/mcp/README.md](../3d/mcp/README.md) and [3d/prompts/README.md](../3d/prompts/README.md). The scripted route stays the source of truth.
