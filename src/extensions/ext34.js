/* =================== EXTENSION 34: the 3D museum gets doors to the archive, the rabbit holes and the weird garden =================== */
(function(){
  const abf = $("#abf"); const host = abf || document.querySelector("#abyss .abhud");
  if (host) {
    host.insertAdjacentHTML("beforeend", `<button type="button" data-ab34="archive">✂ the archive</button><button type="button" data-ab34="links">↗ rabbit holes</button><button type="button" data-ab34="garden">✿ the weird garden</button>`);
    host.addEventListener("click", e => { const b = e.target.closest("[data-ab34]"); if (!b) return; e.stopPropagation(); const k = b.dataset.ab34; $("#abyss").classList.remove("open"); if (k === "archive") window.openSpecimens(); if (k === "links") window.openLinks(); if (k === "garden") window.openGarden(); }, true);
  }
})();
