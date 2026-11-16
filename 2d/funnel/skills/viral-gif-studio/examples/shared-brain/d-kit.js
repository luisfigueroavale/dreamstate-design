// A-brain-2d kit (Nov 15 2026). Flat cards, a flat node-network brain, dashed elbow wires, and a self-check that fails on:
// wire over text, wire crossing wire, card over card, clipped text, text under 15px. All numbers are example data.
const SEATS = {
  cos: ['Chief of Staff', '#D4D4D8', '#0B0B0F'], ol: ['Outbound Lead', '#F59E0B', '#0B0B0F'], ls: ['Lead Sourcer', '#FDE047', '#0B0B0F'],
  oc: ['Outbound Copywriter', '#FB923C', '#0B0B0F'], sd: ['Sequences & Deliverability', '#EF4444', '#FFFFFF'], se: ['Social Engagement', '#C2410C', '#FFFFFF'],
  rm: ['Reply Manager', '#F472B6', '#0B0B0F'], dr: ['Deal Reactivation', '#FDA4AF', '#0B0B0F'], hoc: ['Head of Content', '#A855F7', '#FFFFFF'],
  li: ['LinkedIn Writer', '#C084FC', '#0B0B0F'], xw: ['X Writer', '#7C3AED', '#FFFFFF'], yt: ['YouTube Writer', '#E879F9', '#0B0B0F'],
  rw: ['Reddit Writer', '#DDD6FE', '#0B0B0F'], gd: ['Graphic Designer', '#E2C391', '#0B0B0F'], lv: ['Launch Video', '#A8A29E', '#0B0B0F'],
  sl: ['Slide Designer', '#B08968', '#0B0B0F'], luis: ['you · Luis', '#FFFFFF', '#0B0B0F'],
};
const ORDER = ['cos', 'ol', 'ls', 'oc', 'se', 'sd', 'rm', 'dr', 'hoc', 'li', 'xw', 'yt', 'rw', 'gd', 'lv', 'sl'];
const C = (k) => SEATS[k][1];
const $ = (q) => document.querySelector(q);
const BRAND = ['#12B2F8', '#4E63F9'];

