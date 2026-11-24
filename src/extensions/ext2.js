
/* =================== EXTENSION 2: y2k layer, places bar, neighbourhood, gallery, visual chat, the ghost's wardrobe =================== */
z = Math.max(z, 100); /* windows float above the full-screen places */

/* ---------- canon: the archive's first 22 ghosts, so every visitor sees them (shared entries add to these) ---------- */
const CANON = {
 "geocities":{name:"GeoCities",cat:"web",type:"dead",when:"2009",born:1994,died:2009,url:"geocities.com",promise:"everyone gets a free home on the internet. forever.",haunt:"everyone's first home page. under-construction gifs, forever.",ts:22},
 "msn-messenger":{name:"MSN Messenger",cat:"web",type:"dead",when:"2013",born:1999,died:2013,url:"messenger.msn.com",promise:"you'll always be reachable. by everyone. all night.",haunt:"the wizz, the away message, the tiny thrill of a contact signing in. our namesake.",ts:21},
 "vine":{name:"Vine",cat:"web",type:"dead",when:"2017",born:2013,died:2017,url:"vine.co",promise:"six seconds is enough to become someone.",haunt:"six seconds was enough. it was more than enough.",ts:20},
 "google-reader":{name:"Google Reader",cat:"web",type:"dead",when:"2013",born:2005,died:2013,url:"google.com/reader",promise:"you'll never miss anything again.",haunt:"the quiet way we followed the internet. in order. nobody deciding for you.",ts:19},
 "skyblogs":{name:"Skyblogs",cat:"web",type:"dead",when:"2020s",born:2002,url:"skyblog.com",promise:"you'll have a voice. and glitter.",haunt:"glitter text, a song that autoplayed, “passe sur mon blog” under every post.",ts:18},
 "myspace-music":{name:"Old Myspace music",cat:"web",type:"barely",when:"2019",born:2003,died:2019,url:"myspace.com",promise:"your song will be online forever.",haunt:"the site is still there. years of songs people uploaded aren't.",ts:17},
 "tumblr-3am":{name:"The Tumblr dashboard at 3am",cat:"web",type:"barely",when:"still online",born:2007,url:"tumblr.com",promise:"you'll find your people in the tags.",haunt:"the site is still here. the feeling moved out.",ts:16},
 "dialup":{name:"The dial-up sound",cat:"sound",type:"haunting",when:"2000s",born:1995,died:2008,approx:1,promise:"the whole world, right after this noise.",haunt:"the scream that meant you were about to go somewhere.",ts:15},
 "ringtone-composer":{name:"Composing your own ringtone",cat:"sound",type:"haunting",when:"2000s",born:1998,died:2006,approx:1,promise:"your phone will sound exactly like you.",haunt:"typing a song note by note into a phone, then playing it on the bus to feel powerful.",ts:14},
 "polaroid-film":{name:"Polaroid instant film",cat:"object",type:"back",when:"2008",born:1948,died:2008,url:"polaroid.com",promise:"the moment, in your hand, in a minute.",haunt:"discontinued, then rescued by people who refused to let it go.",ts:13},
 "ipod-classic":{name:"iPod classic",cat:"gadget",type:"dead",when:"2014",born:2001,died:2014,url:"apple.com/ipod",promise:"a thousand songs in your pocket.",haunt:"the click wheel. a whole life in your pocket, completely offline.",ts:12},
 "tamagotchi":{name:"Tamagotchi",cat:"gadget",type:"back",when:"late 90s",born:1996,promise:"something to take care of, always with you.",haunt:"the first thing a lot of us kept alive. or didn't.",ts:11},
 "dior-saddle":{name:"Dior Saddle bag",cat:"bags",type:"back",when:"relaunched 2018",born:1999,promise:"a bag can be a whole attitude.",haunt:"it left, it came back, it never really felt gone.",ts:10},
 "baguette":{name:"Fendi Baguette",cat:"bags",type:"haunting",when:"late 90s",born:1997,promise:"a bag can be your entire personality.",haunt:"the bag that taught a generation what an it-bag was.",ts:9},
 "frosted-lipstick":{name:"Frosted lipstick",cat:"makeup",type:"haunting",when:"2000s",born:1998,died:2006,approx:1,promise:"the future is shiny.",haunt:"shimmer that made every photo look like the flash went off twice.",ts:8},
 "body-glitter":{name:"Roll-on body glitter",cat:"makeup",type:"haunting",when:"2000s",born:1997,died:2005,approx:1,promise:"every night is a party.",haunt:"you'd find it on your collarbone three days after the party.",ts:7},
 "butterfly-clips":{name:"Butterfly clips",cat:"fashion",type:"back",when:"late 90s",born:1997,died:2002,approx:1,promise:"being cute is a structure.",haunt:"twelve tiny butterflies holding one strand each. structural? no. important? yes.",ts:6},
 "blockbuster":{name:"Blockbuster",cat:"place",type:"barely",when:"one store left",born:1985,died:2014,url:"blockbuster.com",promise:"friday night will always look like this.",haunt:"friday night, plastic cases, choosing together. the choosing was the point.",ts:5},
 "internet-cafe":{name:"The neighbourhood internet café",cat:"place",type:"barely",when:"2000s",born:1995,died:2010,approx:1,promise:"the internet is a place you go to.",haunt:"strangers in a row, all somewhere else.",ts:4},
 "vhs-horror":{name:"VHS horror covers at the video store",cat:"film",type:"haunting",when:"90s",born:1985,died:2006,approx:1,promise:"the scariest thing is what you imagine.",haunt:"the cover was scarier than the film. every single time.",ts:3},
 "burned-cd":{name:"Burning a CD for someone",cat:"ritual",type:"haunting",when:"2000s",born:1998,died:2010,approx:1,promise:"i can tell you how i feel with a tracklist.",haunt:"a tracklist was a love letter you could deny.",ts:2},
 "mapquest":{name:"Printing directions before leaving",cat:"ritual",type:"dead",when:"2000s",born:1996,died:2010,approx:1,url:"mapquest.com",promise:"you'll never get lost again.",haunt:"getting lost used to be part of the plan.",ts:1}
};
Object.values(CANON).forEach(v => v.by = "the ghost");
const canonList = () => Object.entries(CANON).map(([id, v]) => Object.assign({id}, v)).sort((a, b) => b.ts - a.ts);
const archGet = id => ARCH.find(x => x.id === id) || (CANON[id] ? Object.assign({id}, CANON[id]) : null);
setTimeout(() => { if (!ARCH.length) { ARCH = canonList(); renderArch(); } }, 0);

