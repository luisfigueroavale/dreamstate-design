"""Dreamstate 3D helpers for Blender 5.2 (bpy).

Every scene in 3d/scenes imports this file. It keeps the parts that
repeat in one place: the arguments, the palette, materials, the camera,
the lights, the clay layer, the loop and the render presets.

Run a scene headless from the repo root:
    blender -b -P 3d/scenes/<name>/build.py -- --palette preview --preset review --still work/3d/<name>/still.png
"""

import argparse
import json
import math
import os
import sys

import bpy

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

# A neutral stand-in so a blank checkout can render. It is grey on
# purpose. It is not the brand and never ships to the owner.
PREVIEW_PALETTE = {
    "background": "#101216",
    "hero": "#B8BEC7",
    "accent": "#E8ECF2",
    "glow": "#FFFFFF",
    "rim": "#DDE3EA",
}
PALETTE_KEYS = tuple(PREVIEW_PALETTE)

SIZES = {
    "portrait": (1080, 1350),  # LinkedIn and carousel
    "square": (1080, 1080),
    "wide": (1200, 627),
    "thumb": (1280, 720),
}


# ---------- arguments ----------

def parse_args(extra=None):
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser(prog="build.py")
    p.add_argument("--palette", choices=("preview", "brand"), default="preview",
                   help="preview is a grey stand-in; brand reads brand.local/3d.json")
    p.add_argument("--preset", choices=tuple(PRESETS), default="review")
    p.add_argument("--size", choices=tuple(SIZES), default="portrait")
    p.add_argument("--samples", type=int, help="override the preset's sample count")
    p.add_argument("--save", help="write the .blend here")
    p.add_argument("--still", help="render one still PNG here")
    p.add_argument("--frame", type=int, default=1, help="frame for --still")
    p.add_argument("--frames", help="render the loop as PNGs into this folder")
    p.add_argument("--cpu", action="store_true", help="skip the GPU")
    for flag, kw in (extra or {}).items():
        p.add_argument(flag, **kw)
    return p.parse_args(argv)


# ---------- color ----------

def hex_to_linear(value):
    """sRGB hex string to the linear RGBA tuple bpy expects."""
    h = value.strip().lstrip("#")
    if len(h) != 6:
        raise ValueError(f"not a 6 digit hex color: {value!r}")
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255.0
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return (out[0], out[1], out[2], 1.0)


def load_palette(kind):
    if kind == "preview":
        print("[ds3d] palette: preview stand-in (grey). Not for delivery.", flush=True)
        return dict(PREVIEW_PALETTE)
    path = os.path.join(REPO, "brand.local", "3d.json")
    if not os.path.exists(path):
        sys.exit(f"[ds3d] stop: {path} is missing. Fill it from brand/3d.md, or ask the owner.")
    with open(path, encoding="utf8") as f:
        data = json.load(f)
    missing = [k for k in PALETTE_KEYS if not str(data.get(k, "")).startswith("#")]
    if missing:
        sys.exit(f"[ds3d] stop: brand.local/3d.json has no value for {', '.join(missing)}. Ask the owner.")
    return {k: data[k] for k in PALETTE_KEYS}


# ---------- scene ----------

def reset(name):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = name
    return scene


def collection(name):
    col = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(col)
    return col


def move_to(obj, col, parent=None):
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    col.objects.link(obj)
    if parent is not None:
        obj.parent = parent


def empty(name, col):
    e = bpy.data.objects.new(name, None)
    col.objects.link(e)
    e.empty_display_type = "PLAIN_AXES"
    return e


def world(color, strength=1.0):
    w = bpy.data.worlds.new("Backdrop")
    w.use_nodes = True
    bg = w.node_tree.nodes["Background"]
    bg.inputs["Color"].default_value = hex_to_linear(color)
    bg.inputs["Strength"].default_value = strength
    bpy.context.scene.world = w
    return w


# ---------- materials ----------

def _material(name, fake_user=False):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    m.use_fake_user = fake_user
    nodes = m.node_tree.nodes
    nodes.clear()
    out = nodes.new("ShaderNodeOutputMaterial")
    return m, nodes, out


def principled(name, color, fake_user=False, **inputs):
    """A Principled BSDF. Keyword names use underscores for spaces,
    for example Transmission_Weight=1.0 or Coat_Weight=0.5."""
    m, nodes, out = _material(name, fake_user)
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value = hex_to_linear(color)
    for key, value in inputs.items():
        socket = bsdf.inputs[key.replace("_", " ")]
        socket.default_value = hex_to_linear(value) if isinstance(value, str) else value
    m.node_tree.links.new(bsdf.outputs[0], out.inputs["Surface"])
    return m


def satin_metal(name, color, roughness=0.28):
    return principled(name, color, Metallic=1.0, Roughness=roughness, Coat_Weight=0.4)


def clear_glass(name, tint, roughness=0.05, ior=1.45):
    return principled(name, tint, Roughness=roughness, IOR=ior, Transmission_Weight=1.0)


def glow(name, color, strength=5.0):
    m, nodes, out = _material(name)
    e = nodes.new("ShaderNodeEmission")
    e.inputs["Color"].default_value = hex_to_linear(color)
    e.inputs["Strength"].default_value = strength
    m.node_tree.links.new(e.outputs[0], out.inputs["Surface"])
    return m


def assign(obj, mat):
    obj.data.materials.clear()
    obj.data.materials.append(mat)


# ---------- camera and lights ----------

