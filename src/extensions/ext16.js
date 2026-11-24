
/* =================== EXTENSION 16: the make room. your ringtone, your imagery, your world =================== */
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="make"><div class="crwrap mkwrap"><div class="bhead"><b>make</b><span>your ringtone, your images, your world. made by you, kept by you.</span><button class="bx" data-mkclose>×</button></div>
  <div class="crtabs" id="mktabs"><button data-mk="ring" class="on">📱 ringtone composer</button><button data-mk="bend">🖼 image bender</button><button data-mk="world">🌐 world maker</button></div><div id="mkbody"></div></div></div>`);
(function(){
  let tab = "ring", AC = null;
  const ac = () => { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === "suspended") AC.resume(); return AC; };
  /* ---------- ringtone composer: 16 steps, nokia square wave ---------- */
  const NOTES = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"], FREQ = {C5: 523.25, B4: 493.88, A4: 440, G4: 392, F4: 349.23, E4: 329.63, D4: 293.66, C4: 261.63};
  const HIJAZ = {C5: 523.25, B4: 466.16, A4: 440, G4: 392, F4: 349.23, E4: 329.63, D4: 277.18, C4: 261.63};
  XS.ring = XS.ring || {name: "my ringtone", steps: Array(16).fill(-1), bpm: 140, wave: "square", scale: "nokia"};
  XS.rings = XS.rings || [];
  const STYLES = {
    "nokia classic": () => [0, -1, 2, -1, 4, 4, -1, 2, 0, -1, 2, 4, 7, -1, 7, -1].map(n => n === -1 ? -1 : 7 - Math.min(7, n)),
    "y2k pop": () => Array.from({length: 16}, (_, i) => i % 4 === 3 ? -1 : [2, 4, 1, 3][i % 4] + (Math.random() < .3 ? 1 : 0)),
    "hijaz night": () => Array.from({length: 16}, (_, i) => i % 3 === 2 ? -1 : [7, 6, 5, 4, 5, 6, 3, 4][i % 8]),
    "random chaos": () => Array.from({length: 16}, () => Math.random() < .3 ? -1 : Math.random() * 8 | 0)
  };
  function playRing(r, loops = 1){ const c = ac(), step = 60 / r.bpm / 2, t0 = c.currentTime + .05, F = r.scale === "hijaz" ? HIJAZ : FREQ;
    for (let l = 0; l < loops; l++) r.steps.forEach((n, i) => { if (n < 0) return; const t = t0 + (l * 16 + i) * step, o = c.createOscillator(), g = c.createGain(); o.type = r.wave; o.frequency.value = F[NOTES[n]]; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + .005); g.gain.setValueAtTime(.12, t + step * .8); g.gain.linearRampToValueAtTime(0, t + step * .95); o.connect(g).connect(c.destination); o.start(t); o.stop(t + step); });
    return loops * 16 * step; }
  window.playMyRing = () => { if (XS.myRing) playRing(XS.myRing); };
  async function wavOf(r){ const step = 60 / r.bpm / 2, dur = 16 * step * 2 + .2, sr = 22050, oc = new OfflineAudioContext(1, Math.ceil(sr * dur), sr), F = r.scale === "hijaz" ? HIJAZ : FREQ;
    for (let l = 0; l < 2; l++) r.steps.forEach((n, i) => { if (n < 0) return; const t = (l * 16 + i) * step, o = oc.createOscillator(), g = oc.createGain(); o.type = r.wave; o.frequency.value = F[NOTES[n]]; g.gain.setValueAtTime(.2, t); g.gain.setValueAtTime(0, t + step * .9); o.connect(g).connect(oc.destination); o.start(t); o.stop(t + step); });
    const buf = await oc.startRendering(), d = buf.getChannelData(0), n = d.length, ab = new ArrayBuffer(44 + n * 2), v = new DataView(ab), ws = (o, s) => [...s].forEach((ch, i) => v.setUint8(o + i, ch.charCodeAt(0)));
    ws(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); ws(8, "WAVEfmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); ws(36, "data"); v.setUint32(40, n * 2, true);
    for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, d[i])) * 32767, true);
    return new Blob([ab], {type: "audio/wav"}); }
  async function saveBlob(blob, name){ let dl = null; try { dl = await window.claude.use("downloads"); } catch(_) {} if (!dl) { toast("saving files works on the page's claude.ai link."); return; } try { await dl.save({filename: name, data: blob}); } catch(_) { toast("not saved. try again whenever."); } }
  function ringUI(){ const r = XS.ring;
    $("#mkbody").innerHTML = `<div class="ringwrap"><div class="nokia2"><div class="nscreen"><b>${esc(r.name)}</b><span>${r.bpm} bpm · ${r.wave} · ${r.scale}</span></div>
      <div class="seq">${NOTES.map((nt, row) => `<div class="srow"><i>${nt}</i>${r.steps.map((n, i) => `<button class="sc ${n === row ? "on" : ""} ${i % 4 === 0 ? "beat" : ""}" data-sc="${i},${row}"></button>`).join("")}</div>`).join("")}</div></div>
      <div class="ringside"><input class="cuin" id="rname" maxlength="30" value="${esc(r.name)}">
        <div class="stbtns"><b>generate one</b>${Object.keys(STYLES).map(k => `<button data-rgen="${k}">${k}</button>`).join("")}</div>
        <div class="stbtns"><b>sound</b>${["square", "triangle", "sawtooth", "sine"].map(w => `<button data-rw="${w}" class="${r.wave === w ? "on" : ""}">${w}</button>`).join("")}</div>
        <div class="stbtns"><b>scale</b>${[["nokia", "major (nokia)"], ["hijaz", "hijaz (arabic)"]].map(([k, n]) => `<button data-rs="${k}" class="${r.scale === k ? "on" : ""}">${n}</button>`).join("")}</div>
        <label>tempo <input type="range" min="70" max="220" value="${r.bpm}" id="rbpm"></label>
        <div class="stbtns"><button class="bact" data-rplay>▶ play</button><button class="bact" data-rset>📱 make it my ringtone</button><button class="bact" data-rsave>⬇ save as .wav</button><button class="bact" data-rpost>📓 post it</button><button class="bact" data-rclear>clear</button></div>
        ${XS.rings.length ? `<div class="rlist"><b>my ringtones</b>${XS.rings.map((x, i) => `<button data-rload="${i}">♫ ${esc(x.name)}</button>`).join("")}</div>` : ""}</div></div>
      <small class="muted">your ringtone plays when someone wizzes you. compose it note by note, like 2002.</small>`; }
  /* ---------- image bender: bend / blurp / pixlt ---------- */
  let bsrc = null; const BP = {pix: 1, sol: 0, hue: 0, sort: 0, mosh: 0, rgb: 0, dith: 0};
  function bendUI(){ $("#mkbody").innerHTML = `<div class="bendwrap"><div class="bstage2"><canvas id="bcv2" width="480" height="480"></canvas><label class="bdrop ${bsrc ? "has" : ""}" id="bdrop2">🖼 drop any image<br><small>or tap to choose · or pick an object below</small><input type="file" id="bfile2" accept="image/*" hidden></label></div>
      <div class="bside2">${[["pix", "pixlt", 1, 24], ["sol", "solarize (bend)", 0, 100], ["hue", "acid shift", 0, 255], ["sort", "pixel sort", 0, 100], ["mosh", "datamosh (blurp)", 0, 40], ["rgb", "rgb split", 0, 20], ["dith", "dither", 0, 1]].map(([k, n, a, b]) => `<label>${n}<input type="range" min="${a}" max="${b}" value="${BP[k]}" data-bp="${k}"></label>`).join("")}
      <div class="stbtns"><button class="bact" data-brand>🎲 surprise me</button><button class="bact" data-bwall>🖥 use as my wallpaper</button><button class="bact" data-bfloat>🫧 add to my screensaver</button><button class="bact" data-bpost>📓 post it</button><button class="bact" data-bsave>⬇ save</button></div>
      <div class="bpicks">${OBJPHOTOS.slice(0, 12).map((o, i) => `<img src="${o.img}" data-bpick="${i}" title="${esc(o.t)}">`).join("")}<img src="${DAVID.d}" data-bpick="david" title="the David"></div></div></div>`; if (bsrc) bend(); }
  function bend(){ const cv = $("#bcv2"); if (!cv || !bsrc) return; const x = cv.getContext("2d"), W = 480, H = 480; x.imageSmoothingEnabled = false;
    const k = Math.max(W / bsrc.width, H / bsrc.height), sw = W / k, sh = H / k, px = Math.max(1, BP.pix | 0), tw = Math.ceil(W / px), th = Math.ceil(H / px), t = document.createElement("canvas"); t.width = tw; t.height = th; const tx = t.getContext("2d"); tx.drawImage(bsrc, (bsrc.width - sw) / 2, (bsrc.height - sh) / 2, sw, sh, 0, 0, tw, th);
    const id = tx.getImageData(0, 0, tw, th), p = id.data, src = p.slice(), L = Z12.LUT, B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (let y = 0; y < th; y++) for (let xx = 0; xx < tw; xx++) { const o = (y * tw + xx) * 4, ro = (y * tw + Math.min(tw - 1, xx + (BP.rgb / px | 0))) * 4; let r = src[ro], g = src[o + 1], b = src[o + 2];
      if (BP.sol) { const lum = r * .3 + g * .59 + b * .11, s = lum > 128 ? 255 - lum : lum, ki = ((s * 2 + BP.hue) & 255) * 3, m = BP.sol / 100; r = r * (1 - m) + L[ki] * m; g = g * (1 - m) + L[ki + 1] * m; b = b * (1 - m) + L[ki + 2] * m; }
      else if (BP.hue) { const ki = (((r * .3 + g * .59 + b * .11) + BP.hue) & 255) * 3; r = (r + L[ki]) / 2; g = (g + L[ki + 1]) / 2; b = (b + L[ki + 2]) / 2; }
      if (+BP.dith) { const th2 = (B[(y % 4) * 4 + xx % 4] / 16 - .5) * 48; r = Math.round((r + th2) / 64) * 64; g = Math.round((g + th2) / 64) * 64; b = Math.round((b + th2) / 64) * 64; }
      p[o] = r; p[o + 1] = g; p[o + 2] = b; }
    if (BP.sort) for (let y = 0; y < th; y++) { if (Math.random() * 100 > BP.sort) continue; const row = []; for (let xx = 0; xx < tw; xx++) { const o = (y * tw + xx) * 4; row.push([p[o], p[o + 1], p[o + 2]]); } row.sort((a, c) => a[0] + a[1] + a[2] - c[0] - c[1] - c[2]); row.forEach((q, xx) => { const o = (y * tw + xx) * 4; p[o] = q[0]; p[o + 1] = q[1]; p[o + 2] = q[2]; }); }
    if (BP.mosh) { const s = p.slice(); for (let i = 0; i < BP.mosh; i++) { const bw = 4 + Math.random() * tw / 3 | 0, bh = 2 + Math.random() * th / 8 | 0, sx = Math.random() * (tw - bw) | 0, sy = Math.random() * (th - bh) | 0, dx = (Math.random() - .5) * tw / 4 | 0; for (let y = sy; y < sy + bh; y++) for (let xx = sx; xx < sx + bw; xx++) { const t2 = Math.min(tw - 1, Math.max(0, xx + dx)), o = (y * tw + xx) * 4, o2 = (y * tw + t2) * 4; p[o2] = s[o]; p[o2 + 1] = s[o + 1]; p[o2 + 2] = 255 - s[o + 2]; } } }
    tx.putImageData(id, 0, 0); x.drawImage(t, 0, 0, W, H); }
  /* ---------- world maker ---------- */
  XS.myWorld = XS.myWorld || {name: "", motto: "", c1: "#ff3dd4", c2: "#2a0b4a", sym: "☾", things: []};
  const SYMS = ["☾", "✦", "❖", "✿", "☁", "♫", "◉", "✂", "⚡", "☯", "♛", "🕯"];
  function worldPoster(w){ const c = document.createElement("canvas"); c.width = 600; c.height = 800; const x = c.getContext("2d"); const g = x.createLinearGradient(0, 0, 0, 800); g.addColorStop(0, w.c2); g.addColorStop(1, w.c1); x.fillStyle = g; x.fillRect(0, 0, 600, 800);
    let seed = [...(w.name || "x")].reduce((a, ch) => a * 31 + ch.charCodeAt(0) >>> 0, 7); const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    x.globalAlpha = .35; for (let i = 0; i < 40; i++) { x.strokeStyle = i % 2 ? w.c1 : "#fff"; x.lineWidth = 1 + rnd() * 3; x.beginPath(); x.arc(rnd() * 600, rnd() * 800, rnd() * 220, 0, Math.PI * 2 * rnd()); x.stroke(); } x.globalAlpha = 1;
    const imgs = (w.things || []).map(t => (XS.stash.find(s => s.t === t) || {}).img).filter(Boolean).slice(0, 4);
    imgs.forEach((u, i) => { const im = new Image(); im.src = u; try { x.save(); x.translate(110 + (i % 2) * 260, 300 + (i >> 1) * 200); x.rotate((rnd() - .5) * .3); x.drawImage(im, 0, 0, 160, 160); x.strokeStyle = "#000"; x.lineWidth = 4; x.strokeRect(0, 0, 160, 160); x.restore(); } catch(_) {} });
    x.fillStyle = "#fff"; x.font = "120px serif"; x.textAlign = "center"; x.fillText(w.sym, 300, 200); x.font = "400 64px Anton, sans-serif"; x.fillText((w.name || "a world").toUpperCase().slice(0, 18), 300, 700); x.font = "italic 26px 'Instrument Serif', serif"; x.fillText(w.motto || "", 300, 745); x.font = "14px 'Space Mono', monospace"; x.fillText("a world on the ghost of msn", 300, 785);
    const id = x.getImageData(0, 0, 600, 800), p = id.data; for (let i = 0; i < p.length; i += 4) if (Math.random() < .02) { p[i] = 255; p[i + 2] = 220; } x.putImageData(id, 0, 0); return c; }
  function worldUI(){ const w = XS.myWorld;
    $("#mkbody").innerHTML = `<div class="worldwrap"><div class="wposter"><canvas id="wcv"></canvas></div><div class="wside">
      <label>name your world</label><div class="lrow"><input class="cuin" id="wname" maxlength="18" value="${esc(w.name)}" placeholder="e.g. hamra after midnight"></div>
      <label>its motto</label><div class="lrow"><input class="cuin" id="wmotto" maxlength="48" value="${esc(w.motto)}" placeholder="what do people here believe?">${sparkBtn("away", "#wmotto")}</div>
      <label>its colours</label><div class="stcols"><label class="stcol"><input type="color" data-wc="c1" value="${w.c1}"><span>glow</span></label><label class="stcol"><input type="color" data-wc="c2" value="${w.c2}"><span>sky</span></label></div>
      <label>its sign</label><div class="stbtns">${SYMS.map(s => `<button data-wsym="${s}" class="${w.sym === s ? "on" : ""}">${s}</button>`).join("")}</div>
      <label>what lives there (from your stash)</label><div class="lpick">${XS.stash.slice(0, 24).map(s => `<button data-wthing="${esc(s.t)}" class="${w.things.includes(s.t) ? "on" : ""}">${(KINDS[s.k] || KINDS.idea)[0]} ${esc(s.t)}</button>`).join("") || "<small>pocket some things first 🎒</small>"}</div>
      <label>its anthem</label><div class="muted" style="font-size:13px">${XS.myRing ? "♫ " + esc(XS.myRing.name) + " <button class='linkbtn' data-wplay>play</button>" : "make a ringtone first, it becomes your anthem."}</div>
      <div class="stbtns"><button class="bact" data-wpost>📓 post my world</button><button class="bact" data-wsave>⬇ save the poster</button><button class="bact" data-wwall>🖥 make it my wallpaper</button></div></div></div>`;
    const draw = () => { const c = worldPoster(XS.myWorld), t = $("#wcv"); t.width = 600; t.height = 800; t.getContext("2d").drawImage(c, 0, 0); };
    draw(); setTimeout(draw, 300); }
  function paint(){ document.querySelectorAll("#mktabs button").forEach(b => b.classList.toggle("on", b.dataset.mk === tab)); ({ring: ringUI, bend: bendUI, world: worldUI})[tab](); }
  const post = async (o) => { const doc = {t: `${o.title}\n${o.body || ""}`.slice(0, 500), cat: (FEEDCATS[1] || "art"), tags: ["madebyme"], fit: JSON.parse(JSON.stringify(FIT))}; if (o.img && okImg(o.img)) doc.img = o.img; await xadd("feed", doc); award(5); toast("posted to the dash. signed by you."); };
  $("#make").addEventListener("click", async e => { const t = e.target;
    if (t.closest("[data-mkclose]") || t.id === "make") { $("#make").classList.remove("open"); return; }
    const tb = t.closest("[data-mk]"); if (tb) { tab = tb.dataset.mk; paint(); return; }
    /* ringtone */
    const sc = t.closest("[data-sc]"); if (sc) { const [i, row] = sc.dataset.sc.split(",").map(Number); XS.ring.steps[i] = XS.ring.steps[i] === row ? -1 : row; xsave(); ringUI(); const c = ac(), o = c.createOscillator(), g = c.createGain(); o.type = XS.ring.wave; o.frequency.value = (XS.ring.scale === "hijaz" ? HIJAZ : FREQ)[NOTES[row]]; g.gain.value = .08; o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + .12); return; }
    const rg = t.closest("[data-rgen]"); if (rg) { XS.ring.steps = STYLES[rg.dataset.rgen](); if (rg.dataset.rgen === "hijaz night") XS.ring.scale = "hijaz"; xsave(); ringUI(); playRing(XS.ring); return; }
    const rw = t.closest("[data-rw]"); if (rw) { XS.ring.wave = rw.dataset.rw; xsave(); ringUI(); playRing(XS.ring); return; }
    const rs = t.closest("[data-rs]"); if (rs) { XS.ring.scale = rs.dataset.rs; xsave(); ringUI(); playRing(XS.ring); return; }
    if (t.closest("[data-rplay]")) { playRing(XS.ring, 2); return; }
    if (t.closest("[data-rclear]")) { XS.ring.steps = Array(16).fill(-1); xsave(); ringUI(); return; }
    if (t.closest("[data-rset]")) { XS.myRing = JSON.parse(JSON.stringify(XS.ring)); const i = XS.rings.findIndex(x => x.name === XS.ring.name); if (i >= 0) XS.rings[i] = XS.myRing; else XS.rings.unshift(XS.myRing); xsave(); toast(`📱 ${esc(XS.ring.name)} is your ringtone now.`); ringUI(); return; }
    const rl = t.closest("[data-rload]"); if (rl) { XS.ring = JSON.parse(JSON.stringify(XS.rings[+rl.dataset.rload])); xsave(); ringUI(); playRing(XS.ring); return; }
    if (t.closest("[data-rsave]")) { saveBlob(await wavOf(XS.ring), (XS.ring.name || "ringtone").replace(/[^\w-]+/g, "_") + ".wav"); return; }
    if (t.closest("[data-rpost]")) { post({title: `my ringtone: ${XS.ring.name}`, body: `composed on the ghost of msn · ${XS.ring.bpm} bpm · ${XS.ring.wave}\n♫ ${XS.ring.steps.map(n => n < 0 ? "-" : NOTES[n]).join(" ")}`}); return; }
    /* bender */
    const bp = t.closest("[data-bpick]"); if (bp) { const im = new Image(); im.onload = () => { bsrc = im; $("#bdrop2").classList.add("has"); bend(); }; im.src = bp.dataset.bpick === "david" ? DAVID.d : OBJPHOTOS[+bp.dataset.bpick].img; return; }
    if (t.closest("[data-brand]")) { Object.assign(BP, {pix: 1 + Math.random() * 10 | 0, sol: Math.random() * 100 | 0, hue: Math.random() * 255 | 0, sort: Math.random() * 60 | 0, mosh: Math.random() * 30 | 0, rgb: Math.random() * 14 | 0, dith: Math.random() < .3 ? 1 : 0}); bendUI(); return; }
    const out = () => $("#bcv2") && $("#bcv2").toDataURL("image/jpeg", .85);
    if (t.closest("[data-bwall]") && bsrc) { XS.custom.wallImg = out(); XS.custom.wall = "mine"; xsave(); window.openCustom(); $("#custom").classList.remove("open"); document.querySelector('[data-cu="wall"][data-v="mine"]'); toast("it's your wallpaper now."); location.hash = ""; const mw = $("#mywall"); if (mw) mw.style.backgroundImage = `url(${XS.custom.wallImg})`; else { document.body.insertAdjacentHTML("afterbegin", `<div id="mywall" style="background-image:url(${XS.custom.wallImg})"></div>`); } document.body.classList.add("w-mine"); return; }
    if (t.closest("[data-bfloat]") && bsrc) { const c = document.createElement("canvas"); c.width = c.height = 220; c.getContext("2d").drawImage($("#bcv2"), 0, 0, 220, 220); XS.ss.imgs = (XS.ss.imgs || []).concat(c.toDataURL("image/jpeg", .8)).slice(-3); XS.ss.mode = "float"; xsave(); SS.reset(); toast("floating on your screensaver now. 🫧"); return; }
    if (t.closest("[data-bpost]") && bsrc) { const c = document.createElement("canvas"); c.width = c.height = 360; c.getContext("2d").drawImage($("#bcv2"), 0, 0, 360, 360); post({title: "bent by me", body: "made in the image bender", img: c.toDataURL("image/jpeg", .75)}); return; }
    if (t.closest("[data-bsave]") && bsrc) { $("#bcv2").toBlob(b => saveBlob(b, "bent-by-me.png"), "image/png"); return; }
    /* world */
    const ws = t.closest("[data-wsym]"); if (ws) { XS.myWorld.sym = ws.dataset.wsym; xsave(); worldUI(); return; }
    const wt = t.closest("[data-wthing]"); if (wt) { const th = wt.dataset.wthing, a = XS.myWorld.things; const i = a.indexOf(th); i >= 0 ? a.splice(i, 1) : a.push(th); xsave(); worldUI(); return; }
    if (t.closest("[data-wplay]")) { window.playMyRing(); return; }
    if (t.closest("[data-wpost]")) { const c = worldPoster(XS.myWorld), s = document.createElement("canvas"); s.width = 360; s.height = 480; s.getContext("2d").drawImage(c, 0, 0, 360, 480); post({title: `my world: ${XS.myWorld.name || "untitled"}`, body: `${XS.myWorld.sym} ${XS.myWorld.motto || ""}\nwhat lives here: ${XS.myWorld.things.join(", ") || "nothing yet"}`, img: s.toDataURL("image/jpeg", .75)}); return; }
    if (t.closest("[data-wsave]")) { worldPoster(XS.myWorld).toBlob(b => saveBlob(b, "my-world.png"), "image/png"); return; }
    if (t.closest("[data-wwall]")) { XS.custom.wallImg = worldPoster(XS.myWorld).toDataURL("image/jpeg", .8); XS.custom.wall = "mine"; xsave(); const mw = $("#mywall"); if (mw) mw.style.backgroundImage = `url(${XS.custom.wallImg})`; else document.body.insertAdjacentHTML("afterbegin", `<div id="mywall" style="background-image:url(${XS.custom.wallImg})"></div>`); document.body.classList.add("w-mine"); toast("your world is your wallpaper now."); return; }
  });
  $("#make").addEventListener("input", e => { const t = e.target;
    if (t.id === "rname") { XS.ring.name = t.value; xsave(); }
    if (t.id === "rbpm") { XS.ring.bpm = +t.value; xsave(); }
    if (t.dataset.bp) { BP[t.dataset.bp] = +t.value; bend(); }
    if (t.id === "wname" || t.id === "wmotto" || t.dataset.wc) { if (t.id === "wname") XS.myWorld.name = t.value; if (t.id === "wmotto") XS.myWorld.motto = t.value; if (t.dataset.wc) XS.myWorld[t.dataset.wc] = t.value; xsave(); const c = worldPoster(XS.myWorld); $("#wcv").getContext("2d").drawImage(c, 0, 0); } });
  $("#make").addEventListener("change", e => { if (e.target.id === "bfile2") { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { bsrc = im; $("#bdrop2").classList.add("has"); bend(); }; im.src = r.result; }; r.readAsDataURL(f); } });
  $("#make").addEventListener("dragover", e => e.preventDefault());
  $("#make").addEventListener("drop", e => { if (tab !== "bend") return; e.preventDefault(); const f = e.dataTransfer.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { bsrc = im; $("#bdrop2").classList.add("has"); bend(); }; im.src = r.result; }; r.readAsDataURL(f); });
  window.openMake = t => { closeOverlays(); if (t) tab = t; paint(); $("#make").classList.add("open"); };
  /* your ringtone plays when you get wizzed */
  try { const _wz = window.wizz; if (typeof _wz === "function") window.wizz = function(...a){ window.playMyRing(); return _wz.apply(this, a); }; } catch(_) {}
  const wzb = $("#wz"); if (wzb) wzb.addEventListener("click", () => window.playMyRing());
  $("#hud .hudbtns").insertAdjacentHTML("afterbegin", `<button id="hudMake" title="make your ringtone, images, world">🛠 make</button>`);
  $("#hudMake").onclick = () => window.openMake();
  try { VERT.forEach(v => { if (v.id === "share") v.p.push(["make", "🛠", "make", "compose a ringtone, bend an image, build your own world"]); }); } catch(_) {}
  const _gp16 = goPlace; goPlace = function(k){ if (k === "make") { document.body.classList.remove("inroom"); window.openMake(); return; } return _gp16(k); };
  const sc = $("#startcard"); if (sc) sc.querySelector("small").insertAdjacentHTML("beforebegin", `<button onclick="openMake()">🛠 make a ringtone, an image, a world</button>`);
  const _co16 = closeOverlays; closeOverlays = function(){ _co16(); $("#make").classList.remove("open"); };
})();

/* ---------- the hud, calmer: four buttons and a drawer ---------- */
(function(){
  const bar = $("#hud .hudbtns"); if (!bar) return;
  const keep = ["hudBubble", "hudMake", "hudOnline", "hudZen"], more = ["hudMap", "hudLists", "hudAstro", "hudBooth", "hudCu"];
  bar.insertAdjacentHTML("beforeend", `<button id="hudMore" title="more">☰ more</button><div id="hudDrawer"></div>`);
  more.forEach(id => { const b = $("#" + id); if (b) $("#hudDrawer").appendChild(b); });
  keep.forEach(id => { const b = $("#" + id); if (b) bar.insertBefore(b, $("#hudMore")); });
  const lab = {hudMap: "🗺 my map", hudLists: "📼 my lists", hudAstro: "♒ astrology", hudBooth: "📸 avatar booth", hudCu: "🎛 settings"}; Object.entries(lab).forEach(([id, t]) => { const b = $("#" + id); if (b) b.textContent = t; });
  $("#hudMore").onclick = e => { e.stopPropagation(); $("#hudDrawer").classList.toggle("open"); };
  document.addEventListener("click", e => { if (!e.target.closest("#hudDrawer") && !e.target.closest("#hudMore")) $("#hudDrawer").classList.remove("open"); });
  $("#hudDrawer").addEventListener("click", () => $("#hudDrawer").classList.remove("open"));
})();
