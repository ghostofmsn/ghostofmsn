
/* =================== EXTENSION 18: the GoMsn design code. one bar on top, windows always under it =================== */
(function(){
  document.body.insertAdjacentHTML("afterbegin", `<a id="logo" href="#" title="home: the room">${Z12.ghost ? `<img src="${Z12.ghost}" alt="">` : ""}<b>GoMsn</b></a>`);
  $("#logo").onclick = e => { e.preventDefault(); closeOverlays(); goPlace("room"); };
  /* points live in the bar now, small */
  $("#hud .hudbtns").insertAdjacentHTML("afterbegin", `<span id="hudPts2" title="your points"></span>`);
  const pts = () => { $("#hudPts2").textContent = "§" + XS.pts; }; pts(); const _pp18 = paintPts; paintPts = function(){ _pp18(); pts(); };
  /* windows never hide under the bar */
  const BAR = 64;
  setInterval(() => { document.querySelectorAll(".win:not(.hidden)").forEach(w => { if (!w.classList.contains("maxed") && w.offsetTop < BAR) w.style.top = BAR + "px"; }); }, 400);
})();
