// Repo checks: dashes, files that must never be committed, skill shape,
// local links, and the banned-term scan from .banned-terms.local.
//   node scripts/check.mjs
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TEXT = /\.(md|mjs|js|css|html|json|py|sh|toml|ya?ml|txt)$/i;
const SKIP_DIRS = new Set([".git", "node_modules", "work", "brand.local", "audience.local"]);
const NEVER = [/^brand\.local(\/|$)/, /^audience\.local(\/|$)/, /(^|\/)\.banned-terms\.local$/, /(^|\/)work\//, /\.blend1?$/];

let failed = 0;
const bad = (msg) => { failed += 1; console.error(`FAIL ${msg}`); };

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const info = statSync(full, { throwIfNoEntry: false });
    if (!info) continue;
    if (info.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function tracked() {
  try {
    const out = execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    return out.split("\0").filter(Boolean);
  } catch {
    return null;
  }
}

const files = walk(root).map((f) => path.relative(root, f).split(path.sep).join("/"));
const text = files.filter((f) => TEXT.test(f) || f === "LICENSE");

// 1. No em or en dashes.
for (const f of text) {
  const body = readFileSync(path.join(root, f), "utf8");
  body.split("\n").forEach((line, i) => {
    if (/[\u2013\u2014]/.test(line)) bad(`${f}:${i + 1} has an em or en dash`);
  });
}

// 2. Files that must never be committed.
for (const f of tracked() ?? []) {
  if (NEVER.some((re) => re.test(f))) bad(`${f} is tracked but must stay local`);
}

// 3. Skill shape: frontmatter name matches the folder, and a description.
const skillDirs = ["skills", "2d/funnel/skills"];
for (const dir of skillDirs) {
  const abs = path.join(root, dir);
  if (!existsSync(abs)) continue;
  for (const name of readdirSync(abs)) {
    const file = path.join(abs, name, "SKILL.md");
    if (!statSync(path.join(abs, name)).isDirectory()) continue;
    if (!existsSync(file)) { bad(`${dir}/${name} has no SKILL.md`); continue; }
    const head = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/);
    if (!head) { bad(`${dir}/${name}/SKILL.md has no frontmatter`); continue; }
    if (!new RegExp(`^name: ${name}$`, "m").test(head[1])) bad(`${dir}/${name}/SKILL.md name does not match its folder`);
    if (!/^description: ".+"$/m.test(head[1])) bad(`${dir}/${name}/SKILL.md has no quoted description`);
  }
}

// 4. Local markdown links resolve (repo's own files, not the 2d copies).
for (const f of text.filter((f) => f.endsWith(".md") && !f.startsWith("2d/") || f === "2d/README.md")) {
  const body = readFileSync(path.join(root, f), "utf8");
  for (const m of body.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = m[1].split("#")[0];
    if (!target || /^[a-z]+:/i.test(target)) continue;
    if (!existsSync(path.resolve(root, path.dirname(f), target))) bad(`${f} links to missing ${target}`);
  }
}

// 5. 3D scenes: a scene.md, a build.py, a preview, and no color literal in build.py.
const scenes = path.join(root, "3d/scenes");
for (const name of existsSync(scenes) ? readdirSync(scenes) : []) {
  for (const need of ["scene.md", "build.py", "preview.png"]) {
    if (!existsSync(path.join(scenes, name, need))) bad(`3d/scenes/${name} has no ${need}`);
  }
  const py = path.join(scenes, name, "build.py");
  if (existsSync(py) && /["']#[0-9a-f]{6}["']/i.test(readFileSync(py, "utf8"))) bad(`3d/scenes/${name}/build.py names a color; use a palette slot`);
}

// 6. Banned terms from the local list.
function termsFile() {
  const here = path.join(root, ".banned-terms.local");
  if (existsSync(here)) return here;
  try {
    const common = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    const main = path.join(path.dirname(common), ".banned-terms.local");
    if (existsSync(main)) return main;
  } catch {}
  return process.env.BANNED_TERMS_FILE && existsSync(process.env.BANNED_TERMS_FILE) ? process.env.BANNED_TERMS_FILE : null;
}
const list = termsFile();
if (!list) {
  console.log("BANNED-TERM SCAN SKIPPED: no .banned-terms.local (one term per line, kept local).");
} else {
  const terms = readFileSync(list, "utf8").split(/\r?\n/).map((t) => t.trim()).filter((t) => t && !t.startsWith("#"));
  for (const f of text) {
    const body = readFileSync(path.join(root, f), "utf8").toLowerCase();
    for (const t of terms) {
      const esc = t.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(`(?<![a-z0-9])${esc}(?![a-z0-9])`).test(body)) bad(`${f} contains a banned term`);
    }
  }
  console.log(`banned-term scan: ${terms.length} terms, ${text.length} files`);
}

if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}
console.log(`ok: ${text.length} text files checked`);
