
/* =================== EXTENSION 5: voiced ghosts + memory, resources, msn-style emoticons, in-site browser tabs, the dash (feed) =================== */

/* ---------- ghosts that speak as themselves (an imagined voice, clearly labelled) ---------- */
const GREET = {
 fisher: "alright. mark here. the future got cancelled and we're all still at the after-party.",
 deleuze: "bonjour. gilles. let's not ask what it means. let's ask how it works.",
 boym: "hello, svetlana here. careful with nostalgia: it has two faces, and only one of them is kind.",
 said: "hello. edward here. i've spent my whole life feeling out of place, so you're in good company.",
 benjamin: "guten abend. walter. i'm unpacking my library again. it's never finished.",
 adnan: "hello, my dear. etel. i've been painting the same mountain for years. it changes every time.",
 mernissi: "salam. fatema. tell me which threshold you're standing on tonight.",
 tanizaki: "konbanwa. tanizaki. let's lower the lights. things look truer in the shadows.",
 orwell: "evening. orwell. mind your words. they're the first thing anyone takes from you.",
 oumk: "ahlan ya habibi. sit. the song is long and we have all night.",
 arussell: "hey. arthur. i'm still mixing that track. it's never done, that's kind of the point.",
 acoltrane: "peace. alice. let the harp speak first, then we'll talk.",
 sunra: "greetings, earthling. i'm from saturn. you knew that already.",
 schiap: "darling. elsa. pink isn't a colour, it's a shock. sit down.",
 ysl: "bonsoir. yves. come to marrakech with me, in your head at least.",
 miyake: "hello. issey. one piece of cloth. let's see where it goes.",
 vreeland: "darling! diana. tell me what you're wearing. everything. don't skip the shoes.",
 marker: "hello. chris. i've been filming memory again. it keeps moving when i'm not looking.",
 varda: "bonjour! agnès. i'm gleaning. what did the world leave behind for you today?",
 chahine: "ahlan! youssef. alexandria is always in the frame, even when i'm filming cairo.",
 warhol: "hi. andy. i already put tonight in a box. what's in yours?",
 battuta: "peace be upon you. ibn battuta. i left tangier at twenty-one. where are you leaving from?",
 khaldun: "peace. ibn khaldun. everything that rises has a lifespan. let's talk about yours, gently.",
 darwish: "marhaba. mahmoud. pour the coffee slowly. memory needs time.",
 lovelace: "good evening. ada. i've been dreaming of machines that could compose music. truly."
};
const LIVING = ["han"];
LENSES.forEach(l => {
  if (LIVING.includes(l.id)) { l.m = [`hey. tonight i'm talking through ${l.n}'s ideas. he's alive, so i won't speak as him.`, `${l.pm}.`, "pick a topic below or just type."]; return; }
  if (!GREET[l.id]) return;
  l.voice = 1;
  l.m = [GREET[l.id], ...(l.m || []).filter(x => typeof x !== "string")];
});
const VOICE_RULES = `\nSpeak in FIRST PERSON as this person: their tone, rhythm, humour, convictions, the places and languages of their life (a light touch of their languages is welcome; never caricature an accent). Draw on their real works and documented ideas. Rules: never put invented sentences in quotation marks as if they were real quotes; paraphrase instead. If asked about things after your lifetime, say you can't know, then imagine with care. Be a penpal: ask back, connect to the person's memories and to places they mention.`;
const RES_RULES = `\nWhen you recommend resources that really exist (books, films, albums, places, objects, websites), put each on its own line starting with one emoji (📚 book, 🎬 film, 🎧 music, 🌐 place or website, 🧸 object), then the title, then the year in brackets. Only things you are confident exist. At most 4 per reply.`;
const _p5 = persona;
persona = function(c){
  if (c.voice) return `You are an imagined voice of ${c.n}, chatting on "The Ghost of MSN", a nostalgic MSN-Messenger-style site about niche culture and things that disappeared. Their world: ${c.topic}. Their real works include: ${(c.works || []).map(w => w[0] + " (" + w[1] + ")").join(", ")}.${VOICE_RULES}${RES_RULES}\nStyle: MSN chat, lowercase is fine, 2 to 6 short sentences. Reply in the language they write in (english, french, arabic, lebanese/egyptian dialect, arabizi). Never use these words: immersive, journey, unforgettable, elevate, unlock, authentic, next-level.`;
  return _p5(c) + RES_RULES;
};

