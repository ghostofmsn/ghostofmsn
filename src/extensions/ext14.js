
/* =================== EXTENSION 14: sim avatars, the abyss, sparks, dynamite, the map, customise, astrology, lists, spotify, real presence, ghost demos =================== */
/* ---------- cursor: no plumbob. a sharp little arrow with a chromatic ghost ---------- */
(function(){
  const c = $("#cur"); if (c) c.remove();
  const arrow = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Cpath d='M5 3 L5 21 L10 16.5 L13.5 24 L16.5 22.6 L13 15.2 L19.5 15.2 Z' fill='%23ff3dd4' transform='translate(1.6 0.8)'/%3E%3Cpath d='M5 3 L5 21 L10 16.5 L13.5 24 L16.5 22.6 L13 15.2 L19.5 15.2 Z' fill='%2340ffe0' transform='translate(-1.2 -0.4)' opacity='.8'/%3E%3Cpath d='M5 3 L5 21 L10 16.5 L13.5 24 L16.5 22.6 L13 15.2 L19.5 15.2 Z' fill='%23fff' stroke='%23000' stroke-width='1.6' stroke-linejoin='round'/%3E%3C/svg%3E";
  const hand = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Ccircle cx='13' cy='13' r='7' fill='none' stroke='%23ff3dd4' stroke-width='2.4' transform='translate(1.4 .8)'/%3E%3Ccircle cx='13' cy='13' r='7' fill='none' stroke='%2340ffe0' stroke-width='2.4' transform='translate(-1 -.4)'/%3E%3Ccircle cx='13' cy='13' r='7' fill='none' stroke='%23000' stroke-width='3.4'/%3E%3Ccircle cx='13' cy='13' r='7' fill='none' stroke='%23fff' stroke-width='1.6'/%3E%3Ccircle cx='13' cy='13' r='1.8' fill='%23000'/%3E%3C/svg%3E";
  const st = document.createElement("style");
  st.textContent = `body.ccur,body.ccur *{cursor:url("${arrow}") 5 3,auto!important}body.ccur a,body.ccur a *,body.ccur button,body.ccur button *,body.ccur .hs,body.ccur .r3tag,body.ccur [data-open],body.ccur [data-go],body.ccur .ct,body.ccur .piece,body.ccur select,body.ccur label,body.ccur [data-sq],body.ccur .card,body.ccur .sleeve,body.ccur .mnode,body.ccur .ms{cursor:url("${hand}") 13 13,pointer!important}body.ccur input,body.ccur textarea,body.ccur [contenteditable]{cursor:text!important}`;
  document.head.appendChild(st);
})();

/* ---------- the closet, rendered like create-a-sim ---------- */
function simSpec(f){
  const pal = k => PAL[(f[k] || [, 0])[1]] || PAL[0], has = k => f[k] && f[k][0] && f[k][0] !== "none";
  return {skin: SKINS[f.skin | 0] || SKINS[1], hair: HAIRC[f.hc | 0] || HAIRC[0], brow: hexShade(HAIRC[f.hc | 0] || HAIRC[0], .8), eye: EYEC[f.ec | 0] || EYEC[0], lips: LIPC[f.lc | 0] || LIPC[0],
    hairdo: f.do || "long", body: f.body || "slim", lash: f.lash !== false, fh: f.fh || "none", glasses: (f.ex || []).includes("glasses"), freckles: (f.ex || []).includes("freckles"),
    top: pal("top"), topK: (f.top || ["tee"])[0], bottom: pal("bottom"), bottomK: (f.bottom || ["flares"])[0], shoes: pal("shoes"), outer: has("outer") ? pal("outer") : null, hoops: (f.acc || [])[0] === "hoops"};
}
const SIMC = {};
function simImg(f, mode){ const sp = simSpec(f), k = mode + JSON.stringify(sp); if (!SIMC[k]) { try { SIMC[k] = R3D.simAvatar(sp, mode === "full" ? 420 : 256, mode); } catch(e) { return null; } } return SIMC[k]; }
XS.dollMode = XS.dollMode || "3d";
(function(){
  const d = document.querySelector("#closet .doll"); if (!d) return;
  d.insertAdjacentHTML("afterbegin", `<img id="sim3d" alt="your avatar"><div class="dmode"><button data-dm="3d">3D sim</button><button data-dm="pixel">pixel doll</button></div>`);
  d.addEventListener("click", e => { const b = e.target.closest("[data-dm]"); if (!b) return; XS.dollMode = b.dataset.dm; xsave(); renderCloset(); });
  let tmr = null;
  const _rc14 = renderCloset; renderCloset = function(){ _rc14(); const three = XS.dollMode === "3d"; d.classList.toggle("is3d", three); d.querySelectorAll("[data-dm]").forEach(b => b.classList.toggle("on", b.dataset.dm === XS.dollMode));
    if (three) { clearTimeout(tmr); tmr = setTimeout(() => { const u = simImg(FIT, "full"); if (u) $("#sim3d").src = u; myDP(); }, 40); } };
  const _mdp14 = myDP; myDP = function(){ if (!XS.myPhoto && !XS.dpOff && XS.dollMode === "3d") { const u = simImg(FIT, "bust"); if (u) { const av = document.querySelector("#cl .me .av"); if (av) { av.classList.add("av10me"); av.innerHTML = `<img src="${u}" alt="me">`; } const m = $("#chatMeDP"); if (m) m.innerHTML = `<img src="${u}" alt="me">`; return; } } _mdp14(); };
  myDP();
})();

/* ---------- imagined pieces: objects from an era that never existed ---------- */
const IMAGINED = (function(){
  const brands = ["Nokia", "Siemens", "Sagem", "Alcatel", "Sony", "Motorola", "Philips", "Bandai", "Sega", "Ericsson", "Tiger", "Casio"];
  const words = ["Lumen", "Halo", "Mirage", "Velvet", "Orbit", "Echo", "Silk", "Pulse", "Opal", "Nocturne", "Bloom", "Static", "Mood", "Lagoon"];
  const kinds = ["a phone", "a pager", "a music player", "a pocket pet", "a lamp", "a camera", "a console", "a perfume bottle"];
  const feats = ["it played your ex's ringtone when they were nearby", "the screen showed the weather of the person you missed", "it only worked at night", "it recorded 3 seconds of silence and played it back as a song", "it vibrated in morse code", "it came with a matching lip gloss", "you charged it by holding it", "it forgot one contact a week, on purpose", "the keypad was in arabizi", "it had a mirror where the camera should be", "it sent one message a day, chosen by the moon"];
  const crits = ["recalled for being too emotionally accurate.", "the prototype is in a drawer in hamra. probably.", "only 200 made. all of them in lost luggage.", "beta testers refused to give it back.", "the advert ran once, at 2:13am, and never again.", "banned in three countries for making people text back."];
  const LUT = Z12.LUT, rnd = (a) => a[Math.random() * a.length | 0], out = [];
  for (let i = 0; i < 24; i++) {
    const A = OBJPHOTOS[(i * 5) % OBJPHOTOS.length], B = OBJPHOTOS[(i * 11 + 3) % OBJPHOTOS.length];
    const c = document.createElement("canvas"); c.width = c.height = 160; const x = c.getContext("2d"); const it = {t: `${brands[i % brands.length]} ${words[(i * 3) % words.length]} ${["", "X", "II", "mini", "S", "Pro"][i % 6]}`.trim(), y: 1998 + (i * 7) % 11, imagined: 1, k: "object", src: "the imagined wing", line: `${rnd(kinds)} that never existed. ${rnd(feats)}.`, crit: rnd(crits), credit: `imagined by GoMsn from photos: ${A.credit.replace("photo: ", "")} + ${B.credit.replace("photo: ", "")}`};
    const ia = new Image(), ib = new Image(); let n = 0;
    const done = () => { if (++n < 2) return; x.fillStyle = "#0a0610"; x.fillRect(0, 0, 160, 160); const cover = (im, sx, sw) => { const k = 160 / Math.min(im.width, im.height); x.drawImage(im, sx * im.width, 0, sw * im.width, im.height, sx * 160, (160 - im.height * k) / 2, sw * 160, im.height * k); };
      cover(ia, 0, 1); x.save(); x.globalCompositeOperation = i % 2 ? "difference" : "screen"; cover(ib, .45, .55); x.restore();
      const id = x.getImageData(0, 0, 160, 160), p = id.data, hue = (i * 37) % 256; for (let q = 0; q < p.length; q += 4) { const l = (p[q] * .3 + p[q + 1] * .59 + p[q + 2] * .11) | 0, k = (((l + hue) & 255)) * 3; p[q] = p[q] * .45 + LUT[k] * .55; p[q + 1] = p[q + 1] * .45 + LUT[k + 1] * .55; p[q + 2] = p[q + 2] * .45 + LUT[k + 2] * .55; }
      for (let y = 0; y < 160; y += 3) for (let xx = 0; xx < 160; xx++) { const o = (y * 160 + xx) * 4; p[o] *= .8; p[o + 1] *= .8; p[o + 2] *= .8; }
      x.putImageData(id, 0, 0); x.fillStyle = "#ff3dd4"; x.font = "bold 11px Space Mono"; x.fillText("NEVER MADE", 6, 152); it.img = c.toDataURL("image/webp", .7); };
    ia.onload = ib.onload = done; ia.src = A.img; ib.src = B.img; out.push(it);
  }
  return out;
})();

