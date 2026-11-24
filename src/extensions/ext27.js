/* =================== EXTENSION 27: every door is a whole wall, dressed to match the room behind it =================== */
(function(){
  /* curated pairings: wall + door + what glows through */
  const PAL = {
    teal:   {s: "alcove", wall: "#5fcdc4", wall2: "#3faea6", trim: "#eef2f3", door: "steel", acc: "#d9b06a", floor: "#cfcac0", beyond: "#ffd9a8"},
    concrete:{s: "pill", wall: "#aaa69e", wall2: "#8e8a83", trim: "#e2341c", door: "#e2341c", acc: "#c9a85a", floor: "#c4bfb5", beyond: "#eef0f2"},
    cream:  {s: "orb", wall: "#efe5c6", wall2: "#ddd0aa", trim: "#f8f2de", door: "#f3ead0", acc: "#e8781a", floor: "#8a4a2e", beyond: "#ffe6c0"},
    tang:   {s: "holes", wall: "#e8641c", wall2: "#c94c10", trim: "#f6efe2", door: "#ec6a1e", acc: "#e7e2d8", floor: "#7a2a10", beyond: "#1d3ad0"},
    lab:    {s: "portal", wall: "#cfd2d6", wall2: "#b6bac0", trim: "#7c868e", door: "glass", acc: "#3fd8ff", floor: "#a3a7ad", beyond: "#f2f8ff"},
    cobalt: {s: "pill", wall: "#1a3ad0", wall2: "#0f2a9e", trim: "#f4ede0", door: "#ff7a2a", acc: "#ffd23f", floor: "#0b1a6a", beyond: "#ffe2a8"},
    blush:  {s: "alcove", wall: "#f1a9c4", wall2: "#e28cb0", trim: "#f6f6f4", door: "steel", acc: "#c8141e", floor: "#b5121c", beyond: "#8fe0ff"},
    lodge:  {s: "orb", wall: "#8e0a14", wall2: "#6a0610", trim: "#e8dcc4", door: "#efe6cc", acc: "#e8781a", floor: "chevron", beyond: "#ffd9b0"},
    clay:   {s: "cave", wall: "#d8662a", wall2: "#b0461a", trim: "#d8662a", door: "none", acc: "#ffb070", floor: "#c8541e", beyond: "#1d2fd8"}
  };
  /* which room gets which wall: tuned to the colour of the room behind it */
  const ROOMP = {closet: "blush", dollz: "blush", hood: "blush", radio: "cobalt", arcade: "cobalt", tm: "lab", dash: "tang", feed: "tang", letters: "cream", journal: "cream", "chat:ghost": "teal", ghosts: "lodge", "chat:latenight": "lodge", quiet: "teal", niche: "clay", atlas: "lab", msn: "teal", bury: "concrete", wall: "concrete", quests: "cobalt", stars: "blush", lists: "cream", astro: "clay", make: "tang", studio: "blush", group: "lodge", online: "teal", crates: "clay"};
  const KEYS = Object.keys(PAL);
  const palFor = k => PAL[ROOMP[k] || ROOMP[String(k).split(":")[0]] || KEYS[[...String(k)].reduce((a, c) => a + c.charCodeAt(0), 0) % KEYS.length]];
  const doorFill = p => p.door === "steel" ? "linear-gradient(90deg,#959ca2,#eef1f3 22%,#c4cacf 50%,#f6f8f9 74%,#a4abb0)" : p.door === "glass" ? "linear-gradient(90deg,#6a7a88cc,#c6eefa99)" : p.door;
  window.buildDoorScene = function(k, P){
    const p = palFor(k), s = p.s; P.style.setProperty("--wall", p.wall); P.style.setProperty("--wall2", p.wall2); P.style.setProperty("--trim", p.trim); P.style.setProperty("--acc", p.acc); P.style.setProperty("--beyond", p.beyond); P.style.setProperty("--dfill", doorFill(p));
    P.style.setProperty("--floor", p.floor === "chevron" ? "repeating-linear-gradient(45deg,#141114 0 14px,#efe6d6 14px 28px)" : p.floor);
    const leaf = {
      alcove: `<i class="dwin"></i><i class="dwin b"></i><i class="dknob"></i><i class="dplate"></i><i class="dplate b"></i>`,
      pill: `<i class="dpill"></i><i class="dknob gold"></i>`,
      orb: `<i class="dorb"></i><i class="dneedle"></i><i class="dball"></i><i class="dball s"></i><i class="dknob"></i>`,
      holes: [[50,12],[34,28],[54,42],[68,58],[38,64],[52,80]].map(([x, y]) => `<i class="dhole" style="left:${x}%;top:${y}%"></i>`).join("") + `<i class="dknob"></i>`,
      portal: ``, cave: ``
    }[s];
    const sides = {
      alcove: `<i class="sx hood"><b></b></i><i class="sx post l"></i><i class="sx post r"></i><i class="sx port l"></i><i class="sx port r"></i>${[0,1,2,3].map(i => `<i class="sx dot l" style="top:${24 + i * 8}%;margin-left:${i % 2 * 14}px"></i><i class="sx dot r" style="top:${24 + i * 8}%;margin-right:${i % 2 * 14}px"></i>`).join("")}<i class="sx mat"></i>`,
      pill: `<i class="sx column"></i><i class="sx beams"></i><i class="sx lamp"></i>`,
      orb: `<i class="sx eave"></i><i class="sx taper l"></i><i class="sx taper r"></i><i class="sx strut l"></i><i class="sx strut r"></i><i class="sx step"></i>`,
      holes: `${[0,1,2].map(i => `<i class="sx oval l" style="top:${16 + i * 22}%"></i><i class="sx oval r" style="top:${16 + i * 22}%"></i>`).join("")}<i class="sx band"></i>`,
      portal: `<i class="sx ring"></i><i class="sx glow"></i><i class="sx pad"></i><i class="sx seams"></i>`,
      cave: `<i class="sx blob a"></i><i class="sx blob b"></i><i class="sx sconce"></i><i class="sx curtain l"></i><i class="sx curtain r"></i><i class="sx spk"></i>`
    }[s];
    const sc = P.querySelector(".pscene") || (P.insertAdjacentHTML("afterbegin", `<div class="pscene"></div>`), P.querySelector(".pscene"));
    sc.className = "pscene st-" + s;
    sc.innerHTML = `<div class="pwall"></div><div class="pfloor"></div><div class="pass">${sides}<div class="pdoor"><div class="pbeyond"><i></i><i></i></div>${s === "portal" ? `<div class="pleaf l"></div><div class="pleaf r"></div>` : s === "cave" ? "" : `<div class="pleaf">${leaf}</div>`}</div></div>`;
  };
})();
