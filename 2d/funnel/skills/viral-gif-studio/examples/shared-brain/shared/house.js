// House frame: fills the CTA keyword and runs the 8 s loop on the keyword pill (rotating gradient rim + soft glow pulse).
// Keyword comes from window.CTA_WORD, set at the very top of each page.
(function () {
  const k = document.querySelector('.hf-key kbd');
  if (k) k.textContent = window.CTA_WORD || 'BOT';
  S.scenes.push((t) => {
    const rim = document.querySelector('.hf-key .rim'), glow = document.querySelector('.hf-key .glow');
    if (!rim) return;
    const a = (360 * t / S.L).toFixed(1); // one full turn per 8 s loop
    const blue = !!document.querySelector('.hf-foot.blue'); // blue-banner variant: white rim around the white pill
    rim.style.background = blue ? `conic-gradient(from ${a}deg, #FFFFFF, rgba(255,255,255,.35), #FFFFFF, rgba(255,255,255,.35), #FFFFFF)` : `conic-gradient(from ${a}deg, #12B2F8, #4E63F9, #A5E4FF, #12B2F8)`;
    const f = S.frac(t / 2); // glow pulse every 2 s
    glow.style.opacity = (0.25 + 0.55 * Math.sin(Math.PI * f)).toFixed(3);
    glow.style.transform = `scale(${(1 + 0.08 * Math.sin(Math.PI * f)).toFixed(3)})`;
  });
})();