/* ---------- the abyss: the museum you fall into ---------- */
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="abyss"><div id="abhost"></div><div class="abhud">
  <div class="abtop"><b>THE ABYSS</b><span>everything that left, and everything that never arrived</span><button class="bx" data-abclose>×</button></div>
  <div class="abfilters" id="abf"><button data-abf="all" class="on">all</button><button data-abf="forgotten">the forgotten</button><button data-abf="imagined">made by you</button><button data-abf="tunnel">↳ tunnel view</button><button data-abf="flat">↳ flat view</button></div>
  <div class="abhover" id="abhover"></div><div class="abcard" id="abcard"></div>
  <div class="abhint">drag to look around · scroll to drift · click a piece to pull it out of the dark</div></div></div>`);
(function(){
  let inst = null, filt = "all", cur = null;
  const forgotten = () => OBJPHOTOS.map(o => Object.assign({k: "object", src: "the forgotten wing"}, o)).concat(EXHIBITS.filter(e => !["phones", "counter", "people", "deadlinks"].includes(e.id)).flatMap(e => { try { return e.pieces().filter(p => p.art).map(p => ({t: p.t, y: p.y, line: p.line, crit: p.crit, img: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(/xmlns=/.test(p.art) ? p.art : p.art.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"')), k: "object", src: e.t})); } catch(_) { return []; } }));
  const pool = () => (filt === "imagined" ? IMAGINED : filt === "forgotten" ? forgotten() : forgotten().concat(IMAGINED)).filter(i => i.img);
  function card(it){ cur = it; const all = pool(), see = all.filter(o => o !== it && (o.imagined === it.imagined || Math.abs((+o.y || 0) - (+it.y || 0)) <= 2)).sort(() => Math.random() - .5).slice(0, 3);
    $("#abcard").innerHTML = `<div class="abcat">${it.imagined ? esc(it.src || "made by someone here") : "the forgotten · " + esc(it.src || "")}</div><h2>${esc(it.t)}</h2><div class="aby">${esc(String(it.y || ""))}</div>
      <p>${esc(it.line || "")}</p>${see.length ? `<div class="absee"><span>see also</span>${see.map((o, i) => `<button data-absee="${i}">${esc(o.t)}</button>`).join("")}</div>` : ""}
      <div class="abacts"><button class="bact" data-abmean>what it means</button><button class="bact" data-abpock>🎒 pocket</button><button class="bact" data-abback>back into the dark</button></div>`;
    $("#abcard").classList.add("on"); $("#abcard")._see = see; }
  function start(){ if (inst) inst.dispose(); $("#abcard").classList.remove("on"); inst = R3D.abyss($("#abhost"), pool(), {hover: it => { $("#abhover").innerHTML = it ? `<b>${esc(it.t)}</b> ${it.y ? "· " + esc(String(it.y)) : ""}${it.imagined ? " · <i>imagined</i>" : ""}` : ""; }, focus: card}); inst.start(); }
  window.openAbyss = () => { closeOverlays(); $("#abyss").classList.add("open"); markDock("gallery"); setTimeout(start, 30); tone([[196,.3],[262,.3],[392,.5]], "sine", .03); };
  $("#abyss").addEventListener("click", e => {
    if (e.target.closest("[data-abclose]")) { $("#abyss").classList.remove("open"); inst && inst.stop(); return; }
    const f = e.target.closest("[data-abf]"); if (f) { const v = f.dataset.abf; if (v === "tunnel") { $("#abyss").classList.remove("open"); inst && inst.stop(); window.openDataland(); return; } if (v === "flat") { $("#abyss").classList.remove("open"); inst && inst.stop(); Z12.flat = 1; openGallery("phones"); Z12.flat = 0; return; } filt = v; document.querySelectorAll("#abf [data-abf]").forEach(b => b.classList.toggle("on", b === f)); start(); return; }
    const s = e.target.closest("[data-absee]"); if (s) { const it = $("#abcard")._see[+s.dataset.absee]; inst.show(it); return; }
    if (e.target.closest("[data-abmean]") && cur) openMeaning(cur);
    if (e.target.closest("[data-abpock]") && cur) collect({t: cur.t, y: cur.y, k: "object", src: cur.src, img: cur.img, line: cur.line, crit: cur.crit, credit: cur.credit});
    if (e.target.closest("[data-abback]")) { $("#abcard").classList.remove("on"); inst && inst.close(); }
  });
  const _og14 = openGallery; openGallery = function(id){ if (Z12.flat || document.body.classList.contains("zen")) return _og14(id); window.openAbyss(); };
  const _co14 = closeOverlays; closeOverlays = function(){ _co14(); if ($("#abyss").classList.contains("open")) { $("#abyss").classList.remove("open"); inst && inst.stop(); } };
})();

/* ---------- sparks: generators that start you, then get out of the way ---------- */
const SPARK = {
  zen: ["name three sounds you can hear right now.", "unclench your jaw. now your shoulders. now your opinion of yourself.", "drink water like it's a ritual, not a task.", "think of one person who'd be happy to hear from you. that's it, just think.", "look at something far away for 20 seconds.", "what's one thing you're carrying that isn't yours?", "you don't have to finish anything tonight.", "breathe out longer than you breathe in. twice.", "write down the smallest good thing from today.", "put your phone face down for one song.", "say no to one thing tomorrow. a small one. practise.", "what would the 13-year-old you say about tonight? be kind back."],
  intent: ["listen more than i scroll", "make one thing with my hands", "reply to the message i've been avoiding", "eat lunch away from a screen", "walk somewhere without headphones", "finish one book chapter", "be slow with myself", "say the nice thing out loud", "leave one room better than i found it", "ask someone a real question"],
  write: ["describe the first website you loved, without naming it.", "write the away message for this exact week of your life.", "a letter to the version of you who had a nokia.", "list 7 objects from your childhood bedroom. pick one. tell its story.", "what song was playing the last time you felt free?", "describe a smell that lives in a house that doesn't exist anymore.", "the most beautiful thing you've seen on public transport.", "write about a place you only know from someone else's stories.", "what did your family argue about at dinner, in 2004?", "a conversation you replay. rewrite the ending.", "the font of your personality. defend it.", "something you collected and then stopped. why did you stop?", "the internet you miss, in three sentences.", "describe your city at 2:13am."],
  away: ["brb, becoming a myth", "out being iconic. back sunday.", "busy dissolving the algorithm", "away: emotionally on a balcony in hamra", "brb, rewinding a cassette with a pencil", "not here. probably at the record shop.", "appearing offline, dressed for it", "away: reading the comments on a dead forum", "brb, my nokia needs me", "do not disturb: crying at a varda film"],
  nick: [n => `~*~ ${n} ~*~`, n => `xX_${n}_Xx`, n => `♡ ${n} :: appear offline ♡`, n => `${n} [sharing: fairuz – wahdon]`, n => `✿ ${n} ✿ dressed for no one`, n => `.:: ${n} ::. b-side only`, n => `${n} ☾ out of office, into the archive`],
  stranger: ["hey stranger, i hope your tea is still warm.", "to whoever opens this: you're doing better than you think.", "i don't know you, but i'm rooting for you.", "this is a note from beirut / paris / somewhere. i hope your city is gentle tonight.", "if you're reading this at 2am: same."],
  hope: ["i hope the internet gets slow again", "i hope every child gets to be bored and safe", "i hope we keep the old songs and the people who sing them", "i hope borders become just lines on old maps", "i hope you text them back"],
  caption: ["found this in the archive and couldn't leave it there", "not a recommendation, a confession", "the b-side of my week", "if you know, you know. if you don't, now you do", "pocketing this before the algorithm notices"],
  list: ["songs for a taxi in hamra at 2am", "films to watch when the wifi is down", "books that changed my politics softly", "objects i'd save from a fire", "music for pretending you're in a jarmusch film", "records your aunt had and you should too", "watchlist: women who refused", "a booklist for the first rainy week"]
};
function spark(kind){ const a = SPARK[kind]; if (kind === "nick") return pick(a)(me.nick || "ghost"); return pick(a); }
function sparkBtn(kind, target, label = "✦ spark"){ return `<button type="button" class="sparkb" data-spark="${kind}" data-target="${target}" title="a spark, not an answer. the rest is yours.">${label}</button>`; }
document.addEventListener("click", e => { const b = e.target.closest("[data-spark]"); if (!b) return; e.preventDefault(); e.stopPropagation(); const s = spark(b.dataset.spark), t = document.querySelector(b.dataset.target); if (!t) return;
  if ("value" in t) { t.value = t.value.trim() ? t.value : s; t.placeholder = s; t.focus(); } else t.textContent = s; tone([[1200 + Math.random() * 600, .04]], "sine", .02); }, true);
(function(){
  /* the quiet room: sparks in every form, plus a spark tab */
  const inject = () => { const qb = $("#qbody"); if (!qb) return;
    [["#qiT", "intent"], ["#qbT", "stranger"], ["#qhT", "hope"]].forEach(([sel, k]) => { const el = qb.querySelector(sel); if (el && !el.nextElementSibling?.classList?.contains("sparkb")) el.insertAdjacentHTML("afterend", sparkBtn(k, sel)); }); };
  new MutationObserver(inject).observe($("#qbody"), {childList: true});
  $("#qtabs").insertAdjacentHTML("beforeend", `<button data-qt13="spark">✦ spark generator</button>`);
  $("#qtabs").addEventListener("click", e => { const b = e.target.closest("[data-qt13]"); if (!b) return; e.stopPropagation(); document.querySelectorAll("#qtabs button").forEach(x => x.classList.toggle("on", x === b));
    const draw = k => { $("#qbody").innerHTML = `<div class="sparkgen"><div class="sgcats">${[["zen", "for your nervous system"], ["write", "a writing prompt"], ["intent", "an intention"], ["away", "an away message"], ["nick", "an msn name"], ["list", "a list to start"]].map(([kk, n]) => `<button data-sgk="${kk}" class="${kk === k ? "on" : ""}">${n}</button>`).join("")}</div><div class="sgcard">${esc(spark(k))}</div><button class="bact" data-sgk="${k}">↻ another</button><small class="muted">sparks, not answers. take one, write the rest in your own words, so we don't turn into robots.</small></div>`; };
    draw("zen"); $("#qbody").onclick = ev => { const c = ev.target.closest("[data-sgk]"); if (c) draw(c.dataset.sgk); }; }, true);
  document.querySelectorAll("#qtabs [data-qt]").forEach(b => b.addEventListener("click", () => { $("#qbody").onclick = null; }));
  /* writing places */
  const add = (sel, kind) => { const el = $(sel); if (el && !el.dataset.sp) { el.dataset.sp = 1; el.insertAdjacentHTML("afterend", sparkBtn(kind, sel)); } };
  ["#jb", "#fnb", "#npText", "#wt", "#fh"].forEach(s => add(s, "write"));
  const pmEl = $("#mypm"); if (pmEl) pmEl.insertAdjacentHTML("afterend", `<button type="button" class="sparkb mini" data-spark="away" data-target="#mypm">✦</button>`);
  new MutationObserver(() => { add("#cT", "caption"); add("#jb", "write"); add("#fnb", "write"); }).observe(document.body, {childList: true, subtree: false});
  setInterval(() => { add("#cT", "caption"); add("#jb", "write"); add("#fnb", "write"); }, 2000);
})();

