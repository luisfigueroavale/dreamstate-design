# 2D

Copied design material and one skill that originates in Dreamstate Design. The copied originals stay in their own repos and still work there. The eight funnel visual skills stay copies; `viral-gif-studio` lives here.

| Folder | Copied from | What it holds |
|---|---|---|
| [gtm-team/](gtm-team/) | [dreamstate-gtm-team](https://github.com/luisfigueroavale/dreamstate-gtm-team) at 2d8645c | `docs/design-playbook.md`, `docs/infographic-rules.md`, `design/templates/` (7 HTML starters), `design/scripts/` (still, frames, motion), blank `brand/` |
| [funnel/](funnel/) | [dreamstate-linkedin-funnel](https://github.com/luisfigueroavale/dreamstate-linkedin-funnel) at 56a172e | `docs/picture-rules.md`, `docs/skill-frame.md`, `pictures/` (DeskTimeline, frame shells, the gate example), `scripts/` (render-still, capture-motion, frame-page), blank `brand/`, and 8 visual skills |

Paths inside each folder are relative to that folder, the same as in the original repo. Each folder has its own blank `brand/`. Run `scripts/link-brand.sh` from the repo root so both read the one `brand.local/` at the root.

The funnel's visual skills: `design-post-graphic`, `review-graphic`, `draw-process-map`, `animate-process`, `build-scene-graphic`, `design-video-thumbnail`, `study-thumbnail-patterns`, `set-brand-style`.

Our ninth visual skill, [viral-gif-studio](funnel/skills/viral-gif-studio/SKILL.md), builds dense animated reference sheets. It originates here, not in the funnel commit above. The Related pointer in `animate-process` is the only local addition to that copy and should be copied back to the funnel original.

When an original changes, copy it again and update the commit in this table. Do not edit a copy so it drifts from its original. A change starts in the original repo.

To put a 3D still into a 2D frame, render the still in `3d/`, then use it as the picture in a frame here and set the words as HTML.
