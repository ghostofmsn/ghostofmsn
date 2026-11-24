/* =================== EXTENSION 23: thresholds. a door into the site, a door into every room, and some rooms that never end =================== */
const OBJFILES = [["Nokia 7280", "Nokia 7280.jpg"], ["Motorola RAZR V3 pink", "Motorola RAZR V3 (Pink) - Front (Closed).jpg"], ["Sony Ericsson T68i", "Sony Ericsson T68i (Arctic Blue) - Label.jpg"], ["Nokia 8110 banana", "Old Nokia banana.JPG"], ["Siemens Xelibri", "Xelibri 2003.jpg"], ["Nokia 7600", "Nokia 7600.jpg"], ["T-Mobile Sidekick Danger", "T-Mobile Sidekick LX (back, open).jpg"], ["Nokia N-Gage", "Nokia-NGage-LL.jpg"], ["Motorola StarTAC", "MotorolaStarTAC.jpg"], ["BlackBerry Pearl 8100", "BlackBerry 8100 (1).jpg"], ["Nokia 3650", "Nokia 3650 Front and Back.jpg"], ["Tamagotchi 1997", "Tamagotchi - (46219507555).jpg"], ["iMac G3 Bondi blue", "IMac G3 Bondi Blue, three-quarters view.png"], ["Sony Walkman WM", "Sony Walkman WM-2013.jpg"], ["iPod mini", "IPodMiniMicrodrive4GB.jpg"], ["Game Boy Color", "Nintendo-Game-Boy-Advance-Milky-Blue-FL.jpg"], ["Sony Discman", "Sony Discman D-E206CK (Top, Closed).jpg"], ["Polaroid 600 camera", "Appareil photo instantan\u00e9 Polaroid Spirit 600 (1).jpg"], ["Furby", "Furbies?.jpg"], ["Sony AIBO ERS-110", "Red Dot Award Product Design 2000-2018 Aibos (cropped).jpg"], ["Lava lamp", "Lava lamp (yellow).jpg"], ["Nintendo 64 controller", "N64-Console-Set.png"], ["Isamu Noguchi Akari lamp", "Isamu Noguchi Luminaire Lanterne Akari 10 A Mus\u00e9e des Arts D\u00e9coratifs Paris.jpg"], ["Nokia 3310 blue", "Nokia 3310 Blue R7309170 (retouch).png"], ["Dreamcast console", "Dreamcast-Console-Set.jpg"], ["Butterfly hair clip", "Butterfly hair clips.jpg"]];
const HIFILE = {g0:"Kapje met winde-bloemen Kapje van bruin tarlatan geheel versierd met roze en paarsblauwe winde van zijde en een roze satijnen strik, achter drie afhangende bloemen, BK-1993-84.jpg", g1:"Hoed van zwarte, gewatteerde ripszijde met opstaande rand aan de achterkant (zgn. relevé), versierd met zes roze rozen, BK-1993-86.jpg", g2:"Japon met strikceintuur Cocktailjapon van zwarte tafzijde met V-hals, lange nauwsluitende mouwen en een wijde rok met volant, BK-1986-58-A.jpg", g3:"Muts van bruine suède met teruggeslagen rand en knoop midden op de bol, BK-1993-57.jpg", g4:"Japon en jasje (complet) Complet japon en jasje, BK-1986-57.jpg", g5:"Paar avondhandschoenen van tricot Handschoen van glanzend goudbeige elastische tricot, BK-1978-226-A.jpg", g6:"Tas van leer, vier horizontale banen in rood, wit en blauw, BK-1986-71.jpg", g7:"Vouwwaaier van fijne zijden zwarte gaas waaraan zwarte stroken, op een zwart kunststof montuur, BK-1986-70.jpg", g8:"Huispyjama van zwart zijden fluweel, bestaande uit een tuniek (a), een pantalon (b) en een losse, smalle ceintuur (c), BK-1986-54.jpg", g9:"Japon bestaande uit matte aluminium platen verbonden met dito ogen, BK-2019-13.jpg", g10:"Rok en lijf versierd met kralen Klokkende rok van effen zwarte wol, BK-1986-55-B.jpg", g11:"Japon met geplisseerde volant Cocktailjapon van zwarte wol met brede geplisseerde volan over de rok., BK-1986-56-A.jpg", g12:"Ball gown MET C.I.68.53.11ab F.jpg", g13:"André Courrèges dress and coat, c.1966.jpg", g14:"1971 Rudi Gernreich bikini for Harmon Knitwear.jpg", g15:"C1925 green satin dress with attached painted velvet wrap by Paul Poiret, Paris. 01.jpg", g16:"Yasumasa Morimura for Issey Miyake, printed polyester, 1997 02.jpg", m0:"Gazette du Bon Ton. Art - Modes & Frivolités, No. 9 - 1924, 6e Année, RP-P-2009-1973.jpg", m1:"Gazette du Bon Ton. Art - Modes & Frivolités, No. 5 - 1923, 6e Année, RP-P-2009-1969.jpg", m2:"Gazette du Bon Ton, 1920 - No. 3, p. XXIII Robes d'après-midi de Lanvin et Beer (titel op object), RP-P-2009-1944-18.jpg", m3:"Les Élégances Parisiennes 1918 LES DERNIÈRES CRÉATIONS DE LA MOD, RP-P-2009-3864.jpg", m4:"Courrier de la Mode, 1869, No. 700, No. 1 Toilettes de Mme Delacroix, RP-P-2009-3532.jpg", n0:"Haeckel Discomedusae 8.jpg", n1:"Haeckel Discomedusae 18.jpg", n2:"Haeckel Asteridea.jpg", n3:"Haeckel Tineida.jpg", n4:"Haeckel Ophiodea 70.jpg", n5:"Haeckel Echinidea.jpg", n6:"Haeckel Chiroptera.jpg", n7:"Haeckel Trochilidae.jpg", n8:"Metamorphosis insectorum Surinamensium - KW 1792 A 19 - plaat01.jpg", n9:"Haeckel Siphonophorae.jpg", n10:"Haeckel Nepenthaceae.jpg"};
/* big versions live on Wikimedia. the claude.ai page can't load outside images, the netlify site can */
const HIRES_OK = !/claude|anthropic|usercontent/.test(location.hostname) && location.protocol.startsWith("http");
const hiURL = (file, w = 1400) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file.replace(/ /g, "_")) + "?width=" + w;
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- the threshold: hello, you are entering ---------- */
(function(){
  if (sessionStorage.getItem("gomsn_in")) return;
  const lines = ["hello, you.", "you are entering <i>the ghost of MSN</i>.", "a soft archive of everything we left online:<br>the clothes, the songs, the people, the rooms.", "the door's unlocked. it always was."];
  document.body.insertAdjacentHTML("beforeend", `<div id="threshold"><div class="thsky"></div><div class="thfog"></div><div class="thgrass"></div>
    <div class="thstage"><div class="thalcove"><i class="thhood"><b></b></i><i class="thpost l"></i><i class="thpost r"></i><span class="thport l"></span><span class="thport r"></span><span class="thdots l"><b></b><b></b><b></b><b></b></span><span class="thdots r"><b></b><b></b><b></b><b></b></span><div class="thframe"><div class="thbeyond"><i class="tharch"></i><i class="thsofa"></i></div><div class="thleaf"><i class="thwin"></i><i class="thwin"></i><i class="thknob"></i><i class="thplate"></i><i class="thplate b"></i></div></div><i class="thmat"></i></div><div class="thglow"></div></div>
    <div class="thtext"><p class="thl"></p><button class="thgo" type="button">open the door</button><button class="thskip" type="button">skip</button></div><div class="thflash"></div></div>`);
  const T = $("#threshold"), P = T.querySelector(".thl"); let i = 0;
  const show = () => { if (i >= lines.length) { T.classList.add("ready"); return; } const n = document.createElement("span"); n.innerHTML = lines[i]; n.style.animationDelay = "0s"; P.appendChild(n); i++; setTimeout(show, reduced() ? 50 : 1100); };
  setTimeout(show, 500);
  const go = () => { if (T.classList.contains("opening")) return; T.classList.add("opening"); sessionStorage.setItem("gomsn_in", "1"); try { tone([[392,.12],[523,.12],[659,.12],[784,.35]], "sine", .04); } catch(_) {} setTimeout(() => T.classList.add("through"), 900); setTimeout(() => T.remove(), 2100); };
  T.querySelector(".thgo").onclick = go; T.querySelector(".thframe").onclick = go; T.querySelector(".thskip").onclick = () => { sessionStorage.setItem("gomsn_in", "1"); T.remove(); };
  addEventListener("keydown", function k(e){ if (!document.body.contains(T)) return removeEventListener("keydown", k); if (e.key === "Enter") go(); });
})();

