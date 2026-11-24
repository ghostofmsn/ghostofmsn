
/* =================== EXTENSION 10: every ghost gets a face, you get a display picture =================== */
["#a9a6a8", "#ecebe6"].forEach(c => { if (!HAIRC.includes(c)) HAIRC.push(c); });
const GREY = HAIRC.indexOf("#a9a6a8"), WHITE = HAIRC.indexOf("#ecebe6");
const portrait = f => dollz(f).replace(/viewBox="[^"]*"/, 'viewBox="7 1 26 28"').replace("<svg ", '<svg preserveAspectRatio="xMidYMin slice" ');
/* drawn, not photographed: a pixel nod to each one, never a likeness */
const GPORT = {
  fisher: {body: "broad", skin: 0, hc: 1, do: "buzz", fh: "stubble", top: ["band", 5]},
  deleuze: {body: "straight", skin: 0, hc: GREY, do: "long", top: ["tee", 10], outer: ["denim", 5]},
  boym: {body: "slim", skin: 0, hc: 1, do: "curls", lc: 2, top: ["mesh", 5]},
  han: {body: "straight", skin: 1, hc: GREY, do: "long", top: ["tee", 5]},
  said: {body: "broad", skin: 2, hc: GREY, do: "buzz", ex: ["glasses"], top: ["tee", 4], outer: ["denim", 9]},
  benjamin: {body: "broad", skin: 1, hc: 0, do: "curls", fh: "moustache", ex: ["glasses"], top: ["tee", 4], outer: ["track", 5]},
  adnan: {body: "soft", skin: 1, hc: WHITE, do: "bob", ex: ["glasses"], top: ["tunic", 1]},
  mernissi: {body: "soft", skin: 2, hc: 0, do: "curls", lc: 1, top: ["tunic", 6], acc: ["hoops", 2]},
  tanizaki: {body: "straight", skin: 1, hc: 0, do: "buzz", ex: ["glasses"], top: ["tee", 4], outer: ["track", 5]},
  orwell: {body: "straight", skin: 0, hc: 1, do: "buzz", fh: "moustache", top: ["tee", 10], outer: ["denim", 10]},
  oumk: {body: "soft", skin: 2, hc: 0, do: "buns", lc: 1, acc: ["shades", 5], top: ["tunic", 8]},
  arussell: {body: "straight", skin: 0, hc: 2, do: "curls", ex: ["glasses"], top: ["band", 3]},
  acoltrane: {body: "slim", skin: 4, hc: 0, do: "curls", lc: 2, top: ["tunic", 2]},
  sunra: {body: "broad", skin: 4, hc: 0, do: "buzz", top: ["velour", 2], hair: ["tiara", 0]},
  schiap: {body: "slim", skin: 0, hc: 0, do: "bob", lc: 4, top: ["corset", 0], acc: ["choker", 5]},
  ysl: {body: "straight", skin: 0, hc: 1, do: "spikes", ex: ["glasses"], top: ["tee", 4], outer: ["track", 5]},
  miyake: {body: "straight", skin: 1, hc: GREY, do: "buzz", top: ["mesh", 5]},
  vreeland: {body: "slim", skin: 0, hc: 0, do: "bob", lc: 1, top: ["halter", 6]},
  marker: {body: "straight", skin: 0, hc: GREY, do: "buzz", ex: ["glasses"], top: ["tee", 5], acc: ["headphones", 5]},
  varda: {body: "soft", skin: 0, hc: 7, do: "bob", lc: 2, top: ["tee", 3]},
  chahine: {body: "broad", skin: 2, hc: GREY, do: "buzz", ex: ["glasses"], top: ["tee", 4]},
  warhol: {body: "straight", skin: 0, hc: WHITE, do: "spikes", ex: ["glasses"], top: ["band", 5]},
  battuta: {body: "broad", skin: 2, hc: 0, fh: "beard", hair: ["scarf", 4], top: ["tunic", 4]},
  khaldun: {body: "broad", skin: 2, hc: GREY, fh: "beard", hair: ["scarf", 10], top: ["tunic", 10]},
  darwish: {body: "straight", skin: 2, hc: 0, do: "curls", ex: ["glasses"], top: ["tee", 4], outer: ["denim", 5]},
  lovelace: {body: "slim", skin: 0, hc: 1, do: "buns", lc: 4, top: ["corset", 3]}
};
const gfit = id => { const p = GPORT[id] || {}; const male = ["broad", "straight"].includes(p.body);
  return Object.assign({skin: 1, hc: 0, do: "bob", ec: 0, lc: male ? 6 : 0, lash: !male, fh: "none", ex: [], hair: ["none", 0], top: ["tee", 5], bottom: ["baggy", 5], outer: ["none", 0], bag: ["none", 0], acc: ["none", 0], shoes: ["skate", 5]}, p, {base: male ? "skater" : "doll"}); };
const AVBG = ["linear-gradient(135deg,#1b1650,#1d5566)", "linear-gradient(135deg,#3a0f2a,#c8006b)", "linear-gradient(135deg,#2a1608,#c8601e)", "linear-gradient(135deg,#0e2a1e,#3cc29a)"];
const _dp10 = dpFor;
dpFor = function(c){ if (c.lens) return `<div class="lensdp av10" style="background:${AVBG[c.id.length % 4]}">${portrait(gfit(c.id))}</div>`; return _dp10(c); };
const _rcl10 = renderCL;
renderCL = function(){ _rcl10(); document.querySelectorAll("#groups .ct").forEach(r => { const c = ALL[r.dataset.id]; if (c && c.lens && !r.querySelector(".cav10")) r.insertAdjacentHTML("afterbegin", `<span class="cav10" style="background:${AVBG[c.id.length % 4]}">${portrait(gfit(c.id))}</span>`); }); };
renderCL();

/* ---------- you: your closet doll is your msn display picture ---------- */
function myDP(){
  const av = document.querySelector("#cl .me .av"); if (!av) return;
  if (XS.dpOff) { av.classList.remove("av10me"); return; }
  av.classList.add("av10me"); av.innerHTML = portrait(FIT); av.title = "made in the closet. click to change.";
  const meDP = $("#chatMeDP"); if (meDP) meDP.innerHTML = portrait(FIT);
}
document.querySelector("#cl .me .av").addEventListener("click", () => goPlace("closet"));
$("#chat .compose").insertAdjacentHTML("afterbegin", `<div id="chatMeDP" title="you, from the closet"></div>`);
document.querySelector("#closet .row").insertAdjacentHTML("beforeend", `<button class="xp" id="cDP">🪞 use as my msn picture</button>`);
$("#cDP").onclick = () => { XS.dpOff = false; xsave(); myDP(); toast("display picture changed. everyone online noticed."); tone([[988,.05],[1319,.08]], "square", .03); };
const _rc10 = renderCloset; renderCloset = function(){ _rc10(); myDP(); };
myDP();
