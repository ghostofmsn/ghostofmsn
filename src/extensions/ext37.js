/* =================== EXTENSION 37: a shared database on Netlify, letters from strangers, sparks in the cybercafé, a chat rail on the side =================== */
(function(){
  /* ---------- 1. shared for everyone on the live site (Netlify Blobs via /api/db) ---------- */
  const LIVE = typeof LIVEWEB !== "undefined" && LIVEWEB;
  const API = "/api/db";
  const post = async (o) => { const r = await fetch(API, {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(o)}); if (!r.ok) throw {code: "unavailable"}; return r.json(); };
  const shim = {
    collection: c => ({
      add: async doc => ({id: (await post({op: "add", c, doc})).id}),
      onSnapshot: (cb, err) => { let stop = false; const tick = async () => { if (stop) return; try { const r = await fetch(API + "?c=" + encodeURIComponent(c), {cache: "no-store"}); if (!r.ok) throw 0; const j = await r.json(); cb({docs: (j.docs || []).map(d => ({id: d.id, data: () => d.data}))}); } catch(e) { err && err(e); } }; tick(); const t = setInterval(() => { if (!document.hidden) tick(); }, 20000); return () => { stop = true; clearInterval(t); }; }
    }),
    doc: path => { const [c, id] = path.split("/"); return { set: doc => post({op: "set", c, id, doc}), update: doc => post({op: "update", c, id, doc}) }; }
  };
  if (LIVE && !XDB) {
    XDB = shim;
    try { let u = localStorage.getItem("gomsn_uid"); if (!u) { u = "v" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); localStorage.setItem("gomsn_uid", u); } XUID = XUID || u; } catch(_) {}
  }

  /* ---------- 2. letters from strangers ---------- */
  const COLS = [["#2f2f33", "black"], ["#f4f2ee", "white"], ["#1f7f86", "teal"]];
  const SEED = [
    {id: "seed1", text: "to whoever reads this first: you're allowed to start again as many times as you need.", col: "#f4f2ee", sign: "the ghost", ts: 0},
    {id: "seed2", text: "leave something here you never said out loud. nobody will know it was you. that's the point.", col: "#1f7f86", sign: "the ghost", ts: 0},
    {id: "seed3", text: "if you're reading this at 3am: same.", col: "#2f2f33", sign: "the ghost", ts: 0}
  ];
  let L = [];
  document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="strangers"><div class="ls37wrap">
    <div class="l30head"><div><small>a wall of envelopes</small><h2>letters from strangers</h2></div><button class="bx" data-ls37x>×</button></div>
    <p class="ls37intro">take one, read it, put it back. leave one for someone you'll never meet. no names, no accounts, no replies.</p>
    <div class="ls37bar"><button class="xp big" data-ls37write>✉ write a letter</button><button class="xp" data-ls37rand>✦ pick one at random</button><button class="xp" data-ls37ghost>📮 the ghost's letters to you</button></div>
    <div class="ls37wall" id="ls37wall"></div></div></div>
    <div class="pop30" id="ls37read"><div class="ls37paper"><button class="bx" data-ls37c>×</button><div id="ls37in"></div></div></div>
    <div class="pop30" id="ls37new"><div class="ls37paper"><button class="bx" data-ls37c>×</button><h3>to a stranger,</h3>
      <textarea class="xp" id="ls37t" maxlength="1200" rows="9" placeholder="write it like nobody knows you. (please don't put names, numbers or addresses in it.)"></textarea>
      <input class="xp" id="ls37s" maxlength="40" placeholder="sign it without your name: 'someone in Beirut', 'a night shift'…">
      <div class="ls37cols">${COLS.map(([c, n], i) => `<button class="ls37c ${i ? "" : "on"}" data-ls37col="${c}" style="--c:${c}" title="${n} envelope"></button>`).join("")}</div>
      <div class="ls37act"><button class="xp big" data-ls37send>seal it and pin it to the wall</button></div><p class="ls37note" id="ls37note">${LIVE ? "it goes on the wall for everyone, anonymously." : "this preview keeps it on your browser. on the live site it goes up for everyone."}</p></div></div>`);
  const O = $("#strangers");
  const vis = () => L.filter(l => (l.reports || 0) < 3 && !(XS.hidLet || []).includes(l.id));
  const paint = () => { const ls = vis(); $("#ls37wall").innerHTML = ls.map((l, i) => { const first = String(l.text || "").split(/\s+/).slice(0, 4).join(" "); const s = [.8, 1, 1.25, .9, 1.1][i % 5]; return `<button class="env37" data-ls37="${esc(l.id)}" style="--c:${esc(l.col || "#f4f2ee")};--s:${s};--r:${((i * 37) % 9) - 4}deg"><i class="fl"></i><span class="pp">${esc(first)}…</span><i class="fr"></i><b class="pin l"></b><b class="pin r"></b></button>`; }).join("") || `<p class="ls37intro">the wall is empty. be the first.</p>`; };
  const load = rows => { const seen = new Set(); rows = rows.filter(r => r && !seen.has(r.id) && seen.add(r.id)); L = rows.map(r => ({id: r.id, text: r.text, col: r.col, sign: r.sign, ts: r.ts, reports: r.reports || 0})).concat(SEED.filter(s => !rows.some(r => r.id === s.id))); if ($("#strangers").classList.contains("open")) paint(); };
  let watching = false;
  const openS = () => { closeOverlays(); if (!watching) { watching = true; watch("strangers", load); } else load(ROWS.strangers || []); if (!L.length) load([]); paint(); O.classList.add("open"); };
  window.openStrangers = openS;
  const show = id => { const l = L.find(x => x.id === id); if (!l) return; $("#ls37in").innerHTML = `<p class="ls37text">${esc(l.text).replace(/\n/g, "<br>")}</p><p class="ls37sig">— ${esc(l.sign || "a stranger")}${l.ts ? `, ${new Date(l.ts).toLocaleDateString(undefined, {month: "long", year: "numeric"})}` : ""}</p><div class="ls37act"><button class="xp" data-ls37rand>✦ another one</button><button class="xp" data-ls37write>✉ write back to the wall</button>${String(l.id).startsWith("seed") ? "" : `<button class="xp ls37rep" data-ls37rep="${esc(l.id)}">report</button>`}</div>`; $("#ls37read").classList.add("open"); try { window.learn && window.learn("letter", "a letter from a stranger", String(l.text).slice(0, 140)); } catch(_) {} };
  let col = COLS[0][0];
  const BAD = /(https?:\/\/|www\.|@[a-z0-9_]{3,}|\+?\d[\d\s().-]{7,}\d)/i;
  document.addEventListener("click", async e => { const t = e.target;
    if (t.closest("[data-ls37x]")) { O.classList.remove("open"); return; }
    if (t.closest("[data-ls37c]") || t.id === "ls37read" || t.id === "ls37new") { $("#ls37read").classList.remove("open"); $("#ls37new").classList.remove("open"); return; }
    const env = t.closest("[data-ls37]"); if (env) { show(env.dataset.ls37); return; }
    if (t.closest("[data-ls37rand]")) { const v = vis(); if (v.length) show(v[Math.floor(Math.random() * v.length)].id); return; }
    if (t.closest("[data-ls37write]")) { $("#ls37read").classList.remove("open"); $("#ls37new").classList.add("open"); $("#ls37t").focus(); return; }
    if (t.closest("[data-ls37ghost]")) { O.classList.remove("open"); try { openThing("letters0"); } catch(_) {} return; }
    const cb = t.closest("[data-ls37col]"); if (cb) { col = cb.dataset.ls37col; document.querySelectorAll(".ls37c").forEach(b => b.classList.toggle("on", b === cb)); return; }
    const rp = t.closest("[data-ls37rep]"); if (rp) { const id = rp.dataset.ls37rep; (XS.hidLet = XS.hidLet || []).push(id); xsave(); const l = L.find(x => x.id === id); try { if (XDB && !id.startsWith("local-")) await XDB.doc("strangers/" + id).update({reports: ((l && l.reports) || 0) + 1}); } catch(_) {} $("#ls37read").classList.remove("open"); paint(); toast("thanks. it's hidden for you, and flagged."); return; }
    if (t.closest("[data-ls37send]")) { const text = $("#ls37t").value.trim(), sign = $("#ls37s").value.trim(); if (text.length < 3) { $("#ls37note").textContent = "write a little more."; return; } if (BAD.test(text) || BAD.test(sign)) { $("#ls37note").textContent = "no links, handles or phone numbers. keep it anonymous."; return; }
      const doc = {text: text.slice(0, 1200), sign: sign.slice(0, 40) || "a stranger", col, ts: Date.now()};
      let id = null; try { if (XDB) id = (await XDB.collection("strangers").add(doc)).id; } catch(_) { id = null; }
      if (!id) { doc.id = "local-" + doc.ts; (XS.local.strangers = XS.local.strangers || []).unshift(doc); xsave(); } else doc.id = id;
      ROWS.strangers = [doc].concat(ROWS.strangers || []); load(ROWS.strangers); paint();
      $("#ls37t").value = ""; $("#ls37s").value = ""; $("#ls37new").classList.remove("open"); toast(id ? "pinned to the wall. a stranger will find it." : "pinned. it's on your browser for now."); return; }
  });
  /* the letters door opens the wall now; the ghost's own letters stay one click away */
  try { const _ot = openThing; openThing = function(k){ if (k === "letters") return openS(); if (k === "letters0") return _ot("letters"); return _ot(k); }; } catch(_) {}
  try { const _gp = goPlace; goPlace = function(k){ if (k === "letters") { document.body.classList.remove("inroom"); return openS(); } return _gp(k); }; } catch(_) {}
  try { VERT.forEach(v => v.p.forEach(p => { if (p[0] === "letters") { p[2] = "Letters from Strangers"; p[3] = "a wall of envelopes. read one, leave one"; } })); } catch(_) {}

  /* ---------- 3. sparks on cybercafé titles ---------- */
  const QS = ["what's the first time you heard about this?", "who got there first, before anyone noticed?", "what would this look like in Beirut, or in your city?", "what's the most obscure thing you know about it?", "what does it smell like?", "what did people get wrong about it?", "if it had a uniform, what would it be?"];
  const sparkFor = title => { const t = String(title).toLowerCase(), RB = window.RABBIT || {};
    const g = Object.keys(RB).find(k => t.includes(k.toLowerCase())) || Object.keys(RB).find(k => k.split(/[\s-]/).some(w => w.length > 3 && t.includes(w)));
    const a = (typeof AES !== "undefined" ? AES : []).find(n => n.length > 3 && t.includes(n.toLowerCase()));
    if (g) return {h: `a rabbit hole: ${g}`, p: RB[g][1], go: `rh:${g}`};
    if (a) return {h: `an aesthetic: ${a}`, p: "it has its own page in the lab.", go: `ae:${a}`};
    const ks = Object.keys(RB), r = ks[Math.floor(Math.random() * ks.length)];
    return {h: "a question to post", p: QS[Math.floor(Math.random() * QS.length)], go: `rh:${r}`, alt: r}; };
  const deco = () => { const B = $("#forumBody"); if (!B) return;
    B.querySelectorAll("tr.g td:first-child > b").forEach(b => { if (b.parentNode.querySelector(".fs37")) return; b.insertAdjacentHTML("afterend", ` <button class="fs37" title="spark">✦</button>`); });
    const big = B.querySelector(".big1"); if (big && !big.querySelector(".fs37")) big.insertAdjacentHTML("beforeend", ` <button class="fs37" title="spark">✦</button>`); };
  const fb = $("#forumBody");
  if (fb) { new MutationObserver(deco).observe(fb, {childList: true});
    fb.addEventListener("click", e => { const s = e.target.closest(".fs37"); if (!s) return; e.stopPropagation();
      const row = s.closest("tr") || s.closest(".big1"); const title = (row.querySelector("b") || row).textContent.replace("✦", "").trim();
      const sp = sparkFor(title); const old = fb.querySelector(".sp37"); if (old) old.remove();
      (s.closest("td") || s.parentNode).insertAdjacentHTML("beforeend", `<div class="sp37"><b>✦ ${esc(sp.h)}</b><p>${esc(sp.p)}</p>${sp.alt ? `<small>or fall into: ${esc(sp.alt)}</small>` : ""}<button class="xp" data-sp37="${esc(sp.go)}">go →</button></div>`);
      try { window.learn && window.learn("spark", title, sp.h); } catch(_) {} }, true);
    fb.addEventListener("click", e => { const g = e.target.closest("[data-sp37]"); if (!g) return; e.stopPropagation(); const [k, v] = g.dataset.sp37.split(/:(.*)/); if (k === "rh") window.openRabbit(v); else if (window.openAesthetic) window.openAesthetic(v); }, true); }

  /* ---------- 4. the chat rail: MSN, group chats and the ghost, always on the side ---------- */
  const ROOMS = [["🔪", "the horror club", ["ghost", "cronenberg", "argento", "carpenter", "bava", "romero"]], ["✂", "the fitting room", ["ghost", "bowery", "vreeland", "schiap", "westwood", "mmargiela"]], ["🎞", "the late cinema", ["ghost", "lynch", "varda", "akerman", "chahine", "wkw"]], ["🌙", "the Beirut–Cairo table", ["ghost", "chahine", "saab", "bagdadi"]]];
  document.body.insertAdjacentHTML("beforeend", `<button id="rail37t" title="chats">💬<span>chats</span></button><aside id="rail37"><div class="r37h"><b>chats</b><button class="bx" data-r37x>×</button></div>
    <button class="r37i ghost" data-r37="ghost"><span class="r37av">${(typeof Z12 !== "undefined" && Z12.ghost) ? `<img src="${Z12.ghost}" alt="">` : "👻"}</span><span><b>the ghost</b><small>online · she has opinions</small></span><i class="r37dot"></i></button>
    <button class="r37i" data-r37="msn"><span class="r37av">💬</span><span><b>MSN</b><small>your contact list</small></span></button>
    <div class="r37s">group rooms</div>${ROOMS.map((r, i) => `<button class="r37i" data-r37g="${i}"><span class="r37av">${r[0]}</span><span><b>${esc(r[1])}</b><small>${r[2].length - 1} inside</small></span></button>`).join("")}
    <button class="r37i" data-r37="new"><span class="r37av">＋</span><span><b>start a group</b><small>invite anyone</small></span></button>
    <div class="r37s">elsewhere</div><button class="r37i" data-r37="strangers"><span class="r37av">✉</span><span><b>letters from strangers</b><small>read one, leave one</small></span></button>
    <button class="r37i" data-r37="talk"><span class="r37av">🚪</span><span><b>all the talk rooms</b><small>the cybercafé, the lounge, late night…</small></span></button></aside>`);
  const RL = $("#rail37");
  $("#rail37t").onclick = () => RL.classList.toggle("open");
  RL.addEventListener("click", e => { const t = e.target; if (t.closest("[data-r37x]")) { RL.classList.remove("open"); return; }
    const g = t.closest("[data-r37g]"); if (g) { window.openGroup(ROOMS[+g.dataset.r37g][2]); return; }
    const b = t.closest("[data-r37]"); if (!b) return; const k = b.dataset.r37;
    if (k === "ghost") openChat("ghost"); else if (k === "msn") goPlace("msn"); else if (k === "new") window.openGroup(["ghost"]); else if (k === "strangers") openS(); else if (k === "talk") window.openTalk(); });
})();
