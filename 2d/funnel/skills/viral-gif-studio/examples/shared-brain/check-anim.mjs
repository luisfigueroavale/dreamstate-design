// node check-anim.mjs d3b  -> self-check at load + tag-over-text check on frames across the loop
import { createRequire } from 'module';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));

function loadPlaywright() {
  let dir = here;
  for (let i = 0; i < 12; i++) {
    const pkg = path.join(dir, 'package.json');
    const mod = path.join(dir, 'node_modules', 'playwright');
    if (existsSync(pkg) && existsSync(mod)) {
      return createRequire(pkg)('playwright');
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  const cwdPkg = path.join(process.cwd(), 'package.json');
  if (existsSync(cwdPkg)) return createRequire(cwdPkg)('playwright');
  throw new Error('playwright not found. Run from the repo so node_modules/playwright is reachable, and do not download a browser without approval.');
}

const { chromium } = loadPlaywright();
const executablePath = process.env.CHROME_PATH || process.env.PLAYWRIGHT_CHROME_PATH || undefined;
const channel = executablePath ? undefined : (process.env.PLAYWRIGHT_CHROME_CHANNEL || 'chrome');
const launchOpts = { };
if (executablePath) launchOpts.executablePath = executablePath;
else if (channel) launchOpts.channel = channel;

const b = await chromium.launch(launchOpts);
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
p.on('pageerror', (e) => console.error('PAGEERROR', e.message));
const name = (process.argv[2] || 'd3b').replace(/\.html$/, '');
await p.goto(pathToFileURL(path.resolve(here, name + '.html')).href + '?capture');
await p.waitForFunction(() => window.__ready);
console.log(name, 'static', JSON.stringify(await p.evaluate(() => window.__report)));
let bad = 0;
const mv = {};
for (let i = 0; i < 120; i += 1) {
  const [r, m] = await p.evaluate((t) => {
    window.__seek(t);
    return [window.__tagCheck(), window.__moving || []];
  }, i / 15);
  if (r.length) {
    bad++;
    console.log('f' + i, r.join(' | '));
  }
  m.forEach((x) => {
    const k = x.split(' ')[0];
    mv[k] = (mv[k] || 0) + 1;
  });
}
console.log('moving-bot frames over text (of 120, 15 fps):', JSON.stringify(mv));
console.log('frames with issues', bad);
await b.close();
if (bad) process.exit(1);
