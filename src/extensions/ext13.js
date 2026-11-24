
/* =================== EXTENSION 13: bigger chat, more ghosts, more quizzes, couture chess, solitaire, dig the crates, the loophole =================== */
/* ---------- the chat grows: resize from the corner, or maximise ---------- */
(function(){
  const tb = document.querySelector("#chat .tb"); if (tb) tb.insertAdjacentHTML("beforeend", `<button class="maxbtn" title="make it big" data-max>⤢</button>`);
  const toggle = w => { w.classList.toggle("maxed"); const b = w.querySelector("[data-max]"); if (b) b.textContent = w.classList.contains("maxed") ? "⤡" : "⤢"; };
  document.addEventListener("click", e => { const b = e.target.closest("[data-max]"); if (b) { e.stopPropagation(); toggle(b.closest(".win")); } }, true);
  document.addEventListener("dblclick", e => { const t = e.target.closest(".win .tb"); if (t && !e.target.closest("button")) toggle(t.closest(".win")); });
})();

/* ---------- more ghosts: dissent, tenderness, and a little bit of soul ---------- */
const DISSENT = {g: "Ghosts: dissent & tenderness", c: [
  {id: "kanafani", n: "Ghassan Kanafani", st: "on", cat: "dissent", pm: "why didn't they knock on the walls?", topic: "Palestinian literature, exile, the short story as testimony, Akka and Beirut, journalism, children's stories", works: [["Men in the Sun", 1963, "read"], ["Returning to Haifa", 1969, "read"]]},
  {id: "abulhawa", n: "Susan Abulhawa", st: "on", cat: "dissent", living: 1, pm: "novels as memory that refuses to be erased", topic: "Palestinian family sagas, Jenin, diaspora, women's interior lives under occupation, memory and land", works: [["Mornings in Jenin", 2010, "read"], ["The Blue Between Sky and Water", 2015, "read"], ["Against the Loveless World", 2020, "read"]]},
  {id: "najialali", n: "Naji al-Ali", st: "away", cat: "dissent", pm: "Handala still has his back to you", topic: "political cartooning, Handala the barefoot child witness, Kuwaiti and Lebanese newspapers, satire as conscience", works: [["Handala (first drawn)", 1969, "object"]]},
  {id: "fanon", n: "Frantz Fanon", st: "busy", cat: "dissent", pm: "psychiatry, colonialism, and the body that remembers", topic: "decolonisation, psychiatry at Blida, Martinique and Algeria, language and the colonised mind", works: [["Black Skin, White Masks", 1952, "read"], ["The Wretched of the Earth", 1961, "read"]]},
  {id: "saadawi", n: "Nawal El Saadawi", st: "on", cat: "dissent", pm: "the doctor who wouldn't be quiet", topic: "Egyptian feminism, medicine, women's bodies and the state, prison writing, fiction as protest", works: [["Woman at Point Zero", 1975, "read"], ["Memoirs from the Women's Prison", 1983, "read"]]},
  {id: "hooks", n: "bell hooks", st: "on", cat: "dissent", pm: "love is a verb, actually", topic: "love as practice, feminism for everybody, race and representation, teaching as freedom, Kentucky roots", works: [["Teaching to Transgress", 1994, "read"], ["All About Love", 2000, "read"]]},
  {id: "baldwin", n: "James Baldwin", st: "on", cat: "dissent", pm: "writing from Paris, about home", topic: "race in America, queerness, exile in Paris and Saint-Paul-de-Vence, love as a hard thing, the essay as sermon", works: [["Giovanni's Room", 1956, "read"], ["The Fire Next Time", 1963, "read"]]},
  {id: "lorde", n: "Audre Lorde", st: "away", cat: "dissent", pm: "the erotic as power, poetry as necessity", topic: "Black lesbian feminism, poetry, illness and self-care as survival, difference as strength", works: [["Zami: A New Spelling of My Name", 1982, "read"], ["Sister Outsider", 1984, "read"]]},
  {id: "adavis", n: "Angela Davis", st: "busy", cat: "dissent", living: 1, pm: "freedom is a constant struggle", topic: "prison abolition, Black feminism, the 1970s trial and campaign, music and women's blues, solidarity across movements", works: [["Women, Race & Class", 1981, "read"], ["Are Prisons Obsolete?", 2003, "read"]]},
  {id: "aroy", n: "Arundhati Roy", st: "on", cat: "dissent", living: 1, pm: "the god of small things, and big ones", topic: "the novel, Kerala, dams and displacement, essays against power, language play", works: [["The God of Small Things", 1997, "read"], ["The Ministry of Utmost Happiness", 2017, "read"]]},
  {id: "galeano", n: "Eduardo Galeano", st: "on", cat: "dissent", pm: "football, memory, and open veins", topic: "Latin American history told as fragments, football as poetry, Montevideo cafés, the story as resistance", works: [["Open Veins of Latin America", 1971, "read"], ["Soccer in Sun and Shadow", 1995, "read"]]},
  {id: "luxemburg", n: "Rosa Luxemburg", st: "away", cat: "dissent", pm: "letters from prison, mostly about birds", topic: "socialism, democracy, letters from prison, botany and birdsong, internationalism", works: [["The Accumulation of Capital", 1913, "read"], ["Letters from prison", 1917, "read"]]},
  {id: "leguin", n: "Ursula K. Le Guin", st: "on", cat: "dissent", pm: "imagine another way, then build it", topic: "anarchist utopias, the carrier bag theory of fiction, Earthsea, Taoism, science fiction as thought experiment", works: [["The Dispossessed", 1974, "read"], ["The Carrier Bag Theory of Fiction", 1986, "read"]]},
  {id: "obutler", n: "Octavia E. Butler", st: "busy", cat: "dissent", pm: "God is change", topic: "Afrofuturism, Earthseed, survival and community, notebooks of self-motivation, science fiction that predicts", works: [["Kindred", 1979, "read"], ["Parable of the Sower", 1993, "read"]]},
  {id: "sontag", n: "Susan Sontag", st: "on", cat: "dissent", pm: "notes on camp, notes on everything", topic: "camp, photography and ethics, illness as metaphor, Sarajevo, the essay as style", works: [["Notes on \"Camp\"", 1964, "read"], ["On Photography", 1977, "read"]]},
  {id: "nsimone", n: "Nina Simone", st: "on", cat: "dissent", pm: "an artist's duty is to reflect the times", topic: "classical training, jazz and soul, civil rights songs, Paris and the south of France, freedom as feeling", works: [["Mississippi Goddam", 1964, "listen"], ["Four Women", 1966, "listen"]]},
  {id: "gilscott", n: "Gil Scott-Heron", st: "away", cat: "dissent", pm: "the revolution will not be televised", topic: "spoken word, jazz-soul, poetry and protest, proto-rap, Harlem and Jackson Tennessee", works: [["Small Talk at 125th and Lenox", 1970, "listen"], ["Pieces of a Man", 1971, "listen"]]},
  {id: "ziad", n: "Ziad Rahbani", st: "on", cat: "dissent", pm: "bennesbeh la bokra… shou?", topic: "Lebanese theatre and jazz-oriental music, civil war satire, Hamra, radio sketches, Fairuz collaborations", works: [["Bennesbeh Labokra Shou?", 1978, "listen"], ["Film Ameriki Tawil", 1980, "watch"]]},
  {id: "basquiat", n: "Jean-Michel Basquiat", st: "busy", cat: "dissent", pm: "SAMO© was here", topic: "graffiti to galleries, crowns and anatomy, jazz, Haitian and Puerto Rican roots, the 80s downtown scene", works: [["SAMO© graffiti", 1978, "visit"], ["Untitled (Skull)", 1981, "object"]]}
]};
const GREET13 = {
  kanafani: "marhaba. ghassan. sit, the coffee's still warm. tell me what you're writing, even if it's just a list.",
  najialali: "ahlan. naji. handala's here too. he won't turn around yet, but he's listening.",
  fanon: "bonsoir. frantz. let's talk about what the body remembers before the mind admits it.",
  saadawi: "ahlan ya habibti. nawal. i'm a doctor, so i'll ask directly: what hurts?",
  hooks: "hey, sweetheart. bell. what are you practising loving today?",
  baldwin: "evening. jimmy. i'm in a café in paris, thinking about home, as usual. sit down.",
  lorde: "hello. audre. your silence will not protect you, so tell me something true.",
  galeano: "hola. eduardo. i've got a café table, a notebook and a football game on the radio. join me.",
  luxemburg: "guten abend. rosa. i've been watching the birds from the window. what have you been watching?",
  leguin: "hello, dear. ursula. let's imagine a world we'd actually want to live in, then poke holes in it.",
  obutler: "hi. octavia. i'm writing in my notebook again. what are you trying to make happen?",
  sontag: "hello. susan. i'm taking notes on everything, including you. relax, it's a compliment.",
  nsimone: "hey baby. nina. i've got the piano. you've got the night. what are we singing about?",
  gilscott: "peace. gil. the revolution's still off the air. let's talk anyway.",
  ziad: "ahla w sahla. ziad. no fuss: tell me what's going on with you, then we'll laugh at it.",
  basquiat: "hey. jean-michel. crown on, paint on. what are you making?"
};
DISSENT.c.forEach(l => {
  l.lens = 1; ALL[l.id] = l; LENSES.push(l); LENS[l.id] = l;
  if (l.living) { LIVING.push(l.id); l.m = [`hey. tonight i'm talking through ${l.n}'s work. they're alive, so i won't speak as them.`, `${l.pm}.`, {mood: l.works.map(w => [(KINDS[w[2]] || KINDS.idea)[0], w[0], pick(["#ffd6e7", "#d6f0ff", "#fff1c2", "#e6dcff"])]), cap: "their world, in objects. pocket what pulls at you ↓"}, "pick a topic below or just type."]; return; }
  l.voice = 1; l.m = [GREET13[l.id], {mood: l.works.map(w => [(KINDS[w[2]] || KINDS.idea)[0], w[0], pick(["#ffd6e7", "#d6f0ff", "#fff1c2", "#e6dcff"])]), cap: "their world, in objects. pocket what pulls at you ↓"}];
});
groups.push(DISSENT); renderCL();
Object.assign(GPORT, {
  kanafani: {body: "straight", skin: 2, hc: 0, do: "buzz", fh: "moustache", ex: ["glasses"], top: ["tee", 4], outer: ["denim", 5]},
  abulhawa: {body: "soft", skin: 2, hc: 0, do: "curls", lc: 2, top: ["tunic", 6]},
  najialali: {body: "straight", skin: 2, hc: 0, do: "buzz", fh: "moustache", top: ["tee", 4]},
  fanon: {body: "straight", skin: 4, hc: 0, do: "buzz", top: ["tee", 4], outer: ["denim", 5]},
  saadawi: {body: "soft", skin: 2, hc: WHITE, do: "curls", lc: 1, top: ["tunic", 6]},
  hooks: {body: "soft", skin: 4, hc: 0, do: "curls", ex: ["glasses"], lc: 2, top: ["tee", 3]},
  baldwin: {body: "slim", skin: 5, hc: 0, do: "buzz", lash: false, lc: 6, top: ["tee", 4], acc: ["choker", 5]},
  lorde: {body: "soft", skin: 5, hc: 0, do: "buns", ex: ["glasses"], lc: 2, top: ["tunic", 2], acc: ["hoops", 2]},
  adavis: {body: "slim", skin: 4, hc: 0, do: "curls", lc: 2, top: ["band", 5], acc: ["hoops", 2]},
  aroy: {body: "slim", skin: 3, hc: 0, do: "curls", lc: 2, top: ["tunic", 1]},
  galeano: {body: "broad", skin: 1, hc: GREY, do: "curls", fh: "beard", top: ["tee", 10]},
  luxemburg: {body: "slim", skin: 0, hc: 1, do: "buns", lc: 2, top: ["corset", 5]},
  leguin: {body: "soft", skin: 0, hc: WHITE, do: "bob", ex: ["glasses"], top: ["mesh", 9]},
  obutler: {body: "soft", skin: 4, hc: 0, do: "buzz", lash: false, lc: 2, top: ["tee", 9]},
  sontag: {body: "slim", skin: 0, hc: 0, do: "long", lc: 2, top: ["mesh", 5]},
  nsimone: {body: "soft", skin: 5, hc: 0, do: "buns", lc: 1, top: ["halter", 6], acc: ["hoops", 2]},
  gilscott: {body: "straight", skin: 4, hc: 0, do: "curls", fh: "beard", top: ["tee", 3]},
  ziad: {body: "broad", skin: 1, hc: GREY, do: "curls", fh: "stubble", ex: ["glasses"], top: ["tee", 4]},
  basquiat: {body: "straight", skin: 4, hc: 0, do: "spikes", top: ["band", 6], hair: ["tiara", 2]}
});
renderCL();

