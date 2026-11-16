---
name: viral-gif-studio
description: "Use when a LinkedIn post needs a dense, saveable animated infographic, a system graphic of bots or agents around a shared brain, a moving carousel cover, or an upgrade from a flat diagram to a sculptural hero with several meaningful motions."
---
# Viral GIF Studio

Turn a post idea into a dense, looping 4:5 reference sheet that people save and rewatch. This skill lives in Dreamstate Design. See `references/style-benchmark.md` for the complexity bar. The best result so far is the shared-brain system GIF under `examples/shared-brain/` (`d3b.html`, `d3-v2.gif`).

## House rules override the kit

- Brand colors and tokens come from `brand/` and the filled `brand.local/`, never the kit palette. Read the repo's `brand/AGENTS.md` first. The title key phrase uses the house title gradient `#12B2F8` to `#4E63F9` (set Nov 15, 2026). That is the house gradient, not a kit color. All other colors still come from the brand files.
- No metric on an image without a source you can name, including sample UI numbers. Label any example data as example data.
- Builds reveal top-down, 01 first.
- No line, underline or packet sweeps across text. Keep tracks and moving shapes clear of labels.
- Luis's portrait is cropped only. Keep its exact colors through the GIF palette. Do not retouch, recolor, filter or regenerate his face. Verify those colors in the encoded file. Prefer the MP4 when you need those colors exact.
- No third-party logos unless supplied, no long dashes, no engagement bait. The banner line "Comment WORD to get it" is the one sanctioned call to action. Nothing else on the piece may ask for likes, shares or comments.
- Motion starts only after the still is accepted.
- Keep the editable source and do a 390px phone check.
- Never upload, attach or publish without Luis's yes on that exact item.

The bundled pages and GIFs are historical examples of structure and recording, not approved copy, claims, logos or brand tokens. Apply these rules and the house frame before adapting them. Historical examples may include other comment or tag prompts. Do not copy those. Use only the sanctioned banner CTA. The shared-brain example is the current pattern reference; still apply these rules on every new piece.

## House frame (set Nov 15, 2026)

Every new piece uses this frame. Historical examples may not match it. Do not copy their chrome.

1. White, clean background. No tinted wash, no dot grid, and no dark theme.
2. The Dreamstate logo at the top, from a supplied logo file.
3. A big title with the key phrase in the house title gradient, `#12B2F8` to `#4E63F9`, plus a short gray subtitle.
4. The hero graphic in the middle.
5. A clean bottom banner. On the left, Luis's photo (cropped only, exact colors kept through the GIF palette) with the label "Luis Vale / Dreamstate". On the right, the line "Comment WORD to get it", where WORD (for example BOT) sits in a highlighted pill. The pill has a looping animation around it: a glow pulse or a rotating gradient border. That motion is a pure function of `t`, with a period that divides eight seconds, and it never sweeps across other text.

A solid brand-color banner with white text, and a white pill with black WORD text, is a supported variant (the shared-brain piece uses class `hf-foot blue`). Match WORD to the post's CTA before export.

WORD is a single variable at the top of the HTML. The template uses `window.WORD = "BOT";` and fills every `[data-word]` node from that variable, driving the pill ring in `assets/template/scene.js`. The shared-brain example uses `window.CTA_WORD` and `shared/house.js` for the same job. Do not hard-code the keyword in more than that one place.

How this sits with the house rules: brand colors still come from the brand files, never the kit palette. The two hex values above are the house title gradient for the title key phrase. They are not kit leftovers. All other colors stay with the brand files. "No engagement bait" still holds. The banner CTA is the one sanctioned call to action, and nothing else may ask for likes, shares or comments.

## Workflow: ideas, then stills, then one GIF

1. Send several concepts as short text first.
2. Make stills (3 distinct layouts) of the ones the owner likes, with a contact sheet and phone checks. Give one honest line per variant and a pick.
3. Animate only the still the owner picks. Iterate on motion from there.

## What makes a strong piece

