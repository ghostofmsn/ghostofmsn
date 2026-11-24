/* =================== EXTENSION 22: the specimen archive — cut-and-paste fashion history =================== */
(function(){
  const RJ = "Rijksmuseum, Amsterdam · CC0 via Wikimedia Commons";
  const PIECES = [
    {k:"g0", house:"Elsa Schiaparelli", what:"bindweed cap", when:"c. 1948", city:"Paris", sp:"convolvulus", credit:RJ+" (BK-1993-84)", moment:"Schiaparelli made the lobster dress and the shoe hat with Salvador Dalí in 1937. Hats were where she got the strangest."},
    {k:"g1", house:"Elsa Schiaparelli", what:"quilted faille hat with roses", when:"c. 1948", city:"Paris", sp:"rosacea", credit:RJ+" (BK-1993-86)", moment:"Shocking pink: her 1937 colour, named with the perfume Shocking. Fuchsia with no apology."},
    {k:"g2", house:"after Cristóbal Balenciaga", what:"black taffeta cocktail dress", when:"c. 1951", city:"Amsterdam", sp:"nocturna", credit:RJ+" (BK-1986-58)", moment:"Couture travelled as licensed copies. This one was cut in Amsterdam from a Balenciaga model, the way a lot of women met Paris."},
    {k:"g3", house:"Cristóbal Balenciaga", what:"brown suede cap", when:"c. 1956", city:"Paris", sp:"fungoides", credit:RJ+" (BK-1993-57)", moment:"The 1957 sack dress let the body disappear on purpose. This cap is the same idea, for the head."},
    {k:"g4", house:"after Christian Dior", what:"black wool dress + jacket", when:"c. 1952", city:"Amsterdam", sp:"corolla", credit:RJ+" (BK-1986-57)", moment:"12 February 1947: Dior's first show. Carmel Snow of Harper's Bazaar called it a New Look and the name stuck."},
    {k:"g5", house:"Christian Dior", what:"knit evening gloves", when:"c. 1960", city:"Paris", sp:"digitalis", credit:RJ+" (BK-1978-226)", moment:"Sold in Amsterdam through Maison de Bonneterie: a gown was out of reach, Dior gloves weren't."},
    {k:"g6", house:"Chanel", what:"striped leather bag", when:"c. 1970", city:"Paris", sp:"marsupialis", credit:RJ+" (BK-1986-71)", moment:"February 1955: Chanel's 2.55 bag. A shoulder chain, so women's hands were free."},
    {k:"g7", house:"attr. Gabrielle Chanel", what:"black silk gauze fan", when:"1920s", city:"Paris", sp:"plumosa", credit:RJ+" (BK-1986-70)", moment:"1926: American Vogue drew Chanel's little black dress and called it 'Chanel's Ford'."},
    {k:"g8", house:"after Gabrielle Chanel", what:"black velvet house pyjama", when:"1920s", city:"Brussels", sp:"somnambula", credit:RJ+" (BK-1986-54)", moment:"Trousers for lounging, beach and staying in: the 1920s pyjama was a quiet revolution in velvet."},
    {k:"g9", house:"Paco Rabanne", what:"aluminium plate dress", when:"1967", city:"Paris", sp:"metallica", credit:RJ+" (BK-2019-13)", moment:"1966: '12 unwearable dresses in contemporary materials'. Pliers instead of needles."},
    {k:"g10", house:"after Jeanne Lanvin", what:"beaded bell skirt", when:"c. 1938", city:"Brussels", sp:"campanula", credit:RJ+" (BK-1986-55)", moment:"Lanvin started out dressing her daughter. The mother-and-child logo is still on the label."},
    {k:"g11", house:"after Jacques Fath", what:"pleated cocktail dress", when:"c. 1948", city:"Amsterdam", sp:"plicata", credit:RJ+" (BK-1986-56)", moment:"Fath was the young, flirty one of postwar Paris. Hubert de Givenchy and Valentino both trained in his house."},
    {k:"g12", house:"Charles James", what:"ball gown", when:"Met C.I.68.53.11", city:"New York", sp:"architectonica", credit:"The Metropolitan Museum of Art · CC0 via Wikimedia Commons", moment:"James built gowns like bridges: the 1953 Clover Leaf weighs about as much as a small dog. Dior credited him with inspiring the New Look."},
    {k:"g13", house:"André Courrèges", what:"dress and coat", when:"c. 1966", city:"Paris", sp:"lunaris", credit:"photo CC0 via Wikimedia Commons", moment:"1964: the space-age collection. White, flat boots, short hems, Paris looking at the moon."},
    {k:"g14", house:"Rudi Gernreich", what:"bikini for Harmon Knitwear", when:"1971", city:"Los Angeles", sp:"nuda", credit:"photo CC0 via Wikimedia Commons", moment:"1964: Gernreich's topless monokini. He also helped found the Mattachine Society, an early US gay-rights group."},
    {k:"g15", house:"Paul Poiret", what:"green satin dress + painted wrap", when:"c. 1925", city:"Paris", sp:"orientalis", credit:"photo CC0 via Wikimedia Commons", moment:"1911: the Thousand and Second Night party. Poiret dressed Paris like a dream of Persia and threw out the corset."},
    {k:"g16", house:"Issey Miyake × Yasumasa Morimura", what:"printed pleats", when:"1997", city:"Tokyo", sp:"plissata", credit:"photo CC0 via Wikimedia Commons", moment:"Pleats Please Guest Artist Series: Morimura's painting-within-a-painting printed onto pleats that fold flat in a suitcase."}
  ];
  const PLATES = [
    {k:"n0", lat:"Discomedusae", en:"jellyfish", hab:"sea"}, {k:"n1", lat:"Discomedusae", en:"jellyfish", hab:"sea"},
    {k:"n2", lat:"Asteridea", en:"starfish", hab:"reef"}, {k:"n3", lat:"Tineida", en:"moths", hab:"leaf"},
    {k:"n4", lat:"Ophiodea", en:"brittle stars", hab:"reef"}, {k:"n5", lat:"Echinidea", en:"sea urchins", hab:"reef"},
    {k:"n6", lat:"Chiroptera", en:"bats", hab:"night"}, {k:"n7", lat:"Trochilidae", en:"hummingbirds", hab:"leaf"},
    {k:"n8", lat:"Ananas", en:"pineapple + insects, Merian 1705", hab:"leaf"}, {k:"n9", lat:"Siphonophorae", en:"siphonophores", hab:"sea"},
    {k:"n10", lat:"Nepenthaceae", en:"pitcher plants", hab:"leaf"}
  ];
  const MAGS = [
    {k:"m0", t:"Gazette du Bon Ton", d:"1924, no. 9"}, {k:"m1", t:"Gazette du Bon Ton", d:"1923, no. 5"},
    {k:"m2", t:"Gazette du Bon Ton", d:"1920 · afternoon dresses, Lanvin + Beer"}, {k:"m3", t:"Les Élégances Parisiennes", d:"1918 · the latest creations"},
    {k:"m4", t:"Courrier de la Mode", d:"1869, no. 700"}
  ];
  const SHELF = [
    ["eternal.tv", "https://eternal.tv", "rare and unusual films", "fashion films, runway tapes, the weird stuff between campaigns"],
    ["IDEA", "https://www.ideanow.online", "rare + out-of-print fashion and photo books", "zines and books to cut up for real"],
    ["print.pm", "https://print.pm", "spreads from books and magazines", "layout, type, how a page breathes"],
    ["trendlist", "https://trendlist.org", "graphic design trends since 2011", "the graphic codes to steal or break"],
    ["Scanned Fashion World", "https://www.scannedfashionworld.com/?m=1", "90s + early-2000s editorials and ad campaigns, scanned", "the iconic moments, at the source"],
    ["eclectic library", "https://eclectic-library.neocities.org", "free books", "reading for the captions"],
    ["DC Punk Archive", "https://dclibrary.org/PUNK", "zines, fliers, posters from DC punk, 1976 on", "xerox texture, hand-cut type"],
    ["UCSB Cylinder Audio Archive", "https://cylinders.library.ucsb.edu", "10,000+ wax cylinders, 1893–1920s, free", "the soundtrack: crackle from before radio"],
    ["Rijksmuseum", "https://www.rijksmuseum.nl/en/rijksstudio", "costume photos (CC0)", "where most cut-outs here come from"],
    ["Wikimedia Commons", "https://commons.wikimedia.org/wiki/Category:Kunstformen_der_Natur", "Haeckel + Merian plates (public domain)", "the creatures behind the clothes"]
  ];
  const BANDS = ["#e9ef5c", "#bfe2ea", "#f3eba0", "#f2c7ad", "#cfe8b8", "#f1d2e6"];
  const CITY = {"Paris":[49,30], "Amsterdam":[50,27], "Brussels":[49.5,28.5], "New York":[29,33], "Los Angeles":[17,36], "Tokyo":[88,35]};
  const rnd = (a, b) => a + Math.random() * (b - a), pk = a => a[Math.floor(Math.random() * a.length)];
  const PI = k => PIECES.find(p => p.k === k), PL = k => PLATES.find(p => p.k === k);
  const genus = h => { const s = h.replace(/^(after|attr\.)\s+/i, "").replace(/\s*×.*/, "").split(/\s+/).pop().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); return s.charAt(0).toUpperCase() + s.slice(1).replace(/[aeiouy]$/, "") + "ia"; };
  const HAB = {
    sea:`<svg viewBox="0 0 40 30"><g fill="none" stroke="#222" stroke-width="1.3">${[6,12,18,24].map(y=>`<path d="M0 ${y}q5-4 10 0t10 0t10 0t10 0"/>`).join("")}</g></svg>`,
    reef:`<svg viewBox="0 0 40 30"><g fill="none" stroke="#222" stroke-width="1.2"><path d="M4 30V18q0-6 4-6t4 6v12M16 30V10q0-5 3-5t3 5v20M26 30V16q0-5 4-5t4 5v14"/>${[8,20,32].map(x=>`<circle cx="${x}" cy="27" r="1.6"/>`).join("")}</g></svg>`,
    leaf:`<svg viewBox="0 0 40 30"><g fill="#222">${[[8,8],[22,6],[32,16],[12,20],[26,22]].map(([x,y])=>`<path d="M${x} ${y}q6-6 10 0q-4 6-10 0z"/>`).join("")}</g></svg>`,
    night:`<svg viewBox="0 0 40 30"><rect width="40" height="30" fill="#222"/><g fill="#fff">${[[6,6],[16,12],[30,5],[34,20],[10,22],[24,24]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".9"/>`).join("")}<path d="M28 10a5 5 0 1 0 4 8a4 4 0 1 1-4-8z"/></g></svg>`
  };
  const MAP = c => { const [x, y] = CITY[c] || [50, 30]; return `<svg viewBox="0 0 100 60"><rect width="100" height="60" fill="#fdfcf6"/><g fill="#cfcfc8"><path d="M10 14q8-6 18-2l6 8-4 10-8 4-4 10-6-8-2-12z"/><path d="M22 36l8 4 2 12-6 6-4-10z"/><path d="M44 16q10-6 22-4l14 2 8 8-4 8-12 2-6 6-10-2-6 4-6-8 2-8z"/><path d="M48 36l8 2 2 12-6 4-4-8z"/><path d="M78 40l8 0 2 8-8 2z"/></g><line x1="0" y1="30" x2="100" y2="30" stroke="#999" stroke-width=".4"/><circle cx="${x}" cy="${y}" r="3" fill="none" stroke="#d1261b" stroke-width="1.2"/></svg>`; };
  const ICONS = ['<svg viewBox="0 0 30 24"><path d="M15 12c-6-12-14-8-12 0c-2 6 6 10 12 0c6 10 14 6 12 0c2-8-6-12-12 0z" fill="#d93a22"/></svg>', '<svg viewBox="0 0 30 24"><path d="M15 6v14M9 9l-6-5M21 9l6-5M9 14H2M21 14h7M9 19l-5 4M21 19l5 4" stroke="#222" stroke-width="1.6"/><ellipse cx="15" cy="13" rx="4" ry="7" fill="#222"/></svg>', '<svg viewBox="0 0 30 24"><path d="M15 2l3 8h8l-6 5 2 8-7-5-7 5 2-8-6-5h8z" fill="#d93a22"/></svg>'];

  XS.specs = XS.specs || null; XS.collage = XS.collage || [];
  function newSpec(k){ const p = k ? PI(k) : pk(PIECES), pl = pk(PLATES); return {g: p.k, n: pl.k, band: pk(BANDS), side: Math.random() < .35, rot: +rnd(-4, 4).toFixed(1), sx: +rnd(-8, 8).toFixed(0), sc: +rnd(.82, 1).toFixed(2)}; }
  if (!XS.specs) { XS.specs = PIECES.map(p => newSpec(p.k)); }
  const save = () => { try { xsave(); } catch(_) {} };

  function card(s, i){
    const p = PI(s.g), pl = PL(s.n); if (!p || !pl) return "";
    const name = `${genus(p.house)} ${p.sp}`;
    const head = `<div class="spband" style="background:${s.band}"><div class="spname">${esc(name)}<div class="spic">${ICONS[i % 3]}${ICONS[(i + 1) % 3]}</div></div><div class="sphab">${HAB[pl.hab]}</div><div class="spmap">${MAP(p.city)}</div></div>`;
    return `<figure class="spcard ${s.side ? "side" : ""}" data-spi="${i}" style="--r:${s.rot}deg">${head}<div class="spbody"><img class="spplate" src="${SPIMG[pl.k]}" alt="" draggable="false"><img class="spcut${/^g(0|1|3|5|6|7)$/.test(p.k) ? " obj" : ""}" src="${SPIMG[p.k]}" alt="${esc(p.what)}" draggable="false" style="--sx:${s.sx}%;--sc:${s.sc}"></div><figcaption><b>${esc(p.house)}</b> · ${esc(p.what)} · ${esc(p.when)}</figcaption></figure>`;
  }

  document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="specov"><div class="bwrap specwrap"><div class="bhead"><b>the specimen archive</b><span>fashion history, cut out and pasted onto nature plates</span><button class="bx" data-spclose>×</button></div>
    <div class="sptabs"><button class="on" data-spt="cards">✂ specimens</button><button data-spt="table">the collage table</button><button data-spt="mags">old magazines</button><button data-spt="shelf">research shelf</button></div>
    <div id="spBody"></div></div></div>`);
  const OV = $("#specov"); let tab = "cards", sel = -1;

  function paint(){
    document.querySelectorAll("[data-spt]").forEach(b => b.classList.toggle("on", b.dataset.spt === tab));
    const B = $("#spBody");
    if (tab === "cards") {
      B.innerHTML = `<div class="sptools"><button class="xp" data-spnew>✦ cut a new specimen</button><button class="xp" data-spall>↻ reshuffle the whole drawer</button><span class="sphint">tap a card to read it. every piece is a real archive object.</span></div><div class="spgrid">${XS.specs.map(card).join("")}</div>`;
    } else if (tab === "mags") {
      B.innerHTML = `<p class="sphint">real fashion magazines, old enough to be public domain. drag them onto the collage table.</p><div class="spmags">${MAGS.map(m => `<figure class="spmag"><img src="${SPIMG[m.k]}" alt=""><figcaption><b>${esc(m.t)}</b><br>${esc(m.d)}</figcaption><button class="xp" data-spadd="${m.k}">＋ to the table</button></figure>`).join("")}</div><p class="sphint">Rijksmuseum, Amsterdam · public domain via Wikimedia Commons.</p>`;
    } else if (tab === "shelf") {
      B.innerHTML = `<p class="sphint">where the archive digs. the 90s scans and spreads belong to their photographers and magazines, so they open at the source. the cut-outs here are museum photos that are free to use.</p><div class="spshelf">${SHELF.map(([n, u, w, why]) => `<a class="spres" href="${u}" target="_blank" rel="noopener"><b>${esc(n)}</b><span>${esc(w)}</span><i>${esc(why)}</i></a>`).join("")}</div>`;
    } else paintTable();
  }

  function detail(i){
    const s = XS.specs[i], p = PI(s.g), pl = PL(s.n);
    $("#spBody").insertAdjacentHTML("beforeend", `<div class="spdet" data-spdet><div class="spdetin">${card(s, i)}<div class="spdettx"><small>specimen no. ${String(i + 1).padStart(3, "0")}</small><h3>${esc(p.house)}</h3><p class="spw">${esc(p.what)} · ${esc(p.when)} · ${esc(p.city)}</p><p class="spm">${esc(p.moment)}</p><p class="spc">garment: ${esc(p.credit)}<br>plate: ${pl.k === "n8" ? "Maria Sibylla Merian, Metamorphosis insectorum Surinamensium, 1705" : "Ernst Haeckel, Kunstformen der Natur, 1904"} (${esc(pl.en)}), public domain</p>
      <div class="spbtns"><button class="xp" data-spre="${i}">✂ re-cut on another plate</button><button class="xp" data-sptotable="${i}">＋ to the collage table</button><button class="xp" data-sppocket="${i}">pocket it</button><button class="xp" data-spx>close</button></div></div></div></div>`);
  }

  /* ---------- collage table ---------- */
  const srcOf = it => it.own || SPIMG[it.k];
  const jag = () => { const pts = [], n = 22; for (let j = 0; j < n; j++) { const a = j / n * Math.PI * 2; const r = 46 + Math.random() * 5; pts.push([50 + Math.cos(a) * r * 1.06, 50 + Math.sin(a) * r * 1.06]); } return pts.map(([x, y]) => [Math.max(0, Math.min(100, x)).toFixed(1), Math.max(0, Math.min(100, y)).toFixed(1)]); };
  function addPiece(k, own){ const isCut = /^g/.test(k || ""); XS.collage.push({k, own: own || null, x: rnd(.15, .6), y: rnd(.1, .45), w: isCut ? 150 : 200, r: +rnd(-8, 8).toFixed(1), jag: null}); if (XS.collage.length > 24) XS.collage.shift(); save(); }
  function paintTable(){
    const B = $("#spBody");
    B.innerHTML = `<div class="sptools"><button class="xp" data-tadd="g">＋ a garment</button><button class="xp" data-tadd="n">＋ a nature plate</button><button class="xp" data-tadd="m">＋ a magazine page</button><label class="xp spup">＋ my own scan<input type="file" accept="image/*" id="spUp" hidden></label><button class="xp" data-tgen>✦ make one for me</button><span class="spsep"></span><button class="xp" data-tsel="cut">✂ scissor edge</button><button class="xp" data-tsel="big">＋</button><button class="xp" data-tsel="small">－</button><button class="xp" data-tsel="rot">↻</button><button class="xp" data-tsel="top">to front</button><button class="xp" data-tsel="del">remove</button><span class="spsep"></span><button class="xp" data-tclear>clear</button><button class="xp" data-tsave>⤓ save as image</button></div>
      <div class="sptable" id="spT"></div><p class="sphint">drag pieces, tap one to select it. your own scans stay on this device. tip: scan your magazine cut-outs and drop them here.</p>`;
    const T = $("#spT");
    XS.collage.forEach((it, i) => { const d = document.createElement("div"); d.className = "sppiece" + (i === sel ? " sel" : "") + (/^g/.test(it.k || "") ? " cut" : ""); d.dataset.pi = i; d.style.cssText = `left:${it.x * 100}%;top:${it.y * 100}%;width:${it.w}px;transform:rotate(${it.r}deg);z-index:${i + 1}`; d.innerHTML = `<img src="${srcOf(it)}" alt="" draggable="false" style="${it.jag ? `clip-path:polygon(${it.jag.map(p => p[0] + "% " + p[1] + "%").join(",")})` : ""}">`; T.appendChild(d); });
    $("#spUp").onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"), k = 520 / Math.max(im.width, im.height); c.width = im.width * Math.min(1, k); c.height = im.height * Math.min(1, k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); const own = c.toDataURL(f.type === "image/png" ? "image/png" : "image/jpeg", .82); addPiece("own", own); if (XS.collage.filter(x => x.own).length > 4) { const j = XS.collage.findIndex(x => x.own); XS.collage.splice(j, 1); } paintTable(); }; im.src = r.result; }; r.readAsDataURL(f); };
    T.onpointerdown = e => { const d = e.target.closest(".sppiece"); if (!d) { sel = -1; T.querySelectorAll(".sel").forEach(x => x.classList.remove("sel")); return; } const i = +d.dataset.pi, it = XS.collage[i]; sel = i; T.querySelectorAll(".sel").forEach(x => x.classList.remove("sel")); d.classList.add("sel"); const R = T.getBoundingClientRect(), ox = e.clientX - (it.x * R.width), oy = e.clientY - (it.y * R.height); try { d.setPointerCapture(e.pointerId); } catch(_) {} const mv = ev => { it.x = Math.max(-.2, Math.min(.95, (ev.clientX - ox) / R.width)); it.y = Math.max(-.2, Math.min(.95, (ev.clientY - oy) / R.height)); d.style.left = it.x * 100 + "%"; d.style.top = it.y * 100 + "%"; }; const up = () => { d.removeEventListener("pointermove", mv); d.removeEventListener("pointerup", up); save(); }; d.addEventListener("pointermove", mv); d.addEventListener("pointerup", up); e.preventDefault(); };
  }
  function autoCollage(){ XS.collage = []; const pl = pk(PLATES), m = pk(MAGS); XS.collage.push({k: pl.k, x: .08, y: .04, w: 300, r: -2, jag: null}); XS.collage.push({k: m.k, x: .55, y: .08, w: 190, r: 5, jag: jag()}); [...PIECES].sort(() => Math.random() - .5).slice(0, 3).forEach((p, i) => XS.collage.push({k: p.k, x: .12 + i * .22, y: .18 + (i % 2) * .12, w: 150 + Math.random() * 40, r: +rnd(-7, 7).toFixed(1), jag: null})); save(); }
  async function saveImg(){
    const T = $("#spT"), R = T.getBoundingClientRect(), c = document.createElement("canvas"), k = 2; c.width = R.width * k; c.height = R.height * k; const x = c.getContext("2d"); x.scale(k, k); x.fillStyle = "#f5efe1"; x.fillRect(0, 0, R.width, R.height);
    for (const it of XS.collage) { const im = await new Promise(ok => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = srcOf(it); }); if (!im) continue; const w = it.w, h = w * im.height / im.width; x.save(); x.translate(it.x * R.width + w / 2, it.y * R.height + h / 2); x.rotate(it.r * Math.PI / 180); if (/^g/.test(it.k || "")) { x.shadowColor = "rgba(0,0,0,.35)"; x.shadowBlur = 6; x.shadowOffsetY = 3; } if (it.jag) { x.beginPath(); it.jag.forEach(([px, py], j) => { const X = -w / 2 + px / 100 * w, Y = -h / 2 + py / 100 * h; j ? x.lineTo(X, Y) : x.moveTo(X, Y); }); x.closePath(); x.clip(); } x.drawImage(im, -w / 2, -h / 2, w, h); x.restore(); }
    c.toBlob(async b => { let dl = null; try { dl = await window.claude.use("downloads"); } catch(_) {} if (dl) { try { await dl.save({filename: "gomsn-collage.png", data: b}); toast("saved. it's yours."); return; } catch(_) {} } const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "gomsn-collage.png"; document.body.appendChild(a); a.click(); a.remove(); toast("saved. it's yours."); }, "image/png");
  }

  OV.addEventListener("click", e => {
    const t = e.target;
    if (t.closest("[data-spclose]") || t === OV) { OV.classList.remove("open"); return; }
    const tb = t.closest("[data-spt]"); if (tb) { tab = tb.dataset.spt; sel = -1; paint(); return; }
    if (t.closest("[data-spnew]")) { XS.specs.unshift(newSpec()); XS.specs = XS.specs.slice(0, 30); save(); paint(); try { tone && tone(880, .05); } catch(_) {} return; }
    if (t.closest("[data-spall]")) { XS.specs = XS.specs.map(s => Object.assign(newSpec(s.g))); save(); paint(); return; }
    if (t.closest("[data-spx]") || t.matches("[data-spdet]")) { const d = $("[data-spdet]"); if (d) d.remove(); return; }
    const re = t.closest("[data-spre]"); if (re) { const i = +re.dataset.spre; XS.specs[i] = newSpec(XS.specs[i].g); save(); paint(); detail(i); return; }
    const tt = t.closest("[data-sptotable]"); if (tt) { const s = XS.specs[+tt.dataset.sptotable]; addPiece(s.n); XS.collage[XS.collage.length - 1].w = 280; addPiece(s.g); tab = "table"; paint(); return; }
    const po = t.closest("[data-sppocket]"); if (po) { const p = PI(XS.specs[+po.dataset.sppocket].g); try { collect({t: `${p.house}, ${p.what}`, img: SPIMG[p.k], c: p.when, d: p.moment}); } catch(_) {} toast(`🎒 pocketed: ${p.house}, ${p.what}`); return; }
    const sc = t.closest(".spgrid .spcard"); if (sc) { detail(+sc.dataset.spi); return; }
    const ad = t.closest("[data-spadd]"); if (ad) { addPiece(ad.dataset.spadd); tab = "table"; paint(); return; }
    const ta = t.closest("[data-tadd]"); if (ta) { const pool = ta.dataset.tadd === "g" ? PIECES : ta.dataset.tadd === "n" ? PLATES : MAGS; addPiece(pk(pool).k); paintTable(); return; }
    if (t.closest("[data-tgen]")) { autoCollage(); sel = -1; paintTable(); return; }
    if (t.closest("[data-tclear]")) { XS.collage = []; sel = -1; save(); paintTable(); return; }
    if (t.closest("[data-tsave]")) { saveImg(); return; }
    const ts = t.closest("[data-tsel]"); if (ts) { if (sel < 0 || !XS.collage[sel]) { toast("tap a piece first."); return; } const it = XS.collage[sel], a = ts.dataset.tsel; if (a === "cut") it.jag = it.jag ? null : jag(); if (a === "big") it.w = Math.min(520, it.w * 1.15); if (a === "small") it.w = Math.max(50, it.w / 1.15); if (a === "rot") it.r = (it.r + 12) % 360; if (a === "top") { XS.collage.push(XS.collage.splice(sel, 1)[0]); sel = XS.collage.length - 1; } if (a === "del") { XS.collage.splice(sel, 1); sel = -1; } save(); paintTable(); return; }
  });

  window.openSpecimens = (t) => { closeOverlays(); tab = t || "cards"; paint(); OV.classList.add("open"); try { XS.vis = XS.vis || {}; XS.vis.specimens = 1; save(); } catch(_) {} };

  /* ways in */
  const dr = $("#hudDrawer"); if (dr) { dr.insertAdjacentHTML("afterbegin", `<button id="hudSpec">✂ specimen archive</button>`); $("#hudSpec").onclick = () => window.openSpecimens(); }
  try { VERT.forEach(v => { if (v.id === "explore") v.p.unshift(["specimens", "✂", "the specimen archive", "fashion history cut out and pasted onto old nature plates, plus a collage table"]); if (v.id === "collect") v.p.push(["collage", "✂", "the collage table", "cut, paste, tear, save"]); }); } catch(_) {}
  const _gp22 = goPlace; goPlace = function(k){ if (k === "specimens" || k === "collage") { document.body.classList.remove("inroom"); window.openSpecimens(k === "collage" ? "table" : "cards"); return; } return _gp22(k); };
  /* GoMsn hears you mention it */
  const RX = /\b(specimen|collage|archiv|schiaparelli|balenciaga|poiret|courr[eè]ges|rabanne|vintage fashion|cut[- ]?out)/i;
  document.addEventListener("keydown", e => { if (e.key !== "Enter") return; const el = e.target; if (!el || !el.matches || !el.matches("textarea, input")) return; if (RX.test(el.value || "")) setTimeout(() => { try { toast(`✂ <a href="#" onclick="openSpecimens();return false">the specimen archive</a> has that drawer open.`); } catch(_) {} }, 900); }, true);
})();
