
/* =================== EXTENSION 9: the room, in 3D. a beige computer whose screen wants you =================== */
(function(){
  if (!window.R3D) return;
  const room = $("#room"); let R = null;
  try { const c = document.createElement("canvas"); if (!(c.getContext("webgl2") || c.getContext("webgl"))) return;
    R = R3D.init(room, {go: (k, e) => goFromRoom(k, e)}); } catch (err) { console.warn("3d room off", err); return; }
  room.querySelector("svg") && room.querySelector("svg").remove();
  room.classList.add("is3d");
  room.querySelectorAll(".r3a").forEach(a => { const o = OBLIQUE[a.dataset.go] || (a.dataset.go === "window" ? ["fall through the window", "beirut, 2:13am"] : null); if (o) { a.dataset.w = o[0]; a.setAttribute("aria-label", `${o[0]}: ${o[1]}`); } });
  INVITE.msn = "come closer… they're all online."; INVITE.window = "beirut, 2:13am. jump.";
  room.insertAdjacentHTML("beforeend", `<div id="r3ui"><button data-t="-.25" title="turn left">↺</button><button data-z="-2" title="closer">＋</button><button data-z="2" title="further">－</button><button data-t=".25" title="turn right">↻</button><span>drag to look around · everything is a door</span></div>`);
  $("#r3ui").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; e.stopPropagation(); if (b.dataset.t) R.turn(+b.dataset.t); if (b.dataset.z) R.zoom(+b.dataset.z); tone([[660,.03]], "sine", .02); });
  window.fitRoom = () => { room.style.overflowX = "hidden"; R.resize(); };
  const sync = () => document.body.classList.contains("inroom") ? R.start() : R.stop();
  new MutationObserver(sync).observe(document.body, {attributes: true, attributeFilter: ["class"]}); sync();
})();
