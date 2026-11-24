
/* =================== EXTENSION 7: every door works + second-degree copy =================== */
const _ot8 = openThing;
openThing = function(k){
  if (k === "worlds") { if (!Q.open) enterQuilt(); return; }
  if (k === "msn") { openWin("cl"); return; }
  return _ot8(k);
};
/* the room speaks in references, then tells you where the door goes */
const OBLIQUE = {
  "worlds": ["la jetée", "the worlds"], "niche": ["panton hour", "niche lab"], "gallery": ["salon des refusés", "the museum"],
  "closet": ["the mirror stage", "dollz closet"], "tm": ["temps perdu", "time machine"], "hood": ["les amis de mes amis", "the neighbourhood"],
  "map": ["the map is not the territory", "the map"], "radio": ["88.4, unlicensed", "ghost fm"], "msn": ["‹ appear offline ›", "msn"],
  "arch": ["unpacking my library", "the archive"], "atlas": ["marginalia", "ghost atlas"], "chat:ghost": ["dressed for no one", "the ghost"],
  "arcade": ["outlook not so good", "the arcade"], "letters": ["par avion", "letters"], "dash": ["27 exposures left", "the dash"], "ghosts": ["séance, unplugged", "the ghosts"]
};
document.querySelectorAll("#room .hs").forEach(h => { const o = OBLIQUE[h.dataset.go]; if (o) { h.dataset.w = o[0]; h.setAttribute("aria-label", `${o[0]}: ${o[1]}`); } });
$("#room").addEventListener("pointermove", e => {
  const h = e.target.closest(".hs"), o = h && OBLIQUE[h.dataset.go]; if (!o) return;
  wh.innerHTML = `${esc(o[0])}<small>→ ${esc(o[1])}</small>`;
  wh.style.left = Math.min(innerWidth - wh.offsetWidth - 12, e.clientX + 22) + "px";
});
/* verticals, renamed: less brochure, more insider */
const VNAME = {
  explore: ["◎", "rabbit holes", "for the chronically curious"], talk: ["☾", "séance", "the living, the dead, the extremely online"],
  share: ["✂", "zine", "photocopied, reblogged, deniable"], collect: ["❖", "the hoard", "magpie behaviour, organised"], play: ["✱", "recess", "nobody's watching"]
};
const PDESC = {
  niche: "a slot machine for obsessions. fuse two. collect true facts.", worlds: "seven rooms, one long zoom. it plays itself.", gallery: "phones as sculpture, see-through tech, what we wore.",
  tm: "drag a year. the web opens as it was.", atlas: "a research bank, footnoted.", arch: "things that left. a shared burial ground.",
  msn: "the contact list. some of them are dead.", ghosts: "25 voices: said, varda, oum kalthoum, sun ra…", hood: "strangers with whole worlds. fictional, sincere.",
  letters: "the ghost writes back. postmarked 2:13am.", forum: "threads, opinions, power cuts.", dash: "reblog culture, with candles.", wall: "say it to the wall.",
  journal: "a diary, published by accident.", bury: "add to the burial ground.", stash: "notes, links, a constellation.", quests: "side quests for the chronically online.",
  rewards: "vanity metrics, but cute.", map: "an index, not a menu.", closet: "pixel dolls. plaid optional.", arcade: "snake, memory, decoders.",
  quiz: "which ghost are you (honestly).", mess: "47 tabs. close them. or don't.", radio: "soft chords, no algorithm."
};
VERT.forEach(v => { const n = VNAME[v.id]; v.e = n[0]; v.n = n[1]; v.tag = n[2]; v.p.forEach(p => { if (PDESC[p[0]]) p[3] = PDESC[p[0]]; }); });
VERT.forEach(v => { const b = document.querySelector(`#dock [data-v="${v.id}"]`); if (b) { b.querySelector(".e").textContent = v.e; b.querySelector(".l").textContent = v.n.replace("rabbit holes", "holes").replace("the hoard", "hoard"); b.title = v.tag; b.classList.add("glyph"); } });
const mb = document.querySelector('#dock [data-v="map"]'); if (mb) { mb.querySelector(".e").textContent = "⌖"; mb.classList.add("glyph"); mb.title = "an index, not a menu"; }
const rb = document.querySelector('#dock [data-go="room"]'); if (rb) { rb.querySelector(".e").textContent = "⌂"; rb.classList.add("glyph"); }
const _om = openMap;
openMap = function(){
  _om();
  const done = ALLP.filter(k => XS.vis[k]).length, h = $("#mapov h1"), sub = $("#mapov .mapsub");
  if (h) h.innerHTML = `an index,<br>not a <i>menu</i>.`;
  if (sub) sub.textContent = `${done} of ${ALLP.length} rooms entered · ✦ marks the ones you've been avoiding`;
  const last = document.querySelectorAll("#mapov .mapsub")[1]; if (last) last.textContent = "the room is the front door. everything in it is a door too. some of them are jokes.";
};
/* fewer instructions, more atmosphere */
const _toast7 = toast;
toast = function(html, onclick){
  const swap = {"everything in this room is a door.": "every object here is a door. some of them are jokes.",
    "lost? the little map is on the wall. or be a rebel and click everything.": "the map is not the territory. it's on the wall anyway.",
    "🧭 spin your niche in the Niche Lab": "the disc wall knows your niche. ask it."};
  return _toast7(swap[html] || html, onclick);
};
