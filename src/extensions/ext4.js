
/* =================== EXTENSION 4: pixel dollz closet, niche lab (generator, hybrids, worlds, facts) =================== */

/* ---------- pixel dollz: the closet, rebuilt ---------- */
const DW = 40, DH = 84;
const SKINS = ["#ffe3d3", "#f6c7a8", "#e0a77c", "#b97a4d", "#7f4d2f", "#4e2e1c", "#ffd1ec", "#cfe9ff"];
const HAIRC = ["#1d1420", "#5a3a2a", "#c99a3a", "#f6ecc9", "#ff6fa8", "#7fe7ff", "#b98ad8", "#e2362f"];
const EYEC = ["#5a3a2a", "#2c6fd8", "#3a9a5a", "#8a4fd8", "#2a1630"];
const LIPC = ["#e2366f", "#c8102e", "#b5604f", "#9b59b6", "#ff9ec2", "#5a2a3a"];
const DOS = [["long", "long & sleek"], ["bob", "platinum bob"], ["buns", "space buns"], ["pigtails", "pigtails"], ["curls", "big curls"], ["spikes", "spiky"], ["buzz", "buzz cut"]];
SKIN.splice(0, SKIN.length, ...SKINS);
Object.assign(CL, {
  hair: [["none", "—", 0], ["clips", "butterfly clips", 0], ["bandana", "bandana", 0], ["tiara", "rhinestone tiara", 80], ["cap", "trucker cap", 30], ["scarf", "silk headscarf", 0]],
  top: [["tee", "baby tee", 0], ["tube", "tube top", 0], ["halter", "halter top", 0], ["band", "band tee", 0], ["mesh", "mesh long-sleeve", 30], ["velour", "velour zip-up", 40], ["tunic", "embroidered tunic", 0], ["corset", "lace corset top", 90]],
  bottom: [["flares", "low-rise flares", 0], ["baggy", "baggy jeans", 0], ["cargo", "cargo pants", 0], ["plaid", "plaid punk pants", 40], ["mini", "pleated mini", 20], ["velpants", "velour pants", 40], ["maxi", "maxi skirt", 0]],
  outer: [["none", "—", 0], ["denim", "denim jacket", 0], ["track", "track jacket", 20], ["puffer", "cropped puffer", 50], ["shrug", "faux-fur shrug", 60], ["abaya", "rhinestone-cuff abaya", 70]],
  bag: [["none", "—", 0], ["baguette", "mini shoulder bag", 0], ["pearl", "pearl-strap mini", 50], ["tote", "tote with charms", 30], ["halfmoon", "half-moon bag", 100]],
  acc: [["none", "—", 0], ["hoops", "big hoops", 0], ["chains", "wallet chain", 20], ["choker", "choker", 0], ["shades", "tinted shades", 40], ["flip", "flip phone lanyard", 0], ["mp3", "mp3 + earbuds", 20], ["headphones", "big headphones", 30]],
  shoes: [["sneak", "platform sneakers", 0], ["skate", "skate shoes", 0], ["boots", "fluffy boots", 40], ["kitten", "kitten heels", 30], ["jelly", "jelly sandals", 0]]
});
function hexShade(h, k){ const n = parseInt(h.slice(1), 16), f = v => Math.max(0, Math.min(255, Math.round(k < 1 ? v * k : v + (255 - v) * (k - 1)))); return "#" + [n >> 16 & 255, n >> 8 & 255, n & 255].map(f).map(v => v.toString(16).padStart(2, "0")).join(""); }
function dollz(f){
  const G = Array.from({length: DH}, () => Array(DW).fill(null));
  const P = (x, y, c) => { x |= 0; y |= 0; if (c && x >= 0 && x < DW && y >= 0 && y < DH) G[y][x] = c; };
  const R = (x, y, w, h, c) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) P(x + i, y + j, c); };
  const M = (x, y, w, h, c) => { R(x, y, w, h, c); R(DW - x - w, y, w, h, c); };
  const E = (cx, cy, rx, ry, c, ymax = 999) => { for (let y = Math.floor(cy - ry); y <= cy + ry && y <= ymax; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const dx = (x + .5 - cx) / rx, dy = (y + .5 - cy) / ry; if (dx * dx + dy * dy <= 1) P(x, y, c); } };
  const it = k => (f[k] || ["none"])[0], col = k => PAL[(f[k] || [, 0])[1]] || PAL[0];
  const boxy = f.base === "skater", sk = SKINS[f.skin | 0] || SKINS[1], skd = hexShade(sk, .82);
  const H = HAIRC[f.hc | 0] || HAIRC[0], Hd = hexShade(H, .7), Hl = hexShade(H, 1.35), ec = EYEC[f.ec | 0] || EYEC[0], lip = LIPC[f.lc | 0] || LIPC[0], dark = "#2a1630";
  const torso = (y0, y1, c, rows) => { for (let y = y0; y <= y1; y++) { const w = boxy ? (y < 46 ? 16 : 14) : (y < 32 ? 14 : y < 37 ? 12 : y < 41 ? 10 : y < 45 ? 12 : 14); R(20 - w / 2, y, w, 1, rows ? rows(y) || c : c); } };
  const arms = c => { if (boxy) { M(10, 31, 2, 9, c); M(9, 40, 2, 10, c); } else { M(11, 31, 2, 8, c); M(10, 39, 2, 10, c); } };
  const legs = (c, wide = 0) => { if (boxy || wide) M(14 - wide, 49, 5 + wide, 28, c); else { M(14, 49, 5, 12, c); M(15, 61, 4, 16, c); } };
  /* hair, back layer */
  const d = f.do || "long", scarf = it("hair") === "scarf";
  if (scarf) E(20, 16, 12.5, 13.5, col("hair"));
  else if (d === "long") { E(20, 16, 12, 12, H); R(8, 16, 24, 30, H); R(9, 46, 22, 2, H); R(10, 20, 2, 26, Hd); R(28, 20, 2, 26, Hd); }
  else if (d === "bob") { E(20, 17, 12, 12, H); R(8, 17, 24, 11, H); R(8, 27, 24, 1, Hd); }
  else if (d === "buns") { E(20, 16, 11, 11, H); E(10.5, 6.5, 4.5, 4.5, H); E(29.5, 6.5, 4.5, 4.5, H); P(9, 5, Hl); P(28, 5, Hl); }
  else if (d === "pigtails") { E(20, 16, 11, 11, H); M(5, 14, 4, 24, H); M(6, 38, 2, 3, H); M(6, 14, 1, 20, Hl); M(8, 15, 2, 2, col("hair") === PAL[0] ? "#ff4fa3" : col("hair")); }
  else if (d === "curls") { for (let a = 0; a < 14; a++) { const t = a / 14 * Math.PI * 2; E(20 + Math.cos(t) * 11, 17 + Math.sin(t) * 12, 4.2, 4.2, a % 3 ? H : Hd); } E(20, 17, 11, 12, H); }
  else if (d === "spikes") { E(20, 14, 11, 9, H); for (let i = 0; i < 6; i++) { const x = 11 + i * 3.6; R(x, 3 + (i % 2) * 2, 2, 5, H); P(x, 2 + (i % 2) * 2, H); } }
  else if (d === "buzz") { E(20, 15, 10.4, 10.4, H, 16); }
  /* body */
  legs(sk); arms(sk); torso(30, 48, sk);
  M(boxy ? 14 : 14, 76, 5, 2, sk);
  /* bottoms */
  const b = it("bottom"), B = col("bottom"), Bd = hexShade(B, .72), Bl = hexShade(B, 1.3);
  if (b === "flares") { R(13, 45, 14, 4, B); R(13, 44, 14, 1, Bd); legs(B); M(13, 70, 6, 7, B); M(15, 50, 1, 20, Bl); }
  else if (b === "baggy") { R(12, 45, 16, 4, B); legs(B, 1); M(13, 70, 7, 7, B); R(12, 45, 16, 1, dark); M(14, 52, 1, 22, Bl); }
  else if (b === "cargo") { R(13, 45, 14, 4, B); legs(B, 1); M(13, 57, 2, 4, Bd); M(13, 57, 2, 1, dark); }
  else if (b === "plaid") { R(13, 45, 14, 4, B); legs(B, boxy ? 0 : 0); for (let y = 45; y < 77; y++) for (let x = 12; x < 28; x++) if (G[y][x] === B && (x % 4 === 0 || y % 4 === 0)) P(x, y, (x % 4 === 0 && y % 4 === 0) ? "#c8102e" : Bd); R(13, 45, 14, 1, dark); M(15, 46, 1, 1, "#c0c0c8"); }
  else if (b === "mini") { R(13, 45, 14, 6, B); R(12, 51, 16, 2, B); for (let x = 13; x < 28; x += 3) R(x, 46, 1, 7, Bd); }
  else if (b === "velpants") { R(13, 45, 14, 4, B); legs(B); M(14, 49, 1, 27, Bl); }
  else if (b === "maxi") { for (let y = 45; y < 78; y++) { const w = Math.round(14 + (y - 45) / 33 * 10); R(20 - w / 2, y, w, 1, (y % 5 === 0) ? Bd : B); } }
  /* shoes */
  const s = it("shoes"), C = col("shoes"), Cd = hexShade(C, .72);
  if (s === "sneak") { M(13, 76, 6, 3, C); M(13, 79, 6, 2, "#ffffff"); M(14, 81, 6, 1, "#d9d9e3"); M(15, 76, 2, 1, "#fff"); }
  else if (s === "skate") { M(13, 76, 7, 3, C); M(13, 79, 7, 2, "#ffffff"); M(15, 77, 3, 1, "#fff"); }
  else if (s === "boots") { M(14, 64, 5, 13, C); M(13, 64, 7, 2, "#f6ecc9"); M(14, 77, 6, 2, Cd); }
  else if (s === "kitten") { M(14, 77, 5, 2, C); M(18, 79, 1, 2, Cd); M(13, 78, 1, 1, C); }
  else if (s === "jelly") { M(14, 77, 5, 2, hexShade(C, 1.3)); M(14, 76, 1, 1, C); M(17, 76, 1, 1, C); }
  /* tops */
  const t = it("top"), T = col("top"), Td = hexShade(T, .72), Tl = hexShade(T, 1.3);
  if (t === "tee") { torso(30, 40, T); boxy ? M(10, 31, 2, 5, T) : M(11, 31, 2, 4, T); P(20, 35, Tl); P(19, 35, Tl); P(19, 36, Tl); }
  else if (t === "tube") { torso(33, 39, T); R(14, 33, 12, 1, Tl); }
  else if (t === "halter") { for (let y = 31; y <= 41; y++) { const w = Math.min(y < 37 ? 12 : 10, 2 + (y - 31) * 2); R(20 - w / 2, y, w, 1, T); } M(17, 28, 1, 3, Td); }
  else if (t === "band") { torso(30, 46, T); boxy ? M(10, 31, 2, 6, T) : M(11, 31, 2, 5, T); [[21, 33], [20, 34], [19, 35], [20, 35], [21, 35], [20, 36], [19, 37]].forEach(([x, y]) => P(x, y, "#ffd700")); }
  else if (t === "mesh") { torso(30, 46, null, y => null); for (let y = 30; y <= 46; y++) for (let x = 8; x < 32; x++) if (G[y][x] === sk && (x + y) % 2 === 0) P(x, y, T); for (let y = 31; y <= 50; y++) for (let x = 8; x < 32; x++) if (G[y][x] === sk && (x + y) % 2 === 0) P(x, y, T); }
  else if (t === "velour") { torso(30, 48, T); arms(T); R(20, 30, 1, 18, Tl); M(14, 28, 3, 2, Td); }
  else if (t === "tunic") { torso(30, 50, T); R(13, 51, 14, 2, T); arms(T); M(17, 30, 3, 1, "#ffd98a"); R(13, 52, 14, 1, "#ffd98a"); }
  else if (t === "corset") { torso(33, 46, T); for (let y = 34; y < 46; y += 2) { P(19, y, Tl); P(20, y + 1, Tl); } R(14, 33, 12, 1, "#ffffff"); }
  /* outer */
  const o = it("outer"), O = col("outer"), Od = hexShade(O, .72), Ol = hexShade(O, 1.3);
  if (o === "denim") { M(13, 30, 4, 18, O); arms(O); M(15, 29, 2, 2, Od); M(14, 36, 2, 2, Od); }
  else if (o === "track") { M(13, 30, 4, 18, O); arms(O); boxy ? M(10, 31, 1, 19, "#fff") : M(11, 31, 1, 18, "#fff"); }
  else if (o === "puffer") { R(11, 30, 18, 11, O); for (let y = 32; y < 41; y += 3) R(11, y, 18, 1, Od); M(8, 31, 4, 13, O); R(19, 30, 2, 11, Ol); }
  else if (o === "shrug") { R(12, 30, 16, 3, O); M(10, 31, 3, 6, O); for (let x = 10; x < 30; x += 2) P(x, 33, Ol); }
  else if (o === "abaya") { M(11, 30, 5, 48, O); arms(O); M(11, 30, 1, 48, "#ffd98a"); M(9, 47, 3, 2, "#ffd98a"); }
  /* head + face */
  R(18, 26, 4, 4, skd); E(20, 17, 9.5, 10.5, sk);
  if (boxy) {
    M(13, 13, 5, 1, Hd);
    M(13, 16, 5, 3, "#ffffff"); M(14, 16, 3, 3, ec); M(15, 17, 1, 1, dark); M(14, 16, 1, 1, "#ffffff"); M(13, 15, 5, 1, dark);
    P(20, 21, skd); M(18, 24, 2, 1, hexShade(lip, .8));
  } else {
    M(13, 12, 4, 1, Hd);
    M(13, 15, 5, 4, "#ffffff"); M(14, 15, 3, 4, ec); M(15, 16, 1, 2, dark); M(14, 15, 1, 1, "#ffffff"); M(12, 14, 6, 1, dark); M(11, 13, 1, 1, dark); M(12, 19, 1, 1, dark);
    P(20, 21, skd); M(12, 20, 2, 1, "#ff9ec2");
    M(18, 23, 2, 1, hexShade(lip, .78)); M(17, 24, 3, 1, lip); P(18, 24, "#ffd6e7");
  }
  /* hair, front layer */
  if (scarf) { const S2 = col("hair"); R(11, 5, 18, 4, S2); M(10, 8, 2, 18, S2); R(12, 27, 16, 3, S2); P(20, 29, hexShade(S2, .7)); }
  else if (["long", "bob", "buns", "pigtails", "curls"].includes(d)) { E(20, 8.5, 10.2, 4.6, H); M(10, 11, 2, d === "bob" ? 14 : 12, H); R(14, 6, 5, 1, Hl); if (d === "long") R(12, 11, 6, 2, H); if (d === "bob") R(10, 11, 7, 2, H); }
  else if (d === "spikes") { R(14, 6, 4, 1, Hl); }
  else if (d === "buzz") { R(15, 7, 6, 1, Hl); }
  /* hair accessories */
  const ha = it("hair"), A = col("hair");
  const bf = (x, y, c) => { P(x - 1, y, c); P(x + 1, y, c); P(x - 1, y + 1, c); P(x + 1, y + 1, c); P(x, y, dark); P(x, y + 1, dark); };
  if (ha === "clips") { bf(13, 7, A); bf(19, 4, hexShade(A, 1.3)); bf(26, 6, A); }
  else if (ha === "bandana") { R(11, 6, 18, 3, A); for (let x = 12; x < 28; x += 3) P(x, 7, "#ffffff"); R(28, 7, 3, 2, A); P(31, 9, A); P(30, 10, A); }
  else if (ha === "tiara") { [[14, 4], [17, 2], [20, 1], [23, 2], [26, 4]].forEach(([x, y]) => R(x, y, 1, 6 - y, "#e9e9f2")); R(14, 5, 13, 1, "#e9e9f2"); P(20, 2, "#e2366f"); }
  else if (ha === "cap") { E(20, 8, 10.4, 5.6, A, 9); R(15, 3, 8, 4, "#ffffff"); R(18, 9, 15, 2, hexShade(A, .72)); }
  /* accessories */
  const a = it("acc"), X = col("acc");
  if (a === "hoops") { [[9, 20], [30, 20]].forEach(([x, y]) => { P(x, y, X); P(x - 1, y + 1, X); P(x + 1, y + 1, X); P(x - 1, y + 2, X); P(x + 1, y + 2, X); P(x, y + 3, X); }); }
  else if (a === "chains") { [[13, 47], [14, 49], [15, 50], [16, 51], [17, 51], [18, 50]].forEach(([x, y]) => P(x, y, "#c0c0c8")); R(17, 28, 6, 1, "#c0c0c8"); }
  else if (a === "choker") { R(17, 28, 6, 1, X); P(20, 29, "#ffd700"); }
  else if (a === "shades") { R(12, 14, 16, 4, X); R(12, 14, 16, 1, dark); P(14, 15, "#ffffff"); P(24, 15, "#ffffff"); }
  else if (a === "flip") { R(20, 29, 1, 11, X); R(19, 39, 3, 5, "#c0c0c8"); P(20, 40, "#7fd8ff"); }
  else if (a === "mp3") { R(10, 21, 1, 14, "#ffffff"); R(29, 21, 1, 12, "#ffffff"); R(26, 40, 3, 4, "#ffffff"); P(27, 41, "#7fd8ff"); }
  else if (a === "headphones") { for (let x = 11; x < 30; x++) { const y = Math.round(9 - Math.sin((x - 11) / 18 * Math.PI) * 6); P(x, y, dark); } M(8, 14, 3, 7, X); }
  /* bag */
  const g = it("bag"), Bg = col("bag"), Bgd = hexShade(Bg, .72);
  if (g === "baguette") { [[26, 31], [27, 33], [27, 35], [28, 37], [28, 39], [29, 41]].forEach(([x, y]) => R(x, y, 1, 2, Bgd)); R(28, 42, 8, 4, Bg); R(28, 42, 8, 1, Bgd); P(32, 43, "#ffd700"); }
  else if (g === "pearl") { [[26, 31], [27, 34], [27, 37], [28, 40]].forEach(([x, y]) => P(x, y, "#ffffff")); R(27, 43, 7, 4, Bg); R(27, 43, 7, 1, Bgd); }
  else if (g === "tote") { R(30, 47, 8, 8, Bg); R(31, 44, 1, 3, Bgd); R(36, 44, 1, 3, Bgd); R(32, 44, 4, 1, Bgd); P(30, 56, "#ff4fa3"); P(31, 57, "#7fe7ff"); P(33, 56, "#ffd700"); }
  else if (g === "halfmoon") { E(31, 44, 5, 4, Bg); R(26, 40, 11, 4, null); for (let y = 40; y < 44; y++) for (let x = 26; x < 37; x++) if (G[y][x] === Bg) G[y][x] = null; R(27, 44, 9, 1, Bgd); }
  /* outline: the dollz look */
  const out = G.map(r => r.slice());
  for (let y = 0; y < DH; y++) for (let x = 0; x < DW; x++) if (!G[y][x] && ((G[y - 1] || [])[x] || (G[y + 1] || [])[x] || G[y][x - 1] || G[y][x + 1])) out[y][x] = dark;
  let svg = `<svg viewBox="-2 -2 ${DW + 4} ${DH + 4}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;
  for (let y = 0; y < DH; y++) { let x = 0; while (x < DW) { const c = out[y][x]; if (!c) { x++; continue; } let w = 1; while (x + w < DW && out[y][x + w] === c) w++; svg += `<rect x="${x}" y="${y}" width="${w}" height="1" fill="${c}"/>`; x += w; } }
  return svg + "</svg>";
}
FIT.base = FIT.base || "doll"; FIT.do = FIT.do || "long"; FIT.ec = FIT.ec | 0; FIT.lc = FIT.lc | 0;
if (FIT.skin > SKINS.length - 1) FIT.skin = 1;
Object.keys(CL).forEach(k => { if (FIT[k] && !CL[k].some(i => i[0] === FIT[k][0])) FIT[k] = [CL[k][0][0], FIT[k][1] | 0]; });
dollSVG = dollz;
const sw = (arr, key, sel) => arr.map((c, i) => `<span class="sw ${sel === i ? "on" : ""}" style="background:${c}" data-${key}="${i}"></span>`).join("");
const _rc4 = renderCloset;
renderCloset = function(){
  _rc4();
  const head = `<div class="slot"><b>base</b>${[["doll", "doll"], ["skater", "skater"]].map(([k, n]) => `<span class="it ${FIT.base === k ? "on" : ""}" data-base="${k}">${n}</span>`).join("")}
    <b style="margin-top:6px">skin</b>${sw(SKINS, "skin", FIT.skin | 0)}
    <b style="margin-top:6px">hairstyle</b>${DOS.map(([k, n]) => `<span class="it ${FIT.do === k ? "on" : ""}" data-do="${k}">${n}</span>`).join("")}
    <b style="margin-top:6px">hair colour</b>${sw(HAIRC, "hc", FIT.hc | 0)}
    <b style="margin-top:6px">eyes</b>${sw(EYEC, "ec", FIT.ec | 0)}<b style="margin-top:6px">lips</b>${sw(LIPC, "lc", FIT.lc | 0)}</div>`;
  $("#racks").innerHTML = $("#racks").innerHTML.replace(/^\s*<div class="slot">[\s\S]*?<\/div>/, head);
};
$("#racks").addEventListener("click", e => {
  const t = e.target.closest("[data-base],[data-do],[data-ec],[data-lc]"); if (!t) return;
  if (t.dataset.base) FIT.base = t.dataset.base; if (t.dataset.do) FIT.do = t.dataset.do;
  if (t.dataset.ec) FIT.ec = +t.dataset.ec; if (t.dataset.lc) FIT.lc = +t.dataset.lc;
  XS.fit = FIT; xsave(); renderCloset(); tone([[880,.04],[1175,.06]], "square", .03);
});
const _cr = $("#cRand").onclick;
$("#cRand").onclick = () => { FIT.base = pick(["doll", "doll", "skater"]); FIT.do = pick(DOS)[0]; FIT.ec = Math.random() * EYEC.length | 0; FIT.lc = Math.random() * LIPC.length | 0; FIT.skin = Math.random() * SKINS.length | 0; _cr(); FIT.hc = Math.random() * HAIRC.length | 0; XS.fit = FIT; xsave(); renderCloset(); };
const ct = document.querySelector("#closet .tb .t"); if (ct) ct.textContent = "♡ Dollz Closet: make your doll ♡";

/* ---------- the niche lab ---------- */
const NFACTS = [
 ["the first webcam watched a coffee pot.", "in 1991, people at Cambridge University's Trojan Room pointed a camera at the shared coffee pot so nobody walked down for an empty one. it went on the web in 1993.", "internet"],
 ["the Nokia ringtone is a 1902 guitar piece.", "it comes from “Gran Vals” by the Spanish guitarist Francisco Tárrega.", "music"],
 ["the Windows XP hill is a real place.", "“Bliss” is a photo by Charles O'Rear, taken in Sonoma County, California, in 1996.", "tech"],
 ["Brian Eno composed the Windows 95 startup sound.", "a few seconds long, made from many tiny pieces of music.", "music"],
 ["the first emoji are in MoMA.", "Shigetaka Kurita designed 176 of them for Japanese phones in 1999. MoMA added them to its collection in 2016.", "design"],
 ["Clippy's real name was Clippit.", "the paperclip assistant lived in Microsoft Office from 1997 to the mid-2000s.", "tech"],
 ["the first thing sold on eBay was a broken laser pointer.", "in 1995, when the site was still called AuctionWeb. the buyer collected broken laser pointers.", "internet"],
 ["the first text message said “Merry Christmas”.", "sent by Neil Papworth from a computer to a phone in December 1992.", "tech"],
 ["Solitaire was partly there to teach the mouse.", "dragging cards around trained people to drag and drop.", "tech"],
 ["“Lorem ipsum” is a scrambled Cicero.", "the placeholder text comes from his De finibus, written in 45 BC.", "design"],
 ["Snake came to Nokia phones in 1997.", "programmed by Taneli Armanto for the Nokia 6110.", "games"],
 ["Space Invaders got faster by accident.", "as aliens died, the machine had fewer sprites to draw, so the rest sped up. the difficulty curve was a hardware limit.", "games"],
 ["the Konami Code first appeared in Gradius.", "↑↑↓↓←→←→BA was added by a developer who found the game too hard to test.", "games"],
 ["Arabizi exists because early keyboards had no Arabic letters.", "so 3 became ع and 7 became ح, and a whole generation learned to text in numbers.", "language"],
 ["the first website is still online.", "info.cern.ch, from 1991, has been restored so you can still visit it.", "internet"],
 ["the lava lamp was invented in 1963.", "by Edward Craven Walker, a British accountant, after seeing a homemade egg-timer in a pub.", "objects"],
 ["Pantone's first colour of the year was Cerulean.", "chosen for the year 2000: a calm sky blue for the new millennium.", "design"],
 ["Tamagotchi roughly means “egg watch”.", "tamago (egg) plus uotchi (watch). launched in 1996.", "objects"],
 ["FRUiTS magazine documented Harajuku for 20 years.", "Shoichi Aoki started the street-snap magazine in 1997. the print edition ended in 2017.", "fashion"],
 ["the Walkman arrived in 1979.", "music became something you carried alone, through a city, with your own soundtrack.", "objects"],
 ["Hotmail launched on the Fourth of July, 1996.", "the date was a joke about independence from your internet provider's email.", "internet"],
 ["the flying toasters were a 90s screensaver icon.", "from the After Dark screensaver pack: chrome toasters with wings, crossing your monitor at night.", "tech"],
 ["MySpace gave everyone the same first friend.", "Tom, one of its founders, was automatically in everyone's friends list.", "internet"],
 ["the “dancing baby” was one of the first viral animations.", "a 3D render from 1996 that spread by email before social media existed.", "internet"],
 ["the Space Jam website stayed almost unchanged for over 20 years.", "the 1996 site became an accidental museum of early web design.", "internet"],
 ["the demoscene is officially cultural heritage.", "starting with Finland in 2020, several countries added demoscene culture to their national inventories of intangible cultural heritage.", "tech"]
];
const STARTERS = ["what's an object you'd save from a fire, purely for the memory?", "which website do you miss like a person?", "what song was your first ringtone?", "what was your msn name, word for word?", "what's a niche you got into for exactly one summer?", "which tv channel raised you?", "what would your away message say tonight?", "what's the most niche thing you know a lot about?"];
const REEL = {
  when: ["1987 Tokyo", "1991 Manchester", "1994 Beirut", "1996 Cairo", "1998 Paris suburbs", "1999 Seoul", "2001 Dubai malls", "2003 São Paulo", "2004 Hamra cybercafé", "2006 Berlin", "late-90s Bristol", "1993 Detroit", "2000 Helsinki demoparty", "1995 London pirate radio", "1997 Harajuku Sundays", "2002 Casablanca rooftops"],
  what: ["mixtapes", "shareware games", "satellite dishes", "pirate radio", "flip phones", "zines", "webrings", "VHS rental shops", "ANSI art", "perfume samples", "disposable cameras", "club flyers", "fan forums", "tracker music", "screensavers", "cassette singles", "gel-pen notebooks", "bootleg DVDs", "pixel dolls", "LAN parties"],
  how: [["soft & melancholy", "dreamcore"], ["maximalist glitter", "glamcore"], ["DIY photocopy", "punk"], ["chrome & optimistic", "futurism"], ["goth but cosy", "goth"], ["nerdy & obsessive", "nerdcore"], ["hyper-local", "localism"], ["sunburnt & dreamy", "wave"], ["late-night & neon", "noir"], ["handmade & wabi-sabi", "craft"]]
};
const WORLDS = [
 {n: "Frutiger Aero", cat: "design", era: "c. 2004–2013", d: "glossy, aquatic, optimistic tech design: bubbles, grass, glass, blue skies, fish behind windows.", h: ["frutiger aero", "aqua user interface", "2000s desktop wallpapers"], gh: "lovelace", w: "clear"},
 {n: "Dollz", cat: "internet", era: "c. 1999–2006", d: "pixel-art dress-up dolls, made, swapped and customised on fan sites and forums.", h: ["dollz pixel dolls", "dollmaker pixel 2000s", "pixel art dress up"], gh: "vreeland", w: "fashion"},
 {n: "The Demoscene", cat: "tech", era: "1980s → now", d: "coders, pixel artists and musicians making real-time audiovisual demos, competing at parties, squeezing art into tiny files.", h: ["demoscene", "4k intro demo", "assembly demoparty"], gh: "lovelace", w: "clear"},
 {n: "ANSI & BBS art", cat: "tech", era: "late 80s–90s", d: "pictures made from coloured text characters for dial-up bulletin board systems.", h: ["ansi art bbs", "textmode art", "bbs documentary"], gh: "lovelace", w: "deadlinks"},
 {n: "Tracker music", cat: "tech", era: "late 80s–2000s", d: "songs built in pattern-based tracker programs and shared as tiny .MOD and .XM files.", h: ["tracker music mod", "keygen music", "fasttracker 2"], gh: "arussell", w: "odds"},
 {n: "Webrings & GeoCities", cat: "internet", era: "c. 1995–2009", d: "personal homepages linked in circles by theme. you travelled by “← prev | next →”. Neocities revived the spirit in 2013.", h: ["geocities archive", "webring", "neocities"], gh: "benjamin", w: "deadlinks"},
 {n: "Shibuya-kei", cat: "music", era: "1990s Tokyo", d: "a pop scene collaging bossa nova, French pop, lounge and samples, in record-shop neighbourhoods.", h: ["shibuya-kei", "pizzicato five", "flipper's guitar"], gh: "arussell", w: "odds"},
 {n: "Harajuku street style", cat: "fashion", era: "1990s–2000s", d: "Sunday kids in DIY layered looks, documented by street-snap magazines like FRUiTS.", h: ["fruits magazine harajuku", "decora fashion", "harajuku 1990s street style"], gh: "miyake", w: "fashion"},
 {n: "Arab synth & disco", cat: "music", era: "1970s–80s", d: "synth-heavy Arabic pop and disco from Beirut, Cairo and beyond, now reissued and crate-dug.", h: ["arabic disco 80s", "habibi funk", "arabic synth pop 1980s"], gh: "oumk", w: "odds"},
 {n: "Shaabi cassettes", cat: "music", era: "1970s–2000s Egypt", d: "street pop sold on cassettes at kiosks and played in microbuses, loud and everywhere.", h: ["egyptian shaabi cassette", "ahmed adaweya", "cairo cassette culture"], gh: "chahine", w: "odds"},
 {n: "Pirate radio & jungle", cat: "music", era: "1990s London", d: "tower-block stations broadcasting jungle and garage, with shout-outs and phone numbers on air.", h: ["pirate radio jungle 1990s", "rinse fm history", "jungle tape packs"], gh: "sunra", w: "odds"},
 {n: "Riot grrrl zines", cat: "fashion", era: "early 1990s", d: "photocopied punk feminist zines, mail-ordered and passed hand to hand.", h: ["riot grrrl zines", "photocopy zine 1990s", "bikini kill zine"], gh: "varda", w: "fashion"},
 {n: "Vaporwave", cat: "internet", era: "2010s", d: "music and art that slowed down 80s–90s muzak and corporate imagery into something dreamy and uneasy.", h: ["vaporwave", "floral shoppe", "mallsoft"], gh: "fisher", w: "clear"},
 {n: "Mall goth", cat: "fashion", era: "late 90s–2000s", d: "suburban goth: chains, platforms, wide trousers, black lipstick, and the food court.", h: ["mall goth 2000s", "tripp pants", "2000s goth fashion"], gh: "vampira", w: "fashion"},
 {n: "Satellite TV kids", cat: "region", era: "1990s–2000s", d: "growing up through dishes on Arab rooftops: music channels, dubbed cartoons, SMS tickers running under videos.", h: ["arab satellite tv 2000s", "sms ticker music channel", "spacetoon"], gh: "mernissi", w: "odds"},
 {n: "Cybercafé culture", cat: "region", era: "c. 1996–2010", d: "pay-by-the-hour rooms where a generation met the internet, played LAN games and fell for strangers.", h: ["internet cafe 2000s", "lan party counter strike 1.6", "cybercafe culture"], gh: "khaldun", w: "deadlinks"},
 {n: "Screensaver art", cat: "tech", era: "1990s", d: "flying toasters, 3D pipes, starfields and mazes: the accidental art of computers left alone.", h: ["after dark flying toasters", "windows 3d pipes screensaver", "90s screensavers"], gh: "warhol", w: "clear"},
 {n: "Old web design", cat: "internet", era: "c. 1995–2005", d: "spacer gifs, table layouts, hit counters, guestbooks, “best viewed in 800×600”.", h: ["spacer gif web design", "under construction gif", "1990s website design"], gh: "benjamin", w: "deadlinks"}
];
let NL = {spin: null, worldCat: "all", fact: Math.random() * NFACTS.length | 0};
XS.q.niche = XS.q.niche || 0; XS.q.hyb = XS.q.hyb || 0; XS.q.worldsSeen = XS.q.worldsSeen || [];
const yt = q => `https://www.youtube.com/results?search_query=${q1(q)}`, wk = q => `https://en.wikipedia.org/w/index.php?search=${q1(q)}`, pin = q => `https://www.pinterest.com/search/pins/?q=${q1(q)}`, arc = q => `https://archive.org/search?query=${q1(q)}`;
function matchGhost(txt){
  const t = txt.toLowerCase();
  if (/radio|mixtape|tracker|cassette|flyer|club/.test(t)) return pick(["arussell", "sunra", "oumk"]);
  if (/doll|perfume|zine|gel|fashion|harajuku/.test(t)) return pick(["vreeland", "schiap", "miyake"]);
  if (/vhs|dvd|camera|film/.test(t)) return pick(["marker", "varda", "chahine"]);
  if (/ansi|shareware|lan|screensaver|webring|forum|demo/.test(t)) return "lovelace";
  if (/satellite|beirut|cairo|casablanca|dubai/.test(t)) return pick(["mernissi", "said", "darwish"]);
  return pick(["boym", "benjamin", "fisher", "tanizaki"]);
}
function nicheName(a, b, c){ const place = a.replace(/^\S+\s/, "").replace(/ (malls|cybercafé|Sundays|suburbs|rooftops|demoparty|pirate radio)$/i, ""); return `${place} ${b.replace(/s$/, "")} ${c[1]}`; }
function openNiche(){
  closeOverlays(); document.querySelectorAll(".win:not(.hidden)").forEach(w => w.classList.add("hidden"));
  const el = $("#niche");
  el.innerHTML = `<div class="nl">
    <div class="nlhead"><div><div class="mono">THE GHOST OF MSN · NICHE LAB · EST. 2004</div><h1>find your <i>niche</i>.<br>then find the next one.</h1></div>
      <div class="nlme mono">${nicheMe()}</div></div>
    <section class="nlsec"><div class="lab mono">01 · THE NICHE GENERATOR</div><div class="slots"><div class="reel2" id="r0">a place, a year</div><div class="reel2" id="r1">a thing</div><div class="reel2" id="r2">a mood</div></div>
      <div class="row" style="margin-top:12px"><button class="nbtn big" id="spin">🎰 spin my niche</button><span class="mono muted2">lock a reel by clicking it</span></div><div id="spinOut"></div></section>
    <section class="nlsec"><div class="lab mono">02 · HYBRID YOUR NICHE</div><p class="nlp">fuse two worlds into one nobody has named yet. type anything, or pick from the worlds and your stash.</p>
      <div class="hyb"><input class="nin" id="hA" list="hlist" placeholder="world A · e.g. Shibuya-kei"><span class="x2">×</span><input class="nin" id="hB" list="hlist" placeholder="world B · e.g. satellite TV kids"><button class="nbtn" id="hGo">🧬 hybridise</button></div>
      <datalist id="hlist">${[...WORLDS.map(w => w.n), ...REEL.what, ...XS.stash.map(s => s.t)].map(x => `<option value="${esc(x)}">`).join("")}</datalist><div id="hOut"></div></section>
    <section class="nlsec"><div class="lab mono">03 · NICHE WORLDS</div><div class="chips2" id="wcats"></div><div class="wgrid" id="wgrid"></div></section>
    <section class="nlsec"><div class="lab mono">04 · BE THE MOST INTERESTING PERSON IN THE ROOM</div><div id="factBox"></div></section>
    <div class="nlfoot mono">every fact here is real. every niche here is yours. ← use the bar to go anywhere.</div></div>`;
  el.classList.add("open"); el.scrollTop = 0; markDock("niche");
  $("#spin").onclick = spin;
  ["r0", "r1", "r2"].forEach(id => $("#" + id).onclick = () => { $("#" + id).classList.toggle("lock"); tone([[440,.04]], "square", .02); });
  $("#hGo").onclick = hybrid;
  renderWorlds(); renderFact();
}
function nicheMe(){
  const cats = {}; XS.q.worldsSeen.forEach(n => { const w = WORLDS.find(x => x.n === n); if (w) cats[w.cat] = (cats[w.cat] || 0) + 1; });
  XS.stash.forEach(s => { const k = {read: "ideas", watch: "film", listen: "music", visit: "internet", object: "objects", idea: "ideas", person: "people"}[s.k]; if (k) cats[k] = (cats[k] || 0) + 1; });
  const top = Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 2).map(x => x[0]);
  return top.length ? `YOUR NICHE SO FAR:<br><b>${esc(top.join(" × "))}</b><br>${XS.stash.length} pocketed · ${XS.q.worldsSeen.length} worlds seen` : `YOUR NICHE SO FAR:<br><b>unknown (exciting)</b><br>spin, explore, pocket.`;
}
function spin(){
  const ids = ["r0", "r1", "r2"], pools = [REEL.when, REEL.what, REEL.how.map(h => h[0])];
  NL.spin = NL.spin || [REEL.when[0], REEL.what[0], REEL.how[0]];
  ids.forEach((id, i) => {
    const el = $("#" + id); if (el.classList.contains("lock")) return;
    el.classList.add("spinning"); let n = 0;
    const iv = setInterval(() => { el.textContent = pick(pools[i]); tone([[300 + Math.random() * 400, .02]], "square", .012); }, 70);
    setTimeout(() => { clearInterval(iv); el.classList.remove("spinning"); const v = i === 2 ? pick(REEL.how) : pick(pools[i]); NL.spin[i] = v; el.textContent = i === 2 ? v[0] : v; tone([[523 + i * 130, .08]], "triangle", .04); if (i === 2 || ids.slice(i + 1).every(x => $("#" + x).classList.contains("lock"))) setTimeout(showSpin, 150); }, 700 + i * 450);
  });
  if (ids.every(x => $("#" + x).classList.contains("lock"))) showSpin();
}
function showSpin(){
  const [a, b, c0] = NL.spin, c = Array.isArray(c0) ? c0 : REEL.how.find(h => h[0] === c0) || REEL.how[0];
  const name = nicheName(a, b, c), g = ALL[matchGhost(a + " " + b)] || ALL.ghost;
  XS.q.niche++; xsave(); questTick();
  $("#spinOut").innerHTML = `<div class="ncard"><div class="mono muted2">YOUR NICHE IS</div><h2>${esc(name)}</h2><div class="mono">${esc(a)} · ${esc(b)} · ${esc(c[0])}</div>
    <div class="ncols"><div><div class="lab2 mono">RABBIT HOLES</div><a href="${yt(b + " " + a)}" target="_blank" rel="noopener">▶ ${esc(b)} in ${esc(a)}</a><a href="${wk(b)}" target="_blank" rel="noopener">📖 the history of ${esc(b)}</a><a href="${pin(b + " " + c[0])}" target="_blank" rel="noopener">🖼 the look: ${esc(c[0])}</a><a href="${arc(b)}" target="_blank" rel="noopener">🗄 the archive</a></div>
      <div><div class="lab2 mono">YOUR GUIDE</div><button class="nbtn sm" data-open="chat:${g.id}">💬 talk to ${esc(g.n)}</button><div class="lab2 mono" style="margin-top:10px">TRY THIS</div><div class="nlp">${esc(pick(["find one object from this niche and pocket it.", "describe this niche in three emojis.", "write its away message.", "what would its club flyer say?", "who's the main character of this niche?"]))}</div></div></div>
    <div class="row" style="margin-top:10px">${colBtn({t: name, k: "idea", by: "", src: "the niche generator"}, "🎒 pocket this niche")}<button class="nbtn sm" id="dossier">✦ ask the ghost for a dossier</button><button class="nbtn sm" id="toHyb">🧬 hybridise it</button></div><div id="dosOut"></div></div>`;
  $("#dossier").onclick = () => dossier(`${name} (${a}, ${b}, ${c[0]})`, $("#dosOut"));
  $("#toHyb").onclick = () => { $("#hA").value = name; $("#hB").focus(); $("#hB").scrollIntoView({block: "center", behavior: "smooth"}); };
  wink("glitter");
}
function hybrid(){
  const A = $("#hA").value.trim(), B = $("#hB").value.trim(); if (!A || !B) { toast("pick two worlds to fuse 🧬"); return; }
  const wa = A.split(/\s+/), wb = B.split(/\s+/);
  const name = `${wa[0]} ${wb[wb.length - 1].replace(/s$/, "")}${pick(["core", "wave", " revival", " underground", " futurism"])}`;
  XS.q.hyb++; xsave(); questTick();
  $("#hOut").innerHTML = `<div class="ncard"><div class="mono muted2">HYBRID</div><h2>${esc(name)}</h2><div class="mono">${esc(A)} × ${esc(B)}</div>
    <ul class="nlp">${[`a club night where ${A} plays to a ${B} crowd. what's on the flyer?`, `an object that belongs to both worlds. draw it, then pocket it.`, `the ${B} version of something from ${A}: what changes, what stays?`, `who would be the icon of ${name}?`].map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <div class="row">${colBtn({t: name, k: "idea", by: "", src: `hybrid of ${A} × ${B}`}, "🎒 pocket the hybrid")}<a class="nbtn sm" href="${yt(A + " " + B)}" target="_blank" rel="noopener">▶ search both ↗</a><button class="nbtn sm" id="hDos">✦ dossier</button></div><div id="hDosOut"></div></div>`;
  $("#hDos").onclick = () => dossier(`a hybrid niche called "${name}", fusing ${A} and ${B}`, $("#hDosOut"));
  tone([[392,.08],[523,.08],[659,.08],[784,.16]], "triangle", .04);
}
async function dossier(what, out){
  out.innerHTML = `<div class="dos mono">the ghost is digging through the archive…</div>`;
  const S2 = await getSample();
  if (!S2) { out.innerHTML = `<div class="dos">the dossier only works on this page's claude.ai link, when you're signed in. meanwhile: follow the rabbit holes above.</div>`; return; }
  const prompt = `You are "the ghost" of The Ghost of MSN, a niche-culture research site. Write a short dossier for ${what}. Format exactly:\nWHAT IT IS: one sentence.\nLOOK FOR: 5 bullet points, each a REAL, well-known artist, album, film, object, magazine, website or scene connected to it (only things you're confident exist; no invented titles).\nASK YOURSELF: 2 short questions.\nAWAY MESSAGE: one line.\nKeep it lowercase, warm, specific. Never use the words immersive, journey, unforgettable, elevate, unlock, authentic.`;
  try {
    const el = document.createElement("div"); el.className = "dos"; out.innerHTML = ""; out.appendChild(el);
    const r = await S2([{role: "user", content: prompt}], {cache: false, onText: ({text}) => { el.textContent = text; }});
    el.textContent = r.text || el.textContent;
    out.insertAdjacentHTML("beforeend", `<div class="row" style="margin-top:6px">${colBtn({t: `dossier: ${what.slice(0, 80)}`, k: "idea", by: "", src: "a ghost dossier", note: (r.text || "").slice(0, 600)}, "🎒 pocket the dossier")}<span class="mono muted2">ai-written: double-check the references</span></div>`);
  } catch(e) { out.innerHTML = `<div class="dos">${e && e.code === "rate_limited" ? "the archive is busy. try again in a minute." : "the ghost couldn't reach the archive right now."}</div>`; }
}
function renderWorlds(){
  const cats = ["all", ...new Set(WORLDS.map(w => w.cat))];
  $("#wcats").innerHTML = cats.map(c => `<button class="chip3 ${NL.worldCat === c ? "on" : ""}" data-wc="${c}">${c}</button>`).join("");
  $("#wgrid").innerHTML = WORLDS.filter(w => NL.worldCat === "all" || w.cat === NL.worldCat).map((w, i) => `<div class="wcard"><div class="mono muted2">${esc(w.cat)} · ${esc(w.era)}</div><h3>${esc(w.n)}</h3><p>${esc(w.d)}</p>
    <div class="wlinks">${w.h.map(h => `<a href="${yt(h)}" target="_blank" rel="noopener" data-wseen="${esc(w.n)}">▶ ${esc(h)}</a>`).join("")}<a href="${wk(w.n)}" target="_blank" rel="noopener" data-wseen="${esc(w.n)}">📖 read about it</a></div>
    <div class="row">${ALL[w.gh] ? `<button class="nbtn sm" data-open="chat:${w.gh}">💬 ${esc(ALL[w.gh].n)}</button>` : ""}<button class="nbtn sm" data-open="gal:${w.w}">🖼 museum</button>${colBtn({t: w.n, k: "visit", by: "", y: w.era, src: "niche worlds"}, "🎒")}</div></div>`).join("");
}
function renderFact(){
  const [h, b, c] = NFACTS[NL.fact % NFACTS.length];
  $("#factBox").innerHTML = `<div class="fact"><div class="mono muted2">NICHE FACT #${(NL.fact % NFACTS.length) + 1} · ${esc(c)}</div><h2>${esc(h)}</h2><p>${esc(b)}</p>
    <div class="mono muted2" style="margin-top:12px">THEN ASK THE ROOM</div><p class="q2">“${esc(pick(STARTERS))}”</p>
    <div class="row">${colBtn({t: h, k: "idea", by: "", src: "niche facts", note: b}, "🎒 pocket the fact")}<button class="nbtn sm" id="nextFact">another one →</button><a class="nbtn sm" href="${wk(h.replace(/[.“”]/g, ""))}" target="_blank" rel="noopener">verify ↗</a></div></div>`;
  $("#nextFact").onclick = () => { NL.fact++; renderFact(); tone([[660,.05],[880,.06]], "sine", .03); };
}
$("#niche").addEventListener("click", e => {
  const c = e.target.closest("[data-wc]"); if (c) { NL.worldCat = c.dataset.wc; renderWorlds(); return; }
  const s = e.target.closest("[data-wseen]"); if (s && !XS.q.worldsSeen.includes(s.dataset.wseen)) { XS.q.worldsSeen.push(s.dataset.wseen); xsave(); questTick(); }
});
QUESTS.push(["🎰", "spin your niche", () => XS.q.niche ? 1 : 0, "niche"], ["🧬", "hybridise two niches", () => XS.q.hyb ? 1 : 0, "niche"], ["🌐", "open 3 niche worlds", () => Math.min(1, XS.q.worldsSeen.length / 3), "niche"]);
const _ot5 = openThing;
openThing = function(k){ if (k === "niche") return openNiche(); return _ot5(k); };
document.querySelector('#dock [data-go="room"]').insertAdjacentHTML("afterend", `<button class="dk" data-go="niche" title="Niche Lab"><span class="e">🧭</span><span class="l">niche</span></button>`);
const _gp5 = goPlace;
goPlace = function(k){ if (k === "niche") { $("#dkmore").classList.remove("open"); closeMenu(); if (Q.open) leaveQuilt(); document.body.classList.remove("inroom"); openNiche(); return; } _gp5(k); };
/* the ticker drops niche facts too */
AWAY.push(...NFACTS.slice(0, 12).map(f => "fact: " + f[0]));
GHOSTCHAT.m.splice(5, 0, {place: "niche", t: "🧭 the niche lab: find your niche, fuse two, collect facts"});
$("#lform").addEventListener("submit", () => setTimeout(() => toast("🧭 spin your niche in the Niche Lab", () => goPlace("niche")), 7000));