/* ---------- arcade: dynamite (the minesweeper you remember) ---------- */
(function(){
  $("#gtabs").insertAdjacentHTML("beforeend", `<div class="tab" data-g="dyn">🧨 dynamite</div>`);
  const _ra14 = renderArcade; renderArcade = function(){ if (GTAB === "dyn") return dynUI(); return _ra14(); };
  const N = 10, MINES = 14; let D = null;
  const newD = () => { D = {cells: Array.from({length: N * N}, () => ({m: 0, o: 0, f: 0, n: 0})), over: 0, first: 1, t0: 0}; };
  const nb = i => { const r = i / N | 0, c = i % N, out = []; for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) if ((a || b) && r + a >= 0 && r + a < N && c + b >= 0 && c + b < N) out.push((r + a) * N + c + b); return out; };
  const plant = safe => { let k = 0; while (k < MINES) { const i = Math.random() * N * N | 0; if (i === safe || nb(safe).includes(i) || D.cells[i].m) continue; D.cells[i].m = 1; k++; } D.cells.forEach((c, i) => c.n = nb(i).filter(j => D.cells[j].m).length); };
  const open = i => { const c = D.cells[i]; if (c.o || c.f) return; c.o = 1; if (c.m) { D.over = -1; D.cells.forEach(x => { if (x.m) x.o = 1; }); tone([[90,.4],[60,.5]], "sawtooth", .06); return; } if (!c.n) nb(i).forEach(open); };
  const won = () => D.cells.every(c => c.m || c.o);
  function draw(){ const left = MINES - D.cells.filter(c => c.f).length, t = D.t0 ? Math.round(((D.end || Date.now()) - D.t0) / 1000) : 0;
    $("#gbody").innerHTML = `<div class="chesswrap"><div class="chesshead"><b>dynamite</b><span>${D.over === 1 ? "defused. you're the moment. 💋" : D.over === -1 ? "BOOM. hair still perfect though." : `🧨 ${left} · ⏱ ${t}s`}</span><button class="xp" id="dynew">new board</button></div>
    <div class="dyn">${D.cells.map((c, i) => `<div class="ms ${c.o ? "o" : ""} ${c.o && c.m ? "boom" : ""}" data-ms="${i}">${c.o ? (c.m ? "🧨" : c.n ? `<b class="n${c.n}">${c.n}</b>` : "") : c.f ? "💋" : ""}</div>`).join("")}</div>
    <small class="muted">click to dig. right-click (or long-press) to leave a kiss where you think the dynamite is.</small></div>`;
    $("#dynew").onclick = () => { newD(); draw(); }; }
  function dynUI(){ if (!D) newD(); draw(); }
  const act = (i, flag) => { if (D.over) return; const c = D.cells[i]; if (flag) { if (!c.o) c.f = !c.f; draw(); return; } if (D.first) { plant(i); D.first = 0; D.t0 = Date.now(); } open(i); if (!D.over && won()) { D.over = 1; D.end = Date.now(); award(25); tone([[784,.1],[988,.1],[1319,.3]], "triangle", .05); } else if (D.over) D.end = Date.now(); else tone([[500 + Math.random() * 200, .03]], "square", .02); draw(); };
  let lp = null;
  $("#gbody").addEventListener("click", e => { if (GTAB !== "dyn") return; const m = e.target.closest("[data-ms]"); if (m) act(+m.dataset.ms, false); });
  $("#gbody").addEventListener("contextmenu", e => { if (GTAB !== "dyn") return; const m = e.target.closest("[data-ms]"); if (m) { e.preventDefault(); act(+m.dataset.ms, true); } });
  $("#gbody").addEventListener("touchstart", e => { const m = e.target.closest("[data-ms]"); if (!m || GTAB !== "dyn") return; lp = setTimeout(() => { act(+m.dataset.ms, true); lp = "done"; }, 450); }, {passive: true});
  $("#gbody").addEventListener("touchend", e => { if (lp === "done") e.preventDefault(); clearTimeout(lp); lp = null; });
})();

