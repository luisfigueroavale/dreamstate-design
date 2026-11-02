---
name: review-3d-render
description: "Review one 3D still or loop against 3d/checklists/3d-review.md at full size and at 390 px, and check the loop seam. Use before a 3D render goes to the owner. Report unless they asked for fixes. It does not publish."
---
# Review a 3D render

Look at the actual files and report against [3d/checklists/3d-review.md](../../3d/checklists/3d-review.md).

## Use when

- After `build-3d-scene` or `rebrand-3d-scene`, before the owner sees the piece.

## Steps

1. Read the scene's `scene.md` and the brief.

2. Open the still at full size, then at 390 px wide. A description of the image is not a review.

3. Walk the checklist: brief, shape, look, words and marks, motion, files. Mark each line pass, fail, or not inspected.

4. For a loop, read the `seam-check.sh` result and look at the first and last frames side by side. Record the GIF and MP4 sizes.

5. Open the report with the verdict and the lines you could not inspect. Name the file paths you looked at.

6. Stay report only unless the owner asked for fixes. A fix goes back to `build-3d-scene` or `rebrand-3d-scene`.

## Dreamstate tools

None. Local files only.

## Stop rules

- A script exit is not a review.
- A generated face or body fails.
- A color that is not a palette slot fails, unless the render is the labeled grey preview.
- A downloaded or AI generated model without a recorded yes and license fails.
- A pass is not a yes to post or schedule.
