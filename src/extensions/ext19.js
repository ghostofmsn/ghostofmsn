
/* =================== EXTENSION 19: move things around. the desktop is a pinboard, the room has a build mode =================== */
/* ---------- the room: ✥ move things ---------- */
(function(){
  XS.roomPos = XS.roomPos || {};
  const wait = setInterval(() => { const R = window.R3DROOM; if (!R || !R.place) return; clearInterval(wait);
    Object.entries(XS.roomPos).forEach(([k, p]) => R.place(k, p));
    const ui = $("#r3ui"); if (!ui) return;
    ui.insertAdjacentHTML("afterbegin", `<button id="r3move" title="move the furniture">✥</button>`);
    document.body.insertAdjacentHTML("beforeend", `<div id="movebar"><b>build mode</b><span>drag the furniture and the things on the walls. it stays where you leave it.</span><button id="mvreset">put everything back</button><button id="mvdone">✓ done</button></div>`);
    const set = on => { document.body.classList.toggle("roommove", on); R.setMove(on); };
    $("#r3move").onclick = e => { e.stopPropagation(); set(!document.body.classList.contains("roommove")); };
    $("#mvdone").onclick = () => set(false);
    $("#mvreset").onclick = () => { XS.roomPos = {}; xsave(); toast("everything goes back on the next visit. (refresh to see it now.)"); };
  }, 300);
  const _ri = R3D.init; /* moved positions get saved through the hook below */
  window.addEventListener("pointerup", () => { const R = window.R3DROOM; if (!R || !document.body.classList.contains("roommove")) return; setTimeout(() => { if (R._last) { XS.roomPos[R._last[0]] = R._last[1]; xsave(); } }, 0); });
})();