/* ---------- the map of my things: everything you pocketed, by category ---------- */
(function(){
  $("#stView").textContent = "🗺 map of my things";
  const _rs14 = renderStash; renderStash = function(){ _rs14(); $("#stView").textContent = stMode === "list" ? "🗺 map of my things" : "☰ back to the board"; };
  renderConstel = function(list){
    const kinds = Object.keys(KINDS).filter(k => list.some(s => (s.k || "idea") === k)), W = 900, H = 560, cx = W / 2, cy = H / 2;
    const C = {}; kinds.forEach((k, i) => { const a = i / kinds.length * Math.PI * 2 - Math.PI / 2; C[k] = [cx + Math.cos(a) * (kinds.length > 1 ? 280 : 0), cy + Math.sin(a) * (kinds.length > 1 ? 170 : 0)]; });
    const P = {}; kinds.forEach(k => { const items = list.filter(s => (s.k || "idea") === k); items.forEach((s, j) => { const a = j * 2.4, r = 38 + 22 * Math.sqrt(j); P[s.id] = [C[k][0] + Math.cos(a) * r, C[k][1] + Math.sin(a) * r * .8]; }); });
    let lines = ""; list.forEach(s => (s.links || []).forEach(id => { if (P[id] && s.id < id) lines += `<line x1="${P[s.id][0]}" y1="${P[s.id][1]}" x2="${P[id][0]}" y2="${P[id][1]}" stroke="#ff3dd4" stroke-width="2"/>`; }));
    kinds.forEach(k => list.filter(s => (s.k || "idea") === k).forEach(s => { lines += `<line x1="${C[k][0]}" y1="${C[k][1]}" x2="${P[s.id][0]}" y2="${P[s.id][1]}" stroke="#ffffff22" stroke-width="1"/>`; }));
    $("#stBody").innerHTML = `<div class="tmap"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${lines}</svg>
      ${kinds.map(k => { const [e, n] = KINDS[k], [x, y] = C[k], c = list.filter(s => (s.k || "idea") === k).length; return `<div class="mcat" style="left:${x / W * 100}%;top:${y / H * 100}%"><span>${e}</span>${esc(n)} <i>${c}</i></div>`; }).join("")}
      ${list.map(s => `<div class="mnode ${s.st === 2 ? "done" : ""}" style="left:${P[s.id][0] / W * 100}%;top:${P[s.id][1] / H * 100}%" data-smean="${s.id}" title="${esc(s.t)}">${s.img ? `<img src="${s.img}" alt="">` : `<span>${(KINDS[s.k] || KINDS.idea)[0]}</span>`}<label>${esc(s.t.slice(0, 26))}</label></div>`).join("")}</div>
      <small class="muted">grouped by what they are. pink lines are links you made. click anything to see what it means.</small>`;
  };
  $("#hud .hudbtns").insertAdjacentHTML("afterbegin", `<button id="hudMap" title="the map of everything you pocketed">🗺 my map</button>`);
  $("#hudMap").onclick = () => { stMode = "map"; openStash(); };
})();

