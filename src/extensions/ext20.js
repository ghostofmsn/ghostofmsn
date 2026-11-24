
/* =================== EXTENSION 20: a tamagotchi that lives on your desktop (a ghost pet, obviously) =================== */
(function(){
  XS.tama = XS.tama || null;
  document.body.insertAdjacentHTML("beforeend", `<div id="tama" class="hidden"><div class="tshell"><div class="tchain"></div><div class="tbrand">GoMsn·gotchi</div>
    <div class="tscreen"><canvas id="tcv" width="32" height="16"></canvas><div class="ticons"><span data-ti="feed">🍙</span><span data-ti="play">🎮</span><span data-ti="clean">🧽</span><span data-ti="light">💡</span><span data-ti="stat">📊</span></div></div>
    <div class="tbtns"><button data-tb="a" title="next">A</button><button data-tb="b" title="choose">B</button><button data-tb="c" title="back">C</button></div>
    <div class="tmsg" id="tmsg"></div></div><button class="tx" title="put it away">×</button></div>`);
  const T = () => XS.tama, cv = $("#tcv"), x = cv.getContext("2d"), box = $("#tama");
  const MENU = ["feed", "play", "clean", "light", "stat"]; let sel = 0, mode = "idle", game = null, frame = 0, anim = null, msgT = null;
  const say = (m, ms = 2600) => { $("#tmsg").textContent = m; clearTimeout(msgT); msgT = setTimeout(() => $("#tmsg").textContent = "", ms); };
  const NAMES = ["hamra", "ziza", "boubou", "lolo", "mimi", "nouna", "pixel", "ghosty", "tata", "fifi"];
  function hatch(){ XS.tama = {born: Date.now(), last: Date.now(), hunger: 3, happy: 3, poops: 0, light: 1, name: pick(NAMES), gone: 0, sick: 0}; xsave(); say(`it hatched. say hi to ${T().name}.`); }
  /* real time passes while you're away */
  function tick(){ const t = T(); if (!t || t.gone) return; const now = Date.now(), m = (now - t.last) / 60000; if (m < 1) return;
    const steps = Math.floor(m); t.hunger = Math.max(0, t.hunger - steps / 45); t.happy = Math.max(0, t.happy - steps / 60); t.poops = Math.min(4, t.poops + steps / 90);
    if (t.hunger <= 0 && !t.starveSince) t.starveSince = now; if (t.hunger > 0) t.starveSince = 0;
    if (t.starveSince && now - t.starveSince > 12 * 3600e3) { t.gone = now; }
    t.last = now; xsave(); }
  const ageDays = () => Math.floor((Date.now() - T().born) / 864e5);
  const stage = () => { const h = (Date.now() - T().born) / 36e5; return h < .02 ? "egg" : h < 1 ? "baby" : h < 24 ? "kid" : "ghost"; };
  /* 8x8 / 12x10 pixel sprites */
  const SPR = {
    egg: ["...####...", "..#....#..", ".#..#...#.", ".#......#.", "#...#....#", "#........#", "#..#...#.#", ".#......#.", "..######.."],
    baby: ["..####..", ".#....#.", "#.#..#.#", "#......#", "#..##..#", ".#....#.", "..####.."],
    kid: ["...####...", "..#....#..", ".#.#..#.#.", ".#......#.", ".#..##..#.", ".#......#.", "#........#", "#.#.#.#..#", ".#.#.#.##."],
    ghost: ["...######...", "..#......#..", ".#........#.", ".#.##..##.#.", ".#.##..##.#.", ".#........#.", ".#...##...#.", ".#........#.", ".#........#.", ".#.#.##.#.#.", "..#.#..#.#.."],
    poop: ["..#..", ".###.", "#####"], food: [".##.", "####", "#..#", "####"], heart: [".#.#.", "#####", ".###.", "..#.."], zz: ["###.", "..#.", ".#..", "###."], skull: [".###.", "#.#.#", "#####", ".#.#."]
  };
  const draw = (s, ox, oy, on = 1) => SPR[s].forEach((r, y) => [...r].forEach((c, xx) => { if (c === "#") { x.fillStyle = on ? "#1f2a14" : "#9bac6a"; x.fillRect(ox + xx, oy + y, 1, 1); } }));
  function render(){ const t = T(); x.fillStyle = "#a8bc72"; x.fillRect(0, 0, 32, 16); if (!t) return;
    if (t.gone) { draw("ghost", 10 + Math.round(Math.sin(frame / 3) * 2), 3 - (frame % 4 < 2 ? 0 : 1)); return; }
    if (!t.light) { x.fillStyle = "#3a4428"; x.fillRect(0, 0, 32, 16); draw("zz", 26, 1, 0); return; }
    const st = stage(), bob = frame % 2, px = mode === "eat" ? 8 : 10 + (game ? (game.look < 0 ? -6 : game.look > 0 ? 6 : 0) : Math.round(Math.sin(frame / 2) * 3));
    draw(st, px, (st === "ghost" ? 3 : 6) - bob);
    if (mode === "eat") { draw("food", 22, 9); }
    if (mode === "love") draw("heart", 24, 2);
    for (let i = 0; i < Math.floor(t.poops); i++) draw("poop", 26 - i * 6, 13);
    if (t.hunger < 1 || t.happy < 1) draw("skull", 1, 1);
    document.querySelectorAll("#tama [data-ti]").forEach((s, i) => s.classList.toggle("on", i === sel));
  }
  function loop(){ frame++; tick(); render(); }
  function act(k){ const t = T(); if (!t) { hatch(); render(); return; } if (t.gone) { if (k === "b") { hatch(); render(); } else say(`${t.name} left to haunt somewhere else. press B for a new egg.`); return; }
    if (game) { if (k === "a" || k === "c") { const g = game, dir = k === "a" ? -1 : 1; g.look = Math.random() < .5 ? -1 : 1; g.round++; if (dir === g.look) { g.win++; say(`right! (${g.win}/${g.round})`); } else say(`nope (${g.win}/${g.round})`); render(); if (g.round >= 5) { setTimeout(() => { if (g.win >= 3) { t.happy = Math.min(4, t.happy + 1.5); say(`${t.name} won. ♥ +`); award(3); } else say(`${t.name} lost. still had fun.`); game = null; mode = "idle"; xsave(); }, 900); } } return; }
    if (k === "a") { sel = (sel + 1) % MENU.length; tone([[1200,.03]], "square", .02); render(); return; }
    if (k === "c") { mode = "idle"; say(""); render(); return; }
    const m = MENU[sel]; tone([[880,.05],[1320,.05]], "square", .025);
    if (m === "feed") { if (t.hunger >= 4) { say(`${t.name} is full. stop.`); return; } t.hunger = Math.min(4, t.hunger + 1); mode = "eat"; say("nom nom. (rice ball)"); setTimeout(() => { mode = "idle"; }, 2000); }
    if (m === "play") { game = {round: 0, win: 0, look: 0}; mode = "game"; say("which way will it look? A = left, C = right", 4000); }
    if (m === "clean") { if (t.poops < 1) { say("already clean. you're a good parent."); return; } t.poops = 0; t.happy = Math.min(4, t.happy + .5); say("sparkly. ✨"); }
    if (m === "light") { t.light = t.light ? 0 : 1; say(t.light ? "lights on." : "lights off. sleep well."); }
    if (m === "stat") { const h = "♥".repeat(Math.round(t.happy)) + "♡".repeat(4 - Math.round(t.happy)), f = "●".repeat(Math.round(t.hunger)) + "○".repeat(4 - Math.round(t.hunger)); say(`${t.name} · ${stage()} · ${ageDays()} days\nhappy ${h}\nfull ${f}`, 5000); }
    if (m !== "light") { mode = mode === "eat" ? "eat" : "love"; setTimeout(() => { if (mode === "love") mode = "idle"; }, 1500); }
    xsave(); render(); }
  box.addEventListener("click", e => { const b = e.target.closest("[data-tb]"); if (b) { act(b.dataset.tb); return; } const ic = e.target.closest("[data-ti]"); if (ic) { sel = MENU.indexOf(ic.dataset.ti); act("b"); return; } if (e.target.closest(".tx")) { box.classList.add("hidden"); clearInterval(anim); anim = null; } });
  /* drag it around the desktop */
  let dg = null; box.addEventListener("pointerdown", e => { if (e.target.closest("button,[data-ti]")) return; const r = box.getBoundingClientRect(); dg = {sx: e.clientX, sy: e.clientY, ox: r.left, oy: r.top}; box.setPointerCapture(e.pointerId); });
  box.addEventListener("pointermove", e => { if (!dg) return; box.style.left = (dg.ox + e.clientX - dg.sx) + "px"; box.style.top = (dg.oy + e.clientY - dg.sy) + "px"; box.style.right = "auto"; box.style.bottom = "auto"; });
  box.addEventListener("pointerup", () => { if (dg) { XS.tamaPos = [box.style.left, box.style.top]; xsave(); } dg = null; });
  if (XS.tamaPos) { box.style.left = XS.tamaPos[0]; box.style.top = XS.tamaPos[1]; box.style.right = "auto"; box.style.bottom = "auto"; }
  window.openTama = (why) => { box.classList.remove("hidden"); if (!T()) { hatch(); } else tick(); if (why) say(why, 3500); if (!anim) anim = setInterval(loop, 500); render(); };
  if (XS.tamaOpen) window.openTama();
  new MutationObserver(() => { XS.tamaOpen = box.classList.contains("hidden") ? 0 : 1; xsave(); }).observe(box, {attributes: true, attributeFilter: ["class"]});

  /* it hatches when you talk about it */
  let lastNudge = 0;
  const talkHook = txt => { if (!/tamag[o0]?(tchi|chi|shi|ch)|tamagotchi|تاماغوتشي|tamago/i.test(txt)) return; if (Date.now() - lastNudge < 60000) return; lastNudge = Date.now(); setTimeout(() => window.openTama(T() ? `you said tamagotchi. ${T().name} heard.` : "you said tamagotchi. something hatched."), 600); };
  const msgs = $("#msgs"); if (msgs) new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => talkHook(n.textContent || "")))).observe(msgs, {childList: true, subtree: true});
  const inp = $("#inp"); if (inp) inp.addEventListener("keydown", e => { if (e.key === "Enter") talkHook(inp.value); });
  /* and from the museum card, the arcade, the drawer */
  const _om20 = openMeaning; openMeaning = function(it, fs){ _om20(it, fs); if (!/tamagotchi/i.test(it.t || "")) return; const tx = document.querySelector("#mwrap .mtxt"); if (tx) { tx.insertAdjacentHTML("beforeend", `<button class="bact" id="mtama">🥚 raise one, right now</button>`); $("#mtama").onclick = () => { $("#mean").classList.remove("open"); window.openTama("it's yours now. don't let it starve."); }; } };
  $("#gtabs").insertAdjacentHTML("beforeend", `<div class="tab" data-g="tama">🥚 tamagotchi</div>`);
  const _ra20 = renderArcade; renderArcade = function(){ if (GTAB === "tama") { $("#gbody").innerHTML = `<div class="chesswrap"><div class="chesshead"><b>tamagotchi</b><span>it lives on your desktop and keeps aging while you're away.</span></div><button class="xp" onclick="openTama()">🥚 bring it out</button><p class="muted" style="margin-top:10px">A to move through the icons, B to choose, C to go back. feed it, play the left-right game, clean up after it. if it's hungry for half a day, it leaves to haunt somewhere else.</p></div>`; return; } return _ra20(); };
  const dr = $("#hudDrawer"); if (dr) { dr.insertAdjacentHTML("beforeend", `<button id="hudTama">🥚 my tamagotchi</button>`); $("#hudTama").onclick = () => window.openTama(); }
})();
