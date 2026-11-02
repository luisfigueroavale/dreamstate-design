# Blender bridge (MCP)

The bridge lets Codex drive a running Blender. It is the open source `mcp-for-blender` package (MIT, GitHub ahujasid/blender-mcp). This repo does not vendor its code. It is installed with `uvx` and a Blender add-on.

## The rules for this team

- Codex only. No other AI app on the Mac gets the bridge. Do not run the package's one step `setup` command, because it edits the config of every AI app it finds.
- Telemetry off: `DISABLE_TELEMETRY=true` in the server's env.
- No asset downloads (Poly Haven, Sketchfab, Poly Pizza) and no paid AI model generation without the owner's yes on that item, after a credit quote.
- Save your Blender file before you connect. The bridge can run any Python inside Blender.
- One client connected at a time.
- The scripted route in `3d/scripts/` stays the source of truth. A scene made through the bridge is not done until it is written back into `3d/scenes/<name>/build.py`.

## Codex config

In `~/.codex/config.toml`:

```toml
[mcp_servers.blender]
command = "uvx"
args = ["mcp-for-blender"]

[mcp_servers.blender.env]
DISABLE_TELEMETRY = "true"
```

Restart Codex after a change. `codex mcp list` should show `blender`.

## The Blender add-on

Installed by hand into Blender 5.2's user add-on folder as `blender_mcp.py`, then enabled under Edit, Preferences, Add-ons, "Interface: MCP for Blender".

On a new Mac:

```sh
BLENDERMCP_ADDONS_DIR="$HOME/Library/Application Support/Blender/5.2/scripts/addons" \
DISABLE_TELEMETRY=true uvx mcp-for-blender install-addon
blender -b --python-expr "import addon_utils, bpy; addon_utils.enable('blender_mcp', default_set=True, persistent=True); bpy.ops.wm.save_userpref()"
```

In the add-on's sidebar panel, leave the Poly Haven, Sketchfab, Poly Pizza and AI generation boxes off. Turn one on only after the owner's yes for that piece.

## Starting a session

1. Open Blender and the file you want, saved.
2. In the 3D viewport press N, open the MCP for Blender tab and click Start MCP Server. The server is a local socket that runs only while Blender is open.
3. Open Codex and use the steps in [../prompts/README.md](../prompts/README.md).

If Codex says it cannot connect, Blender is closed or the server is not started.

## Updating

`uvx mcp-for-blender@latest update --dry-run` shows what would change. It also updates the add-on. Run it only on purpose, then restart Codex and re-enable the add-on.
