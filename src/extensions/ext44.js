/* =================== EXTENSION 44: the music room opens on the room, a panel you can close, move things in the music room =================== */
(function(){
  const O = $("#mroom"); if (!O) return;
  const sc = O.querySelector(".mrsc"), PN = $("#mrPanel");
  const hidePanel = () => { PN.classList.remove("on"); sc.classList.remove("pon"); O.querySelectorAll("[data-mr]").forEach(b => b.classList.remove("act")); };
  sc.insertAdjacentHTML("beforeend", `<button id="mrPX" title="close the panel, see the room">× back to the room</button><button id="mrMove">✥ move things</button>`);
  $("#mrPX").onclick = hidePanel;
  const _om = window.openMusic;
  window.openMusic = function(t){ _om(t); if (!t) hidePanel(); };
  try { const b = $("#hudRadio"); if (b) b.onclick = () => window.openMusic(); } catch(_) {}
  /* move the objects around; positions stay */
  XS.mrPos = XS.mrPos || {};
  const objs = () => [...O.querySelectorAll(".mro30")];
  const key = el => [...el.classList].find(c => c.startsWith("o-"));
  const apply = () => objs().forEach(el => { const p = XS.mrPos[key(el)]; if (p) { el.style.left = p[0] + "%"; el.style.top = p[1] + "%"; } });
  apply();
  let on = false, drag = null, moved = false;
  $("#mrMove").onclick = () => { on = !on; sc.classList.toggle("mrmoving", on); $("#mrMove").textContent = on ? "✓ done moving" : "✥ move things"; if (on) hidePanel(); };
  const stage = O.querySelector(".mr30");
  stage.addEventListener("pointerdown", e => { if (!on) return; const el = e.target.closest(".mro30"); if (!el) return; e.preventDefault(); e.stopPropagation(); const r = stage.getBoundingClientRect(), b = el.getBoundingClientRect(); drag = {el, dx: e.clientX - b.left, dy: e.clientY - b.top, r}; moved = false; el.setPointerCapture(e.pointerId); el.classList.add("dragging"); }, true);
  stage.addEventListener("pointermove", e => { if (!drag) return; moved = true; const {el, dx, dy, r} = drag; const x = Math.max(-5, Math.min(95, (e.clientX - r.left - dx) / r.width * 100)), y = Math.max(-5, Math.min(92, (e.clientY - r.top - dy) / r.height * 100)); el.style.left = x + "%"; el.style.top = y + "%"; }, true);
  const end = () => { if (!drag) return; const el = drag.el; el.classList.remove("dragging"); XS.mrPos[key(el)] = [parseFloat(el.style.left), parseFloat(el.style.top)]; xsave(); drag = null; };
  stage.addEventListener("pointerup", end, true); stage.addEventListener("pointercancel", end, true);
  O.addEventListener("click", e => { if (on && e.target.closest(".mro30")) { e.stopPropagation(); e.preventDefault(); } }, true);
  sc.insertAdjacentHTML("beforeend", `<button id="mrReset" title="put everything back">↺ put back</button>`);
  $("#mrReset").onclick = () => { XS.mrPos = {}; xsave(); objs().forEach(el => { el.style.left = ""; el.style.top = ""; }); };
})();
