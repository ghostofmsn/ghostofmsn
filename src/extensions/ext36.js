/* =================== EXTENSION 36: talk gets a landing page of rooms =================== */
(function(){
  const R = [
    ["one to one", [
      ["msn", "💬", "MSN", "your contact list. everyone's here", "#3aa0e0", () => goPlace("msn")],
      ["ghost", "👻", "the ghost", "she's waiting. she has opinions", "#f6e43c", () => openChat("ghost")],
      ["letters", "📮", "letters", "the ghost writes to you, slowly", "#f4ede0", () => goPlace("letters")],
      ["hood", "👯", "the neighbourhood", "profiles with whole worlds inside", "#f08ab4", () => goPlace("hood")]]],
    ["group rooms", [
      ["horror", "🔪", "the horror club", "Cronenberg, Argento, Carpenter, Bava, Romero", "#9b2a3a", () => window.openGroup(["ghost", "cronenberg", "argento", "carpenter", "bava", "romero"])],
      ["fashion", "✂", "the fitting room", "Leigh Bowery, Vreeland, Schiaparelli, Westwood, Margiela", "#f08ab4", () => window.openGroup(["ghost", "bowery", "vreeland", "schiap", "westwood", "mmargiela"])],
      ["cinema", "🎞", "the late cinema", "Lynch, Varda, Akerman, Chahine, Wong Kar-wai", "#2f55d8", () => window.openGroup(["ghost", "lynch", "varda", "akerman", "chahine", "wkw"])],
      ["arab", "🌙", "the Beirut–Cairo table", "Youssef Chahine, Jocelyne Saab, Maroun Bagdadi", "#e8781a", () => window.openGroup(["ghost", "chahine", "saab", "bagdadi"])],
      ["own", "＋", "make your own room", "invite anyone, dead or alive", "#e6e1d3", () => window.openGroup(["ghost"])]]],
    ["hang out", [
      ["forum", "☕", "the cybercafé", "forums, threads, opinions", "#c49a6c", () => goPlace("forum")],
      ["ghosts", "🕯", "the ghosts", "25 voices: music, fashion, film, ideas", "#9b7bd8", () => goPlace("ghosts")],
      ["lounge", "💭", "the thinkers' lounge", "big ideas, small hours", "#2fc4b2", () => goPlace("lounge")],
      ["late", "🌃", "late night", "for when you can't sleep", "#1a1638", () => openChat("latenight")],
      ["wall", "⚡", "the wizz wall", "say what's haunting you", "#f6e43c", () => goPlace("wall")],
      ["quiet", "☾", "the quiet room", "no talking. breathe", "#8fd8a0", () => goPlace("quiet")]]]
  ];
  const ACT = {}; let n = 0;
  document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="talk36"><div class="t36wrap">
    <div class="l30head"><div><small>talk</small><h2>who do you want to talk to tonight?</h2></div><button class="bx" data-t36x>×</button></div>
    ${R.map(([h, rooms]) => `<h3 class="t36h">${esc(h)}</h3><div class="t36grid">${rooms.map(([k, e, t, d, c, fn]) => { const id = "t" + (++n); ACT[id] = fn; return `<button class="t36r" data-t36="${id}" style="--c:${c};--r:${(n * 37 % 7) - 3}deg"><span class="t36door"><i>${e}</i><b class="t36light"></b></span><b>${esc(t)}</b><small>${esc(d)}</small></button>`; }).join("")}</div>`).join("")}
  </div></div>`);
  const O = $("#talk36");
  window.openTalk = () => { closeOverlays(); O.classList.add("open"); };
  O.addEventListener("click", e => { if (e.target.closest("[data-t36x]")) { O.classList.remove("open"); return; } const b = e.target.closest("[data-t36]"); if (!b) return; O.classList.remove("open"); try { ACT[b.dataset.t36](); } catch(_) {} });
  document.addEventListener("click", e => { const b = e.target.closest('#dock [data-v="talk"]'); if (!b) return; e.stopPropagation(); e.preventDefault(); document.body.classList.remove("inroom"); window.openTalk(); }, true);
})();
