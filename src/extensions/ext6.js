
/* =================== EXTENSION 6: verticals, the map, worlds autoplay, the 8-bit room =================== */
const VERT = [
 {id: "explore", e: "🧭", n: "explore", tag: "go down rabbit holes", p: [["niche", "🧭", "Niche Lab", "find your niche, fuse two, steal true facts"], ["worlds", "🌀", "The Worlds", "fall through seven scenes. it plays itself"], ["gallery", "🖼", "The Museum", "phones, see-through tech, fashion, odds & ends"], ["tm", "🕰", "Time Machine", "drag the years, visit the web as it was"], ["atlas", "🛰", "Ghost Atlas", "a research bank with real sources"], ["arch", "📁", "Haunted Archive", "things that left, buried together"]]},
 {id: "talk", e: "💬", n: "talk", tag: "people, dead and alive", p: [["msn", "💬", "MSN", "your contact list. everyone's here"], ["ghosts", "👻", "The Ghosts", "25 voices: music, fashion, film, ideas"], ["hood", "👯", "The Neighbourhood", "profiles with whole worlds inside"], ["letters", "📮", "Letters", "the ghost writes to you"], ["forum", "☕", "Cybercafé", "forums, threads, opinions"]]},
 {id: "share", e: "✦", n: "share", tag: "post it, reblog it", p: [["dash", "✦", "The Dash", "the feed: photos, reblogs, candles"], ["wall", "⚡", "Wizz Wall", "say what's haunting you"], ["journal", "📓", "Journal", "a public diary"], ["bury", "⚰", "Bury something", "add a ghost to the archive"]]},
 {id: "collect", e: "🎒", n: "collect", tag: "pocket everything", p: [["stash", "🎒", "My Stash", "your research board + constellation"], ["quests", "📜", "Quests", "levels, and what's left to find"], ["rewards", "🏆", "Points & badges", "the leaderboard"], ["map", "🗺", "The Map", "everything, at a glance"]]},
 {id: "play", e: "🕹", n: "play", tag: "skip school", p: [["closet", "👗", "Dollz Closet", "make your pixel doll"], ["arcade", "🕹", "Arcade", "snake, memory, decoders"], ["quiz", "⭐", "Star Quiz", "which ghost are you?"], ["mess", "🗂", "2:13am desktop", "close the popups, find the artifacts"], ["radio", "📻", "Ghost FM", "a boombox that plays right here"]]}
];
const ALLP = VERT.flatMap(v => v.p.map(p => p[0]));
XS.vis = XS.vis || {};
const seen = k => { if (ALLP.includes(k) && !XS.vis[k]) { XS.vis[k] = 1; xsave(); paintVert(); } };
/* the bar becomes five verticals + room + map */
document.querySelectorAll("#dock .dk[data-go]").forEach(b => { if (b.dataset.go !== "room") b.classList.add("old"); });
$("#dkm").classList.add("old");
document.querySelector('#dock [data-go="room"]').insertAdjacentHTML("afterend", `<button class="dk" data-v="map" title="the map"><span class="e">🗺</span><span class="l">map</span></button>` + VERT.map(v => `<button class="dk vk" data-v="${v.id}" title="${v.tag}"><span class="e">${v.e}</span><span class="l">${v.n}</span><b class="vb"></b></button>`).join(""));
document.body.insertAdjacentHTML("beforeend", `<div id="vpanel"></div>`);
let vOpen = null;
function paintVert(){
  VERT.forEach(v => { const b = document.querySelector(`#dock [data-v="${v.id}"] .vb`); if (!b) return; const n = v.p.filter(p => !XS.vis[p[0]]).length; b.textContent = v.id === "collect" ? (XS.stash.length || "") : (n ? "✦" : ""); b.className = "vb" + (v.id === "collect" && XS.stash.length ? " num" : ""); });
}
function showV(id){
  const v = VERT.find(x => x.id === id), P = $("#vpanel");
  if (vOpen === id) { P.classList.remove("open"); vOpen = null; return; }
  vOpen = id; const b = document.querySelector(`#dock [data-v="${id}"]`).getBoundingClientRect();
  P.innerHTML = `<div class="vh"><b>${v.e} ${v.n}</b><span>${v.tag}</span></div>${v.p.map(([k, e, n, d]) => `<button class="vrow" data-go="${k}"><span class="ve">${e}</span><span><b>${n}</b>${XS.vis[k] ? "" : `<i class="new">✦ unexplored</i>`}<small>${d}</small></span></button>`).join("")}<button class="vrow vall" data-go="map"><span class="ve">🗺</span><span><b>see the whole map →</b></span></button>`;
  P.style.left = Math.max(6, Math.min(innerWidth - 330, b.left + b.width / 2 - 160)) + "px";
  P.classList.add("open"); tone([[784,.04],[988,.05]], "sine", .025);
}
$("#dock").addEventListener("click", e => { const b = e.target.closest("[data-v]"); if (!b) return; e.stopPropagation(); if (b.dataset.v === "map") { goPlace("map"); return; } showV(b.dataset.v); }, true);
$("#vpanel").addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (!b) return; $("#vpanel").classList.remove("open"); vOpen = null; goPlace(b.dataset.go); });
document.addEventListener("click", e => { if (!e.target.closest("#vpanel,#dock")) { $("#vpanel").classList.remove("open"); vOpen = null; } });
const _md = markDock;
markDock = function(k){ _md(k); document.querySelectorAll("#dock [data-v]").forEach(b => b.classList.toggle("on", b.dataset.v === k || (VERT.find(v => v.id === b.dataset.v) || {p: []}).p.some(p => p[0] === k))); };
/* the map: everything in one page */
function openMap(){
  closeOverlays(); document.querySelectorAll(".win:not(.hidden)").forEach(w => w.classList.add("hidden"));
  const done = ALLP.filter(k => XS.vis[k]).length;
  $("#mapov").innerHTML = `<div class="mp2"><div class="mono">THE GHOST OF MSN · THE MAP</div><h1>everything here,<br>in five <i>verticals</i>.</h1>
    <p class="mapsub mono">you've explored ${done}/${ALLP.length} places. ✦ = you haven't been yet. go.</p><div class="mbar"><i style="width:${done / ALLP.length * 100}%"></i></div>
    <div class="mgrid">${VERT.map(v => `<section class="mcol mc-${v.id}"><div class="mhead"><span>${v.e}</span><b>${v.n}</b><small>${v.tag}</small></div>${v.p.map(([k, e, n, d]) => `<button class="mrow ${XS.vis[k] ? "" : "nv"}" data-go="${k}"><span class="me">${e}</span><span><b>${n}</b><small>${d}</small></span>${XS.vis[k] ? "" : `<i>✦</i>`}</button>`).join("")}</section>`).join("")}</div>
    <p class="mono mapsub">tip: the room is the front door, and everything in it is a door too.</p></div>`;
  $("#mapov").classList.add("open"); $("#mapov").scrollTop = 0; markDock("map");
}
$("#mapov").addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) goPlace(b.dataset.go); });
const _ot7 = openThing;
openThing = function(k){
  seen(k);
  if (k === "map") return openMap();
  if (k === "ghosts") { openWin("cl"); const g = [...document.querySelectorAll("#groups .gh")].find(x => /Ghosts/.test(x.textContent)); if (g) g.scrollIntoView({block: "start"}); toast("pick a ghost. they talk like themselves now 👻"); return; }
  if (k === "bury") { _ot7("arch"); setTimeout(() => $("#abury").click(), 100); return; }
  return _ot7(k);
};
const _gp7 = goPlace;
goPlace = function(k){
  seen(k); $("#mapov").classList.remove("open");
  if (k === "map") { $("#dkmore").classList.remove("open"); closeMenu(); if (Q.open) leaveQuilt(); document.body.classList.remove("inroom"); openMap(); return; }
  _gp7(k);
};
const _ce = closeOverlays;
closeOverlays = function(){ _ce(); const m = $("#mapov"); if (m) m.classList.remove("open"); };
/* the worlds play themselves, with sound */
const _eq7 = enterQuilt;
enterQuilt = function(at){ _eq7(at); seen("worlds"); Q.auto = true; $("#qplay").textContent = "❚❚ pause"; if (!muted && !FM) fmStart(); };
/* the room: a sassy 8-bit bedroom */
const _er7 = enterRoom;
enterRoom = function(){ _er7(); };
$("#lform").addEventListener("submit", () => setTimeout(() => toast("lost? the map's on the wall. or be a rebel and click everything."), 3200));
paintVert();