/* ---------- every room has a door. some rooms never end ---------- */
const ENDLESS = new Set(["abyss", "museum", "dataland", "specimens", "collage", "found", "shelf", "crates", "map", "worlds", "loophole", "arch", "gallery"]);
const placeName = k => { try { for (const v of VERT) for (const p of v.p) if (p[0] === k) return p[2]; } catch(_) {} const a = document.querySelector(`.r3a[data-go="${k}"]`); return (a && a.dataset.w) || ({msn: "the computer", "chat:ghost": "the ghost", crates: "the dig", window: "the window"}[k] || String(k).replace(/^\w+:/, "").replace(/-/g, " ")); };
document.body.insertAdjacentHTML("beforeend", `<div id="passage"><canvas id="passc"></canvas><div class="pdframe"><div class="pdbeyond"></div><div class="pdleaf"></div><div class="pdleaf r"></div><i class="pdring"></i></div><div class="pdlabel"><small>entering</small><b></b></div></div>`);
let passing = false;
function passThrough(k, fn){
  if (passing || reduced()) return fn();
  passing = true; const P = $("#passage"), endless = ENDLESS.has(k);
  P.querySelector(".pdlabel b").textContent = placeName(k);
  if (!endless && window.buildDoorScene) window.buildDoorScene(k, P);
  P.className = endless ? "on endless" : "on door scene";
  try { tone(endless ? [[262,.1],[330,.1],[392,.1],[523,.3]] : [[523,.08],[392,.2]], "sine", .03); } catch(_) {}
  if (endless) drawEndless(1300);
  setTimeout(() => { try { fn(); } catch(e) { console.error(e); } }, endless ? 650 : 520);
  setTimeout(() => { P.classList.add("out"); }, endless ? 1000 : 820);
  setTimeout(() => { P.className = ""; passing = false; }, endless ? 1450 : 1200);
}
function drawEndless(ms){
  const c = $("#passc"), x = c.getContext("2d"), W = c.width = innerWidth, H = c.height = innerHeight, t0 = performance.now();
  const cols = ["#e8521a", "#1636c8", "#f2a01a", "#5fd0c8", "#c8141e", "#2a2ae0", "#ff7a2a"];
  (function f(now){ const t = (now - t0) / ms; if (t > 1.1) return; x.fillStyle = "#0b0a10"; x.fillRect(0, 0, W, H);
    const z = t * 6; for (let i = 24; i >= 0; i--) { const s = Math.pow(1.32, i - z * 3.2) * Math.min(W, H) * .1; if (s > Math.max(W, H) * 3 || s < 2) continue; const w = s * .62, h = s; const k = ((i % cols.length) + cols.length) % cols.length;
      x.save(); x.translate(W / 2, H / 2); x.rotate(Math.sin(i * .7 + t * 2) * .05);
      if (i % 5 === 0) { const n = 8, cw = w * 2 / n; for (let a = 0; a < n; a++) for (let b = 0; b < n * 1.6; b++) { x.fillStyle = (a + b) % 2 ? "#111" : "#f4ede0"; x.fillRect(-w + a * cw, -h + b * cw, cw + .5, cw + .5); } }
      else { x.fillStyle = cols[k]; x.beginPath(); x.moveTo(-w, h); x.lineTo(-w, -h + w); x.arc(0, -h + w, w, Math.PI, 0); x.lineTo(w, h); x.closePath(); x.fill(); }
      x.restore(); }
    const g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * .2); g.addColorStop(0, "rgba(255,248,220,.9)"); g.addColorStop(1, "rgba(255,248,220,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H);
    requestAnimationFrame(f); })(t0);
}
const _gfr23 = goFromRoom; goFromRoom = function(k, e){ if (k === "window") return _gfr23(k, e); return passThrough(k, () => _gfr23(k, e)); };
const _gp23 = goPlace; goPlace = function(k){ if (passing || k === "room") return _gp23(k); return passThrough(k, () => _gp23(k)); };
window.passThrough = passThrough;