function head(x, y, c, sc = 1) {
  const w = 26 * sc, h = 22 * sc;
  return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${7.5 * sc}" fill="${c}" stroke="#0B0B0F" stroke-width="${1.4 * sc}"/>` +
    `<rect x="${x - 6 * sc}" y="${y - 5 * sc}" width="${4 * sc}" height="${9.5 * sc}" rx="${2 * sc}" fill="#0B0B0F"/><rect x="${x + 2 * sc}" y="${y - 5 * sc}" width="${4 * sc}" height="${9.5 * sc}" rx="${2 * sc}" fill="#0B0B0F"/>` +
    `<rect x="${x - 1.5 * sc}" y="${y - h / 2 - 5 * sc}" width="${3 * sc}" height="${5 * sc}" rx="1" fill="${c}"/>`;
}
const cursorSvg = (c) => `<svg width="16" height="20" viewBox="0 0 16 20"><path d="M2 1.5v15l3.8-3.6 2.8 6 2.6-1.2-2.8-5.8H14z" fill="${c}" stroke="#0B0B0F" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const who = (k) => `<span class="who">${cursorSvg(C(k))}<span class="pill" style="background:${C(k)};color:${SEATS[k][2]}">${SEATS[k][0]}</span></span>`;
const chip = (t, c) => `<span class="chip" style="--c:${c}">${t}</span>`;
const ICON = {
  radar: '<circle cx="9" cy="9" r="2.2" fill="#0B0B0F"/><path d="M4.5 4.5a6.4 6.4 0 0 0 0 9M13.5 4.5a6.4 6.4 0 0 1 0 9" stroke="#0B0B0F" stroke-width="2" fill="none" stroke-linecap="round"/>',
  mail: '<rect x="2" y="4" width="14" height="10" rx="2" fill="none" stroke="#0B0B0F" stroke-width="2"/><path d="M3 5l6 5 6-5" stroke="#0B0B0F" stroke-width="2" fill="none"/>',
  flow: '<circle cx="4" cy="9" r="2.4" fill="#0B0B0F"/><circle cx="14" cy="9" r="2.4" fill="#0B0B0F"/><path d="M6 9h6" stroke="#0B0B0F" stroke-width="2"/>',
  idea: '<path d="M9 2a5 5 0 0 0-3 9v2h6v-2a5 5 0 0 0-3-9z" fill="#0B0B0F"/><rect x="6.5" y="14" width="5" height="2" rx="1" fill="#0B0B0F"/>',
  pen: '<path d="M3 15l1-4 8-8 3 3-8 8z" fill="#0B0B0F"/>',
  studio: '<rect x="2.5" y="3" width="13" height="12" rx="2" fill="none" stroke="#0B0B0F" stroke-width="2"/><circle cx="7" cy="7.5" r="1.6" fill="#0B0B0F"/><path d="M3 14l4-4 3 3 2-2 3 3" stroke="#0B0B0F" stroke-width="1.8" fill="none"/>',
  reply: '<path d="M7 4L2 9l5 5M2 9h8a6 6 0 0 1 6 6" stroke="#0B0B0F" stroke-width="2" fill="none" stroke-linecap="round"/>',
  play: '<path d="M6 4l8 5-8 5z" fill="#0B0B0F"/>',
  check: '<path d="M3.5 9.5l3.5 3.5 7.5-8" stroke="#0B0B0F" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
};
const ico = (n, c = '#0B0B0F') => `<svg width="18" height="18" viewBox="0 0 18 18">${ICON[n].replaceAll('#0B0B0F', c)}</svg>`;

// card spec: {x,y,w,h,c,ic,title,meta,rows:[{t,k,s}] | html}
function card(s) {
  const rows = (s.rows || []).map((r) => `<div class="r"><div class="l1">${r.t}</div><div class="l2">${who(r.k)}${r.s ? `<span class="st">${r.s}</span>` : ''}</div></div>`).join('');
  return `<div class="card" id="${s.id || ''}" style="left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px;--c:${s.c}">
    <div class="hd"><span class="sq">${ico(s.ic)}</span>${s.title}${s.meta ? `<span class="meta">${s.meta}</span>` : ''}</div>${rows}${s.html || ''}</div>`;
}
// the message box the copywriter types into (lead story: signal > qualify > MESSAGE BOX > sequence)
const msgBox = (to, txt, k = 'oc') => `<div class="mbox" style="--c:${C(k)}"><div class="mh"><span class="mut">To:</span> ${to}<span class="mut" style="margin-left:auto">message box</span></div>
  <div class="mt">${txt}<i class="caret"></i></div><div class="mf">${who(k)}<span class="st">next ↓</span></div></div>`;
const doc = (d) => `<div class="doc" style="left:${d.x}px;top:${d.y}px;width:${d.w}px"><span class="fi"></span>${d.t}${d.n ? `<span class="new">${d.n}</span>` : ''}</div>`;

// flat 2D node-network brain (side view). Pure function of seed.
function brain(w, h, seed = 7, hot = []) {
  const R = S.rng(seed), cx = w * 0.47, cy = h * 0.46, a = w * 0.43, b = h * 0.38;
  const rad = (t) => 1 + 0.035 * Math.sin(11 * t + 1) + 0.022 * Math.sin(19 * t);
  const P = []; for (let i = 0; i <= 160; i++) { const t = (i / 160) * Math.PI * 2; P.push([cx + a * Math.cos(t) * rad(t), cy + b * Math.sin(t) * rad(t) * (Math.sin(t) > 0 ? 0.92 : 1)]); }
  const outline = 'M' + P.map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L') + 'Z';
  const inside = (x, y) => { const t = Math.atan2((y - cy) / b, (x - cx) / a); const r = Math.hypot((x - cx) / a, (y - cy) / b); return r < 0.9 * rad(t); };
  const N = []; let guard = 0;
  while (N.length < 46 && guard++ < 6000) { const x = cx - a + R() * 2 * a, y = cy - b + R() * 2 * b; if (inside(x, y) && N.every((n) => Math.hypot(n[0] - x, n[1] - y) > Math.min(w, h) * 0.085)) N.push([x, y]); }
  const E = new Set(); N.forEach((n, i) => { N.map((m, j) => [Math.hypot(m[0] - n[0], m[1] - n[1]), j]).sort((p, q) => p[0] - q[0]).slice(1, 4).forEach(([, j]) => E.add(i < j ? i + '-' + j : j + '-' + i)); });
  const cb = [cx + a * 0.62, cy + b * 0.86], stem = [cx + a * 0.3, cy + b * 0.82];
  const gid = 'bg' + seed;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">
    <defs><linearGradient id="${gid}" x1="0" x2="1"><stop offset="0" stop-color="${BRAND[0]}"/><stop offset="1" stop-color="${BRAND[1]}"/></linearGradient></defs>
    <path d="M${stem[0] - 9},${stem[1] - 6} q4,${h * 0.16} 4,${h * 0.18} h14 q0,-${h * 0.08} 6,-${h * 0.16}z" fill="#1B1B24" stroke="url(#${gid})" stroke-width="2"/>
    <ellipse cx="${cb[0]}" cy="${cb[1]}" rx="${a * 0.27}" ry="${b * 0.24}" fill="#14141C" stroke="url(#${gid})" stroke-width="2"/>
    <path d="${outline}" fill="#12B2F814" stroke="url(#${gid})" stroke-width="2.5"/>
    ${[...E].map((e) => { const [i, j] = e.split('-').map(Number); return `<line x1="${N[i][0].toFixed(1)}" y1="${N[i][1].toFixed(1)}" x2="${N[j][0].toFixed(1)}" y2="${N[j][1].toFixed(1)}" stroke="url(#${gid})" stroke-opacity=".55" stroke-width="1.4"/>`; }).join('')}
    ${N.map((n, i) => { const c = hot[i % 7 === 0 ? (i / 7) % hot.length : -1]; return `<circle cx="${n[0].toFixed(1)}" cy="${n[1].toFixed(1)}" r="${c ? 4.6 : 3}" fill="${c || (i % 3 ? '#7DD3FC' : '#FFFFFF')}"/>`; }).join('')}
  </svg>`;
}