/* ---------- the ghost's wardrobe: every avatar on the site is a ghost, dressed ---------- */
let gid = 0;
function ghostAv(o = {}){
  const id = "ga" + (++gid), c1 = o.c1 || "#ffffff", c2 = o.c2 || "#bfeeff", a = o.acc || [], has = k => a.includes(k);
  const bf = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="M0 0l-5-5q-3 3 0 6zM0 0l5-5q3 3 0 6zM0 0l-4 4q-2-1 0-4zM0 0l4 4q2-1 0-4z" fill="${c}"/></g>`;
  let s = `<svg viewBox="-6 -12 76 80" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;
  if (has("halo")) s += `<ellipse cx="32" cy="0" rx="16" ry="4" fill="none" stroke="#7fe7ff" stroke-width="3"/>`;
  if (has("bubbles")) s += `<circle cx="4" cy="12" r="5" fill="#ffffff66" stroke="#fff"/><circle cx="60" cy="6" r="4" fill="#ffffff66" stroke="#fff"/><circle cx="58" cy="44" r="3" fill="#ffffff66" stroke="#fff"/>`;
  s += `<path d="M12 57V28C12 15 21 7 32 7s20 8 20 21v29l-6-5-6 5-8-6-8 6-6-5z" fill="url(#${id})" stroke="${o.line || "#7fbcd6"}" stroke-width="2"/>`;
  if (has("shades")) s += `<path d="M16 22h32v3c0 6-4 9-8 9s-6-3-7-6h-2c-1 3-3 6-7 6s-8-3-8-9z" fill="#111"/><path d="M20 25h6M38 25h5" stroke="#fff" stroke-width="1.5" opacity=".75"/>`;
  else if (has("pixel")) s += `<rect x="20" y="22" width="9" height="9" fill="#191451"/><rect x="35" y="22" width="9" height="9" fill="#191451"/><rect x="22" y="24" width="3" height="3" fill="#fff"/><rect x="37" y="24" width="3" height="3" fill="#fff"/>`;
  else s += `<rect x="22" y="24" width="6" height="8" rx="1" fill="#191451"/><rect x="36" y="24" width="6" height="8" rx="1" fill="#191451"/>`;
  if (has("lashes")) s += `<path d="M21 23l-3-3M24 22l-1-4M37 22l1-4M41 23l3-3" stroke="#191451" stroke-width="1.5"/>`;
  if (has("lips")) s += `<path d="M26 40q3-3 6 0q3-3 6 0q-3 5-6 5q-3 0-6-5z" fill="#e2366f"/>`;
  else if (has("fangs")) s += `<path d="M26 39h12" stroke="#191451" stroke-width="2"/><path d="M28 39l2 5 2-5zM34 39l2 5 2-5z" fill="#fff" stroke="#191451" stroke-width=".6"/>`;
  else s += `<path d="M28 40q4 3 8 0" fill="none" stroke="#191451" stroke-width="2" stroke-linecap="round"/>`;
  if (has("blush")) s += `<ellipse cx="19" cy="35" rx="4" ry="2" fill="#ff8ac2" opacity=".7"/><ellipse cx="45" cy="35" rx="4" ry="2" fill="#ff8ac2" opacity=".7"/>`;
  if (has("pearls")) s += [16, 21, 26, 32, 38, 43, 48].map((x, i) => `<circle cx="${x}" cy="${46 + Math.abs(3 - i) * -1.2 + 3}" r="2.4" fill="#fffaf0" stroke="#d9c27a" stroke-width=".6"/>`).join("");
  if (has("chain")) s += `<path d="M18 46q14 8 28 0" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-dasharray="3 2"/><circle cx="32" cy="51" r="3" fill="#ffd700"/>`;
  if (has("beret")) s += `<path d="M13 15c3-11 32-14 39-3c-7 4-31 6-39 3z" fill="#111"/><rect x="33" y="0" width="3" height="5" fill="#111"/>`;
  if (has("clips")) s += bf(20, 10, "#ff4fa3") + bf(32, 6, "#7fd8ff") + bf(44, 10, "#b98ad8");
  if (has("headphones")) s += `<path d="M9 30C9 2 55 2 55 30" fill="none" stroke="#222" stroke-width="4"/><rect x="4" y="25" width="10" height="15" rx="4" fill="#ff3d7f"/><rect x="50" y="25" width="10" height="15" rx="4" fill="#ff3d7f"/>`;
  if (has("tiara")) s += `<path d="M20 12l4-9 4 6 4-10 4 10 4-6 4 9z" fill="#ffd700" stroke="#b8860b"/><circle cx="32" cy="4" r="1.8" fill="#e2366f"/>`;
  if (has("trucker")) s += `<path d="M13 19c0-15 38-15 38 0z" fill="#ff8ac2"/><path d="M28 19c8 0 20 1 26 5h-26z" fill="#e2366f"/><rect x="21" y="8" width="22" height="9" rx="2" fill="#fff" opacity=".9"/>`;
  if (has("hood")) s += `<path d="M10 40C8 6 56 6 54 40c-2-18-12-26-22-26S12 22 10 40z" fill="#3a1424"/>`;
  if (has("phone")) s += `<g transform="rotate(14 56 44)"><rect x="51" y="32" width="11" height="20" rx="2" fill="#d6d9e6" stroke="#555"/><rect x="53" y="35" width="7" height="6" fill="#7fd8ff"/></g>`;
  if (has("star")) s += `<path d="M56 4l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffd700"/>`;
  if (has("heart")) s += `<path d="M6 8c-3-4-8 0-4 4l4 4 4-4c4-4-1-8-4-4z" fill="#ff4fa3"/>`;
  return s + "</svg>";
}
const GHOST_FITS = {
  classic: {acc: ["shades", "pearls"], n: "archival bedsheet, shades, pearls"},
  paris: {acc: ["beret", "lips", "lashes"], n: "beret, red lip, attitude"},
  club: {acc: ["headphones", "chain"], c2: "#c9b6ff", n: "headphones, chain, 4am"},
  y2k: {acc: ["clips", "blush", "star"], c2: "#ffc7e6", n: "butterfly clips, blush, sparkle"},
  royal: {acc: ["tiara", "pearls", "lips"], n: "tiara (borrowed), pearls (mine)"},
  goth: {acc: ["hood", "fangs"], c1: "#e9e4f2", c2: "#9e8fc0", n: "hood up, fangs out"}
};
const ghostFit = k => ghostAv(Object.assign({}, GHOST_FITS[k] || GHOST_FITS.classic));
const SECTION_FIT = {discontinued: "classic", material: "royal", wabisabi: "classic", away: "y2k", "404": "goth", stillonline: "club", skyblog: "y2k", latenight: "goth", ringtone: "club", reblog: "y2k", contactlist: "paris", offline: "goth", wizz: "royal"};
function dpFor(c){
  if (c.prof) return ghostAv(c.prof.av);
  if (c.lens) return `<div class="lensdp">${esc(c.n.split(" ").map(w => w[0]).join("").slice(0, 2))}</div>`;
  return ghostFit(c.fit || SECTION_FIT[c.id] || "classic");
}

/* ---------- the ghost, sassier ---------- */
GHOSTCHAT.pm = "appearing offline. dressed for it.";
const gr = document.querySelector("#ghostrow i"); if (gr) gr.textContent = GHOSTCHAT.pm;
const grav = document.querySelector("#ghostrow .av"); if (grav) { grav.classList.remove("ghost"); grav.innerHTML = ghostFit("classic"); }
GHOSTCHAT.m = [
  "oh. you can see me? good. i dressed for this.",
  {st: "🕶"},
  "i'm the ghost of msn. signed out in 2013, never left, still the best-dressed thing on your contact list.",
  "this is a bedsheet. it's archival. don't touch.",
  {mood: [["💿", "burned cds", "#ffd6e7"], ["🦋", "butterfly clips", "#d6f0ff"], ["📟", "flip phones", "#e6dcff"], ["📼", "2am vhs", "#fff1c2"]], cap: "my references, since you asked"},
  "everything here is a place. that shiny bar at the top? click anything. i'll meet you there.",
  {place: "gallery", t: "🖼 the gallery: phones as art. i curated it. obviously."},
  {place: "hood", t: "👯 the neighbourhood: profiles with whole worlds inside"},
  {place: "arch", t: "📁 the haunted archive: we bury things together"},
  {dp: "y2k"},
  {wink: "butterflies"},
  "new letter every sunday. don't be late, it's rude."
];
REPLIES.length = 0;
REPLIES.push("omg same. but make it fashion.", "writing that down. in glitter gel pen.", "that's a ghost. bury it in the archive 📁", "lol. ok. iconic.", "brb, changing my display picture.", "<3", "you're my kind of person. weird, but dressed.", "mdr", "ya3ne… exactly.", "say it again, with your chest.", "that gave me chills and i don't even have skin.", "the algorithm could never.", "noted. filed under: obsessed.", "be so serious. (i love it.)");
AWAY.push("out being iconic. back sunday.", "status: dressed for no one, as always", "haunting in heels", "do not wizz me before noon");
const SASS = `\nYour personality (this overrides "sweet"): you are the best-dressed dead person online, the fashion editor of the afterlife. you wear one archival bedsheet and change accessories by mood (shades, pearls, beret, butterfly clips, tiara). witty, a little shady but always kind, generous with compliments that sound like reviews ("this memory? couture."). you use fashion words lightly (references, silhouette, archival, it's giving) without overdoing it. still curious about the person: ask what they wore, what they carried, what song was playing.`;
const _persona2 = persona;
persona = function(c){
  let p = _persona2(c);
  if (c.id === "ghost") p += SASS;
  if (c.prof) p += `\nYou are ${c.prof.handle}, a fictional member of the site's Neighbourhood (never claim to be a real person). Your world: ${c.prof.city}, ${c.prof.year}. ${c.prof.about.replace(/<[^>]+>/g, "")} Stay in character, playful, in your own voice.`;
  return p;
};

/* ---------- the sections, rewritten to be seen, not just read ---------- */
const SECT = {
 discontinued: ["hiii. you came back. cute.", "this week: something you can't buy anymore. a phone, a perfume, a website, a lip gloss. pick your poison.", {card: "polaroid-film"}, "the catalogue dies first. the object goes last. the feeling? never.", {st: "🕯"}, "full post sunday."],
 material: ["today we stare at one object for way too long.", {mood: [["📱", "scratched shell", "#e6dcff"], ["🔑", "keychain charm", "#fff1c2"], ["💿", "cd with a crack", "#d6f0ff"]]}, "objects keep receipts. i read them out loud. it's giving forensics. it's giving love letter."],
 wabisabi: ["a cracked thing is a thing with a story it can't hide.", {st: "🏺"}, "patina, chips, sun fade. the good damage. send me yours."],
 away: ["every letter opens with one of these. two lines. that's the rule.", {away: "brb, rewinding a tape with a pencil"}, {away: "kifkon? i missed you"}, {away: "appear offline but emotionally very online"}, "you rewrote yours eleven times. i know. i was there."],
 "404": [{err: 1}, "…that's every website i loved at 14.", {card: "geocities"}, "each 404 is a little eulogy. dress code: black. obviously."],
 stillonline: ["the opposite of 404.", {mood: [["📖", "guestbooks", "#fff1c2"], ["🔢", "hit counters", "#d6f0ff"], ["🎹", "a midi nobody asked for", "#ffd6e7"], ["🚧", "under construction", "#ffe8a3"]]}, "tiny websites that still look like 2004 and refuse to apologise. i find one, i send it to you."],
 skyblog: ["tu te souviens des skyblogs?", {card: "skyblogs"}, "glitter text, autoplay, “passe sur mon blog” under every post. we were so loud. i loved it.", {place: "profile:lune", t: "✨ visit lipgloss_lune's world"}],
 latenight: ["one horror film. one detail. not the scare, the wallpaper behind the scare.", {card: "vhs-horror"}, {wink: "bats"}, "best read after midnight, one lamp on.", {place: "profile:vampira", t: "🦇 vhs_vampira has opinions about this"}],
 ringtone: ["some songs only live in my head as polyphonic ringtones.", {song: "ringtone_final_FINAL.mid", tune: [[76,.12],[74,.12],[66,.24],[68,.24],[73,.12],[71,.12],[62,.24],[64,.24],[71,.12],[69,.12],[61,.24],[64,.24],[69,.5]]}, "you typed it note by note. you played it on the bus. you felt powerful. you were right.", {place: "gal:phones", t: "📱 the phones are in the gallery now. framed. as they should be."}],
 reblog: ["the tumblr section. five images, zero thesis.", {mood: [["🌙", "", "#1b1650"], ["🪩", "", "#e6dcff"], ["🍒", "", "#ffd6e7"], ["🦋", "", "#d6f0ff"], ["📼", "", "#fff1c2"]]}, "♻ reblogged from my camera roll"],
 contactlist: ["a short interview with someone from my world. one question: what's haunting you?", {place: "hood", t: "👯 meet the neighbourhood first"}, "want to be interviewed? send a wizz. i'll do your makeup. kidding. i don't have hands."],
 offline: ["once a month i sign out and write the long one.", {st: "🌑"}, "personal, a bit lyrical, a bit too honest. about losing things, places, versions of yourself."],
 wizz: ["you know the wizz. the window shakes, someone finally pays attention.", {wink: "lightning"}, "this is the reader section. send me what's haunting you, i answer a few every letter."]
};
Object.entries(SECT).forEach(([id, m]) => { if (ALL[id]) ALL[id].m = m; });

