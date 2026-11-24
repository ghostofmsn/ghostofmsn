/* =================== EXTENSION 35: the entrance wall is tiled and alive, a red & yellow door, the ghost says hi after sign-in =================== */
(function(){
  const th = $("#threshold");
  if (th) {
    const C = 18, R = 12;
    let h = `<div class="th35tiles" style="--c:${C}">`;
    for (let i = 0; i < C * R; i++) { const k = (i % C + Math.floor(i / C)) % 4; h += `<i class="t${k}" style="--d:${((i * 37) % 23) * -.37}s"></i>`; }
    th.querySelector(".thsky").insertAdjacentHTML("afterend", h + `</div>`);
  }
  /* after you sign in, the ghost opens a chat */
  const lf = $("#lform");
  if (lf) lf.addEventListener("submit", () => { if (sessionStorage.getItem("gomsn_hi")) return; try { sessionStorage.setItem("gomsn_hi", "1"); } catch(_) {} setTimeout(() => { try { if (!document.querySelector(".ov.open")) openChat("ghost"); } catch(_) {} }, 3200); });
})();
