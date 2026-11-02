# 3D review

Run this before a 3D still or loop goes to the owner. A pass here is not a yes to post.

## Brief
- [ ] The owner picked this metaphor from three options.
- [ ] `scene.md` states the metaphor, the reading order, the hero object, the frame, the loop and the palette slots.
- [ ] Copy was accepted before the render. The render does not carry the message alone.

## Shape (clay)
- [ ] One hero object. Nothing else competes for the eye.
- [ ] Even spacing, no part touching another by accident, nothing cut by the frame edge.
- [ ] The silhouette reads at 390 px wide.

## Look
- [ ] Every color comes from `brand.local/3d.json`, or the file is the grey preview and is labeled as such.
- [ ] Rim light separates the object from the backdrop.
- [ ] No blown highlight hides a shape. No black crush hides an edge.
- [ ] No noise or fireflies at full size. Denoise is on.

## Words and marks
- [ ] Under 25 words on the final graphic, set as real HTML text over the render, not as 3D text.
- [ ] Real labels only. No invented UI, no invented metric, no number without a named source.
- [ ] No generated face or body. No logo or mark the owner did not supply.
- [ ] No downloaded asset or AI generated model unless the owner said yes after a credit quote, and its license is noted in `scene.md`.

## Motion
- [ ] The still was accepted before motion was rendered.
- [ ] `3d/scripts/seam-check.sh` reports a match between frame 1 and frame N+1.
- [ ] Constant speed (driver or linear keys). No ease at the seam.
- [ ] GIF and MP4 sizes are recorded. Platform limits stay marked to-check.
- [ ] A still PNG fallback exists.

## Files
- [ ] `build.py` is the source. The `.blend`, frames and exports stay in `work/`.
- [ ] Nothing from `brand.local/`, `audience.local/` or `.banned-terms.local` is committed.
