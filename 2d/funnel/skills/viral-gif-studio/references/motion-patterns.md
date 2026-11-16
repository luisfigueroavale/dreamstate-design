# Motion patterns and recipes

All snippets assume `scene.js` is loaded (`S` global: `L=8`, `TAU`, `clamp`, `ease`, `frac`, `lerp`, `rng`, `typed`, `iso`, `scenes`). Full working code is in `assets/examples/`. The house rules in [SKILL.md](../SKILL.md) win: still accepted first, named sources for metrics, builds top-down with 01 first, and no moving track or sweep across text.

## Loop math (why the GIF has no jump)
`__seek(t)` calls every scene with `u = t mod 8`. A motion loops cleanly if its phase is `frac(t / P)` where `P` divides 8 (8, 4, 2, 1). Orbit angle `TAU * dir * t / L` completes whole turns. Anything with a one-way sequence (typing, bars filling) must either finish and hold, then fade out in the last 0.5 s (`typed()` does this), or restart exactly at t=0 with a matching start state.

## Hero recipes

### A. Isometric floor (`hero-iso-floor.html`)
`const I = S.iso(cx, cy, k)` gives `P(x,y,z)` and `box(x,y,w,d,z0,h,[top,left,right])`. Draw a slab, grid lines, tracks, then objects sorted by `x+y` (back to front). Packets travel `lerp(laneCell, hubCell, ease(f))`. A centre pedestal pulses on a 2 s cycle and fires a beam to a channel chip. Use for: team/org charts, pipelines, workflows with one approver.

### B. Orbit rings (`hero-orbit-rings.html`)
Tilted ellipses (`ry = rx * 0.44`), avatars at `theta = TAU*(dir*t/L + i/n + offset)`. Split each ring into a back half (under the core) and front half (over it); avatars with `sin(theta) > 0` draw in front, scaled and brighter. When an avatar is front-most, light its list row and fly 3 trailing particles into the core. Use for: people to follow, tool stacks, ecosystems, categories around a product.

### C. Particle brain / mesh (`hero-particle-brain-dark.html`)
Rejection-sample ~500 points inside a union of ellipses (a silhouette), connect each to its 3 nearest neighbours, draw on a 2D canvas. Signals stream along bezier curves from source chips to entry points on the edge; each arrival spawns an expanding ring `r = dt*230`; node brightness = sum of `exp(-(d - r)^2 / 300) * alpha`. Output beam drops to a "next move" card every 2 s. Use for: data fusion, AI "one brain", signals, memory, anything many-to-one.

### D. Ideas not yet built (same primitives)
- **Stacked boards / staircase** (ColdIQ TAM): 6 iso boxes with chequer tops, a piece hopping up one level every 1 s within the 8 s loop.
- **Funnel**: stacked ellipses narrowing, dots dropping through and changing colour per stage, counter per stage.
- **Radar**: concentric rings, a sweep arm rotating `TAU*t/L`, blips that light when swept.
- **Pyramid / plates**: translucent iso plates that lift apart in sequence then re-stack.
- **Orbit + ring of particles around a logo** (dark "OS" look).

## Motion primitives (mix 6 to 10 per GIF)
| Primitive | Recipe |
|---|---|
| Moving dashed track | `stroke-dasharray="5 7" stroke-dashoffset=${-t*24}` |
| Packet along a path | position `lerp(a,b,ease(frac(t/P)))`, glow circle + diamond |
| Bob and blink | `y += sin(TAU*(t/L*2+ph))*2.5`; eyes close when `frac(t/4+ph) > .96` |
| Pulse ring | ellipse with `r = r0 + f*dr`, opacity `1-f`, `f = frac(t/2 + k/2)` |
| Radar/wave through nodes | gaussian ripple over node distance (see brain) |
| Counter | `Math.round(target * ease(clamp((t-t0)/dur)))` |
| Progress/cost bars | width = `ease(...) * pct`, fade out at `t > 7.5` |
| Typing terminal | `S.typed([{text, at, speed}], t)`; colour prefixes with `ok/dim/acc/wait` classes |
| Cursor clicking buttons | path through button centres from `getBoundingClientRect()`, scale .85 for 0.15 s on click, button turns green "Approved" |
| Scrolling feed | doubled list, `translateY(-frac(t/L) * rowH * rows)` with a masked window |
| Checklist ticking | `classList.toggle('on', t > start + k*0.7)` |
| Sliding text swap | two stacked divs, `ease` between `top` offsets every 2 s |
| Sparkle/dust | seeded points, `y -= f*60`, `opacity = sin(PI*f)` |
| CTA pulse | an outline ring scaling 1 to 1.4 vertically every 2 s |
| Leader lines | from callout edge to bot/node; colour and node radius change when that step is "on" |

## Layout template (1080x1350)
- 40 to 254 px: logo row, two-line title (70px), subtitle.
- 300 to 760 px: hero + 4 to 8 callouts left/right (about 250 px wide each).
- 766 to 860 px: playbook strip (4 steps with a progress line).
- 880 to 1190 px: two cards (terminal / queue / feed / bars / checklist).
- 1230 to 1316 px: footer bar with brand, URL and CTA pill.

## Brand swap
Colours live in `base.css` and a handful of hex literals in each example (`#1450D9` accent, `#4A86F7` light, `#0B1B45` ink). These are historical sample colors. Replace them using `brand/` and the filled `brand.local/` files, not the kit palette. Keep Luis's supplied portrait cropped only and preserve its exact colors in the GIF palette. Headshot/logo files go in as `<img>` in the footer; if not supplied, keep the letter-mark placeholder and tell the user.
