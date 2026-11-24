
/* =================== EXTENSION 8: the talking room (videodrome tv + objects that invite you), gomsn's own world, an inclusive closet =================== */
/* ---------- objects that talk ---------- */
Object.assign(OBLIQUE, {"profile:theghost": ["my life, in spines", "gomsn's world"], "chat:latenight": ["midnight movies", "late night"], "crates": ["side b", "the crates"]});
document.querySelectorAll("#room .hs").forEach(h => { const o = OBLIQUE[h.dataset.go]; if (o) { h.dataset.w = o[0]; h.setAttribute("aria-label", `${o[0]}: ${o[1]}`); } });
const INVITE = {
  "worlds": "step through. it's warmer on the other side.", "niche": "we've been glowing since 1970. pick a niche.", "gallery": "the rejected ones are the best ones.",
  "closet": "who are you tonight?", "tm": "it's 2:13. it's always 2:13.", "hood": "we're your top 8. no particular order.", "map": "you are here. allegedly.",
  "radio": "no ads. no algorithm. just us.", "crates": "flip me over. side b is better.", "arch": "burn me something.", "atlas": "read by my light.",
  "chat:ghost": "u up? :)", "arcade": "one game. then bed.", "letters": "i typed you something.", "dash": "27 exposures left. make one count.",
  "ghosts": "pluck a string. someone answers.", "profile:theghost": "my whole life, in spines.", "chat:latenight": "midnight movies. bring nobody."
};
document.body.insertAdjacentHTML("beforeend", `<div id="speech"></div>`);
let spT = null, spEl = null;
function speak(h, text, ms){
  const sp = $("#speech"); if (!h || !document.body.classList.contains("inroom")) return;
  const r = h.getBoundingClientRect(); clearInterval(spT); spEl = h;
  sp.textContent = ""; sp.classList.add("on");
  sp.style.left = Math.max(8, Math.min(innerWidth - 260, r.left + r.width / 2 - 20)) + "px";
  sp.style.top = Math.max(60, r.top - 34) + "px";
  let i = 0; spT = setInterval(() => { sp.textContent = text.slice(0, ++i); if (i % 3 === 0) tone([[620 + Math.random() * 200, .015]], "square", .008); if (i >= text.length) { clearInterval(spT); if (ms) setTimeout(() => { if (spEl === h) sp.classList.remove("on"); }, ms); } }, 34);
}
let hovering = null;
$("#room").addEventListener("pointerover", e => { const h = e.target.closest(".hs"); if (h && h !== hovering) { hovering = h; if (h.dataset.go !== "msn" && INVITE[h.dataset.go]) speak(h, INVITE[h.dataset.go]); } if (!h) { hovering = null; $("#speech").classList.remove("on"); } });
$("#room").addEventListener("pointerleave", () => { hovering = null; $("#speech").classList.remove("on"); });
setInterval(() => {
  if (!document.body.classList.contains("inroom") || hovering || document.hidden) return;
  const hs = [...document.querySelectorAll("#room .hs")].filter(h => h.dataset.go !== "msn" && INVITE[h.dataset.go]);
  const h = pick(hs); speak(h, INVITE[h.dataset.go], 2600);
}, 6500);
/* ---------- the tv has a face, and it wants you ---------- */
const TVL = ["come closer", "they're all online", "touch the screen", "don't be shy", "appear offline? cute.", "i was waiting for you", "click. i dare you.", "it's warmer in here"];
let tvI = 0, tvTalk = null;
function tvSay(){
  const t = $("#tvtext"), m = $("#tvmouth"); if (!t || !m || !document.body.classList.contains("inroom")) return;
  const line = TVL[tvI++ % TVL.length]; let i = 0; clearInterval(tvTalk);
  tvTalk = setInterval(() => { t.textContent = line.slice(0, ++i); m.setAttribute("ry", (1 + Math.random() * 4.5).toFixed(1)); if (i >= line.length) { clearInterval(tvTalk); m.setAttribute("ry", "1"); } }, 70);
}
setInterval(tvSay, 3600);
$("#room").addEventListener("pointermove", e => {
  const tv = $("#tvface"); if (!tv) return; const r = tv.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const dx = Math.max(-2, Math.min(2, (e.clientX - cx) / 200)), dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 300));
  $("#tvp1").setAttribute("cx", 1087 + dx); $("#tvp2").setAttribute("cx", 1117 + dx); $("#tvp1").setAttribute("cy", 572 + dy); $("#tvp2").setAttribute("cy", 572 + dy);
});
const _ot9 = openThing;
openThing = function(k){ if (k === "crates") { openRadio(); setTimeout(() => { const c = document.querySelector("#radioBody .crate"); if (c) c.scrollIntoView({block: "center"}); }, 60); return; } return _ot9(k); };