/* ---------- more quizzes ---------- */
const MEDRE = {
  q: [["it's 2:13am. you are…", [["sorting a playlist nobody asked for", "crate"], ["reading a wikipedia page about a lighthouse", "archive"], ["rehearsing your star academy audition in the mirror", "diva"], ["in a forum fight about a font", "cyber"], ["texting 'u up' to the moon", "soft"]]],
      ["pick a sound", [["a needle dropping", "crate"], ["a dial-up handshake", "cyber"], ["a nokia ringtone you composed", "diva"], ["rain on a tin roof in the mountains", "soft"], ["a page turning in an empty library", "archive"]]],
      ["your bag always has", [["a tote with three records", "crate"], ["a notebook with tabs", "archive"], ["a lip gloss and a backup lip gloss", "diva"], ["a usb stick with mystery files", "cyber"], ["a book of poems and a hair clip", "soft"]]],
      ["your ideal saturday", [["hamra flea markets then a basement set", "crate"], ["a museum's least visited room", "archive"], ["a wedding where you take over the dance floor", "diva"], ["fixing an old laptop at the cybercafé", "cyber"], ["a long lunch in the village with no signal", "soft"]]],
      ["someone says 'it's just a phase'", [["so was vinyl. look at us now", "crate"], ["i'll footnote that", "archive"], ["darling, i AM the phase", "diva"], ["patch notes incoming", "cyber"], ["phases are how the moon says hi", "soft"]]]],
  r: {crate: ["💿", "the crate digger", "your medre chou is the b-side. you find the song before the remix finds everyone else."],
      archive: ["🗂", "the 3am archivist", "your medre chou is a footnote that turns into a whole personality."],
      diva: ["🎤", "star academy, prime 7", "your medre chou is glitter with a political opinion. ya 3ayni."],
      cyber: ["🖥", "the cybercafé philosopher", "your medre chou is a forum thread from 2006 that still has the answer."],
      soft: ["🌙", "the soft rebel", "your medre chou is gentleness as a strategy. nobody sees it coming."]}
};
const TRIVIA = {
  y2k: ["Y2K pop culture", [
    ["which phone got called the 'banana phone'?", ["Nokia 8110", "Motorola StarTAC", "Siemens Xelibri"], 0],
    ["star academy's arab version first aired on which channel?", ["LBC", "MTV Lebanon", "Rotana"], 0],
    ["who sang 'ah w noss' (2004)?", ["Haifa Wehbe", "Nancy Ajram", "Elissa"], 1],
    ["what did a msn 'wizz' do?", ["shook the chat window", "deleted your contact", "changed your font"], 0],
    ["'tamally maak' is a song by", ["Amr Diab", "Kadim Al Sahir", "Wael Kfoury"], 0],
    ["what was the iMac G3's launch colour called?", ["Bondi blue", "Tangerine", "Graphite"], 0],
    ["which game came on the Nokia 3310?", ["Snake II", "Tetris", "Space Impact only"], 0],
    ["juicy couture tracksuits were famously made of", ["velour", "denim", "nylon"], 0],
    ["the simple life (paris hilton & nicole richie) premiered in", ["2003", "1999", "2008"], 0],
    ["myspace launched in", ["2003", "1997", "2009"], 0]]],
  niche: ["the niche nerd test", [
    ["which band is a pillar of shibuya-kei?", ["Pizzicato Five", "X Japan", "Boredoms"], 0],
    ["who designed the akari light sculptures?", ["Isamu Noguchi", "Achille Castiglioni", "Ettore Sottsass"], 0],
    ["'la jetée' (1962) is told almost entirely through", ["still photographs", "animation", "one long take"], 0],
    ["arthur russell's main instrument on 'world of echo'", ["cello", "harp", "synthesizer"], 0],
    ["the memphis design group (1981) was led by", ["Ettore Sottsass", "Philippe Starck", "Dieter Rams"], 0],
    ["who created handala, the barefoot boy with his back turned?", ["Naji al-Ali", "Mahmoud Kahil", "Ziad Rahbani"], 0],
    ["'ways of seeing' (1972) is by", ["John Berger", "Roland Barthes", "Susan Sontag"], 0],
    ["the habibi funk label is based in", ["Berlin", "Beirut", "Casablanca"], 0],
    ["which label introduced omar souleyman to western audiences?", ["Sublime Frequencies", "Warp", "Rough Trade"], 0],
    ["fairuz's long-time songwriting partners were", ["the Rahbani brothers", "the Gibb brothers", "the Chahine brothers"], 0]]],
  read: ["did you read it or did you just post it?", [
    ["'men in the sun' ends with the men", ["dying in a water tank", "reaching kuwait", "returning home"], 0],
    ["'mornings in jenin' begins with a family from", ["Ein Hod", "Haifa", "Gaza"], 0],
    ["bell hooks wrote 'all about love' in", ["2000", "1985", "2015"], 0],
    ["'giovanni's room' is set mainly in", ["Paris", "New York", "Rome"], 0],
    ["le guin's 'the dispossessed' has the subtitle", ["an ambiguous utopia", "a tale of two moons", "the left hand"], 0],
    ["octavia butler's 'parable of the sower' follows", ["Lauren Olamina", "Dana Franklin", "Anyanwu"], 0],
    ["sontag's 'notes on camp' is written as", ["numbered notes", "a play", "a diary"], 0]]]
};
function qMCQ(key){
  const [title, qs0] = TRIVIA[key], qs = qs0.slice().sort(() => Math.random() - .5); let i = 0, ok = 0;
  const step = () => {
    if (i >= qs.length) { const pct = ok / qs.length; $("#quizBody").innerHTML = `<div class="result"><div class="badge">${pct >= .8 ? "👑" : pct >= .5 ? "💅" : "🫠"}</div><div class="big1">${ok}/${qs.length}</div><p>${pct >= .8 ? "certified. the group chat bows." : pct >= .5 ? "cute. you've been around." : "no shame. now you know. pocket the ones you missed."}</p><button class="xp" id="qmenu">more quizzes</button></div>`; award(ok * 2); $("#qmenu").onclick = quizMenu; return; }
    const [q, opts, a] = qs[i], order = opts.map((o, j) => j).sort(() => Math.random() - .5);
    $("#quizBody").innerHTML = `<div class="qbar"><i style="width:${i / qs.length * 100}%"></i></div><div class="muted">${esc(title)}</div><div class="big1">${esc(q)}</div>${order.map(j => `<button class="qopt" data-j="${j}">${esc(opts[j])}</button>`).join("")}`;
    $("#quizBody").querySelectorAll("[data-j]").forEach(b => b.onclick = ev => { ev.stopPropagation(); const j = +b.dataset.j; if (j === a) { ok++; b.classList.add("right"); tone([[988,.1]], "sine", .04); } else { b.classList.add("wrong"); $("#quizBody").querySelector(`[data-j="${a}"]`).classList.add("right"); tone([[220,.15]], "square", .03); } setTimeout(() => { i++; step(); }, 900); });
  };
  step();
}
function qMedre(){
  const score = {}; let i = 0;
  const step = () => {
    if (i >= MEDRE.q.length) { const top = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0], [e, n, d] = MEDRE.r[top];
      $("#quizBody").innerHTML = `<div class="result"><div class="badge">${e}</div><div class="muted">your medre chou is…</div><div class="big1">${esc(n)}</div><p>${esc(d)}</p><button class="xp" id="qmenu">more quizzes</button></div>`; award(10); $("#qmenu").onclick = quizMenu; return; }
    const [q, opts] = MEDRE.q[i];
    $("#quizBody").innerHTML = `<div class="qbar"><i style="width:${i / MEDRE.q.length * 100}%"></i></div><div class="big1">${esc(q)}</div>${opts.map(([t, k]) => `<button class="qopt" data-k="${k}">${esc(t)}</button>`).join("")}`;
    $("#quizBody").querySelectorAll("[data-k]").forEach(b => b.onclick = ev => { ev.stopPropagation(); score[b.dataset.k] = (score[b.dataset.k] || 0) + 1; i++; step(); });
  };
  step();
}
const _qm13 = quizMenu; quizMenu = function(){ _qm13(); $("#quizBody").insertAdjacentHTML("beforeend", `
  <button class="qopt" data-q13="medre">🤷‍♀️ <b>what is your medre chou?</b><br><span class="muted">"ma bedre shou": the thing you're into that has no name yet</span></button>
  <button class="qopt" data-q13="y2k">💿 <b>Y2K pop culture</b><br><span class="muted">nokia, star academy, velour. 10 questions</span></button>
  <button class="qopt" data-q13="niche">🧠 <b>the niche nerd test</b><br><span class="muted">shibuya-kei, memphis, habibi funk</span></button>
  <button class="qopt" data-q13="read">📚 <b>did you read it or just post it?</b><br><span class="muted">kanafani, abulhawa, hooks, le guin</span></button>`); };
