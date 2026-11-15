# Viral GIF Studio lessons

A saved GIF is a dense reference sheet with a sculptural hero and many meaningful motions. Each replay reveals another useful detail: a signal arrives, work moves, an approval changes a state. That gives readers a reason to keep it beyond a glance.

## From v1 to v2

The first version was a flat node diagram with one kind of motion. The second added a topic-specific hero, numbered sections, a playbook and small working UI scenes. The test is simple: could it be described in one sentence as a diagram? If yes, it is not done. Add useful structure, not decoration. Accept the still before adding motion.

## Loop math

Motion is a pure function of `t`. Every period divides the eight-second loop, such as 8, 4, 2 or 1 second. Generate variation with a seeded rng before the frame runs. Never call `Math.random()` inside a frame. Inspect the transition from the last sampled frame back to the first; those two samples need not be identical.

## Recorder lessons

- Playwright can hang when its browser is missing. The in-page recorder can use an already available browser without a browser download.
- External fonts and images fail in SVG foreignObject. Use system fonts and inline assets.
- GIFs over about 4 MB get slow. Reduce palette or frame rate and inspect clarity. Small committed skill examples stay under about 1.5 MB each.
- Some upload APIs reject GIF bytes, so an MP4 ships alongside the GIF in local exports. Uploading or attaching either still needs Luis's yes on that exact item.
- zsh arrays are 1-indexed. Check filenames before starting a batch.

Keep the editable source and check the layout at 390px phone width. Brand files, named metric sources and exact supplied portrait colors take priority over the examples.

## House frame (set Nov 15, 2026)

New pieces use a fixed frame:

1. White, clean background. No tinted wash, no dot grid, and no dark theme.
2. The Dreamstate logo at the top, from a supplied logo file.
3. A big title with the key phrase in the house title gradient, `#12B2F8` to `#4E63F9`, plus a short gray subtitle.
4. The hero graphic in the middle.
5. A clean bottom banner. On the left, Luis's photo (cropped only, exact colors kept through the GIF palette) with "Luis Vale / Dreamstate". On the right, "Comment WORD to get it", with WORD (for example BOT) in a highlighted pill. A glow pulse or a rotating gradient border loops around that pill only. The motion is a pure function of `t`, its period divides eight seconds, and it never sweeps across other text.

WORD is a single variable at the top of the HTML, such as `window.WORD = "BOT";`. Fill the pill from that variable. Do not hard-code the keyword in more than one place.

This sits with the house rules as follows. Brand colors still come from the brand files, never the kit palette. The two hex values are the house title gradient for the title key phrase, not kit leftovers. All other colors stay with the brand files. "No engagement bait" still holds. The banner line is the one sanctioned call to action. Nothing else may ask for likes, shares or comments.

The [skill folder](../../2d/funnel/skills/viral-gif-studio/SKILL.md) holds the workflow, [pipeline](../../2d/funnel/skills/viral-gif-studio/references/pipeline.md), templates and [examples](../../2d/funnel/skills/viral-gif-studio/assets/examples/).