// wires: {pts:[[x,y]...], c, kind:'up'|'flow'} in scene coords. Rounded elbows, dot at start, arrow at end.
function wirePath(pts, rr = 12) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [x, y] = pts[i], [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(x - px, y - py), l2 = Math.hypot(nx - x, ny - y), r = Math.min(rr, l1 / 2, l2 / 2);
    const ax = x - ((x - px) / l1) * r, ay = y - ((y - py) / l1) * r, bx = x + ((nx - x) / l2) * r, by = y + ((ny - y) / l2) * r;
    d += ` L${ax.toFixed(1)},${ay.toFixed(1)} Q${x},${y} ${bx.toFixed(1)},${by.toFixed(1)}`;
  }
  const e = pts[pts.length - 1]; return d + ` L${e[0]},${e[1]}`;
}
function wires(list) {
  return `<svg class="wires" viewBox="0 0 1032 970">${list.map((w) => {
    const p = w.pts, e = p[p.length - 1], q = p[p.length - 2], ang = Math.atan2(e[1] - q[1], e[0] - q[0]) * 180 / Math.PI;
    const dash = w.kind === 'flow' ? '' : 'stroke-dasharray="6 6"';
    return `<path d="${wirePath(p)}" fill="none" stroke="${w.c}" stroke-width="${w.kind === 'flow' ? 2.4 : 2.2}" ${dash} stroke-linecap="round"/>` +
      (w.kind === 'flow' ? '' : `<circle cx="${p[0][0]}" cy="${p[0][1]}" r="5" fill="${w.c}" stroke="#0A0A0D" stroke-width="2"/>`) +
      `<path d="M0,-6 L10,0 L0,6 z" fill="${w.c}" transform="translate(${e[0]},${e[1]}) rotate(${ang}) translate(-10,0)"/>`;
  }).join('')}</svg>`;
}

