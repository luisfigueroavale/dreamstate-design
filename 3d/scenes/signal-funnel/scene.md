# Signal funnel

| | |
|---|---|
| Metaphor | Many signals come in at the top. Each ring qualifies them. One lead leaves at the bottom, lit. |
| Reading order | Six beads on the top ring, four rings narrowing, the glowing core |
| Hero object | The funnel. One object, nothing else in frame |
| Frame | 1080x1350 portrait, orthographic camera from the front right |
| Loop | Rings counter-rotate 60 degrees over 36 frames. A hexagon repeats every 60 degrees, so frame 37 equals frame 1 |
| Palette slots | `background` floor and world, `hero` ring metal, `accent` beads, core shell and fill light, `glow` core, `rim` rim light |
| Built on | Blender 5.2.3 LTS, Cycles, AgX Medium High Contrast |
| Words on the image | None. A headline, when the post needs one, goes in an HTML frame over the still (see 2d/) |

`preview.png` is the grey stand-in palette at reduced size. It shows the shape, not the brand.

Render times measured on the owner's M-series Mac with Metal: the final still takes about 10 s once shaders are compiled.

First measured loop at the final preset: 36 frames, a 720 px GIF at 12 fps of about 5.2 MB, an MP4 of about 1.7 MB, and a seam PSNR of 63.7 dB between frame 1 and frame 37 (identical to the eye).
