---
name: viral-gif-studio
description: "Use when a LinkedIn post needs a dense, saveable animated infographic, a moving carousel cover, or an upgrade from a flat diagram to a sculptural hero with several meaningful motions."
---
# Viral GIF Studio

Turn a post idea into a dense, looping 4:5 reference sheet that people save and rewatch. This skill lives in Dreamstate Design. See `references/style-benchmark.md` for the complexity bar.

## House rules override the kit

- Brand colors and tokens come from `brand/` and the filled `brand.local/`, never the kit palette. Read the repo's `brand/AGENTS.md` first.
- No metric on an image without a source you can name, including sample UI numbers.
- Builds reveal top-down, 01 first.
- No line, underline or packet sweeps across text. Keep tracks and moving shapes clear of labels.
- Luis's portrait is cropped only. Keep its exact colors through the GIF palette. Do not retouch, recolor, filter or regenerate his face. Verify those colors in the encoded file.
- No third-party logos unless supplied, no long dashes, no engagement bait.
- Motion starts only after the still is accepted.
- Keep the editable source and do a 390px phone check.
- Never upload, attach or publish without Luis's yes on that exact item.

The bundled pages and GIFs are historical examples of structure and recording, not approved copy, claims, logos or brand tokens. Apply these rules before adapting them. Do not carry their comment prompts into a new piece.

## What makes a strong piece

1. One sculptural hero specific to the topic: an isometric floor, orbit rings, particle brain, stacked boards or pyramid.
2. Six to ten meaningful motions: work travelling along tracks, signals arriving, a typing terminal, approvals, bars and checklists. Each must explain something.
3. Four to eight numbered sections with short labels and notes, plus a four-step playbook strip.
4. Concrete details backed by named sources. Use text chips when no logo was supplied.
5. A consistent Dreamstate header, title, subtitle and footer. Use a useful next step without a comment or tag prompt.
6. Soft cards, restrained shadows and one accent family from the brand files.

## Workflow

### 1. Brief

Collect only what is missing: topic, hook, four to eight sections, sources for every metric, supplied assets, a useful next step and light or dark treatment. Read the filled brand files rather than choosing colors from the examples. `references/example-briefs.md` shows the original briefs; their claims need fresh source checks.

### 2. Pick a hero and plan the still

Choose a hero from `references/motion-patterns.md`. Lay out the full reference sheet first. Read labels top-down, starting with 01. Keep hero tracks away from text. If it can be described in one sentence as a diagram, add meaningful detail before asking for still acceptance.

### 3. Build and accept the still

Keep new work under the repo's uncommitted `work/` folder. Copy `assets/template/scene.js` and `assets/template/base.css` beside a new page. When copying an example there, change its stylesheet and script links to `base.css` and `scene.js`. Replace the example palette with brand tokens and literals from the filled brand files.

Serve the page as described in `references/pipeline.md` and open it with `?capture`. Compose the still with `window.__seek(1.9)`. Check wrapping, collisions, clipping and readability at 390px phone width. Keep the editable HTML, CSS and JS. Get the still accepted before adding motion.

### 4. Add motion to the accepted still

Write down six to ten meaningful motions before coding. Register each with `S.scenes.push((t) => ...)`:

- Canvas is 1080x1350. Motion is a pure function of `t` in `[0, 8)`.
- Periods divide eight seconds: 8, 4, 2 or 1. Use `S.rng(seed)` outside the frame, never `Math.random()` inside it.
- Static text stays in HTML/CSS. Shapes move in SVG or canvas. Read label positions with `getBoundingClientRect()`.
- Reveal top-down, 01 first. No tracks or sweeps cross text.
- Preview at 0, 1.9, 3.1, 5 and 7 seconds, then repeat the 390px check.

### 5. Record and encode

From the repo root, start `2d/funnel/skills/viral-gif-studio/scripts/receiver.py <frames_dir>`. Open the page with `?rec=15`; wait for the title `rec done` (120 frames). Run `2d/funnel/skills/viral-gif-studio/scripts/encode.sh <frames_dir> <out_name> 15` for a 720x900 GIF and a 1080x1350 MP4. See `references/pipeline.md` for paths and setup. Keep exports under `work/`.

### 6. Verify and hand over locally

Inspect start, middle and end frames, motion order and the transition back to frame zero. The final sampled frame should flow into the first; it need not be identical. Verify portrait colors in the actual GIF palette and keep editable source with both exports. A local handoff is not permission to upload, attach or publish.

## Hard-won pitfalls

- Playwright can hang when a browser is missing. Use the in-page recorder with an already available Chromium browser. Do not download one without approval.
- External fonts and images can fail inside SVG foreignObject. Use system fonts and inline SVG or data URIs.
- GIFs over about 4 MB get slow. The encoder retries with fewer colors, but inspect the result. Palette reduction must preserve Luis's portrait colors exactly.
- Some upload APIs reject GIF bytes, so keep an MP4 alongside the GIF. Any upload still needs Luis's yes on that item.
- zsh arrays are 1-indexed. Check output names when scripting.
- Bundled examples must stay under about 1.5 MB each. These copies use fewer colors and lower frame rates; the orbit example also uses 640x800 while keeping 4:5.

## Files

- `references/style-benchmark.md`: complexity analysis and v1 lessons.
- `references/motion-patterns.md`: heroes, motion primitives and loop math.
- `references/pipeline.md`: preview, record, encode and troubleshooting.
- `references/example-briefs.md`: original briefs and context.
- `assets/template/`: timeline, helpers, recorder and frame styles.
- `assets/examples/`: three editable hero pages and three slimmed GIFs.
- `scripts/`: frame receiver and GIF plus MP4 encoder.

## Related

Use [animate-process](../animate-process/SKILL.md) for a process explanation using the funnel's DeskTimeline and capture scripts.
