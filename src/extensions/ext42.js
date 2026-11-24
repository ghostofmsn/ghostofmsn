/* =================== EXTENSION 42: the design collection (win icons as you explore), design archives on the shelf, a clearer move button =================== */
(function(){
  const C = "https://thumb.wikimedia.org/wikipedia/commons/thumb/", U = "https://upload.wikimedia.org/wikipedia/commons/";
  /* [id, name, designer, year, maker, kind, silhouette, material, image, credit] */
  const OBJ = [
    ["panton", "Panton Chair", "Verner Panton", 1967, "Vitra", "chair", "cantilevered", "moulded plastic", C + "4/48/Esemplare_in_fibra_di_vetro_anni_60%27.png/500px-Esemplare_in_fibra_di_vetro_anni_60%27.png", "Robogate, CC BY-SA 4.0"],
    ["egg", "Egg Chair", "Arne Jacobsen", 1958, "Fritz Hansen", "chair", "biomorphic", "upholstered shell", U + "e/e6/The_Egg_Chair.jpg", "Scott Anderson, CC BY-SA 2.0"],
    ["swan", "Swan Chair", "Arne Jacobsen", 1958, "Fritz Hansen", "chair", "biomorphic", "upholstered shell", C + "b/be/Ngv_design%2C_arne_jacobsen%2C_swan_chair%2C_1958.JPG/500px-Ngv_design%2C_arne_jacobsen%2C_swan_chair%2C_1958.JPG", "sailko, CC BY 2.5"],
    ["ant", "Ant Chair", "Arne Jacobsen", 1952, "Fritz Hansen", "chair", "biomorphic", "moulded plywood", C + "8/80/Design_Museum_Danmark_-_Ant_chair.jpg/500px-Design_Museum_Danmark_-_Ant_chair.jpg", "lglazier618, CC BY 2.0"],
    ["series7", "Series 7", "Arne Jacobsen", 1955, "Fritz Hansen", "chair", "biomorphic", "moulded plywood", C + "1/14/Jacobsen%2C_7an.jpg/500px-Jacobsen%2C_7an.jpg", "Holger Ellgaard, CC BY-SA 3.0"],
    ["ball", "Ball Chair", "Eero Aarnio", 1963, "Asko", "chair", "monolithic", "fibreglass", C + "9/98/Ngv_design%2C_eero_aarnio%2C_globe_chair_1963-65_01.JPG/500px-Ngv_design%2C_eero_aarnio%2C_globe_chair_1963-65_01.JPG", "sailko, CC BY 2.5"],
    ["bubble", "Bubble Chair", "Eero Aarnio", 1968, "Asko", "chair", "monolithic", "acrylic", C + "6/6e/Bubble_Chair_Eero_Aarnio.jpg/500px-Bubble_Chair_Eero_Aarnio.jpg", "Hans B., CC BY-SA 3.0"],
    ["tulip", "Tulip Chair", "Eero Saarinen", 1957, "Knoll", "chair", "pedestal", "fibreglass, cast aluminium", C + "a/a5/Saarinen_Tulpanstolen.jpg/500px-Saarinen_Tulpanstolen.jpg", "Holger Ellgaard, CC BY-SA 3.0"],
    ["eames", "Eames Lounge Chair", "Charles & Ray Eames", 1956, "Herman Miller", "chair", "biomorphic", "rosewood plywood, leather", U + "e/e3/Eameslounch.jpg", "public domain"],
    ["barcelona", "Barcelona Chair", "Mies van der Rohe & Lilly Reich", 1929, "Knoll", "chair", "tubular", "steel, leather", C + "5/59/Ngv_design%2C_ludwig_mies_van_der_rohe_%26_co%2C_barcelona_chair.JPG/500px-Ngv_design%2C_ludwig_mies_van_der_rohe_%26_co%2C_barcelona_chair.JPG", "sailko, CC BY 2.5"],
    ["wassily", "Wassily Chair", "Marcel Breuer", 1925, "Knoll", "chair", "tubular", "steel tube, leather", C + "1/19/Bauhaus_Chair_Breuer.png/500px-Bauhaus_Chair_Breuer.png", "public domain"],
    ["cesca", "Cesca Chair", "Marcel Breuer", 1928, "Thonet", "chair", "cantilevered", "steel tube, cane", C + "4/4a/Breuer_chair_2008.jpg/500px-Breuer_chair_2008.jpg", "Holger Ellgaard, CC BY-SA 3.0"],
    ["lc4", "LC4 Chaise Longue", "Le Corbusier, Jeanneret & Perriand", 1928, "Cassina", "chair", "tubular", "steel, pony hide", C + "f/f2/LC4%2C_chaise_longue.png/500px-LC4%2C_chaise_longue.png", "CC BY-SA 3.0"],
    ["redblue", "Red and Blue Chair", "Gerrit Rietveld", 1918, "Cassina", "chair", "monolithic", "painted wood", C + "0/09/Gerrit_thomas_rietveld%2C_red-blue_chair%2C_1946-56_ca.jpg/500px-Gerrit_thomas_rietveld%2C_red-blue_chair%2C_1946-56_ca.jpg", "Sailko, CC BY 3.0"],
    ["zigzag", "Zig-Zag Chair", "Gerrit Rietveld", 1934, "Cassina", "chair", "cantilevered", "wood", C + "9/91/Gerrit_rietveld%2C_sedia_zig-zag%2C_1938_ca.jpg/500px-Gerrit_rietveld%2C_sedia_zig-zag%2C_1938_ca.jpg", "Sailko, CC BY 3.0"],
    ["thonet14", "Chair No. 14", "Michael Thonet", 1859, "Thonet", "chair", "tubular", "bentwood", C + "9/94/Thonet_Chair_No._14.JPG/500px-Thonet_Chair_No._14.JPG", "Henry Townsend, FAL"],
    ["wishbone", "Wishbone Chair", "Hans J. Wegner", 1949, "Carl Hansen & Søn", "chair", "biomorphic", "oak, paper cord", C + "2/2e/Hans_Wegner_Wishbone_Chair.jpg/500px-Hans_Wegner_Wishbone_Chair.jpg", "Robert B. Moffatt, CC BY-SA 2.0"],
    ["coconut", "Coconut Chair", "George Nelson", 1955, "Herman Miller", "chair", "biomorphic", "steel shell, upholstery", C + "9/92/George_nelson_per_herman_miller_inc.%2C_coconut_chair%2C_zeeland_MI_1955.jpg/500px-George_nelson_per_herman_miller_inc.%2C_coconut_chair%2C_zeeland_MI_1955.jpg", "Sailko, CC BY 3.0"],
    ["djinn", "Djinn Chair", "Olivier Mourgue", 1965, "Airborne", "chair", "biomorphic", "foam, jersey, steel", C + "5/52/Stanley_Kubrick_The_Exhibition_-_LACMA_-_2001_A_Space_Odyssey_-_Olivier_Mourge_Djinn_chair_and_sofa_%288998536189%29.jpg/500px-Stanley_Kubrick_The_Exhibition_-_LACMA_-_2001_A_Space_Odyssey_-_Olivier_Mourge_Djinn_chair_and_sofa_%288998536189%29.jpg", "Matthew J. Cotter, CC BY-SA 2.0"],
    ["up5", "Up 5 (La Mamma)", "Gaetano Pesce", 1969, "C&B Italia", "chair", "biomorphic", "polyurethane foam, jersey", C + "e/e7/Gaetano_Pesce_Up_chair_and_ottoman_%281969%29.jpg/500px-Gaetano_Pesce_Up_chair_and_ottoman_%281969%29.jpg", "Paul Lowry, CC BY 2.0"],
    ["joe", "Joe", "De Pas, D'Urbino & Lomazzi", 1970, "Poltronova", "chair", "biomorphic", "leather, foam", C + "8/82/%27_12_-_ITALY_-_Joe_-_Poltronova_-_armchair.JPG/500px-%27_12_-_ITALY_-_Joe_-_Poltronova_-_armchair.JPG", "Pava, CC BY-SA 3.0 it"],
    ["sacco", "Sacco", "Gatti, Paolini & Teodoro", 1968, "Zanotta", "chair", "biomorphic", "polystyrene beads, fabric", C + "8/85/Zanotta_Sacco_chair_with_houndstooth_upholstery.jpg/500px-Zanotta_Sacco_chair_with_houndstooth_upholstery.jpg", "Daniela De Ponti, CC0"],
    ["plia", "Plia", "Giancarlo Piretti", 1967, "Castelli", "chair", "tubular", "aluminium, clear plastic", C + "7/70/Ngv_design%2C_giancarlo_piretti%2C_plia_folding_chair%2C_1969_02.JPG/500px-Ngv_design%2C_giancarlo_piretti%2C_plia_folding_chair%2C_1969_02.JPG", "sailko, CC BY 2.5"],
    ["maewest", "Mae West Lips Sofa", "Salvador Dalí & Edward James", 1938, "Green & Abbott", "chair", "biomorphic", "wood, felt", C + "1/1c/Salvador_dal%C3%AC%2C_divano_labbra_di_mae_west%2C_1938.jpg/500px-Salvador_dal%C3%AC%2C_divano_labbra_di_mae_west%2C_1938.jpg", "Sailko, CC BY 3.0"],
    ["arco", "Arco", "Achille & Pier Giacomo Castiglioni", 1962, "Flos", "lamp", "cantilevered", "marble, steel", C + "9/91/-_ITALY_-_Lampada_Arco_di_Achille_Castiglioni_per_Flos_%28_1962_%29.svg/500px--_ITALY_-_Lampada_Arco_di_Achille_Castiglioni_per_Flos_%28_1962_%29.svg.png", "Andrea Pavanello, CC BY-SA 3.0 it"],
    ["taraxacum", "Taraxacum", "Achille Castiglioni", 1988, "Flos", "lamp", "monolithic", "aluminium, bulbs", C + "e/e2/%22_11_-_ITALY_-_Italian_design_-_Taraxacum_-_Achille_Castiglioni_-_Flos_-_1988_at_TDM_Milan.jpg/500px-%22_11_-_ITALY_-_Italian_design_-_Taraxacum_-_Achille_Castiglioni_-_Flos_-_1988_at_TDM_Milan.jpg", "Andrea Pavanello, CC BY-SA 3.0 it"],
    ["pipistrello", "Pipistrello", "Gae Aulenti", 1965, "Martinelli Luce", "lamp", "biomorphic", "methacrylate, steel", C + "f/fa/Pipistrellolamp.jpg/500px-Pipistrellolamp.jpg", "Bertzijngedacht, CC0"],
    ["atollo", "Atollo", "Vico Magistretti", 1977, "Oluce", "lamp", "monolithic", "lacquered aluminium", C + "e/eb/%22_11_-_ITALY_-_Atollo_-_Oluce_-_Vico_Magistretti_1977.jpg/500px-%22_11_-_ITALY_-_Atollo_-_Oluce_-_Vico_Magistretti_1977.jpg", "Pava, CC BY-SA 3.0 it"],
    ["eclisse", "Eclisse", "Vico Magistretti", 1965, "Artemide", "lamp", "monolithic", "painted metal", C + "e/eb/Eclisse_Magistretti.jpg/500px-Eclisse_Magistretti.jpg", "Camillo Frigeni, CC BY-SA 4.0"],
    ["nesso", "Nesso", "Giancarlo Mattioli (Gruppo Architetti Urbanisti Città Nuova)", 1967, "Artemide", "lamp", "biomorphic", "ABS plastic", C + "7/76/Nesso_lamp_-_Artemide.jpg/500px-Nesso_lamp_-_Artemide.jpg", "Apartment Therapy, CC BY-SA 2.0"],
    ["tizio", "Tizio", "Richard Sapper", 1972, "Artemide", "lamp", "cantilevered", "ABS, aluminium", C + "3/32/Lampe_Tizio_von_Richard_Sapper.jpg/500px-Lampe_Tizio_von_Richard_Sapper.jpg", "CC BY 3.0"],
    ["anglepoise", "Anglepoise 1227", "George Carwardine", 1935, "Anglepoise", "lamp", "cantilevered", "steel, springs", U + "5/53/Anglepoise1227.jpg", "public domain"],
    ["artichoke", "PH Artichoke", "Poul Henningsen", 1958, "Louis Poulsen", "lamp", "biomorphic", "copper leaves", C + "2/28/PH_Artichoke_lamp.jpg/500px-PH_Artichoke_lamp.jpg", "Kri, CC BY-SA 3.0"],
    ["flowerpot", "Flowerpot", "Verner Panton", 1968, "&Tradition", "lamp", "monolithic", "lacquered metal", C + "0/01/Verner_Panton_-_Flowerpot_lamps.jpg/500px-Verner_Panton_-_Flowerpot_lamps.jpg", "Lothar Lee, CC BY 2.0"],
    ["akari", "Akari", "Isamu Noguchi", 1951, "Ozeki", "lamp", "biomorphic", "washi paper, bamboo", C + "4/44/Akari_light_sculptures.png/500px-Akari_light_sculptures.png", "CC BY-SA 4.0"],
    ["lava", "Lava Lamp", "Edward Craven Walker", 1963, "Mathmos", "lamp", "monolithic", "glass, wax, aluminium", C + "2/24/Lava_lamps_%2816136876840%29.jpg/500px-Lava_lamps_%2816136876840%29.jpg", "Dean Hochman, CC BY 2.0"],
    ["noguchi", "Noguchi Table", "Isamu Noguchi", 1944, "Herman Miller", "table", "biomorphic", "glass, walnut", U + "8/87/Isamu_Noguchi%2C_Coffee_table%2C_1959_%285646039032%29.jpg", "CC BY 2.0"],
    ["componibili", "Componibili", "Anna Castelli Ferrieri", 1967, "Kartell", "table", "monolithic", "ABS plastic", C + "f/f0/Kartell_Componibili_%28wei%C3%9F%29.jpg/500px-Kartell_Componibili_%28wei%C3%9F%29.jpg", "Mediatrotter, CC BY 4.0"],
    ["boby", "Boby Trolley", "Joe Colombo", 1970, "Bieffeplast", "table", "monolithic", "ABS plastic", C + "d/dd/Joe_cesare_colombo_per_bieffeplast_spa.%2C_trolley_boby%2C_1970_ca.jpg/500px-Joe_cesare_colombo_per_bieffeplast_spa.%2C_trolley_boby%2C_1970_ca.jpg", "Sailko, CC BY 3.0"],
    ["valentine", "Valentine", "Ettore Sottsass & Perry King", 1969, "Olivetti", "object", "monolithic", "ABS plastic", C + "6/69/Olivetti_Valentine_typewriter.jpg/500px-Olivetti_Valentine_typewriter.jpg", "Maksym Kozlenko, CC BY-SA 4.0"],
    ["brionvega", "RR 126 radio-phonograph", "Achille & Pier Giacomo Castiglioni", 1965, "Brionvega", "object", "monolithic", "lacquered wood", C + "8/87/RR_126_versione_arancio.png/500px-RR_126_versione_arancio.png", "Letizia Rosso, CC BY-SA 4.0"],
    ["juicy", "Juicy Salif", "Philippe Starck", 1990, "Alessi", "object", "biomorphic", "cast aluminium", C + "f/fe/Philippe_starck_per_alessi_spa.%2C_spremiagrumi_juicy_salif%2C_1990.jpg/500px-Philippe_starck_per_alessi_spa.%2C_spremiagrumi_juicy_salif%2C_1990.jpg", "Sailko, CC BY 3.0"],
    ["moka", "Moka Express", "Alfonso Bialetti", 1933, "Bialetti", "object", "monolithic", "aluminium", C + "4/4f/Moka_Express_Bialetti.png/500px-Moka_Express_Bialetti.png", "Bialetti Industrie, CC BY-SA 4.0"]
  ];
  window.DESIGN_OBJ = OBJ;
  XS.won = XS.won || [];
  const KIND = {all: "everything", chair: "chairs", lamp: "lamps", table: "tables", object: "objects"};
  const SIL = ["biomorphic", "cantilevered", "tubular", "monolithic", "pedestal"];
  const COL = {chair: "#e8432e", lamp: "#f2c230", table: "#3aa0e0", object: "#58b368"};
  const W = (u, w) => u.replace("/500px-", "/" + w + "px-");

  /* winning: about one in three new things you learn or open finds you an object */
  const win = (why) => { const left = OBJ.filter(o => !XS.won.includes(o[0])); if (!left.length) return; const o = left[Math.floor(Math.random() * left.length)]; XS.won.push(o[0]); xsave();
    $("#win42in").innerHTML = `<small>you found something${why ? " · " + esc(why) : ""}</small><span class="cut" style="--c:${COL[o[5]]}"><img src="${o[8]}" alt="" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('noimg')"></span><h3>${esc(o[1])}</h3><p>${esc(o[2])}, ${o[3]} · ${esc(o[4])}</p><p class="w42m">${esc(o[6])} · ${esc(o[7])}</p><div class="j30act"><button class="xp big" data-col42>see your collection (${XS.won.length}/${OBJ.length})</button><button class="xp" data-w42x>keep exploring</button></div>`;
    $("#win42").classList.add("open"); try { tone([[523,.08],[659,.08],[784,.08],[1047,.2]], "triangle", .04); } catch(_) {} };
  let lastWin = 0, seen = (XS.learn || []).length ? XS.learn[0].at : 0;
  setInterval(() => { const L = XS.learn || []; if (!L.length || L[0].at === seen) return; seen = L[0].at; if (Date.now() - lastWin > 45000 && Math.random() < .34) { lastWin = Date.now(); setTimeout(() => win(L[0].t), 700); } }, 1500);
  window.winDesign = win;

  document.body.insertAdjacentHTML("beforeend", `<div class="pop30" id="win42"><div class="w42box" id="win42in"></div></div>
    <div class="ov" id="col42"><div class="l30wrap">
      <div class="l30head"><div><small>the design collection</small><h2>chairs, lamps & icons you've found</h2></div><button class="bx" data-c42x>×</button></div>
      <p class="g30intro" id="c42n"></p>
      <div class="l30bar"><div class="l30pills">${Object.entries(KIND).map(([k, v]) => `<button class="pl30 ${k === "all" ? "on" : ""}" data-c42k="${k}" style="--c:${COL[k] || "#fff"}">${v}</button>`).join("")}</div><div class="l30pills">${SIL.map(s => `<button class="pl30" data-c42s="${s}">${s}</button>`).join("")}</div></div>
      <div class="c42grid" id="c42grid"></div>
      <h4 class="c42h">trace them further</h4><div class="rhlinks">${[["Vintageinfo catalogues", "https://vintageinfo.be/catalogues/"], ["AM Antwerp lighting folders", "https://www.am-antwerp.com/pages/all-folders"], ["Same Old archive", "https://sameold.com/archive"], ["Studio65 radical design", "https://studio65.eu/radical-italian-design-dennis-freedman-collection/"], ["EDRA archive", "https://www.edracadabra.com/collections/archives"], ["JAPAN Design Resource Database", "https://designdesigndesign.jp/en/database/"], ["Fabriklampen archive", "https://fabriklampen.de/en/archive/"], ["Undesignable luminaires", "https://undesignable.eu/en/gall/list/?category=luminaires&sort=latest&view=grid"], ["The Oblist vintage", "https://oblist.com/collections/vintage-furniture"], ["Future Antiques lighting archive", "https://futureantiques.eu/our-portfolio/lighting-archive/"]].map(([n, u]) => `<a class="xp" href="${u}" target="_blank" rel="noopener">${n} ↗</a>`).join("")}</div>
      <p class="mr30cred">photographs via Wikimedia Commons, credited on each piece.</p></div></div>
    <div class="pop30" id="obj42"><div class="p30box"><button class="bx" data-o42x>×</button><div id="o42in" style="display:contents"></div></div></div>`);
  let fk = "all", fs = null;
  const paint = () => { const won = XS.won; $("#c42n").textContent = `${won.length} of ${OBJ.length} found. every new thing you open around the site has a chance of giving you one.`;
    $("#c42grid").innerHTML = OBJ.filter(o => (fk === "all" || o[5] === fk) && (!fs || o[6] === fs)).map((o, i) => { const has = won.includes(o[0]); return `<button class="c42c ${has ? "" : "lock"}" data-o42="${o[0]}" style="--c:${COL[o[5]]};--r:${(i * 37 % 7) - 3}deg"><span class="cut" style="--c:${COL[o[5]]}">${has ? `<img src="${o[8]}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('noimg')">` : `<i>?</i>`}</span><b>${has ? esc(o[1]) : "not found yet"}</b><small>${has ? `${esc(o[2])}, ${o[3]}` : `a ${esc(o[6])} ${esc(o[5])}`}</small></button>`; }).join(""); };
  window.openCollection = () => { closeOverlays(); paint(); $("#col42").classList.add("open"); };
  document.addEventListener("click", e => { const t = e.target;
    if (t.closest("[data-w42x]") || t.id === "win42") { $("#win42").classList.remove("open"); return; }
    if (t.closest("[data-col42]")) { $("#win42").classList.remove("open"); window.openCollection(); return; }
    if (t.closest("[data-c42x]")) { $("#col42").classList.remove("open"); return; }
    const k = t.closest("[data-c42k]"); if (k) { fk = k.dataset.c42k; document.querySelectorAll("[data-c42k]").forEach(b => b.classList.toggle("on", b === k)); paint(); return; }
    const s = t.closest("[data-c42s]"); if (s) { fs = fs === s.dataset.c42s ? null : s.dataset.c42s; document.querySelectorAll("[data-c42s]").forEach(b => b.classList.toggle("on", b.dataset.c42s === fs)); paint(); return; }
    const o = t.closest("[data-o42]"); if (o) { const d = OBJ.find(x => x[0] === o.dataset.o42); if (!d) return; if (!XS.won.includes(d[0])) { toast("not found yet. keep exploring: rabbit holes, plants, the archive, letters."); return; }
      $("#o42in").innerHTML = `<div class="p30img" style="--c:${COL[d[5]]}"><img src="${W(d[8], 960)}" alt="" referrerpolicy="no-referrer" onerror="this.src='${d[8]}'"></div><div class="p30txt"><small>${esc(d[5])} · ${esc(d[6])}</small><h3>${esc(d[1])}</h3><p class="p30lat">${esc(d[2])}, ${d[3]}</p><p><b>made by</b> ${esc(d[4])}<br><b>material</b> ${esc(d[7])}<br><b>silhouette</b> ${esc(d[6])}</p>
        <div class="rhlinks"><a class="xp" href="https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(d[1] + " " + d[2])}" target="_blank" rel="noopener">read about it</a><a class="xp" href="https://oblist.com/search?q=${encodeURIComponent(d[1])}" target="_blank" rel="noopener">find one (The Oblist)</a><a class="xp" href="https://www.google.com/search?q=${encodeURIComponent(d[1] + " " + d[2] + " original catalogue")}" target="_blank" rel="noopener">original catalogue</a></div><p class="g30c2">photo: ${esc(d[9])}, Wikimedia Commons</p></div>`;
      $("#obj42").classList.add("open"); return; }
    if (t.closest("[data-o42x]") || t.id === "obj42") { $("#obj42").classList.remove("open"); return; }
  });
  /* doors in */
  const dr = $("#hudDrawer"); if (dr) dr.insertAdjacentHTML("afterbegin", `<button data-coll42>🪑 my design collection</button>`);
  document.addEventListener("click", e => { if (e.target.closest("[data-coll42]")) window.openCollection(); });
  try { VERT.forEach(v => { if (v.id === "collect") v.p.unshift(["coll42", "🪑", "my design collection", "chairs, lamps and icons you win as you explore"]); }); const _gp = goPlace; goPlace = function(k){ if (k === "coll42") return window.openCollection(); return _gp(k); }; } catch(_) {}
  const ab = $("#abf") || document.querySelector("#abyss .abhud"); if (ab) { ab.insertAdjacentHTML("beforeend", `<button type="button" data-ab42>🪑 design collection</button>`); ab.addEventListener("click", e => { if (e.target.closest("[data-ab42]")) { e.stopPropagation(); $("#abyss").classList.remove("open"); window.openCollection(); } }, true); }
  /* her design archives join the rabbit holes */
  try { const SH = window.SHELF_PUBLIC; if (SH) [
    ["Vintageinfo catalogues", "https://vintageinfo.be/catalogues/", "original lighting catalogue scans, A to Z", "model numbers from Artemide, Stilnovo, Flos, Guzzini", "objects"],
    ["AM Antwerp folders", "https://www.am-antwerp.com/pages/all-folders", "original mid-century and 70s print folders", "Noguchi Akari, Fog & Mørup, Artifort, VeArt glass", "objects"],
    ["Same Old archive", "https://sameold.com/archive", "a chronological catalogue of iconic seating and tables", "Togo, Camaleonda, 90s chairs, travertine", "objects"],
    ["Studio65 radical design", "https://studio65.eu/radical-italian-design-dennis-freedman-collection/", "Italian radical design, the Dennis Freedman collection", "Archizoom, Superstudio, Pesce, Aulenti", "objects"],
    ["Design Italia lighting archive", "https://www.designitalia.com/italian-mid-century-furniture-archive-lighting", "Italian mid-century lighting, sold and documented", "space-age lamps, Murano glass, chrome", "objects"],
    ["EDRA archive", "https://www.edracadabra.com/collections/archives", "120+ rare Italian and Brazilian pieces", "Willy Rizzo tables, Karelia chairs, Stoppino shelving", "objects"],
    ["JAPAN Design Resource Database", "https://designdesigndesign.jp/en/database/", "postwar and postmodern Japanese furniture", "overlooked designers, materials, studio interviews", "objects"],
    ["Fabriklampen archive", "https://fabriklampen.de/en/archive/", "industrial lamps with exact dimensions", "enamelled factory lamps, Bauhaus stools", "objects"],
    ["Undesignable luminaires", "https://undesignable.eu/en/gall/list/?category=luminaires&sort=latest&view=grid", "European and Brazilian sculptural lighting", "provenance notes", "objects"],
    ["The Oblist vintage", "https://oblist.com/collections/vintage-furniture", "vintage furniture with provenance", "cross-reference rare pieces", "objects"],
    ["Future Antiques lighting archive", "https://futureantiques.eu/our-portfolio/lighting-archive/", "a lighting archive from a design dealer", "rare designer lighting", "objects"]
  ].forEach(r => { if (!SH.some(s => s[1] === r[1])) SH.push(r); }); } catch(_) {}
  /* the move button says what it does */
  const mv = setInterval(() => { const b = $("#r3move"); if (!b) return; clearInterval(mv); b.innerHTML = "✥ move things"; b.classList.add("mv42"); }, 500);
})();
