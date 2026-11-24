
/* =================== EXTENSION 12: glitch-app skin, GTA ghost, avatar booth, zen + quiet room, dataland museum, meaning cards =================== */
const Z12 = {};
/* ---------- the GTA ghost mascot ---------- */
try { Z12.ghost = R3D.mascot(360, 0); Z12.ghost2 = R3D.mascot(360, 1); } catch(_) { Z12.ghost = null; }
const ghostImg = (cls = "") => Z12.ghost ? `<img class="gtaghost ${cls}" src="${Z12.ghost}" alt="the ghost">` : ghostFit("classic");
(function(){
  const av = document.querySelector("#ghostrow .av"); if (av && Z12.ghost) av.innerHTML = ghostImg();
  const _dp12 = dpFor; dpFor = function(c){ if (c.id === "ghost" && Z12.ghost) return ghostImg(); return _dp12(c); };
})();

/* ---------- glitch wallpaper: bend / blurp / pixlt ---------- */
document.body.insertAdjacentHTML("afterbegin", `<canvas id="gbg" width="240" height="150"></canvas><div id="gbghero"><canvas id="gdav" width="240" height="180"></canvas><small>David, Michelangelo, 1501–04 · photo ${esc(DAVID.a)} · ${esc(DAVID.l)} · bent by GoMsn</small></div>`);
(function(){
  const c = $("#gbg"), x = c.getContext("2d"), W = c.width, H = c.height, img = x.createImageData(W, H), d = img.data;
  /* a lut that goes moss → acid green → white → magenta → violet → ink, like a solarized scan */
  const stops = [[0, [24, 30, 22]], [.18, [70, 92, 60]], [.34, [150, 255, 60]], [.46, [235, 255, 210]], [.58, [255, 70, 220]], [.72, [120, 60, 255]], [.86, [40, 20, 70]], [1, [110, 130, 95]]];
  const LUT = new Uint8Array(256 * 3); for (let i = 0; i < 256; i++) { const t = i / 255; let k = 0; while (k < stops.length - 2 && t > stops[k + 1][0]) k++; const [t0, c0] = stops[k], [t1, c1] = stops[k + 1], f = (t - t0) / (t1 - t0); for (let j = 0; j < 3; j++) LUT[i * 3 + j] = c0[j] + (c1[j] - c0[j]) * f; }
  Z12.LUT = LUT;
  let t = 0, last = 0;
  function frame(now){
    requestAnimationFrame(frame); if (now - last < 90 || document.hidden || document.body.classList.contains("zen") || document.body.classList.contains("inroom")) return; last = now; t += .035;
    for (let y = 0; y < H; y++) for (let xx = 0; xx < W; xx++) {
      const u = xx / W, v = y / H;
      let n = Math.sin(u * 6 + t) + Math.sin(v * 7 - t * 1.3) + Math.sin((u + v) * 5 + t * .7) + Math.sin(Math.hypot(u - .6, v - .4) * 14 - t * 2);
      n = (n + 4) / 8; const k = ((n * 2.2 + t * .05) % 1 + 1) % 1; const o = (y * W + xx) * 4, li = (k * 255 | 0) * 3;
      d[o] = LUT[li]; d[o + 1] = LUT[li + 1]; d[o + 2] = LUT[li + 2]; d[o + 3] = 255;
    }
    /* pixel-sort a few horizontal bands by brightness */
    for (let b = 0; b < 4; b++) { const y0 = (Math.sin(t * .7 + b * 2.1) * .5 + .5) * (H - 6) | 0, h = 2 + (b * 3 % 5);
      for (let y = y0; y < y0 + h; y++) { const row = []; for (let xx = 0; xx < W; xx++) { const o = (y * W + xx) * 4; row.push([d[o], d[o + 1], d[o + 2]]); } row.sort((a, b2) => (a[0] + a[1] + a[2]) - (b2[0] + b2[1] + b2[2])); row.forEach((p, xx) => { const o = (y * W + xx) * 4; d[o] = p[0]; d[o + 1] = p[1]; d[o + 2] = p[2]; }); } }
    /* datamosh blocks */
    if (Math.random() < .5) for (let k = 0; k < 6; k++) { const bw = 8 + Math.random() * 30 | 0, bh = 4 + Math.random() * 12 | 0, sx = Math.random() * (W - bw) | 0, sy = Math.random() * (H - bh) | 0, dx = (Math.random() - .5) * 20 | 0;
      for (let y = sy; y < sy + bh; y++) for (let xx = sx; xx < sx + bw; xx++) { const tx = Math.min(W - 1, Math.max(0, xx + dx)), o = (y * W + xx) * 4, o2 = (y * W + tx) * 4; d[o2] = d[o]; d[o2 + 1] = d[o + 1] + 30; d[o2 + 2] = d[o + 2]; } }
    x.putImageData(img, 0, 0);
  }
  requestAnimationFrame(frame);
  /* the David, bent: solarized through the same lut, rgb-split, re-glitched now and then */
  const dc = $("#gdav"), dx2 = dc.getContext("2d"), im = new Image();
  im.onload = () => {
    const paint = () => {
      dx2.drawImage(im, 0, 0, 240, 180); const id = dx2.getImageData(0, 0, 240, 180), p = id.data, src = p.slice();
      const shift = 2 + (Math.random() * 4 | 0), band = Math.random() < .5 ? [Math.random() * 180 | 0, 6 + Math.random() * 20 | 0, (Math.random() - .5) * 40 | 0] : null;
      for (let y = 0; y < 180; y++) for (let xx = 0; xx < 240; xx++) {
        const o = (y * 240 + xx) * 4; let sx = xx; if (band && y > band[0] && y < band[0] + band[1]) sx = Math.min(239, Math.max(0, xx + band[2]));
        const so = (y * 240 + sx) * 4, lum = (src[so] * .3 + src[so + 1] * .59 + src[so + 2] * .11) | 0, sol = lum > 128 ? 255 - lum : lum, k = ((sol * 2 + (xx >> 3) * 3) & 255) * 3;
        const ro = (y * 240 + Math.min(239, sx + shift)) * 4, rl = (src[ro] * .3 + src[ro + 1] * .59 + src[ro + 2] * .11) | 0;
        p[o] = (LUT[k] * .7 + rl * .3) | 0; p[o + 1] = LUT[k + 1]; p[o + 2] = (LUT[k + 2] * .8 + (255 - lum) * .2) | 0;
        if (Math.random() < .015) { p[o] = 255; p[o + 1] = 60; p[o + 2] = 230; }
      }
      dx2.putImageData(id, 0, 0);
    };
    paint(); setInterval(() => { if (!document.hidden && !document.body.classList.contains("zen")) paint(); }, 1400);
  };
  im.src = DAVID.d;
})();