/* ---------- gomsn is a person, with a world ---------- */
const GP = PROF.theghost;
GP.handle = "GoMsn"; GP.tag = "the ghost of msn, as a person. dressed for no one.";
GP.about = "born in a chat window in 1999, raised by away messages. lives between beirut and paris in spirit, nowhere in particular in body. collects things that left. falls for objects, not people (mostly). insomniac by choice. replies at 2:13am.";
GP.meet = "people who still label their mixtapes by hand. anyone who can explain shibuya-kei without a wikipedia tab. the person who keeps their first msn password in a notebook.";
const OBS = {
  "on repeat": [["World of Echo (Arthur Russell)", 1986, "listen"], ["Turiya Sings (Alice Coltrane)", 1982, "listen"], ["Enta Omri (Oum Kalthoum)", 1964, "listen"], ["anything shibuya-kei, before noon", "1990s", "listen"]],
  "films that raised me": [["La Jetée (Chris Marker)", 1962, "watch"], ["Videodrome (David Cronenberg)", 1983, "watch"], ["Cléo from 5 to 7 (Agnès Varda)", 1962, "watch"], ["Alexandria… Why? (Youssef Chahine)", 1979, "watch"], ["In the Mood for Love (Wong Kar-wai)", 2000, "watch"]],
  "on the nightstand": [["In Praise of Shadows (Tanizaki)", 1933, "read"], ["The Future of Nostalgia (Svetlana Boym)", 2001, "read"], ["Ghosts of My Life (Mark Fisher)", 2014, "read"], ["Memory for Forgetfulness (Mahmoud Darwish)", 1986, "read"]],
  "objects i'd save from a fire": [["Akari light sculptures (Isamu Noguchi)", 1951, "object"], ["the Walkman", 1979, "object"], ["the Nokia 7280", 2004, "object"], ["a mixtape labelled 'for you, 2:13'", "—", "object"]],
  "wearing": [["Pleats Please (Issey Miyake)", 1993, "object"], ["a slip dress over jeans", "1990s", "object"], ["butterfly clips, ironically", "1999", "object"]],
  "places": [["Hamra Street, Beirut, after midnight", "—", "visit"], ["Shimokitazawa record shops, Tokyo", "—", "visit"], ["the Trojan Room coffee pot (Cambridge)", 1991, "visit"]]
};
const GHATES = "beige. the algorithm. the word “content”. read receipts. people who say “the y2k aesthetic” without having been there.";
const _op9 = openProfile;
openProfile = function(id){
  _op9(id); if (id !== "theghost") return;
  const col = document.querySelectorAll("#prof .pfgrid > div")[1]; if (!col) return;
  col.insertAdjacentHTML("afterbegin", `<div class="pbox"><h3>currently into</h3>${Object.entries(OBS).map(([k, v]) => `<div class="obs"><b>${esc(k)}</b><div>${v.map(([t, y, kind]) => colBtn({t, y, k: kind, by: "", src: "GoMsn's world"}, `${(KINDS[kind] || KINDS.idea)[0]} ${esc(t)}${y && y !== "—" ? ` · ${y}` : ""}`)).join("")}</div></div>`).join("")}<div class="obs"><b>allergic to</b><div style="font-style:italic">${esc(GHATES)}</div></div></div>`);
};
const _p9 = persona;
persona = function(c){
  let p = _p9(c);
  if (c.id === "ghost") p += `\nYou are also a person with a world, called GoMsn by friends. Your tastes (mention only when relevant, never list them all): Arthur Russell's World of Echo, Alice Coltrane, Oum Kalthoum's Enta Omri, shibuya-kei before noon; films La Jetée, Videodrome, Cléo from 5 to 7, Alexandria… Why?, In the Mood for Love; books In Praise of Shadows, The Future of Nostalgia, Ghosts of My Life, Memory for Forgetfulness; objects: Noguchi's Akari lamps, the Walkman, the Nokia 7280; places: Hamra after midnight, Shimokitazawa record shops. You dislike beige, the algorithm, the word "content" and read receipts. Speak second-degree: wry, referential, never explaining the joke.`;
  return p;
};