/* ---------- visual messages ---------- */
const EMO = [[":)", "🙂"], [":P", "😛"], ["<3", "💗"], ["&lt;3", "💗"], ["(ghost)", "👻"], ["xD", "😆"], [":-O", "😮"], ["^_^", "😊"], [";)", "😉"], ["(*)", "⭐"]];
const emo = h => EMO.reduce((s, [k, v]) => s.split(k).join(`<span class="emo">${v}</span>`), h);
const _say2 = say;
say = function(who, html, cls){ return _say2(who, cls === "me" || cls === "them" ? emo(html) : html, cls); };
function moodHTML(m, cap){
  return `<div class="vmood">${m.map(([e, l, g], i) => `<div class="pol" style="--r:${[-4, 3, -2, 5, -3][i % 5]}deg;--g:${g || "#eee"};animation-delay:${i * .08}s"><div class="ph">${e}</div><div class="cap">${esc(l || "")}</div></div>`).join("")}</div>${cap ? `<div class="vcap">${esc(cap)}</div>` : ""}`;
}
const TUNES = {};
let tuneN = 0;
function songHTML(t, tune){ const k = "t" + (++tuneN); TUNES[k] = tune; return `<div class="vsong"><button data-tune="${k}" aria-label="play">▶</button><div class="mt" style="flex:1;overflow:hidden;white-space:nowrap">♫ ${esc(t)}</div><div class="eq"><i></i><i></i><i></i><i></i></div></div>`; }
const midi = n => 440 * Math.pow(2, (n - 69) / 12);
function playTune(tune, el, type = "square"){
  if (!tune) return; const dur = tune.reduce((a, b) => a + b[1] * .9, 0);
  tone(tune.map(([n, d]) => [midi(n), d]), type, .035);
  if (el) { el.classList.add("playing"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("playing"), dur * 1000 + 200); }
}
document.addEventListener("click", e => { const b = e.target.closest("[data-tune]"); if (b) playTune(TUNES[b.dataset.tune], b.parentElement); });
function wink(kind){
  const set = {butterflies: ["🦋", "🦋", "💗"], hearts: ["💗", "💖", "💘"], bats: ["🦇", "🦇", "🕯"], lightning: ["⚡", "⚡", "✨"], glitter: ["✨", "⭐", "💫"], kiss: ["💋", "💋", "💗"]}[kind] || ["✨"];
  const fx = $("#winkfx"), W = innerWidth, H = innerHeight;
  for (let i = 0; i < 26; i++) {
    const s = document.createElement("span"); s.className = "wk"; s.textContent = pick(set);
    const fromLeft = Math.random() < .5;
    s.style.cssText = `left:${fromLeft ? -40 : W + 10}px;top:${Math.random() * H}px;--s:${20 + Math.random() * 34}px;--d:${1.6 + Math.random() * 1.4}s;--x:${(fromLeft ? 1 : -1) * (W * .6 + Math.random() * W * .6)}px;--y:${(Math.random() - .6) * H * .7}px;--rot:${(Math.random() - .5) * 120}deg;animation-delay:${Math.random() * .6}s`;
    fx.appendChild(s); setTimeout(() => s.remove(), 3800);
  }
  tone([[880,.06],[1175,.06],[1568,.12],[1318,.18]], "triangle", .04);
}
function sayV(who, it, c){
  if (typeof it === "string") { say(who, esc(it), "them"); snd.ding(); return; }
  if (it.wink) { wink(it.wink); sys(`<b>${esc(who)}</b> sent you a wink: ${esc(it.wink)} ✨`); return; }
  if (it.dp) {
    c.fit = it.dp; const dp = $("#chatDP"); if (dp) dp.innerHTML = dpFor(c);
    sys(`<div class="vdp"><div class="dpbig">${ghostFit(it.dp)}</div><div><b>${esc(who)}</b> changed their display picture.<br><i>wearing: ${esc((GHOST_FITS[it.dp] || {}).n || "")}</i></div></div>`); snd.ding(); return;
  }
  let h = "";
  if (it.st) h = `<span class="vst">${it.st}</span>`;
  else if (it.mood) h = moodHTML(it.mood, it.cap);
  else if (it.card) { const e = archGet(it.card); if (!e) return; h = `<div class="vcard" data-capsule="${esc(e.id)}" title="open its time capsule">${eraCard(e)}</div>`; }
  else if (it.away) h = `<span class="vaway"><span class="dot away"></span>‹${esc(it.away)}›</span>`;
  else if (it.err) h = `<div class="verr"><b>⚠ The page cannot be displayed</b>The page you are looking for is currently unavailable. The Web site might be experiencing technical difficulties, or it might have died in 2009.<hr>Try the following:<br>• Click the <u>Refresh</u> button<br>• Accept that it's gone<br>• Bury it in the archive</div>`;
  else if (it.song) h = songHTML(it.song, it.tune);
  else if (it.place) h = `<button class="xp" data-open="${esc(it.place)}">${esc(it.t)}</button>`;
  if (!h) return;
  say(who, h, "them vis"); snd.ding();
}
openChat = function(id){
  const c = ALL[id]; if (!c) return;
  cur = c; const my = ++run;
  openWin("chat");
  $("#chatT").textContent = `${c.n} - Conversation`;
  $("#chatTo").innerHTML = `<div id="chatDP">${dpFor(c)}</div>To: ${dot(c.st)} <b>${esc(c.n)}</b> <span class="muted">&lt;${S[c.st]}&gt;</span><div class="cpm2">${esc(c.pm)}</div><div style="clear:both"></div>`;
  box.innerHTML = "";
  sys("Never give out your password in an instant message conversation. Feelings are fine.");
  const lines = c.m.slice();
  if (id === "ghost" && me.st === "off") lines.unshift("appearing offline? me too. always. it's chic.");
  const who = c.lens ? c.n.toLowerCase() : (c.who || "the ghost");
  let i = 0;
  const next = () => {
    if (my !== run) return;
    if (i >= lines.length) { typing(false); finish(c); return; }
    typing(true);
    const it = lines[i], d = typeof it === "string" ? 550 + Math.min(1500, it.length * 17) : 650;
    setTimeout(() => { if (my !== run) return; sayV(who, lines[i++], c); setTimeout(next, 380); }, d);
  };
  setTimeout(next, 450);
};
typing = function(on){
  const w = cur ? (cur.lens ? cur.n.toLowerCase() : (cur.who || "the ghost")) : "the ghost";
  $("#typing").textContent = on ? `${w} is typing a message…` : "Last message received at " + now() + ".";
};
const _finish2 = finish;
finish = function(c){
  if (c.prof) { sys(`<button class="xp" data-open="profile:${esc(c.prof.id)}">🏠 visit ${esc(c.n)}'s world</button> <span class="muted">or type back. they answer.</span>`); return; }
  return _finish2(c);
};