/* ---------- GTA HUD: §-points, wanted stars, zen, who's online ---------- */
document.body.insertAdjacentHTML("beforeend", `<div id="hud"><div class="money" id="hudPts"></div><div class="stars" id="hudStars"></div><div class="hudbtns"><button id="hudOnline" title="who's online"><i class="plumb"></i><span></span></button><button id="hudZen" title="zen mode: everything goes quiet">☾ zen</button><button id="hudBooth" title="turn a selfie into an avatar">📸 avatar</button></div></div>`);
function paintHud(){
  $("#hudPts").textContent = "§" + String(XS.pts).padStart(8, "0");
  const lv = Math.min(5, 1 + Math.floor(XS.pts / 60)); $("#hudStars").innerHTML = Array.from({length: 5}, (_, i) => `<span class="${i < lv ? "on" : ""}">★</span>`).join("");
  const on = groups.reduce((a, G) => a + G.c.filter(c => c.st !== "off").length, 0); $("#hudOnline span").textContent = on + " online";
}
const _pp12 = paintPts; paintPts = function(){ _pp12(); paintHud(); }; paintHud(); setInterval(paintHud, 4000);

/* ---------- the cursor, on purpose ---------- */
if (matchMedia("(pointer:fine)").matches) {
  document.body.classList.add("ccur");
  document.body.insertAdjacentHTML("beforeend", `<div id="cur"><i class="plumb"></i><span></span></div>`);
  const cur = $("#cur"), lab = cur.querySelector("span"); let cx = 0, cy = 0, tx = 0, ty = 0;
  addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY;
    const h = e.target.closest && e.target.closest("a,button,.hs,.r3tag,[data-open],[data-go],.ct,.piece,.scard .st,.ico,select,label,.dlitem,.hopecard");
    cur.classList.toggle("big", !!h); lab.textContent = h ? (h.closest(".hs") ? "enter" : h.closest("a") && h.target === "_blank" ? "leave ↗" : "open") : ""; });
  (function mv(){ cx += (tx - cx) * .22; cy += (ty - cy) * .22; cur.style.transform = `translate(${cx + 14}px,${cy + 10}px)`; requestAnimationFrame(mv); })();
}

