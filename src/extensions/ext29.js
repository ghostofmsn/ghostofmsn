/* =================== EXTENSION 29: tidy. a calmer bar, quiet labels, one message at a time =================== */
(function(){
  /* the top bar keeps: room · map · explore · talk · share · collect · play · radio · more. the rest moves into "more" */
  const dr = $("#hudDrawer");
  if (dr) {
    const mv = [["hudBubble", "🫧 my bubble"], ["hudMake", "🛠 make"], ["hudOnline", "🟢 who's online"], ["hudZen", "☾ zen mode"], ["hudPts2", "§ my points"]];
    const head = `<div class="drh">places</div>`;
    dr.insertAdjacentHTML("afterbegin", `<div class="drh">you</div>` + mv.map(([id, l]) => $("#" + id) ? `<button data-proxy="${id}">${l}</button>` : "").join("") + head);
    dr.addEventListener("click", e => { const b = e.target.closest("[data-proxy]"); if (b) { const t = $("#" + b.dataset.proxy); t && t.click(); } });
    const spec = $("#hudSpec"); if (spec) spec.textContent = "✂ the archive";
  }
  const bar = $("#hudMore"); if (bar && !$("#hudRadio")) { bar.insertAdjacentHTML("beforebegin", `<button id="hudRadio" title="the music room">📻</button>`); $("#hudRadio").onclick = () => window.openMusic(); }
  document.body.classList.add("tidy");
  /* labels: quiet dots by default, the name appears when you hover */
  if (!XS.tagsV2) { XS.tagsV2 = 1; XS.noTags = true; try { xsave(); } catch(_) {} }
  document.body.classList.toggle("notags", !!XS.noTags);
  const tb = $("#tagbtn"); if (tb) tb.textContent = XS.noTags ? "show labels" : "hide labels";
  /* one message at a time, and fewer of them */
  const _t = toast; let last = 0, lastTxt = "";
  toast = function(html, onclick){ const now = Date.now(), txt = String(html).replace(/<[^>]+>/g, "");
    if (txt === lastTxt && now - last < 60000) return;
    if (!onclick && now - last < 9000) return;
    if (document.querySelector(".ov.open") && !onclick && !/saved|pocket|pinned|filed|exported|added|it's in/i.test(txt)) return;
    last = now; lastTxt = txt; document.querySelectorAll("#toasts > *").forEach(t => t.remove()); return _t(html, onclick); };
})();
