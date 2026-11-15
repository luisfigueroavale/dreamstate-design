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

The [skill folder](../../2d/funnel/skills/viral-gif-studio/SKILL.md) holds the workflow, [pipeline](../../2d/funnel/skills/viral-gif-studio/references/pipeline.md), templates and [examples](../../2d/funnel/skills/viral-gif-studio/assets/examples/).