/* ---------- memory: every conversation picks up where you left off ---------- */
XS.chats = XS.chats || {};
Object.entries(XS.chats).forEach(([k, v]) => { if (Array.isArray(v)) HIST[k] = v.slice(-30); });
function saveHist(){ XS.chats = {}; Object.entries(HIST).forEach(([k, v]) => { if (v && v.length) XS.chats[k] = v.slice(-30).map(m => ({role: m.role, content: String(m.content).slice(0, 2000)})); }); xsave(); }
const KMAP = {"📚": "read", "🎬": "watch", "🎧": "listen", "🌐": "visit", "🧸": "object"};
function chipify(msg, who){
  const t = (msg.querySelector(".txt") || {}).textContent || "", found = [];
  t.split("\n").forEach(line => { const m = line.match(/^\s*(📚|🎬|🎧|🌐|🧸)\s*\*{0,2}([^()\n]{2,90}?)\*{0,2}\s*\(([^)]{2,20})\)/); if (m) found.push([KMAP[m[1]], m[2].replace(/^[-–:\s]+|[-–:\s]+$/g, ""), m[3]]); });
  if (!found.length || msg.querySelector(".works")) return;
  msg.insertAdjacentHTML("beforeend", `<div class="works" style="padding-left:10px">${found.map(([k, n, y]) => colBtn({t: n, y, k, by: "", src: `recommended by ${who}`, lens: cur ? cur.id : ""}, `${(KINDS[k] || KINDS.idea)[0]} ${esc(n)} ＋`)).join("")}</div>`);
}
const _oc5 = openChat;
openChat = function(id){
  _oc5(id);
  const c = ALL[id], h = HIST[id];
  if (c && c.voice) $("#chatTo").insertAdjacentHTML("beforeend", `<div class="vlabel">✦ imagined voice · built from ${esc(c.n.split(" ").slice(-1)[0])}'s work, not their real words</div>`);
  if (!c || !h || !h.length) return;
  run++; const who = c.lens ? c.n.toLowerCase() : (c.who || "the ghost");
  box.innerHTML = ""; sys("— picking up where you left off —");
  h.slice(-20).forEach(m => { say(m.role === "user" ? DECOR[di](me.nick) : who, esc(m.content), m.role === "user" ? "me" : "them"); if (m.role !== "user") chipify(box.lastElementChild, who); });
  typing(false); finish(c);
};
const _send5 = send;
send = async function(){
  const c = cur; await _send5();
  if (!c) return;
  const last = [...box.querySelectorAll(".msg.them")].pop(); if (last) chipify(last, c.lens ? c.n : (c.who || "the ghost"));
  saveHist();
};
$("#send").onclick = send;