1. One sculptural hero built for the topic, never a generic flowchart. Strong patterns include a live app dashboard with named bot cursors working in it, a flat 2D shared-brain system graphic, an isometric floor with data arcs, orbit rings, and a particle brain. For a system graphic of a team around one brain, flat and clean beat 3D and isometric.
2. 6 to 10 simultaneous motions, each with a meaning (work moving, an approval, a signal arriving).
3. Real-looking chips and UI mocks (a terminal, a queue, a feed, a message box). Use letter chips, not real company logos, unless the owner supplied them. Four to eight numbered sections with short labels and notes can still help on other heroes, plus a four-step playbook strip when it earns its space.
4. Concrete details backed by named sources. Use text chips when no logo was supplied.
5. A consistent Dreamstate house frame: white ground, logo at the top, gradient title, hero, and the banner described above.
6. Soft cards, restrained shadows and one accent family from the brand files.
7. Review question: "Could this be described in one sentence as a diagram?" If yes, it is still v1.

## Pattern: the shared-brain system GIF (best result so far)

Use this pattern when the post is about a team of bots or agents that share one context. The working reference is `examples/shared-brain/` (`d3b.html`, `d3b.spec.js`, `d3-v2.gif`).

- **Layout.** Flat 2D, black rounded dashboard window on the white page, with an "Example data" tag and a toolbar of every bot's head icon. Put the brain panel in the center: a flat node-network brain plus the doc rows it holds (for example Product, Ideal Customer, Competitors, Tone of Voice). Ring it with 6 to 8 framed section cards, one per area of work, each with a title and a status word. Flat and clean beat 3D and isometric. Generous whitespace beats more cards.
- **Every seat present.** Show every real bot by its real name with one concrete job. Each job is a mini scene: a lead qualified and handed to a message box above it; an idea, then a post, then review; a reply thread; a sequence with mailbox health chips; a design canvas; a video timeline; a packet to a coding agent and a PR back; the owner's cursor clicking Approve at a yes gate.
- **Bot identity.** Each bot is a small head icon (rounded square, two eye slots) tinted in a role color, plus a pointer cursor and a name pill. Group colors by team. Keep bots off the brand accent colors so they never compete with the CTA.
- **The core motion loop.** Each bot works in its own frame (it types with its pointer following the caret, checks off chips, flips statuses), then flies along a curved path through the gaps between cards to the brain, carrying a small doc chip in its color. It docks, clicks, and drops the chip. The brain nodes light up in its color and the matching doc row flashes "+1". Then it flies back and works again. Every bot makes at least one round trip per loop. Stagger departures across the whole loop, so at any moment some bots are working, some flying and some uploading. Show many things at once, never one journey.
- **Keep it readable.** Fold the name pill while a bot flies, and show only the head, pointer and chip. Route paths through gutters. Keep reveals top-down. Cursors never rest on text. Hand-off arrows inside the story may pulse. Drop wire pulses once bots carry the data, so the motion is not doubled.
- **Loop.** Build by about 70% of the loop, hold with live motion, then softly reset. Row heights must stay fixed when text is empty, or the seam jumps.

## Steps

### 1. Brief

Mine the post draft for the sections, the claims and the CTA keyword. Collect only what is missing: topic, hook, four to eight sections, sources for every metric, supplied assets, and the WORD keyword for the banner CTA. List every number with its source. Made-up UI example text is fine when labelled example data. Made-up results are not. New pieces use the white house frame, not a dark theme. Read the filled brand files rather than choosing colors from the examples, and use the house title gradient on the key phrase. `references/example-briefs.md` shows the original briefs; their claims need fresh source checks.

### 2. Plan from a still

Start from the ideas-then-stills workflow above. Pick one hero and write the motion list before coding. Choose a hero from `references/motion-patterns.md`, or the shared-brain pattern when the post is about a team that shares one context. Lay out the full reference sheet first. Read labels top-down, starting with 01. Keep hero tracks away from text. If it can be described in one sentence as a diagram, add meaningful detail before asking for still acceptance.

### 3. Build and accept the still

Keep new work under the repo's uncommitted `work/` folder. For a template-based piece, copy `assets/template/scene.js` and `assets/template/base.css` beside a new page. When copying an older example there, change its stylesheet and script links to `base.css` and `scene.js`. For a shared-brain piece, start from `examples/shared-brain/` (`d3b.spec.js`, `d-kit.css`, `d-kit.js`, `d-anim.css`, `shared/house.css`, `shared/house.js`, `shared/scene.js`). Apply the house frame, replace the example palette with brand tokens and literals from the filled brand files, and use the house title gradient on the key phrase.