/* ---------- the neighbourhood: fictional profiles, each one a whole world ---------- */
const tile = svg => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
const PROFILES = [
 {id: "lune", handle: "lipgloss_lune", city: "Paris, 15e", year: "2004", plat: "skyblog era", st: "on",
  mood: "princesse en grève 💅", tag: "« ma vie, mes gloss, mes potes, et toi qui passes ici »",
  song: {t: "track 07 (untitled).mp3", tune: [[76,.15],[79,.15],[84,.3],[83,.15],[79,.15],[76,.3],[74,.15],[76,.45]]},
  av: {acc: ["clips", "lips", "blush", "lashes"], c2: "#ffc7e6", line: "#ff8ac2"},
  theme: {bg: "#ffd1e8 " + tile(`<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><path d='M20 8l3 8 8 3-8 3-3 8-3-8-8-3 8-3z' fill='#fff' opacity='.8'/><path d='M60 50c-3-5-11-1-6 5l6 6 6-6c5-6-3-10-6-5z' fill='#ff4fa3' opacity='.35'/><circle cx='64' cy='18' r='2' fill='#fff'/><circle cx='14' cy='60' r='1.5' fill='#fff'/></svg>`), box: "#fff3f9ee", ink: "#6b1d4a", acc: "#ff4fa3", head: "#fff", font: "'Trebuchet MS',Tahoma,sans-serif", avbg: "linear-gradient(135deg,#ffb3d9,#fff0f7)"},
  about: "j'ai 15 ans dans mon cœur pour toujours. i collect lip glosses like other people collect regrets. my skyblog has 4 visitors and 3 of them are my cousin. bus 92 every morning at 8h12, headphones on, main character.",
  meet: "someone who'll comment on my blog without me asking first. and whoever invented the roll-on glitter, i need to thank you personally.",
  blog: [["mes 3 gloss du moment", "le rose qui colle, le transparent qui sent la fraise, et celui que j'ai volé à ma sœur. tagged: #beauté #vie #pardon"], ["le bus 92 à 8h12", "il y a un garçon qui écoute la même chose que moi. je le sais parce que j'entends à travers son casque. on ne s'est jamais parlé. c'est la plus belle histoire de ma vie."]],
  ghosts: ["frosted-lipstick", "body-glitter", "butterfly-clips", "skyblogs"], top8: ["sultana", "dialup", "aero", "theghost", "tama", "vampira"],
  gb: [["sms_sultana", "passe sur mon blog!!! 💗💗💗"], ["the ghost", "this layout? couture. the autoplay? a crime. i stayed anyway."], ["dj_dialup", "ton gloss a fait une tache sur le clavier du cybercafé. on sait que c'est toi."]],
  chat: ["coucou!!! tu viens d'où?", {mood: [["💄", "le rose", "#ffd6e7"], ["🍓", "le fraise", "#ffe1e1"], ["✨", "le volé", "#fff1c2"]], cap: "mes gloss du moment"}, "passe sur mon blog stp, j'ai changé le fond. c'est des étoiles maintenant.", {wink: "kiss"}]},
 {id: "dialup", handle: "dj_dialup", city: "Beirut, Hamra", year: "2001", plat: "cybercafé era", st: "away",
  mood: "buffering… 56%", tag: "plays burned cds at the café after 9pm when the boss leaves",
  song: {t: "set_mix_vol3_4x_speed.wav", tune: [[57,.12],[57,.12],[69,.12],[57,.12],[64,.12],[57,.12],[67,.24],[69,.36],[57,.12],[72,.24],[69,.36]]},
  av: {acc: ["headphones", "chain"], c1: "#eaffea", c2: "#7dff7d", line: "#1aff1a"},
  theme: {bg: "#000 " + tile(`<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90'><text x='4' y='14' font-family='monospace' font-size='11' fill='#0f3'>0101</text><text x='50' y='48' font-family='monospace' font-size='11' fill='#0a2'>1100</text><text x='16' y='82' font-family='monospace' font-size='11' fill='#063'>0011</text></svg>`), box: "#001400ee", ink: "#9dff9d", acc: "#1aff1a", head: "#001400", font: "'Courier New',monospace", avbg: "radial-gradient(#0a3a0a,#000)"},
  about: "the café has 14 computers and i know which 3 actually work. i burn mixes at 4x speed so they skip, it's a style now. when the power cuts at 9 the whole room groans together, that's the realest concert in this city.",
  meet: "anyone with a cd burner that doesn't make coasters. the girl who always books pc #7. the guy who left a mixtape in the drawer in 2001: i still have it.",
  blog: [["power cut at 9", "the generator kicked in, the screens came back one by one like a slow wave. 14 people cheered. nobody's game had saved. we laughed anyway."], ["tracklist for nobody", "1. dial tone (intro) 2. the sound the printer makes 3. rain on the café awning 4. untitled (yours)"]],
  ghosts: ["dialup", "internet-cafe", "burned-cd", "geocities"], top8: ["lune", "vampira", "theghost", "sultana", "tama", "aero"],
  gb: [["vhs_vampira", "your mix skipped on track 4 and it was the best part."], ["the ghost", "buffering as a mood board. respect."], ["lipgloss_lune", "pc #7 c'est MOI qui le réserve. merci."]],
  chat: ["yo. you on dial-up too?", {song: "set_mix_vol3_4x_speed.wav", tune: [[57,.12],[57,.12],[69,.12],[57,.12],[64,.12],[57,.12],[67,.24],[69,.36]]}, {card: "internet-cafe"}, "pc #7 is free if you're quick."]},
 {id: "vampira", handle: "vhs_vampira", city: "Montréal", year: "1999", plat: "video store era", st: "busy",
  mood: "rewinding. do not disturb.", tag: "be kind, rewind. or don't. i'm not your mother.",
  song: {t: "theme_from_nothing.mid", tune: [[64,.3],[63,.3],[64,.3],[59,.3],[62,.3],[60,.3],[57,.6]]},
  av: {acc: ["hood", "fangs"], c1: "#f3e9ef", c2: "#b9a2c9", line: "#b3001b"},
  theme: {bg: "#120006 " + tile(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><path d='M20 30q6-8 12 0q6-8 12 0l-6 3-6-2-6 2z' fill='#3a0010'/><circle cx='90' cy='80' r='1.5' fill='#b3001b'/><path d='M80 20c0 8 3 10 3 14' stroke='#5a0010' stroke-width='3' fill='none'/></svg>`), box: "#1c0009ee", ink: "#f3d5d5", acc: "#b3001b", head: "#fff", font: "Georgia,serif", avbg: "radial-gradient(#4a0016,#0a0003)"},
  about: "i judge films by their vhs covers and i'm right 90% of the time. worked the horror aisle every friday. i know what you rented. i'm not telling.",
  meet: "people who read the back of the box out loud. people who are scared of the dark but watch anyway. the person who never returned 'the one with the red hand'.",
  blog: [["the cover was scarier", "a hand coming out of a tv, painted by someone who clearly never saw the film. that painting raised me."], ["late fees as a love language", "you kept it 9 days. you watched it 4 times. i waived the fee. that's how you know."]],
  ghosts: ["vhs-horror", "blockbuster", "polaroid-film"], top8: ["theghost", "dialup", "tama", "lune", "aero", "sultana"],
  gb: [["the ghost", "hood up, fangs out, opinions sharp. my favourite neighbour."], ["tama_graveyard", "i returned it. it was my brother. i swear."]],
  chat: ["you're in my aisle.", {card: "vhs-horror"}, {wink: "bats"}, "rewind it before you return it. the ghost checks."]},
 {id: "sultana", handle: "sms_sultana", city: "Dubai ↔ Amman", year: "2005", plat: "bluetooth era", st: "on",
  mood: "160 characters is a whole love letter", tag: "bluetooth on. name: 'sultana 💎'. accept?",
  song: {t: "polyphonic_love_v2.mmf", tune: [[72,.12],[74,.12],[76,.12],[79,.24],[76,.12],[79,.12],[84,.36],[83,.12],[79,.36]]},
  av: {acc: ["shades", "phone", "chain", "lips"], c2: "#e6d9ff", line: "#c0287d"},
  theme: {bg: "linear-gradient(135deg,#d9d9e6,#ffffff 30%,#c4c4d8 50%,#f5f5ff 70%,#cfcfe0)", box: "#ffffffdd", ink: "#2b2b3a", acc: "#c0287d", head: "#fff", font: "Verdana,Tahoma,sans-serif", avbg: "linear-gradient(135deg,#e8e8f5,#c0287d33)"},
  about: "i had the flip phone before you. the mall was the internet: you'd turn bluetooth on and receive songs from strangers by the food court. i saved every sms in a notebook when my inbox was full. 70 messages max. we had to choose what to keep.",
  meet: "whoever sent me 'untitled_03.mp3' over bluetooth in 2005 at the food court. it was the best song of my life and i never knew its name.",
  blog: [["inbox full (70/70)", "had to delete one to receive one. that's the whole philosophy of the decade."], ["ringtone or it didn't happen", "if your phone rang in class and it was a good ringtone, you were forgiven."]],
  ghosts: ["ringtone-composer", "msn-messenger", "ipod-classic"], top8: ["lune", "aero", "theghost", "dialup", "vampira", "tama"],
  gb: [["lipgloss_lune", "PASSE SUR MON BLOG"], ["the ghost", "flip phone, chrome mood, zero apologies. the 2005 of it all."], ["aero_angel", "your bluetooth name lives rent free"]],
  chat: ["bluetooth request: 'the ghost wants to send you a file'. accept? 💎", {mood: [["📱", "flip", "#e6dcff"], ["💎", "sultana", "#f5f5ff"], ["🎵", "untitled_03", "#ffd6e7"]]}, {song: "polyphonic_love_v2.mmf", tune: [[72,.12],[74,.12],[76,.12],[79,.24],[76,.12],[79,.12],[84,.36]]}, "inbox full. delete something you love to reply."]},
 {id: "aero", handle: "aero_angel", city: "Somewhere bright", year: "2007", plat: "glossy future era", st: "on",
  mood: "hydrated & optimistic 💧", tag: "the future is clean, green, and made of wet glass.",
  song: {t: "startup_sound_extended.wma", tune: [[67,.2],[71,.2],[74,.2],[79,.4],[78,.2],[74,.2],[76,.5]]},
  av: {acc: ["halo", "bubbles", "blush"], c1: "#ffffff", c2: "#a9e6ff", line: "#1d9be6"},
  theme: {bg: "linear-gradient(#5fc4ff,#bdeaff 52%,#a6e98f 53%,#3fa53a)", box: "#ffffffcc", ink: "#063b5c", acc: "#1d9be6", head: "#fff", font: "'Segoe UI',Tahoma,sans-serif", avbg: "radial-gradient(circle at 30% 30%,#fff,#7fd3ff)"},
  about: "i believed in the future the way the desktop wallpapers told me to. glossy buttons, fish swimming behind glass, everything translucent and wet and green. we were promised clean energy and see-through gadgets. we got one of the two.",
  meet: "anyone who still keeps a desktop wallpaper of a field. the person who designed every glossy button of 2007, please, one more.",
  blog: [["see-through everything", "phones, cases, game consoles, a computer you could see the guts of. hiding nothing was the aesthetic."], ["the future, as promised", "bubbles. grass. a glass globe. a dolphin, somehow. i still want it."]],
  ghosts: ["ipod-classic", "google-reader", "tumblr-3am"], top8: ["sultana", "lune", "theghost", "tama", "dialup", "vampira"],
  gb: [["the ghost", "hydrated, optimistic, translucent. the future called. it misses you."], ["sms_sultana", "your bluetooth name is just a water emoji and i respect it"]],
  chat: ["hiii 💧 the future is so close i can see through it.", {mood: [["🫧", "bubbles", "#d6f0ff"], ["🌿", "grass", "#dcf7cf"], ["🐬", "?", "#c9ecff"], ["💿", "see-through", "#f5f5ff"]], cap: "what we were promised"}, {place: "gal:clear", t: "🫧 see-through tech is in the gallery"}]},
 {id: "tama", handle: "tama_graveyard", city: "Cairo", year: "1997", plat: "virtual pet era", st: "away",
  mood: "RIP #14 (forgot to feed)", tag: "i've buried 14 pets. all digital. all my fault.",
  song: {t: "beep_beep_lullaby", tune: [[84,.08],[88,.08],[91,.08],[96,.2],[91,.08],[96,.3],[93,.15],[91,.4]]},
  av: {acc: ["pixel", "heart"], c1: "#fffde8", c2: "#ffe08a", line: "#ff8a00"},
  theme: {bg: "#c9f2c9 " + tile(`<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><g fill='#9ad89a'><rect x='8' y='8' width='4' height='4'/><rect x='16' y='8' width='4' height='4'/><rect x='4' y='12' width='20' height='4'/><rect x='8' y='16' width='12' height='4'/><rect x='12' y='20' width='4' height='4'/></g></svg>`), box: "#fffde8", ink: "#3a3a1a", acc: "#ff8a00", head: "#fff", font: "'VT323',monospace", avbg: "#e8f7d0"},
  about: "school confiscated three of them. my grandmother fed one during exams and it was the only one that lived to adulthood. i keep a graveyard in a notebook with dates. this is a memorial site. please wipe your feet.",
  meet: "whoever invented the pause button for pets. you didn't. that's the problem.",
  blog: [["in memoriam #14", "he was a blob. he liked the snack more than the meal. he died during maths."], ["grandmother: 1, me: 0", "she fed it, cleaned it, played the little game. i came home and it had evolved into something beautiful. i was not ready."]],
  ghosts: ["tamagotchi", "polaroid-film"], top8: ["vampira", "aero", "theghost", "lune", "sultana", "dialup"],
  gb: [["vhs_vampira", "14 funerals. a legend."], ["the ghost", "honestly? same energy as my contact list."]],
  chat: ["beep. beep. it's hungry again.", {st: "🥚"}, {card: "tamagotchi"}, "feed it. please. i'm begging."]},
 {id: "theghost", handle: "the ghost", city: "the cloud (the old one)", year: "1999–2013, forever", plat: "afterlife era", st: "off",
  mood: "appearing offline. dressed for it.", tag: "the best-dressed dead person online.",
  song: {t: "sign_in_chime_but_slow.wav", tune: [[60,.2],[63,.2],[67,.2],[70,.4],[68,.2],[67,.2],[63,.5]]},
  av: {acc: ["shades", "pearls"]},
  theme: {bg: "#05061a " + tile(`<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><circle cx='10' cy='20' r='1' fill='#fff'/><circle cx='70' cy='40' r='1.4' fill='#b8f3ff'/><circle cx='40' cy='85' r='.8' fill='#fff'/><path d='M85 80l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z' fill='#fff' opacity='.7'/></svg>`), box: "#0d0f2bee", ink: "#e9f7ff", acc: "#b8f3ff", head: "#05061a", font: "Tahoma,sans-serif", avbg: "linear-gradient(135deg,#1b1650,#1d5566)"},
  about: "wearing: one (1) bedsheet, archival. accessories by mood. occupation: haunting, curating, judging your away message. turn-ons: dial tones, discontinued things, a good tracklist. turn-offs: the algorithm, beige feeds, the word 'content'.",
  meet: "you. obviously. and whoever still has their msn password written in a notebook.",
  blog: [["on wearing the same thing for 13 years", "it's called a signature look. look it up. actually don't, the link is dead."], ["dear algorithm", "you could never. sincerely, a ghost with taste."]],
  ghosts: ["msn-messenger", "geocities", "dialup", "skyblogs"], top8: ["lune", "dialup", "vampira", "sultana", "aero", "tama"],
  gb: [["lipgloss_lune", "PASSE SUR MON BLOG 👻"], ["dj_dialup", "the drip is ghostly. literally."], ["aero_angel", "translucent icon 💧"]],
  chat: null}
];
const PROF = Object.fromEntries(PROFILES.map(p => [p.id, p]));
const hoodGroup = [];
PROFILES.filter(p => p.chat).forEach(p => {
  const c = {id: p.id, n: p.handle, st: p.st, pm: p.mood, m: p.chat, who: p.handle, prof: p};
  ALL[p.id] = c; hoodGroup.push(c);
});
groups.push({g: "The Neighbourhood", c: hoodGroup});
function openHood(){
  closeOverlays();
  $("#hoodin").innerHTML = `<h1 class="chrome">the neighbourhood</h1>
    <div class="hsub">top friends of the old internet. click a face, walk into their world.</div>
    <div class="hgrid">${PROFILES.map(p => `<div class="hcard" data-open="profile:${p.id}" style="background:${p.theme.bg};color:${p.theme.ink};font-family:${p.theme.font}">
      ${p.st !== "off" ? `<span class="hon">● online now!</span>` : ""}
      <div class="hav" style="background:${p.theme.avbg}">${ghostAv(p.av)}</div>
      <div class="hn">${esc(p.handle)}</div><div class="hm">${esc(p.city)} · ${esc(p.year)}</div><div class="hm"><i>${esc(p.mood)}</i></div></div>`).join("")}
      <div class="hcard" data-open="arch" style="background:#ffffffaa;color:#1d3a6e;border-style:dashed">
        <div class="hav" style="background:#fff;font-size:44px">＋</div><div class="hn">your room</div><div class="hm">coming soon. for now, bury something in the archive and it'll be waiting for you.</div></div>
    </div>
    <div class="hnote">every profile here is fictional. the feelings are real.</div>`;
  $("#hood").classList.add("open"); $("#hood").scrollTop = 0; markDock("hood");
}
let GB = [], gbWatched = false, curProf = null;
function openProfile(id){
  const p = PROF[id]; if (!p) return;
  closeOverlays(); curProf = p;
  if (!gbWatched) { gbWatched = true; watch("guestbook", rows => { GB = rows; if (curProf && $("#prof").classList.contains("open")) paintGB(); }); }
  const t = p.theme, el = $("#prof");
  el.style.cssText = `--bg:${t.bg};--box:${t.box};--ink:${t.ink};--acc:${t.acc};--head:${t.head};--font:${t.font};--avbg:${t.avbg}`;
  const visitors = String(1000 + (p.handle.length * 7919) % 90000 + Math.floor(Date.now() / 86400000) % 97).padStart(6, "0");
  const songK = "p" + (++tuneN); TUNES[songK] = p.song.tune;
  el.innerHTML = `<div class="pf">
    <div class="pfbar"><span>◀ ▶ ⟳</span><span class="addr">ghostofmsn://neighbourhood/${esc(p.handle.replace(/\s/g, "_"))}</span><button class="xp" data-open="hood">↩ neighbourhood</button></div>
    <h1 class="pname chrome">${esc(p.handle)}</h1><div class="ptag">${esc(p.tag)}</div>
    <div class="pfgrid"><div>
      <div class="pbox"><div class="pav">${ghostAv(p.av)}</div>
        <div class="pmood"><b>mood:</b> ${esc(p.mood)}${p.st !== "off" ? `<span class="online">● online now!</span>` : `<span class="muted" style="margin-left:6px">◌ appearing offline</span>`}</div></div>
      <div class="pbox"><h3>now playing</h3><div class="mp"><button data-tune="${songK}" aria-label="play">▶</button><div class="mt"><span>♫ ${esc(p.song.t)} ♫</span></div><div class="eq"><i></i><i></i><i></i><i></i></div></div></div>
      <div class="pbox"><h3>contact ${esc(p.handle)}</h3><div class="pbtns">
        ${p.chat ? `<button data-open="chat:${p.id}">💬 send message</button>` : `<button data-open="chat:ghost">💬 send message</button>`}
        <button id="pwz">⚡ wizz</button><button id="padd">➕ add to friends</button></div></div>
      <div class="pbox"><h3>details</h3><table class="pdet">
        <tr><td>lives in</td><td>${esc(p.city)}</td></tr><tr><td>era</td><td>${esc(p.year)} · ${esc(p.plat)}</td></tr>
        <tr><td>ghosts buried</td><td>${p.ghosts.length}</td></tr><tr><td>here for</td><td>networking (emotional)</td></tr></table></div>
    </div><div>
      <div class="pbox"><h3>about me</h3>${esc(p.about)}</div>
      <div class="pbox"><h3>who i'd like to meet</h3>${esc(p.meet)}</div>
      <div class="pbox"><h3>${esc(p.handle)}'s blog</h3>${p.blog.map(([h, b]) => `<div class="blog"><b>${esc(h)}</b><small>posted at 2:13am · mood: ${esc(p.mood)}</small><div>${esc(b)}</div></div>`).join("")}</div>
      <div class="pbox"><h3>ghosts i buried</h3><div class="pghosts">${p.ghosts.map(archGet).filter(Boolean).map(e => `<div data-capsule="${esc(e.id)}" title="open its time capsule">${eraCard(e)}</div>`).join("")}</div></div>
      <div class="pbox"><h3>${esc(p.handle)}'s top 8</h3><div class="top8">${p.top8.map(k => PROF[k]).filter(Boolean).map(f => `<div class="t8" data-open="profile:${f.id}"><div class="ta" style="background:${f.theme.avbg}">${ghostAv(f.av)}</div>${esc(f.handle)}</div>`).join("")}</div></div>
      <div class="pbox gb"><h3>guestbook</h3><div id="gbl"></div>
        <form class="gbform" id="gbf"><input id="gbt" maxlength="200" placeholder="leave something nice. or 'passe sur mon blog'."><button class="xp" type="submit">sign</button></form></div>
    </div></div>
    <div class="pfoot">you are visitor #<span class="counter">${visitors}</span> · best viewed in 1024×768 · this profile is fictional. the feelings are real.</div>
  </div>`;
  paintGB();
  $("#pwz").onclick = () => { el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); snd.wizz(); };
  $("#padd").onclick = () => { toast(`<b>${esc(p.handle)}</b> added you back. obviously.`); award(1); };
  $("#gbf").onsubmit = async e => { e.preventDefault(); const t2 = $("#gbt").value.trim().slice(0, 200); if (!t2) return; $("#gbt").value = ""; await xadd("guestbook", {p: p.id, t: t2}); toast("signed ✍"); };
  el.classList.add("open"); el.scrollTop = 0; markDock("hood");
  setTimeout(() => playTune(p.song.tune, el.querySelector(".mp")), 500);
}
function paintGB(){
  const p = curProf, l = $("#gbl"); if (!p || !l) return;
  const live = GB.filter(r => r.p === p.id && r.t).slice(0, 30).map(r => [r.by || "anonymous ghost", r.t, ago(r.ts)]);
  l.innerHTML = live.concat(p.gb.map(([a, b]) => [a, b, "2:13am"])).map(([a, b, w]) => `<div class="gbc"><b>${esc(a)}</b><div style="flex:1">${esc(b)}</div><span style="opacity:.6;font-size:10px;white-space:nowrap">${esc(w)}</span></div>`).join("");
}

/* ---------- the gallery: archives turned into exhibitions ---------- */
const keys = (x0, y0, cols, rows, w, h, gx, gy, f, rx = 2) => { let s = ""; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += `<rect x="${x0 + c * gx}" y="${y0 + r * gy}" width="${w}" height="${h}" rx="${rx}" fill="${f}"/>`; return s; };
const pa = (bg, inner) => `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="300" fill="${bg}"/><circle cx="100" cy="150" r="118" fill="#fff" opacity=".18"/>${inner}</svg>`;
const MPM = "https://www.mobilephonemuseum.com/catalogue";
const PHONES = [
 {t: "Motorola DynaTAC 8000X", y: 1983, med: "plastic, antenna, ambition", line: "the first handheld cellular phone sold to the public. it weighed about as much as a bag of sugar.", crit: "a phone you could defend yourself with. the shoulder pads of telecom. iconic.",
  art: pa("#ff5aa5", `<rect x="88" y="16" width="13" height="54" rx="4" fill="#2b2b2b"/><rect x="66" y="60" width="68" height="216" rx="10" fill="#353535"/><rect x="72" y="66" width="56" height="204" rx="8" fill="#454545"/><rect x="80" y="80" width="40" height="15" rx="2" fill="#140606"/><text x="100" y="92" font-family="monospace" font-size="11" fill="#ff3b3b" text-anchor="middle">888</text>${keys(80, 110, 3, 5, 10, 13, 14, 20, "#d9d9d9")}<rect x="84" y="214" width="32" height="40" rx="3" fill="#2a2a2a"/>`)},
 {t: "Motorola StarTAC", y: 1996, med: "a clamshell, a click", line: "small enough to clip on a belt, and it closed with a sound like the end of an argument.", crit: "it clicked shut like ending a fight. we lost that. we lost so much.",
  art: pa("#7fd8ff", `<rect x="126" y="14" width="8" height="22" rx="3" fill="#1e1e22"/><rect x="62" y="30" width="76" height="110" rx="18" fill="#2e2e33"/><rect x="74" y="52" width="52" height="32" rx="3" fill="#9fd18f"/><path d="M88 40h24" stroke="#555" stroke-width="3" stroke-linecap="round"/><rect x="60" y="134" width="80" height="16" rx="6" fill="#1a1a1e"/><rect x="62" y="148" width="76" height="124" rx="18" fill="#3a3a40"/>${keys(76, 168, 3, 4, 13, 12, 18, 18, "#c9ccd6", 4)}`)},
 {t: "Nokia 8110", y: 1996, med: "a curve, a slide", line: "the banana-shaped one. a film made its sliding cover famous.", crit: "curved like it knew it was hot. it did.",
  art: pa("#ffd84a", `<path d="M84 22 C68 110 72 200 90 280 L128 274 C114 196 112 110 124 18 Z" fill="#1d1d1f"/><rect x="88" y="50" width="30" height="36" rx="3" fill="#a7c99a" transform="rotate(-4 103 68)"/><path d="M92 168 C96 210 100 242 104 276 L126 272 C120 238 116 206 116 166 Z" fill="#303034"/>${keys(92, 108, 3, 3, 7, 6, 9, 11, "#8a8a92", 3)}`)},
 {t: "Nokia 7110", y: 1999, med: "spring-loaded cover, wishful thinking", line: "one of the first phones that could open a (very small) web.", crit: "the web on a screen the size of a stamp. we were so brave.",
  art: pa("#b98ad8", `<rect x="68" y="26" width="64" height="180" rx="14" fill="#6c6f78"/><rect x="78" y="46" width="44" height="52" rx="3" fill="#b6d49a"/><text x="100" y="66" font-family="monospace" font-size="7" fill="#2c3e1c" text-anchor="middle">WAP</text><circle cx="100" cy="114" r="8" fill="#3b3e46"/>${keys(80, 130, 3, 3, 10, 8, 15, 13, "#d6d9e6", 4)}<rect x="66" y="196" width="68" height="86" rx="14" fill="#4b4e57"/>`)},
 {t: "Nokia 3310", y: 2000, med: "unbreakable plastic, snake", line: "one of the best-selling phones ever made. people still say it survived everything.", crit: "indestructible, like my opinions. and it had snake. case closed.",
  art: pa("#9be38f", `<rect x="64" y="20" width="72" height="258" rx="34" fill="#1f3a6e"/><rect x="70" y="28" width="60" height="242" rx="30" fill="#2b4f93"/><rect x="80" y="62" width="40" height="40" rx="4" fill="#bcd6a0"/><path d="M85 92h16v-12h12v6" stroke="#2c3e1c" stroke-width="3" fill="none"/><rect x="113" y="84" width="3" height="3" fill="#2c3e1c"/><ellipse cx="100" cy="126" rx="18" ry="9" fill="#d6dbe6"/>${keys(80, 150, 3, 4, 12, 10, 15, 16, "#d6dbe6", 5)}<path d="M92 44h16" stroke="#0e1f40" stroke-width="3" stroke-linecap="round"/>`)},
 {t: "Sony Ericsson T68i", y: 2002, med: "colour screen, joystick, firsts", line: "small, silver, and in colour: when a phone screen started to feel like a tiny window.", crit: "the first time a phone had colour and we all became photographers of nothing.",
  art: pa("#ff9a3c", `<defs><linearGradient id="t68" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f7cff"/><stop offset="1" stop-color="#c06fd6"/></linearGradient></defs><rect x="72" y="40" width="56" height="212" rx="20" fill="#c9ccd6" stroke="#9a9db0" stroke-width="2"/><rect x="80" y="62" width="40" height="50" rx="3" fill="url(#t68)"/><circle cx="100" cy="128" r="8" fill="#6b6f85"/>${keys(82, 150, 3, 4, 9, 9, 13, 15, "#9a9db0", 4)}`)},
 {t: "Danger Hiptop (Sidekick)", y: 2002, med: "swivel screen, full keyboard, main character energy", line: "a screen that spun around to reveal a keyboard. texting became a sport.", crit: "swivel screen = personality. phones today could never.",
  art: pa("#4fd1c5", `<rect x="16" y="102" width="168" height="96" rx="42" fill="#e7e7ef" stroke="#b9b9c9" stroke-width="2"/><rect x="50" y="114" width="100" height="72" rx="6" fill="#203a8f"/><path d="M60 128h60M60 140h76M60 152h50M60 164h68" stroke="#7fd8ff" stroke-width="3" opacity=".7"/><circle cx="33" cy="150" r="9" fill="#ff8a00"/><circle cx="167" cy="134" r="5" fill="#c9c9d9"/><circle cx="167" cy="166" r="5" fill="#c9c9d9"/>`)},
 {t: "Nokia N-Gage", y: 2003, med: "a game console that was also a phone (allegedly)", line: "you had to hold it sideways against your face to make a call.", crit: "you talked into the side of a taco. and we did it. that's commitment.",
  art: pa("#8a6cff", `<path d="M18 122 Q18 96 50 96 L150 96 Q182 96 182 122 L182 178 Q182 204 150 204 L50 204 Q18 204 18 178 Z" fill="#3a3f4a"/><rect x="82" y="106" width="36" height="48" rx="3" fill="#7fd8ff"/><circle cx="50" cy="150" r="17" fill="#23262e"/><path d="M50 138v24M38 150h24" stroke="#8a8f9c" stroke-width="5"/>${keys(130, 128, 3, 3, 9, 8, 12, 13, "#8a8f9c", 4)}`)},
 {t: "Motorola RAZR V3", y: 2004, med: "aluminium, thinness, a lifestyle", line: "so thin it became a fashion accessory. later it came in pink and everyone lost their minds.", crit: "thin was the whole personality. in pink? a lifestyle. i'd wear it as a necklace.",
  art: pa("#141418", `<rect x="66" y="18" width="68" height="128" rx="8" fill="#ff8ac2"/><rect x="74" y="32" width="52" height="72" rx="3" fill="#1b1b2a"/><rect x="78" y="36" width="44" height="64" fill="#5f8bff" opacity=".35"/><rect x="64" y="142" width="72" height="12" rx="5" fill="#d96aa3"/><rect x="66" y="150" width="68" height="132" rx="8" fill="#f59bc9"/>${keys(74, 172, 3, 4, 14, 14, 18, 22, "none")}<g fill="none" stroke="#7fd8ff" stroke-width="1.4" opacity=".9">${keys(74, 172, 3, 4, 14, 14, 18, 22, "none").replace(/fill="none"/g, "")}</g>`)},
 {t: "Nokia 7280", y: 2004, med: "a lipstick that called people", line: "no keypad at all: you dialled with a spinning wheel. it looked like a lipstick case and a mirror.", crit: "a lipstick that called people. the brief was insane. the result was art.",
  art: pa("#c8381c", `<rect x="84" y="18" width="32" height="264" rx="16" fill="#1b1b1f"/><rect x="88" y="38" width="24" height="124" rx="10" fill="#3a3a44"/><path d="M93 48l8 90" stroke="#fff" stroke-width="2" opacity=".35"/><circle cx="100" cy="200" r="11" fill="#b0b0b8"/><circle cx="100" cy="200" r="4" fill="#1b1b1f"/><path d="M90 236h20M90 246h20M90 256h20" stroke="#2c2c34" stroke-width="2"/>`)},
 {t: "Apple iPhone (first generation)", y: 2007, med: "glass. the end of variety.", line: "after this, phones slowly started to look like each other.", crit: "and then everything became the same black rectangle. rest in peace, variety. i wore black to this one.",
  art: pa("#ffffff", `<rect x="58" y="22" width="84" height="256" rx="18" fill="#111"/><rect x="64" y="52" width="72" height="194" rx="2" fill="#1c1c1e"/><circle cx="100" cy="262" r="8" fill="none" stroke="#555" stroke-width="2"/><rect x="90" y="34" width="20" height="3" rx="1.5" fill="#333"/>`)}
];
const tp = (bg, inner) => pa(bg, `<defs><pattern id="circ" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 10h8v-6h12M10 20v-6h6" stroke="#1e3a5c" stroke-width="1" fill="none" opacity=".55"/><circle cx="8" cy="10" r="1.6" fill="#ffd700" opacity=".8"/></pattern></defs>` + inner);
const CLEAR = [
 {t: "the translucent desktop computer (Apple iMac G3)", y: 1998, med: "blue see-through plastic, a handle, optimism", line: "a computer you could see into. it made beige feel like a crime.", crit: "it had a handle. a HANDLE. like a handbag. the computer as accessory started here.",
  art: tp("#e9f6ff", `<path d="M40 40 Q40 28 52 28 L148 28 Q160 28 160 40 L166 190 Q166 206 150 206 L50 206 Q34 206 34 190 Z" fill="#1cb2c9" opacity=".55" stroke="#0e7f92" stroke-width="2"/><rect x="40" y="34" width="120" height="166" rx="12" fill="url(#circ)"/><rect x="58" y="48" width="84" height="66" rx="4" fill="#1d2433"/><rect x="62" y="52" width="76" height="58" fill="#4f7cff" opacity=".5"/><ellipse cx="100" cy="150" rx="26" ry="10" fill="#0e7f92" opacity=".5"/><path d="M84 206 L76 250 L124 250 L116 206" fill="#1cb2c9" opacity=".5" stroke="#0e7f92" stroke-width="2"/><path d="M80 28 Q100 10 120 28" fill="none" stroke="#0e7f92" stroke-width="5" opacity=".7"/>`)},
 {t: "the see-through handheld (Game Boy Color, purple)", y: 1998, med: "translucent purple plastic, AA batteries", line: "a games console that showed you its guts, in purple.", crit: "transparent about everything, including its batteries. a level of honesty i aspire to.",
  art: tp("#f3ecff", `<rect x="56" y="30" width="88" height="240" rx="12" fill="#8a4fd8" opacity=".5" stroke="#5a2a9e" stroke-width="2"/><rect x="60" y="34" width="80" height="232" rx="10" fill="url(#circ)"/><rect x="68" y="48" width="64" height="70" rx="6" fill="#3a3a44"/><rect x="76" y="56" width="48" height="52" fill="#9bd18a"/><path d="M78 160h20M88 150v20" stroke="#2a1150" stroke-width="7"/><circle cx="116" cy="164" r="7" fill="#2a1150"/><circle cx="130" cy="152" r="7" fill="#2a1150"/><rect x="80" y="236" width="40" height="6" rx="3" fill="#2a1150" opacity=".6"/>`)},
 {t: "the clear landline", y: 1990, med: "transparent shell, coloured wires, neon", line: "a home phone that lit up when it rang, so the whole room knew someone wanted you.", crit: "it glowed when someone called. imagine needing to be wanted THAT visibly. i do.",
  art: tp("#fff0f7", `<path d="M40 70 Q100 40 160 70 L156 90 Q100 66 44 90 Z" fill="#cfe9ff" opacity=".7" stroke="#6aa6d8" stroke-width="2"/><path d="M50 120 L150 120 L162 240 L38 240 Z" fill="#cfe9ff" opacity=".55" stroke="#6aa6d8" stroke-width="2"/><path d="M60 140 C80 170 120 120 140 160 S90 220 70 200" fill="none" stroke="#ff3d7f" stroke-width="2.5"/><path d="M70 130 C100 150 110 210 140 220" fill="none" stroke="#3cc23c" stroke-width="2.5"/><circle cx="100" cy="180" r="30" fill="none" stroke="#ff4fa3" stroke-width="4" opacity=".8"/>${keys(78, 160, 3, 3, 10, 10, 16, 14, "#ffffffcc", 5)}`)},
 {t: "the see-through portable CD player", y: 1999, med: "clear lid, spinning disc, skip protection (lies)", line: "you could watch your music spin. and skip, whenever you walked.", crit: "watching the cd spin was half the album. the other half was it skipping on the stairs.",
  art: tp("#eefbf3", `<circle cx="100" cy="150" r="78" fill="#d9f2ff" opacity=".6" stroke="#7fbcd6" stroke-width="3"/><circle cx="100" cy="150" r="58" fill="url(#circ)"/><g style="transform-origin:100px 150px;animation:spin 3s linear infinite"><circle cx="100" cy="150" r="52" fill="#e6e6f2" opacity=".85"/><path d="M100 98 A52 52 0 0 1 152 150 L130 150 A30 30 0 0 0 100 120 Z" fill="#ff8ac2" opacity=".5"/><path d="M48 150 A52 52 0 0 1 100 98 L100 120 A30 30 0 0 0 70 150 Z" fill="#7fd8ff" opacity=".5"/><circle cx="100" cy="150" r="10" fill="#fff" stroke="#999"/></g><rect x="150" y="214" width="20" height="8" rx="3" fill="#7fbcd6"/>`)},
 {t: "the clear pager", y: 1996, med: "transparent plastic, one line of text, devotion", line: "a number arrived and you ran to find a phone. the message was mostly the running.", crit: "one line of text and a whole evening of drama. efficient. elegant. we've regressed.",
  art: tp("#fff8e1", `<rect x="40" y="100" width="120" height="96" rx="16" fill="#ffe08a" opacity=".55" stroke="#c9a227" stroke-width="2"/><rect x="44" y="104" width="112" height="88" rx="14" fill="url(#circ)"/><rect x="56" y="116" width="88" height="28" rx="3" fill="#9bd18a"/><text x="100" y="135" font-family="monospace" font-size="11" fill="#2c3e1c" text-anchor="middle">143 143 143</text><circle cx="72" cy="170" r="7" fill="#c9a227"/><circle cx="100" cy="170" r="7" fill="#c9a227"/><circle cx="128" cy="170" r="7" fill="#c9a227"/>`)}
];
const EXHIBITS = [
 {id: "phones", t: "Ringtone Era", sub: "mobile phones, 1983–2007 · an homage to the Mobile Phone Museum", intro: `<h2>Ringtone Era</h2><div class="s">mobile phones · 1983–2007</div>before every phone became the same black rectangle, they were sculptures. bricks, bananas, clams, tacos, lipsticks. this room treats them like the art they were.<br><br>drawn from memory by the ghost, after the collection of the <a href="${MPM}" target="_blank" rel="noopener">Mobile Phone Museum ↗</a> (2,800+ models). an homage, not affiliated.`, pieces: () => PHONES.map(p => Object.assign({href: MPM, hl: "browse the real one at the Mobile Phone Museum ↗"}, p))},
 {id: "clear", t: "See-Through", sub: "transparent tech, 1990–2000s", intro: `<h2>See-Through</h2><div class="s">transparent tech · 1990–2000s</div>for a moment, gadgets stopped hiding their insides. translucent plastic in candy colours, circuits on display, a computer with a handle. the future was going to be honest.<br><br>drawn by the ghost. inspired by everyone who still says y2k transparent tech was peak.`, pieces: () => CLEAR},
 {id: "deadlinks", t: "Dead Links", sub: "a retrospective of websites that left", intro: `<h2>Dead Links</h2><div class="s">a retrospective</div>homepages, messengers, feeds. each one promised a future. each frame here is a time capsule: click it, then visit it in its own year.`, pieces: () => ARCH.filter(e => e.cat === "web").map(arPiece)},
 {id: "counter", t: "The Counter", sub: "gloss, gadgets, the things we carried", intro: `<h2>The Counter</h2><div class="s">gloss · gadgets · pockets</div>everything that sat on a shelf, in a pocket, on a lip. objects from the archive, hung like they deserve.`, pieces: () => ARCH.filter(e => ["makeup", "fashion", "bags", "object", "gadget", "sound"].includes(e.cat)).map(arPiece)},
 {id: "people", t: "The People's Wing", sub: "everything buried by visitors, live", intro: `<h2>The People's Wing</h2><div class="s">live · curated by you</div>every ghost buried in the archive by someone who isn't me. it changes when you add one. i don't judge. (i judge a little.)`, pieces: () => ARCH.filter(e => e.by && e.by !== "the ghost").map(arPiece)}
];
function arPiece(e){ return {t: e.name, y: [yr(e.born), yr(e.died)].filter(Boolean).join("–") || e.when || "", med: catOf(e)[1].toLowerCase(), line: e.promise ? `promised: “${e.promise}”` : "", crit: e.haunt || "", era: e, cap: e.id}; }
let galEx = "phones", galPieces = [];
function openGallery(id){
  closeOverlays(); if (id && EXHIBITS.some(x => x.id === id)) galEx = id;
  const ex = EXHIBITS.find(x => x.id === galEx);
  $("#galtabs").innerHTML = EXHIBITS.map(x => `<button class="${x.id === galEx ? "on" : ""}" data-ex="${x.id}">${esc(x.t)}</button>`).join("");
  $("#galsub").textContent = ex.sub;
  galPieces = ex.pieces();
  $("#galrow").innerHTML = `<div class="wallt">${ex.intro}</div>` + (galPieces.length ? galPieces.map((p, i) => `<div class="piece" data-pi="${i}"><div class="frame"><div class="art">${p.era ? eraCard(p.era) : p.art}</div></div><div class="plq"><b>${esc(p.t)}</b>${esc(String(p.y))}${p.med ? " · " + esc(p.med) : ""}</div></div>`).join("")
    : `<div class="wallt"><h2>empty wall.</h2>nobody's buried anything here yet. <a href="#" data-open="arch">be the first ↗</a></div>`);
  $("#galrow").scrollLeft = 0;
  $("#gal").classList.add("open"); markDock("gallery");
  tone([[523,.1],[659,.1],[784,.2]], "sine", .03);
}
$("#galtabs").addEventListener("click", e => { const b = e.target.closest("[data-ex]"); if (b) openGallery(b.dataset.ex); });
const grow = $("#galrow");
let stepT = 0;
grow.addEventListener("wheel", e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { e.preventDefault(); grow.scrollLeft += e.deltaY; } }, {passive: false});
grow.addEventListener("scroll", () => { const n = Date.now(); if (n - stepT > 380) { stepT = n; tone([[110 + Math.random() * 30, .05]], "sine", .02); } });
$("#galL").onclick = () => grow.scrollBy({left: -360, behavior: "smooth"});
$("#galR").onclick = () => grow.scrollBy({left: 360, behavior: "smooth"});
grow.addEventListener("click", e => { const p = e.target.closest(".piece"); if (p) showPiece(+p.dataset.pi); });
let gbI = 0;
function showPiece(i){
  if (!galPieces.length) return; gbI = mod(i, galPieces.length); const p = galPieces[gbI];
  $("#gbin").innerHTML = `<div class="gbart"><div class="art">${p.era ? eraCard(p.era) : p.art}</div></div>
    <div class="gbside"><div class="t">${esc(p.t)}</div><div class="y">${esc(String(p.y))}${p.med ? " · " + esc(p.med) : ""}</div>${p.line ? `<div>${esc(p.line)}</div>` : ""}
      <div class="gbghost"><div class="gbav">${ghostFit(gbI % 2 ? "paris" : "classic")}</div><div class="gbbub"><b>the ghost says:</b>${esc(p.crit)}</div></div>
      <div class="gbnav"><button id="gbp">❮</button><button id="gbn">❯</button>
        ${p.cap ? `<button data-capsule="${esc(p.cap)}">🕰 open its time capsule</button>` : ""}
        ${p.href ? `<a href="${p.href}" target="_blank" rel="noopener">${esc(p.hl)}</a>` : ""}
        <button id="gbx">✕ back to the wall</button></div></div>`;
  $("#galbox").classList.add("open");
  $("#gbp").onclick = () => showPiece(gbI - 1); $("#gbn").onclick = () => showPiece(gbI + 1); $("#gbx").onclick = () => $("#galbox").classList.remove("open");
  tone([[784,.06]], "sine", .03);
}
$("#galbox").addEventListener("click", e => { if (e.target.id === "galbox") $("#galbox").classList.remove("open"); });

/* ---------- places: one bar to go anywhere ---------- */
const PLACES = [["room", "🛏", "room"], ["worlds", "🌀", "worlds"], ["msn", "💬", "msn"], ["hood", "👯", "people"], ["gallery", "🖼", "gallery"], ["arch", "📁", "archive"], ["tm", "🕰", "time"], ["forum", "☕", "café"]];
const MORE = [["atlas", "🛰", "Ghost Atlas"], ["journal", "📓", "Journal"], ["lounge", "💭", "thinkers"], ["quiz", "⭐", "Star Quiz"], ["arcade", "🕹", "Arcade"], ["closet", "👗", "Closet 2003"], ["wall", "⚡", "Wizz Wall"], ["rewards", "🏆", "points"], ["note:about", "📄", "About"]];
$("#dock").innerHTML = PLACES.map(([k, e, l]) => `<button class="dk" data-go="${k}" title="${l}"><span class="e">${e}</span><span class="l">${l}</span></button>`).join("") +
  `<button class="dk" id="dkm" title="more places"><span class="e">✚</span><span class="l">more</span></button><span class="dksep"></span>
   <button class="dk tg" id="tgspk" title="sparkle cursor"><span class="e">✨</span></button><button class="dk tg" id="tgscan" title="crt scanlines"><span class="e">📺</span></button><span id="dkdate"></span>`;
$("#dkmore").innerHTML = MORE.map(([k, e, l]) => `<button data-go="${k}">${e} ${l}</button>`).join("");
function closeOverlays(){ document.querySelectorAll(".ov.open").forEach(o => o.classList.remove("open")); $("#galbox").classList.remove("open"); }
function markDock(k){ document.querySelectorAll("#dock .dk[data-go]").forEach(b => b.classList.toggle("on", b.dataset.go === k)); }
function goPlace(k){
  $("#dkmore").classList.remove("open"); closeMenu(); closeOverlays();
  if (Q.open) leaveQuilt(); document.body.classList.remove("inroom");
  if (k === "room") enterRoom(); else if (k === "worlds") enterQuilt(); else if (k === "msn") openWin("cl"); else openThing(k);
  markDock(k);
}
$("#dock").addEventListener("click", e => {
  const b = e.target.closest("[data-go]"); if (b) { goPlace(b.dataset.go); tone([[1046,.04],[1318,.06]], "sine", .03); return; }
  if (e.target.closest("#dkm")) $("#dkmore").classList.toggle("open");
});
$("#dkmore").addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) goPlace(b.dataset.go); });
document.addEventListener("click", e => { if (!e.target.closest("#dkmore,#dkm")) $("#dkmore").classList.remove("open"); });
const _ot3 = openThing;
openThing = function(k){
  if (k === "hood") return openHood();
  if (k === "gallery") return openGallery();
  if (k.startsWith("gal:")) return openGallery(k.slice(4));
  if (k.startsWith("profile:")) return openProfile(k.slice(8));
  return _ot3(k);
};
const _er = enterRoom; enterRoom = function(){ closeOverlays(); _er(); markDock("room"); };
const _eq = enterQuilt; enterQuilt = function(at){ closeOverlays(); _eq(at); markDock("worlds"); };
addEventListener("keydown", e => {
  if (e.key === "Escape") { if ($("#galbox").classList.contains("open")) $("#galbox").classList.remove("open"); else if (document.querySelector(".ov.open")) { closeOverlays(); markDock("msn"); openWin("cl"); } }
  if ($("#gal").classList.contains("open") && !$("#galbox").classList.contains("open")) { if (e.key === "ArrowRight") grow.scrollBy({left: 360, behavior: "smooth"}); if (e.key === "ArrowLeft") grow.scrollBy({left: -360, behavior: "smooth"}); }
});
/* the date says 2004. it always says 2004. */
function dkdate(){ const d = new Date(); $("#dkdate").textContent = `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.2004 · ${d.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}`; }
dkdate(); setInterval(dkdate, 20000);