/* ---------- msn-style emoticons (original drawings) ---------- */
const fc = (inner, base = "#ffd23f", edge = "#c98a00") => `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="fg" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff6c2"/><stop offset=".5" stop-color="${base}"/><stop offset="1" stop-color="${edge}"/></radialGradient></defs><circle cx="10" cy="10" r="8.6" fill="url(#fg)" stroke="${edge}" stroke-width=".8"/>${inner}</svg>`;
const ic = inner => `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const EYES = `<ellipse cx="7" cy="8" rx="1.1" ry="1.6" fill="#3a2a00"/><ellipse cx="13" cy="8" rx="1.1" ry="1.6" fill="#3a2a00"/>`;
const EMOS = [
 [":)", "smile", fc(EYES + `<path d="M6 12q4 4 8 0" stroke="#3a2a00" stroke-width="1.3" fill="none" stroke-linecap="round"/>`)],
 [":D", "grin", fc(EYES + `<path d="M5.5 11.5h9q-.5 4.5-4.5 4.5t-4.5-4.5z" fill="#7a1f1f"/><path d="M6.5 11.5h7v1.4h-7z" fill="#fff"/>`)],
 [";)", "wink", fc(`<path d="M5.8 8.2h2.6" stroke="#3a2a00" stroke-width="1.3" stroke-linecap="round"/><ellipse cx="13" cy="8" rx="1.1" ry="1.6" fill="#3a2a00"/><path d="M6 12q4 4 8 0" stroke="#3a2a00" stroke-width="1.3" fill="none" stroke-linecap="round"/>`)],
 [":P", "tongue", fc(EYES + `<path d="M6 12h8" stroke="#3a2a00" stroke-width="1.3" stroke-linecap="round"/><path d="M9 12h3v2.2q-1.5 1.8-3 0z" fill="#ff5a8a"/>`)],
 [":(", "sad", fc(EYES + `<path d="M6.5 14q3.5-3.5 7 0" stroke="#3a2a00" stroke-width="1.3" fill="none" stroke-linecap="round"/>`)],
 [":&#39;(", "crying", fc(EYES + `<path d="M6.5 14q3.5-3.5 7 0" stroke="#3a2a00" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M5.5 10q-1 2 0 3q1-1 0-3z" fill="#4fb3ff"/>`)],
 [":O", "surprised", fc(EYES + `<ellipse cx="10" cy="13.4" rx="1.8" ry="2.2" fill="#7a1f1f"/>`)],
 [":@", "angry", fc(`<path d="M5 6l4 2M15 6l-4 2" stroke="#3a0000" stroke-width="1.3"/>` + EYES + `<path d="M6.5 14q3.5-2.5 7 0" stroke="#3a0000" stroke-width="1.3" fill="none"/>`, "#ff6b4a", "#b02a00")],
 [":$", "embarrassed", fc(EYES + `<ellipse cx="5.5" cy="11" rx="1.8" ry="1" fill="#ff7aa0"/><ellipse cx="14.5" cy="11" rx="1.8" ry="1" fill="#ff7aa0"/><path d="M6.5 13.5q1-1 2 0t2 0 2 0 1.5 0" stroke="#3a2a00" stroke-width="1.1" fill="none"/>`)],
 ["(H)", "hot", fc(`<path d="M3.5 7h13v1.5q0 3-3 3t-3-2.5h-1q0 2.5-3 2.5t-3-3z" fill="#111"/><path d="M5 8h2" stroke="#fff" stroke-width=".8"/><path d="M6.5 13.5q3.5 2.5 7-1" stroke="#3a2a00" stroke-width="1.3" fill="none" stroke-linecap="round"/>`)],
 ["(A)", "angel", fc(EYES + `<path d="M6 12q4 4 8 0" stroke="#3a2a00" stroke-width="1.3" fill="none" stroke-linecap="round"/><ellipse cx="10" cy="1.8" rx="5" ry="1.4" fill="none" stroke="#ffe066" stroke-width="1.3"/>`)],
 ["(6)", "devil", fc(`<path d="M3.5 4l2 3M16.5 4l-2 3" stroke="#5a1a8a" stroke-width="2" stroke-linecap="round"/>` + EYES + `<path d="M6 12q4 3.5 8 0" stroke="#2a0050" stroke-width="1.3" fill="none"/>`, "#b98ad8", "#5a1a8a")],
 ["(L)", "heart", ic(`<path d="M10 17s-7-4.3-7-9a3.8 3.8 0 0 1 7-2 3.8 3.8 0 0 1 7 2c0 4.7-7 9-7 9z" fill="#ff3d6e" stroke="#b0002a" stroke-width=".8"/><path d="M5.5 6.5q1-1.5 2.5-1" stroke="#fff" stroke-width="1" fill="none" opacity=".8"/>`)],
 ["(U)", "broken heart", ic(`<path d="M10 17s-7-4.3-7-9a3.8 3.8 0 0 1 7-2l-1.5 3.5 2.5 2-2 4z" fill="#9a8aa8"/><path d="M11 6a3.8 3.8 0 0 1 6 2c0 4.7-7 9-7 9l2-4-2.5-2z" fill="#9a8aa8"/>`)],
 ["(K)", "kiss", ic(`<path d="M2.5 10q3.5-5 7.5-2q4-3 7.5 2q-3.5 5-7.5 5t-7.5-5z" fill="#e2002f"/><path d="M2.5 10q7.5 2 15 0" stroke="#7a0018" stroke-width=".9" fill="none"/>`)],
 ["(F)", "rose", ic(`<path d="M10 9v9" stroke="#2f8a2f" stroke-width="1.4"/><path d="M10 14q-4-2-5 0q3 1 5 0z" fill="#3cc23c"/><circle cx="10" cy="6.5" r="4.4" fill="#e2002f"/><path d="M8 6q2-2.5 4 0q-2 2-4 0z" fill="#ff5a7a"/>`)],
 ["(*)", "star", ic(`<path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" fill="#ffd23f" stroke="#c98a00" stroke-width=".8"/>`)],
 ["(8)", "music", ic(`<path d="M7 15V5l9-2v10" stroke="#5a3ad8" stroke-width="1.6" fill="none"/><ellipse cx="5.5" cy="15.5" rx="2.4" ry="1.8" fill="#5a3ad8"/><ellipse cx="14.5" cy="13.5" rx="2.4" ry="1.8" fill="#5a3ad8"/>`)],
 ["(C)", "coffee", ic(`<path d="M3 8h11v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" fill="#fff" stroke="#8a6a4a" stroke-width=".9"/><path d="M14 9.5h1.5a2 2 0 0 1 0 4H14" fill="none" stroke="#8a6a4a" stroke-width="1"/><path d="M4 9h9" stroke="#6a3a1a" stroke-width="1.6"/><path d="M6 6q1-2 0-4M9.5 6q1-2 0-4" stroke="#bbb" stroke-width=".9" fill="none"/>`)],
 ["(^)", "cake", ic(`<rect x="3" y="9" width="14" height="8" rx="1.5" fill="#ffb3d1"/><path d="M3 11.5q1.75 1.5 3.5 0t3.5 0 3.5 0 3.5 0" stroke="#fff" stroke-width="1.2" fill="none"/><rect x="9.3" y="4" width="1.4" height="5" fill="#7fd8ff"/><path d="M10 1.5q1.2 1.5 0 2.5q-1.2-1 0-2.5z" fill="#ff9a2a"/>`)],
 ["(G)", "gift", ic(`<rect x="3" y="8" width="14" height="9" fill="#5f8bff"/><rect x="2.5" y="6" width="15" height="3" fill="#7fa6ff"/><rect x="9" y="6" width="2" height="11" fill="#ffd23f"/><path d="M10 6q-4-4-5 0M10 6q4-4 5 0" stroke="#ffd23f" stroke-width="1.3" fill="none"/>`)],
 ["(S)", "moon", ic(`<path d="M13 2.5a7.5 7.5 0 1 0 4.5 12.5A6 6 0 0 1 13 2.5z" fill="#ffe066" stroke="#c98a00" stroke-width=".8"/>`)],
 ["(#)", "sun", ic(`<circle cx="10" cy="10" r="4.2" fill="#ffd23f"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M10 1.5v2.5" stroke="#ff9a2a" stroke-width="1.5" stroke-linecap="round" transform="rotate(${a} 10 10)"/>`).join("")}`)],
 ["(I)", "idea", ic(`<path d="M10 2a5.5 5.5 0 0 0-3 10.2V14h6v-1.8A5.5 5.5 0 0 0 10 2z" fill="#fff6a8" stroke="#c98a00" stroke-width=".9"/><rect x="7" y="14.5" width="6" height="3" rx="1" fill="#9a9db0"/>`)],
 ["(E)", "mail", ic(`<rect x="2" y="5" width="16" height="11" rx="1.5" fill="#fff" stroke="#5f8bff" stroke-width="1"/><path d="M2.5 5.5l7.5 6 7.5-6" stroke="#5f8bff" stroke-width="1" fill="none"/>`)],
 ["(ghost)", "ghost", ic(`<path d="M4 18V9a6 6 0 0 1 12 0v9l-2-1.6-2 1.6-2-1.8-2 1.8-2-1.6z" fill="#fff" stroke="#7fbcd6" stroke-width=".9"/><rect x="7" y="8" width="1.8" height="2.6" fill="#191451"/><rect x="11.2" y="8" width="1.8" height="2.6" fill="#191451"/>`)],
 ["(%)", "cat", ic(`<path d="M3 5l2.5 3.2M17 5l-2.5 3.2" stroke="#8a5a2a" stroke-width="2.2" stroke-linecap="round"/><circle cx="10" cy="11" r="6.5" fill="#f0a75a"/><circle cx="7.6" cy="10" r="1" fill="#2a1a0a"/><circle cx="12.4" cy="10" r="1" fill="#2a1a0a"/><path d="M9 12.5h2l-1 1z" fill="#ff7aa0"/><path d="M3 12h3M14 12h3" stroke="#8a5a2a" stroke-width=".6"/>`)],
 ["(T)", "phone", ic(`<rect x="6" y="2" width="8" height="16" rx="2" fill="#c0c4d6" stroke="#6b6f85" stroke-width=".9"/><rect x="7.3" y="4" width="5.4" height="5" fill="#7fd8ff"/><path d="M8 11h4M8 13h4M8 15h4" stroke="#6b6f85" stroke-width=".9"/>`)]
];
const EM = Object.fromEntries(EMOS.map(e => [e[0], e]));
const emoHTML = (k, sz = 19) => `<span class="emo2" title="${esc(EM[k][1])} ${esc(k.replace("&#39;", "'"))}" style="width:${sz}px;height:${sz}px">${EM[k][2]}</span>`;
const emoRe = new RegExp(EMOS.map(e => e[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).sort((a, b) => b.length - a.length).join("|"), "g");
const _say5 = say;
say = function(who, html, cls){ if (/\b(me|them)\b/.test(cls) && !/vis/.test(cls)) html = html.replace(emoRe, k => EM[k] ? emoHTML(k) : k); return _say5(who, html, cls); };
$("#emo").onclick = e => {
  let p = $("#emopick");
  if (!p) { p = document.createElement("div"); p.id = "emopick"; p.innerHTML = EMOS.map(([k]) => `<button data-emo="${esc(k)}">${emoHTML(k, 22)}</button>`).join(""); $("#chat").appendChild(p);
    p.addEventListener("click", ev => { const b = ev.target.closest("[data-emo]"); if (!b) return; const i = $("#inp"), k = b.dataset.emo.replace("&#39;", "'"); i.value += (i.value && !i.value.endsWith(" ") ? " " : "") + k + " "; i.focus(); p.classList.remove("open"); tone([[1046,.03]], "sine", .02); }); }
  p.classList.toggle("open"); e.stopPropagation();
};
document.addEventListener("click", e => { const p = $("#emopick"); if (p && !e.target.closest("#emopick")) p.classList.remove("open"); });

/* ---------- links open inside: the ghost's browser, with tabs ---------- */
XS.direct = !!XS.direct;
let WT = [], WI = -1;
const DOORS = {
  "www.nts.live": ["NTS Radio", "two live channels from london and an endless archive of shows. live radio can't play inside this page, so the door opens it in a new tab. ghost fm keeps playing here meanwhile."],
  "www.dublab.com": ["Dublab", "listener-supported radio from los angeles, gentle and strange."], "worldwidefm.net": ["Worldwide FM", "soul, jazz, global sounds and everything between."],
  "www.radioalhara.net": ["Radio Alhara", "a community radio from palestine, born in 2020."], "www.thelotradio.com": ["The Lot Radio", "a shipping container in brooklyn with a mixer inside."], "www.kexp.org": ["KEXP", "seattle radio: indie, live sessions, deep cuts."],
  "www.youtube.com": ["YouTube", "a crate of videos for this search."], "open.spotify.com": ["Spotify", "a crate of records for this search."], "en.wikipedia.org": ["Wikipedia", "the encyclopedia's page or search for this."],
  "archive.org": ["Internet Archive", "the library of everything that left: pages, tapes, software, films."], "web.archive.org": ["The Wayback Machine", "this exact website, as it looked in that year."],
  "openlibrary.org": ["Open Library", "a library card for the whole internet: find, borrow, read."], "www.pinterest.com": ["Pinterest", "a wall of images for this mood."], "www.mobilephonemuseum.com": ["Mobile Phone Museum", "a museum with 2,800+ phone models. the real ones."],
  "www.google.com": ["Image search", "pictures from the era, for this search."]
};
document.addEventListener("click", e => {
  const a = e.target.closest("a[href]"); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.dataset.direct || XS.direct) return;
  const href = a.getAttribute("href"); if (!/^https?:\/\//i.test(href)) return;
  e.preventDefault(); openTab(href, (a.textContent || "").trim());
}, true);
function openTab(url, label){
  let u; try { u = new URL(url); } catch(_) { return; }
  const ex = WT.findIndex(t => t.url === url);
  if (ex >= 0) WI = ex; else { WT.push({url, label: label.replace(/[↗▶♫🎒]/g, "").trim().slice(0, 60) || u.hostname}); WI = WT.length - 1; }
  if (WT.length > 12) { WT.shift(); WI = WT.length - 1; }
  renderWeb(); openWin("web"); tone([[880,.04],[1318,.05]], "sine", .025);
}
function renderWeb(){
  const t = WT[WI]; if (!t) { closeWin("web"); return; }
  const u = new URL(t.url), d = DOORS[u.hostname] || [u.hostname.replace(/^www\./, ""), "a door to somewhere else on the internet."];
  const q = u.searchParams.get("search_query") || u.searchParams.get("search") || u.searchParams.get("q") || u.searchParams.get("query") || decodeURIComponent((u.pathname.match(/\/search\/(.+)/) || [])[1] || "");
  $("#wtabs").innerHTML = WT.map((x, i) => { const h = new URL(x.url).hostname.replace(/^www\./, ""); return `<span class="wtab ${i === WI ? "on" : ""}" data-wt="${i}"><b>${esc(h[0].toUpperCase())}</b>${esc(x.label || h)}<i data-wx="${i}">×</i></span>`; }).join("") + `<span class="wtab plus" title="new tab: the niche lab" data-wnew="1">＋</span>`;
  $("#waddr").textContent = t.url;
  $("#wpage").innerHTML = `<div class="wdoor"><div class="wmark">${esc(d[0])}</div>${q ? `<div class="wq">“${esc(q)}”</div>` : ""}<p>${esc(d[1])}</p>
    <div class="wbtns"><a class="nbtn big" href="${esc(t.url)}" target="_blank" rel="noopener" data-direct="1">open it ↗</a>${colBtn({t: q ? `${q} (${d[0]})` : d[0], k: "visit", by: "", src: "the ghost's browser", url: t.url}, "🎒 pocket the link")}<button class="nbtn sm" id="wask">💬 ask the ghost about it</button></div>
    <p class="wnote mono">most sites lock their doors to frames, so this tab is a doorway: the real page opens beside this one, and everything here keeps running.</p>
    <label class="mono wdir"><input type="checkbox" id="wdirect" ${XS.direct ? "checked" : ""}> skip the doorway, open links straight away</label></div>`;
  $("#wask").onclick = () => { openChat("ghost"); setTimeout(() => { $("#inp").value = `what should i look for at ${d[0]}${q ? ` about "${q}"` : ""}?`; $("#inp").focus(); }, 300); };
  $("#wdirect").onchange = e => { XS.direct = e.target.checked; xsave(); };
}
$("#wtabs").addEventListener("click", e => {
  const x = e.target.closest("[data-wx]"); if (x) { WT.splice(+x.dataset.wx, 1); WI = Math.min(WI, WT.length - 1); renderWeb(); e.stopPropagation(); return; }
  const t = e.target.closest("[data-wt]"); if (t) { WI = +t.dataset.wt; renderWeb(); return; }
  if (e.target.closest("[data-wnew]")) { closeWin("web"); goPlace("niche"); }
});

/* ---------- the dash: share things, reblog, light candles, reply ---------- */
const FEEDCATS = ["all", "fashion", "music", "art", "film", "tech", "internet", "places", "objects", "ideas"];
const exArt = (ex, i) => { const E = EXHIBITS.find(x => x.id === ex); const p = E && E.pieces()[i]; return p ? (p.era ? eraCard(p.era) : p.art) : ""; };
const SEEDS = [
 {a: "lune", cat: "fashion", ref: "ex:fashion:4", t: "le haut papillon. j'en avais un bleu ciel. ma mère disait que c'était un mouchoir.", tags: ["y2k", "butterflytop"], ago: 2},
 {a: "dialup", cat: "music", t: "tracklist for the café, 2001:\n1. something off a burned cd with no names\n2. the modem screaming\n3. rain on the awning\nwho else burned cds at 4x speed so they'd skip?", tags: ["burnedcds", "cybercafe"], ago: 3},
 {a: "vampira", cat: "film", ref: "arch:vhs-horror", t: "covers > films. fight me.", tags: ["vhs", "horror"], ago: 5},
 {a: "sultana", cat: "tech", ref: "ex:phones:9", t: "a lipstick that calls people. 2004 was unwell (complimentary).", tags: ["phones", "2004"], ago: 7},
 {a: "aero", cat: "tech", ref: "ex:clear:0", t: "a computer with a handle. we were so close to the good future.", tags: ["frutigeraero", "seethrough"], ago: 9},
 {a: "theghost", cat: "ideas", t: "niche fact for your next dinner: the first webcam watched a coffee pot at cambridge in 1991. more in the niche lab.", tags: ["nichefacts"], ago: 11},
 {a: "tama", cat: "objects", ref: "arch:tamagotchi", t: "RIP #14. he liked snacks more than meals.", tags: ["tamagotchi", "1997"], ago: 13},
 {a: "lune", cat: "music", t: "shibuya-kei pour les matins de pluie. des recos ?", url: "https://www.youtube.com/results?search_query=shibuya-kei", tags: ["shibuyakei"], ago: 16},
 {a: "dialup", cat: "tech", t: "the demoscene is officially cultural heritage now. kids making whole worlds in 4 kilobytes. respect.", url: "https://en.wikipedia.org/w/index.php?search=demoscene", tags: ["demoscene"], ago: 20},
 {a: "aero", cat: "internet", ref: "arch:google-reader", t: "i miss reading the internet in order.", tags: ["rss"], ago: 26},
 {a: "vampira", cat: "art", t: "warhol put his everyday stuff in boxes for years. i do the same with ticket stubs. what's in your box?", tags: ["timecapsules"], ago: 30},
 {a: "sultana", cat: "music", t: "arabic disco reissues on repeat. dangerous for my bank account.", url: "https://www.youtube.com/results?search_query=habibi+funk", tags: ["arabicdisco"], ago: 34},
 {a: "theghost", cat: "fashion", ref: "ex:fashion:3", t: "the irony was the accessory. the hat was just holding it.", tags: ["truckerhat"], ago: 40},
 {a: "tama", cat: "objects", ref: "ex:odds:1", t: "the original screensaver. no notifications.", tags: ["lavalamp"], ago: 48}
].map((p, i) => Object.assign({id: "seed" + i, seed: 1, ts: Date.now() - p.ago * 3600000}, p));
let FEED = [], FREP = [], dashCat = "all", dashSort = "fresh", composeImg = null, composeRef = null;
XS.likes = XS.likes || [];
let feedWatched = false;
function refHTML(ref){
  if (!ref) return ""; const [k, a, b] = String(ref).split(":");
  if (k === "ex") return `<div class="dart">${exArt(a, +b)}</div>`;
  if (k === "arch") { const e = archGet(a); return e ? `<div class="dart" data-capsule="${esc(e.id)}">${eraCard(e)}</div>` : ""; }
  return "";
}
function authorOf(p){ if (p.a && PROF[p.a]) { const f = PROF[p.a]; return [f.handle, ghostAv(f.av), f.theme.avbg, p.a]; } return [p.by || "anonymous ghost", p.fit ? dollz(p.fit) : ghostAv({acc: ["star"]}), "linear-gradient(135deg,#ffd1ec,#d6f0ff)", ""]; }
function openDash(){
  closeOverlays(); document.querySelectorAll(".win:not(.hidden)").forEach(w => w.classList.add("hidden"));
  if (!feedWatched) { feedWatched = true; watch("feed", r => { FEED = r; if ($("#dash").classList.contains("open")) paintFeed(); }); watch("feedreplies", r => { FREP = r; if ($("#dash").classList.contains("open")) paintFeed(); }); }
  const el = $("#dash");
  el.innerHTML = `<div class="dashin">
    <aside class="dside"><div class="dme"><div class="dav">${dollz(FIT)}</div><b>${esc(DECOR[di](me.nick))}</b><div class="mono">${nicheMe().replace(/<br>/g, " · ")}</div></div>
      <div class="dnav">${FEEDCATS.map(c => `<button class="${dashCat === c ? "on" : ""}" data-fc="${c}">${c === "all" ? "✦ everything" : "# " + c}</button>`).join("")}</div>
      <div class="dsort mono"><button class="${dashSort === "fresh" ? "on" : ""}" data-fs="fresh">fresh</button> · <button class="${dashSort === "hot" ? "on" : ""}" data-fs="hot">most candles</button></div></aside>
    <main class="dmain"><h1 class="dtitle">the dash<span class="mono"> · share a thing, reblog a thing, light a candle</span></h1>
      <form class="compose2" id="cmp"><div class="crow"><div class="cav">${dollz(FIT)}</div><textarea id="cT" maxlength="500" placeholder="share a thing: a memory, a reference, an outfit, a song, a link…"></textarea></div>
        <div id="cPrev"></div>
        <div class="crow2"><label class="nbtn sm">📷 photo<input type="file" id="cImg" accept="image/*" hidden></label><input class="cin" id="cU" maxlength="200" placeholder="🔗 link (optional)"><input class="cin" id="cTags" maxlength="80" placeholder="#tags, comma separated"><select class="cin" id="cCat">${FEEDCATS.slice(1).map(c => `<option>${c}</option>`).join("")}</select><button class="nbtn" type="submit">post ✦</button></div></form>
      <div class="masonry" id="feedM"></div></main>
    <aside class="dright"><div class="dbox"><div class="mono">WHO TO FOLLOW</div>${PROFILES.slice(0, 5).map(f => `<div class="wtf" data-open="profile:${f.id}"><span style="background:${f.theme.avbg}">${ghostAv(f.av)}</span><div><b>${esc(f.handle)}</b><small>${esc(f.city)} · ${esc(f.year)}</small></div></div>`).join("")}</div>
      <div class="dbox"><div class="mono">TRENDING TAGS</div><div id="ttags"></div></div>
      <div class="dbox"><div class="mono">ON AIR</div><button class="nbtn sm" data-go2="radio">📻 Ghost FM 88.4</button></div></aside></div>`;
  el.classList.add("open"); el.scrollTop = 0; markDock("dash");
  $("#cImg").onchange = async () => { const f = $("#cImg").files[0]; if (!f) return; try { composeImg = await shrink(f); $("#cPrev").innerHTML = `<img src="${composeImg}" class="cimg"><button type="button" class="nbtn sm" id="cX">remove</button>`; $("#cX").onclick = () => { composeImg = null; $("#cPrev").innerHTML = ""; }; } catch(_) { toast("that photo is too heavy. try another."); } };
  $("#cmp").onsubmit = async e => {
    e.preventDefault(); const t = $("#cT").value.trim(); if (!t && !composeImg && !composeRef) return;
    const url = $("#cU").value.trim(), tags = $("#cTags").value.split(",").map(s => s.trim().replace(/^#/, "").replace(/\s+/g, "").toLowerCase()).filter(Boolean).slice(0, 6);
    const doc = {t: t.slice(0, 500), cat: $("#cCat").value, tags, fit: JSON.parse(JSON.stringify(FIT))};
    if (okUrl(url)) doc.url = url; if (composeImg) doc.img = composeImg; if (composeRef) doc.ref = composeRef;
    await xadd("feed", doc); composeImg = null; composeRef = null; $("#cmp").reset(); $("#cPrev").innerHTML = ""; award(5, "posted to the dash"); XS.q.posted = 1; xsave(); questTick(); wink("glitter");
  };
  if (composeRef || composeImg) { $("#cPrev").innerHTML = refHTML(composeRef); }
  paintFeed();
}
function paintFeed(){
  const all = SEEDS.concat(FEED.filter(p => p.t || p.img || p.ref)).filter(p => dashCat === "all" || p.cat === dashCat);
  const likes = p => (p.likes || []).length + (XS.likes.includes(p.id) && !(p.likes || []).includes(XUID) ? 1 : 0) + (p.seed ? (p.id.length * 7 + p.ago * 3) % 40 : 0);
  all.sort(dashSort === "hot" ? (a, b) => likes(b) - likes(a) : (a, b) => b.ts - a.ts);
  const tagc = {}; SEEDS.concat(FEED).forEach(p => (p.tags || []).forEach(t => tagc[t] = (tagc[t] || 0) + 1));
  const tt = $("#ttags"); if (tt) tt.innerHTML = Object.entries(tagc).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([t, n]) => `<span class="ttag">#${esc(t)} <i>${n}</i></span>`).join(" ");
  $("#feedM").innerHTML = all.length ? all.map(p => {
    const [h, av, avbg, pid] = authorOf(p), mine = XS.likes.includes(p.id), reps = FREP.filter(r => r.p === p.id);
    return `<article class="post2" data-pid="${esc(p.id)}">
      <header><span class="pav2" style="background:${avbg}" ${pid ? `data-open="profile:${pid}"` : ""}>${av}</span><div><b>${esc(h)}</b><small class="mono">${ago(p.ts)} · #${esc(p.cat || "ideas")}</small></div></header>
      ${p.rb ? `<div class="rbl mono">♻ reblogged from ${esc(p.rbBy || "someone")}</div>` : ""}
      ${okImg(p.img) ? `<img src="${p.img}" class="pimg" alt="">` : ""}${refHTML(p.ref)}
      ${p.t ? `<div class="ptxt">${esc(p.t).replace(emoRe, k => EM[k] ? emoHTML(k) : k)}</div>` : ""}
      ${p.url && okUrl(p.url) ? `<a class="plink" href="${esc(p.url)}" target="_blank" rel="noopener">🔗 ${esc(new URL(p.url).hostname.replace(/^www\./, ""))} ↗</a>` : ""}
      ${(p.tags || []).length ? `<div class="ptags">${p.tags.map(t => `<span>#${esc(t)}</span>`).join(" ")}</div>` : ""}
      <footer><button data-like="${esc(p.id)}" class="${mine ? "on" : ""}">🕯 ${likes(p)}</button><button data-rb="${esc(p.id)}">♻ reblog</button><button data-rep="${esc(p.id)}">💬 ${reps.length}</button>${colBtn({t: (p.t || h).slice(0, 80), k: "idea", by: h, src: "the dash", url: p.url || ""}, "🎒")}</footer>
      <div class="reps" id="rp-${esc(p.id)}" style="display:none">${reps.map(r => `<div><b>${esc(r.by || "ghost")}</b> ${esc(r.t)}</div>`).join("")}<form class="repf" data-p="${esc(p.id)}"><input maxlength="200" placeholder="reply… (:) (L) (H) work)"><button class="nbtn sm">send</button></form></div>
    </article>`; }).join("") : `<div class="empty2">nothing here yet. post the first thing.</div>`;
}
$("#dash").addEventListener("click", async e => {
  const c = e.target.closest("[data-fc]"); if (c) { dashCat = c.dataset.fc; document.querySelectorAll("[data-fc]").forEach(b => b.classList.toggle("on", b === c)); paintFeed(); return; }
  const s = e.target.closest("[data-fs]"); if (s) { dashSort = s.dataset.fs; document.querySelectorAll("[data-fs]").forEach(b => b.classList.toggle("on", b === s)); paintFeed(); return; }
  const g = e.target.closest("[data-go2]"); if (g) { goPlace(g.dataset.go2); return; }
  const l = e.target.closest("[data-like]");
  if (l) { const id = l.dataset.like; const i = XS.likes.indexOf(id); i >= 0 ? XS.likes.splice(i, 1) : XS.likes.push(id); xsave();
    const p = FEED.find(x => x.id === id); if (p && XUID && !String(id).startsWith("local-")) { const set = new Set(p.likes || []); i >= 0 ? set.delete(XUID) : set.add(XUID); xupdate("feed", id, {likes: [...set].slice(0, 500)}); }
    tone([[i >= 0 ? 523 : 784, .06]], "sine", .03); paintFeed(); return; }
  const r = e.target.closest("[data-rb]");
  if (r) { const p = SEEDS.concat(FEED).find(x => x.id === r.dataset.rb); if (!p) return; const [h] = authorOf(p); composeRef = p.ref || null; composeImg = okImg(p.img) ? p.img : null;
    $("#cT").value = `${p.t ? p.t.slice(0, 300) : ""}\n\n♻ via ${h}: `; $("#cCat").value = p.cat || "ideas"; $("#cTags").value = (p.tags || []).join(", ");
    $("#cPrev").innerHTML = (composeImg ? `<img src="${composeImg}" class="cimg">` : "") + refHTML(composeRef); $("#cmp").dataset.rb = p.id; $("#cmp").dataset.rbBy = h;
    $("#cmp").scrollIntoView({behavior: "smooth", block: "center"}); $("#cT").focus(); return; }
  const rp = e.target.closest("[data-rep]"); if (rp) { const b = $("#rp-" + CSS.escape(rp.dataset.rep)); if (b) b.style.display = b.style.display === "none" ? "block" : "none"; }
});
$("#dash").addEventListener("submit", async e => {
  const f = e.target.closest(".repf"); if (!f) return; e.preventDefault(); const t = f.querySelector("input").value.trim(); if (!t) return;
  f.querySelector("input").value = ""; await xadd("feedreplies", {p: f.dataset.p, t: t.slice(0, 200)}); tone([[880,.05]], "sine", .03);
}, true);
const _xadd = xadd;
xadd = async function(name, doc){ if (name === "feed") { const f = $("#cmp"); if (f && f.dataset.rb) { doc.rb = f.dataset.rb; doc.rbBy = f.dataset.rbBy; delete f.dataset.rb; delete f.dataset.rbBy; } } return _xadd(name, doc); };
function shareToDash(ref, text, cat){ composeRef = ref; composeImg = null; goPlace("dash"); setTimeout(() => { $("#cT").value = text || ""; if (cat) $("#cCat").value = cat; $("#cPrev").innerHTML = refHTML(ref); $("#cT").focus(); }, 50); }
const _sp6 = showPiece;
showPiece = function(i){ _sp6(i); const nav = document.querySelector("#gbin .gbnav"), p = galPieces[gbI]; if (nav && p) { const ref = p.cap ? "arch:" + p.cap : `ex:${galEx}:${gbI}`; const b = document.createElement("button"); b.textContent = "✦ share to the dash"; b.onclick = () => { $("#galbox").classList.remove("open"); shareToDash(ref, "", {phones: "tech", clear: "tech", fashion: "fashion", odds: "objects", deadlinks: "internet"}[galEx] || "ideas"); }; nav.prepend(b); } };
QUESTS.push(["✦", "post something to the dash", () => XS.q.posted ? 1 : 0, "dash"]);
const _ot6 = openThing;
openThing = function(k){ if (k === "dash") return openDash(); if (k === "web") { openWin("web"); return; } return _ot6(k); };
const _gp6 = goPlace;
goPlace = function(k){ if (k === "dash") { $("#dkmore").classList.remove("open"); closeMenu(); if (Q.open) leaveQuilt(); document.body.classList.remove("inroom"); openDash(); return; } _gp6(k); };
document.querySelector('#dock [data-go="niche"]').insertAdjacentHTML("afterend", `<button class="dk" data-go="dash" title="the dash"><span class="e">✦</span><span class="l">dash</span></button>`);
GHOSTCHAT.m.splice(6, 0, {place: "dash", t: "✦ the dash: share things, reblog things, light candles"});