/* ---------- customise: make it yours ---------- */
XS.custom = XS.custom || {};
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="custom"><div class="bwrap cuwrap"><div class="bhead"><b>make it yours</b><span>it saves on this device</span><button class="bx" data-cuclose>×</button></div><div id="cubody"></div></div></div>`);
(function(){
  const C = XS.custom;
  const ACC = {acid: "#9bff6a", pink: "#ff3dd4", ice: "#7fd8ff", tang: "#ff9a3c", lilac: "#b48cff", gold: "#ffd23f"};
  function apply(){
    const b = document.body; ["w-glitch", "w-david", "w-calm", "w-night", "w-mine", "t-big", "t-huge", "nomotion"].forEach(k => b.classList.remove(k));
    b.classList.add("w-" + (C.wall || "glitch")); if (C.text) b.classList.add("t-" + C.text); if (C.motion === "off") b.classList.add("nomotion");
    document.documentElement.style.setProperty("--acc", ACC[C.acc || "acid"]);
    let mw = $("#mywall"); if (C.wall === "mine" && C.wallImg) { if (!mw) { document.body.insertAdjacentHTML("afterbegin", `<div id="mywall"></div>`); mw = $("#mywall"); } mw.style.backgroundImage = `url(${C.wallImg})`; } else if (mw) mw.remove();
    const ws = $("#wallsay"); if (C.say) { if (!ws) document.body.insertAdjacentHTML("afterbegin", `<div id="wallsay"></div>`); $("#wallsay").textContent = C.say; } else if (ws) ws.remove();
  }
  const row = (title, key, opts) => `<div class="curow"><b>${title}</b><div>${opts.map(([v, n]) => `<button data-cu="${key}" data-v="${v}" class="${(C[key] || opts[0][0]) === v ? "on" : ""}">${n}</button>`).join("")}</div></div>`;
  function paint(){
    $("#cubody").innerHTML = row("wallpaper", "wall", [["glitch", "glitch (bend)"], ["david", "just the David"], ["calm", "calm gradient"], ["night", "2:13am black"], ["mine", "my own image"]]) +
      `<div class="curow"><b>your own wallpaper</b><div><label class="bact cufile">🖼 choose an image<input type="file" accept="image/*" id="cuimg" hidden></label></div></div>` +
      `<div class="curow"><b>accent</b><div>${Object.entries(ACC).map(([k, c]) => `<button data-cu="acc" data-v="${k}" class="sw ${(C.acc || "acid") === k ? "on" : ""}" style="background:${c}" title="${k}"></button>`).join("")}</div></div>` +
      row("text size", "text", [["", "normal"], ["big", "bigger"], ["huge", "biggest"]]) +
      row("motion", "motion", [["on", "glitchy"], ["off", "still, please"]]) +
      row("sounds", "sound", [["on", "on"], ["off", "off"]]) +
      row("when i arrive", "start", [["room", "the room"], ["desk", "the desktop"]]) +
      `<div class="curow"><b>a line on your desktop</b><div><input class="cuin" id="cusay" maxlength="60" placeholder="e.g. appear offline, live online" value="${esc(C.say || "")}">${sparkBtn("away", "#cusay")}</div></div>` +
      `<div class="curow"><b>my accounts</b><div class="cuacc">${[["letterboxd", "Letterboxd username"], ["spotify", "Spotify profile link"], ["anghami", "Anghami profile link"], ["storygraph", "StoryGraph / Goodreads link"]].map(([k, n]) => `<input class="cuin" data-acct="${k}" placeholder="${n}" value="${esc((XS.accts || {})[k] || "")}">`).join("")}</div></div>`;
  }
  $("#custom").addEventListener("click", e => { if (e.target.closest("[data-cuclose]") || e.target.id === "custom") { $("#custom").classList.remove("open"); return; } const b = e.target.closest("[data-cu]"); if (!b) return; C[b.dataset.cu] = b.dataset.v; xsave(); apply(); paint(); });
  $("#custom").addEventListener("change", e => {
    if (e.target.id === "cuimg") { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"), k = Math.min(1, 1400 / im.width); c.width = im.width * k; c.height = im.height * k; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); C.wallImg = c.toDataURL("image/jpeg", .78); C.wall = "mine"; try { xsave(); } catch(_) { toast("that image is too big to keep. try a smaller one."); } apply(); paint(); }; im.src = r.result; }; r.readAsDataURL(f); }
    if (e.target.id === "cusay") { C.say = e.target.value.trim(); xsave(); apply(); }
    if (e.target.dataset.acct) { XS.accts = XS.accts || {}; XS.accts[e.target.dataset.acct] = e.target.value.trim(); xsave(); }
  });
  const _tone14 = tone; tone = function(...a){ if (C.sound === "off") return; return _tone14(...a); };
  $("#hud .hudbtns").insertAdjacentHTML("beforeend", `<button id="hudCu" title="make it yours">🎛 customise</button>`);
  $("#hudCu").onclick = () => { closeOverlays(); paint(); $("#custom").classList.add("open"); };
  window.openCustom = () => $("#hudCu").click();
  apply();
  if (C.start === "desk") { const _er = window.enterRoom; setTimeout(() => { if (document.body.classList.contains("inroom")) document.body.classList.remove("inroom"); }, 5600); }
})();

/* ---------- astrology corner: hot, blunt, a little unhinged ---------- */
const SIGNS = [["capricorn", "♑", [12, 22]], ["aquarius", "♒", [1, 20]], ["pisces", "♓", [2, 19]], ["aries", "♈", [3, 21]], ["taurus", "♉", [4, 20]], ["gemini", "♊", [5, 21]], ["cancer", "♋", [6, 21]], ["leo", "♌", [7, 23]], ["virgo", "♍", [8, 23]], ["libra", "♎", [9, 23]], ["scorpio", "♏", [10, 23]], ["sagittarius", "♐", [11, 22]]];
function sunSign(m, d){ let s = "capricorn"; [["aquarius", 1, 20], ["pisces", 2, 19], ["aries", 3, 21], ["taurus", 4, 20], ["gemini", 5, 21], ["cancer", 6, 21], ["leo", 7, 23], ["virgo", 8, 23], ["libra", 9, 23], ["scorpio", 10, 23], ["sagittarius", 11, 22], ["capricorn", 12, 22]].forEach(([n, mm, dd]) => { if (m > mm || (m === mm && d >= dd)) s = n; }); if (m === 1 && d < 20) s = "capricorn"; return s; }
const GHOSTSUN = {kanafani: "aries", fanon: "cancer", baldwin: "leo", hooks: "libra", lorde: "aquarius", sontag: "capricorn", basquiat: "capricorn", leguin: "libra", galeano: "virgo", luxemburg: "pisces", darwish: "pisces", said: "scorpio", warhol: "leo", varda: "gemini", ziad: "capricorn", gilscott: "aries", saadawi: "scorpio", tanizaki: "leo", fisher: "cancer", benjamin: "cancer", lovelace: "sagittarius", acoltrane: "virgo", schiap: "virgo", ysl: "leo", miyake: "taurus", vreeland: "libra", marker: "leo", chahine: "aquarius", orwell: "cancer", deleuze: "capricorn", adnan: "pisces", nsimone: "pisces", adavis: "aquarius", aroy: "sagittarius"};
function moonPhase(d = new Date()){ const lp = 2551443, nm = new Date(1970, 0, 7, 20, 35, 0), ph = ((d.getTime() - nm.getTime()) / 1000) % lp / lp; const names = ["new moon 🌑", "waxing crescent 🌒", "first quarter 🌓", "waxing gibbous 🌔", "full moon 🌕", "waning gibbous 🌖", "last quarter 🌗", "waning crescent 🌘"]; return names[Math.round(ph * 8) % 8]; }
const ASTRO = {
  today: ["you're not too much. the room was too small.", "stop explaining yourself to people who've decided to misunderstand you.", "your ex is thinking about your playlist. let them.", "you will want to text first. wait one song.", "today rewards the person who leaves the party early.", "someone is going to underestimate you. let them be surprised quietly.", "your intuition is right about the vibe, wrong about the timing.", "be precise with your words and lazy with your grudges.", "the archive of your feelings needs a clear-out, not a burn.", "you're allowed to change your mind in public."],
  do: ["vintage shopping", "a long bath", "the b-side", "cancelling plans kindly", "a handwritten note", "eating with your hands", "saying the hard thing softly", "a walk without a destination", "asking your aunt about 1998", "the museum's emptiest room", "dancing in the kitchen", "reading a whole chapter"],
  dont: ["the group chat", "doomscrolling", "explaining the joke", "the algorithm's suggestions", "replying in under a minute", "bangs", "arguing with a man about music", "checking who viewed your story", "buying the thing at 3am", "being available"]
};
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="astro"><div class="bwrap aswrap"><div class="bhead"><b>the astrology corner</b><span>for entertainment, mostly. mostly.</span><button class="bx" data-asclose>×</button></div><div id="asbody"></div></div></div>`);
(function(){
  const seeded = (s, arr) => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return arr[h % arr.length]; };
  function paint(){
    const b = $("#asbody"), bd = XS.birth;
    if (!bd) { b.innerHTML = `<form class="qform" id="asF"><label>when were you born?</label><input type="date" id="asD" required><small class="muted">just the day is enough for your sun sign. for your full chart (moon, rising), you'll need the time and place on Co–Star or The Pattern.</small><button class="bact">read me</button></form>`; $("#asF").onsubmit = e => { e.preventDefault(); XS.birth = $("#asD").value; xsave(); paint(); }; return; }
    const [y, m, d] = bd.split("-").map(Number), sg = sunSign(m, d), sym = SIGNS.find(s => s[0] === sg)[1], day = new Date().toISOString().slice(0, 10), key = sg + day;
    const dos = [0, 1, 2].map(i => seeded(key + "do" + i, ASTRO.do)), donts = [0, 1, 2].map(i => seeded(key + "dont" + i, ASTRO.dont));
    const twins = Object.entries(GHOSTSUN).filter(([, s]) => s === sg).map(([id]) => ALL[id]).filter(Boolean);
    const cusp = Object.values({a: 1}).length && [[1, 20], [2, 19], [3, 21], [4, 20], [5, 21], [6, 21], [7, 23], [8, 23], [9, 23], [10, 23], [11, 22], [12, 22]].some(([mm, dd]) => mm === m && Math.abs(d - dd) <= 1);
    b.innerHTML = `<div class="asgrid"><div class="assign"><span>${sym}</span><b>${sg}</b><small>sun sign${cusp ? " · you're on a cusp, check your chart" : ""}</small><small>today: ${moonPhase()}</small></div>
      <div class="asread"><div class="astoday">${esc(seeded(key, ASTRO.today))}</div><div class="asdo"><div><b>do</b>${dos.map(x => `<span>${esc(x)}</span>`).join("")}</div><div><b>don't</b>${donts.map(x => `<span>${esc(x)}</span>`).join("")}</div></div></div></div>
      ${twins.length ? `<div class="astwins"><b>ghosts who share your sun</b><div>${twins.map(t => `<button data-astchat="${t.id}"><span class="onav">${t.lens ? portrait(gfit(t.id)) : ""}</span>${esc(t.n)}</button>`).join("")}</div></div>` : ""}
      <div class="aslinks"><b>for the real chart</b><a href="https://www.costarastrology.com/" target="_blank" rel="noopener">Co–Star ↗</a><a href="https://www.thepattern.com/" target="_blank" rel="noopener">The Pattern ↗</a><a href="https://www.astro.com/horoscope" target="_blank" rel="noopener">astro.com free chart ↗</a><button class="linkbtn" id="asreset">change birthday</button></div>
      <small class="muted">Co–Star and The Pattern don't let other sites read your chart, so they open in their own apps. the reading above is GoMsn's, made fresh every day for your sign.</small>`;
    $("#asreset").onclick = () => { delete XS.birth; xsave(); paint(); };
  }
  $("#astro").addEventListener("click", e => { if (e.target.closest("[data-asclose]") || e.target.id === "astro") { $("#astro").classList.remove("open"); return; } const t = e.target.closest("[data-astchat]"); if (t) { $("#astro").classList.remove("open"); openChat(t.dataset.astchat); } });
  window.openAstro = () => { closeOverlays(); paint(); $("#astro").classList.add("open"); };
})();