$("#quizBody").addEventListener("click", e => { const b = e.target.closest("[data-q13]"); if (!b) return; e.stopPropagation(); b.dataset.q13 === "medre" ? qMedre() : qMCQ(b.dataset.q13); }, true);

/* ---------- arcade: couture chess and solitaire, but make it cunty ---------- */
(function(){
  $("#gtabs").insertAdjacentHTML("beforeend", `<div class="tab" data-g="chess">♛ chess, but couture</div><div class="tab" data-g="sol">🃏 solitaire, but cunty</div>`);
  const _ra13 = renderArcade; renderArcade = function(){ if (GTAB === "chess") return chessUI(); if (GTAB === "sol") return solUI(); return _ra13(); };
  /* chess */
  const G = {K: "♚", Q: "♛", R: "♜", B: "♝", N: "♞", P: "♟"}, VAL = {P: 1, N: 3, B: 3, R: 5, Q: 9, K: 100};
  let B = null, turn = "w", sel = null, moves = [], over = "";
  const init = () => { const r = "RNBQKBNR".split(""); B = [r.map(p => "b" + p), Array(8).fill("bP"), ...Array.from({length: 4}, () => Array(8).fill(null)), Array(8).fill("wP"), r.map(p => "w" + p)]; turn = "w"; sel = null; moves = []; over = ""; };
  const inb = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
  function pseudo(b, r, c){ const p = b[r][c]; if (!p) return []; const col = p[0], t = p[1], out = [], add = (rr, cc) => { if (!inb(rr, cc)) return false; const q = b[rr][cc]; if (!q) { out.push([rr, cc]); return true; } if (q[0] !== col) out.push([rr, cc]); return false; };
    if (t === "P") { const d = col === "w" ? -1 : 1, s = col === "w" ? 6 : 1; if (inb(r + d, c) && !b[r + d][c]) { out.push([r + d, c]); if (r === s && !b[r + 2 * d][c]) out.push([r + 2 * d, c]); } [-1, 1].forEach(dc => { const q = inb(r + d, c + dc) && b[r + d][c + dc]; if (q && q[0] !== col) out.push([r + d, c + dc]); }); }
    if (t === "N") [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]].forEach(([a, d]) => add(r + a, c + d));
    if (t === "K") for (let a = -1; a <= 1; a++) for (let d = -1; d <= 1; d++) if (a || d) add(r + a, c + d);
    const ray = dirs => dirs.forEach(([a, d]) => { let rr = r + a, cc = c + d; while (add(rr, cc)) { rr += a; cc += d; } });
    if (t === "R" || t === "Q") ray([[1, 0], [-1, 0], [0, 1], [0, -1]]); if (t === "B" || t === "Q") ray([[1, 1], [1, -1], [-1, 1], [-1, -1]]);
    return out; }
  const apply = (b, [r, c], [rr, cc]) => { const n = b.map(row => row.slice()); n[rr][cc] = n[r][c]; n[r][c] = null; if (n[rr][cc][1] === "P" && (rr === 0 || rr === 7)) n[rr][cc] = n[rr][cc][0] + "Q"; return n; };
  const inCheck = (b, col) => { let k; for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (b[r][c] === col + "K") k = [r, c]; if (!k) return true; for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (b[r][c] && b[r][c][0] !== col && pseudo(b, r, c).some(([a, d]) => a === k[0] && d === k[1])) return true; return false; };
  const legal = (b, r, c) => pseudo(b, r, c).filter(m => !inCheck(apply(b, [r, c], m), b[r][c][0]));
  const all = (b, col) => { const out = []; for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (b[r][c] && b[r][c][0] === col) legal(b, r, c).forEach(m => out.push([[r, c], m])); return out; };
  const evalB = b => { let s = 0; b.forEach(row => row.forEach(p => { if (p) s += (p[0] === "b" ? 1 : -1) * VAL[p[1]]; })); return s; };
  function ai(){ const ms = all(B, "b"); if (!ms.length) return; let best = -1e9, pickM = ms[0];
    ms.forEach(m => { const n = apply(B, ...m); const rep = all(n, "w"); let worst = 1e9; (rep.length ? rep : [null]).forEach(r2 => { const v = r2 ? evalB(apply(n, ...r2)) : (inCheck(n, "w") ? 1000 : 0); worst = Math.min(worst, v); }); const v = worst + Math.random() * .4; if (v > best) { best = v; pickM = m; } });
    B = apply(B, ...pickM); turn = "w"; }
  function status(){ const col = turn, ms = all(B, col); if (!ms.length) { over = inCheck(B, col) ? (col === "w" ? "checkmate. she won. take notes." : "checkmate. you ate. 👑") : "stalemate. a draw, darling."; if (col === "b" && inCheck(B, col)) { award(30); badge("thinker"); } } }
  function draw(){ $("#gbody").innerHTML = `<div class="chesswrap"><div class="chesshead"><b>chess, but couture</b><span>${over || (turn === "w" ? "your move, icon" : "she's thinking…")}${!over && inCheck(B, turn) ? " · check!" : ""}</span><button class="xp" id="chnew">new game</button></div>
    <div class="cboard">${B.map((row, r) => row.map((p, c) => `<div class="sq ${(r + c) % 2 ? "d" : "l"} ${sel && sel[0] === r && sel[1] === c ? "sel" : ""} ${moves.some(([a, d]) => a === r && d === c) ? "mv" : ""}" data-sq="${r},${c}">${p ? `<span class="pc ${p[0]}">${G[p[1]]}</span>` : ""}</div>`).join("")).join("")}</div><small class="muted">you play chrome-pink. queens promote automatically. no castling: we don't do property here.</small></div>`;
    $("#chnew").onclick = () => { init(); draw(); }; }
  function chessUI(){ if (!B) init(); draw(); }
  $("#gbody").addEventListener("click", e => { if (GTAB !== "chess") return; const s = e.target.closest("[data-sq]"); if (!s || over || turn !== "w") return; const [r, c] = s.dataset.sq.split(",").map(Number);
    if (sel && moves.some(([a, d]) => a === r && d === c)) { B = apply(B, sel, [r, c]); sel = null; moves = []; turn = "b"; tone([[660,.05]], "sine", .03); status(); draw(); if (!over) setTimeout(() => { ai(); tone([[440,.05]], "sine", .03); status(); draw(); }, 350); return; }
    if (B[r][c] && B[r][c][0] === "w") { sel = [r, c]; moves = legal(B, r, c); } else { sel = null; moves = []; } draw(); });
  /* solitaire (klondike, draw one) */
  let S = null, pickS = null;
  const SU = ["♥", "♦", "♠", "♣"], RK = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const red = s => s < 2;
  function deal(){ const d = []; for (let s = 0; s < 4; s++) for (let r = 0; r < 13; r++) d.push({s, r, up: false}); d.sort(() => Math.random() - .5);
    S = {tab: Array.from({length: 7}, (_, i) => { const p = d.splice(0, i + 1); p[p.length - 1].up = true; return p; }), stock: d, waste: [], f: [[], [], [], []], moves: 0}; pickS = null; }
  const card = (c, attrs = "") => c.up ? `<div class="card ${red(c.s) ? "red" : "blk"}" ${attrs}><b>${RK[c.r]}</b><i>${SU[c.s]}</i><em>${SU[c.s]}</em></div>` : `<div class="card back" ${attrs}></div>`;
  function solDraw(){ const won = S.f.every(f => f.length === 13);
    $("#gbody").innerHTML = `<div class="solwrap"><div class="chesshead"><b>solitaire, but cunty</b><span>${won ? "you ATE. all four foundations. 💅" : `${S.moves} moves`}</span><button class="xp" id="solnew">new deal</button></div>
      <div class="soltop"><div class="slot" data-stock>${S.stock.length ? `<div class="card back"></div>` : `<div class="card empty">↻</div>`}</div><div class="slot" data-waste>${S.waste.length ? card(S.waste[S.waste.length - 1], `data-from="w" class="${pickS && pickS.from === "w" ? "pk" : ""}"`) : `<div class="card empty"></div>`}</div><span></span>
      ${S.f.map((f, i) => `<div class="slot" data-fd="${i}">${f.length ? card(f[f.length - 1]) : `<div class="card empty">${SU[i]}</div>`}</div>`).join("")}</div>
      <div class="soltab">${S.tab.map((p, i) => `<div class="pile" data-pile="${i}">${p.length ? p.map((c, j) => `<div class="pcwrap ${pickS && pickS.from === "t" && pickS.i === i && j >= pickS.j ? "pk" : ""}" style="top:${j * 22}px" data-tc="${i},${j}">${card(c)}</div>`).join("") : `<div class="card empty"></div>`}</div>`).join("")}</div>
      <small class="muted">click a card, then click where it goes. double-click sends a card home.</small></div>`;
    $("#solnew").onclick = () => { deal(); solDraw(); };
    if (won) { award(40); badge("memory"); } }
  function solUI(){ if (!S) deal(); solDraw(); }
  const canFound = (c, f) => f.length ? f[f.length - 1].s === c.s && f[f.length - 1].r === c.r - 1 : c.r === 0;
  const canTab = (c, p) => p.length ? (p[p.length - 1].up && red(p[p.length - 1].s) !== red(c.s) && p[p.length - 1].r === c.r + 1) : c.r === 12;
  const picked = () => pickS.from === "w" ? [S.waste[S.waste.length - 1]] : S.tab[pickS.i].slice(pickS.j);
  const removePicked = () => { if (pickS.from === "w") S.waste.pop(); else { S.tab[pickS.i].splice(pickS.j); const p = S.tab[pickS.i]; if (p.length) p[p.length - 1].up = true; } };
  function autoHome(from, i){ const c = from === "w" ? S.waste[S.waste.length - 1] : S.tab[i][S.tab[i].length - 1]; if (!c) return; const fi = S.f.findIndex(f => canFound(c, f)); if (fi < 0) return; pickS = from === "w" ? {from: "w"} : {from: "t", i, j: S.tab[i].length - 1}; removePicked(); S.f[fi].push(c); S.moves++; pickS = null; tone([[880,.05]], "sine", .03); solDraw(); }
  $("#gbody").addEventListener("dblclick", e => { if (GTAB !== "sol") return; const w = e.target.closest("[data-waste]"); if (w) return autoHome("w"); const t = e.target.closest("[data-tc]"); if (t) { const [i] = t.dataset.tc.split(",").map(Number); autoHome("t", i); } });
  $("#gbody").addEventListener("click", e => { if (GTAB !== "sol" || !S) return;
    if (e.target.closest("[data-stock]")) { if (S.stock.length) { const c = S.stock.pop(); c.up = true; S.waste.push(c); } else { S.stock = S.waste.reverse().map(c => (c.up = false, c)); S.waste = []; } pickS = null; S.moves++; solDraw(); return; }
    const fd = e.target.closest("[data-fd]"); if (fd && pickS) { const cs = picked(), f = S.f[+fd.dataset.fd]; if (cs.length === 1 && canFound(cs[0], f)) { removePicked(); f.push(cs[0]); S.moves++; tone([[880,.05]], "sine", .03); } pickS = null; solDraw(); return; }
    const wst = e.target.closest("[data-waste]"); if (wst && S.waste.length) { pickS = {from: "w"}; solDraw(); return; }
    const tc = e.target.closest("[data-tc]"), pile = e.target.closest("[data-pile]");
    if (pile && pickS) { const i = +pile.dataset.pile, cs = picked(); if (!(pickS.from === "t" && pickS.i === i) && canTab(cs[0], S.tab[i])) { removePicked(); S.tab[i].push(...cs); S.moves++; tone([[660,.04]], "sine", .03); pickS = null; solDraw(); return; } }
    if (tc) { const [i, j] = tc.dataset.tc.split(",").map(Number); if (S.tab[i][j].up) { pickS = {from: "t", i, j}; solDraw(); return; } }
    pickS = null; solDraw(); });
})();