/* ---------- the closet, for every body ---------- */
const BODIES = [["slim", "slim"], ["soft", "soft"], ["straight", "straight"], ["broad", "broad"]];
const FH = [["none", "none"], ["stubble", "stubble"], ["moustache", "moustache"], ["beard", "beard"]];
const EXTRAS = [["glasses", "glasses"], ["freckles", "freckles"], ["vitiligo", "vitiligo"], ["aid", "hearing aid"], ["mole", "beauty mark"]];
const PRON = ["she/her", "he/him", "they/them", "she/they", "he/they", "any/all", "ask me"];
const PRESETS = {doll: {body: "slim", lash: true, fh: "none", lc: 0, do: "long", pr: "she/her"}, dude: {body: "broad", lash: false, fh: "stubble", lc: 6, do: "spikes", pr: "he/him"}, they: {body: "straight", lash: false, fh: "none", lc: 6, do: "bob", pr: "they/them"}, soft: {body: "soft", lash: true, fh: "none", lc: 1, do: "curls", pr: "she/they"}};
if (!LIPC.includes("#c98a7a")) LIPC.push("#c98a7a");
FIT.body = FIT.body || (FIT.base === "skater" ? "straight" : "slim"); FIT.fh = FIT.fh || "none"; FIT.ex = FIT.ex || []; FIT.pr = FIT.pr || "they/them"; if (FIT.lash === undefined) FIT.lash = FIT.body !== "broad" && FIT.body !== "straight";
const _dz = dollz;
dollz = function(f){
  /* draw with the base renderer, then reshape: the body, the face, the details */
  const body = f.body || (f.base === "skater" ? "straight" : "slim");
  const g2 = Object.assign({}, f, {base: (body === "straight" || body === "broad") ? "skater" : "doll"});
  let svg = _dz(g2);
  const add = [], P = (x, y, c) => add.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`), R2 = (x, y, w, h, c) => add.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`), M2 = (x, y, w, h, c) => { R2(x, y, w, h, c); R2(DW - x - w, y, w, h, c); };
  const sk = SKINS[f.skin | 0] || SKINS[1], H = HAIRC[f.hc | 0] || HAIRC[0], Hd = hexShade(H, .7), dark = "#2a1630";
  const top = (f.top || ["tee"])[0], T = PAL[(f.top || [, 0])[1]] || PAL[0];
  if (body === "soft") { const fill = ["velour", "tunic", "band", "mesh"].includes(top) ? T : sk; M2(11, 38, 2, 10, fill); M2(13, 44, 1, 6, ["tee", "tube", "halter", "corset"].includes(top) ? sk : T); M2(13, 50, 1, 10, (f.bottom || ["flares"])[0] === "maxi" || (f.bottom || ["flares"])[0] === "mini" ? PAL[(f.bottom || [, 0])[1]] : PAL[(f.bottom || [, 0])[1]]); M2(10, 31, 1, 7, ["velour", "tunic", "mesh"].includes(top) ? T : sk); }
  if (body === "broad") { M2(9, 30, 3, 3, ["velour", "tunic", "band", "mesh", "tee"].includes(top) ? T : sk); }
  if (f.lash === false && (body === "slim" || body === "soft")) { M2(11, 13, 1, 1, sk); M2(12, 14, 6, 1, sk); M2(12, 19, 1, 1, sk); M2(12, 20, 2, 1, sk); }
  const fh = f.fh || "none";
  if (fh === "stubble") for (let y = 21; y <= 26; y++) for (let x = 12; x <= 27; x++) { const dx = (x + .5 - 20) / 9.5, dy = (y + .5 - 17) / 10.5; if (dx * dx + dy * dy <= 1 && (x + y) % 2 === 0 && !(y >= 23 && y <= 24 && x >= 17 && x <= 22)) P(x, y, hexShade(H, .85)); }
  if (fh === "moustache") { M2(16, 22, 4, 1, Hd); }
  if (fh === "beard") for (let y = 20; y <= 28; y++) for (let x = 11; x <= 28; x++) { const dx = (x + .5 - 20) / 10, dy = (y + .5 - 18) / 11; if (dx * dx + dy * dy <= 1 && !(y >= 23 && y <= 24 && x >= 17 && x <= 22) && !(y < 22 && x > 13 && x < 26)) P(x, y, (x + y) % 3 ? H : Hd); }
  const ex = f.ex || [];
  if (ex.includes("freckles")) [[13, 21], [15, 22], [14, 20], [24, 22], [26, 21], [25, 20], [19, 21]].forEach(([x, y]) => P(x, y, hexShade(sk, .72)));
  if (ex.includes("vitiligo")) { const L = hexShade(sk, 1.55); [[22, 9, 3, 2], [23, 11, 2, 1], [11, 21, 2, 2], [26, 23, 2, 2]].forEach(([x, y, w, h]) => R2(x, y, w, h, L)); M2(10, 42, 2, 3, L); }
  if (ex.includes("mole")) P(24, 22, dark);
  if (ex.includes("glasses")) { [[12, 14], [22, 14]].forEach(([x, y]) => { R2(x, y, 7, 1, dark); R2(x, y + 5, 7, 1, dark); R2(x, y, 1, 6, dark); R2(x + 6, y, 1, 6, dark); }); R2(19, 16, 3, 1, dark); }
  if (ex.includes("aid")) { R2(9, 17, 1, 3, "#c9a882"); R2(8, 18, 1, 2, "#c9a882"); }
  return svg.replace("</svg>", add.join("") + "</svg>");
};
dollSVG = dollz;
const _rc9 = renderCloset;
renderCloset = function(){
  _rc9();
  const it = (k, v, sel, lab) => `<span class="itx ${sel ? "on" : ""}" data-${k}="${v}">${lab}</span>`;
  const extra = `<div class="slot"><b>start from</b>${Object.keys(PRESETS).map(k => it("preset", k, false, k)).join("")}
    <b style="margin-top:6px">body</b>${BODIES.map(([k, n]) => it("body", k, FIT.body === k, n)).join("")}
    <b style="margin-top:6px">lashes</b>${it("lash", "1", FIT.lash !== false, "on")}${it("lash", "0", FIT.lash === false, "off")}
    <b style="margin-top:6px">facial hair</b>${FH.map(([k, n]) => it("fh", k, FIT.fh === k, n)).join("")}
    <b style="margin-top:6px">details</b>${EXTRAS.map(([k, n]) => it("ex", k, (FIT.ex || []).includes(k), n)).join("")}
    <b style="margin-top:6px">pronouns</b>${PRON.map(p => it("pr", p, FIT.pr === p, p)).join("")}</div>`;
  $("#racks").innerHTML = $("#racks").innerHTML.replace(/<b>base<\/b>[\s\S]*?(?=<b style="margin-top:6px">skin<\/b>)/, "").replace(/^\s*<div class="slot">/, extra + `<div class="slot">`);
  const d = document.querySelector("#closet .doll"); if (d) { let pr = $("#dollpr"); if (!pr) { d.insertAdjacentHTML("beforeend", `<div id="dollpr"></div>`); pr = $("#dollpr"); } pr.textContent = FIT.pr; }
};
$("#racks").addEventListener("click", e => {
  const t = e.target.closest("[data-preset],[data-body],[data-lash],[data-fh],[data-ex],[data-pr]"); if (!t) return;
  const d = t.dataset;
  if (d.preset) Object.assign(FIT, PRESETS[d.preset]);
  if (d.body) FIT.body = d.body; if (d.lash) FIT.lash = d.lash === "1"; if (d.fh) FIT.fh = d.fh; if (d.pr) FIT.pr = d.pr;
  if (d.ex) { const a = new Set(FIT.ex || []); a.has(d.ex) ? a.delete(d.ex) : a.add(d.ex); FIT.ex = [...a]; }
  FIT.base = (FIT.body === "straight" || FIT.body === "broad") ? "skater" : "doll";
  XS.fit = FIT; xsave(); renderCloset(); tone([[880,.04],[1175,.06]], "square", .03);
});
const _cr9 = $("#cRand").onclick;
$("#cRand").onclick = () => { _cr9(); FIT.body = pick(BODIES)[0]; FIT.lash = Math.random() < .6; FIT.fh = Math.random() < .3 ? pick(FH)[0] : "none"; FIT.ex = EXTRAS.filter(() => Math.random() < .2).map(x => x[0]); FIT.pr = pick(PRON); XS.fit = FIT; xsave(); renderCloset(); };