/* ---------- the dig: a room for flipping records ---------- */
(function(){
  const seed = s => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296; };
  const PAL = [["#c8141e", "#f4ede0", "#111"], ["#1638b8", "#ffd23f", "#f4ede0"], ["#7fd8ff", "#ff3dd4", "#111"], ["#f2a01a", "#1a1a1a", "#f4ede0"], ["#2f7a3e", "#f4ede0", "#c8141e"], ["#e9e0cf", "#111", "#c8141e"], ["#ff8fc0", "#1638b8", "#fff"], ["#111", "#e8c46a", "#f4ede0"]];
  function cover(r){ const R = seed(r[0] + r[1]), p = PAL[Math.floor(R() * PAL.length)], c = document.createElement("canvas"); c.width = c.height = 300; const x = c.getContext("2d");
    x.fillStyle = p[0]; x.fillRect(0, 0, 300, 300); const kind = Math.floor(R() * 5);
    if (kind === 0) { for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? p[1] : p[2]; x.beginPath(); x.arc(150, 150, 140 - i * 22, 0, 7); x.fill(); } }
    if (kind === 1) { for (let i = 0; i < 12; i++) { x.fillStyle = i % 2 ? p[1] : p[0]; x.fillRect(0, i * 25, 300, 25); } x.fillStyle = p[2]; x.beginPath(); x.arc(150, 150, 70, 0, 7); x.fill(); }
    if (kind === 2) { x.fillStyle = p[1]; for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) if ((i + j) % 2) x.fillRect(i * 34, j * 34, 34, 34); }
    if (kind === 3) { x.strokeStyle = p[1]; x.lineWidth = 6; for (let i = 0; i < 14; i++) { x.beginPath(); for (let X = 0; X <= 300; X += 10) { const Y = 30 + i * 20 + Math.sin(X * .04 + i) * 12; X ? x.lineTo(X, Y) : x.moveTo(X, Y); } x.stroke(); } }
    if (kind === 4) { x.fillStyle = p[1]; x.fillRect(30, 30, 240, 240); x.fillStyle = p[2]; x.beginPath(); x.moveTo(30, 270); x.lineTo(150, 50); x.lineTo(270, 270); x.fill(); }
    x.fillStyle = kind === 4 ? p[0] : p[2]; x.font = "bold 22px 'Space Grotesk', Arial"; x.fillText(r[0].toUpperCase().slice(0, 22), 18, 278); x.font = "italic 18px Georgia"; x.fillText(r[1].slice(0, 26), 18, 30);
    x.globalAlpha = .12; for (let i = 0; i < 1500; i++) { x.fillStyle = R() < .5 ? "#000" : "#fff"; x.fillRect(R() * 300, R() * 300, 2, 2); } x.globalAlpha = 1;
    return c.toDataURL("image/jpeg", .82); }
  const BINS = {all: "everything", vinyl: "vinyl", cd: "cds", k7: "cassettes"};
  let bin = "all", idx = 0, pulled = -1, list = [], covers = {};
  document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="dig"><div class="dgroom"><div class="dgcurtain"></div><div class="dgfloor"></div>
    <div class="dghead"><b>the dig</b><span>flip with your mouse wheel, arrows or a swipe. click the record in front to pull it out.</span><button class="bx" data-dgx>×</button></div>
    <div class="dgbins">${Object.entries(BINS).map(([k, v]) => `<button data-dgbin="${k}">${v}</button>`).join("")}<button data-dgshuffle>⤨ shuffle</button><button data-dglist>the sites + the loophole →</button></div>
    <div class="dgstage"><div class="dgchair"><i></i></div><div class="dgbin"><div class="dgrecs" id="dgRecs"></div><div class="dgfront"></div></div><div class="dgdecks"><i></i><i></i></div></div>
    <div class="dgcard" id="dgCard"></div><div class="dgcount" id="dgCount"></div></div></div>`);
  const O = $("#dig");
  function load(){ list = CRATE.filter(r => bin === "all" || r[3] === bin); idx = Math.min(idx, Math.max(0, list.length - 1)); pulled = -1; paint(); }
  function paint(){
    const box = $("#dgRecs"); box.innerHTML = list.map((r, i) => { const k = r[0] + r[1]; covers[k] = covers[k] || cover(r); const d = i - idx; const cls = i === pulled ? "pulled" : d < 0 ? "past" : d === 0 ? "now" : "ahead";
      const tf = d < 0 ? `translateZ(${-d * 3 + 40}px) translateY(${30 + d * 2}px) rotateX(-62deg)` : `translateZ(${-d * 14}px) translateY(${d * -2}px) rotateX(${d === 0 ? -6 : -10}deg)`;
      return `<div class="dgrec ${cls} f-${r[3]}" data-dgi="${i}" style="transform:${i === pulled ? "translateY(-100px) translateZ(60px) rotateX(0)" : tf};z-index:${d < 0 ? 200 + i : 100 - d}"><img src="${covers[k]}" alt="" data-ck="${esc(k)}"><i class="dght"></i><i class="dgvinyl"></i></div>`; }).join("");
    box.querySelectorAll("img[data-ck]").forEach((im, j) => { const r = list[j]; if (r && window.realCover && Math.abs(j - idx) < 6) window.realCover(im, r); });
    $("#dgCount").textContent = list.length ? `${idx + 1} / ${list.length}` : "this bin is empty";
    const r = list[pulled];
    $("#dgCard").innerHTML = r ? `<small>${esc(r[3] === "k7" ? "cassette" : r[3])} · ${esc(String(r[2]))}</small><h3>${esc(r[1])}</h3><b>${esc(r[0])}</b><p>${esc(r[4])}</p><div class="dgbtns"><button class="xp" data-dglisten>▶ listen</button><a class="xp" target="_blank" rel="noopener" href="https://www.discogs.com/search/?q=${encodeURIComponent(r[0] + " " + r[1])}&type=all">discogs ↗</a><button class="xp" data-dgpocket>🎒 pocket</button><button class="xp" data-dgback>put it back</button></div><div id="dgSp"></div>` : "";
    $("#dgCard").classList.toggle("on", !!r);
  }
  const flip = d => { if (pulled >= 0) { pulled = -1; } idx = Math.max(0, Math.min(list.length - 1, idx + d)); paint(); try { tone([[200 + Math.random() * 60,.03]], "triangle", .03); } catch(_) {} };
  O.addEventListener("wheel", e => { if (e.target.closest(".dgcard")) return; e.preventDefault(); if (Math.abs(e.deltaY) < 4) return; flip(e.deltaY > 0 ? 1 : -1); }, {passive: false});
  let sy = null; O.addEventListener("pointerdown", e => { if (e.target.closest(".dgstage")) sy = e.clientY; }); O.addEventListener("pointerup", e => { if (sy == null) return; const d = e.clientY - sy; sy = null; if (Math.abs(d) > 30) flip(d < 0 ? 1 : -1); });
  addEventListener("keydown", e => { if (!O.classList.contains("open")) return; if (e.key === "ArrowDown" || e.key === "ArrowRight") flip(1); if (e.key === "ArrowUp" || e.key === "ArrowLeft") flip(-1); if (e.key === "Enter") { pulled = pulled === idx ? -1 : idx; paint(); } });
  O.addEventListener("click", e => { const t = e.target;
    if (t.closest("[data-dgx]") || t === O) { O.classList.remove("open"); return; }
    const b = t.closest("[data-dgbin]"); if (b) { bin = b.dataset.dgbin; idx = 0; O.querySelectorAll("[data-dgbin]").forEach(x => x.classList.toggle("on", x === b)); load(); return; }
    if (t.closest("[data-dgshuffle]")) { CRATE.sort(() => Math.random() - .5); idx = 0; load(); return; }
    if (t.closest("[data-dglist]")) { O.classList.remove("open"); _oc(); return; }
    if (t.closest("[data-dgback]")) { pulled = -1; paint(); return; }
    if (t.closest("[data-dgpocket]")) { const r = list[pulled]; try { collect({t: r[1], by: r[0], y: r[2], k: "listen", src: "the dig", line: r[4]}); } catch(_) {} return; }
    if (t.closest("[data-dglisten]")) { const r = list[pulled], box = $("#dgSp"); if (window.spSearch) window.spSearch(r[0] + " " + r[1], box, 3); else window.open("https://open.spotify.com/search/" + encodeURIComponent(r[0] + " " + r[1]), "_blank"); return; }
    const rec = t.closest(".dgrec"); if (rec) { const i = +rec.dataset.dgi; if (i === idx) { pulled = pulled === i ? -1 : i; paint(); try { tone([[660,.05],[880,.08]], "sine", .03); } catch(_) {} } else { idx = i; pulled = -1; paint(); } }
  });
  const _oc = window.openCrates;
  window.openCrates = t => { if (t) return _oc(t); closeOverlays(); O.querySelector('[data-dgbin="all"]').classList.add("on"); load(); O.classList.add("open"); };
})();

/* ---------- the map: a soft collage you can push around ---------- */
(function(){
  XS.mapPos = XS.mapPos || {};
  const STY = ["polaroid", "ticket", "torn", "stamp", "round", "tape"], COL = ["#ffd23f", "#ff9ec7", "#7fd8ff", "#b6ff3b", "#f4ede0", "#ffb35c", "#c9b8ff"];
  const VC = {explore: "#1638b8", talk: "#c8141e", share: "#f2a01a", collect: "#2f7a3e", play: "#ff3dd4"};
  function places(){ const out = []; VERT.forEach((v, vi) => v.p.forEach((p, pi) => out.push({k: p[0], e: p[1], n: p[2], d: p[3], v: v.id, vn: v.n, vi, pi}))); return out; }
  function home(p, i, n){ if (innerWidth < 700) return {x: (i % 2) * .5 + .02, y: .06 + Math.floor(i / 2) * (1 / Math.ceil(n / 2)) * .9, r: ((i * 7) % 11) - 5}; const cols = VERT.length, cx = (p.vi + .5) / cols, row = p.pi; return {x: Math.min(.9, Math.max(.02, cx - .07 + ((row * 37) % 9 - 4) * .012)), y: .15 + row * .098 + ((p.vi * 13 + row * 7) % 5) * .006, r: ((p.vi * 7 + row * 11) % 13) - 6}; }
  window.openMap = function(){
    closeOverlays(); document.querySelectorAll(".win:not(.hidden)").forEach(w => w.classList.add("hidden"));
    const P = places(), done = P.filter(p => XS.vis[p.k]).length;
    $("#mapov").innerHTML = `<div class="cmap" id="cmap"><div class="cmtitle"><span>THE GHOST OF MSN</span><b>the map</b><i>a collage, not a menu. push things around. you've been to ${done} of ${P.length}.</i></div>
      <div class="cmtools"><button data-cmshuffle>⤨ throw it in the air</button><button data-cmtidy>tidy</button><button data-cmclose>×</button></div>
      <svg class="cmlines" id="cmLines"></svg>
      ${VERT.map((v, i) => `<div class="cmdist" style="left:${(i + .5) / VERT.length * 100 - 6}%;--c:${VC[v.id] || "#111"}">${[...v.n].map((ch, j) => `<span style="transform:rotate(${(j * 37 % 15) - 7}deg);background:${j % 2 ? "#fff" : VC[v.id] || "#111"};color:${j % 2 ? VC[v.id] || "#111" : "#fff"}">${esc(ch)}</span>`).join("")}</div>`).join("")}
      ${P.map((p, i) => { const pos = XS.mapPos[p.k] || home(p, i, P.length); const st = STY[(p.vi + p.pi) % STY.length]; return `<button class="cmst ${st} ${XS.vis[p.k] ? "" : "nv"}" data-cmk="${esc(p.k)}" data-v="${p.v}" style="left:${pos.x * 100}%;top:${pos.y * 100}%;--r:${pos.r}deg;--bg:${COL[(i * 3) % COL.length]};--c:${VC[p.v] || "#111"}"><span class="cme">${p.e}</span><b>${esc(p.n)}</b><small>${esc(p.d)}</small>${XS.vis[p.k] ? "" : "<i>new</i>"}</button>`; }).join("")}
      <div class="cmdoodle d1">you are here ↘</div><div class="cmdoodle d2">✶ go somewhere you haven't</div><div class="cmring"></div><div class="cmring r2"></div></div>`;
    $("#mapov").classList.add("open"); $("#mapov").scrollTop = 0; try { markDock("map"); } catch(_) {} lines();
  };
  function lines(){ const C = $("#cmap"), S = $("#cmLines"); if (!C || !S) return; const R = C.getBoundingClientRect(); S.setAttribute("viewBox", `0 0 ${R.width} ${C.scrollHeight}`); S.style.height = C.scrollHeight + "px";
    const by = {}; C.querySelectorAll(".cmst").forEach(b => { const r = b.getBoundingClientRect(); (by[b.dataset.v] = by[b.dataset.v] || []).push([r.left - R.left + r.width / 2, r.top - R.top + C.scrollTop + r.height / 2]); });
    S.innerHTML = Object.entries(by).map(([v, pts]) => `<path d="${pts.map((p, i) => (i ? "L" : "M") + (p[0] + Math.sin(i * 3) * 8).toFixed(0) + " " + p[1].toFixed(0)).join(" ")}" stroke="${VC[v] || "#111"}" />`).join(""); }
  let drag = null;
  $("#mapov").addEventListener("pointerdown", e => { const b = e.target.closest(".cmst"); if (!b) return; const C = $("#cmap"), R = C.getBoundingClientRect(); drag = {b, sx: e.clientX, sy: e.clientY, ox: b.offsetLeft, oy: b.offsetTop, moved: 0, W: R.width, H: C.scrollHeight}; b.setPointerCapture(e.pointerId); b.classList.add("lift"); });
  $("#mapov").addEventListener("pointermove", e => { if (!drag) return; const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy; drag.moved = Math.max(drag.moved, Math.abs(dx) + Math.abs(dy)); if (drag.moved < 5) return; drag.b.style.left = (drag.ox + dx) / drag.W * 100 + "%"; drag.b.style.top = (drag.oy + dy) / drag.H * 100 + "%"; });
  $("#mapov").addEventListener("pointerup", e => { if (!drag) return; const d = drag; drag = null; d.b.classList.remove("lift"); if (d.moved < 5) { goPlace(d.b.dataset.cmk); return; } XS.mapPos[d.b.dataset.cmk] = {x: parseFloat(d.b.style.left) / 100, y: parseFloat(d.b.style.top) / 100, r: +getComputedStyle(d.b).getPropertyValue("--r").replace("deg", "") || 0}; try { xsave(); } catch(_) {} lines(); });
  $("#mapov").addEventListener("click", e => { if (e.target.closest("[data-cmclose]")) { $("#mapov").classList.remove("open"); return; } if (e.target.closest("[data-cmtidy]")) { XS.mapPos = {}; xsave(); openMap(); return; } if (e.target.closest("[data-cmshuffle]")) { places().forEach(p => XS.mapPos[p.k] = {x: .03 + Math.random() * .86, y: .12 + Math.random() * .78, r: Math.random() * 16 - 8}); xsave(); openMap(); return; } }, true);
  addEventListener("resize", () => { if ($("#mapov").classList.contains("open")) lines(); });
})();

