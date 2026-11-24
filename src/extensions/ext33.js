/* =================== EXTENSION 33: create your ghost (the avatar is a ghost now) =================== */
(function(){
  const OPT = {
    sheet: [["#f6f2ea", "classic white"], ["#ffd6e8", "blush"], ["#cfe8ff", "baby blue"], ["#e2d6ff", "lilac"], ["#fff1b8", "butter"], ["#bfe9cf", "mint"], ["#1c1a20", "black"], ["#c9ccd4", "chrome"], ["#c8903c", "leopard"], ["#efede6", "zebra"], ["#f2a5c8", "pink leopard"]],
    eyes: [["aviators", "aviators"], ["cateye", "cat-eye"], ["round", "round"], ["heart", "hearts"], ["dots", "just eyes"], ["none", "nothing"]],
    lens: [["#2a1030", "plum"], ["#111111", "black"], ["#c8141e", "red"], ["#1d9be6", "blue"], ["#ffb800", "amber"], ["#ff4fa3", "pink"]],
    boots: [["leopard", "leopard"], ["zebra", "zebra"], ["pinkleo", "pink leopard"], ["cherry", "cherry patent"], ["white", "white go-go"], ["black", "black"], ["silver", "silver"], ["none", "barefoot"]],
    lift: [["peek", "just peeking"], ["calf", "mid-calf"], ["knee", "showing off"]],
    bg: [["gta", "GTA poster"], ["studio", "studio"], ["none", "no background"]],
    sky: [["#ff3d8e", "pink"], ["#7a3dff", "violet"], ["#1638b8", "cobalt"], ["#c8141e", "red"], ["#2f9e6a", "green"], ["#111111", "night"]]
  };
  const LAB = {sheet: "the sheet", eyes: "eyewear", lens: "lens colour", boots: "boots", lift: "how much you show", bg: "backdrop", sky: "backdrop colour"};
  const DEF = {sheet: "#f6f2ea", eyes: "aviators", lens: "#2a1030", boots: "leopard", lift: "peek", bg: "gta", sky: "#ff3d8e"};
  let G = Object.assign({}, DEF, XS.myGhost || {});
  const sw = (k, v, l) => (k === "sheet" || k === "lens" || k === "sky") ? `<button class="gm33sw ${G[k] === v ? "on" : ""}" data-gk="${k}" data-gv="${v}" title="${esc(l)}" style="--c:${v}" data-an="${["#c8903c", "#efede6", "#f2a5c8"].includes(v) ? v.slice(1) : ""}"></button>` : `<button class="gm33ch ${G[k] === v ? "on" : ""}" data-gk="${k}" data-gv="${v}">${esc(l)}</button>`;
  document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="gmake33"><div class="gm33wrap">
    <div class="l30head"><div><small>your avatar</small><h2>create your ghost</h2></div><button class="bx" data-gm33x>×</button></div>
    <div class="gm33grid"><div class="gm33prev"><img id="gm33img" alt="your ghost"><div class="gm33btns"><button class="xp big" data-gm33use>✓ make this me</button><button class="xp" data-gm33rand>✦ surprise me</button><button class="xp" data-gm33dl>⬇ save the picture</button></div><p class="gm33note" id="gm33note"></p></div>
    <div class="gm33opts" id="gm33opts"></div></div></div></div>`);
  const O = $("#gmake33");
  const paintOpts = () => { $("#gm33opts").innerHTML = Object.keys(OPT).filter(k => !(k === "lens" && (G.eyes === "none" || G.eyes === "dots")) && !(k === "sky" && G.bg === "none")).map(k => `<div class="gm33row"><b>${LAB[k]}</b><div>${OPT[k].map(([v, l]) => sw(k, v, l)).join("")}</div></div>`).join(""); };
  let tm = 0;
  const render = () => { clearTimeout(tm); tm = setTimeout(() => { try { $("#gm33img").src = R3D.ghostMake(G, 420); } catch(e) { $("#gm33note").textContent = "this browser couldn't draw the ghost."; } }, 30); };
  const open = () => { closeOverlays(); document.querySelectorAll(".win:not(.hidden)").forEach(w => { if (w.id === "closet") w.classList.add("hidden"); }); paintOpts(); render(); O.classList.add("open"); $("#gm33note").textContent = XS.myGhost ? "this is you right now." : "this becomes your picture everywhere: messenger, group chats, the guestbook."; };
  window.openGhostMaker = open;
  O.addEventListener("click", e => { const t = e.target;
    if (t.closest("[data-gm33x]")) { O.classList.remove("open"); return; }
    const b = t.closest("[data-gk]"); if (b) { G[b.dataset.gk] = b.dataset.gv; paintOpts(); render(); return; }
    if (t.closest("[data-gm33rand]")) { Object.keys(OPT).forEach(k => { const a = OPT[k]; G[k] = a[Math.floor(Math.random() * a.length)][0]; }); if (Math.random() < .5) G.bg = "gta"; paintOpts(); render(); return; }
    if (t.closest("[data-gm33dl]")) { const a = document.createElement("a"); a.href = $("#gm33img").src; a.download = "my-ghost.png"; document.body.appendChild(a); a.click(); a.remove(); return; }
    if (t.closest("[data-gm33use]")) { XS.myGhost = Object.assign({}, G); try { XS.myGhostImg = R3D.ghostMake(Object.assign({}, G, {bg: G.bg === "none" ? "studio" : G.bg}), 200); } catch(_) {} XS.dpOff = false; xsave(); try { myDP(); } catch(_) {} $("#gm33note").textContent = "done. that's you now, everywhere."; try { toast("new ghost. everyone online noticed."); } catch(_) {} return; }
  });
  /* the ghost is your picture everywhere */
  const meImg = () => XS.myGhostImg ? `<img class="gm33me" src="${XS.myGhostImg}" alt="you">` : null;
  const _dp = myDP; myDP = function(){ _dp(); const im = meImg(); if (!im || XS.dpOff) return; const av = document.querySelector("#cl .me .av"); if (av) { av.innerHTML = im; av.title = "your ghost. click to change."; } const m = $("#chatMeDP"); if (m) m.innerHTML = im; };
  try { myDP(); } catch(_) {}
  document.addEventListener("click", e => { const av = e.target.closest("#cl .me .av"); if (av && XS.myGhostImg) { e.stopPropagation(); open(); } }, true);
  /* the closet and the avatar booth both open the ghost maker now */
  try { const _ot = openThing; openThing = function(k){ if (k === "closet" || k === "booth") return open(); return _ot(k); }; } catch(_) {}
  try { const _gp = goPlace; goPlace = function(k){ if (k === "closet" || k === "booth") { document.body.classList.remove("inroom"); return open(); } return _gp(k); }; } catch(_) {}
  try { VERT.forEach(v => v.p.forEach(p => { if (p[0] === "closet") { p[2] = "create your ghost"; p[3] = "sheet, eyewear, boots. it becomes your picture"; } })); VERT.forEach(v => { v.p = v.p.filter(p => p[0] !== "booth"); }); } catch(_) {}
  document.querySelectorAll('#dkmore [data-go="closet"]').forEach(b => b.textContent = "👻 create your ghost");
  if (XS.myPhoto === undefined && XS.myGhostImg) XS.myPhoto = XS.myGhostImg;
})();