def track(obj, target):
    c = obj.constraints.new("TRACK_TO")
    c.target = target
    c.track_axis = "TRACK_NEGATIVE_Z"
    c.up_axis = "UP_Y"


def camera(target, location, ortho_scale=None, lens=85):
    data = bpy.data.cameras.new("Camera")
    if ortho_scale:
        data.type = "ORTHO"
        data.ortho_scale = ortho_scale
    else:
        data.lens = lens
    cam = bpy.data.objects.new("Camera", data)
    bpy.context.scene.collection.objects.link(cam)
    cam.location = location
    track(cam, target)
    bpy.context.scene.camera = cam
    return cam


def area_light(name, target, location, size, power, color="#FFFFFF"):
    data = bpy.data.lights.new(name, "AREA")
    data.size = size
    data.energy = power
    data.color = hex_to_linear(color)[:3]
    light = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(light)
    light.location = location
    track(light, target)
    return light


def three_point(target, palette, scale=1.0):
    """Key from the front top, rim from behind in the rim color, soft fill.
    The rim is what separates a dark object from a dark backdrop."""
    s = scale
    area_light("Key", target, (5 * s, -6 * s, 8 * s), 6 * s, 650 * s * s)
    area_light("Rim", target, (-6 * s, 6 * s, 4 * s), 4 * s, 1300 * s * s, palette["rim"])
    area_light("Fill", target, (7 * s, 3 * s, 1.5 * s), 6 * s, 250 * s * s, palette["accent"])


# ---------- clay layer ----------

def clay_layer():
    """Adds a 'Clay' view layer with a matte grey override, off by default.
    The clay preset turns it on so shape and spacing get checked first."""
    scene = bpy.context.scene
    clay = principled("Clay", "#CFD3D9", fake_user=True, Roughness=0.9)
    scene.view_layers[0].name = "Final"
    layer = scene.view_layers.new("Clay")
    layer.material_override = clay
    layer.use = False
    return layer


# ---------- loop ----------

def spin_loop(obj, degrees, frames, direction=1):
    """Turn obj about Z by `degrees` over `frames` with a driver, so speed is
    constant and frame frames+1 equals frame 1. Pick `degrees` as the
    object's symmetry angle (360 / n for an n-fold shape) and the loop has
    no seam."""
    scene = bpy.context.scene
    scene.frame_start, scene.frame_end = 1, frames
    fc = obj.driver_add("rotation_euler", 2)
    step = direction * math.radians(degrees) / frames
    fc.driver.type = "SCRIPTED"
    fc.driver.expression = f"(frame - 1) * {step!r}"
    return fc


# ---------- render ----------

PRESETS = {
    "clay": {"samples": 16, "layer": "Clay", "percent": 50},
    "review": {"samples": 48, "layer": "Final", "percent": 50},
    "final": {"samples": 128, "layer": "Final", "percent": 100},
}


def _gpu(enabled):
    scene = bpy.context.scene
    if not enabled:
        scene.cycles.device = "CPU"
        return "CPU"
    try:
        prefs = bpy.context.preferences.addons["cycles"].preferences
        for kind in ("METAL", "OPTIX", "CUDA", "HIP", "ONEAPI"):
            try:
                prefs.compute_device_type = kind
            except TypeError:
                continue
            prefs.get_devices()
            gpus = [d for d in prefs.devices if d.type == kind]
            if gpus:
                for d in prefs.devices:
                    d.use = d.type == kind
                scene.cycles.device = "GPU"
                return kind
    except Exception as exc:  # no GPU support in this build
        print(f"[ds3d] GPU setup skipped: {exc}", flush=True)
    scene.cycles.device = "CPU"
    return "CPU"


def configure(args):
    scene = bpy.context.scene
    preset = PRESETS[args.preset]
    w, h = SIZES[args.size]
    scene.render.engine = "CYCLES"
    device = _gpu(not args.cpu)
    scene.cycles.samples = args.samples or preset["samples"]
    scene.cycles.use_denoising = True
    scene.cycles.seed = 7
    scene.cycles.max_bounces = 10
    scene.cycles.transmission_bounces = 10
    scene.cycles.glossy_bounces = 6
    scene.render.resolution_x, scene.render.resolution_y = w, h
    scene.render.resolution_percentage = preset["percent"]
    scene.render.film_transparent = False
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.render.image_settings.file_format = "PNG"
    for layer in scene.view_layers:
        layer.use = layer.name == preset["layer"]
    print(f"[ds3d] preset {args.preset}: {scene.cycles.samples} samples, "
          f"{w}x{h} at {preset['percent']}%, device {device}", flush=True)


def run(args):
    """Save, then render what the arguments ask for."""
    scene = bpy.context.scene
    configure(args)
    if args.save:
        path = os.path.abspath(args.save)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        bpy.ops.wm.save_as_mainfile(filepath=path, compress=True)
        print(f"[ds3d] saved {path}", flush=True)
    if args.still:
        path = os.path.abspath(args.still)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        scene.frame_set(args.frame)
        scene.render.filepath = path
        bpy.ops.render.render(write_still=True)
        print(f"[ds3d] still {path}", flush=True)
    if args.frames:
        folder = os.path.abspath(args.frames)
        os.makedirs(folder, exist_ok=True)
        scene.render.filepath = os.path.join(folder, "")
        bpy.ops.render.render(animation=True)
        print(f"[ds3d] frames {folder} ({scene.frame_start} to {scene.frame_end})", flush=True)