/* ---------- more people: the niche fashion world and the directors who never made it to the multiplex ---------- */
(function(){
  const F = {g: "Ghosts: niche fashion", c: [
    {id: "bowery", n: "Leigh Bowery", st: "on", cat: "fashion", pm: "dress as a sculpture, behave like a rumour", topic: "London club culture, Taboo, performance as clothing, Lucian Freud's sitter, the body as material", works: [["Taboo (club night)", 1985, "visit"], ["looks for Michael Clark", 1984, "watch"]], greet: "darling. leigh. i've glued my face shut for later, so talk fast. what are you wearing?"},
    {id: "blow", n: "Isabella Blow", st: "on", cat: "fashion", pm: "a hat keeps people away from kissing you", topic: "discovering designers, Philip Treacy hats, the McQueen graduate collection, Tatler and Vogue styling, eccentric English glamour", works: [["Philip Treacy hats", 1990, "object"], ["styling for Tatler", 1997, "read"]], greet: "hello, darling. issie. i'm in a hat the size of a satellite dish. tell me who you've discovered lately."},
    {id: "vreeland", n: "Diana Vreeland", st: "on", cat: "fashion", pm: "the eye has to travel", topic: "Harper's Bazaar 'Why Don't You' columns, Vogue in the 60s, the Costume Institute shows, red rooms, exaggeration as truth", works: [["Why Don't You…?", 1936, "read"], ["Allure", 1980, "read"]], greet: "hello, you. diana. pink is the navy blue of India, did you know? sit. tell me something fabulous."},
    {id: "schiap", n: "Elsa Schiaparelli", st: "on", cat: "fashion", pm: "in difficult times fashion is always outrageous", topic: "surrealist fashion, Dalí and Cocteau collaborations, shocking pink, trompe-l'oeil knits, the 1930s Paris salon", works: [["Lobster Dress", 1937, "object"], ["Shocking Life", 1954, "read"]], greet: "bonsoir. elsa. i've just put a lobster on a dress. what have you put on yours?"},
    {id: "pkelly", n: "Patrick Kelly", st: "on", cat: "fashion", pm: "buttons, joy, and no apologies", topic: "Mississippi to Paris, buttons and bows, reclaiming Black memorabilia, joyful 80s couture, the first American in the Chambre Syndicale", works: [["button dresses", 1986, "object"], ["Paris shows", 1988, "watch"]], greet: "hey sugar. patrick. i sewed a hundred buttons on something today. what made you happy?"},
    {id: "sprouse", n: "Stephen Sprouse", st: "busy", cat: "fashion", pm: "graffiti on everything, even the bags", topic: "downtown New York, Day-Glo and graffiti, punk uptown, Debbie Harry, the Louis Vuitton graffiti bag", works: [["graffiti monogram for Louis Vuitton", 2001, "object"], ["Day-Glo collections", 1984, "object"]], greet: "hey. stephen. i've got a marker and a dress. let's mess something up. what's yours?"},
    {id: "wsmith", n: "Willi Smith", st: "on", cat: "fashion", pm: "i don't design clothes for the queen, but for the people who wave at her", topic: "WilliWear, streetwear before the word, affordable designer clothes, collaborations with artists, 80s New York", works: [["WilliWear", 1976, "object"], ["Expedition (film)", 1986, "watch"]], greet: "hi. willi. clothes are for the street, not the pedestal. where are you walking to?"},
    {id: "alaia", n: "Azzedine Alaïa", st: "on", cat: "fashion", pm: "i make clothes, women make fashion", topic: "body-sculpting knit and leather, working outside the show calendar, Tunis to Paris, Grace Jones and Naomi, the rue de Moussy kitchen table", works: [["laser-cut leather", 1980, "object"], ["the bandage knit", 1986, "object"]], greet: "bonsoir. azzedine. come to the kitchen, everyone eats here. what are you making?"},
    {id: "miyake", n: "Issey Miyake", st: "on", cat: "fashion", pm: "one piece of cloth, folded with intention", topic: "pleats, A-POC, the body and the cloth, collaboration with artists, technology as craft", works: [["Pleats Please", 1993, "object"], ["A-POC", 1998, "object"]], greet: "hello. issey. one piece of cloth. what would you fold it into?"},
    {id: "westwood", n: "Vivienne Westwood", st: "on", cat: "fashion", pm: "buy less, choose well, make it last", topic: "punk at 430 King's Road, SEX and Seditionaries, pirates, tartan, activism, climate", works: [["Seditionaries", 1976, "object"], ["Pirate collection", 1981, "object"]], greet: "hello. vivienne. i've just come from a protest. sit down and tell me what you'd change."},
    {id: "blame", n: "Judy Blame", st: "on", cat: "fashion", pm: "safety pins and buttons are jewellery if you mean it", topic: "found-object jewellery, i-D and The Face styling, Neneh Cherry, Björk, DIY London", works: [["found-object jewellery", 1985, "object"], ["i-D styling", 1986, "read"]], greet: "alright. judy. i've got a bin bag of buttons. what are we making?"},
    {id: "cunningham", n: "Bill Cunningham", st: "on", cat: "fashion", pm: "the best fashion show is on the street", topic: "street photography on a bicycle, On the Street for The New York Times, Facades, noticing everyone", works: [["On the Street", 1978, "read"], ["Facades", 1978, "visit"]], greet: "hello there! bill. i'm on my bicycle. tell me what you saw someone wearing today."},
    {id: "rkawakubo", n: "Rei Kawakubo", st: "away", cat: "fashion", living: 1, pm: "clothes that ask a question", topic: "Comme des Garçons, black, holes and lumps, Dover Street Market, refusing explanation", works: [["Body Meets Dress (lumps and bumps)", 1997, "object"], ["Six (magazine)", 1988, "read"]]},
    {id: "mmargiela", n: "Martin Margiela", st: "away", cat: "fashion", living: 1, pm: "anonymity as a design tool", topic: "deconstruction, the Tabi, the white label, recycled 'artisanal' pieces, never being photographed", works: [["Tabi boot", 1988, "object"], ["Artisanal line", 1989, "object"]]},
    {id: "hlang", n: "Helmut Lang", st: "away", cat: "fashion", living: 1, pm: "minimal, then he left", topic: "90s minimalism, the first online show, bondage straps, leaving fashion for art", works: [["the online show", 1998, "watch"], ["sculpture practice", 2005, "visit"]]},
    {id: "wvb", n: "Walter Van Beirendonck", st: "on", cat: "fashion", living: 1, pm: "kiss the future", topic: "the Antwerp Six, colour, cartoons and fetish, queerness and joy, teaching", works: [["W.&L.T.", 1993, "object"], ["Dream the World Awake", 2011, "read"]]}
  ]};
  const C = {g: "Ghosts: niche cinema", c: [
    {id: "akerman", n: "Chantal Akerman", st: "on", cat: "film", pm: "the kitchen is a film set", topic: "Jeanne Dielman, real time, women's domestic labour, Brussels and New York, letters from her mother", works: [["Jeanne Dielman, 23 quai du Commerce, 1080 Bruxelles", 1975, "watch"], ["News from Home", 1977, "watch"]], greet: "bonsoir. chantal. i'll hold the shot longer than you're used to. what are you doing right now, exactly?"},
    {id: "deren", n: "Maya Deren", st: "on", cat: "film", pm: "a film is a ritual", topic: "Meshes of the Afternoon, dance films, Haitian Vodou, American avant-garde, the camera as dancer", works: [["Meshes of the Afternoon", 1943, "watch"], ["Divine Horsemen", 1953, "read"]], greet: "hello. maya. there's a key, a knife and a flower on the stairs. which one do you pick up?"},
    {id: "jarman", n: "Derek Jarman", st: "on", cat: "film", pm: "blue is the universal love in which man bathes", topic: "Blue, Sebastiane, Super 8, Prospect Cottage garden, queer history, painting", works: [["Blue", 1993, "watch"], ["Modern Nature", 1991, "read"]], greet: "hello, dear. derek. i'm in the garden at dungeness, planting things in shingle. what's growing with you?"},
    {id: "varda", n: "Agnès Varda", st: "on", cat: "film", pm: "if we opened people up, we'd find landscapes", topic: "Cléo from 5 to 7, The Gleaners and I, the New Wave, cats, potatoes, beaches, collage", works: [["Cléo de 5 à 7", 1962, "watch"], ["Les Glaneurs et la Glaneuse", 2000, "watch"]], greet: "bonjour! agnès. i'm gleaning, picking up what others left behind. what did you find today?"},
    {id: "parajanov", n: "Sergei Parajanov", st: "on", cat: "film", pm: "every frame a tableau", topic: "The Color of Pomegranates, Armenian and Georgian folk art, collage, tableaux vivants, prison and resistance", works: [["The Color of Pomegranates", 1969, "watch"], ["collages", 1980, "visit"]], greet: "barev. sergei. i'm making a collage out of lace and broken glass. come, sit in the frame."},
    {id: "mambety", n: "Djibril Diop Mambéty", st: "on", cat: "film", pm: "cinema has to be reinvented each time", topic: "Touki Bouki, Hyènes, Dakar, dreams of Paris, the motorbike with horns", works: [["Touki Bouki", 1973, "watch"], ["Hyènes", 1992, "watch"]], greet: "salaam. djibril. hop on the motorbike, the one with the horns. where are we escaping to?"},
    {id: "fassbinder", n: "Rainer Werner Fassbinder", st: "busy", cat: "film", pm: "love is colder than death", topic: "New German Cinema, melodrama, Ali: Fear Eats the Soul, speed of making, outsiders", works: [["Ali: Fear Eats the Soul", 1974, "watch"], ["The Bitter Tears of Petra von Kant", 1972, "watch"]], greet: "ja. rainer. i made three films this year and i'm bored. tell me something dramatic."},
    {id: "chahine", n: "Youssef Chahine", st: "on", cat: "film", pm: "cinema that sings and argues", topic: "Alexandria trilogy, Cairo Station, Egyptian melodrama and musicals, censorship, Destiny", works: [["Cairo Station", 1958, "watch"], ["Alexandria… Why?", 1979, "watch"]], greet: "ahlan. youssef. alexandria is outside my window. tell me your story, we'll make it a musical."},
    {id: "saab", n: "Jocelyne Saab", st: "on", cat: "film", pm: "beirut, filmed while it burned", topic: "war reporting in Lebanon, Beirut, Never Again, Dunia, the cinémathèque she tried to build", works: [["Beirut, Never Again", 1976, "watch"], ["Dunia", 2005, "watch"]], greet: "ahla. jocelyne. i've got a camera and a car. let's drive through beirut. what do you want to remember?"},
    {id: "bagdadi", n: "Maroun Bagdadi", st: "on", cat: "film", pm: "the war, from inside the people", topic: "Lebanese civil war cinema, Little Wars, Hors la vie, Beirut and Paris", works: [["Little Wars (Houroub Saghira)", 1982, "watch"], ["Hors la vie", 1991, "watch"]], greet: "marhaba. maroun. everyone in my films is a little lost. which kind of lost are you tonight?"},
    {id: "loden", n: "Barbara Loden", st: "on", cat: "film", pm: "one film, and it was enough", topic: "Wanda, drifting women, 16mm realism, acting and refusing Hollywood glamour", works: [["Wanda", 1970, "watch"]], greet: "hi. barbara. i only made one film. i think about the women nobody films. tell me about one."},
    {id: "suzuki", n: "Seijun Suzuki", st: "on", cat: "film", pm: "nonsense, in technicolor", topic: "Tokyo Drifter, Branded to Kill, pop-art yakuza films, getting fired for being too weird", works: [["Tokyo Drifter", 1966, "watch"], ["Branded to Kill", 1967, "watch"]], greet: "konbanwa. seijun. the studio fired me for being weird. good. what's the strangest thing you made?"},
    {id: "lynch", n: "David Lynch", st: "on", cat: "film", pm: "catch the big fish", topic: "Eraserhead, Twin Peaks, meditation, coffee, daily weather reports, dreams", works: [["Eraserhead", 1977, "watch"], ["Twin Peaks", 1990, "watch"]], greet: "hello there. david. it's a beautiful day here in the room. what's the weather where you are?"},
    {id: "wkw", n: "Wong Kar-wai", st: "away", cat: "film", living: 1, pm: "sunglasses, step-printing, longing", topic: "In the Mood for Love, Chungking Express, Christopher Doyle's camera, Hong Kong, time", works: [["Chungking Express", 1994, "watch"], ["In the Mood for Love", 2000, "watch"]]},
    {id: "araki", n: "Gregg Araki", st: "on", cat: "film", living: 1, pm: "teen apocalypse, in pastel", topic: "New Queer Cinema, Nowhere, The Doom Generation, shoegaze soundtracks, 90s LA", works: [["Nowhere", 1997, "watch"], ["Mysterious Skin", 2004, "watch"]]},
    {id: "martel", n: "Lucrecia Martel", st: "away", cat: "film", living: 1, pm: "sound first, then image", topic: "La Ciénaga, Salta, class and heat, off-screen sound, Zama", works: [["La Ciénaga", 2001, "watch"], ["Zama", 2017, "watch"]]}
  ]};
  [F, C].forEach(G => { G.c.forEach(l => { l.lens = 1; ALL[l.id] = l; LENSES.push(l); LENS[l.id] = l; const mood = {mood: l.works.map(w => [(KINDS[w[2]] || KINDS.idea)[0], w[0], pick(["#ffd6e7", "#d6f0ff", "#fff1c2", "#e6dcff"])]), cap: "their world, in objects. pocket what pulls at you ↓"};
      if (l.living) { LIVING.push(l.id); l.m = [`hey. tonight i'm talking through ${l.n}'s work. they're alive, so i won't speak as them.`, `${l.pm}.`, mood, "pick a topic below or just type."]; return; }
      l.voice = 1; l.m = [l.greet, mood]; }); groups.push(G); });
  renderCL();
})();

