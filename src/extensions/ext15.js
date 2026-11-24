
/* =================== EXTENSION 15: your bubble. design your own screensaver, design your own room =================== */
XS.ss = XS.ss || {mode: "glitch", c1: "#9bff6a", c2: "#ff3dd4", c3: "#7fd8ff", bg: "#06040a", speed: 5, dens: 5, words: "", imgs: [], david: 1};
XS.roomT = XS.roomT || null;
document.body.insertAdjacentHTML("afterbegin", `<canvas id="ssv"></canvas>`);
const SS = (function(){
  const c = $("#ssv"), x = c.getContext("2d"); let W = 0, H = 0, st = {}, last = 0, sprites = [];
  const fit = () => { W = c.width = Math.ceil(innerWidth / 2); H = c.height = Math.ceil(innerHeight / 2); init(); };
  const P = () => XS.ss, pal = () => [P().c1, P().c2, P().c3], rnd = (a, b) => a + Math.random() * (b - a);
  function loadSprites(){ sprites = (P().imgs || []).map(u => { const im = new Image(); im.src = u; return im; }); if (!sprites.length) sprites = OBJPHOTOS.slice(0, 8).map(o => { const im = new Image(); im.src = o.img; return im; }); }
  function init(){ const p = P(), n = 2 + p.dens;
    st = {t: 0,
      polys: Array.from({length: Math.ceil(n / 3) + 1}, (_, i) => ({pts: Array.from({length: 4}, () => [rnd(0, W), rnd(0, H), rnd(-1, 1), rnd(-1, 1)]), col: pal()[i % 3], hist: []})),
      stars: Array.from({length: n * 40}, () => [rnd(-1, 1), rnd(-1, 1), rnd(.05, 1)]),
      pipes: [], grid: 18,
      floaters: Array.from({length: n}, (_, i) => ({x: rnd(0, W), y: rnd(0, H), vx: rnd(-1, 1), vy: rnd(-1, 1), s: rnd(40, 90), i, r: rnd(0, 6), vr: rnd(-.01, .01), tint: pal()[i % 3]})),
      blobs: Array.from({length: n}, (_, i) => ({x: rnd(0, W), y: rnd(0, H), vx: rnd(-.6, .6), vy: rnd(-.6, .6), r: rnd(60, 160), col: pal()[i % 3]})),
      wx: W};
    x.fillStyle = p.bg; x.fillRect(0, 0, W, H); loadSprites(); }
  const drawers = {
    mystify(sp){ const p = P(); x.fillStyle = p.bg + "22"; x.fillRect(0, 0, W, H); st.polys.forEach(pl => { pl.pts.forEach(q => { q[0] += q[2] * sp; q[1] += q[3] * sp; if (q[0] < 0 || q[0] > W) q[2] *= -1; if (q[1] < 0 || q[1] > H) q[3] *= -1; }); x.strokeStyle = pl.col; x.lineWidth = 1.5; x.shadowColor = pl.col; x.shadowBlur = 8; x.beginPath(); pl.pts.forEach((q, i) => i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1])); x.closePath(); x.stroke(); x.shadowBlur = 0; }); },
    stars(sp){ const p = P(); x.fillStyle = p.bg + "55"; x.fillRect(0, 0, W, H); st.stars.forEach((s, i) => { s[2] -= .004 * sp; if (s[2] <= .02) { s[0] = rnd(-1, 1); s[1] = rnd(-1, 1); s[2] = 1; } const k = 1 / s[2], px = W / 2 + s[0] * W * .5 * k * .3, py = H / 2 + s[1] * H * .5 * k * .3; x.fillStyle = pal()[i % 3]; const r = Math.min(4, k * .6); x.fillRect(px, py, r, r); }); },
    pipes(sp){ const p = P(), g = st.grid; if (!st.pipes.length || st.pipes.length > 14 + p.dens * 3) { if (st.pipes.length > 14 + p.dens * 3) { x.fillStyle = p.bg; x.fillRect(0, 0, W, H); } st.pipes = [{x: (rnd(0, W / g) | 0) * g, y: (rnd(0, H / g) | 0) * g, d: 0, col: pal()[st.pipes.length % 3], len: 0}]; }
      for (let k = 0; k < Math.ceil(sp / 2); k++) { const pp = st.pipes[st.pipes.length - 1]; if (Math.random() < .2) pp.d = (pp.d + (Math.random() < .5 ? 1 : 3)) % 4; const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][pp.d], nx = pp.x + dx * g, ny = pp.y + dy * g;
        const grd = x.createLinearGradient(pp.x - dy * 5, pp.y - dx * 5, pp.x + dy * 5, pp.y + dx * 5); grd.addColorStop(0, "#000"); grd.addColorStop(.5, pp.col); grd.addColorStop(1, "#000"); x.strokeStyle = grd; x.lineWidth = 9; x.lineCap = "round"; x.beginPath(); x.moveTo(pp.x, pp.y); x.lineTo(nx, ny); x.stroke();
        x.fillStyle = pp.col; x.beginPath(); x.arc(nx, ny, 5.5, 0, 7); x.fill(); pp.x = nx; pp.y = ny; pp.len++;
        if (nx < 0 || ny < 0 || nx > W || ny > H || pp.len > 60) st.pipes.push({x: (rnd(0, W / g) | 0) * g, y: (rnd(0, H / g) | 0) * g, d: rnd(0, 4) | 0, col: pal()[st.pipes.length % 3], len: 0}); } },
    float(sp){ const p = P(); x.fillStyle = p.bg; x.fillRect(0, 0, W, H); st.floaters.forEach(f => { f.x += f.vx * sp * .4; f.y += f.vy * sp * .4; f.r += f.vr * sp; if (f.x < 0 || f.x > W - f.s) { f.vx *= -1; f.tint = pick(pal()); } if (f.y < 0 || f.y > H - f.s) { f.vy *= -1; f.tint = pick(pal()); }
      const im = sprites[f.i % sprites.length]; x.save(); x.translate(f.x + f.s / 2, f.y + f.s / 2); x.rotate(Math.sin(f.r) * .25); x.shadowColor = f.tint; x.shadowBlur = 18; if (im && im.complete && im.naturalWidth) x.drawImage(im, -f.s / 2, -f.s / 2, f.s, f.s * im.naturalHeight / im.naturalWidth); x.restore(); }); },
    lava(sp){ const p = P(); x.globalCompositeOperation = "source-over"; x.fillStyle = p.bg; x.fillRect(0, 0, W, H); x.globalCompositeOperation = "lighter"; st.blobs.forEach(b => { b.x += b.vx * sp * .3; b.y += b.vy * sp * .3; if (b.x < -b.r || b.x > W + b.r) b.vx *= -1; if (b.y < -b.r || b.y > H + b.r) b.vy *= -1; const g = x.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r); g.addColorStop(0, b.col + "cc"); g.addColorStop(1, b.col + "00"); x.fillStyle = g; x.beginPath(); x.arc(b.x, b.y, b.r, 0, 7); x.fill(); }); x.globalCompositeOperation = "source-over"; },
    words(sp){ const p = P(), txt = (p.words || "appear offline · live online").toUpperCase(); x.fillStyle = p.bg + "66"; x.fillRect(0, 0, W, H); st.wx -= sp * .6; x.font = `400 ${Math.round(H / 4)}px Anton, sans-serif`; const w = x.measureText(txt + "   ").width; if (st.wx < -w) st.wx += w;
      for (let row = 0; row < 3; row++) { const y = H * (.32 + row * .3), off = (row % 2 ? -1 : 1) * (st.wx * (1 + row * .3)) % w; x.save(); x.transform(1, 0, row % 2 ? .2 : -.2, 1, 0, 0); x.lineWidth = 2; x.strokeStyle = pal()[row]; x.fillStyle = pal()[(row + 1) % 3] + "33"; for (let k = -1; k < 3; k++) { x.fillText(txt, off + k * w, y); x.strokeText(txt, off + k * w, y); } x.restore(); } }
  };
  function frame(now){ requestAnimationFrame(frame); const p = P(), b = document.body; const on = p.mode !== "glitch" && !b.classList.contains("inroom") && !b.classList.contains("zen") && !document.hidden && !b.classList.contains("nomotion"); c.style.display = p.mode === "glitch" ? "none" : "block"; if (!on || now - last < 33) return; last = now; st.t++; (drawers[p.mode] || drawers.mystify)(p.speed / 2); }
  addEventListener("resize", fit); fit(); requestAnimationFrame(frame);
  return {reset: () => { init(); applySS(); }};
})();
function applySS(){ const p = XS.ss, b = document.body; b.classList.toggle("ss-on", p.mode !== "glitch"); b.classList.toggle("ss-nodavid", !p.david); }
applySS();

