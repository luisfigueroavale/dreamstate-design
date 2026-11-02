# 3D

Dreamstate's own 3D lane. Scenes are Python files that build themselves in Blender, so every render can be rebuilt, diffed and rebranded. Nothing here is drawn by hand in the viewport and then lost.

| Folder | What it holds |
|---|---|
| `lib/ds3d.py` | Shared helpers: arguments, palette, materials, camera, three-point light, clay layer, seamless spin, render presets |
| `scenes/<name>/` | One scene per folder: `build.py`, `scene.md`, and a small `preview.png` |
| `scripts/` | `render.sh`, `to-gif.sh`, `to-mp4.sh`, `seam-check.sh` |
| `prompts/` | What to ask Codex at each step when it drives Blender through the bridge |
| `checklists/3d-review.md` | The review before anything goes to the owner |
| `mcp/README.md` | How the Blender bridge is connected, and its limits |

The workflow is [docs/3d-playbook.md](../docs/3d-playbook.md). The rules are [docs/best-practices.md](../docs/best-practices.md).

## Quick start

On the Mac, from the repo root, with Blender 5.2 and ffmpeg installed:

```sh
3d/scripts/render.sh signal-funnel clay still        # shape check, about 2 s once shaders are warm
3d/scripts/render.sh signal-funnel final still       # the still the owner reviews
3d/scripts/render.sh signal-funnel final loop        # 36 frames, only after the still is accepted
3d/scripts/to-gif.sh work/3d/signal-funnel/frames work/3d/signal-funnel/loop.gif 720 12
3d/scripts/to-mp4.sh work/3d/signal-funnel/frames work/3d/signal-funnel/loop.mp4 12 3
3d/scripts/seam-check.sh signal-funnel 36
```

The first Cycles render on a Mac compiles the Metal shaders and can take a few minutes. Later renders are fast.

Add `brand` as the fourth argument of `render.sh` to use `brand.local/3d.json` instead of the grey stand-in. If a value is missing, the script stops. It does not guess.

## Scenes

| Scene | Metaphor | Loop |
|---|---|---|
| [signal-funnel](scenes/signal-funnel/scene.md) | Signals enter at the top, rings qualify them, one lead leaves lit | 60 degree counter-spin, 36 frames |

A new scene starts from three metaphor options that the owner picks from. See the `build-3d-scene` skill.