/* ---------- dig the crates: vinyl, cds, cassettes, and the sites that keep the scene alive ---------- */
const CRATE = [
  ["Ahmed Malek", "The Electronic Tapes", 2018, "vinyl", "Algerian film-score synths, rescued by Habibi Funk"],
  ["Fairuz", "Wahdon", 1979, "vinyl", "Ziad Rahbani arranging his mother into jazz"],
  ["Ziad Rahbani", "Bennesbeh Labokra Shou?", 1978, "vinyl", "a play you can hear. Hamra in a record"],
  ["Sharhabil Ahmed", "The King of Sudanese Jazz", 2020, "vinyl", "Khartoum surf-jazz from the 60s and 70s"],
  ["Omar Souleyman", "Highway to Hassake", 2007, "cd", "Syrian wedding dabke at rave tempo, via Sublime Frequencies"],
  ["Hiroshi Yoshimura", "Music for Nine Post Cards", 1982, "vinyl", "Japanese ambient for a museum's lobby"],
  ["Midori Takada", "Through the Looking Glass", 1983, "vinyl", "marimba minimalism that the internet resurrected"],
  ["Pizzicato Five", "Happy End of the World", 1997, "cd", "shibuya-kei at its most glossy"],
  ["Arthur Russell", "World of Echo", 1986, "vinyl", "cello, voice and echo, alone at night"],
  ["Alice Coltrane", "Turiya Sings", 1982, "k7", "devotional songs first released on cassette"],
  ["Various", "Music from Saharan Cellphones", 2011, "k7", "songs swapped by bluetooth in the Sahel, via Sahel Sounds"],
  ["Mdou Moctar", "Afelan", 2013, "k7", "Tuareg guitar before the world caught up"],
  ["Ryuichi Sakamoto", "Thousand Knives", 1978, "vinyl", "the solo debut: synths meet Chinese melody"],
  ["Natacha Atlas", "Halim", 1997, "cd", "Brussels-born, Cairo-hearted trip-hop"],
  ["Rachid Taha", "Diwân", 1998, "cd", "Algerian classics, rewired in Paris"],
  ["Khaled", "Kenza", 1999, "cd", "raï goes stadium, keeps its heart"],
  ["Nancy Ajram", "Ah W Noss", 2004, "cd", "the CD every taxi in Beirut owned"],
  ["Björk", "Vespertine", 2001, "cd", "music for being alone with a laptop, on purpose"],
  ["Massive Attack", "Mezzanine", 1998, "cd", "Bristol after midnight"],
  ["Boards of Canada", "Music Has the Right to Children", 1998, "vinyl", "a broken VHS of your childhood"],
  ["Cocteau Twins", "Heaven or Las Vegas", 1990, "vinyl", "words optional, feelings mandatory"],
  ["Broadcast", "Haha Sound", 2003, "cd", "60s library music from the future"],
  ["Stereolab", "Dots and Loops", 1997, "vinyl", "lounge, Marx and Moog"],
  ["Air", "Moon Safari", 1998, "cd", "Versailles, but in space"],
  ["Sade", "Love Deluxe", 1992, "cd", "the sound of a very expensive silence"],
  ["Fela Kuti", "Zombie", 1977, "vinyl", "afrobeat that the army did not enjoy"],
  ["Gil Scott-Heron", "Pieces of a Man", 1971, "vinyl", "poetry with a bassline"],
  ["Nina Simone", "Wild Is the Wind", 1966, "vinyl", "four minutes that rearrange you"]
];
const SCENE = {
  vinyl: [["Discogs", "https://www.discogs.com/", "the database of every pressing ever. check what yours is worth"], ["Bandcamp Daily", "https://daily.bandcamp.com/", "deep, weird, lovingly written new releases"], ["The Vinyl Factory", "https://thevinylfactory.com/", "vinyl news, listening rooms, record-art culture"], ["Habibi Funk", "https://www.habibifunkrecords.com/", "reissues of Arab funk, jazz and disco"], ["Analog Africa", "https://www.analogafrica.com/", "African 70s gems, dug and licensed properly"], ["Sublime Frequencies", "https://www.sublimefrequencies.com/", "field recordings, cassette rips, wild compilations"], ["Light in the Attic", "https://lightintheattic.net/", "reissues, including the Japanese city pop series"], ["Numero Group", "https://numerogroup.com/", "archival label with obsessive liner notes"], ["Boomkat", "https://boomkat.com/", "experimental, ambient and leftfield record shop"], ["Aquarium Drunkard", "https://aquariumdrunkard.com/", "a blog that feels like a friend's record shelf"], ["Superfly Records", "https://www.superflyrecords.com/", "a Paris shop for jazz, soul and reissues"], ["Record Store Day", "https://recordstoreday.com/", "the yearly holiday for indie shops"]],
  cd: [["Discogs: CDs, 2000s", "https://www.discogs.com/search/?format_exact=CD&decade=2000", "every CD of the decade, with the inserts photographed"], ["CDJapan", "https://www.cdjapan.co.jp/", "Japanese pressings with obi strips and bonus tracks"], ["Museum of Portable Sound", "https://www.museumofportablesound.com/", "a museum about the devices that carried our music"], ["Internet Archive: CD-ROMs", "https://archive.org/details/cd-roms", "thousands of preserved CD-ROMs, playable in your browser"]],
  k7: [["Bandcamp: cassette tag", "https://bandcamp.com/tag/cassette", "tiny labels still dubbing tapes by hand"], ["Tapeheads", "https://www.tapeheads.net/", "the forum for decks, tapes and repair"], ["Sahel Sounds", "https://sahelsounds.com/", "the label behind Music from Saharan Cellphones"], ["Discogs: cassettes", "https://www.discogs.com/search/?format_exact=Cassette", "every tape ever catalogued"], ["Internet Archive: cassette search", "https://archive.org/search?query=cassette", "digitised tapes: mixtapes, radio rips, lost demos"]]
};
const LOOP = [["Are.na", "https://www.are.na/", "collect ideas into channels, like a museum for your brain"], ["The Public Domain Review", "https://publicdomainreview.org/", "strange beautiful things from the archive, free to use"], ["Cabinet Magazine", "https://www.cabinetmagazine.org/", "essays on curious objects and ideas"], ["Bidoun", "https://www.bidoun.org/", "art and culture from the Middle East and its diaspora"], ["Arab Image Foundation", "https://arabimagefoundation.org/", "a Beirut archive of photographs from the region"], ["Radio Garden", "https://radio.garden/", "spin the globe, hear live local radio"], ["Radiooooo", "https://radiooooo.com/", "pick a country and a decade, hear what played"], ["Window Swap", "https://www.window-swap.com/", "someone else's window, somewhere else"], ["Poolside FM", "https://poolside.fm/", "a 90s summer desktop that plays music"], ["Museum of Endangered Sounds", "https://savethesounds.info/", "the dial-up tone, the tamagotchi beep, preserved"], ["Cameron's World", "https://www.cameronsworld.net/", "a collage of the old geocities web"], ["Library of Babel", "https://libraryofbabel.info/", "every possible page of text, somewhere in there"], ["neal.fun", "https://neal.fun/", "small perfect web toys"], ["The Pudding", "https://pudding.cool/", "visual essays about culture, made from data"], ["Atlas Obscura", "https://www.atlasobscura.com/", "the world's hidden places"], ["Things Magazine", "https://thingsmagazine.net/", "a long-running blog of objects, design and archives"], ["The Useless Web", "https://theuselessweb.com/", "one button, endless pointless websites"], ["Internet Archive Wayback Machine", "https://web.archive.org/", "visit the websites that left"], ["Sabukaru", "https://sabukaru.online/", "Tokyo streetwear, subcultures and design"], ["The Quietus", "https://thequietus.com/", "long reads on left-of-centre music"]];
document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="crates"><div class="crwrap"><div class="bhead"><b>dig the crates</b><span>vinyl, cds, cassettes, and the people who keep the scene alive</span><button class="bx" data-crclose>×</button></div>
  <div class="crtabs" id="crtabs"><button data-cr="dig" class="on">💿 dig</button><button data-cr="vinyl">vinyl world</button><button data-cr="cd">cd world</button><button data-cr="k7">k7 world</button><button data-cr="loop">🌀 the loophole</button></div><div id="crbody"></div></div></div>`);
(function(){
  let tab = "dig", fmt = "all";
  const q = s => encodeURIComponent(s);
  const sleeve = (r, i) => { const h = (r[0] + r[1]).split("").reduce((a, ch) => a * 31 + ch.charCodeAt(0) & 1e6, 7); const c1 = `hsl(${h % 360},70%,55%)`, c2 = `hsl(${(h * 7) % 360},60%,25%)`;
    return `<div class="sleeve ${r[3]}" style="--c1:${c1};--c2:${c2}" data-rec="${i}"><div class="disc"></div><div class="cov"><b>${esc(r[1])}</b><span>${esc(r[0])}</span><em>${r[2]} · ${r[3] === "k7" ? "cassette" : r[3]}</em></div></div>`; };
  function paint(){
    document.querySelectorAll("#crtabs button").forEach(b => b.classList.toggle("on", b.dataset.cr === tab));
    const b = $("#crbody");
    if (tab === "dig") { const list = CRATE.map((r, i) => [r, i]).filter(([r]) => fmt === "all" || r[3] === fmt).sort(() => Math.random() - .5).slice(0, 8);
      b.innerHTML = `<div class="crfmt">${["all", "vinyl", "cd", "k7"].map(f => `<button data-fmt="${f}" class="${fmt === f ? "on" : ""}">${f === "k7" ? "cassette" : f}</button>`).join("")}<button data-shuffle>↻ dig again</button></div><div class="crgrid">${list.map(([r, i]) => sleeve(r, i)).join("")}</div><small class="muted">click a record to see what it is, pocket it, or find it on Discogs, Bandcamp, Spotify and Anghami.</small>`; }
    if (SCENE[tab]) b.innerHTML = `<div class="crlinks">${SCENE[tab].map(([n, u, d]) => `<a href="${u}" target="_blank" rel="noopener"><b>${esc(n)} ↗</b><span>${esc(d)}</span></a>`).join("")}</div><small class="muted">these sites update all the time: this is where the scene's news lives.</small>`;
    if (tab === "loop") { const s = pick(LOOP); b.innerHTML = `<div class="loop"><div class="loopcard"><span>you fell into</span><b>${esc(s[0])}</b><p>${esc(s[2])}</p><a class="bact" href="${s[1]}" target="_blank" rel="noopener">go in ↗</a></div><button class="bact" data-loop>🌀 fall again</button><div class="crlinks small">${LOOP.map(([n, u, d]) => `<a href="${u}" target="_blank" rel="noopener"><b>${esc(n)} ↗</b><span>${esc(d)}</span></a>`).join("")}</div></div>`; }
  }
  $("#crtabs").addEventListener("click", e => { const t = e.target.closest("[data-cr]"); if (t) { tab = t.dataset.cr; paint(); } });
  $("#crbody").addEventListener("click", e => {
    const f = e.target.closest("[data-fmt]"); if (f) { fmt = f.dataset.fmt; paint(); return; }
    if (e.target.closest("[data-shuffle]") || e.target.closest("[data-loop]")) { paint(); tone([[300 + Math.random() * 300, .06]], "triangle", .03); return; }
    const s = e.target.closest("[data-rec]"); if (s) { const r = CRATE[+s.dataset.rec], qq = q(r[0] + " " + r[1]);
      openMeaning({t: r[1], by: r[0], y: r[2], k: "listen", src: "the crates", line: `${r[3] === "k7" ? "cassette" : r[3]} · ${r[4]}.`, url: `https://www.discogs.com/search/?q=${qq}&type=all`}); }
  });
  $("#crates").addEventListener("click", e => { if (e.target.closest("[data-crclose]") || e.target.id === "crates") $("#crates").classList.remove("open"); });
  window.openCrates = t => { closeOverlays(); if (t) tab = t; paint(); $("#crates").classList.add("open"); };
  const _ex13 = explore; explore = function(s){ let h = _ex13(s); if (s.k === "listen") { const qq = encodeURIComponent(`${s.t} ${s.by || ""}`.trim()); h += `<a href="https://www.discogs.com/search/?q=${qq}&type=all" target="_blank" rel="noopener">discogs ↗</a><a href="https://bandcamp.com/search?q=${qq}" target="_blank" rel="noopener">bandcamp ↗</a>`; } return h; };
  const _gp13 = goPlace; goPlace = function(k){ if (k === "crates") { if (Q.open) leaveQuilt(); document.body.classList.remove("inroom"); window.openCrates(); return; } if (k === "loophole") { if (Q.open) leaveQuilt(); document.body.classList.remove("inroom"); window.openCrates("loop"); return; } return _gp13(k); };
  /* the record crate in the room now opens the crates */
  const _ot13 = openThing; openThing = function(k){ if (k === "crates") { window.openCrates(); return; } return _ot13(k); };
  try { VERT.forEach(v => { if (v.id === "explore") v.p.push(["crates", "💿", "dig the crates", "vinyl, cds, cassettes and the sites that keep the scene alive"], ["loophole", "🌀", "the loophole", "fall into a random niche corner of the internet"]); }); } catch(_) {}
  const sc = $("#startcard"); if (sc) sc.querySelector("small").insertAdjacentHTML("beforebegin", `<button data-go="crates">💿 dig the crates</button>`);
  const _gfr13 = goFromRoom; goFromRoom = function(k, e){ if (k === "crates") { document.body.classList.remove("inroom"); window.openCrates(); return; } return _gfr13(k, e); };
})();