/* ---------- lists: playlists, watchlists, booklists, anything-lists ---------- */
const LTYPES = {play: ["🎧", "playlist", "listen"], watch: ["🎬", "watchlist", "watch"], book: ["📚", "booklist", "read"], any: ["✦", "anything list", null]};
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="lists"><div class="bwrap lswrap"><div class="bhead"><b>lists</b><span>playlists, watchlists, booklists. make one, share it.</span><button class="bx" data-lsclose>×</button></div><div class="crtabs" id="lstabs"><button data-ls="mine" class="on">my lists</button><button data-ls="new">+ new list</button><button data-ls="all">everyone's lists</button></div><div id="lsbody"></div></div></div>`);
(function(){
  let tab = "mine", shared = [], editing = null;
  xready.then(() => { if (!XDB) return; try { XDB.collection("lists").onSnapshot(s => { shared = s.docs.flatMap(d => (d.data().items || []).map(x => Object.assign({u: d.id}, x))); if (tab === "all") paint(); }, () => {}); } catch(_) {} });
  XS.lists = XS.lists || [];
  const linkFor = (it, type) => { const q = encodeURIComponent(it); if (type === "watch") return [["letterboxd", `https://letterboxd.com/search/${q}/`]]; if (type === "play") return [["spotify", `https://open.spotify.com/search/${q}`], ["anghami", `https://play.anghami.com/search/${q}`]]; if (type === "book") return [["storygraph", `https://app.thestorygraph.com/browse?search_term=${q}`], ["goodreads", `https://www.goodreads.com/search?q=${q}`]]; return [["search", `https://duckduckgo.com/?q=${q}`]]; };
  const cover = L => { const imgs = (L.items || []).map(t => (XS.stash.find(s => s.t === t) || {}).img).filter(Boolean).slice(0, 4); return imgs.length ? `<div class="lcov g${imgs.length}">${imgs.map(u => `<img src="${u}" alt="">`).join("")}</div>` : `<div class="lcov gen" style="--h:${(L.title || "").length * 37 % 360}"><span>${LTYPES[L.type][0]}</span></div>`; };
  const lcard = (L, i, mine) => `<div class="lcard">${cover(L)}<div class="lmeta"><small>${LTYPES[L.type][0]} ${LTYPES[L.type][1]}${L.by ? " · by " + esc(L.by) : ""}</small><b>${esc(L.title)}</b>${L.note ? `<p>${esc(L.note)}</p>` : ""}
      <ol>${(L.items || []).map(t => `<li>${esc(t)} ${linkFor(t, L.type).map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n} ↗</a>`).join("")}</li>`).join("")}</ol>
      <div class="lacts">${mine ? `<button class="bact" data-lpub="${i}">${L.pub ? "shared ✓" : "share with everyone"}</button><button class="bact" data-ledit="${i}">edit</button><button class="bact" data-lcopy="${i}">copy as text</button>${L.type === "play" ? `<button class="bact" data-lsp="${i}">→ make it a Spotify playlist</button>` : ""}<button class="bact" data-ldel="${i}">delete</button>` : `<button class="bact" data-lsave="${i}">save a copy</button>`}</div></div></div>`;
  function paint(){
    document.querySelectorAll("#lstabs button").forEach(b => b.classList.toggle("on", b.dataset.ls === tab));
    const b = $("#lsbody"), acc = XS.accts || {};
    if (tab === "mine") b.innerHTML = (acc.letterboxd ? `<div class="lacc">your letterboxd: <a href="https://letterboxd.com/${encodeURIComponent(acc.letterboxd)}/" target="_blank" rel="noopener">${esc(acc.letterboxd)} ↗</a></div>` : `<div class="lacc">add your Letterboxd, Spotify, Anghami and StoryGraph in <a href="#" onclick="openCustom();return false">🎛 customise</a>.</div>`) + (XS.lists.length ? `<div class="lgrid">${XS.lists.map((L, i) => lcard(L, i, 1)).join("")}</div>` : `<p class="muted">no lists yet. start one: a playlist for a taxi ride, a watchlist for a breakup, a booklist for a revolution.</p>`);
    if (tab === "all") b.innerHTML = shared.length ? `<div class="lgrid">${shared.map((L, i) => lcard(L, i, 0)).join("")}</div>` : `<p class="muted">nobody has shared a list yet. be the first: lists you share show up here for everyone who opens the page signed in.</p>`;
    if (tab === "new") { const L = editing !== null ? XS.lists[editing] : {type: "play", title: "", note: "", items: []}; const fromStash = XS.stash.filter(s => !LTYPES[L.type][2] || s.k === LTYPES[L.type][2]);
      b.innerHTML = `<form class="qform lform" id="lF"><div class="ltypes">${Object.entries(LTYPES).map(([k, [e, n]]) => `<button type="button" data-lt="${k}" class="${L.type === k ? "on" : ""}">${e} ${n}</button>`).join("")}</div>
        <label>title</label><div class="lrow"><input id="lT" maxlength="80" value="${esc(L.title)}" placeholder="${esc(spark("list"))}">${sparkBtn("list", "#lT")}</div>
        <label>a line about it</label><input id="lN" maxlength="160" value="${esc(L.note || "")}" placeholder="who it's for, when to use it">
        <label>what's on it (one per line)</label><textarea id="lI" placeholder="Fairuz – Wahdon&#10;Cléo from 5 to 7&#10;Mornings in Jenin">${esc((L.items || []).join("\n"))}</textarea>
        ${fromStash.length ? `<div class="lpick"><small>or add from your stash:</small>${fromStash.slice(0, 30).map(s => `<button type="button" data-lpick="${esc(s.t + (s.by ? " – " + s.by : ""))}">${(KINDS[s.k] || KINDS.idea)[0]} ${esc(s.t)}</button>`).join("")}</div>` : ""}
        <button class="bact">${editing !== null ? "save changes" : "make the list"}</button></form>`;
      b.querySelectorAll("[data-lt]").forEach(x => x.onclick = () => { L.type = x.dataset.lt; if (editing === null) Object.assign(L, {title: $("#lT").value, note: $("#lN").value, items: $("#lI").value.split("\n")}); paint(); });
      b.querySelectorAll("[data-lpick]").forEach(x => x.onclick = () => { $("#lI").value = ($("#lI").value.trim() ? $("#lI").value.trim() + "\n" : "") + x.dataset.lpick; });
      $("#lF").onsubmit = e => { e.preventDefault(); const nl = {type: L.type, title: $("#lT").value.trim() || $("#lT").placeholder, note: $("#lN").value.trim(), items: $("#lI").value.split("\n").map(s => s.trim()).filter(Boolean).slice(0, 50), ts: Date.now()};
        if (editing !== null) XS.lists[editing] = Object.assign(XS.lists[editing], nl); else XS.lists.unshift(nl); editing = null; xsave(); award(5); tab = "mine"; paint(); }; }
  }
  async function publish(){ await xready; const mine = XS.lists.filter(L => L.pub).map(L => ({type: L.type, title: L.title, note: L.note, items: L.items, by: (me.nick || "a ghost").slice(0, 30), ts: L.ts}));
    if (XDB && XUID) { try { await XDB.doc("lists/" + XUID).set({items: mine.slice(0, 20), ts: Date.now()}); return true; } catch(_) {} } return false; }
  $("#lists").addEventListener("click", async e => {
    if (e.target.closest("[data-lsclose]") || e.target.id === "lists") { $("#lists").classList.remove("open"); return; }
    const t = e.target.closest("[data-ls]"); if (t) { tab = t.dataset.ls; if (tab === "new") editing = null; paint(); return; }
    const d = e.target.closest("[data-ldel]"); if (d) { XS.lists.splice(+d.dataset.ldel, 1); xsave(); publish(); paint(); return; }
    const ed = e.target.closest("[data-ledit]"); if (ed) { editing = +ed.dataset.ledit; tab = "new"; paint(); return; }
    const cp = e.target.closest("[data-lcopy]"); if (cp) { const L = XS.lists[+cp.dataset.lcopy]; try { await navigator.clipboard.writeText(`${L.title}\n${L.note || ""}\n\n${L.items.map((x, i) => `${i + 1}. ${x}`).join("\n")}\n\n— made on the ghost of msn`); toast("copied. paste it anywhere."); } catch(_) { toast("couldn't copy here."); } return; }
    const pb = e.target.closest("[data-lpub]"); if (pb) { const L = XS.lists[+pb.dataset.lpub]; L.pub = !L.pub; xsave(); const ok = await publish(); if (L.pub && !ok) toast("shared lists need the page's claude.ai link, signed in. it's saved here for now."); paint(); return; }
    const sv = e.target.closest("[data-lsave]"); if (sv) { const L = shared[+sv.dataset.lsave]; XS.lists.unshift({type: L.type, title: L.title, note: `saved from ${L.by}`, items: L.items, ts: Date.now()}); xsave(); toast("saved to your lists"); return; }
    const sp = e.target.closest("[data-lsp]"); if (sp) { window.spPlaylist(XS.lists[+sp.dataset.lsp]); return; }
  });
  window.openLists = () => { closeOverlays(); paint(); $("#lists").classList.add("open"); };
  /* explore links: letterboxd for films, storygraph for books */
  const _ex14 = explore; explore = function(s){ let h = _ex14(s); const q = encodeURIComponent(`${s.t}`.trim()); if (s.k === "watch") h += `<a href="https://letterboxd.com/search/${q}/" target="_blank" rel="noopener">letterboxd ↗</a>`; if (s.k === "read") h += `<a href="https://app.thestorygraph.com/browse?search_term=${q}" target="_blank" rel="noopener">storygraph ↗</a>`; return h; };
})();

/* ---------- spotify, through your own claude.ai connector ---------- */
(function(){
  let MCP = null, schemas = {};
  try { window.claude && window.claude.use && window.claude.use("mcp").then(m => { MCP = m; }).catch(() => {}); } catch(_) {}
  const SERVER = "Spotify";
  async function schemaArg(tool, prefer){ if (!MCP || !MCP.describeTool) return prefer[0]; if (!schemas[tool]) { try { schemas[tool] = await MCP.describeTool(SERVER, tool); } catch(_) { schemas[tool] = null; } } const sch = schemas[tool], props = sch && (sch.inputSchema || sch.input_schema || sch.parameters || {}).properties; if (!props) return prefer[0]; return prefer.find(p => p in props) || Object.keys(props)[0]; }
  async function call(tool, input){ if (!MCP) throw {code: "no_mcp"}; const r = await MCP.callTool(SERVER, tool, input); return r && (r.payload !== undefined ? r.payload : r); }
  const why = e => e && e.code === "no_mcp" ? "connect Spotify to your claude.ai account (Settings → Connectors), then open this page from its claude.ai link." : "Spotify didn't answer. it may need you to connect it in claude.ai first.";
  const flat = p => { if (!p) return []; if (typeof p === "string") { try { p = JSON.parse(p); } catch(_) { return [{name: p}]; } } const arr = Array.isArray(p) ? p : (p.tracks && (p.tracks.items || p.tracks)) || p.items || p.results || (p.content && p.content.map(c => { try { return JSON.parse(c.text); } catch(_) { return {name: c.text}; } }).flat()) || [p]; return (Array.isArray(arr) ? arr : [arr]).flat().slice(0, 8); };
  const trackLine = t => { const n = t.name || t.title || t.track || "", a = (t.artists && t.artists.map ? t.artists.map(x => x.name || x).join(", ") : t.artist) || "", u = (t.external_urls && t.external_urls.spotify) || t.url || t.link || (t.uri && t.uri.startsWith("spotify:track:") ? "https://open.spotify.com/track/" + t.uri.split(":").pop() : ""); return {n, a, u, uri: t.uri || (t.id ? "spotify:track:" + t.id : "")}; };
  window.spSearch = async (q, box) => { box.innerHTML = "searching your spotify…"; try { const k = await schemaArg("search", ["query", "q", "search_query", "term"]); const res = flat(await call("search", {[k]: q})).map(trackLine).filter(t => t.n);
      box.innerHTML = res.length ? res.map((t, i) => `<div class="sprow"><span>♫ <b>${esc(t.n)}</b> ${esc(t.a)}</span>${t.u ? `<a href="${esc(t.u)}" target="_blank" rel="noopener">play in spotify ↗</a>` : ""}${t.uri ? `<button class="linkbtn" data-spadd="${esc(t.uri)}">♡ save</button>` : ""}</div>`).join("") : "nothing found on your spotify."; }
    catch(e) { box.textContent = why(e); } };
  document.addEventListener("click", async e => { const a = e.target.closest("[data-spadd]"); if (!a) return; e.preventDefault(); try { const k = await schemaArg("add_to_library", ["uris", "ids", "track_ids", "items"]); await call("add_to_library", {[k]: /ids$/.test(k) && !/uris/.test(k) ? [a.dataset.spadd.split(":").pop()] : [a.dataset.spadd]}); a.textContent = "saved ✓"; } catch(err) { toast(why(err)); } });
  window.spNowPlaying = async () => { try { const p = await call("get_currently_playing", {}); const t = trackLine(flat(p)[0] || p || {}); if (!t.n) { toast("nothing playing on your spotify right now."); return null; } const line = `♫ ${t.n}${t.a ? " – " + t.a : ""}`; $("#mypm").textContent = line; me.pm = line; xsave && xsave(); toast(`now showing: ${esc(line)}`); window.roomNP && window.roomNP(line); return line; } catch(e) { toast(why(e)); return null; } };
  window.spPlaylist = async L => { try { toast("building your spotify playlist…"); const k = await schemaArg("search", ["query", "q", "search_query", "term"]); const uris = []; for (const it of L.items.slice(0, 30)) { try { const t = trackLine(flat(await call("search", {[k]: it}))[0] || {}); if (t.uri) uris.push(t.uri); } catch(_) {} }
      const nk = await schemaArg("create_playlist", ["name", "title"]), tk = await schemaArg("create_playlist", ["uris", "track_uris", "tracks", "track_ids"]); const input = {[nk]: L.title}; if (tk && tk !== nk) input[tk] = /ids/.test(tk) ? uris.map(u => u.split(":").pop()) : uris; const r = await call("create_playlist", input);
      toast(`made "${esc(L.title)}" on your spotify with ${uris.length} songs ✓`); return r; } catch(e) { toast(why(e)); } };
  /* hooks: crates + meaning cards + msn "what i'm listening to" */
  const pmb = document.querySelector("#mypm"); if (pmb) pmb.insertAdjacentHTML("afterend", `<button type="button" class="sparkb mini" id="npbtn" title="show what you're playing on spotify">♫</button>`);
  $("#npbtn") && ($("#npbtn").onclick = e => { e.stopPropagation(); window.spNowPlaying(); });
})();

/* ---------- ghost demos: every record makes a sound, right here (an imagined sketch, not the record) ---------- */
const DEMO = (function(){
  let ctx = null, stopAt = 0, nodes = [];
  const MOOD = {"Habibi": "arab", Fairuz: "arab", Ziad: "arab", Sharhabil: "afro", Omar: "dabke", Hiroshi: "ambient", Midori: "ambient", Pizzicato: "shibuya", Arthur: "ambient", Alice: "ambient", Various: "desert", Mdou: "desert", Ryuichi: "synth", Natacha: "arab", Rachid: "rai", Khaled: "rai", Nancy: "pop", "Björk": "synth", Massive: "trip", Boards: "trip", Cocteau: "ambient", Broadcast: "shibuya", Stereolab: "shibuya", Air: "synth", Sade: "trip", Fela: "afro", Gil: "afro", Nina: "trip", Ahmed: "synth"};
  const SC = {arab: [0, 1, 4, 5, 7, 8, 10], dabke: [0, 1, 4, 5, 7, 8, 10], rai: [0, 1, 4, 5, 7, 8, 10], desert: [0, 3, 5, 7, 10], afro: [0, 3, 5, 7, 10], ambient: [0, 2, 4, 7, 9], synth: [0, 2, 3, 7, 8], shibuya: [0, 2, 4, 5, 7, 9, 11], trip: [0, 3, 5, 7, 8, 10], pop: [0, 2, 4, 7, 9]};
  const BPM = {arab: 92, dabke: 132, rai: 110, desert: 104, afro: 112, ambient: 60, synth: 96, shibuya: 118, trip: 78, pop: 100};
  function note(t, f, d, type, vol, dest){ const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g).connect(dest); o.start(t); o.stop(t + d + .05); nodes.push(o); }
  function hat(t, dest, vol = .05){ const b = ctx.createBuffer(1, 2205, 44100), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length); const s = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 6000; s.buffer = b; g.gain.value = vol; s.connect(f).connect(g).connect(dest); s.start(t); nodes.push(s); }
  function play(artist, seed){
    stop(); ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === "suspended") ctx.resume();
    const mood = MOOD[Object.keys(MOOD).find(k => artist.includes(k))] || "ambient", sc = SC[mood], bpm = BPM[mood], beat = 60 / bpm, t0 = ctx.currentTime + .05, root = 196 * Math.pow(2, (seed % 5) / 12);
    const out = ctx.createGain(); out.gain.value = .9; const dl = ctx.createDelay(); dl.delayTime.value = beat * .75; const fb = ctx.createGain(); fb.gain.value = .32; out.connect(ctx.destination); out.connect(dl); dl.connect(fb).connect(dl); dl.connect(ctx.destination);
    let r = seed; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    const motif = Array.from({length: 8}, () => sc[rnd() * sc.length | 0] + (rnd() < .25 ? 12 : 0));
    const bars = Math.floor(20 / (beat * 4));
    for (let b = 0; b < bars; b++) for (let s = 0; s < 8; s++) { const t = t0 + (b * 8 + s) * beat / 2, fq = n => root * Math.pow(2, n / 12);
      if (mood === "ambient") { if (s === 0) [0, 4, 7].forEach((n, i) => note(t, fq(sc[(b + i * 2) % sc.length]) / (i ? 1 : 2), beat * 4, "sine", .05, out)); if (rnd() < .3) note(t, fq(motif[s] + 12), beat * 2, "triangle", .04, out); continue; }
      if (s % 2 === 0 || mood === "dabke") note(t, fq(motif[(s + b) % 8]) * (mood === "shibuya" ? 2 : 1), beat * (mood === "trip" ? 1.2 : .45), mood === "synth" || mood === "dabke" ? "square" : mood === "rai" || mood === "arab" ? "sawtooth" : "triangle", mood === "dabke" ? .035 : .045, out);
      if (s % 4 === 0) note(t, fq(sc[b % sc.length]) / 4, beat * 1.6, "sine", .12, out);
      if (mood !== "ambient" && (s % 2 === 1 || mood === "dabke")) hat(t, out, mood === "trip" ? .03 : .05);
      if (s === 0 || (mood === "dabke" && s === 3) || (mood === "afro" && s === 5)) note(t, 60, .25, "sine", .3, out);
    }
    stopAt = t0 + bars * beat * 4; return mood;
  }
  function stop(){ nodes.forEach(n => { try { n.stop(); } catch(_) {} }); nodes = []; }
  return {play, stop, playing: () => ctx && ctx.currentTime < stopAt};
})();
(function(){
  /* crates: a ▶ on every sleeve; meaning cards for music get a demo deck + spotify search */
  const _om14 = openMeaning; openMeaning = function(it, fs){ _om14(it, fs); if (it.k !== "listen") return; const tx = document.querySelector("#mwrap .mtxt"); if (!tx) return;
    tx.insertAdjacentHTML("beforeend", `<div class="mdeck"><b>listen here</b><button class="bact" id="mdemo">▶ play a ghost demo</button><small>a 20-second sketch GoMsn makes in your browser, in the record's mood. it's not the record.</small><button class="bact" id="mspot">♫ find it on my spotify</button><div id="mspres"></div></div>`);
    $("#mdemo").onclick = () => { if (DEMO.playing()) { DEMO.stop(); $("#mdemo").textContent = "▶ play a ghost demo"; return; } const mood = DEMO.play(it.by || it.t, (it.t || "").length * 7 + (it.y || 0)); $("#mdemo").textContent = `■ stop (${mood} sketch)`; setTimeout(() => { if ($("#mdemo")) $("#mdemo").textContent = "▶ play a ghost demo"; }, 20500); };
    $("#mspot").onclick = () => window.spSearch(`${it.t} ${it.by || ""}`.trim(), $("#mspres")); };
  const _mclose = () => DEMO.stop(); $("#mean").addEventListener("click", e => { if (e.target.closest("[data-mclose]") || e.target.id === "mean") _mclose(); });
})();

/* ---------- real presence: the people who have the page open right now ---------- */
(function(){
  let ROOM = null, peers = [];
  try { window.claude && window.claude.use && window.claude.use("room").then(r => { ROOM = r; if (!r) return; r.presence({nick: (me.nick || "a ghost").slice(0, 30), st: me.st || "on", pm: ($("#mypm").textContent || "").slice(0, 80)}); r.onPeers(p => { peers = p || []; const n = $("#hudOnline span"); if (n) n.dataset.real = peers.length; if ($("#online").classList.contains("open")) window.openOnlineReal(); }); }).catch(() => {}); } catch(_) {}
  window.roomNP = line => { if (ROOM) ROOM.presence({nick: (me.nick || "a ghost").slice(0, 30), st: me.st || "on", pm: line}); };
  setInterval(() => { if (ROOM) ROOM.presence({nick: (me.nick || "a ghost").slice(0, 30), st: me.st || "on", pm: ($("#mypm").textContent || "").slice(0, 80)}); }, 20000);
  const _oo = openOnline;
  window.openOnlineReal = () => { _oo(); const real = peers.map(p => { const s = p.state || p.presence || p.data || p; return {n: s.nick || p.name || "a ghost", pm: s.pm || "", you: p.self || p.isSelf || p.you}; });
    $("#onlist").insertAdjacentHTML("afterbegin", `<div class="onhead">here right now · real people (${real.length})</div>${real.length ? real.map(r => `<div class="onrow real"><span class="onav live">●</span><div><b>${esc(r.n)}${r.you ? " (you)" : ""}</b><small>${esc(r.pm)}</small></div><i class="plumb"></i></div>`).join("") : `<div class="onrow"><div><small>live presence shows on the page's claude.ai link, signed in.</small></div></div>`}<div class="onhead">the ghosts</div>`); };
  openOnline = window.openOnlineReal; $("#hudOnline").onclick = window.openOnlineReal;
})();

/* ---------- new places on the map, the start card and the room ---------- */
(function(){
  const P = {astro: () => window.openAstro(), lists: () => window.openLists(), custom: () => window.openCustom(), abyss: () => window.openAbyss()};
  const _gp14 = goPlace; goPlace = function(k){ if (P[k]) { if (Q.open) leaveQuilt(); document.body.classList.remove("inroom"); P[k](); return; } return _gp14(k); };
  const _gfr14 = goFromRoom; goFromRoom = function(k, e){ if (P[k]) { document.body.classList.remove("inroom"); P[k](); return; } return _gfr14(k, e); };
  try { VERT.forEach(v => { if (v.id === "explore") v.p.push(["abyss", "🕳", "the abyss", "a 3D museum of things that left and things that never existed"], ["astro", "♒", "the astrology corner", "your sign, a blunt daily reading, ghosts who share your sun"]); if (v.id === "collect") v.p.push(["lists", "📼", "lists", "playlists, watchlists, booklists, shared"]); if (v.id === "share") v.p.push(["custom", "🎛", "customise", "wallpaper, colours, text size, your accounts"]); }); } catch(_) {}
  $("#hud .hudbtns").insertAdjacentHTML("beforeend", `<button id="hudAstro" title="astrology corner">♒</button><button id="hudLists" title="your lists">📼 lists</button>`);
  $("#hudAstro").onclick = () => window.openAstro(); $("#hudLists").onclick = () => window.openLists();
  const sc = $("#startcard"); if (sc) sc.querySelector("small").insertAdjacentHTML("beforebegin", `<button data-go="abyss">🕳 fall into the abyss (museum)</button><button data-go="astro">♒ the astrology corner</button>`);
})();