/* ---------- avatar booth: selfie → sim / ps2 / bend / glitch ---------- */
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="booth"><div class="bwrap">
  <div class="bhead"><b>avatar booth</b><span>turn a selfie into a game render. it never leaves your browser.</span><button class="bx" data-bclose>×</button></div>
  <div class="bmain"><div class="bstage"><canvas id="bcv" width="320" height="400"></canvas><label class="bdrop" id="bdrop">📸 drop a selfie here<br><small>or tap to choose one</small><input type="file" id="bfile" accept="image/*" hidden></label></div>
  <div class="bside"><div class="bgrp"><b>look</b>${[["sim", "sims 4 render"], ["ps2", "ps2 / gta san andreas"], ["bend", "bend (solarized, the David)"], ["glitch", "blurp / datamosh"], ["raw", "no filter, coward"]].map(([k, n]) => `<button class="bf" data-bf="${k}">${n}</button>`).join("")}</div>
  <div class="bgrp"><b>then</b><button class="bact" id="buse">🪞 make it my msn picture</button><button class="bact" id="bsave">⬇ save the image</button><button class="bact" id="bdoll">↩ go back to my closet doll</button></div>
  <small class="muted">the photo stays on this device, saved in your browser only.</small></div></div></div></div>`);
(function(){
  const cv = $("#bcv"), x = cv.getContext("2d"); let src = null, mode = "sim";
  const openB = () => { closeOverlays(); $("#booth").classList.add("open"); };
  window.openBooth = openB;
  $("#hudBooth").onclick = openB;
  $("#booth").addEventListener("click", e => { if (e.target.closest("[data-bclose]") || e.target.id === "booth") $("#booth").classList.remove("open"); const b = e.target.closest("[data-bf]"); if (b) { mode = b.dataset.bf; render(); } });
  const load = f => { if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { src = im; $("#bdrop").classList.add("has"); render(); }; im.src = r.result; }; r.readAsDataURL(f); };
  $("#bfile").onchange = e => load(e.target.files[0]);
  $("#bdrop").addEventListener("dragover", e => e.preventDefault()); $("#bdrop").addEventListener("drop", e => { e.preventDefault(); load(e.dataTransfer.files[0]); });
  const cover = (w, h) => { const k = Math.max(w / src.width, h / src.height), sw = w / k, sh = h / k; return [(src.width - sw) / 2, (src.height - sh) / 3, sw, sh]; };
  function kuwahara(p, w, h, r){ const out = new Uint8ClampedArray(p.length);
    for (let y = 0; y < h; y++) for (let xx = 0; xx < w; xx++) { let best = 1e9, br = 0, bg = 0, bb = 0;
      for (const [qx, qy] of [[-r, -r], [0, -r], [-r, 0], [0, 0]]) { let s = [0, 0, 0], s2 = 0, n = 0;
        for (let j = qy; j <= qy + r; j++) for (let i = qx; i <= qx + r; i++) { const X = Math.min(w - 1, Math.max(0, xx + i)), Y = Math.min(h - 1, Math.max(0, y + j)), o = (Y * w + X) * 4, l = p[o] + p[o + 1] + p[o + 2]; s[0] += p[o]; s[1] += p[o + 1]; s[2] += p[o + 2]; s2 += l * l; n++; }
        const m = (s[0] + s[1] + s[2]) / n, v = s2 / n - m * m; if (v < best) { best = v; br = s[0] / n; bg = s[1] / n; bb = s[2] / n; } }
      const o = (y * w + xx) * 4; out[o] = br; out[o + 1] = bg; out[o + 2] = bb; out[o + 3] = 255; }
    return out; }
  function render(){
    if (!src) return; const W = 320, H = 400;
    if (mode === "ps2") { const sw = 80, sh = 100, t = document.createElement("canvas"); t.width = sw; t.height = sh; const tx = t.getContext("2d"); tx.drawImage(src, ...cover(sw, sh), 0, 0, sw, sh);
      const id = tx.getImageData(0, 0, sw, sh), p = id.data, B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      for (let y = 0; y < sh; y++) for (let xx = 0; xx < sw; xx++) { const o = (y * sw + xx) * 4, th = (B[(y % 4) * 4 + xx % 4] / 16 - .5) * 28; for (let k = 0; k < 3; k++) p[o + k] = Math.round((p[o + k] * 1.08 + th) / 36) * 36; }
      tx.putImageData(id, 0, 0); x.imageSmoothingEnabled = false; x.drawImage(t, 0, 0, W, H); x.imageSmoothingEnabled = true; return; }
    x.drawImage(src, ...cover(W, H), 0, 0, W, H);
    let id = x.getImageData(0, 0, W, H), p = id.data;
    if (mode === "sim") { const sm = kuwahara(p, W, H, 3); for (let i = 0; i < p.length; i += 4) { for (let k = 0; k < 3; k++) { let v = sm[i + k]; v = (v - 128) * 1.12 + 132; p[i + k] = Math.round(v / 14) * 14; } const l = (p[i] + p[i + 1] + p[i + 2]) / 3; for (let k = 0; k < 3; k++) p[i + k] = l + (p[i + k] - l) * 1.18; } }
    if (mode === "bend") { const L = Z12.LUT; for (let i = 0; i < p.length; i += 4) { const lum = p[i] * .3 + p[i + 1] * .59 + p[i + 2] * .11, sol = lum > 128 ? 255 - lum : lum, k = ((sol * 2.2) & 255) * 3; p[i] = L[k] * .75 + p[i] * .25; p[i + 1] = L[k + 1] * .8 + p[i + 1] * .2; p[i + 2] = L[k + 2] * .8 + p[i + 2] * .2; if (Math.random() < .01) { p[i] = 255; p[i + 1] = 40; p[i + 2] = 220; } } }
    if (mode === "glitch") { const s = p.slice(); for (let b = 0; b < 26; b++) { const bw = 20 + Math.random() * 120 | 0, bh = 3 + Math.random() * 24 | 0, sx = Math.random() * (W - bw) | 0, sy = Math.random() * (H - bh) | 0, dx = (Math.random() - .5) * 80 | 0, ch = Math.random() * 3 | 0;
        for (let y = sy; y < sy + bh; y++) for (let xx = sx; xx < sx + bw; xx++) { const tx = Math.min(W - 1, Math.max(0, xx + dx)), o = (y * W + xx) * 4, o2 = (y * W + tx) * 4; p[o2] = s[o]; p[o2 + 1] = s[o + 1]; p[o2 + 2] = s[o + 2]; p[o2 + ch] = 255 - s[o + ch]; } }
      for (let y = 0; y < H; y += 1) { if (Math.random() < .06) { const row = []; for (let xx = 0; xx < W; xx++) { const o = (y * W + xx) * 4; row.push([p[o], p[o + 1], p[o + 2]]); } row.sort((a, b) => a[0] + a[1] + a[2] - b[0] - b[1] - b[2]); row.forEach((q, xx) => { const o = (y * W + xx) * 4; p[o] = q[0]; p[o + 1] = q[1]; p[o + 2] = q[2]; }); } } }
    x.putImageData(id, 0, 0);
  }
  $("#buse").onclick = () => { if (!src) { toast("drop a selfie first 📸"); return; } const t = document.createElement("canvas"); t.width = 160; t.height = 200; t.getContext("2d").drawImage(cv, 0, 0, 160, 200); XS.myPhoto = t.toDataURL("image/jpeg", .82); XS.dpOff = false; xsave(); myDP(); toast("new display picture. everyone online noticed."); badge("stylist"); };
  $("#bsave").onclick = () => { if (!src) return; const a = document.createElement("a"); a.href = cv.toDataURL("image/png"); a.download = "my-gomsn-avatar.png"; a.click(); };
  $("#bdoll").onclick = () => { delete XS.myPhoto; xsave(); myDP(); toast("back to your closet doll."); };
  const _mdp = myDP; myDP = function(){ if (XS.myPhoto && !XS.dpOff) { const av = document.querySelector("#cl .me .av"); if (av) { av.classList.add("av10me"); av.innerHTML = `<img src="${XS.myPhoto}" alt="me">`; } const m = $("#chatMeDP"); if (m) m.innerHTML = `<img src="${XS.myPhoto}" alt="me">`; return; } _mdp(); };
  myDP();
  const crow = document.querySelector("#closet .row"); if (crow) crow.insertAdjacentHTML("beforeend", `<button class="xp" onclick="openBooth()">📸 or turn a selfie into an avatar</button>`);
})();

/* ---------- meaning cards: everything you pocket, explained, visually ---------- */
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="mean"><div class="mwrap" id="mwrap"></div></div>`);
const KGRAD = {read: ["#ffd98a", "#ff7a3c"], watch: ["#ff3d8e", "#5a0d3a"], listen: ["#7fd8ff", "#3a1a8a"], visit: ["#9bff6a", "#1a5a3a"], object: ["#c9b6ff", "#ff3d8e"], idea: ["#fff6ee", "#9b5cff"], person: ["#b8f3ff", "#1d5566"]};
function meanArt(it){
  if (it.img) return `<img src="${it.img}" alt="">`;
  if (it.art) return it.art;
  const [a, b] = KGRAD[it.k] || KGRAD.idea, e = (KINDS[it.k] || KINDS.idea)[0];
  return `<div class="mgen" style="background:linear-gradient(135deg,${a},${b})"><span>${e}</span><i>${esc(it.t)}</i></div>`;
}
function openMeaning(it, fromStash){
  closeOverlays();
  const inStash = XS.stash.find(s => s.key === (it.t + "|" + (it.by || "")).toLowerCase() || s.id === it.id);
  const s = inStash || it;
  $("#mwrap").innerHTML = `<button class="bx" data-mclose>×</button>
    <div class="mart">${meanArt(s)}<div class="mscan"></div></div>
    <div class="mtxt"><div class="mk">${(KINDS[s.k] || KINDS.idea)[0]} ${(KINDS[s.k] || KINDS.idea)[1]}${s.y ? " · " + esc(String(s.y)) : ""}${s.by ? " · " + esc(s.by) : ""}</div>
      <h2>${esc(s.t)}</h2>
      ${s.line ? `<div class="mline"><b>what it is</b>${esc(s.line)}</div>` : ""}
      ${s.crit ? `<div class="mghost">${ghostImg("sm")}<div><b>GoMsn says</b>${esc(s.crit)}</div></div>` : ""}
      <div class="mai" id="mai">${s.mean ? esc(s.mean).replace(/\n/g, "<br>") : `<button class="bact" id="mask">✦ explain it to me like a friend would</button>`}</div>
      <div class="mgo"><b>go deeper</b>${explore(s)}</div>
      ${s.credit ? `<small class="muted">${esc(s.credit)}</small>` : ""}
      <div class="mrow">${inStash ? `<span class="pill s2">in your stash ✓</span>` : `<button class="bact" id="mpocket">🎒 pocket it</button>`}</div></div>`;
  $("#mean").classList.add("open");
  const mp = $("#mpocket"); if (mp) mp.onclick = () => { collect({t: it.t, y: it.y, by: it.by || "", k: it.k || "object", src: it.src || "the museum", img: it.img, line: it.line, crit: it.crit, credit: it.credit}); openMeaning(it); };
  const ma = $("#mask"); if (ma) ma.onclick = async () => {
    const S = await getSample(), out = $("#mai");
    if (!S) { out.textContent = "the explainer works on this page's claude.ai link when you're signed in."; return; }
    out.textContent = "thinking…";
    const prompt = `Explain "${s.t}"${s.y ? " (" + s.y + ")" : ""}${s.by ? " by " + s.by : ""} to a curious friend on a nostalgia site about the 90s-2000s internet era. Plain text, three short labelled lines exactly:\nwhat it is: ...\nwhy it matters: ...\nstart here: ... (one concrete first step: a track, chapter, scene or search)\nUnder 90 words total. Wry, warm, no hype words. Only state facts you are sure of.`;
    try { const r = await S(prompt, {cache: false, onText: ({text}) => { out.textContent = text; }}); const txt = typeof r === "string" ? r : out.textContent; if (inStash) { inStash.mean = txt; xsave(); } }
    catch(e) { out.textContent = "the ghost lost signal. try again in a minute."; }
  };
}
$("#mean").addEventListener("click", e => { if (e.target.closest("[data-mclose]") || e.target.id === "mean") $("#mean").classList.remove("open"); });
const _col12 = collect; collect = function(it){ _col12(it); };
/* stash: thumbnails + click a title to see what it means */
const _rs12 = renderStash; renderStash = function(){ _rs12(); document.querySelectorAll("#stBody .scard").forEach(c => { const id = c.id.slice(3), s = XS.stash.find(x => x.id === id); if (!s) return; const st = c.querySelector(".st"); if (st) { st.classList.add("mlink"); st.title = "what does it mean?"; }
  if (!c.querySelector(".sthumb")) c.insertAdjacentHTML("afterbegin", `<div class="sthumb" data-smean="${s.id}">${meanArt(s)}</div>`); }); };
