
/* =================== EXTENSION 11: easier to read, easier to start =================== */
(function(){
  const room = $("#room");
  /* plain-words labels on the main doors: the joke stays in the whisper, the label says where you're going */
  const PLAIN = {msn: "💬 chat", "chat:ghost": "👻 talk to the ghost", closet: "👗 make your avatar", gallery: "🏛 museum", radio: "📻 radio", worlds: "🌀 the worlds", niche: "✨ find your niche", dash: "📷 the feed"};
  const tags = [];
  room.querySelectorAll(".r3a").forEach(a => { const t = PLAIN[a.dataset.go]; if (!t || a.dataset.w === "the red room, upstairs") return; const el = document.createElement("div"); el.className = "r3tag"; el.textContent = t; el.onclick = e => { e.stopPropagation(); goFromRoom(a.dataset.go, e); }; room.appendChild(el); tags.push([a, el]); });
  (function place(){ requestAnimationFrame(place); if (!document.body.classList.contains("inroom")) return;
    tags.forEach(([a, el]) => { el.style.left = (parseFloat(a.style.left) + parseFloat(a.style.width) / 2) + "px"; el.style.top = Math.max(64, parseFloat(a.style.top) - 6) + "px"; }); })();
  /* start here */
  room.insertAdjacentHTML("beforeend", `<div id="startcard" class="${XS.startHide ? "hide" : ""}"><button class="x" title="hide">×</button><b>new here? start with one.</b>
    <button data-go="msn">💬 chat with a ghost</button><button data-go="closet">👗 make your avatar</button><button data-go="gallery">🏛 walk the museum</button><button data-go="radio">📻 put the radio on</button>
    <small>or click anything in the room. everything is a door.</small></div>
    <button id="tagbtn">${XS.noTags ? "show labels" : "hide labels"}</button>`);
  $("#startcard").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; e.stopPropagation();
    if (b.classList.contains("x")) { $("#startcard").classList.add("hide"); XS.startHide = 1; xsave(); return; } goFromRoom(b.dataset.go, e); });
  $("#tagbtn").onclick = e => { e.stopPropagation(); XS.noTags = !XS.noTags; xsave(); document.body.classList.toggle("notags", !!XS.noTags); e.target.textContent = XS.noTags ? "show labels" : "hide labels"; };
  document.body.classList.toggle("notags", !!XS.noTags);
  /* whisper: the plain destination comes first and big, the reference comes second */
  const wh = $("#whisper");
  room.addEventListener("pointermove", e => { const h = e.target.closest(".hs"); if (!h) return; const o = OBLIQUE[h.dataset.go]; if (!o) return;
    wh.innerHTML = `${esc(o[1])}<small>${esc(h.dataset.w === "the red room, upstairs" ? h.dataset.w : o[0])}</small>`; });
})();
