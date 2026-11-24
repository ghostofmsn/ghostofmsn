/* =================== EXTENSION 31: the pop ghost lifts her sheet (leopard boots), leopard + zebra in the closet =================== */
(function(){
  /* the ghost that pops in at sign-in: GTA poster, sheet lifted, leopard boots */
  try { Z12.ghostPop = R3D.ghostBoots(420, "leopard"); } catch(_) { Z12.ghostPop = null; }
  const popIt = () => { const el = document.querySelector("#lform .big.ghost"); if (el && Z12.ghostPop && !el.querySelector(".gpop")) el.innerHTML = `<img class="gpop" src="${Z12.ghostPop}" alt="the ghost, showing off her leopard boots">`; };
  popIt(); setTimeout(popIt, 400); setTimeout(popIt, 1800);
  window.GHOSTPOP = Z12.ghostPop;

  /* the closet: three prints join the colours */
  const SENT = {"#c8903c": "leopard", "#efede6": "zebra", "#f2a5c8": "pinkleo"};
  const start = PAL.length; PAL.push("#c8903c", "#efede6", "#f2a5c8");
  const px = (k, x, y) => { const h = (x * 73856093 ^ y * 19349663) >>> 0;
    if (k === "zebra") return ((x + Math.round(y * 1.6) + (h % 3 === 0 ? 1 : 0)) % 5 < 2) ? "#141014" : "#f4f1e8";
    const pink = k === "pinkleo", base = pink ? "#f6b3cf" : "#e0a94f", ring = pink ? "#2e0a20" : "#160c06", mid = pink ? "#d86e9e" : "#9a5420";
    const T = ["..XX....", ".XmmX...", "XmmmX..X", ".XmX....", "......X.", "X...XX..", "...XmmX.", "...XmX.."]; const ch = T[(y + (x >> 3) * 3) % 8][(x + (y >> 3) * 5) % 8]; return ch === "X" ? ring : ch === "m" ? mid : base; };
  const animalize = svg => typeof svg === "string" ? svg.replace(/<rect x="(\d+)" y="(\d+)" width="(\d+)" height="1" fill="(#c8903c|#efede6|#f2a5c8)"\/>/g, (m, x, y, w, c) => { let o = ""; for (let i = 0; i < +w; i++) o += `<rect x="${+x + i}" y="${y}" width="1" height="1" fill="${px(SENT[c], +x + i, +y)}"/>`; return o; }) : svg;
  const _ds = dollSVG; dollSVG = function(f){ return animalize(_ds(f)); };
  try { PRESETS["leopard & zebra"] = {top: ["tee", start + 1], bottom: ["mini", start], shoes: ["boots", start], outer: ["none", 0]}; } catch(_) {}
  const mk = k => { try { return R3D.animalCanvas(k, 64).toDataURL(); } catch(_) { return ""; } };
  const st = document.createElement("style");
  st.textContent = ["leopard", "zebra", "pinkleo"].map((k, j) => `.sw[data-i="${start + j}"]{background:url(${mk(k)}) center/28px!important}`).join("") + `.sw[data-i="${start}"]::after,.sw[data-i="${start + 1}"]::after,.sw[data-i="${start + 2}"]::after{content:"";}`;
  document.head.appendChild(st);
  try { if (document.querySelector("#closet") && !document.querySelector("#closet").classList.contains("hidden")) renderCloset(); } catch(_) {}
})();
