/* =================== EXTENSION 25: one ghost everywhere, and the room before the window =================== */
(function(){
  window.GHOSTAV = Z12.ghost || null;
  const swap = () => { if (!window.GHOSTAV) return; document.querySelectorAll(".ghost").forEach(e => { const sv = e.firstElementChild; if (sv && sv.tagName === "svg" && sv.getAttribute("viewBox") === "0 0 64 64") e.innerHTML = `<img class="gav" src="${window.GHOSTAV}" alt="">`; }); };
  swap(); new MutationObserver(() => swap()).observe(document.body, {childList: true, subtree: true});
  const L = $("#login"); if (!L) return;
  document.body.classList.add("prelogin");
  let shown = false;
  const show = () => { if (shown) return; shown = true; try { enterRoom(); } catch(_) {} setTimeout(() => document.body.classList.add("roomseen"), 1700); };
  const T = $("#threshold");
  if (T) { const mo = new MutationObserver(() => { if (T.classList.contains("through") || !document.body.contains(T)) { mo.disconnect(); setTimeout(show, 350); } }); mo.observe(T, {attributes: true}); mo.observe(document.body, {childList: true}); const sk = T.querySelector(".thskip"); if (sk) sk.addEventListener("click", () => setTimeout(show, 30)); }
  else show();
  $("#lform").addEventListener("submit", () => { document.body.classList.remove("prelogin", "roomseen"); }, true);
})();
