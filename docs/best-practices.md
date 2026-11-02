# Best practices

The short list the Graphic Designer holds every piece to, 2D or 3D.

## Composition

- One hero per graphic. If two things fight for the eye, cut one.
- Under 25 words on the image. The post carries the argument.
- Real labels only: real product names, real steps. No invented UI, screens or dashboards.
- Copy first, design second, motion last. A render cannot save a weak post.
- Design for 390 px wide first. Most readers see it on a phone.

## Brand

- Every color, font and size comes from `brand.local/`. The committed files stay blank.
- A browser default or the grey 3D preview is not a brand. Never hand it over as final.
- A logo, photo or icon is used only if `brand.local/assets/README.md` lists it.
- No generated, retouched or replaced face or body.

## Sources and files

- The editable source is what you keep: HTML, CSS, SVG for 2D, `build.py` for 3D.
- A re-render starts from the source. Never redraw from a PNG.
- Renders, frames, `.blend` files and exports live in `work/`, which git ignores.
- Never commit `brand.local/`, `audience.local/` or `.banned-terms.local`.

## 3D process

- Script the scene. Same command, same image.
- Clay first. Check shape, spacing and crop before materials.
- Three presets: clay to check shape, review to check look, final to ship.
- Time one frame before you queue a full loop. Note the time in `scene.md`.
- Convert hex to linear color in code (`ds3d.hex_to_linear`). bpy colors are linear.
- Keep a rim light. It is what separates the object from a dark backdrop.
- Loop by the symmetry angle with constant speed. Check the seam with `seam-check.sh`.
- Note the Blender version in `scene.md`. Scenes are built on 5.2 LTS.

## Motion

- The still is accepted before any motion is rendered.
- Keep loops short and seamless. Keep the key message readable in the first frame.
- File size, frame rate and length are working numbers, marked to-check per platform.
- Always ship a still fallback.

## Safety and spend

- The Blender bridge runs any Python in Blender. Save first, connect one client, Codex only.
- Telemetry off for the bridge.
- No asset downloads and no paid AI model generation without a credit quote and the owner's yes on that item.
- An outside model or texture needs its license written in `scene.md` before use.

## Review

- Look at the real file at full size and at 390 px. A script exit is not a review.
- Run `brand/taste.md` for 2D and `3d/checklists/3d-review.md` for 3D.
- A passed review is not a yes to post or schedule.