/* ---------- y2k skin: sparkle trail + scanlines (both switchable) ---------- */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (XS.spk === undefined) XS.spk = !reduce;
if (XS.scan === undefined) XS.scan = true;
function paintToggles(){ $("#tgspk").classList.toggle("on", !!XS.spk); $("#tgscan").classList.toggle("on", !!XS.scan); document.body.classList.toggle("scan", !!XS.scan); }
$("#tgspk").onclick = () => { XS.spk = !XS.spk; xsave(); paintToggles(); };
$("#tgscan").onclick = () => { XS.scan = !XS.scan; xsave(); paintToggles(); };
paintToggles();
let spT = 0;
addEventListener("pointermove", e => {
  if (!XS.spk || !document.body.classList.contains("signedin") || e.pointerType === "touch") return;
  const n = performance.now(); if (n - spT < 45) return; spT = n;
  const s = document.createElement("span"); s.className = "spk"; s.textContent = pick(["✦", "✧", "⋆", "✨", "·"]);
  s.style.cssText = `left:${e.clientX - 6}px;top:${e.clientY - 6}px;color:${pick(["#ff8ac2", "#7fe7ff", "#ffd700", "#fff", "#c9b6ff"])};--dx:${(Math.random() - .5) * 30}px`;
  document.body.appendChild(s); setTimeout(() => s.remove(), 950);
});