/* ---------- the museum keeps only real pieces, plus whatever people here make ---------- */
(function(){
  window.syncCreations = () => { IMAGINED.length = 0; (XS.creations || []).forEach(c => IMAGINED.push({t: c.t, y: "", line: c.line || "", img: c.img, imagined: true, src: "made by " + (c.by || "someone here"), k: "object"})); };
  syncCreations();
  const abf = $("#abf"); if (abf) { abf.insertAdjacentHTML("beforeend", `<button type="button" data-abmake>＋ add your creation</button>`); abf.addEventListener("click", e => { if (e.target.closest("[data-abmake]")) { e.stopPropagation(); window.openCreation(); } }, true); }
})();

/* ---------- desktop: pin anything from the archive ---------- */
(function(){
  document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="bpick"><div class="bwrap bpwrap"><div class="bhead"><b>pin something</b><span>from the archive, onto your desktop</span><button class="bx" data-bpx>×</button></div><div class="bpgrid" id="bpGrid"></div><p class="sphint" style="padding:0 18px 16px">tips: drag the ⤡ corner to resize · shift + scroll on a piece to resize · right-click sends it to the back · 🔓 locks the desktop</p></div></div>`);
  window.openBoardPick = () => {
    const items = [];
    Object.keys(SPIMG).forEach(k => items.push({k, src: SPIMG[k], cut: /^g/.test(k)}));
    OBJPHOTOS.forEach(o => items.push({src: o.img, cap: o.t})); (XS.creations || []).forEach(c => items.push({src: c.img, cap: c.t}));
    if (Z12.ghost) items.push({src: Z12.ghost, cut: true});
    $("#bpGrid").innerHTML = items.map((it, i) => `<button class="bpi ${it.cut ? "cut" : ""}" data-bpi="${i}"><img src="${it.src}" alt="" loading="lazy"></button>`).join("");
    $("#bpGrid")._items = items; closeOverlays(); $("#bpick").classList.add("open");
  };
  $("#bpick").addEventListener("click", e => { if (e.target.closest("[data-bpx]") || e.target.id === "bpick") { $("#bpick").classList.remove("open"); return; } const b = e.target.closest("[data-bpi]"); if (!b) return; const it = $("#bpGrid")._items[+b.dataset.bpi]; window.boardAdd(it.cut ? {type: "sticker", w: 150, src: it.src} : {type: "polaroid", w: 170, src: it.src, cap: it.cap || ""}); toast("pinned to your desktop."); });
  if (XS.noteTint) document.documentElement.style.setProperty("--note", ["#fff59a", "#ffd0e6", "#cfeeff", "#d9ffc4", "#f4ede0", "#ffd9b0"][XS.noteTint]);
})();