/* ---------- the desktop: a pinboard. drag anything ---------- */
XS.board = XS.board || null;
(function(){
  if (!XS.custom.wall) { XS.custom.wall = "board"; xsave(); document.body.classList.add("w-board"); }
  document.body.insertAdjacentHTML("afterbegin", `<div id="board"></div>`);
  const B = $("#board");
  const DEF = () => [
    {id: "david", type: "david", x: .62, y: .16, w: 260, r: -3},
    {id: "n1", type: "note", x: .2, y: .14, w: 200, r: 2, text: "drag anything. this desktop is yours."},
    ...OBJPHOTOS.filter((_, i) => [1, 3, 12, 13, 18, 22].includes(i)).map((o, i) => ({id: "p" + i, type: "polaroid", x: [.28, .44, .2, .5, .36, .78][i], y: [.5, .6, .72, .36, .3, .64][i], w: 150, r: [-6, 4, -2, 7, -4, 3][i], src: o.img, cap: o.t})),
    {id: "g", type: "sticker", x: .86, y: .14, w: 110, r: 8, src: Z12.ghost || ""},
    {id: "s1", type: "word", x: .55, y: .82, w: 0, r: -4, text: "appear offline"},
    {id: "s2", type: "word", x: .16, y: .4, w: 0, r: 5, text: "♫ now playing: wahdon"}
  ];
  let items = XS.board || DEF();
  const save = () => { XS.board = items; try { xsave(); } catch(_) { toast("that's a lot of pictures. remove one to keep saving."); } };
  function el(it){
    const d = document.createElement("div"); d.className = "bi " + it.type; d.dataset.id = it.id;
    d.style.cssText = `left:${it.x * 100}vw;top:${it.y * 100}vh;${it.w ? `width:${it.w}px;` : ""}${it.fs ? `font-size:${it.fs}px;` : ""}${it.z ? `z-index:${it.z};` : ""}transform:rotate(${it.r || 0}deg)`;
    if (it.type === "david") { const hero = $("#gbghero"); if (hero) { hero.classList.add("onboard"); d.appendChild(hero); } }
    if (it.type === "polaroid") d.innerHTML = `<img src="${it.src}" alt="" draggable="false"><span>${esc(it.cap || "")}</span>`;
    if (it.type === "sticker" || it.type === "image") d.innerHTML = `<img src="${it.src}" alt="" draggable="false">`;
    if (it.type === "note") d.innerHTML = `<p contenteditable="true" spellcheck="false">${esc(it.text)}</p>`;
    if (it.type === "word") d.innerHTML = `<b contenteditable="true" spellcheck="false">${esc(it.text)}</b>`;
    if (it.type !== "david") d.insertAdjacentHTML("beforeend", `<i class="bx2" title="remove">×</i>`);
    d.insertAdjacentHTML("beforeend", `<i class="brot" title="turn it">↻</i><i class="bsz" title="drag to resize">⤡</i>`);
    return d;
  }
  function render(){ const hero = $("#gbghero"); if (hero && hero.parentElement !== document.body && !items.some(i => i.type === "david")) document.body.appendChild(hero); B.innerHTML = ""; items.forEach(it => B.appendChild(el(it))); }
  let drag = null, zTop = 10;
  B.addEventListener("pointerdown", e => {
    const d = e.target.closest(".bi"); if (!d || document.body.classList.contains("boardlock")) return;
    if (e.target.closest(".bx2")) { items = items.filter(i => i.id !== d.dataset.id); save(); render(); return; }
    if (e.target.closest(".bsz")) { e.preventDefault(); const it = items.find(i => i.id === d.dataset.id), sx = e.clientX, w0 = it.w || 0, f0 = it.fs || 22; try { d.setPointerCapture(e.pointerId); } catch(_) {} const mv = ev => { const dx = ev.clientX - sx; if (it.w) { it.w = Math.max(60, Math.min(760, w0 + dx)); d.style.width = it.w + "px"; } else { it.fs = Math.max(12, Math.min(120, f0 + dx / 4)); d.style.fontSize = it.fs + "px"; } }; const up = () => { d.removeEventListener("pointermove", mv); d.removeEventListener("pointerup", up); save(); }; d.addEventListener("pointermove", mv); d.addEventListener("pointerup", up); return; }
    if (e.target.closest(".brot")) { const it = items.find(i => i.id === d.dataset.id); it.r = ((it.r || 0) + 8) % 360; d.style.transform = `rotate(${it.r}deg)`; save(); return; }
    if (e.target.isContentEditable && e.detail > 1) return;
    const it = items.find(i => i.id === d.dataset.id); drag = {d, it, sx: e.clientX, sy: e.clientY, ox: it.x * innerWidth, oy: it.y * innerHeight, moved: 0}; d.style.zIndex = ++zTop; d.classList.add("lift"); d.setPointerCapture(e.pointerId);
  });
  B.addEventListener("pointermove", e => { if (!drag) return; const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy; drag.moved = Math.max(drag.moved, Math.abs(dx) + Math.abs(dy)); if (drag.moved < 4) return; drag.it.x = Math.max(-.05, Math.min(.95, (drag.ox + dx) / innerWidth)); drag.it.y = Math.max(.06, Math.min(.92, (drag.oy + dy) / innerHeight)); drag.d.style.left = drag.it.x * 100 + "vw"; drag.d.style.top = drag.it.y * 100 + "vh"; });
  B.addEventListener("pointerup", () => { if (!drag) return; drag.d.classList.remove("lift"); if (drag.moved < 4) { const ed = drag.d.querySelector("[contenteditable]"); if (ed) ed.focus(); } save(); drag = null; });
  B.addEventListener("input", e => { const d = e.target.closest(".bi"); if (!d) return; const it = items.find(i => i.id === d.dataset.id); it.text = e.target.textContent.slice(0, 200); save(); });
  B.addEventListener("dblclick", e => { const d = e.target.closest(".bi"); if (!d) return; const it = items.find(i => i.id === d.dataset.id); if (!it.w) return; it.w = it.w > 300 ? 120 : it.w + 60; d.style.width = it.w + "px"; save(); });
  /* the toolbar */
  document.body.insertAdjacentHTML("beforeend", `<div id="boardbar"><span>desktop</span><button data-bb="note">+ note</button><button data-bb="word">+ words</button><button data-bb="sticker">+ object</button><button data-bb="arch">+ from the archive</button><button data-bb="tint">note colour</button><label>+ my image<input type="file" accept="image/*" id="bbimg" hidden></label><button data-bb="lock" id="bblock">🔓</button><button data-bb="tidy">tidy up</button><button data-bb="bg" id="bbbg">background: ${XS.custom.wall === "board" ? "pinboard" : "screensaver"}</button></div>`);
  const nid = () => "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 4);
  window.boardAdd = o => { items.push(Object.assign({id: nid(), x: .3 + Math.random() * .3, y: .25 + Math.random() * .3, r: Math.random() * 8 - 4}, o)); save(); render(); };
  B.addEventListener("wheel", e => { const d = e.target.closest(".bi"); if (!d || document.body.classList.contains("boardlock") || !e.altKey && !e.shiftKey) return; e.preventDefault(); const it = items.find(i => i.id === d.dataset.id); if (it.w) { it.w = Math.max(60, Math.min(760, it.w * (e.deltaY < 0 ? 1.06 : .94))); d.style.width = it.w + "px"; } else { it.fs = Math.max(12, Math.min(120, (it.fs || 22) * (e.deltaY < 0 ? 1.06 : .94))); d.style.fontSize = it.fs + "px"; } clearTimeout(B._t); B._t = setTimeout(save, 300); }, {passive: false});
  B.addEventListener("contextmenu", e => { const d = e.target.closest(".bi"); if (!d) return; e.preventDefault(); const it = items.find(i => i.id === d.dataset.id); it.z = it.z && it.z < 0 ? 0 : -1; d.style.zIndex = it.z || ""; save(); toast(it.z ? "sent to the back." : "back to normal."); });
  $("#boardbar").addEventListener("click", e => { const b = e.target.closest("[data-bb]"); if (!b) return; const k = b.dataset.bb, cx = .35 + Math.random() * .3, cy = .3 + Math.random() * .3;
    if (k === "note") items.push({id: nid(), type: "note", x: cx, y: cy, w: 200, r: Math.random() * 8 - 4, text: spark("write")});
    if (k === "word") items.push({id: nid(), type: "word", x: cx, y: cy, w: 0, r: Math.random() * 10 - 5, text: spark("away")});
    if (k === "sticker") { const o = pick(OBJPHOTOS.concat(IMAGINED.filter(i => i.img))); items.push({id: nid(), type: "polaroid", x: cx, y: cy, w: 150, r: Math.random() * 12 - 6, src: o.img, cap: o.t}); }
    if (k === "tidy") { items = DEF(); }
    if (k === "arch") { window.openBoardPick && window.openBoardPick(); return; }
    if (k === "tint") { const ns = items.filter(i => i.type === "note"); const C = ["#fff59a", "#ffd0e6", "#cfeeff", "#d9ffc4", "#f4ede0", "#ffd9b0"]; XS.noteTint = ((XS.noteTint || 0) + 1) % C.length; document.documentElement.style.setProperty("--note", C[XS.noteTint]); xsave(); return; }
    if (k === "lock") { document.body.classList.toggle("boardlock"); b.textContent = document.body.classList.contains("boardlock") ? "🔒" : "🔓"; return; }
    if (k === "bg") { const toBoard = XS.custom.wall !== "board"; XS.custom.wall = toBoard ? "board" : "glitch"; if (!toBoard && XS.ss.mode === "glitch") {} xsave(); document.body.classList.toggle("w-board", toBoard); ["w-glitch", "w-david", "w-calm", "w-night", "w-mine"].forEach(c => document.body.classList.remove(c)); if (!toBoard) document.body.classList.add("w-glitch"); b.textContent = "background: " + (toBoard ? "pinboard" : "screensaver"); if (!toBoard) toast("pick your screensaver in 🫧 my bubble."); return; }
    save(); render(); tone([[880,.04]], "sine", .02); });
  $("#bbimg").onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"), k = 360 / Math.max(im.width, im.height); c.width = im.width * k; c.height = im.height * k; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); items.push({id: nid(), type: "polaroid", x: .4, y: .35, w: 170, r: Math.random() * 8 - 4, src: c.toDataURL("image/jpeg", .8), cap: ""}); save(); render(); }; im.src = r.result; }; r.readAsDataURL(f); };
  render();
  /* the desktop icons can move too */
  XS.icoPos = XS.icoPos || {};
  const icons = [...document.querySelectorAll("#icons .ico")];
  const place = () => icons.forEach((ic, i) => { const p = XS.icoPos[i]; if (p) { ic.style.position = "fixed"; ic.style.left = p[0] * 100 + "vw"; ic.style.top = p[1] * 100 + "vh"; } });
  place();
  icons.forEach((ic, i) => { let st = null;
    ic.addEventListener("pointerdown", e => { if (document.body.classList.contains("boardlock")) return; const r = ic.getBoundingClientRect(); st = {sx: e.clientX, sy: e.clientY, ox: r.left, oy: r.top, m: 0}; });
    addEventListener("pointermove", e => { if (!st) return; const dx = e.clientX - st.sx, dy = e.clientY - st.sy; st.m = Math.max(st.m, Math.abs(dx) + Math.abs(dy)); if (st.m < 6) return; ic.style.position = "fixed"; ic.style.zIndex = 30; ic.style.left = (st.ox + dx) + "px"; ic.style.top = (st.oy + dy) + "px"; });
    addEventListener("pointerup", () => { if (!st) return; if (st.m >= 6) { XS.icoPos[i] = [parseFloat(ic.style.left) / innerWidth, parseFloat(ic.style.top) / innerHeight]; xsave(); ic.addEventListener("click", ev => { ev.stopPropagation(); ev.preventDefault(); }, {capture: true, once: true}); } st = null; });
  });
  const tb = $("#boardbar [data-bb=tidy]"); tb.addEventListener("click", () => { XS.icoPos = {}; xsave(); icons.forEach(ic => { ic.style.position = ""; ic.style.left = ""; ic.style.top = ""; }); });
})();