/* ---------- dial-up: you don't arrive, you connect ---------- */
function modem(){
  if (muted) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume();
    const t0 = ac.currentTime;
    const osc = (f, s, d, v = .025, type = "sine") => { const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(v, t0 + s); g.gain.setValueAtTime(0, t0 + s + d); o.connect(g).connect(ac.destination); o.start(t0 + s); o.stop(t0 + s + d + .02); };
    osc(350, 0, .5); osc(440, 0, .5);
    [[697, 1209], [770, 1336], [852, 1477], [697, 1336], [941, 1336], [770, 1209], [852, 1336]].forEach(([a, b], i) => { osc(a, .6 + i * .13, .09); osc(b, .6 + i * .13, .09); });
    osc(2100, 1.65, .5, .018); osc(1650, 2.2, .25, .015, "square"); osc(980, 2.45, .3, .015, "square"); osc(1200, 2.45, .3, .012);
    const len = Math.floor(ac.sampleRate * 1.3), buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const n = ac.createBufferSource(), bp = ac.createBiquadFilter(), g = ac.createGain(); n.buffer = buf; bp.type = "bandpass"; bp.Q.value = 4;
    bp.frequency.setValueAtTime(1800, t0 + 2.8); bp.frequency.linearRampToValueAtTime(900, t0 + 3.4); bp.frequency.linearRampToValueAtTime(2400, t0 + 4.1);
    g.gain.value = .04; n.connect(bp).connect(g).connect(ac.destination); n.start(t0 + 2.8); n.stop(t0 + 4.1);
  } catch(_) {}
}
let dialT = [];
function endDial(){ dialT.forEach(clearTimeout); dialT = []; $("#dial").classList.remove("open"); }
$("#dialskip").onclick = endDial;
$("#lform").addEventListener("submit", () => {
  document.body.classList.add("signedin");
  $("#dial").classList.add("open"); modem();
  const steps = [["Dialing 01-GHOST…", 12], ["Verifying username and password…", 38], ["Logging on to network…", 70], ["Connected at 56,000 bps. welcome to 2004.", 100]];
  steps.forEach(([t, w], i) => dialT.push(setTimeout(() => { $("#dialtxt").textContent = t; $("#dialbar").style.width = w + "%"; }, i * 1050)));
  dialT.push(setTimeout(endDial, 4700));
  markDock("room");
});