$("#stBody").addEventListener("click", e => { const t = e.target.closest(".scard .st, [data-smean]"); if (!t) return; const id = (t.dataset.smean || t.closest(".scard").id.slice(3)); const s = XS.stash.find(x => x.id === id); if (s) openMeaning(s, true); }, true);
const _ex12 = explore; explore = function(s){ let h = _ex12(s); const q = encodeURIComponent(`${s.t} ${s.by || ""}`.trim()); if (s.k === "listen") h += `<a href="https://play.anghami.com/search/${q}" target="_blank" rel="noopener">anghami ↗</a>`; return h; };

/* ---------- dataland: the museum, in three dimensions ---------- */
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="dl"><div id="dlhost"></div>
  <div class="dlhud"><div class="dltop"><b>DATALAND</b><span id="dlsub"></span><button class="bx" data-dlclose>×</button></div>
  <div class="dltabs" id="dltabs"></div><div class="dlhover" id="dlhover"></div>
  <div class="dlbar"><i id="dlprog"></i></div><div class="dlhint">scroll or drag to float through · click anything to see what it means · <a href="#" id="dlflat">flat view</a></div></div></div>`);
(function(){
  let inst = null, wing = "phones";
  const svgUri = s => { if (!/^<svg/.test(s.trim())) return null; if (!/xmlns=/.test(s)) s = s.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"'); return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s); };
  const textCard = (t, y) => { const c = document.createElement("canvas"); c.width = c.height = 320; const x = c.getContext("2d"); const g = x.createLinearGradient(0, 0, 320, 320); g.addColorStop(0, "#1b1650"); g.addColorStop(1, "#ff3d8e"); x.fillStyle = g; x.fillRect(0, 0, 320, 320); x.fillStyle = "#fff"; x.font = "bold 26px Space Grotesk"; const words = String(t).split(" "); let line = "", yy = 140; words.forEach(w => { if (x.measureText(line + w).width > 270) { x.fillText(line, 24, yy); yy += 32; line = ""; } line += w + " "; }); x.fillText(line, 24, yy); x.font = "18px Space Mono"; x.fillText(String(y || ""), 24, 290); return c.toDataURL(); };
  const WINGS = () => [{id: "phones", t: "Ringtone Era", sub: "real phones, 1996–2007", items: OBJPHOTOS.filter(o => o.w === "phones")}, {id: "objects", t: "The Counter", sub: "real objects from the bedroom floor, 1951–2005", items: OBJPHOTOS.filter(o => o.w === "objects")}]
    .concat(EXHIBITS.filter(e => !["phones", "counter"].includes(e.id)).map(e => ({id: e.id, t: e.t, sub: e.sub, items: (() => { try { return e.pieces().map(p => ({t: p.t, y: p.y, line: p.line, crit: p.crit, img: (p.art && svgUri(p.art)) || textCard(p.t, p.y), k: "object", src: e.t})); } catch(_) { return []; } })()})));
  function show(id){
    const W = WINGS(), w = W.find(x => x.id === id) || W[0]; wing = w.id;
    $("#dltabs").innerHTML = W.map(x => `<button class="${x.id === wing ? "on" : ""}" data-dlw="${x.id}">${esc(x.t)}</button>`).join("");
    $("#dlsub").textContent = w.sub;
    if (inst) inst.dispose();
    if (!w.items.length) { $("#dlhover").textContent = "this wing is empty. bury something in the archive."; inst = null; return; }
    inst = R3D.dataland($("#dlhost"), w.items.map(i => Object.assign({k: "object", src: w.t}, i)), {
      open: it => openMeaning(it),
      hover: it => { const h = $("#dlhover"); h.innerHTML = it ? `<b>${esc(it.t)}</b>${it.y ? " · " + esc(String(it.y)) : ""}<br><span>${esc(it.line || "")}</span>` : ""; },
      progress: p => { $("#dlprog").style.width = (p * 100) + "%"; }
    });
    inst.start();
  }
  window.openDataland = id => { closeOverlays(); $("#dl").classList.add("open"); markDock("gallery"); show(id || wing); tone([[392,.1],[523,.1],[784,.25]], "sine", .03); };
  $("#dltabs").addEventListener("click", e => { const b = e.target.closest("[data-dlw]"); if (b) show(b.dataset.dlw); });
  $("#dl").addEventListener("click", e => { if (e.target.closest("[data-dlclose]")) { $("#dl").classList.remove("open"); inst && inst.stop(); } });
  $("#dlflat").onclick = e => { e.preventDefault(); $("#dl").classList.remove("open"); inst && inst.stop(); Z12.flat = 1; openGallery(wing === "objects" ? "counter" : wing); Z12.flat = 0; };
  const _og12 = openGallery; openGallery = function(id){ if (Z12.flat || document.body.classList.contains("zen")) return _og12(id); window.openDataland(id === "counter" ? "objects" : id); };
  const _co12 = closeOverlays; closeOverlays = function(){ _co12(); if ($("#dl").classList.contains("open")) { $("#dl").classList.remove("open"); inst && inst.stop(); } };
})();

/* ---------- who's online: one calm list ---------- */
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="online"><div class="onwrap"><div class="bhead"><b>who's online</b><span>tap someone to talk</span><button class="bx" data-onclose>×</button></div><div id="onlist"></div></div></div>`);
function openOnline(){
  closeOverlays();
  const rows = []; rows.push({id: "ghost", n: "GoMsn (the ghost)", st: "on", pm: "appearing offline. dressed for it.", av: ghostImg()});
  groups.forEach(G => G.c.forEach(c => { if (c.st === "off") return; const a = c.lens ? portrait(gfit(c.id)) : (c.prof ? ghostAv(c.prof.av) : ghostFit(c.fit || SECTION_FIT[c.id] || "classic")); rows.push({id: c.id, n: c.n, st: c.st, pm: c.pm, av: a, g: G.g}); }));
  $("#onlist").innerHTML = rows.map(r => `<div class="onrow" data-onchat="${r.id}"><span class="onav">${r.av}</span><div><b>${esc(r.n)}</b><small>${esc(r.pm || "")}</small></div><i class="plumb ${r.st}"></i></div>`).join("");
  $("#online").classList.add("open");
}
$("#hudOnline").onclick = openOnline;
$("#online").addEventListener("click", e => { if (e.target.closest("[data-onclose]") || e.target.id === "online") { $("#online").classList.remove("open"); return; } const r = e.target.closest("[data-onchat]"); if (r) { $("#online").classList.remove("open"); openChat(r.dataset.onchat); } });

