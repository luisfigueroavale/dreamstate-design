# Prompts for Codex driving Blender

Use these when Codex is connected to Blender through the bridge (see [../mcp/README.md](../mcp/README.md)). Paste one step at a time and check the result before the next. The scripted route (`3d/scripts/render.sh`) does the same work without the bridge and is preferred for anything that ships.

Before step 1: save any open Blender file. The bridge can run any Python in Blender.

## 1. Connect and look

> List the objects in my open Blender scene and the Blender version. Do not change anything yet.

Pass: Codex names the objects and says 5.2. No answer means Blender is closed or the MCP server is not started in the sidebar.

## 2. Build from the repo, not from memory

> Run 3d/scenes/<scene>/build.py from this repo inside my Blender with the preview palette, then tell me the object count and the camera's frame size.

Pass: the scene matches `scene.md`. If Codex wants to add an object that `scene.md` does not list, stop and update `scene.md` first.

## 3. Clay check

> Switch to the Clay view layer and render one still at the clay preset. Show it to me and say whether anything is cut off, touching, or unevenly spaced.

Pass: one hero object, clear gaps, nothing touches the frame edge. Fix shape here. Materials hide shape problems and cost more render time.

## 4. Brand pass

> Read brand.local/3d.json and set the five palette slots. If any slot is missing, stop and tell me which one.

Pass: every color on screen is one of the five slots. No new color.

## 5. Final still

> Render the final preset still and save it to work/3d/<scene>/final.png. Then show it at full size and at 390 px wide.

Pass: it reads at 390 px. The owner reviews this still. Nothing moves until they accept it.

## 6. Loop, after the still is accepted

> Render the loop frames to work/3d/<scene>/frames, then run 3d/scripts/to-gif.sh and 3d/scripts/to-mp4.sh. Run 3d/scripts/seam-check.sh and report the PSNR.

Pass: the seam check matches, the GIF size is reported, and the still stays as the fallback.

## Rebrand an existing scene

> Load 3d/scenes/<scene>/build.py with --palette brand and render the final still. Change no geometry.

## Never ask the bridge to

- Download assets (Poly Haven, Sketchfab, Poly Pizza) or generate a model with a paid AI service. Those need a credit quote and the owner's yes first.
- Make a face, a body, a logo, or a product screen that does not exist.
- Overwrite a `.blend` that is not under `work/`.
