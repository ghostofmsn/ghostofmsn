/* =================== EXTENSION 45: move things on every page =================== */
(function(){
  const T = {talk36: [".t36r", "data-t36"], links30: [".l30c", "data-li"], garden30: [".g30c", "data-pi30"], col42: [".c42c", "data-o42"], strangers: [".env37", "data-ls37"], gmake33: [".gm33prev", null], learn30: [".j30n", null]};
  XS.pgPos = XS.pgPos || {};
  document.body.insertAdjacentHTML("beforeend", `<div id="mv45"><button id="mv45b">✥ move things</button><button id="mv45r">↺ put back</button></div>`);
  const B = $("#mv45"), btn = $("#mv45b");
  let cur = null, on = false, drag = null;
  const keyOf = (el, attr, i) => (attr && el.getAttribute(attr)) || String(i);
  const apply = id => { const [sel, attr] = T[id]; const P = XS.pgPos[id] || {}; document.querySelectorAll(`#${id} ${sel}`).forEach((el, i) => { const p = P[keyOf(el, attr, i)]; el.style.translate = p ? `${p[0]}px ${p[1]}px` : ""; if (p) el.style.zIndex = 3; }); };
  const openId = () => Object.keys(T).find(id => { const o = $("#" + id); return o && o.classList.contains("open"); });
  const sync = () => { const id = openId(); if (id !== cur) { cur = id; setOn(false); } B.classList.toggle("show", !!id); if (id) apply(id); };
  Object.keys(T).forEach(id => { const o = $("#" + id); if (!o) return; new MutationObserver(sync).observe(o, {attributes: true, attributeFilter: ["class"]}); new MutationObserver(() => { if (o.classList.contains("open")) apply(id); }).observe(o, {childList: true, subtree: true}); });
  const setOn = v => { on = v; document.body.classList.toggle("mv45on", v); btn.textContent = v ? "✓ done moving" : "✥ move things"; };
  btn.onclick = () => setOn(!on);
  $("#mv45r").onclick = () => { if (!cur) return; delete XS.pgPos[cur]; xsave(); apply(cur); };
  document.addEventListener("pointerdown", e => { if (!on || !cur) return; const [sel, attr] = T[cur]; const el = e.target.closest(`#${cur} ${sel}`); if (!el) return; e.preventDefault(); e.stopPropagation();
    const all = [...document.querySelectorAll(`#${cur} ${sel}`)]; const k = keyOf(el, attr, all.indexOf(el)); const p = (XS.pgPos[cur] || {})[k] || [0, 0];
    drag = {el, k, sx: e.clientX, sy: e.clientY, ox: p[0], oy: p[1]}; el.classList.add("mv45drag"); el.setPointerCapture && el.setPointerCapture(e.pointerId); }, true);
  document.addEventListener("pointermove", e => { if (!drag) return; const x = drag.ox + e.clientX - drag.sx, y = drag.oy + e.clientY - drag.sy; drag.el.style.translate = `${x}px ${y}px`; drag.x = x; drag.y = y; }, true);
  const end = () => { if (!drag) return; const d = drag; drag = null; d.el.classList.remove("mv45drag"); if (d.x == null) return; (XS.pgPos[cur] = XS.pgPos[cur] || {})[d.k] = [Math.round(d.x), Math.round(d.y)]; d.el.style.zIndex = 3; xsave(); };
  document.addEventListener("pointerup", end, true); document.addEventListener("pointercancel", end, true);
  document.addEventListener("click", e => { if (on && cur && e.target.closest(`#${cur} ${T[cur][0]}`)) { e.stopPropagation(); e.preventDefault(); } }, true);
})();