/* ---------- the bubble studio: a drawer, so you see your changes live ---------- */
document.body.insertAdjacentHTML("beforeend", `<aside id="studio"><div class="sthead"><b>my bubble</b><button class="bx" data-stclose>×</button></div>
  <div class="sttabs"><button data-stt="ss" class="on">screensaver</button><button data-stt="room">my room</button><button data-stt="more">everything else</button></div><div id="stbody"></div></aside>`);
(function(){
  let tab = "ss";
  const MODES = [["glitch", "glitch (bend)"], ["mystify", "mystify lines"], ["stars", "starfield"], ["pipes", "3D pipes"], ["float", "floating things"], ["lava", "lava lamp"], ["words", "your words"]];
  const ROOMP = {"hamra night": {back: "#efdcc0", left: "#d8673d", floor: "#ffffff", rugA: "#1b1416", rugB: "#f1e9dc", rugEdge: "#c81e3a", sofa: "#3f6b3a", mood: "night"}, "paris attic": {back: "#f3ece2", left: "#e7dccb", floor: "#d9c3a5", rugA: "#2a3a5a", rugB: "#f4efe6", rugEdge: "#2a3a5a", sofa: "#8a1426", mood: "golden"}, "y2k bedroom": {back: "#d6f0ff", left: "#ffb3e6", floor: "#e8e0ff", rugA: "#ff3dd4", rugB: "#ffffff", rugEdge: "#7fd8ff", sofa: "#b48cff", mood: "day"}, "tokyo cube": {back: "#20202a", left: "#2a1a3a", floor: "#3a3a4a", rugA: "#ff3dd4", rugB: "#0a0a12", rugEdge: "#40ffe0", sofa: "#1a1a24", mood: "neon"}, "4am blue": {back: "#22304a", left: "#1a2440", floor: "#5a6a8a", rugA: "#0a1020", rugB: "#7fa8e8", rugEdge: "#ffffff", sofa: "#2a3a6a", mood: "blue"}};
  const RT = () => XS.roomT || Object.assign({}, ROOMP["hamra night"]);
  const sw = (key, val, src) => `<label class="stcol"><input type="color" data-${src}="${key}" value="${val}"><span>${key}</span></label>`;
  function paint(){
    document.querySelectorAll("#studio [data-stt]").forEach(b => b.classList.toggle("on", b.dataset.stt === tab));
    const b = $("#stbody"), p = XS.ss;
    if (tab === "ss") b.innerHTML = `<div class="stsec"><b>style</b><div class="stbtns">${MODES.map(([k, n]) => `<button data-ssm="${k}" class="${p.mode === k ? "on" : ""}">${n}</button>`).join("")}</div></div>
      <div class="stsec"><b>colours</b><div class="stcols">${sw("c1", p.c1, "ss")}${sw("c2", p.c2, "ss")}${sw("c3", p.c3, "ss")}${sw("bg", p.bg, "ss")}</div></div>
      <div class="stsec"><b>speed</b><input type="range" min="1" max="12" value="${p.speed}" data-ssr="speed"></div>
      <div class="stsec"><b>how much</b><input type="range" min="1" max="12" value="${p.dens}" data-ssr="dens"></div>
      <div class="stsec"><b>your words</b><input class="cuin" id="ssw" maxlength="60" value="${esc(p.words || "")}" placeholder="appear offline · live online">${sparkBtn("away", "#ssw")}</div>
      <div class="stsec"><b>your images (they float)</b><label class="bact cufile">🖼 add up to 3<input type="file" accept="image/*" multiple id="ssimg" hidden></label>${(p.imgs || []).length ? `<div class="stthumbs">${p.imgs.map((u, i) => `<img src="${u}" data-ssdel="${i}" title="tap to remove">`).join("")}</div>` : ""}</div>
      <div class="stsec"><label class="stchk"><input type="checkbox" data-ssc="david" ${p.david ? "checked" : ""}> keep the bent David on my desktop</label></div>
      <small class="muted">it's your screensaver. it saves on this device.</small>`;
    if (tab === "room") { const t = RT(); b.innerHTML = `<div class="stsec"><b>start from</b><div class="stbtns">${Object.keys(ROOMP).map(k => `<button data-rp="${k}">${k}</button>`).join("")}</div></div>
      <div class="stsec"><b>walls & floor</b><div class="stcols">${sw("back", t.back, "rt")}${sw("left", t.left, "rt")}${sw("floor", t.floor, "rt")}</div></div>
      <div class="stsec"><b>the rug</b><div class="stcols">${sw("rugA", t.rugA, "rt")}${sw("rugB", t.rugB, "rt")}${sw("rugEdge", t.rugEdge, "rt")}</div></div>
      <div class="stsec"><b>the sofa</b><div class="stcols">${sw("sofa", t.sofa, "rt")}</div></div>
      <div class="stsec"><b>light</b><div class="stbtns">${["night", "golden", "day", "neon", "blue"].map(m => `<button data-rm="${m}" class="${t.mood === m ? "on" : ""}">${m}</button>`).join("")}</div></div>
      <small class="muted">you're standing in it while you change it.</small>`; }
    if (tab === "more") b.innerHTML = `<div class="stsec"><p>text size, accent colour, sounds, your accounts, a line on your desktop:</p><button class="bact" data-more>open the settings</button></div>`;
  }
  const applyRoom = () => { if (window.R3DROOM && XS.roomT) window.R3DROOM.theme(XS.roomT); };
  $("#studio").addEventListener("click", e => {
    if (e.target.closest("[data-stclose]")) { $("#studio").classList.remove("open"); document.body.classList.remove("studio"); return; }
    const t = e.target.closest("[data-stt]"); if (t) { tab = t.dataset.stt; if (tab === "room") { closeOverlays(); if (!document.body.classList.contains("inroom")) window.enterRoom ? enterRoom() : goPlace("room"); } else if (tab === "ss") document.body.classList.remove("inroom"); paint(); return; }
    const m = e.target.closest("[data-ssm]"); if (m) { XS.ss.mode = m.dataset.ssm; xsave(); SS.reset(); paint(); return; }
    const d = e.target.closest("[data-ssdel]"); if (d) { XS.ss.imgs.splice(+d.dataset.ssdel, 1); xsave(); SS.reset(); paint(); return; }
    const rp = e.target.closest("[data-rp]"); if (rp) { XS.roomT = Object.assign({}, ROOMP[rp.dataset.rp]); xsave(); applyRoom(); paint(); return; }
    const rm = e.target.closest("[data-rm]"); if (rm) { XS.roomT = Object.assign(RT(), {mood: rm.dataset.rm}); xsave(); applyRoom(); paint(); return; }
    if (e.target.closest("[data-more]")) { $("#studio").classList.remove("open"); window.openCustom(); }
  });
  $("#studio").addEventListener("input", e => { const el = e.target;
    if (el.dataset.ss) { XS.ss[el.dataset.ss] = el.value; xsave(); if (XS.ss.mode !== "glitch") SS.reset(); }
    if (el.dataset.ssr) { XS.ss[el.dataset.ssr] = +el.value; xsave(); SS.reset(); }
    if (el.dataset.rt) { XS.roomT = Object.assign(RT(), {[el.dataset.rt]: el.value}); xsave(); applyRoom(); }
    if (el.id === "ssw") { XS.ss.words = el.value; xsave(); } });
  $("#studio").addEventListener("change", e => { const el = e.target;
    if (el.dataset.ssc) { XS.ss[el.dataset.ssc] = el.checked ? 1 : 0; xsave(); applySS(); }
    if (el.id === "ssimg") { const fs = [...el.files].slice(0, 3 - (XS.ss.imgs || []).length); fs.forEach(f => { const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"), k = 220 / Math.max(im.width, im.height); c.width = im.width * k; c.height = im.height * k; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); (XS.ss.imgs = XS.ss.imgs || []).push(c.toDataURL("image/png")); XS.ss.mode = "float"; try { xsave(); } catch(_) { toast("that one's too big to keep."); } SS.reset(); paint(); }; im.src = r.result; }; r.readAsDataURL(f); }); } });
  window.openStudio = (t) => { if (t) tab = t; closeOverlays(); $("#studio").classList.add("open"); document.body.classList.add("studio"); if (tab === "ss") document.body.classList.remove("inroom"); paint(); };
  $("#hud .hudbtns").insertAdjacentHTML("afterbegin", `<button id="hudBubble" title="design your screensaver and your room">🫧 my bubble</button>`);
  $("#hudBubble").onclick = () => window.openStudio("ss");
  /* the room listens for its design */
  const wait = setInterval(() => { if (window.R3DROOM) { clearInterval(wait); applyRoom(); } }, 300);
  const sc = $("#startcard"); if (sc) sc.querySelector("small").insertAdjacentHTML("beforebegin", `<button onclick="openStudio('room')">🫧 design my room</button>`);
  try { VERT.forEach(v => { if (v.id === "share") v.p.push(["bubble", "🫧", "my bubble", "design your screensaver and your room"]); }); } catch(_) {}
  const _gp15 = goPlace; goPlace = function(k){ if (k === "bubble") { window.openStudio("ss"); return; } return _gp15(k); };
})();