/* ---------- the quiet room: intentions, a note to a stranger, the wall of hope, breathing ---------- */
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="quiet"><div class="qbg"></div><div class="qwrap">
  <div class="qhead"><b>the quiet room</b><span>no badges, no pings. stay as long as you like.</span><button class="bx" data-qclose>×</button></div>
  <div class="qtabs" id="qtabs"><button data-qt="breathe" class="on">breathe</button><button data-qt="intent">today i intend to…</button><button data-qt="bottle">a note to a stranger</button><button data-qt="hope">the wall of hope</button></div>
  <div class="qbody" id="qbody"></div></div></div>`);
(function(){
  let tab = "breathe", hopeRows = [], bottleRows = [];
  const sub = (name, cb) => xready.then(() => { if (!XDB) return cb([]); try { XDB.collection(name).onSnapshot(s => cb(s.docs.flatMap(d => (d.data().items || []).map(x => Object.assign({u: d.id}, x)))), () => cb([])); } catch(_) { cb([]); } });
  sub("hope", r => { hopeRows = r; if (tab === "hope") paint(); });
  sub("bottles", r => { bottleRows = r; });
  async function pushMine(name, item){
    item.ts = Date.now(); item.by = (me.nick || "a ghost").slice(0, 30);
    await xready;
    if (XDB && XUID) { try { const ref = XDB.doc(name + "/" + XUID); const mine = ((XS.q12 = XS.q12 || {})[name] = (XS.q12[name] || []).concat(item).slice(-12)); await ref.set({items: mine, ts: Date.now()}); xsave(); return true; } catch(_) {} }
    (XS.local[name + "12"] = XS.local[name + "12"] || []).unshift(item); xsave(); return false;
  }
  const GHOSTNOTES = [{t: "whoever reads this: you're allowed to log off for a bit.", by: "GoMsn"}, {t: "drink some water. then text the person you thought of just now.", by: "GoMsn"}];
  function paint(){
    document.querySelectorAll("#qtabs button").forEach(b => b.classList.toggle("on", b.dataset.qt === tab));
    const b = $("#qbody");
    if (tab === "breathe") b.innerHTML = `<div class="breathe"><div class="bcirc"><span id="bword">in</span></div><p>in for 4 · hold for 4 · out for 6.<br>three rounds and you're somewhere else.</p></div>`;
    if (tab === "intent") { const L = XS.intents || []; b.innerHTML = `<form class="qform" id="qiF"><label>today i intend to</label><input id="qiT" maxlength="120" placeholder="be slow with myself" autocomplete="off"><button class="bact">set it</button></form>
      <div class="qlist">${L.slice(0, 12).map((x, i) => `<div class="qi ${x.done ? "done" : ""}" data-qi="${i}"><span>${new Date(x.ts).toLocaleDateString()}</span>${esc(x.t)}<button title="done">${x.done ? "✓" : "○"}</button></div>`).join("") || `<p class="muted">nothing yet. one small thing is plenty.</p>`}</div>`;
      $("#qiF").onsubmit = e => { e.preventDefault(); const t = $("#qiT").value.trim(); if (!t) return; (XS.intents = XS.intents || []).unshift({t, ts: Date.now()}); xsave(); paint(); }; }
    if (tab === "bottle") { b.innerHTML = `<form class="qform" id="qbF"><label>write to someone you'll never meet</label><textarea id="qbT" maxlength="400" placeholder="hey stranger,"></textarea><button class="bact">put it in a bottle</button></form>
      <div class="qcatch"><button class="bact" id="qcatch">🍾 catch a bottle someone else threw</button><div id="qgot"></div></div>`;
      $("#qbF").onsubmit = async e => { e.preventDefault(); const t = $("#qbT").value.trim(); if (!t) return; const shared = await pushMine("bottles", {t}); $("#qbT").value = ""; $("#qgot").innerHTML = `<div class="hopecard">${shared ? "thrown. someone, somewhere, will catch it." : "kept in your browser for now: sharing bottles needs this page opened from its claude.ai link, signed in."}</div>`; };
      $("#qcatch").onclick = () => { const pool = bottleRows.filter(x => x.u !== XUID); const n = pick(pool.length ? pool : GHOSTNOTES); $("#qgot").innerHTML = `<div class="hopecard bottle"><p>${esc(n.t)}</p><small>— ${esc(n.by || "a stranger")}</small></div>`; }; }
    if (tab === "hope") { const all = hopeRows.concat(XS.local.hope12 || []).sort((a, c) => (c.ts || 0) - (a.ts || 0));
      b.innerHTML = `<form class="qform" id="qhF"><label>add a letter to the wall: a hope, for you or for the world</label><textarea id="qhT" maxlength="500" placeholder="i hope…"></textarea><button class="bact">pin it to the wall</button></form>
      <div class="hopewall">${(all.length ? all : GHOSTNOTES.map(g => Object.assign({ghost: 1}, g))).map((h, i) => `<div class="hopecard" style="--r:${((i * 37) % 7 - 3) * .6}deg"><p>${esc(h.t)}</p><small>— ${esc(h.by || "someone")}${h.ghost ? " · waiting for the first letter" : ""}</small></div>`).join("")}</div>`;
      $("#qhF").onsubmit = async e => { e.preventDefault(); const t = $("#qhT").value.trim(); if (!t) return; const shared = await pushMine("hope", {t}); if (!shared) toast("pinned on your browser. the shared wall opens from the page's claude.ai link, signed in."); paint(); }; }
  }
  $("#qbody").addEventListener("click", e => { const q = e.target.closest("[data-qi] button"); if (q) { const i = +q.parentElement.dataset.qi; XS.intents[i].done = !XS.intents[i].done; xsave(); paint(); } });
  $("#qtabs").addEventListener("click", e => { const b = e.target.closest("[data-qt]"); if (b) { tab = b.dataset.qt; paint(); } });
  $("#quiet").addEventListener("click", e => { if (e.target.closest("[data-qclose]")) $("#quiet").classList.remove("open"); });
  setInterval(() => { const w = $("#bword"); if (!w || !$("#quiet").classList.contains("open")) return; const s = (Date.now() / 1000) % 14; w.textContent = s < 4 ? "in" : s < 8 ? "hold" : "out"; }, 250);
  window.openQuiet = t => { closeOverlays(); if (t) tab = t; paint(); $("#quiet").classList.add("open"); };
})();

