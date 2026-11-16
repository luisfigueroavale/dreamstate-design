// Shared helpers for the v2 GIFs. Every motion is periodic in L seconds, so frame L equals frame 0 (seamless loop).
// window.__seek(t) is what the capture script steps.
(function () {
  const L = 8;
  const TAU = Math.PI * 2;
  const clamp = (x, a = 0, b = 1) => Math.min(Math.max(x, a), b);
  const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);
  const frac = (x) => x - Math.floor(x);
  const lerp = (a, b, f) => a + (b - a) * f;
  function rng(seed) {
    let s = seed | 0;
    return () => {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // Typed lines: lines = [{text, at, speed}] -> visible lines at time t, fading out before the loop restarts.
  function typed(lines, t, fadeAt = L - 0.6) {
    if (t > fadeAt) return { lines: lines.map((l) => l.text), alpha: 1 - (t - fadeAt) / (L - fadeAt) };
    const out = [];
    for (const l of lines) {
      if (t < l.at) break;
      out.push(l.text.slice(0, Math.floor((t - l.at) * (l.speed || 40))));
    }
    return { lines: out, alpha: 1 };
  }
  // Isometric projection factory.
  function iso(cx, cy, k) {
    const C = 0.866;
    const P = (x, y, z = 0) => [cx + (x - y) * C * k, cy + (x + y) * 0.5 * k - z * k];
    const pts = (a) => a.map((p) => P(...p).map((v) => v.toFixed(1)).join(',')).join(' ');
    function box(x, y, w, d, z0, h, col, extra = '') {
      const z1 = z0 + h;
      const top = pts([[x - w, y - d, z1], [x + w, y - d, z1], [x + w, y + d, z1], [x - w, y + d, z1]]);
      const lf = pts([[x - w, y + d, z0], [x + w, y + d, z0], [x + w, y + d, z1], [x - w, y + d, z1]]);
      const rf = pts([[x + w, y - d, z0], [x + w, y + d, z0], [x + w, y + d, z1], [x + w, y - d, z1]]);
      return `<polygon points="${lf}" fill="${col[1]}" ${extra}/><polygon points="${rf}" fill="${col[2]}" ${extra}/><polygon points="${top}" fill="${col[0]}" ${extra}/>`;
    }
    return { P, pts, box };
  }
  window.S = { L, TAU, clamp, ease, frac, lerp, rng, typed, iso, scenes: [] };
  window.__timeline = { duration: L, build: 0 };
  window.__seek = (t) => {
    const u = ((t % L) + L) % L;
    window.S.scenes.forEach((f) => f(u));
  };
  // ?rec=<fps> renders every frame via SVG foreignObject and POSTs PNGs to the local receiver on :8788.
  async function record(fps) {
    const css = (await Promise.all([...document.querySelectorAll('link[rel=stylesheet]')].map((l) => fetch(l.href).then((r) => r.text())))).join('\n');
    const cv = document.createElement('canvas'); cv.width = 1080; cv.height = 1350;
    const cx = cv.getContext('2d');
    const n = Math.round(L * fps);
    for (let i = 0; i < n; i++) {
      window.__seek(i / fps);
      const clone = document.documentElement.cloneNode(true);
      clone.querySelectorAll('script, link').forEach((e) => e.remove());
      const live = [...document.querySelectorAll('canvas')], cl = [...clone.querySelectorAll('canvas')];
      cl.forEach((c, k) => { const img = document.createElement('img'); img.src = live[k].toDataURL(); img.id = c.id; img.setAttribute('style', 'position:absolute;left:0;top:0;width:1080px;height:1350px'); c.replaceWith(img); });
      const st = document.createElement('style'); st.textContent = css; clone.querySelector('head').appendChild(st);
      clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
      const xml = new XMLSerializer().serializeToString(clone);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><foreignObject width="100%" height="100%">${xml}</foreignObject></svg>`;
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
      cx.clearRect(0, 0, 1080, 1350); cx.drawImage(img, 0, 0);
      await fetch('http://localhost:8788/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ i, total: n, png: cv.toDataURL('image/png') }) });
      document.title = `rec ${i + 1}/${n}`;
    }
    document.title = 'rec done';
  }
  window.addEventListener('load', () => {
    const rec = location.search.match(/rec=(\d+)/);
    if (rec) { record(+rec[1]).catch((e) => (document.title = 'rec error ' + e)); return; }
    if (/capture/.test(location.search)) { window.__seek(0); return; }
    const t0 = performance.now();
    (function frame() {
      window.__seek((performance.now() - t0) / 1000);
      requestAnimationFrame(frame);
    })();
  });
})();
