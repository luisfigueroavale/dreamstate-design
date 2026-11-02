---
name: rebrand-3d-scene
description: "Render an existing 3D scene in the owner's palette or at a new size without changing its geometry. Use when a scene in 3d/scenes fits the post and only the colors or the frame change. It does not publish."
---
# Rebrand a 3D scene

Reuse a scene in `3d/scenes/` with the owner's palette. Read `brand/AGENTS.md` first.

## Use when

- A scene already fits the idea.
- The owner's brand changed and the scene needs a new render.

## Steps

1. Read the scene's `scene.md` and confirm the metaphor still fits the post.

2. Check `brand.local/3d.json`. Every slot in `brand/3d.md` must hold a hex value. If one is missing, stop and ask.

3. Render the clay still at the new size if the size changed: `3d/scripts/render.sh <name> clay still`. A new aspect ratio is a new layout: move the camera or the ortho scale in `build.py` and note it in `scene.md`. Do not crop the old frame.

4. Render the final still with `brand`: `3d/scripts/render.sh <name> final still brand`.

5. Run `skills/review-3d-render` and hand the owner the still.

6. After the owner accepts it, render the loop and the exports, and run the seam check.

## Dreamstate tools

None. Local files only.

## Stop rules

- Do not change geometry in this skill. A shape change is `build-3d-scene`.
- Do not invent a color to fill a blank slot.
- Do not commit `brand.local/` or anything in `work/`.
- It does not publish.