/* ---------- zen mode: everything goes quiet ---------- */
(function(){
  const _tone12 = tone; tone = function(...a){ if (document.body.classList.contains("zen")) return; return _tone12(...a); };
  const _toast12 = toast; toast = function(...a){ if (document.body.classList.contains("zen")) return; return _toast12(...a); };
  const setZen = on => { document.body.classList.toggle("zen", on); XS.zen = on ? 1 : 0; xsave(); $("#hudZen").textContent = on ? "☀ wake up" : "☾ zen"; if (on) { document.querySelectorAll(".toast").forEach(t => t.remove()); window.openQuiet(); } };
  $("#hudZen").onclick = () => setZen(!document.body.classList.contains("zen"));
  if (XS.zen) setZen(true);
})();

/* ---------- places: add the quiet room and the booth to the map and the start card ---------- */
(function(){
  const _gp12 = goPlace; goPlace = function(k){ if (k === "quiet") { if (Q.open) leaveQuilt(); document.body.classList.remove("inroom"); window.openQuiet(); return; } if (k === "booth") { document.body.classList.remove("inroom"); window.openBooth(); return; } if (k === "dataland") { document.body.classList.remove("inroom"); window.openDataland(); return; } return _gp12(k); };
  const sc = $("#startcard"); if (sc) sc.querySelector("small").insertAdjacentHTML("beforebegin", `<button data-go="quiet">☾ just chill (the quiet room)</button>`);
  const _gfr = goFromRoom; goFromRoom = function(k, e){ if (k === "quiet") { document.body.classList.remove("inroom"); window.openQuiet(); return; } return _gfr(k, e); };
  try { VERT.forEach(v => { if (v.id === "talk") v.p.push(["quiet", "☾", "the quiet room", "breathe, intentions, a note to a stranger, the wall of hope"]); if (v.id === "share") v.p.push(["booth", "📸", "avatar booth", "turn a selfie into a game render"]); }); } catch(_) {}
})();

/* ---------- radio: your own accounts ---------- */
(function(){
  const _or12 = openRadio; openRadio = function(){ _or12(); const rb = $("#radioBody"); if (rb && !rb.querySelector(".acctbar")) rb.insertAdjacentHTML("afterbegin", `<div class="acctbar"><b>play it on your own account</b><span>Spotify and Anghami can't play inside this page yet: it blocks outside players. pocket a song and its card opens it straight in your app.</span><a class="sp" href="https://open.spotify.com/" target="_blank" rel="noopener">open Spotify ↗</a><a class="an" href="https://play.anghami.com/" target="_blank" rel="noopener">open Anghami ↗</a></div>`); };
})();
