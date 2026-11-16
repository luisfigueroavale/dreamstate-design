# Contributing

## House style

- No em dashes or en dashes anywhere. Use a comma, a colon, a period or "to".
- Dreamstate brand only. No other company's name, logo, product or look, and no credit to outside kits or creators.
- Plain words. One idea per line in rules and checklists.

## Never commit

- `brand.local/`, `audience.local/`, `.banned-terms.local`
- `work/`, renders, frames, `.blend` files, GIF and MP4 exports (except the skill examples below)
- Downloaded assets or generated models

Images in git are the small grey `preview.png` in each scene folder and small example GIFs and stills shipped inside a skill folder, kept under about 1.5 MB each. Exports under `work/` stay uncommitted.

## A new 3D scene

1. `3d/scenes/<name>/scene.md` first, then `build.py` on `3d/lib/ds3d.py`.
2. No color literals in `build.py`. Use the palette slots.
3. Render the grey preview at 540 px wide and commit it as `preview.png`.
4. Add the scene to the table in `3d/README.md`.

## Copied 2D material

`2d/gtm-team/` and the eight original funnel visual skills are copies. Change the original repo first, then copy it again and update the commit in `2d/README.md`. `2d/funnel/skills/viral-gif-studio/` originates here. Keep the short Related pointer in the `animate-process` copy when refreshing it; copy that pointer back to the funnel original.

## Checks

```sh
npm run check     # dashes, forbidden files, skill shape, links, banned terms
npm test          # the copied frame and map tests
python3 -m py_compile 3d/lib/ds3d.py 3d/scenes/*/build.py
```

The banned-term scan reads `.banned-terms.local`, one term per line, which stays on your machine. Without it the check prints that the scan was skipped.

## Pull requests

Small and on a branch. Say what changed, what you rendered, and attach the still. A merge waits for the owner's yes.
