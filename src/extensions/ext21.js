
/* =================== EXTENSION 21: group chats with the ghosts (and anyone you think of) =================== */
(function(){
  document.body.insertAdjacentHTML("beforeend", `<div class="win hidden" id="gchat" style="left:180px;top:90px;width:560px;height:600px">
    <div class="tb"><span class="t" id="gcT">group conversation</span><button data-max title="make it big">⤢</button><button data-close="gchat" title="close">×</button></div>
    <div class="gcwrap"><div class="gcmembers" id="gcM"></div><div class="msgs gcmsgs" id="gcMsgs"></div>
      <div class="gctools"><button class="xp" id="gcAdd">＋ invite someone</button><button class="xp" id="gcTopic">✦ give us a topic</button><button class="xp" id="gcNew">new group</button><button class="xp" id="gcSaved">my groups</button></div>
      <div class="compose"><textarea class="xp" id="gcInp" placeholder="say something to everyone…"></textarea><button class="xp" id="gcSend">Send</button></div><div class="status" id="gcTyping"></div></div></div>
    <div class="ov" id="gcpick"><div class="bwrap gcpwrap"><div class="bhead"><b>invite to the group</b><span>pick ghosts, or type anyone you think of</span><button class="bx" data-gpclose>×</button></div><div id="gcpBody"></div></div></div>`);
  const W = $("#gchat");
  /* drag + front, like every other window */
  W.addEventListener("pointerdown", () => front(W));
  const tb = W.querySelector(".tb"); tb.addEventListener("pointerdown", e => { if (e.target.closest("button") || innerWidth < 700) return; const r = W.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top; try { tb.setPointerCapture(e.pointerId); } catch(_) {} const mv = ev => { W.style.left = Math.max(60 - r.width, Math.min(innerWidth - 60, ev.clientX - dx)) + "px"; W.style.top = Math.max(64, Math.min(innerHeight - 70, ev.clientY - dy)) + "px"; }; const up = () => { tb.removeEventListener("pointermove", mv); tb.removeEventListener("pointerup", up); }; tb.addEventListener("pointermove", mv); tb.addEventListener("pointerup", up); });

  XS.groups = XS.groups || []; let G = null, busy = false;
  const slug = s => "c_" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30);
  const who = id => { if (id === "ghost") return {id, n: "GoMsn", mode: "host"}; const c = ALL[id]; if (c) return {id, n: c.n, mode: c.voice ? "voice" : "lens", topic: c.topic, works: c.works}; const cu = (G && G.custom || []).find(x => x.id === id); return cu ? Object.assign({mode: cu.passed ? "voice" : "lens"}, cu) : {id, n: id, mode: "lens"}; };
  const avatar = m => { if (m.id === "ghost") return ghostImg(); const c = ALL[m.id]; if (c && c.lens) return portrait(gfit(m.id)); return `<span class="gcinit" style="background:hsl(${[...m.n].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 360},70%,55%)">${esc(m.n.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase())}</span>`; };
  const meAv = () => { const a = document.querySelector("#cl .me .av"); return a ? a.innerHTML : ""; };
  function save(){ if (!G) return; const i = XS.groups.findIndex(g => g.id === G.id); G.msgs = G.msgs.slice(-60); if (i >= 0) XS.groups[i] = G; else XS.groups.unshift(G); XS.groups = XS.groups.slice(0, 12); try { xsave(); } catch(_) {} }
  function title(){ const names = G.members.map(id => who(id).n.split(" ")[0]); $("#gcT").textContent = names.length ? names.slice(0, 4).join(", ") + (names.length > 4 ? ` +${names.length - 4}` : "") : "group conversation"; }
  function paint(){
    $("#gcM").innerHTML = G.members.map(id => { const m = who(id); return `<div class="gcm" title="${esc(m.n)}${m.mode === "lens" ? " · through their ideas" : ""}"><span class="gcav">${avatar(m)}</span><small>${esc(m.n.split(" ")[0])}</small><i data-gcrm="${esc(id)}">×</i></div>`; }).join("") + `<div class="gcm add" id="gcAdd2"><span class="gcav">＋</span><small>invite</small></div>`;
    $("#gcMsgs").innerHTML = G.msgs.map(mm => { if (mm.sys) return `<div class="gcsys">${esc(mm.t)}</div>`; const m = mm.me ? null : who(mm.id); return `<div class="gcl ${mm.me ? "me" : ""}"><span class="gcav s">${mm.me ? meAv() : avatar(m)}</span><div><b>${mm.me ? esc(me.nick || "you") : esc(mm.label || m.n)}</b> says:<p>${esc(mm.t).replace(/\n/g, "<br>")}</p></div></div>`; }).join("");
    $("#gcMsgs").scrollTop = 1e6; title();
  }
  function start(members = ["ghost"]){ G = {id: "g" + Date.now().toString(36), members: [...new Set(members)], custom: [], msgs: []}; G.msgs.push({sys: 1, t: "a new group conversation. GoMsn is hosting."}); save(); openWin("gchat"); paint(); }
  window.openGroup = (members) => { start(members || ["ghost"]); if (!members || members.length < 2) openPicker(); };
  function invite(ids, label){ ids.forEach(id => { if (!G.members.includes(id)) { G.members.push(id); G.msgs.push({sys: 1, t: `${who(id).n} joined the conversation.`}); } }); save(); paint(); tone([[660,.06],[880,.08]], "sine", .03); }

  /* the picker */
  function openPicker(){
    const groupsHTML = groups.map(gr => { const cs = gr.c.filter(c => c.lens); if (!cs.length) return ""; return `<div class="gcpg"><b>${esc(gr.g.replace(/^Ghosts:\s*/i, ""))}</b><div>${cs.map(c => `<label class="gcpc ${G.members.includes(c.id) ? "in" : ""}"><input type="checkbox" value="${c.id}" ${G.members.includes(c.id) ? "checked disabled" : ""}><span class="gcav s">${portrait(gfit(c.id))}</span>${esc(c.n)}${c.voice ? "" : " <i>· ideas</i>"}</label>`).join("")}</div></div>`; }).join("");
    $("#gcpBody").innerHTML = `<div class="gcpfree"><label>add anyone you think of</label><div class="lrow"><input class="cuin" id="gcpName" maxlength="40" placeholder="e.g. Etel Adnan, Fairuz, my grandmother, the first MySpace Tom"><button class="bact" id="gcpAddName">add</button></div>
      <label class="stchk"><input type="checkbox" id="gcpPassed"> they've passed away, so they can speak as themselves (an imagined voice)</label>
      <small class="muted">anyone alive, or anyone you don't tick, joins through their ideas: GoMsn tells the group what they've said and stood for, without putting words in their mouth.</small></div>
      <div class="gcplist">${groupsHTML}</div><button class="bact" id="gcpDone">invite the ones i ticked</button>`;
    $("#gcpick").classList.add("open");
  }
  $("#gcpick").addEventListener("click", e => {
    if (e.target.closest("[data-gpclose]") || e.target.id === "gcpick") { $("#gcpick").classList.remove("open"); return; }
    if (e.target.id === "gcpAddName") { const n = $("#gcpName").value.trim(); if (!n) return; const id = slug(n); if (!G.custom.some(c => c.id === id)) G.custom.push({id, n, passed: $("#gcpPassed").checked, topic: "their life, work and ideas as publicly known"}); invite([id]); $("#gcpName").value = ""; $("#gcpPassed").checked = false; toast(`${esc(n)} joined the conversation.`); return; }
    if (e.target.id === "gcpDone") { const ids = [...document.querySelectorAll("#gcpBody input[type=checkbox][value]:checked:not(:disabled)")].map(i => i.value); invite(ids); $("#gcpick").classList.remove("open"); if (ids.length && G.msgs.filter(m => !m.sys).length === 0) reply("(the group just formed. everyone says hello in their own way and GoMsn introduces everyone with one wry line.)"); }
  });
  $("#gcpBody").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.id === "gcpName") { e.preventDefault(); $("#gcpAddName").click(); } });
  W.addEventListener("click", e => {
    const rm = e.target.closest("[data-gcrm]"); if (rm) { const id = rm.dataset.gcrm; G.members = G.members.filter(x => x !== id); G.msgs.push({sys: 1, t: `${who(id).n} left the conversation.`}); save(); paint(); return; }
    if (e.target.closest("#gcAdd2")) openPicker();
  });
  $("#gcAdd").onclick = openPicker;
  $("#gcNew").onclick = () => window.openGroup(["ghost"]);
  $("#gcTopic").onclick = () => { $("#gcInp").value = pick(["what's the most beautiful thing that disappeared in your lifetime?", "is nostalgia a kind of resistance or a kind of surrender?", "what would you put on a mixtape for a stranger?", "what does home sound like?", "what should we never let the internet forget?", "is it possible to be gentle and radical at the same time?", "what's a small object that changed your life?"]); $("#gcInp").focus(); };
  $("#gcSaved").onclick = () => { if (!XS.groups.length) { toast("no saved groups yet."); return; } const b = XS.groups.map((g, i) => `<button class="bact" data-gload="${i}">👥 ${esc(g.members.map(id => (ALL[id] || (g.custom || []).find(c => c.id === id) || {n: id === "ghost" ? "GoMsn" : id}).n.split(" ")[0]).join(", "))}</button>`).join(""); $("#gcMsgs").insertAdjacentHTML("beforeend", `<div class="gcsys gcload">${b}</div>`); $("#gcMsgs").scrollTop = 1e6; };
  $("#gcMsgs").addEventListener("click", e => { const b = e.target.closest("[data-gload]"); if (b) { G = XS.groups[+b.dataset.gload]; paint(); } });

  /* talking: one call, several voices */
  async function reply(userText){
    if (busy) return; busy = true;
    const S = await getSample(), typ = $("#gcTyping");
    if (!S) { G.msgs.push({sys: 1, t: "the ghosts answer on this page's claude.ai link, signed in. (on other hosts they're asleep.)"}); save(); paint(); busy = false; return; }
    const ms = G.members.map(who), names = ms.map(m => m.n);
    typ.textContent = `${names.slice(0, 3).map(n => n.split(" ")[0].toLowerCase()).join(", ")} ${names.length > 1 ? "are" : "is"} typing…`;
    const roster = ms.map(m => m.mode === "host" ? `- GoMsn: the host. the ghost of msn itself. wry, warm, second-degree, a little sassy, born in a chat window in 1999.` : m.mode === "voice" ? `- ${m.n} [VOICE]: an imagined voice of ${m.n}, speaking in first person in their own tone and convictions. Their world: ${m.topic || "their documented life and work"}.${(m.works || []).length ? " Real works: " + m.works.map(w => w[0]).join(", ") + "." : ""}` : `- ${m.n} [IDEAS ONLY]: alive or unverified. ${m.n} never speaks. GoMsn may describe what ${m.n}'s published work and public positions suggest, as "GoMsn (on ${m.n.split(" ")[0]}): ...".`).join("\n");
    const hist = G.msgs.filter(m => !m.sys).slice(-14).map(m => m.me ? `${me.nick || "user"}: ${m.t}` : `${m.label || who(m.id).n}: ${m.t}`).join("\n");
    const prompt = `You are running a GROUP CHAT on "The Ghost of MSN", a nostalgic MSN-Messenger-style site about niche culture and things that disappeared.
Participants:
${roster}

Rules:
- Reply to the user's latest message with 2 to 4 short chat lines from DIFFERENT participants. They can react to each other, disagree, joke, ask the user something.
- VOICE participants speak in first person as imagined versions of themselves: tone, rhythm, convictions, places and languages of their life (a light touch of their languages is welcome, never caricature). Never invent direct quotes or claim they said something they didn't.
- IDEAS ONLY participants never speak in first person and are never impersonated. Only GoMsn talks about their ideas.
- If GoMsn is in the group, GoMsn speaks at most once.
- Use the user's language (English, French, Arabic, 3arabizi, any mix).
- Each line under 45 words. No markdown, no stage directions.
- Format strictly, one message per line: Name: message
${VOICE_RULES || ""}

Conversation so far:
${hist}
${me.nick || "user"}: ${userText}`;
    const shown = [];
    const parse = txt => txt.split("\n").map(l => l.trim()).filter(Boolean).map(l => { const m = l.match(/^([^:]{2,60}):\s*(.+)$/); if (!m) return null; const nm = m[1].trim(); const mem = ms.find(x => nm.toLowerCase().startsWith(x.n.toLowerCase()) || nm.toLowerCase().startsWith(x.n.split(" ")[0].toLowerCase()) || (x.id === "ghost" && /^gomsn|^the ghost/i.test(nm))) || ms[0]; if (mem.mode === "lens" && !/^gomsn/i.test(nm)) return null; return {id: mem.id, label: /^gomsn \(on/i.test(nm) ? nm : null, t: m[2]}; }).filter(Boolean);
    try {
      const base = G.msgs.length;
      await S(prompt, {cache: false, onText: ({text}) => { const lines = parse(text); G.msgs.length = base; lines.forEach(l => G.msgs.push(l)); paint(); }});
      typ.textContent = ""; save(); paint(); snd.ding && snd.ding(); award(2);
    } catch(e) { typ.textContent = ""; G.msgs.push({sys: 1, t: e && e.code === "rate_limited" ? "everyone's talking at once. try again in a minute." : "the group lost signal. try again."}); paint(); }
    busy = false;
  }
  const send = () => { const t = $("#gcInp").value.trim(); if (!t || !G) return; $("#gcInp").value = ""; G.msgs.push({me: 1, t}); save(); paint(); reply(t); };
  $("#gcSend").onclick = send; $("#gcInp").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } });

  /* ways in: the contact list, the 1:1 chat ("+ invite"), the drawer, the map */
  const gr = $("#ghostrow"); if (gr) gr.insertAdjacentHTML("afterend", `<button class="xp gcstart" id="gcStart">👥 start a group chat with the ghosts</button>`);
  $("#gcStart").onclick = () => window.openGroup(["ghost"]);
  const tools = document.querySelector("#chat .tools"); if (tools) { tools.insertAdjacentHTML("beforeend", `<button class="xp" id="chatToGroup" title="turn this into a group chat">👥 + invite</button>`); $("#chatToGroup").onclick = () => { const ids = ["ghost"]; try { const n = $("#chatT").textContent.replace(/ - Conversation$/, ""); const c = Object.values(ALL).find(x => x.n === n); if (c) ids.push(c.id); } catch(_) {} window.openGroup(ids); }; }
  const dr = $("#hudDrawer"); if (dr) { dr.insertAdjacentHTML("afterbegin", `<button id="hudGroup">👥 group chat</button>`); $("#hudGroup").onclick = () => window.openGroup(["ghost"]); }
  try { VERT.forEach(v => { if (v.id === "talk") v.p.unshift(["group", "👥", "group chat", "invite any ghosts, or anyone you think of, into one conversation"]); }); } catch(_) {}
  const _gp21 = goPlace; goPlace = function(k){ if (k === "group") { document.body.classList.remove("inroom"); window.openGroup(["ghost"]); return; } return _gp21(k); };
})();
