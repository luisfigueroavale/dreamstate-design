"""Signal funnel: four hexagonal rings narrowing toward one glowing core.

Metaphor: many signals come in at the top, the rings qualify them, and
one lead comes out lit. Six small beads sit on the top ring as the
incoming signals. The rings counter-rotate by 60 degrees over the loop.
A hexagon repeats every 60 degrees, so the last frame meets the first.

    blender -b -P 3d/scenes/signal-funnel/build.py -- --preset clay --still work/3d/signal-funnel/clay.png
    blender -b -P 3d/scenes/signal-funnel/build.py -- --preset final --still work/3d/signal-funnel/still.png
    blender -b -P 3d/scenes/signal-funnel/build.py -- --preset final --frames work/3d/signal-funnel/frames
"""

import math
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "lib"))
import bpy  # noqa: E402
import ds3d  # noqa: E402

FRAMES = 36          # 3 s at 12 fps
TURN = 60            # degrees, the hexagon's symmetry angle
RINGS = (            # (radius, height, tube)
    (2.30, 1.35, 0.13),
    (1.78, 0.55, 0.12),
    (1.28, -0.20, 0.11),
    (0.82, -0.90, 0.10),
)


def hex_ring(name, radius, z, tube):
    bpy.ops.mesh.primitive_torus_add(
        major_segments=6, minor_segments=24,
        major_radius=radius, minor_radius=tube, location=(0, 0, z))
    ring = bpy.context.object
    ring.name = ring.data.name = name
    bpy.ops.object.shade_smooth()
    return ring


def sphere(name, radius, location, subdivisions=4):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=subdivisions, radius=radius, location=location)
    obj = bpy.context.object
    obj.name = obj.data.name = name
    bpy.ops.object.shade_smooth()
    return obj


def build(args):
    palette = ds3d.load_palette(args.palette)
    ds3d.reset("Signal funnel")
    col = ds3d.collection("Signal funnel")
    root = ds3d.empty("Funnel", col)

    metal = ds3d.satin_metal("Ring metal", palette["hero"])
    bead_mat = ds3d.principled("Bead", palette["accent"], Roughness=0.2, Coat_Weight=1.0)
    core_mat = ds3d.glow("Core glow", palette["glow"], strength=3.0)
    shell_mat = ds3d.clear_glass("Core shell", palette["accent"], roughness=0.08)
    floor_mat = ds3d.principled("Floor", palette["background"], Roughness=0.75, Specular_IOR_Level=0.2)

    for i, (radius, z, tube) in enumerate(RINGS):
        pivot = ds3d.empty(f"Ring {i + 1} pivot", col)
        pivot.parent = root
        ring = hex_ring(f"Ring {i + 1}", radius, z, tube)
        ds3d.assign(ring, metal)
        ds3d.move_to(ring, col, pivot)
        if i == 0:
            for k in range(6):  # one bead on each corner of the top ring
                a = math.radians(60 * k)
                bead = sphere(f"Signal {k + 1}", 0.17, (radius * math.cos(a), radius * math.sin(a), z + tube + 0.17), 3)
                ds3d.assign(bead, bead_mat)
                ds3d.move_to(bead, col, pivot)
        ds3d.spin_loop(pivot, TURN, FRAMES, direction=1 if i % 2 == 0 else -1)

    core = sphere("Core", 0.26, (0, 0, -1.72))
    ds3d.assign(core, core_mat)
    ds3d.move_to(core, col, root)
    shell = sphere("Core shell", 0.42, (0, 0, -1.72))
    ds3d.assign(shell, shell_mat)
    ds3d.move_to(shell, col, root)

    bpy.ops.mesh.primitive_plane_add(size=400, location=(0, 0, -2.4))
    floor = bpy.context.object
    floor.name = "Floor"
    ds3d.assign(floor, floor_mat)

    ds3d.world(palette["background"])
    ds3d.camera(root, (8.2, -8.2, 5.6), ortho_scale=7.4)
    ds3d.three_point(root, palette)
    ds3d.clay_layer()
    bpy.context.scene.frame_set(1)


if __name__ == "__main__":
    args = ds3d.parse_args()
    build(args)
    ds3d.run(args)