Serve the page as described in `references/pipeline.md` and open it with `?capture`. Compose the still with `window.__seek(1.9)`. Check wrapping, collisions, clipping and readability at 390px phone width. Keep the editable HTML, CSS and JS. Get the still accepted before adding motion.

### 4. Add motion to the accepted still

Write down six to ten meaningful motions before coding. Drive each actor from a spec file (home position, work beats, trip times, dock point) rather than hand-placed keyframes. Register each motion as a pure function of `t` in `[0, 8)`:

- Canvas is 1080x1350. Motion is periodic in 8 s. Never call `Math.random()` inside a frame; use `S.rng(seed)` outside the frame.
- Periods divide eight seconds: 8, 4, 2 or 1.
- Static text stays in HTML/CSS. Shapes move in SVG or canvas. Read positions from `getBoundingClientRect()`.
- Keep text at 15px or more at 1080 wide.
- Reveal top-down, 01 first. No tracks or sweeps cross text.
- Preview at 0, 1.9, 3.1, 5 and 7 seconds, then repeat the 390px check.

### 5. Automated checks

Script a check that samples many frames and flags lines crossing text or each other, overlapping cards, clipped text, text under 15px, long dashes, and cursors resting on text. The shared-brain example has `examples/shared-brain/check-anim.mjs`. Fix everything it finds.

### 6. Record and encode

From the repo root, start `2d/funnel/skills/viral-gif-studio/scripts/receiver.py <frames_dir>`. Open the page with `?rec=15`; wait for the title `rec done` (120 frames at 15 fps). Run `2d/funnel/skills/viral-gif-studio/scripts/encode.sh <frames_dir> <out_name> 15` for a 720x900 GIF (aim for 4 MB or less) and a 1080x1350 MP4. See `references/pipeline.md` for paths and setup. Keep exports under `work/`. Inline images and fonts as data URIs when a page must be self-contained for recording.

### 7. Verify and hand over locally

Make a contact sheet of 6 to 8 frames including the first and last. Measure the seam jump against a normal frame step. Run a 390px phone check. Look at the full-size frame yourself. Inspect start, middle and end frames, motion order and the transition back to frame zero. The final sampled frame should flow into the first; it need not be identical. Verify portrait colors in the actual GIF palette and keep editable source with both exports. Send the GIF first, then the MP4 (it keeps photo colors exact). A local handoff is not permission to upload, attach or publish. Attaching or publishing is a separate step that needs the owner's yes on that exact item.

## Hard-won pitfalls

- Playwright can hang when a browser is missing. Use the in-page recorder with an already available Chromium browser. Do not download one without approval.
- External fonts and images can fail inside SVG foreignObject. Use system fonts and inline SVG or data URIs.
- GIFs over about 4 MB get slow. The encoder retries with fewer colors, but inspect the result. Palette reduction must preserve Luis's portrait colors exactly.
- Some upload APIs reject GIF bytes, so keep an MP4 alongside the GIF. Prefer the MP4 when photo colors must stay exact. Any upload still needs Luis's yes on that item.
- zsh arrays are 1-indexed. Check output names when scripting.
- Bundled historical examples stay under about 1.5 MB each. Those copies use fewer colors and lower frame rates; the orbit example also uses 640x800 while keeping 4:5. The shared-brain `d3-v2.gif` is the unslimmed Nov 15 2026 reference (about 3.3 MB) and is the exception; do not treat that size as the new default for other committed examples.
- Row heights must stay fixed when a line is empty, or the loop seam jumps.
- Name pills that stay open while a bot flies will collide with other labels. Fold them during travel.

## Files

- `references/style-benchmark.md`: complexity analysis and v1 lessons.
- `references/motion-patterns.md`: heroes, motion primitives and loop math.
- `references/pipeline.md`: preview, record, encode and troubleshooting.
- `references/example-briefs.md`: original briefs and context.
- `assets/template/`: timeline, helpers, recorder and frame styles.
- `assets/examples/`: three editable hero pages and three slimmed GIFs.
- `examples/shared-brain/`: the Nov 15 2026 shared-brain reference (`d3b.html`, `d3b.spec.js`, `d3-v2.gif`, `d3-v2-still.png`, and the local `shared/` assets needed to open the page).
- `scripts/`: frame receiver and GIF plus MP4 encoder.

## Related

Use [animate-process](../animate-process/SKILL.md) for a process explanation using the funnel's DeskTimeline and capture scripts.