function toolbar(title) {
  return `<div class="tb"><span class="dots"><i></i><i></i><i></i></span><h3>${title}</h3><span class="ex">Example data</span>
    <svg class="heads" width="${16 * 25}" height="30">${ORDER.map((k, i) => head(13 + i * 25, 17, C(k), 0.78)).join('')}</svg><span class="live"><i></i>16 bots live</span></div><div class="rule"></div>`;
}

// ---- self-check ----
function selfCheck(W) {
  const sc = $('#scene').getBoundingClientRect(), off = [sc.left, sc.top];
  const texts = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n; const small = [];
  while ((n = tw.nextNode())) {
    if (!n.textContent.trim() || n.parentElement.closest('script,style')) continue;
    const fs = parseFloat(getComputedStyle(n.parentElement).fontSize); if (fs < 15) small.push(n.textContent.trim().slice(0, 20) + '@' + fs);
    const rg = document.createRange(); rg.selectNodeContents(n);
    for (const r of rg.getClientRects()) if (r.width > 1) texts.push({ x0: r.left - 3, y0: r.top - 2, x1: r.right + 3, y1: r.bottom + 2, t: n.textContent.trim().slice(0, 24) });
  }
  const segs = []; W.forEach((w, wi) => { for (let i = 0; i < w.pts.length - 1; i++) segs.push({ wi, a: [w.pts[i][0] + off[0], w.pts[i][1] + off[1]], b: [w.pts[i + 1][0] + off[0], w.pts[i + 1][1] + off[1]] }); });
  const segBox = (s) => ({ x0: Math.min(s.a[0], s.b[0]) - 1, x1: Math.max(s.a[0], s.b[0]) + 1, y0: Math.min(s.a[1], s.b[1]) - 1, y1: Math.max(s.a[1], s.b[1]) + 1 });
  const hit = (p, q) => p.x0 < q.x1 && q.x0 < p.x1 && p.y0 < q.y1 && q.y0 < p.y1;
  const issues = [];
  segs.forEach((s) => texts.forEach((t) => { if (hit(segBox(s), t)) issues.push(`wire${s.wi} over "${t.t}"`); }));
  for (let i = 0; i < segs.length; i++) for (let j = i + 1; j < segs.length; j++) if (segs[i].wi !== segs[j].wi && hit(segBox(segs[i]), segBox(segs[j]))) issues.push(`wire${segs[i].wi} x wire${segs[j].wi}`);
  const cards = [...document.querySelectorAll('#scene .card, #scene .core')].map((e) => e.getBoundingClientRect());
  for (let i = 0; i < cards.length; i++) for (let j = i + 1; j < cards.length; j++) if (hit({ x0: cards[i].left, y0: cards[i].top, x1: cards[i].right, y1: cards[i].bottom }, { x0: cards[j].left, y0: cards[j].top, x1: cards[j].right, y1: cards[j].bottom })) issues.push(`card${i} over card${j}`);
  document.querySelectorAll('#scene .card, #scene .core, #scene .r, #scene .doc, #scene .box2, #scene .mbox, #scene .tb').forEach((e) => {
    if (e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1) issues.push(`clip ${e.className} "${e.textContent.trim().slice(0, 30)}" ${e.scrollWidth}x${e.scrollHeight} > ${e.clientWidth}x${e.clientHeight}`);
    // children escaping
    const r = e.getBoundingClientRect(); [...e.querySelectorAll('*')].forEach((c) => { const q = c.getBoundingClientRect(); if (q.width && (q.right > r.right + 1 || q.bottom > r.bottom + 1)) issues.push(`overflow in ${e.className}: "${c.textContent.trim().slice(0, 24)}"`); });
  });
  if (small.length) issues.push('small text: ' + small.join(', '));
  if (/\u2014/.test(document.body.innerText)) issues.push('em dash present');
  return [...new Set(issues)];
}

function mount(html, W) {
  $('#scene').insertAdjacentHTML('beforeend', html + wires(W));
  window.__seek && window.__seek(1);
  requestAnimationFrame(() => { window.__report = selfCheck(W); window.__ready = true; });
}
