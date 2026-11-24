
/* =================== EXTENSION 3: soft gen x skin, stash (research engine), ghosts of everyone, 2:13am desktop, ghost fm, letters, quests =================== */
XS.stash = XS.stash || []; XS.q = XS.q || {}; XS.q.cats = XS.q.cats || []; XS.q.wings = XS.q.wings || [];
const KINDS = {read: ["📚", "to read"], watch: ["🎬", "to watch"], listen: ["🎧", "to listen"], visit: ["🌐", "to visit"], object: ["🧸", "objects"], idea: ["💡", "ideas"], person: ["👻", "people"]};
Object.assign(BADGES, {collector: ["🎒", "collector", "pocketed 5 artifacts"], curator: ["🗂", "curator", "pocketed 20 artifacts"], tidy: ["🧹", "2:13am survivor", "cleaned the messy desktop"], dj: ["📻", "night shift dj", "tuned in to Ghost FM"], museum: ["🖼", "museum rat", "walked 4 museum wings"], penpal: ["📮", "penpal", "read a letter from the ghost"], worlds: ["🌍", "multiverse", "talked to ghosts from 3 worlds"]});

/* ---------- soft gen x wallpaper, grain, the mascot ---------- */
$("#wallghost").innerHTML = ghostAv({acc: ["shades", "pearls", "blush", "star"], c1: "#ffffff", c2: "#ffd9ec", line: "#ffb3d1"});
const grainSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
$("#grain").style.backgroundImage = `url("data:image/svg+xml,${grainSvg.replace(/#/g, "%23").replace(/"/g, "'")}")`;
function stamp(){ const d = new Date(); $("#stamp").textContent = `'04 ${String(d.getMonth() + 1).padStart(2, " ")} ${String(d.getDate()).padStart(2, " ")}`; }
stamp();
/* the closet's model is the mascot now: a ghost in a fit */
SKIN.splice(0, SKIN.length, "#ffffff", "#ffe3f1", "#e6dcff", "#dff7ff", "#fff1c2");
const _doll = dollSVG;
dollSVG = function(f){
  const sk = SKIN[f.skin | 0] || SKIN[0], eye = ["#191451", "#5a3a2a", "#c99a3a", "#e2366f", "#1d9be6", "#2a160e"][f.hc | 0] || "#191451";
  const sheet = `<defs><linearGradient id="shg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${sk}"/></linearGradient></defs>
    <path d="M58 96C50 26 150 26 142 96L152 216l-12-9-12 9-14-9-14 9-14-9-14 9-12-9-12 9Z" fill="url(#shg)" stroke="#d9b3c9" stroke-width="2.5"/>
    <path d="M70 60C74 44 86 38 98 38" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/>`;
  const legs = `<path d="M84 212 h15 l-1 140 h-12z M101 212 h15 l-2 140 h-12z" fill="${sk}" stroke="#d9b3c9" stroke-width="2"/>`;
  const face = `<ellipse cx="86" cy="64" rx="7" ry="10" fill="${eye}"/><ellipse cx="114" cy="64" rx="7" ry="10" fill="${eye}"/><circle cx="88" cy="60" r="2.4" fill="#fff"/><circle cx="116" cy="60" r="2.4" fill="#fff"/>
    <ellipse cx="76" cy="78" rx="6" ry="3" fill="#ff8ac2" opacity=".6"/><ellipse cx="124" cy="78" rx="6" ry="3" fill="#ff8ac2" opacity=".6"/>
    <path d="M94 82q3-3 6 0q3-3 6 0q-3 5-6 5q-3 0-6-5z" fill="#e2366f"/><path d="M128 70l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#ffd700"/>`;
  let s = _doll(f)
    .replace(/<path d="M70 60 q-6 70 8 90 h44 q14 -20 8 -90 q-30 -40 -60 0z"[^>]*\/>/, "")
    .replace(/<path d="M84 92 L56 214[^>]*\/><rect x="93" y="78"[^>]*\/>/, "")
    .replace(/<path d="M82 196 h17 l-2 154 h-12z M101 196[^>]*\/>/, legs)
    .replace(/<circle cx="100" cy="58" r="24"[^>]*\/><ellipse[^>]*\/><ellipse[^>]*\/><path d="M93 71[^>]*\/><circle cx="97" cy="70" r="1"[^>]*\/>/, face)
    .replace(/<path d="M76 54 q4 -34 24 -32[^>]*\/>/, "");
  return s.replace(/(<svg[^>]*>)/, `$1${sheet}`);
};
const _rc = renderCloset;
renderCloset = function(){ _rc(); $("#racks").innerHTML = $("#racks").innerHTML.replace("<b>skin</b>", "<b>sheet</b>").replace(">hair colour<", ">eye colour<"); };

/* ---------- the stash: pocket anything, organise it, link it, explore it ---------- */
const COL = {}; let colN = 0;
const colBtn = (it, label = "🎒 pocket it") => { const k = "c" + (++colN); COL[k] = it; return `<button class="xp" data-col="${k}">${label}</button>`; };
document.addEventListener("click", e => {
  const b = e.target.closest("[data-col]"); if (b && COL[b.dataset.col]) { collect(COL[b.dataset.col]); b.textContent = "✓ pocketed"; b.disabled = true; return; }
  const c = e.target.closest(".clip"); if (c) { const m = c.closest(".msg"), t = (m.querySelector(".txt") || {}).textContent || ""; if (t.trim()) collect({t: t.trim().slice(0, 160), k: "idea", by: cur ? cur.n : "", src: `a conversation with ${cur ? cur.n : "the ghost"}`, lens: cur && cur.lens ? cur.id : ""}); }
});
function collect(it){
  const key = (it.t + "|" + (it.by || "")).toLowerCase();
  if (XS.stash.some(s => s.key === key)) { toast("already in your stash 🎒", openStash); return; }
  XS.stash.unshift(Object.assign({id: "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), key, ts: Date.now(), st: 0, note: "", links: []}, it));
  xsave(); paintPocket(); tone([[988,.05],[1319,.1]], "square", .035);
  const pk = $("#dkpocket"); if (pk) { const r = pk.getBoundingClientRect(), f = document.createElement("div"); f.className = "flyup"; f.textContent = "+1 🎒"; f.style.left = r.left + "px"; f.style.top = r.bottom + "px"; document.body.appendChild(f); setTimeout(() => f.remove(), 1000); }
  toast(`🎒 pocketed: <b>${esc(it.t)}</b>`, openStash); award(3);
  if (XS.stash.length >= 5) badge("collector"); if (XS.stash.length >= 20) badge("curator");
  questTick(); if (!$("#stash").classList.contains("hidden")) renderStash();
}
let stTab = "all", stMode = "list", stFocus = null;
$("#stK").innerHTML = Object.entries(KINDS).map(([k, [e, n]]) => `<option value="${k}" ${k === "idea" ? "selected" : ""}>${e} ${n}</option>`).join("");
function openStash(){ openWin("stash"); renderStash(); }
const S3 = ["to explore", "exploring", "done ✓"];
const q1 = s => encodeURIComponent(s);
function explore(s){
  const q = q1(`${s.t} ${s.by || ""}`.trim());
  const L = [[`https://en.wikipedia.org/w/index.php?search=${q}`, "wiki"], [`https://archive.org/search?query=${q}`, "archive.org"], [`https://www.youtube.com/results?search_query=${q}`, "youtube"]];
  if (s.k === "read") L.push([`https://openlibrary.org/search?q=${q}`, "open library"]);
  if (s.k === "listen") L.push([`https://open.spotify.com/search/${q}`, "spotify"]);
  if (s.url) L.unshift([s.url, "the link"]);
  return L.map(([u, n]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${n} ↗</a>`).join("");
}
function renderStash(){
  const all = XS.stash, counts = {}; all.forEach(s => counts[s.k] = (counts[s.k] || 0) + 1);
  $("#stTabs").innerHTML = `<span class="tab ${stTab === "all" ? "on" : ""}" data-st="all">all (${all.length})</span>` + Object.entries(KINDS).map(([k, [e, n]]) => `<span class="tab ${stTab === k ? "on" : ""}" data-st="${k}">${e} ${n} (${counts[k] || 0})</span>`).join("");
  $("#stView").textContent = stMode === "list" ? "✦ constellation" : "☰ board";
  const q = $("#stQ").value.trim().toLowerCase();
  const list = all.filter(s => (stTab === "all" || s.k === stTab) && (!q || [s.t, s.by, s.src, s.note].join(" ").toLowerCase().includes(q)));
  $("#stCount").textContent = `${XS.stash.filter(s => s.st === 2).length} explored · ${all.reduce((a, s) => a + s.links.length, 0) / 2 | 0} links`;
  if (!all.length) { $("#stBody").innerHTML = `<div class="empty2">your stash is empty. talk to a ghost, walk the museum, open a time capsule, and press 🎒 on anything that pulls at you.<br><br>this is your research board: notes, links, and doors out to explore more.</div>`; return; }
  if (stMode === "map") return renderConstel(list);
  $("#stBody").innerHTML = `<div class="sgrid">${list.map(s => `<div class="scard ${stFocus === s.id ? "hl" : ""}" id="sc-${s.id}">
    <span class="k">${(KINDS[s.k] || KINDS.idea)[0]}</span><div class="st">${esc(s.t)}</div>
    <div class="sm">${s.by ? esc(s.by) : ""}${s.y ? " · " + esc(String(s.y)) : ""}${s.src ? `<br>found: ${esc(s.src)}` : ""}</div>
    <div style="clear:both;margin-top:6px"><span class="pill s${s.st}" data-sst="${s.id}">${S3[s.st]}</span> <select class="xp" data-skind="${s.id}" style="font-size:10px;padding:0">${Object.entries(KINDS).map(([k, [e]]) => `<option value="${k}" ${s.k === k ? "selected" : ""}>${e}</option>`).join("")}</select></div>
    <div class="note" contenteditable="true" data-snote="${s.id}">${esc(s.note || "")}</div>
    ${s.links.length ? `<div class="slinks">🔗 ${s.links.map(id => XS.stash.find(x => x.id === id)).filter(Boolean).map(x => `<span data-sgo="${x.id}">${esc(x.t.slice(0, 34))}</span>`).join("")}</div>` : ""}
    <div class="sacts">${explore(s)}<button data-slink="${s.id}">🔗 link</button><button data-sask="${s.id}">💬 ask</button><button data-sdel="${s.id}">🗑</button></div>
    <div data-slinkbox="${s.id}" style="display:none;margin-top:6px"><select class="xp" style="width:100%"><option value="">connect to…</option>${XS.stash.filter(x => x.id !== s.id && !s.links.includes(x.id)).map(x => `<option value="${x.id}">${(KINDS[x.k] || KINDS.idea)[0]} ${esc(x.t.slice(0, 50))}</option>`).join("")}</select></div>
  </div>`).join("")}</div>`;
  if (stFocus) { const el = $("#sc-" + stFocus); if (el) el.scrollIntoView({block: "center"}); stFocus = null; }
}
function renderConstel(list){
  const W = 720, H = 440, n = list.length, cx = W / 2, cy = H / 2;
  const P = {}; list.forEach((s, i) => { const a = i * 2.39996, r = 30 + 170 * Math.sqrt((i + .5) / n); P[s.id] = [cx + Math.cos(a) * r * 1.5, cy + Math.sin(a) * r]; });
  let lines = "";
  list.forEach((s, i) => {
    s.links.forEach(id => { if (P[id] && s.id < id) lines += `<line x1="${P[s.id][0]}" y1="${P[s.id][1]}" x2="${P[id][0]}" y2="${P[id][1]}" stroke="#ff8ac2" stroke-width="2"/>`; });
    list.slice(i + 1).forEach(o => { if (s.by && o.by === s.by) lines += `<line x1="${P[s.id][0]}" y1="${P[s.id][1]}" x2="${P[o.id][0]}" y2="${P[o.id][1]}" stroke="#7fd8ff" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/>`; });
  });
  const col = {read: "#ffd98a", watch: "#ff8ac2", listen: "#7fd8ff", visit: "#9be38f", object: "#c9b6ff", idea: "#fff6ee", person: "#b8f3ff"};
  $("#stBody").innerHTML = `<svg id="constel" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${Array.from({length: 60}, (_, i) => `<circle cx="${(i * 137) % W}" cy="${(i * 89) % H}" r="${i % 7 ? .7 : 1.4}" fill="#fff" opacity=".5"/>`).join("")}${lines}
    ${list.map(s => `<g class="nd" data-sgo="${s.id}"><circle cx="${P[s.id][0]}" cy="${P[s.id][1]}" r="${7 + Math.min(8, s.links.length * 2)}" fill="${col[s.k] || "#fff"}" opacity="${s.st === 2 ? 1 : .75}"/><text x="${P[s.id][0] + 12}" y="${P[s.id][1] + 4}">${esc(s.t.slice(0, 26))}</text></g>`).join("")}
    <text x="12" y="${H - 14}" style="fill:#b7cde0">pink lines: links you made · blue dashes: same creator · click a star to open it</text></svg>`;
}
$("#stTabs").addEventListener("click", e => { const t = e.target.closest("[data-st]"); if (t) { stTab = t.dataset.st; renderStash(); } });
$("#stQ").addEventListener("input", renderStash);
$("#stView").onclick = () => { stMode = stMode === "list" ? "map" : "list"; renderStash(); };
$("#stCopy").onclick = async () => { const t = XS.stash.map(s => `${(KINDS[s.k] || KINDS.idea)[0]} ${s.t}${s.by ? " (" + s.by + (s.y ? ", " + s.y : "") + ")" : ""}${s.note ? " — " + s.note : ""}`).join("\n"); try { await navigator.clipboard.writeText(t); toast("stash copied ⧉"); } catch(_) { toast("couldn't reach the clipboard here."); } };
$("#stAdd").onsubmit = e => { e.preventDefault(); const t = $("#stT").value.trim(); if (!t) return; $("#stT").value = ""; collect({t, k: $("#stK").value, by: "", src: "my own head"}); };
const sFind = id => XS.stash.find(s => s.id === id);
$("#stBody").addEventListener("click", e => {
  const t = e.target, g = t.closest("[data-sgo]");
  if (g) { stMode = "list"; stTab = "all"; $("#stQ").value = ""; stFocus = g.dataset.sgo; renderStash(); return; }
  if (t.dataset.sst) { const s = sFind(t.dataset.sst); s.st = (s.st + 1) % 3; if (s.st === 2) { award(2, "explored: " + s.t.slice(0, 30)); } xsave(); renderStash(); return; }
  if (t.dataset.sdel) { XS.stash = XS.stash.filter(s => s.id !== t.dataset.sdel); XS.stash.forEach(s => s.links = s.links.filter(id => id !== t.dataset.sdel)); xsave(); paintPocket(); renderStash(); return; }
  if (t.dataset.slink) { const bx = document.querySelector(`[data-slinkbox="${t.dataset.slink}"]`); bx.style.display = bx.style.display === "none" ? "block" : "none"; return; }
  if (t.dataset.sask) { const s = sFind(t.dataset.sask); openChat(s.lens && ALL[s.lens] ? s.lens : "ghost"); setTimeout(() => { $("#inp").value = `tell me more about "${s.t}"${s.by ? " by " + s.by : ""}. where should i start, and what does it connect to?`; $("#inp").focus(); }, 300); }
});
$("#stBody").addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.skind) { sFind(t.dataset.skind).k = t.value; xsave(); renderStash(); return; }
  const bx = t.closest("[data-slinkbox]"); if (bx && t.value) { const a = sFind(bx.dataset.slinkbox), b = sFind(t.value); if (a && b) { a.links.push(b.id); b.links.push(a.id); xsave(); award(1); tone([[660,.05],[990,.08]], "sine", .03); renderStash(); } }
});
$("#stBody").addEventListener("focusout", e => { const n = e.target.dataset && e.target.dataset.snote; if (n) { const s = sFind(n); s.note = e.target.textContent.trim().slice(0, 600); xsave(); } });

/* ---------- ghosts of everyone: music, fashion, film, history, art ---------- */
const WORKS = {
 fisher: [["Capitalist Realism", 2009, "read"], ["Ghosts of My Life", 2014, "read"]],
 deleuze: [["Difference and Repetition", 1968, "read"], ["A Thousand Plateaus (with Guattari)", 1980, "read"], ["Postscript on the Societies of Control", 1990, "read"]],
 boym: [["The Future of Nostalgia", 2001, "read"], ["Another Freedom", 2010, "read"]],
 han: [["The Burnout Society", 2010, "read"], ["Saving Beauty", 2015, "read"], ["In Praise of the Earth", 2018, "read"]],
 said: [["Orientalism", 1978, "read"], ["Out of Place (memoir)", 1999, "read"], ["Reflections on Exile", 2000, "read"]],
 benjamin: [["The Work of Art in the Age of Mechanical Reproduction", 1935, "read"], ["Unpacking My Library", 1931, "read"], ["The Arcades Project", 1982, "read"]],
 adnan: [["Sitt Marie Rose", 1978, "read"], ["The Arab Apocalypse", 1980, "read"], ["Journey to Mount Tamalpais", 1986, "read"]],
 mernissi: [["Beyond the Veil", 1975, "read"], ["Dreams of Trespass", 1994, "read"], ["Scheherazade Goes West", 2001, "read"]],
 tanizaki: [["In Praise of Shadows", 1933, "read"], ["Some Prefer Nettles", 1929, "read"], ["The Makioka Sisters", 1948, "read"]],
 orwell: [["Homage to Catalonia", 1938, "read"], ["Politics and the English Language", 1946, "read"], ["Nineteen Eighty-Four", 1949, "read"]]
};
const MORE_GHOSTS = [
 {g: "Ghosts: music", c: [
  {id: "oumk", n: "Oum Kalthoum", st: "on", cat: "music", pm: "one song, one hour, one whole country listening", topic: "tarab, the long concert, Thursday radio broadcasts across the Arab world, repetition as ecstasy, a voice as a public space", works: [["Enta Omri", 1964, "listen"], ["Al Atlal", 1966, "listen"]]},
  {id: "arussell", n: "Arthur Russell", st: "away", cat: "music", pm: "cello, echo, a disco nobody was ready for", topic: "echo and space, disco as avant-garde, unfinished tapes, songs that never stop being drafts", works: [["World of Echo", 1986, "listen"], ["Calling Out of Context", 2004, "listen"]]},
  {id: "acoltrane", n: "Alice Coltrane", st: "on", cat: "music", pm: "harp, organ, devotion", topic: "spiritual jazz, the harp, devotional music, home studios, sound as prayer", works: [["Ptah, the El Daoud", 1970, "listen"], ["Turiya Sings", 1982, "listen"]]},
  {id: "sunra", n: "Sun Ra", st: "busy", cat: "music", pm: "space is the place", topic: "afrofuturism, myth-making, the arkestra, costume as cosmology, the future imagined from the margins", works: [["Space Is the Place (film)", 1974, "watch"]]}
 ]},
 {g: "Ghosts: fashion", c: [
  {id: "schiap", n: "Elsa Schiaparelli", st: "on", cat: "fashion", pm: "shocking pink, obviously", topic: "surrealism in fashion, wit, trompe l'oeil, colour as a statement, artists and couture", works: [["the colour Shocking Pink", 1937, "object"], ["the Lobster Dress (with Dalí)", 1937, "object"], ["Shocking Life (memoir)", 1954, "read"]]},
  {id: "ysl", n: "Yves Saint Laurent", st: "busy", cat: "fashion", pm: "a tuxedo, but make it hers", topic: "Le Smoking, art on clothes, Marrakech, ready-to-wear as freedom", works: [["the Mondrian dress", 1965, "object"], ["Le Smoking", 1966, "object"]]},
  {id: "miyake", n: "Issey Miyake", st: "on", cat: "fashion", pm: "a piece of cloth, folded into a life", topic: "pleats, one piece of cloth, technology and craft, clothes that move with you", works: [["Pleats Please", 1993, "object"], ["A-POC (A Piece of Cloth)", 1999, "object"]]},
  {id: "vreeland", n: "Diana Vreeland", st: "away", cat: "fashion", pm: "the eye has to travel", topic: "fantasy, editing, the magazine as theatre, museum costume shows, exaggeration as truth", works: [["“Why Don't You…?” (column)", 1936, "read"], ["D.V. (memoir)", 1984, "read"]]}
 ]},
 {g: "Ghosts: film & image", c: [
  {id: "marker", n: "Chris Marker", st: "off", cat: "film", pm: "memory is a film you keep re-editing", topic: "memory, travel, still images, time loops, the essay film, cats", works: [["La Jetée", 1962, "watch"], ["Sans Soleil", 1983, "watch"]]},
  {id: "varda", n: "Agnès Varda", st: "on", cat: "film", pm: "gleaning what others leave behind", topic: "gleaning, everyday people, potatoes shaped like hearts, cinécriture, women's time", works: [["Cléo from 5 to 7", 1962, "watch"], ["The Gleaners and I", 2000, "watch"]]},
  {id: "chahine", n: "Youssef Chahine", st: "busy", cat: "film", pm: "Alexandria, why?", topic: "Alexandria, cosmopolitan memory, musicals and politics, autobiography on screen", works: [["Cairo Station", 1958, "watch"], ["Alexandria… Why?", 1979, "watch"]]},
  {id: "warhol", n: "Andy Warhol", st: "on", cat: "art", pm: "i put everything in boxes", topic: "the Time Capsules (boxes of everyday stuff), repetition, fame, the ordinary as art", works: [["the Time Capsules", 1974, "object"], ["The Philosophy of Andy Warhol", 1975, "read"]]}
 ]},
 {g: "Ghosts: history & words", c: [
  {id: "battuta", n: "Ibn Battuta", st: "away", cat: "history", pm: "left home at 21. kept going.", topic: "travel across the medieval world, hospitality, being a stranger, writing from memory", works: [["the Rihla (travels)", 1355, "read"]]},
  {id: "khaldun", n: "Ibn Khaldun", st: "busy", cat: "history", pm: "every dynasty has a lifespan", topic: "cycles of history, asabiyya (group feeling), cities and deserts, why things rise and fall", works: [["The Muqaddimah", 1377, "read"]]},
  {id: "darwish", n: "Mahmoud Darwish", st: "off", cat: "poetry", pm: "memory for forgetfulness", topic: "exile, memory, Beirut 1982, coffee as ritual, poetry as homeland", works: [["Memory for Forgetfulness", 1986, "read"], ["In the Presence of Absence", 2006, "read"]]},
  {id: "lovelace", n: "Ada Lovelace", st: "on", cat: "tech", pm: "poetical science", topic: "the first ideas of programming, machines and imagination, 'poetical science', what computers could become", works: [["Notes on the Analytical Engine", 1843, "read"]]}
 ]}
];
LENSES.forEach(l => { l.works = WORKS[l.id] || []; l.cat = "ideas"; });
MORE_GHOSTS.forEach(G => {
  G.c.forEach(l => { l.lens = 1; l.m = [`hey. tonight i'm talking through ${l.n}'s world. a ghost, not a séance: i won't put words in their mouth.`, `${l.pm}.`, {mood: l.works.map(w => [(KINDS[w[2]] || KINDS.idea)[0], w[0], pick(["#ffd6e7", "#d6f0ff", "#fff1c2", "#e6dcff"])]), cap: "their world, in objects. pocket what pulls at you ↓"}, "pick a topic below or just type."]; ALL[l.id] = l; LENSES.push(l); LENS[l.id] = l; });
  groups.push(G);
});
const lensGroup = groups.find(G => /The Lounge/.test(G.g)); if (lensGroup) { lensGroup.g = "Ghosts: ideas"; lensGroup.c = lensGroup.c.filter(c => !c.cat || c.cat === "ideas"); }
const _f3 = finish;
finish = function(c){
  const r = _f3(c);
  if (c.lens && (c.works || []).length) sys(`<div class="works"><b>📚 pocket their world:</b> ${c.works.map(([t, y, k]) => colBtn({t, by: c.n, y, k, src: `talking with ${c.n}`, lens: c.id}, `${(KINDS[k] || KINDS.idea)[0]} ${esc(t)} (${y}) ＋`)).join("")}${colBtn({t: c.n, by: "", k: "person", src: "the ghosts", lens: c.id}, "👻 pocket the person ＋")}</div>`);
  return r;
};
const _oc3 = openChat;
openChat = function(id){
  _oc3(id); const c = ALL[id];
  if (c && c.lens) { const cat = c.cat || "ideas"; if (!XS.q.cats.includes(cat)) { XS.q.cats.push(cat); xsave(); questTick(); } }
};
/* every message can be pocketed */
const _say3 = say;
say = function(who, html, cls){
  const r = _say3(who, html, cls);
  if (/\bthem\b/.test(cls) && !/vis/.test(cls)) { const w = box.lastElementChild && box.lastElementChild.querySelector(".who"); if (w) w.insertAdjacentHTML("beforeend", `<button class="clip" title="pocket this line">📎</button>`); }
  return r;
};

/* ---------- the museum grows: archive fashion, odds & ends ---------- */
const g6 = (bg, inner) => pa(bg, inner);
const FASH = [
 {t: "low-rise flared jeans", y: "c. 2001", med: "denim, a belly chain, confidence", line: "the waistband lived somewhere around the hip bone. the flare swept the floor and collected the whole city.", crit: "the hem was wet for three years. worth it. iconic.", art: g6("#d6f0ff", `<path d="M62 40h76l6 30-6 120 16 84h-46l-8-130-8 130H46l16-84-6-120z" fill="#4a6fa5"/><path d="M62 40h76v12H62z" fill="#3a5a8a"/><path d="M70 64q10 10 22 2M130 64q-10 10-22 2" stroke="#ffd98a" stroke-width="2" fill="none" stroke-dasharray="3 2"/><path d="M58 40q42 16 84 0" stroke="#ffd700" stroke-width="2" stroke-dasharray="2 3" fill="none"/>`)},
 {t: "the velour tracksuit", y: "c. 2003", med: "velour, a zip, an airport", line: "worn to the airport, to the shops, to cry. soft armour.", crit: "comfort cosplaying as glamour. i respect the lie.", art: g6("#fff1c2", `<path d="M60 60q40-30 80 0l34 40-16 14-18-16v160H60V98L42 114 26 100z" fill="#ff8ac2"/><path d="M100 48v210" stroke="#fff" stroke-width="3"/><path d="M76 50q24 32 48 0" fill="none" stroke="#e2366f" stroke-width="7"/><path d="M60 230h80" stroke="#e2366f" stroke-width="10" opacity=".4"/>`)},
 {t: "the slip dress", y: "c. 1995", med: "bias-cut satin, two straps, no explanation", line: "underwear, but make it a party. or a funeral. or both.", crit: "the minimalism was loud. i wear my bedsheet in its honour.", art: g6("#1b1650", `<path d="M78 30v42M122 30v42" stroke="#c9ccd6" stroke-width="2"/><path d="M72 72q28 12 56 0l20 210H52z" fill="#e9e4f2"/><path d="M82 92l-10 180M118 92l12 180" stroke="#fff" stroke-width="3" opacity=".6"/><path d="M72 72q28 16 56 0" fill="none" stroke="#b9a8d8" stroke-width="3"/>`)},
 {t: "the trucker hat", y: "c. 2003", med: "foam front, mesh back, irony", line: "a workwear hat worn by people who had never driven a truck.", crit: "the irony was the accessory. the hat was just holding it.", art: g6("#e6dcff", `<path d="M56 172C56 96 144 96 144 172Z" fill="#ff8ac2"/><path d="M100 104C120 104 144 124 144 172H104Z" fill="url(#mesh)"/><defs><pattern id="mesh" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#ffb3d1"/><circle cx="4" cy="4" r="2" fill="#e2366f"/></pattern></defs><path d="M66 168C70 114 98 104 104 106L102 168Z" fill="#fff"/><path d="M38 174h124q26 2 32 16H32q0-14 6-16z" fill="#e2366f"/><circle cx="100" cy="100" r="5" fill="#e2366f"/>`)},
 {t: "the butterfly top", y: "c. 2000", med: "a handkerchief, two strings, summer", line: "a whole top that was mostly a butterfly and a hope.", crit: "structurally it was a napkin. emotionally it was couture.", art: g6("#ffd6e7", `<path d="M100 120C60 60 26 92 48 140C28 182 70 204 100 162C130 204 172 182 152 140C174 92 140 60 100 120Z" fill="#7fd8ff"/><path d="M100 120v42" stroke="#fff" stroke-width="3"/><path d="M100 120L78 54M100 120L122 54" stroke="#c9ccd6" stroke-width="2"/><circle cx="70" cy="132" r="9" fill="#ff8ac2"/><circle cx="130" cy="132" r="9" fill="#ff8ac2"/>`)},
 {t: "platform sneakers", y: "c. 1997", med: "rubber, height, attitude", line: "five extra centimetres of rubber and a whole new personality.", crit: "the ankle injuries were a small price for the altitude.", art: g6("#dcf7cf", `<path d="M30 190q10-60 70-60q40 0 60 40l14 20v20H30z" fill="#fff" stroke="#ccc" stroke-width="2"/><rect x="26" y="208" width="152" height="36" rx="10" fill="#ff8ac2"/><path d="M70 140l50 30M64 156l50 30" stroke="#7fd8ff" stroke-width="5" stroke-linecap="round"/><rect x="26" y="238" width="152" height="8" rx="4" fill="#e2366f"/>`)},
 {t: "tinted shield sunglasses", y: "c. 1999", med: "one curved lens, the future", line: "one lens for both eyes, tinted like a sweet. the millennium on your face.", crit: "you couldn't see properly and you didn't care. that's fashion.", art: g6("#fff1c2", `<path d="M30 140q70-30 140 0q-6 42-40 46q-20 2-30-16q-10 18-30 16q-34-4-40-46z" fill="#ff8ac2" opacity=".8"/><path d="M42 148q20-12 42-9" stroke="#fff" stroke-width="5" opacity=".7" fill="none" stroke-linecap="round"/><path d="M28 140L12 130M172 140l16-10" stroke="#c9ccd6" stroke-width="5" stroke-linecap="round"/>`)},
 {t: "the mini shoulder bag", y: "c. 1999", med: "a short strap, a tiny world", line: "it held a lip gloss, a phone and nothing else. that was the point.", crit: "small bag, big decisions. tucked under the arm like a secret.", art: g6("#e6dcff", `<path d="M62 140q38-74 76 0" fill="none" stroke="#b98ad8" stroke-width="9"/><rect x="40" y="136" width="120" height="62" rx="20" fill="#b98ad8"/><rect x="88" y="156" width="24" height="15" rx="3" fill="#ffd700"/><path d="M48 150h104" stroke="#fff" stroke-width="2" stroke-dasharray="4 3" opacity=".6"/>`)}
];
const ODDS = [
 {t: "the disposable camera", y: "c. 1990s", med: "cardboard, plastic, 27 chances", line: "you waited a week to find out if you were happy that night.", crit: "27 shots, no previews, all trust. we were braver.", art: g6("#d6f0ff", `<rect x="34" y="110" width="132" height="86" rx="8" fill="#ffd84a"/><rect x="34" y="110" width="132" height="22" fill="#2c41a3"/><circle cx="100" cy="162" r="22" fill="#222"/><circle cx="100" cy="162" r="12" fill="#3a6fb8"/><rect x="128" y="140" width="26" height="14" rx="2" fill="#dfe8f5"/><circle cx="52" cy="104" r="6" fill="#444"/><text x="100" y="126" font-family="Arial" font-size="9" fill="#fff" text-anchor="middle">27 EXP</text>`)},
 {t: "the lava lamp", y: "c. 1990s revival", med: "glass, wax, patience", line: "a slow blob going up and down while you thought about someone.", crit: "the original screensaver. no notifications. pure vibes.", art: g6("#1b1650", `<path d="M84 62h32l16 140H68z" fill="#ff5aa5" opacity=".8"/><path d="M80 42h40l-4 20H84z" fill="#c0c0c8"/><path d="M64 202h72l12 60H52z" fill="#c0c0c8"/><ellipse cx="100" cy="112" rx="12" ry="18" fill="#ffd84a"><animate attributeName="cy" values="160;90;160" dur="9s" repeatCount="indefinite"/></ellipse><ellipse cx="94" cy="176" rx="16" ry="11" fill="#ffd84a"/><ellipse cx="108" cy="82" rx="6" ry="8" fill="#ffd84a"><animate attributeName="cy" values="80;150;80" dur="13s" repeatCount="indefinite"/></ellipse>`)},
 {t: "the inflatable chair", y: "c. 1998", med: "PVC, air, a bedroom", line: "a see-through chair that squeaked when you sat and deflated by spring.", crit: "furniture with a lifespan of a pop song. perfect.", art: g6("#ffd6e7", `<path d="M40 210q-10-110 60-120q70 10 60 120" fill="#b98ad8" opacity=".55" stroke="#fff" stroke-width="3"/><ellipse cx="100" cy="222" rx="80" ry="34" fill="#b98ad8" opacity=".6" stroke="#fff" stroke-width="3"/><ellipse cx="36" cy="196" rx="20" ry="32" fill="#b98ad8" opacity=".65" stroke="#fff" stroke-width="3"/><ellipse cx="164" cy="196" rx="20" ry="32" fill="#b98ad8" opacity=".65" stroke="#fff" stroke-width="3"/><path d="M78 110q12-6 22-4" stroke="#fff" stroke-width="5" opacity=".85" fill="none" stroke-linecap="round"/>`)},
 {t: "scented gel pens", y: "c. 1999", med: "glitter ink, a pencil case economy", line: "they smelled like fruit that doesn't exist and wrote best on black paper.", crit: "currency. diplomacy. friendship contracts. i've signed treaties in grape.", art: g6("#111", ["#ff8ac2", "#7fd8ff", "#ffd84a", "#9be38f", "#c9b6ff", "#ff5aa5"].map((c, i) => `<g transform="rotate(${-30 + i * 12} 100 150)"><rect x="94" y="40" width="12" height="190" rx="5" fill="${c}" opacity=".85"/><rect x="94" y="40" width="12" height="40" rx="5" fill="#fff" opacity=".5"/><path d="M96 230l4 14 4-14z" fill="#ddd"/></g>`).join(""))},
 {t: "the cd wallet", y: "c. 2000", med: "nylon, 24 sleeves, your whole identity", line: "a zip-up book of everything you were. the case stayed home.", crit: "a library you could lose on a bus. and we did. constantly.", art: g6("#fff1c2", `<defs><linearGradient id="cdg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd6e7"/><stop offset=".33" stop-color="#d6f0ff"/><stop offset=".66" stop-color="#e6dcff"/><stop offset="1" stop-color="#fff1c2"/></linearGradient></defs><rect x="36" y="66" width="128" height="168" rx="12" fill="#1b1b2a"/><circle cx="100" cy="150" r="54" fill="url(#cdg)"/><circle cx="100" cy="150" r="10" fill="#1b1b2a"/><rect x="36" y="66" width="128" height="20" rx="8" fill="#2c41a3"/>`)},
 {t: "glow-in-the-dark stars", y: "c. 1990s", med: "sticky plastic, a ceiling, insomnia", line: "a fake sky you could reach with a chair. it faded by 1am, like most promises.", crit: "the most romantic thing a bedroom ever did.", art: g6("#0b0a22", Array.from({length: 9}, (_, i) => { const x = 30 + (i * 53) % 150, y = 40 + (i * 71) % 220, s = .6 + (i % 3) * .3; return `<path transform="translate(${x} ${y}) scale(${s})" d="M0-20l6 13 14 2-10 10 3 14-13-7-13 7 3-14-10-10 14-2z" fill="#d9ff9a" opacity=".9" style="filter:drop-shadow(0 0 6px #d9ff9a)"/>`; }).join(""))},
 {t: "the slap bracelet", y: "c. 1990", med: "a metal strip, fabric, chaos", line: "slap it on your wrist and it curls. later banned from many schools.", crit: "jewellery with a sound effect. we'll never be this free again.", art: g6("#dcf7cf", `<path d="M40 150q60-64 120 0q-60 64-120 0z" fill="none" stroke="#ff8ac2" stroke-width="18"/><path d="M40 150q60-64 120 0q-60 64-120 0z" fill="none" stroke="#111" stroke-width="18" stroke-dasharray="6 10" opacity=".35"/>`)},
 {t: "the mood ring", y: "c. 1990s revival", med: "liquid crystal, wishful thinking", line: "it turned blue when you were calm and black when the battery of your heart ran out.", crit: "the original wellness tracker. less data, more drama.", art: g6("#e6dcff", `<defs><linearGradient id="mood" x1="0" x2="1"><stop offset="0" stop-color="#1d9be6"><animate attributeName="stop-color" values="#1d9be6;#3cc23c;#e2366f;#1d9be6" dur="8s" repeatCount="indefinite"/></stop><stop offset="1" stop-color="#b98ad8"/></linearGradient></defs><circle cx="100" cy="176" r="44" fill="none" stroke="#c0c0c8" stroke-width="12"/><ellipse cx="100" cy="128" rx="28" ry="22" fill="url(#mood)" stroke="#c0c0c8" stroke-width="5"/>`)}
];
EXHIBITS.splice(2, 0,
 {id: "fashion", t: "Archive Fashion", sub: "what we wore, 1995–2005", intro: `<h2>Archive Fashion</h2><div class="s">what we wore · 1995–2005</div>no logos, no labels. just the silhouettes everyone in your year group had, drawn by the ghost from memory. pocket the ones that still live in your wardrobe.`, pieces: () => FASH},
 {id: "odds", t: "Odds & Ends", sub: "random artifacts from the bedroom floor", intro: `<h2>Odds &amp; Ends</h2><div class="s">the bedroom floor, catalogued</div>things nobody thought to keep, so of course they're the ones that haunt us.`, pieces: () => ODDS});
const _sp = showPiece;
showPiece = function(i){
  _sp(i); const p = galPieces[gbI], nav = document.querySelector("#gbin .gbnav"); if (!nav || !p) return;
  const it = p.era ? {t: p.t, y: p.y, k: "object", by: "", src: "the museum", url: p.era.url ? "https://web.archive.org/web/2004/" + cleanUrl(p.era.url) : ""} : {t: p.t, y: p.y, k: "object", by: "", src: `the museum: ${(EXHIBITS.find(x => x.id === galEx) || {}).t || ""}`, url: p.href || ""};
  nav.insertAdjacentHTML("afterbegin", colBtn(it, "🎒 pocket it") + `<a href="https://www.google.com/search?tbm=isch&q=${q1(p.t + " " + p.y)}" target="_blank" rel="noopener">🔎 explore ↗</a>`);
};
const _og = openGallery;
openGallery = function(id){ _og(id); if (!XS.q.wings.includes(galEx)) { XS.q.wings.push(galEx); xsave(); questTick(); } };
const _rcap = renderCapsule;
renderCapsule = function(){ _rcap(); const e = ARCH.find(x => x.id === capId) || archGet(capId), d = document.querySelector("#capBody .doors"); if (e && d) d.insertAdjacentHTML("afterbegin", colBtn({t: e.name, y: e.born || e.when || "", k: e.cat === "web" ? "visit" : e.cat === "film" ? "watch" : e.cat === "sound" ? "listen" : "object", by: "", src: "a time capsule", url: e.url ? "https://web.archive.org/web/" + (e.born || 2004) + "/" + cleanUrl(e.url) : ""})); };

/* ---------- 2:13am: the messy desktop game ---------- */
const MFILES = ["Screenshot", "Screenshot", "Screenshot", "Screenshot", "New Folder", "untitled folder", "New Text Document", "final_FINAL_v2.doc", "IMG_", "song (1).mp3", "Copy of Copy of cv.doc", "desktop stuff", "DELETE ME", "homework_real.doc", "msn_backup", "wallpaper.bmp", "setup.exe", "track 07.wma", "notes (3).txt", "pics from the party"];
const MART = [
 {f: "do_not_open (2)", i: "📁", t: "a folder of screenshots of one conversation", e: "📸", cap: "you kept every one."},
 {f: "mix_for_M.m3u", i: "🎵", t: "a playlist made for someone, never sent", e: "💿", cap: "track 7 says everything."},
 {f: "away_msg_2005.txt", i: "📄", t: "an away message from 2005", e: "💬", cap: "“brb, my heart is buffering”"},
 {f: "IMG_0042.JPG", i: "🖼", t: "a blurry photo from a night you can't remember", e: "📷", cap: "the flash caught everyone mid-laugh."},
 {f: "passwords.txt", i: "🔑", t: "your first msn password", e: "🗝", cap: "you still remember it. don't type it."}
];
const MPOPS = [
 ["⚠", "Error 404", "memory not found. it might have been moved, renamed, or romanticised.", ["OK"]],
 ["💾", "Low disk space", "your C: drive is full of screenshots of conversations.", ["Free up space", "Later"]],
 ["❓", "Are you sure?", "are you sure you want to close this window?", ["Yes", "No", "Maybe"]],
 ["✉", "37 unread messages", "most of them are chain mails. one of them is from your crush.", ["Ignore"]],
 ["🔄", "Updates available", "restart now? (you will not restart now.)", ["Remind me in 10 years"]],
 ["🖨", "Printer", "the printer is out of cyan. the printer is always out of cyan.", ["Cancel"]],
 ["⏳", "Not responding", "your feelings (not responding). wait or close the program?", ["Wait", "Close"]],
 ["🐛", "Windows has found a problem", "it's you. it's always been you. send report?", ["Don't send"]]
];
let M = null;
function openMess(){
  closeOverlays();
  document.querySelectorAll(".win:not(.hidden)").forEach(w => w.classList.add("hidden"));
  const el = $("#mess"), W = innerWidth, H = innerHeight;
  M = {pops: 0, tabs: 47, files: 0, found: 0, t0: Date.now(), done: false};
  const cols = Math.max(4, Math.floor((W - 20) / 84)), rows = Math.max(4, Math.floor((H - 160) / 84));
  const slots = []; for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) slots.push([10 + c * 84 + Math.random() * 10, 104 + r * 84 + Math.random() * 10]);
  slots.sort(() => Math.random() - .5);
  const n = Math.min(slots.length - 5, 46);
  let html = `<div class="mhud" id="mhud"></div>`;
  const art = MART.map((a, i) => ({a, k: i}));
  for (let i = 0; i < n + art.length; i++) {
    const [x, y] = slots[i]; let name, ic, data = "";
    if (i < art.length) { name = art[i].a.f; ic = art[i].a.i; data = `data-art="${i}"`; }
    else { const b = pick(MFILES); name = b === "Screenshot" ? `Screenshot 2006-0${1 + Math.random() * 9 | 0}-${10 + Math.random() * 18 | 0} at 02.${10 + Math.random() * 49 | 0}.png` : b === "IMG_" ? `IMG_${1000 + Math.random() * 8999 | 0}.JPG` : b; ic = /png|JPG|bmp|pics/.test(name) ? "🖼" : /mp3|wma/.test(name) ? "🎵" : /exe/.test(name) ? "💽" : /folder|Folder|stuff|backup/.test(name) ? "📁" : "📄"; M.files++; }
    html += `<div class="mfile" ${data} style="left:${x}px;top:${y}px"><div class="i">${ic}</div><span>${esc(name)}</span></div>`;
  }
  el.innerHTML = html; el.classList.add("open");
  MPOPS.forEach(p => spawnPop(p));
  spawnTabs();
  messHud(); clearInterval(M.iv); M.iv = setInterval(messHud, 1000);
  markDock(""); tone([[196,.2],[247,.2],[294,.3]], "square", .03);
}
function spawnPop([ic, t, b, btns]){
  const el = $("#mess"), p = document.createElement("div"); p.className = "win mpop"; M.pops++;
  const px = (k, v) => p.style.setProperty(k, v, "important");
  px("position", "absolute"); px("left", `${6 + Math.random() * Math.max(10, innerWidth - 280)}px`); px("top", `${110 + Math.random() * Math.max(10, innerHeight - 300)}px`); px("width", "min(260px,90vw)"); px("height", "auto"); p.style.zIndex = 10 + M.pops;
  p.innerHTML = `<div class="tb"><span class="t">${esc(t)}</span><button class="x">×</button></div><div class="body"><span class="ic">${ic}</span><div>${esc(b)}</div></div><div class="bt">${btns.map(x => `<button class="xp">${esc(x)}</button>`).join("")}</div>`;
  el.appendChild(p); tone([[440,.08],[330,.12]], "square", .02);
}
function spawnTabs(){
  const el = $("#mess"), p = document.createElement("div"); p.className = "win mpop"; p.id = "mtabs"; M.pops++;
  const px = (k, v) => p.style.setProperty(k, v, "important");
  px("position", "absolute"); px("left", `${Math.max(6, innerWidth / 2 - 300)}px`); px("top", "130px"); px("width", "min(600px,94vw)"); px("height", "auto"); p.style.zIndex = 9;
  p.innerHTML = `<div class="tb"><span class="t">Internet Explorer: 47 tabs open (they're all important)</span><button class="x">×</button></div><div class="tabsx" id="mtabx">${Array.from({length: 47}, (_, i) => `<span title="click to close">${pick(["how to delete msn history", "lyrics", "is it normal to", "cheap flights", "my space", "horoscope", "untitled", "404", "forum", "quiz: which"])}</span>`).join("")}</div><div class="body" style="font-size:12px">click a tab to close it. or be brave.</div><div class="bt"><button class="xp" data-closetabs="1">close other tabs</button></div>`;
  el.appendChild(p);
}
function messHud(){
  if (!M) return; const s = (Date.now() - M.t0) / 1000 | 0;
  $("#mhud").innerHTML = `🪟 ${M.pops} &nbsp; 🗂 ${M.tabs} tabs &nbsp; 🖼 ${M.files} files &nbsp; ✨ ${M.found}/${MART.length} &nbsp; ⏱ ${String(s / 60 | 0)}:${String(s % 60).padStart(2, "0")} <button id="mquit">leave the mess</button>`;
  $("#mquit").onclick = () => { clearInterval(M.iv); $("#mess").classList.remove("open"); goPlace("msn"); };
}
$("#mess").addEventListener("click", e => {
  if (!M || M.done) return;
  const pop = e.target.closest(".mpop");
  if (pop) {
    if (e.target.closest("#mtabx span")) { e.target.remove(); M.tabs--; tone([[1200,.03]], "square", .015); if (!M.tabs) { pop.remove(); M.pops--; } messHud(); messWin(); return; }
    if (e.target.dataset.closetabs) { spawnPop(["⚠", "Close 46 tabs?", "you are about to close 46 tabs. some of them were important. probably.", ["Close them"]]); const last = $("#mess").lastElementChild; last.dataset.killtabs = "1"; messHud(); return; }
    const b = e.target.closest("button"); if (!b) { pop.style.zIndex = 50 + M.pops; return; }
    if (pop.dataset.killtabs && b.textContent === "Close them") { const t = $("#mtabs"); if (t) { t.remove(); M.pops--; } M.tabs = 0; }
    if (b.textContent === "Maybe") { spawnPop(["❓", "Are you sure you're sure?", "maybe isn't an answer. or is it.", ["Yes", "Yes but sad"]]); }
    if (b.textContent === "No" && Math.random() < .5) { spawnPop(["🙃", "Okay", "then it stays open forever. (kidding. close me.)", ["Close"]]); }
    if (pop.id === "mtabs" && !b.classList.contains("x") && !b.dataset.closetabs) return;
    if (pop.id === "mtabs") M.tabs = 0;
    pop.remove(); M.pops--; tone([[660,.04]], "sine", .03); messHud(); messWin(); return;
  }
  const f = e.target.closest(".mfile");
  if (f && !f.classList.contains("gone")) {
    if (f.dataset.art !== undefined) {
      const a = MART[+f.dataset.art]; f.classList.add("gone"); M.found++;
      const fd = document.createElement("div"); fd.className = "found";
      fd.innerHTML = `<div class="card"><div class="ph">${a.e}</div><div class="cap">${esc(a.cap)}</div><div style="font:12px Tahoma;margin-bottom:8px">found: ${esc(a.t)}</div>${colBtn({t: a.t, k: "object", by: "", src: "the 2:13am desktop"}, "🎒 pocket it")} <button class="xp" data-closefound="1">keep cleaning</button></div>`;
      $("#mess").appendChild(fd); tone([[784,.08],[988,.08],[1319,.16]], "triangle", .05); messHud(); return;
    }
    const r = f.getBoundingClientRect(); f.style.setProperty("--bx", (innerWidth - 60 - r.left) + "px"); f.style.setProperty("--by", (innerHeight - 60 - r.top) + "px");
    f.classList.add("gone"); M.files--; tone([[300,.03],[200,.05]], "sine", .02); messHud(); messWin();
  }
  if (e.target.dataset.closefound || e.target.closest("[data-col]")) { const fd = e.target.closest(".found"); if (fd) setTimeout(() => { fd.remove(); messWin(); }, e.target.dataset.closefound ? 0 : 500); }
});
function messWin(){
  if (!M || M.done || M.pops > 0 || M.tabs > 0 || M.found < MART.length || document.querySelector("#mess .found")) return;
  M.done = true; clearInterval(M.iv); const s = (Date.now() - M.t0) / 1000 | 0;
  const fd = document.createElement("div"); fd.className = "found";
  fd.innerHTML = `<div class="card"><div class="ph">🧹✨</div><div class="cap">desktop clean. you're free.</div><div style="font:12px Tahoma;margin-bottom:8px">${M.files} files left, and that's fine. time: ${s / 60 | 0}:${String(s % 60).padStart(2, "0")}</div><button class="xp" id="mdone">back to the internet</button></div>`;
  $("#mess").appendChild(fd); wink("glitter"); award(30, "survived the 2:13am desktop"); badge("tidy"); XS.q.clean = 1; xsave(); questTick();
  $("#mdone").onclick = () => { $("#mess").classList.remove("open"); goPlace("msn"); };
}

/* ---------- ghost fm: a boombox that plays here, and doors to real radios ---------- */
const STATIONS = [
 ["NTS Radio", "London & beyond · two live channels, deep archive", "https://www.nts.live/"],
 ["Dublab", "Los Angeles · listener-supported, gentle and strange", "https://www.dublab.com/"],
 ["Worldwide FM", "global sounds, soul, jazz, everything between", "https://worldwidefm.net/"],
 ["Radio Alhara", "Palestine · a community radio born in 2020", "https://www.radioalhara.net/"],
 ["The Lot Radio", "Brooklyn · a shipping container with a mixer", "https://www.thelotradio.com/"],
 ["KEXP", "Seattle · indie, live sessions, deep cuts", "https://www.kexp.org/"]
];
const CRATES = [["dream pop", "1991"], ["trip hop deep cuts", "1996"], ["slowcore", "1994"], ["shoegaze b-sides", "1992"], ["arabic disco", "1980s"], ["french touch", "1998"], ["japanese city pop", "1984"], ["balearic chill-out", "1990s"], ["bedroom lo-fi", "1990s"], ["riot grrrl demos", "1993"], ["jungle dubplates", "1995"], ["bossa nova lounge", "1960s"]];
let FM = null;
function fmStart(){
  if (FM) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume();
    const out = ac.createGain(), lp = ac.createBiquadFilter(); out.gain.value = 0; out.gain.linearRampToValueAtTime(+($("#fmvol") || {value: .6}).value * .9, ac.currentTime + 1.5);
    lp.type = "lowpass"; lp.frequency.value = 2200; lp.connect(out); out.connect(ac.destination);
    const len = ac.sampleRate * 2, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() < .0006 ? 6 : 1);
    const hiss = ac.createBufferSource(), hg = ac.createGain(); hiss.buffer = buf; hiss.loop = true; hg.gain.value = .012; hiss.connect(hg).connect(lp); hiss.start();
    const CH = [[50, 54, 57, 61, 64], [47, 50, 54, 57, 61], [43, 47, 50, 54, 57], [45, 49, 52, 57, 59]];
    let ci = 0;
    const chord = () => {
      const t = ac.currentTime;
      CH[ci++ % CH.length].forEach((n, j) => { [0, 4].forEach(det => { const o = ac.createOscillator(), g = ac.createGain(); o.type = j % 2 ? "sine" : "triangle"; o.frequency.value = midi(n + 12); o.detune.value = det - 2; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.022, t + 1.4); g.gain.setValueAtTime(.022, t + 3.4); g.gain.linearRampToValueAtTime(0, t + 5.6); o.connect(g).connect(lp); o.start(t); o.stop(t + 5.8); }); });
    };
    const mel = () => {
      if (Math.random() < .55) { const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.value = midi(pick([74, 76, 78, 81, 83, 86])); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.03, t + .04); g.gain.exponentialRampToValueAtTime(.0001, t + 1.6); o.connect(g).connect(lp); o.start(t); o.stop(t + 1.7); }
    };
    chord(); FM = {out, hiss, iv: [setInterval(chord, 4000), setInterval(mel, 900)]};
    $(".boom").classList.add("on"); XS.q.fm = 1; xsave(); badge("dj"); questTick();
  } catch(_) { toast("the radio can't reach your speakers here."); }
}
function fmStop(){
  if (!FM) return; const f = FM; FM = null; f.iv.forEach(clearInterval);
  try { f.out.gain.linearRampToValueAtTime(0, ac.currentTime + .8); setTimeout(() => { try { f.hiss.stop(); f.out.disconnect(); } catch(_) {} }, 900); } catch(_) {}
  const b = $(".boom"); if (b) b.classList.remove("on");
}
function openRadio(){
  openWin("radio");
  if (!$("#radioBody").dataset.ok) {
    $("#radioBody").dataset.ok = 1;
    $("#radioBody").innerHTML = `<div class="boom"><div class="spk2"></div><div class="mid2"><div class="lcd">GHOST FM 88.4<small id="fmnow">tape: soft hours (side a)</small></div><div class="cass"><div class="reel"></div><div class="reel"></div></div>
      <div class="bctl"><button id="fmplay" title="play">▶</button><button id="fmstop" title="stop">■</button><input type="range" id="fmvol" min="0" max="1" step=".05" value=".6" title="volume"></div></div><div class="spk2"></div></div>
      <p class="muted" style="font-size:11px;margin:8px 2px">ghost fm plays right here: tape hiss, soft chords, a melody that never repeats. the real stations open in a new tab (this page can't play them inside).</p>
      <h4 style="margin:10px 0 4px">📡 tune in elsewhere</h4><div class="stns">${STATIONS.map(([n, d, u]) => `<div class="stn"><b>${esc(n)}</b><span class="muted">${esc(d)}</span><div><a href="${u}" target="_blank" rel="noopener">tune in ↗</a>${colBtn({t: n, k: "listen", by: "", src: "Ghost FM", url: u}, "🎒").replace('class="xp"', 'class="xp" style="font-size:10px;padding:1px 6px"')}</div></div>`).join("")}</div>
      <h4 style="margin:12px 0 4px">💿 the ghost's crates (soft gen x)</h4><div>${CRATES.map(([g, y]) => { const q = q1(`${g} ${y}`); return `<span class="crate">${esc(g)} <i class="muted">${esc(y)}</i><a href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">▶ yt</a><a href="https://open.spotify.com/search/${q}" target="_blank" rel="noopener">♫ spotify</a>${colBtn({t: `${g} (${y})`, k: "listen", by: "", src: "the ghost's crates"}, "🎒")}</span>`; }).join("")}</div>`;
    $("#fmplay").onclick = fmStart; $("#fmstop").onclick = fmStop;
    $("#fmvol").oninput = e => { if (FM) FM.out.gain.value = +e.target.value * .9; };
  }
}

/* ---------- letters: the ghost is your penpal ---------- */
const LETTERS = [
 {b: "dear you,\nit's 2:13am here (it's always 2:13am here). i found a cd wallet under the bed with nothing labelled. i played all 24. track 3 on disc 9 made me sit on the floor.\nwhat's a song you only remember the feeling of?", ps: ["dream pop", "1991"], a: "the cd wallet"},
 {b: "dear you,\ni've been rereading in praise of shadows by candlelight, which is cheating but also correct. everything looks better a little dim. including me. especially me.\ntell me about a room you loved that doesn't exist anymore.", ps: ["slowcore", "1994"], a: "In Praise of Shadows"},
 {b: "dear you,\ntoday's fit: bedsheet (archival), shield shades, one pearl i found in a coat pocket. i walked the museum twice. the lipstick phone still makes me emotional.\nwhat did you carry in your pocket at 15?", ps: ["trip hop deep cuts", "1996"], a: "the Nokia 7280"},
 {b: "dear you,\nsomeone buried 'the sound of the modem at night' in the archive and i haven't been the same. i keep hearing it in the fridge.\nwhat sound would you bury?", ps: ["japanese city pop", "1984"], a: "the dial-up sound"},
 {b: "dear you,\nthere's a radio in the corner of my world that only plays chords that never resolve. i like it that way. endings are overrated.\nwhat's playing in your room right now?", ps: ["balearic chill-out", "1990s"], a: "Ghost FM"},
 {b: "dear you,\ni counted 47 tabs in someone's browser tonight. i closed none of them. some things are load-bearing.\nwhat's the oldest tab you have open?", ps: ["french touch", "1998"], a: "47 tabs"}
];
function openLetter(i){
  const n = i == null ? (XS.letterI || 0) % LETTERS.length : i, L = LETTERS[n];
  const q = q1(`${L.ps[0]} ${L.ps[1]}`);
  $("#letterT").textContent = `letter #${n + 1} from the ghost`;
  $("#letterBody").innerHTML = `<div class="postcard"><div class="stampx">${ghostFit(["classic", "paris", "y2k", "club", "royal", "goth"][n % 6])}</div><div class="pm2">PAR AVION<br>2:13 AM<br>'04</div><div style="white-space:pre-line;padding-right:96px">${esc(L.b)}</div>
    <div class="ps">ps: listening to ${esc(L.ps[0])} (${esc(L.ps[1])}) on repeat → <a href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">▶ youtube</a> · <a href="https://open.spotify.com/search/${q}" target="_blank" rel="noopener">♫ spotify</a></div>
    <div class="ps">attached: ${esc(L.a)}</div><div>xx, the ghost</div>
    <div style="margin-top:12px;font:12px Tahoma,sans-serif" class="row">${colBtn({t: `${L.ps[0]} (${L.ps[1]})`, k: "listen", by: "", src: "a letter from the ghost"}, "🎒 pocket the song")}<button class="xp" data-open="chat:ghost">✍ write back</button><button class="xp" id="lnext">next letter ›</button></div></div>`;
  $("#lnext").onclick = () => openLetter((n + 1) % LETTERS.length);
  openWin("letter"); XS.q.letter = 1; xsave(); badge("penpal"); questTick();
}

/* ---------- quests + levels: the whole thing is a game ---------- */
const QUESTS = [
 ["🎒", "pocket 5 artifacts", () => Math.min(1, XS.stash.length / 5), "stash"],
 ["🌍", "talk to ghosts from 3 different worlds", () => Math.min(1, XS.q.cats.length / 3), "msn"],
 ["🧹", "survive the 2:13am desktop", () => XS.q.clean ? 1 : 0, "mess"],
 ["🖼", "walk through 4 museum wings", () => Math.min(1, XS.q.wings.length / 4), "gallery"],
 ["📻", "tune in to Ghost FM", () => XS.q.fm ? 1 : 0, "radio"],
 ["📮", "read a letter from the ghost", () => XS.q.letter ? 1 : 0, "letters"],
 ["⚰", "bury something in the archive", () => XS.q.bury ? 1 : 0, "arch"],
 ["🔗", "connect two things in your stash", () => XS.stash.some(s => s.links.length) ? 1 : 0, "stash"]
];
XS.qdone = XS.qdone || [];
function questTick(){
  QUESTS.forEach(([e, t, f], i) => { if (f() >= 1 && !XS.qdone.includes(i)) { XS.qdone.push(i); xsave(); setTimeout(() => { toast(`📜 quest complete: <b>${esc(t)}</b> +25 ⚡`, openQuests); award(25); tone([[523,.08],[659,.08],[784,.08],[1046,.2]], "square", .04); }, 600); } });
  if (XS.q.cats.length >= 3) badge("worlds"); if (XS.q.wings.length >= 4) badge("museum");
  paintPocket(); if (!$("#quests").classList.contains("hidden")) renderQuests();
}
const level = () => 1 + Math.floor(Math.sqrt(XS.pts / 25));
function renderQuests(){
  const lv = level(), next = Math.pow(lv, 2) * 25, prev = Math.pow(lv - 1, 2) * 25;
  $("#questBody").innerHTML = `<div class="row" style="gap:14px;margin-bottom:8px"><div class="lvbig">lv ${lv}</div><div style="flex:1"><div class="muted">${XS.pts} ⚡ · next level at ${next} ⚡</div><div class="qbar"><i style="width:${Math.min(100, (XS.pts - prev) / (next - prev) * 100)}%"></i></div></div></div>` +
    QUESTS.map(([e, t, f, go], i) => { const p = f(); return `<div class="qrow ${p >= 1 ? "done" : ""}"><span class="qe">${e}</span><div class="qb"><b>${esc(t)}</b><div class="qbar"><i style="width:${p * 100}%"></i></div></div>${p >= 1 ? "" : `<button class="xp" data-qgo="${go}">go</button>`}</div>`; }).join("") +
    `<p class="muted" style="font-size:11px">points also come from quizzes, the arcade, the journal and posting fits. they unlock closet pieces.</p>`;
}
$("#questBody").addEventListener("click", e => { const b = e.target.closest("[data-qgo]"); if (b) goPlace(b.dataset.qgo); });
function openQuests(){ renderQuests(); openWin("quests"); }
$("#aform").addEventListener("submit", () => { XS.q.bury = 1; xsave(); setTimeout(questTick, 800); });

/* ---------- wiring into the places bar ---------- */
function paintPocket(){ const b = $("#dkpocket b"); if (b) b.textContent = XS.stash.length; const l = $("#dklv"); if (l) l.textContent = "lv " + level(); }
$("#dkm").insertAdjacentHTML("beforebegin", `<button class="dk" data-go="radio" title="Ghost FM"><span class="e">📻</span><span class="l">radio</span></button>`);
$("#dkdate").insertAdjacentHTML("beforebegin", `<button class="dk" id="dkpocket" data-go="stash" title="my stash"><span class="e">🎒</span><span class="l">stash</span><b>0</b></button><button class="dk" data-go="quests" title="quests"><span class="e">📜</span><span class="l">quests</span></button><span id="dklv"></span><span class="dksep"></span>`);
const gl = document.querySelector('#dock [data-go="gallery"] .l'); if (gl) gl.textContent = "museum";
$("#dkmore").insertAdjacentHTML("afterbegin", `<button data-go="mess">🗂 2:13am desktop (game)</button><button data-go="letters">📮 letters</button>`);
const _ot4 = openThing;
openThing = function(k){
  if (k === "stash") return openStash();
  if (k === "radio") return openRadio();
  if (k === "quests") return openQuests();
  if (k === "letters") return openLetter();
  if (k === "mess") return openMess();
  return _ot4(k);
};
const _gp = goPlace;
goPlace = function(k){ if (k !== "mess") $("#mess").classList.remove("open"); _gp(k); };
paintPocket();
/* the ghost is a penpal with taste */
GHOSTCHAT.m.splice(GHOSTCHAT.m.length - 1, 0, "ps: i'm playing soft chords on the radio in the corner. come sit.", {place: "radio", t: "📻 Ghost FM 88.4"}, {place: "letters", t: "📮 i wrote you a letter"});
const _p3 = persona;
persona = function(c){
  let p = _p3(c);
  if (c.id === "ghost") p += `\nYou are also their penpal with taste: sometimes write like a letter ("dear you," / "xx, the ghost"). Drop one music rec when it fits (a genre + era + scene, like "dream pop, 1991" or "arabic disco, 80s"; never invent song titles) and one object, film or book to look up. Soft gen x mood: warm, a bit wistful, analogue.`;
  if (c.lens && c.cat && c.cat !== "ideas") p += `\nThis ghost is from the world of ${c.cat}. Talk about their real works and ideas (${(c.works || []).map(w => w[0]).join(", ")}); suggest what to read, watch or listen to next, so the person can pocket it.`;
  return p;
};
$("#lform").addEventListener("submit", () => {
  setTimeout(() => { toast("📮 you've got mail from the ghost", () => { XS.letterI = (XS.letterI || 0); openLetter(); XS.letterI++; xsave(); }); }, 14000);
});
