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
  window.PIECES_PUBLIC = PIECES;
  const MAGS = [
    {k:"m0", t:"Gazette du Bon Ton", d:"1924, no. 9"}, {k:"m1", t:"Gazette du Bon Ton", d:"1923, no. 5"},
    {k:"m2", t:"Gazette du Bon Ton", d:"1920 · afternoon dresses, Lanvin + Beer"}, {k:"m3", t:"Les Élégances Parisiennes", d:"1918 · the latest creations"},
    {k:"m4", t:"Courrier de la Mode", d:"1869, no. 700"}
  ];
  /* the deep shelf: every source, by pillar. [name, url, what it is, what to dig for, pillar] */
  const SHELF = [
    ["eternal.tv","https://eternal.tv","rare and unusual films","fashion films, runway tapes, the weird stuff between campaigns","film"],
    ["IDEA","https://www.ideanow.online","rare + out-of-print fashion and photo books","books and back issues to cut up for real","fashion"],
    ["print.pm","https://print.pm","spreads from books and magazines","layout, type, how a page breathes","print"],
    ["trendlist","https://trendlist.org","graphic design trends since 2011","the graphic codes to steal or break","print"],
    ["Scanned Fashion World","https://www.scannedfashionworld.com/?m=1","90s + early-2000s editorials and campaigns, scanned","the iconic moments, at the source","fashion"],
    ["ARCHIVE.pdf","https://www.archivepdf.net/scans","fashion magazine + book scans (CDG, Raf Simons, Undercover…)","Japanese street mags, lookbooks","fashion"],
    ["International Library of Fashion Research","https://fashionresearchlibrary.com/","Oslo library of fashion publications + ephemera","invitations, press releases, house catalogues","fashion"],
    ["The Met Costume Institute","https://www.metmuseum.org/about-the-met/collection-areas/the-costume-institute","museum costume collection","garments to cut out (many photos are CC0)","fashion"],
    ["Avant-Garde Archive","https://darkfashionweek.com/data/","1,365 experimental Met costume records, 50 houses","filter by house, era, construction","fashion"],
    ["Europeana Fashion","https://www.europeana.eu/en/collections/topic/55-fashion","European costume archives in one search","sketches, pattern plates, accessories","fashion"],
    ["FIT Fashion History Timeline","https://fashionhistory.fitnyc.edu/","object-by-object essays","silhouettes, materials, technique","fashion"],
    ["Kyoto Costume Institute","https://www.kci.or.jp/en/archives/digital_archives/","digital archive of 20th-century pieces","avant-garde structure notes","fashion"],
    ["firstVIEW","https://www.firstview.com/","runway photography since 1995","unedited looks, backstage detail","fashion"],
    ["Avant-Garde Fashion Atlas","https://rawlooks.com/avant-garde-fashion-world/","275 avant-garde brands + stores, 105 cities, on a map","niche labels and archive shops by city","fashion"],
    ["Vintage Fashion Guild labels","https://vintagefashionguild.org/resources/labels/","label resource","dating a piece by its tag","fashion"],
    ["Rijksmuseum","https://www.rijksmuseum.nl/en/rijksstudio","costume photos (CC0)","where most of the cut-outs here come from","fashion"],
    ["Internet Archive","https://archive.org/","digitised books, mags, audio, video","old periodicals, tailoring manuals, rave zines","print"],
    ["HathiTrust","https://www.hathitrust.org/","digitised library collections","trade publications, early fashion journals","print"],
    ["eclectic library","https://eclectic-library.neocities.org","free books","reading for the captions","books"],
    ["Basenotes: discontinued","https://basenotes.com/tags/discontinued/","fragrance community + database","cult scents, reformulation gossip","scent"],
    ["The Sniff Test: discontinued","https://thesnifftest.co.uk/discontinued-fragrances/","discontinued fragrance index","what's gone and when","scent"],
    ["Fragrantica","https://www.fragrantica.com/","perfume encyclopedia","notes, perfumers, launch years","scent"],
    ["Osmothèque","https://www.osmotheque.fr/","perfume conservatory, Versailles","lost formulas, smelled in person","scent"],
    ["The Makeup Archive","https://makeuparchive.org/","Erin Parsons' online makeup museum, 1,500+ objects","compacts, lipsticks, packaging as design","beauty"],
    ["Makeup Museum: 1990s","https://makeupmuseum.org/category/1990s/","online makeup museum, est. 2008","90s drugstore icons, food-scented everything","beauty"],
    ["Klimt02","https://klimt02.net/","contemporary + studio jewellery database","odd materials: resin, rubber, found objects","jewellery"],
    ["TruFaux Jewels","https://www.trufauxjewels.com/","costume jewellery reference","marks, makers, dating","jewellery"],
    ["Every Noise at Once","https://everynoise.com/","6,000+ genres on one map (frozen since Dec 2023)","microgenres to name a vibe","music"],
    ["RYM genres","https://rateyourmusic.com/genres/","crowd-built genre tree","scene genealogies","music"],
    ["Discogs","https://www.discogs.com/","record database","sleeve art, labels, pressings","music"],
    ["Subculture Archives","https://subculturearchives.com/","Museum of Youth Culture: 15,000+ flyers + zines","rave, punk, mods, goths, the UK century of scenes","music"],
    ["RAPMM","https://rapmm.rilm.org/","popular music magazines, front to back","indie mags, fanzines","music"],
    ["DC Punk Archive","https://dclibrary.org/PUNK","zines, fliers, posters from DC punk, 1976 on","xerox texture, hand-cut type","music"],
    ["Queer Zine Archive Project","https://www.qzap.org/","queer zines, digitised","DIY layouts, scene reports","music"],
    ["UCSB Cylinder Audio Archive","https://cylinders.library.ucsb.edu","10,000+ wax cylinders, 1893 to 1920s, free","the crackle from before radio","music"],
    ["Lost Media Wiki","https://lostmediawiki.com/","lost + found media","unreleased albums, vanished bumpers, dead prototypes","music"],
    ["The Walkman Archive","https://www.walkman-archive.com/","tape Walkman reviews, articles, forum","models, mechanics, rare colourways","objects"],
    ["The Vintage Knob","https://www.thevintageknob.org/","online museum of vintage hi-fi","knobs, meters, metal","objects"],
    ["Sony Design: Walkman","https://www.sony.com/en/SonyInfo/design/bside/01_throwback_walkman/","Sony's own Walkman design history","translucent shells, bean shapes","objects"],
    ["World Radio History","https://www.worldradiohistory.com/Archive-All-Audio/Audio_Collection.htm","scanned audio + radio catalogues","hi-fi ads, spec sheets","objects"],
    ["Mobile Phone Museum","https://www.mobilephonemuseum.com/","thousands of phones, catalogued","sliders, swivels, keypads","objects"],
    ["RetroPhones","https://www.retrophones.co/archive/","2000s phone design archive, by era + shape","the flip-phone family tree","objects"],
    ["Museum of Failed Products","https://themindlab.co.uk/blog/museum-of-failed-products/","products that flopped","the gloriously wrong","objects"],
    ["Click Americana: discontinued","https://clickamericana.com/tag/discontinued-products","vintage ads + lost products","snacks, packaging, gadgets","objects"],
    ["1stDibs","https://www.1stdibs.com/","design marketplace","search 'Space Age', 'Memphis', '1970s Italian'","objects"],
    ["Pamono","https://www.pamono.com/","vintage design marketplace","lamps and tables with provenance","objects"],
    ["CARI","https://cari.institute/","Consumer Aesthetics Research Institute","named aesthetics: Frutiger Aero, Gen-X Soft Club, Y2K…","print"],
    ["Letterform Archive: the 90s","https://letterformarchive.org/news/design-in-the-90s/","90s graphic design","packaging, early digital type","print"],
    ["Design Reviewed","https://designreviewed.com/random-artefacts-from-the-archive/","graphic design history artefacts","magazines, covers, posters","print"],
    ["archives.design","https://archives.design/","graphic design items on the Internet Archive","manuals, specimens, keepsakes","print"],
    ["Reading Design","https://www.readingdesign.org/","cross-indexed design essays","Superstudio, the Situationists, brutalism","books"],
    ["Monoskop","https://monoskop.org/","avant-garde + media theory wiki and library","manifestos, out-of-print PDFs","books"],
    ["UbuWeb","https://www.ubu.com/","avant-garde film, sound, text","sound poetry, early video art","books"],
    ["Open Library","https://openlibrary.org/","borrowable books","old design manuals, monographs","books"],
    ["MoMA: Radical Architecture","https://www.moma.org/collection/terms/radical-architecture","Archizoom, Superstudio, Alchimia","the 60s–70s Italian anti-design","space"],
    ["The Radical Project","https://www.theradicalproject.com/","architecture, interiors, design platform","experimental rooms","space"],
    ["Hidden Architecture","https://www.hiddenarchitecture.net/","forgotten + unbuilt buildings","plans, axonometrics","space"],
    ["Socks Studio","https://socks-studio.com/","essays on architecture's strange corners","utopias, drawings","space"],
    ["Are.na","https://www.are.na/","visual research boards","collect first, then file here","space"]
  ];
  const PILLARS = {all:"everything", fashion:"fashion", print:"print + graphics", scent:"scent", beauty:"makeup", jewellery:"jewellery", music:"music + subculture", objects:"objects + tech", books:"books + theory", space:"architecture + rooms", film:"film"};

  /* lost & found: the database. scores are GoMsn's opinion, years are facts */
  const SENSES = ["translucent","chrome","frosted","powdery","clicky","crackly","glossy","velvet","pixelated","leather"];
  const FOUND = [
    {id:"msn", n:"MSN Messenger", cat:"internet", born:"1999", gone:"2013", maker:"Microsoft", s:["pixelated","clicky"], rev:5, obs:1, l:["geo","vine","ipod"], note:"closed worldwide in 2013 and folded into Skype. this whole site is its ghost."},
    {id:"geo", n:"GeoCities", cat:"internet", born:"1994", gone:"2009", maker:"Yahoo! (bought 1999)", s:["pixelated","glossy"], rev:4, obs:2, l:["msn","myspace"], note:"neighbourhoods of home pages, under-construction gifs, guestbooks."},
    {id:"myspace", n:"Myspace's lost music", cat:"music", born:"2003", gone:"2019", maker:"Myspace", s:["pixelated","crackly"], rev:5, obs:3, l:["geo","every"], note:"in 2019 Myspace admitted a server move lost the music uploaded from 2003 to 2015."},
    {id:"every", n:"Every Noise at Once", cat:"music", born:"2013", gone:"frozen Dec 2023", maker:"Glenn McDonald", s:["pixelated"], rev:5, obs:3, l:["hyper","myspace"], note:"a map of 6,000+ genres. it stopped updating when its maker was laid off from Spotify."},
    {id:"hyper", n:"'hyperpop' as a genre name", cat:"music", born:"2018", gone:"still here", maker:"Every Noise at Once", s:["glossy","chrome"], rev:3, obs:2, l:["every"], note:"entered as a genre tag in 2018; a playlist then carried it into the mainstream."},
    {id:"vine", n:"Vine", cat:"internet", born:"2013", gone:"2017", maker:"Twitter", s:["pixelated"], rev:5, obs:1, l:["msn"], note:"six seconds, looped. the grammar of every video app since."},
    {id:"md", n:"Sony MiniDisc", cat:"objects", born:"1992", gone:"players ended 2013", maker:"Sony", s:["translucent","clicky"], rev:4, obs:3, l:["zune","ipod","crystal"], note:"a tiny disc in a hard shell you could record onto. pure Y2K."},
    {id:"zune", n:"Zune", cat:"objects", born:"2006", gone:"2011", maker:"Microsoft", s:["glossy","clicky"], rev:3, obs:3, l:["ipod","md"], note:"the brown one. it squirted songs to other Zunes, wirelessly, in 2006."},
    {id:"ipod", n:"iPod classic", cat:"objects", born:"2001", gone:"2014", maker:"Apple", s:["chrome","clicky"], rev:4, obs:1, l:["zune","md","msn"], note:"the click wheel. a whole collection in your pocket, no signal needed."},
    {id:"3310", n:"Nokia 3310", cat:"objects", born:"2000", gone:"came back 2017", maker:"Nokia", s:["clicky"], rev:4, obs:1, l:["md"], note:"Snake II, swappable covers, unkillable. Nokia brought it back in 2017."},
    {id:"pola", n:"Polaroid instant film", cat:"objects", born:"1972 (SX-70)", gone:"2008, revived", maker:"Polaroid", s:["glossy","powdery"], rev:4, obs:2, l:["koda"], note:"Polaroid stopped making film in 2008. the Impossible Project restarted it."},
    {id:"koda", n:"Kodachrome", cat:"objects", born:"1935", gone:"2009", maker:"Kodak", s:["glossy"], rev:5, obs:2, l:["pola"], note:"the red-gold film of the 20th century. Kodak ended it in 2009."},
    {id:"crystal", n:"Crystal Pepsi", cat:"objects", born:"1992", gone:"1993, brief return 2016", maker:"Pepsi", s:["translucent"], rev:3, obs:2, l:["md"], note:"the clear craze in a bottle: clear cola, clear soap, clear phones."},
    {id:"saddle", n:"Dior Saddle bag", cat:"fashion", born:"1999", gone:"back 2018", maker:"John Galliano for Dior", s:["leather"], rev:5, obs:1, l:["baguette","m7"], note:"it left, it came back. Maria Grazia Chiuri revived it in 2018."},
    {id:"baguette", n:"Fendi Baguette", cat:"fashion", born:"1997", gone:"back 2019", maker:"Silvia Venturini Fendi", s:["leather","velvet"], rev:5, obs:1, l:["saddle"], note:"the first 'it bag', carried under the arm like bread."},
    {id:"m7", n:"YSL M7 (original)", cat:"scent", born:"2002", gone:"reworked 2011", maker:"Tom Ford for YSL", s:["powdery","leather"], rev:4, obs:3, l:["saddle"], note:"an oud for the mainstream, years early. reworked as M7 Oud Absolu."},
    {id:"tabi", n:"Margiela Tabi boot", cat:"fashion", born:"1988", gone:"still here", maker:"Martin Margiela", s:["leather"], rev:5, obs:1, l:["saddle"], note:"split-toe, from the Japanese tabi sock. never really left."},
    {id:"tama", n:"Tamagotchi", cat:"objects", born:"1996", gone:"still here", maker:"Bandai", s:["clicky","pixelated","translucent"], rev:5, obs:1, l:["3310","msn"], note:"a pet in an egg. there's one living on this site."}
  ];
  XS.finds = XS.finds || [];
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
    <div class="sptabs"><button class="on" data-spt="all">the archive</button><button data-spt="table">✂ the collage table</button></div>
    <div id="spBody"></div></div></div>`);
  const OV = $("#specov"); let tab = "cards", sel = -1, shelfP = "all", shelfQ = "", foundS = "", foundSort = "born";

  function paintOld(){
    document.querySelectorAll("[data-spt]").forEach(b => b.classList.toggle("on", b.dataset.spt === tab));
    const B = $("#spBody");
    if (tab === "cards") {
      B.innerHTML = `<div class="sptools"><button class="xp" data-spnew>✦ cut a new specimen</button><button class="xp" data-spall>↻ reshuffle the whole drawer</button><span class="sphint">tap a card to read it. every piece is a real archive object.</span></div><div class="spgrid">${XS.specs.map(card).join("")}</div>`;
    } else if (tab === "mags") {
      B.innerHTML = `<p class="sphint">real fashion magazines, old enough to be public domain. drag them onto the collage table.</p><div class="spmags">${MAGS.map(m => `<figure class="spmag"><img src="${SPIMG[m.k]}" alt=""><figcaption><b>${esc(m.t)}</b><br>${esc(m.d)}</figcaption><button class="xp" data-spadd="${m.k}">＋ to the table</button></figure>`).join("")}</div><p class="sphint">Rijksmuseum, Amsterdam · public domain via Wikimedia Commons.</p>`;
    } else if (tab === "shelf") {
      const q = (shelfQ || "").toLowerCase(), list = SHELF.filter(r => (shelfP === "all" || r[4] === shelfP) && (!q || r.join(" ").toLowerCase().includes(q)));
      B.innerHTML = `<div class="sptools"><input class="xp spq" id="spQ" placeholder="search ${SHELF.length} sources…" value="${esc(shelfQ || "")}"></div><div class="spchips">${Object.entries(PILLARS).map(([k, v]) => `<button class="${k === shelfP ? "on" : ""}" data-spp="${k}">${v}</button>`).join("")}</div><p class="sphint">where the archive digs. scans and spreads belong to their photographers and magazines, so they open at the source. the cut-outs here are museum photos that are free to use.</p><div class="spshelf">${list.map(([n, u, w, why, pl]) => `<a class="spres" href="${u}" target="_blank" rel="noopener"><small>${esc(PILLARS[pl])}</small><b>${esc(n)}</b><span>${esc(w)}</span><i>${esc(why)}</i></a>`).join("") || `<p class="sphint">nothing on that shelf. try another word.</p>`}</div>`;
      const qi = $("#spQ"); qi.oninput = () => { shelfQ = qi.value; if (shelfQ) shelfP = "all"; const pos = qi.selectionStart; paint(); const n = $("#spQ"); n.focus(); n.setSelectionRange(pos, pos); };
    } else if (tab === "found") {
      const all = FOUND.concat(XS.finds), sf = foundS;
      const list = all.filter(f => !sf || (f.s || []).includes(sf)).sort((x, y) => foundSort === "rev" ? y.rev - x.rev : foundSort === "obs" ? y.obs - x.obs : String(x.born).localeCompare(String(y.born)));
      const dots = (v, c) => `<span class="spdots">${[1,2,3,4,5].map(i => `<i class="${i <= v ? "on" : ""}" style="--c:${c}"></i>`).join("")}</span>`;
      B.innerHTML = `<p class="sphint">the database of things that left, came back, or never should have gone. every entry shares the same fields so they can link to each other. years are facts; the scores are GoMsn's opinion.</p>
        <div class="sptools"><span class="sphint">sort:</span>${[["born","by year"],["rev","bring it back"],["obs","most obscure"]].map(([k, v]) => `<button class="xp ${foundSort === k ? "on" : ""}" data-fsort="${k}">${v}</button>`).join("")}<span class="spsep"></span><button class="xp" data-fadd>＋ file a find</button><button class="xp" data-fexp>⤓ export as JSON</button></div>
        <div class="spchips"><button class="${!sf ? "on" : ""}" data-fs="">every texture</button>${SENSES.map(x => `<button class="${sf === x ? "on" : ""}" data-fs="${x}">${x}</button>`).join("")}</div>
        <div class="spfound">${list.map(f => `<article class="spf" id="f_${esc(f.id)}"><header><b>${esc(f.n)}</b><span>${esc(f.cat)}</span></header><div class="spfy">${esc(f.born)} → ${esc(f.gone)}</div><p>${esc(f.note || "")}</p><div class="spfm">${esc(f.maker || "")}</div><div class="spfs">${(f.s || []).map(x => `<em data-fs="${esc(x)}">${esc(x)}</em>`).join("")}</div><div class="spfsc"><span>bring it back ${dots(f.rev, "var(--pink,#ff3dd4)")}</span><span>obscurity ${dots(f.obs, "#111")}</span></div>${(f.l || []).length ? `<div class="spfl">↳ ${(f.l || []).map(id => { const t = all.find(x => x.id === id); return t ? `<a href="#" data-fjump="${esc(id)}">${esc(t.n)}</a>` : ""; }).join(" · ")}</div>` : ""}${f.mine ? `<button class="spfdel" data-fdel="${esc(f.id)}">remove</button>` : ""}</article>`).join("")}</div>`;
    } else paintTable();
  }

  function detail(i){
    const s = XS.specs[i], p = PI(s.g), pl = PL(s.n);
    $("#spBody").insertAdjacentHTML("beforeend", `<div class="spdet" data-spdet><div class="spdetin">${card(s, i)}<div class="spdettx"><small>specimen no. ${String(i + 1).padStart(3, "0")}</small><h3>${esc(p.house)}</h3><p class="spw">${esc(p.what)} · ${esc(p.when)} · ${esc(p.city)}</p><p class="spm">${esc(p.moment)}</p><p class="spc">garment: ${esc(p.credit)}<br>plate: ${pl.k === "n8" ? "Maria Sibylla Merian, Metamorphosis insectorum Surinamensium, 1705" : "Ernst Haeckel, Kunstformen der Natur, 1904"} (${esc(pl.en)}), public domain</p>
      <div class="spbtns"><button class="xp" data-spre="${i}">✂ re-cut on another plate</button><button class="xp" data-sptotable="${i}">＋ to the collage table</button><button class="xp" data-sppocket="${i}">pocket it</button><button class="xp" data-spx>close</button></div></div></div></div>`);
  }

  /* ---------- collage table ---------- */
  let srcOf = it => it.own || SPIMG[it.k];
  const jag = () => { const pts = [], n = 22; for (let j = 0; j < n; j++) { const a = j / n * Math.PI * 2; const r = 46 + Math.random() * 5; pts.push([50 + Math.cos(a) * r * 1.06, 50 + Math.sin(a) * r * 1.06]); } return pts.map(([x, y]) => [Math.max(0, Math.min(100, x)).toFixed(1), Math.max(0, Math.min(100, y)).toFixed(1)]); };
  function addPiece(k, own){ const isCut = /^g/.test(k || ""); XS.collage.push({k, own: own || null, x: rnd(.15, .6), y: rnd(.1, .45), w: isCut ? 150 : 200, r: +rnd(-8, 8).toFixed(1), jag: null}); if (XS.collage.length > 24) XS.collage.shift(); save(); }
  let paintTable = function(){
    const B = $("#spBody");
    B.innerHTML = `<div class="sptools"><button class="xp" data-tadd="g">＋ a garment</button><button class="xp" data-tadd="n">＋ a nature plate</button><button class="xp" data-tadd="m">＋ a magazine page</button><label class="xp spup">＋ my own scan<input type="file" accept="image/*" id="spUp" hidden></label><button class="xp" data-tgen>✦ make one for me</button><span class="spsep"></span><button class="xp" data-tsel="cut">✂ scissor edge</button><button class="xp" data-tsel="big">＋</button><button class="xp" data-tsel="small">－</button><button class="xp" data-tsel="rot">↻</button><button class="xp" data-tsel="top">to front</button><button class="xp" data-tsel="del">remove</button><span class="spsep"></span><button class="xp" data-tclear>clear</button><button class="xp" data-tsave>⤓ save as image</button></div>
      <div class="sptable" id="spT"></div><p class="sphint">drag pieces, tap one to select it. your own scans stay on this device. tip: scan your magazine cut-outs and drop them here.</p>`;
    const T = $("#spT");
    XS.collage.forEach((it, i) => { const d = document.createElement("div"); d.className = "sppiece" + (i === sel ? " sel" : "") + (/^g/.test(it.k || "") ? " cut" : ""); d.dataset.pi = i; d.style.cssText = `left:${it.x * 100}%;top:${it.y * 100}%;width:${it.w}px;transform:rotate(${it.r}deg);z-index:${i + 1}`; d.innerHTML = `<img src="${srcOf(it)}" alt="" draggable="false" style="${it.jag ? `clip-path:polygon(${it.jag.map(p => p[0] + "% " + p[1] + "%").join(",")})` : ""}">`; T.appendChild(d); });
    $("#spUp").onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"), k = 520 / Math.max(im.width, im.height); c.width = im.width * Math.min(1, k); c.height = im.height * Math.min(1, k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); const own = c.toDataURL(f.type === "image/png" ? "image/png" : "image/jpeg", .82); addPiece("own", own); if (XS.collage.filter(x => x.own).length > 4) { const j = XS.collage.findIndex(x => x.own); XS.collage.splice(j, 1); } paintTable(); }; im.src = r.result; }; r.readAsDataURL(f); };
    T.onpointerdown = e => { const d = e.target.closest(".sppiece"); if (!d) { sel = -1; T.querySelectorAll(".sel").forEach(x => x.classList.remove("sel")); return; } const i = +d.dataset.pi, it = XS.collage[i]; sel = i; T.querySelectorAll(".sel").forEach(x => x.classList.remove("sel")); d.classList.add("sel"); const R = T.getBoundingClientRect(), ox = e.clientX - (it.x * R.width), oy = e.clientY - (it.y * R.height); try { d.setPointerCapture(e.pointerId); } catch(_) {} const mv = ev => { it.x = Math.max(-.2, Math.min(.95, (ev.clientX - ox) / R.width)); it.y = Math.max(-.2, Math.min(.95, (ev.clientY - oy) / R.height)); d.style.left = it.x * 100 + "%"; d.style.top = it.y * 100 + "%"; }; const up = () => { d.removeEventListener("pointermove", mv); d.removeEventListener("pointerup", up); save(); }; d.addEventListener("pointermove", mv); d.addEventListener("pointerup", up); e.preventDefault(); };
  }
  let autoCollage = function(){ XS.collage = []; const pl = pk(PLATES), m = pk(MAGS); XS.collage.push({k: pl.k, x: .08, y: .04, w: 300, r: -2, jag: null}); XS.collage.push({k: m.k, x: .55, y: .08, w: 190, r: 5, jag: jag()}); [...PIECES].sort(() => Math.random() - .5).slice(0, 3).forEach((p, i) => XS.collage.push({k: p.k, x: .12 + i * .22, y: .18 + (i % 2) * .12, w: 150 + Math.random() * 40, r: +rnd(-7, 7).toFixed(1), jag: null})); save(); }
  let saveImg = async function(){
    const T = $("#spT"), R = T.getBoundingClientRect(), c = document.createElement("canvas"), k = 2; c.width = R.width * k; c.height = R.height * k; const x = c.getContext("2d"); x.scale(k, k); x.fillStyle = "#f5efe1"; x.fillRect(0, 0, R.width, R.height);
    for (const it of XS.collage) { const im = await new Promise(ok => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = srcOf(it); }); if (!im) continue; const w = it.w, h = w * im.height / im.width; x.save(); x.translate(it.x * R.width + w / 2, it.y * R.height + h / 2); x.rotate(it.r * Math.PI / 180); if (/^g/.test(it.k || "")) { x.shadowColor = "rgba(0,0,0,.35)"; x.shadowBlur = 6; x.shadowOffsetY = 3; } if (it.jag) { x.beginPath(); it.jag.forEach(([px, py], j) => { const X = -w / 2 + px / 100 * w, Y = -h / 2 + py / 100 * h; j ? x.lineTo(X, Y) : x.moveTo(X, Y); }); x.closePath(); x.clip(); } x.drawImage(im, -w / 2, -h / 2, w, h); x.restore(); }
    c.toBlob(async b => { let dl = null; try { dl = await window.claude.use("downloads"); } catch(_) {} if (dl) { try { await dl.save({filename: "gomsn-collage.png", data: b}); toast("saved. it's yours."); return; } catch(_) {} } const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "gomsn-collage.png"; document.body.appendChild(a); a.click(); a.remove(); toast("saved. it's yours."); }, "image/png");
  }

  OV.addEventListener("click", e => {
    const t = e.target;
    if (t.closest("[data-spclose]") || t === OV) { OV.classList.remove("open"); return; }
    const pp = t.closest("[data-spp]"); if (pp) { shelfP = pp.dataset.spp; paint(); return; }
    const fs = t.closest("[data-fs]"); if (fs) { foundS = fs.dataset.fs; paint(); return; }
    const fso = t.closest("[data-fsort]"); if (fso) { foundSort = fso.dataset.fsort; paint(); return; }
    const fj = t.closest("[data-fjump]"); if (fj) { e.preventDefault(); foundS = ""; paint(); const el = document.getElementById("f_" + fj.dataset.fjump); if (el) { el.scrollIntoView({behavior: "smooth", block: "center"}); el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1400); } return; }
    const fd = t.closest("[data-fdel]"); if (fd) { XS.finds = XS.finds.filter(f => f.id !== fd.dataset.fdel); save(); paint(); return; }
    if (t.closest("[data-fadd]")) { fileFind(); return; }
    if (t.closest("[data-fexp]")) { exportFinds(); return; }
    const tb = t.closest("[data-spt]"); if (tb) { tab = tb.dataset.spt; sel = -1; paint(); return; }
    if (t.closest("[data-spnew]")) { XS.specs.unshift(newSpec()); XS.specs = XS.specs.slice(0, 30); save(); paint(); try { tone([[880,.04],[1320,.06]], "square", .03); } catch(_) {} return; }
    if (t.closest("[data-spall]")) { XS.specs = XS.specs.map(s => Object.assign(newSpec(s.g))); save(); paint(); return; }
    if (t.closest("[data-spx]") || t.matches("[data-spdet]")) { const d = $("[data-spdet]"); if (d) d.remove(); return; }
    const re = t.closest("[data-spre]"); if (re) { const i = +re.dataset.spre; XS.specs[i] = newSpec(XS.specs[i].g); save(); paint(); detail(i); return; }
    const tt = t.closest("[data-sptotable]"); if (tt) { const s = XS.specs[+tt.dataset.sptotable]; addPiece(s.n); XS.collage[XS.collage.length - 1].w = 280; addPiece(s.g); tab = "table"; paint(); return; }
    const po = t.closest("[data-sppocket]"); if (po) { const p = PI(XS.specs[+po.dataset.sppocket].g); try { collect({t: `${p.what}`, y: p.when, by: p.house, k: "object", src: "the specimen archive", img: SPIMG[p.k], line: p.moment, credit: p.credit}); } catch(_) {} return; }
    const sc = t.closest(".spgrid .spcard"); if (sc) { detail(+sc.dataset.spi); return; }
    const ad = t.closest("[data-spadd]"); if (ad) { addPiece(ad.dataset.spadd); tab = "table"; paint(); return; }
    const ta = t.closest("[data-tadd]"); if (ta) { const pool = ta.dataset.tadd === "g" ? PIECES : ta.dataset.tadd === "n" ? PLATES : MAGS; addPiece(pk(pool).k); paintTable(); return; }
    if (t.closest("[data-tgen]")) { autoCollage(); sel = -1; paintTable(); return; }
    if (t.closest("[data-tclear]")) { XS.collage = []; sel = -1; save(); paintTable(); return; }
    if (t.closest("[data-tsave]")) { saveImg(); return; }
    const ts = t.closest("[data-tsel]"); if (ts) { if (sel < 0 || !XS.collage[sel]) { toast("tap a piece first."); return; } const it = XS.collage[sel], a = ts.dataset.tsel; if (a === "cut") it.jag = it.jag ? null : jag(); if (a === "big") it.w = Math.min(520, it.w * 1.15); if (a === "small") it.w = Math.max(50, it.w / 1.15); if (a === "rot") it.r = (it.r + 12) % 360; if (a === "top") { XS.collage.push(XS.collage.splice(sel, 1)[0]); sel = XS.collage.length - 1; } if (a === "del") { XS.collage.splice(sel, 1); sel = -1; } save(); paintTable(); return; }
  });

  /* ===== the archive, as one image wall ===== */
  XS.creations = XS.creations || [];
  const PLATEFACT = k => k === "n8" ? "Maria Sibylla Merian sailed to Suriname in 1699 to draw insects through their whole life cycle, and published this book in 1705." : "Ernst Haeckel's Kunstformen der Natur came out in sets between 1899 and 1904. Art Nouveau designers borrowed its shapes.";
  const MAGFACT = {m0: "the Gazette du Bon Ton (1912–1925) was Lucien Vogel's Paris fashion magazine, printed with hand-coloured plates by artists.", m1: "the Gazette du Bon Ton had couture houses commission artists instead of photographers. this is its cover.", m2: "afternoon dresses by Jeanne Lanvin and Beer, drawn for the Gazette du Bon Ton in 1920.", m3: "a page from Les Élégances Parisiennes, 1918: Paris kept printing fashion through the war.", m4: "a hand-coloured fashion plate from 1869: how Paris showed clothes before photography took over."};
  const CATS = {all: "everything", fashion: "fashion", objects: "objects", print: "print", nature: "nature", found: "lost & found", mine: "made by you", places: "museums"};
  let acat = "all", aq = "";
  function everything(){
    const out = [];
    XS.specs.forEach((s, i) => { const p = PI(s.g), pl = PL(s.n); if (p && pl) out.push({id: "s" + i, cat: "fashion", spec: i, t: p.what, sub: `${p.house} · ${p.when}`, fact: p.moment, img: SPIMG[p.k], bg: SPIMG[pl.k], credit: p.credit, coll: [pl.k, p.k]}); });
    OBJPHOTOS.forEach((o, i) => out.push({id: "o" + i, cat: "objects", t: o.t, sub: String(o.y || ""), fact: [o.line, o.crit].filter(Boolean).join(" "), img: o.img, credit: o.credit || "Wikimedia Commons", coll: ["o" + i]}));
    MAGS.forEach(m => out.push({id: m.k, cat: "print", t: m.t, sub: m.d, fact: MAGFACT[m.k], img: SPIMG[m.k], credit: "Rijksmuseum · public domain", coll: [m.k]}));
    PLATES.forEach(n => out.push({id: n.k, cat: "nature", t: n.lat, sub: n.en, fact: PLATEFACT(n.k), img: SPIMG[n.k], credit: "public domain via Wikimedia Commons", coll: [n.k]}));
    FOUND.concat(XS.finds).forEach(f => out.push({id: "f_" + f.id, cat: "found", t: f.n, sub: `${f.born} → ${f.gone}`, fact: f.note, found: f}));
    XS.creations.forEach((c, i) => out.push({id: "c" + i, cat: "mine", t: c.t, sub: c.by || "made here", fact: c.line, img: c.img, coll: ["c" + i]}));
    return out;
  }
  const FC = ["#c8141e", "#1638b8", "#f2a01a", "#2f7a3e", "#ff3dd4", "#111"];
  function tile(it, n){
    const num = "#" + String(n + 1).padStart(3, "0");
    if (it.found) { const c = FC[n % FC.length]; return `<button class="ax found" data-ax="${esc(it.id)}" style="--c:${c}"><small>${num}</small><b>${esc(it.t)}</b><em>${esc(it.sub)}</em></button>`; }
    if (it.spec != null) return `<button class="ax spec" data-ax="${esc(it.id)}"><small>${num}</small><span class="axpl" style="background-image:url(${it.bg})"></span><img src="${it.img}" alt="" loading="lazy"><em>${esc(it.t)}</em></button>`;
    return `<button class="ax ${it.cat}" data-ax="${esc(it.id)}"><small>${num}</small><img src="${it.img}" alt="" loading="lazy"><em>${esc(it.t)}</em></button>`;
  }
  const SPINEF = ['"Anton",sans-serif', '"Instrument Serif",serif', '"Space Mono",monospace', '"Space Grotesk",sans-serif', 'Georgia,serif'];
  const SPINEC = [["#c8141e", "#f4ede0"], ["#f4ede0", "#111"], ["#1638b8", "#ffd23f"], ["#111", "#b6ff3b"], ["#ffd23f", "#111"], ["#ff9ec7", "#1638b8"], ["#2f7a3e", "#f4ede0"], ["#e9e0cf", "#c8141e"], ["#7fd8ff", "#111"], ["#f2a01a", "#111"]];
  function spines(list){ if (typeof LIVEWEB !== "undefined" && LIVEWEB) return `<div class="aconn">${list.map(([n, u, w, why, pl]) => `<a class="acc" href="${u}" target="_blank" rel="noopener"><span class="accimg"><img src="https://image.thum.io/get/width/480/crop/760/${u}" alt="" loading="lazy" onerror="this.parentNode.classList.add('none');this.remove()"><em>${esc(n)}</em></span><b>${esc(n)}</b><small>${esc(w)}</small><i>● connected · open ↗</i></a>`).join("")}</div>`; return `<div class="ashelf">${list.map(([n, u, w, why, pl], i) => { const [bg, fg] = SPINEC[i % SPINEC.length]; const h = 78 + (i * 37 % 22); return `<a class="aspine" href="${u}" target="_blank" rel="noopener" style="--bg:${bg};--fg:${fg};height:${h}%;font-family:${SPINEF[i % SPINEF.length]};--w:${34 + (n.length * 7 % 26)}px" title="${esc(w)}"><span>${esc(n)}</span><i>${esc(PILLARS[pl] || "")}</i><div class="aspop"><b>${esc(n)}</b><p>${esc(w)}</p><em>dig for: ${esc(why)}</em><u>open ↗</u></div></a>`; }).join("")}</div>`; }
  function renderAll(){
    const B = $("#spBody"), all = everything(), q = aq.toLowerCase();
    const list = all.filter(it => (acat === "all" || it.cat === acat) && (!q || [it.t, it.sub, it.fact].join(" ").toLowerCase().includes(q)));
    const shelf = SHELF.filter(r => !q || r.join(" ").toLowerCase().includes(q));
    B.innerHTML = `<div class="aspark" id="aSpark"><button class="xp asparkb" data-aspark>✦ spark</button><span>a random fact about a random thing in the archive</span></div>
      <div class="sptools"><input class="xp spq" id="aQ" placeholder="search ${all.length + SHELF.length} things…" value="${esc(aq)}"><span class="spsep"></span><button class="xp" data-fadd>＋ file a find</button><button class="xp" data-amake>＋ add your creation</button><button class="xp" data-fexp>⤓ export</button></div>
      <div class="spchips">${Object.entries(CATS).map(([k, v]) => `<button class="${k === acat ? "on" : ""}" data-acat="${k}">${v}</button>`).join("")}</div>
      ${acat === "places" ? "" : `<div class="aindex"><div class="aihead"><span>INDEX D'OBJETS</span><span>${list.length} pieces</span><span>GoMsn · ${new Date().getFullYear()}</span></div><div class="axgrid">${list.map((it, n) => tile(it, all.indexOf(it))).join("") || `<p class="sphint">nothing here yet.</p>`}</div></div>`}
      ${acat === "all" || acat === "places" ? `<div class="aindex"><div class="aihead"><span>THE MUSEUMS</span><span>${shelf.length} archives to dig in · hover a spine</span><span>they open at the source</span></div>${spines(shelf)}</div>` : ""}`;
    const qi = $("#aQ"); qi.oninput = () => { aq = qi.value; const pos = qi.selectionStart; renderAll(); const n = $("#aQ"); n.focus(); n.setSelectionRange(pos, pos); };
  }
  function showItem(it){
    if (it.spec != null) return detail(it.spec);
    const f = it.found;
    $("#spBody").insertAdjacentHTML("beforeend", `<div class="spdet" data-spdet><div class="spdetin axdet">${f ? `<div class="axbig found" style="--c:${FC[0]}"><b>${esc(f.n)}</b><em>${esc(f.born)} → ${esc(f.gone)}</em><div class="spfs">${(f.s || []).map(x => `<em>${esc(x)}</em>`).join("")}</div></div>` : `<img class="axbig" src="${it.img}" alt="">`}
      <div class="spdettx"><small>${esc(CATS[it.cat] || "")}</small><h3>${esc(it.t)}</h3><p class="spw">${esc(it.sub || "")}</p><p class="spm">${esc(it.fact || "")}</p>${it.credit ? `<p class="spc">${esc(it.credit)}</p>` : ""}${f && f.maker ? `<p class="spc">${esc(f.maker)}</p>` : ""}
      <div class="spbtns">${it.coll ? `<button class="xp" data-acoll="${esc(it.id)}">＋ to the collage table</button>` : ""}<button class="xp" data-apock="${esc(it.id)}">🎒 pocket</button><button class="xp" data-aspark>✦ another spark</button><button class="xp" data-spx>close</button></div></div></div></div>`);
  }
  function sparkIt(){ const all = everything().filter(i => i.fact); const it = all[Math.floor(Math.random() * all.length)]; const old = $("[data-spdet]"); if (old) old.remove(); showItem(it); try { tone([[988,.04],[1319,.08]], "sine", .03); } catch(_) {} }
  function makeCreation(){
    $("#spBody").insertAdjacentHTML("beforeend", `<div class="spdet" data-spdet><form class="spdetin spform" id="aMk"><div><small>add your creation</small><h3>something you made, or imagined</h3>
      <label>a picture of it<input type="file" accept="image/*" name="img" required></label><label>what is it<input class="xp" name="t" required maxlength="60"></label><label>who made it<input class="xp" name="by" maxlength="40" placeholder="you, or a friend"></label></div><div>
      <label>the story<textarea class="xp" name="line" rows="4" maxlength="240" placeholder="where it came from, what it's for, why it should exist"></textarea></label>
      <p class="sphint">it goes into the archive, the collage table and the museum. it stays on this device.</p><div class="spbtns"><button class="xp" type="submit">add it</button><button class="xp" type="button" data-spx>cancel</button></div></div></form></div>`);
    $("#aMk").onsubmit = ev => { ev.preventDefault(); const fd = new FormData(ev.target), f = fd.get("img"); const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"), k = Math.min(1, 640 / Math.max(im.width, im.height)); c.width = im.width * k; c.height = im.height * k; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      XS.creations.unshift({t: fd.get("t"), by: fd.get("by"), line: fd.get("line"), img: c.toDataURL("image/jpeg", .8), ts: Date.now()}); XS.creations = XS.creations.slice(0, 12); try { xsave(); } catch(_) { XS.creations.pop(); toast("that's a big picture. try a smaller one."); } acat = "mine"; paint(); try { window.syncCreations && window.syncCreations(); award(3); } catch(_) {} toast("it's in the archive now."); }; im.src = r.result; }; r.readAsDataURL(f); };
  }
  window.openCreation = () => { window.openSpecimens(); makeCreation(); };

  /* ===== the collage table, with everything ===== */
  const HIC = {};
  function cutCanvas(im){ const H = Math.min(1100, im.height), W = Math.round(im.width * H / im.height), cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d"); x.drawImage(im, 0, 0, W, H); const d = x.getImageData(0, 0, W, H), p = d.data, seen = new Uint8Array(W * H), st = [], from = new Int32Array(W * H).fill(-1);
    for (let i = 0; i < W; i++) st.push(i, (H - 1) * W + i); for (let j = 0; j < H; j++) st.push(j * W, j * W + W - 1);
    while (st.length) { const k = st.pop(); if (seen[k]) continue; seen[k] = 1; const q = k * 4, f = from[k]; if (f >= 0) { const fq = f * 4; if (Math.abs(p[q] - p[fq]) + Math.abs(p[q + 1] - p[fq + 1]) + Math.abs(p[q + 2] - p[fq + 2]) > 8) { seen[k] = 2; continue; } } p[q + 3] = 0; const xx = k % W, yy = (k / W) | 0; if (xx > 0 && !seen[k - 1]) { from[k - 1] = k; st.push(k - 1); } if (xx < W - 1 && !seen[k + 1]) { from[k + 1] = k; st.push(k + 1); } if (yy > 0 && !seen[k - W]) { from[k - W] = k; st.push(k - W); } if (yy < H - 1 && !seen[k + W]) { from[k + W] = k; st.push(k + W); } }
    x.putImageData(d, 0, 0); return cv.toDataURL("image/webp", .9); }
  function hiFile(k){ if (!k) return null; if (HIFILE[k]) return HIFILE[k]; if (/^o\d+$/.test(k)) { const o = OBJFILES[+k.slice(1)]; return o && o[1]; } if (k === "david") return DAVID.t; return null; }
  function upgrade(it, img){ if (!HIRES_OK) return; const f = hiFile(it.k); if (!f) return; const key = it.k; if (HIC[key]) { if (img) img.src = HIC[key]; return; }
    const im = new Image(); im.crossOrigin = "anonymous"; im.onload = () => { try { HIC[key] = /^g\d/.test(key) ? cutCanvas(im) : im.src; } catch(_) { HIC[key] = im.src; } if (img) img.src = HIC[key]; }; im.src = hiFile(key) && hiURL(f, /^g\d/.test(key) ? 1100 : 1600); }
  srcOf = it => HIC[it.k] || it.own || (/^o\d+$/.test(it.k || "") ? OBJPHOTOS[+it.k.slice(1)].img : /^c\d+$/.test(it.k || "") ? (XS.creations[+it.k.slice(1)] || {}).img : it.k === "david" ? DAVID.img : it.k === "ghost" ? Z12.ghost : SPIMG[it.k]);
  const isCut = k => /^g\d/.test(k || "") || k === "ghost";
  const TRAYC = {all: "everything", g: "garments", o: "objects", n: "nature", m: "magazines", x: "the rest"};
  let tcat = "all";
  function trayItems(){ const t = []; PIECES.forEach(p => t.push({k: p.k, c: "g", n: p.what})); OBJPHOTOS.forEach((o, i) => t.push({k: "o" + i, c: "o", n: o.t})); PLATES.forEach(p => t.push({k: p.k, c: "n", n: p.lat})); MAGS.forEach(m => t.push({k: m.k, c: "m", n: m.t})); t.push({k: "david", c: "x", n: "David"}, {k: "ghost", c: "x", n: "the ghost"}); XS.creations.forEach((c, i) => t.push({k: "c" + i, c: "x", n: c.t})); return t; }
  function addK(k){ const cut = isCut(k), w = cut ? 180 : /^n|^m/.test(k) ? 300 : 220; XS.collage.push({k, x: rnd(.08, .55), y: rnd(.05, .4), w, r: +rnd(-8, 8).toFixed(1), jag: null}); if (XS.collage.length > 30) XS.collage.shift(); save(); }
  paintTable = function(){
    const B = $("#spBody");
    B.innerHTML = `<div class="ctwrap"><aside class="cttray"><div class="spchips">${Object.entries(TRAYC).map(([k, v]) => `<button class="${k === tcat ? "on" : ""}" data-tcat="${k}">${v}</button>`).join("")}</div>
      <div class="ctthumbs">${trayItems().filter(i => tcat === "all" || i.c === tcat).map(i => `<button class="ctth ${isCut(i.k) ? "cut" : ""}" data-tk="${esc(i.k)}" title="${esc(i.n)}"><img src="${srcOf({k: i.k})}" alt="" loading="lazy"></button>`).join("")}</div>
      <label class="xp spup">＋ my own scan<input type="file" accept="image/*" id="spUp" hidden></label><p class="sphint">${HIRES_OK ? "pieces load in high resolution from Wikimedia once they're on the table." : "on the netlify site, pieces load in high resolution."}</p></aside>
      <div class="ctmain"><div class="sptools"><button class="xp" data-tgen>✦ make one for me</button><span class="spsep"></span><button class="xp" data-tsel="cut">✂ scissor edge</button><button class="xp" data-tsel="big">＋</button><button class="xp" data-tsel="small">－</button><button class="xp" data-tsel="rot">↻</button><button class="xp" data-tsel="flip">⇋</button><button class="xp" data-tsel="top">to front</button><button class="xp" data-tsel="del">remove</button><span class="spsep"></span><button class="xp" data-tbg>paper</button><button class="xp" data-tclear>clear</button><button class="xp" data-tsave>⤓ save as image</button></div>
      <div class="sptable bg${XS.tbg || 0}" id="spT"></div><p class="sphint">drag to move · tap to select · scroll on a piece to resize · your scans stay on this device</p></div></div>`;
    const T = $("#spT");
    XS.collage.forEach((it, i) => { const d = document.createElement("div"); d.className = "sppiece" + (i === sel ? " sel" : "") + (isCut(it.k) ? " cut" : ""); d.dataset.pi = i; d.style.cssText = `left:${it.x * 100}%;top:${it.y * 100}%;width:${it.w}px;transform:rotate(${it.r}deg) scaleX(${it.fl ? -1 : 1});z-index:${i + 1}`; d.innerHTML = `<img src="${srcOf(it)}" alt="" draggable="false" style="${it.jag ? `clip-path:polygon(${it.jag.map(p => p[0] + "% " + p[1] + "%").join(",")})` : ""}">`; T.appendChild(d); upgrade(it, d.querySelector("img")); });
    $("#spUp").onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"), k = Math.min(1, 900 / Math.max(im.width, im.height)); c.width = im.width * k; c.height = im.height * k; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); XS.collage.push({k: "own", own: c.toDataURL(f.type === "image/png" ? "image/png" : "image/jpeg", .85), x: .3, y: .2, w: 260, r: 0, jag: null}); if (XS.collage.filter(x => x.own).length > 4) { const j = XS.collage.findIndex(x => x.own); XS.collage.splice(j, 1); } save(); paintTable(); }; im.src = r.result; }; r.readAsDataURL(f); };
    T.onwheel = e => { const d = e.target.closest(".sppiece"); if (!d) return; e.preventDefault(); const it = XS.collage[+d.dataset.pi]; it.w = Math.max(40, Math.min(900, it.w * (e.deltaY < 0 ? 1.06 : .94))); d.style.width = it.w + "px"; clearTimeout(T._t); T._t = setTimeout(save, 300); };
    T.onpointerdown = e => { const d = e.target.closest(".sppiece"); if (!d) { sel = -1; T.querySelectorAll(".sel").forEach(x => x.classList.remove("sel")); return; } const i = +d.dataset.pi, it = XS.collage[i]; sel = i; T.querySelectorAll(".sel").forEach(x => x.classList.remove("sel")); d.classList.add("sel"); const R = T.getBoundingClientRect(), ox = e.clientX - (it.x * R.width), oy = e.clientY - (it.y * R.height); try { d.setPointerCapture(e.pointerId); } catch(_) {} const mv = ev => { it.x = Math.max(-.3, Math.min(.98, (ev.clientX - ox) / R.width)); it.y = Math.max(-.3, Math.min(.98, (ev.clientY - oy) / R.height)); d.style.left = it.x * 100 + "%"; d.style.top = it.y * 100 + "%"; }; const up = () => { d.removeEventListener("pointermove", mv); d.removeEventListener("pointerup", up); save(); }; d.addEventListener("pointermove", mv); d.addEventListener("pointerup", up); e.preventDefault(); };
  };
  autoCollage = function(){ XS.collage = []; const pl = pk(PLATES), m = pk(MAGS), o = pk(OBJPHOTOS.map((_, i) => "o" + i)); XS.collage.push({k: pl.k, x: .04, y: .03, w: 380, r: -2, jag: null}, {k: m.k, x: .58, y: .06, w: 240, r: 5, jag: jag()}, {k: o, x: .62, y: .55, w: 200, r: -6, jag: null}); [...PIECES].sort(() => Math.random() - .5).slice(0, 3).forEach((p, i) => XS.collage.push({k: p.k, x: .14 + i * .2, y: .14 + (i % 2) * .1, w: 190 + Math.random() * 50, r: +rnd(-7, 7).toFixed(1), jag: null})); save(); };
  saveImg = async function(){
    const T = $("#spT"), R = T.getBoundingClientRect(), k = HIRES_OK ? 3 : 2, c = document.createElement("canvas"); c.width = R.width * k; c.height = R.height * k; const x = c.getContext("2d"); x.scale(k, k); x.fillStyle = ["#f5efe1", "#111", "#e9dccb", "#fff"][XS.tbg || 0]; x.fillRect(0, 0, R.width, R.height);
    for (const it of XS.collage) { const im = await new Promise(ok => { const i = new Image(); if (/^https?:/.test(srcOf(it))) i.crossOrigin = "anonymous"; i.onload = () => ok(i); i.onerror = () => ok(null); i.src = srcOf(it); }); if (!im) continue; const w = it.w, h = w * im.height / im.width; x.save(); x.translate(it.x * R.width + w / 2, it.y * R.height + h / 2); x.rotate(it.r * Math.PI / 180); if (it.fl) x.scale(-1, 1); if (isCut(it.k)) { x.shadowColor = "rgba(0,0,0,.35)"; x.shadowBlur = 6; x.shadowOffsetY = 3; } if (it.jag) { x.beginPath(); it.jag.forEach(([px, py], j) => { const X = -w / 2 + px / 100 * w, Y = -h / 2 + py / 100 * h; j ? x.lineTo(X, Y) : x.moveTo(X, Y); }); x.closePath(); x.clip(); } x.drawImage(im, -w / 2, -h / 2, w, h); x.restore(); }
    c.toBlob(async b => { let dl = null; try { dl = await window.claude.use("downloads"); } catch(_) {} if (dl) { try { await dl.save({filename: "gomsn-collage.png", data: b}); toast("saved. it's yours."); return; } catch(_) {} } const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "gomsn-collage.png"; document.body.appendChild(a); a.click(); a.remove(); toast("saved. it's yours."); }, "image/png");
  };
  OV.addEventListener("click", e => { const t = e.target;
    const ac = t.closest("[data-acat]"); if (ac) { acat = ac.dataset.acat; renderAll(); return; }
    if (t.closest("[data-aspark]")) { sparkIt(); return; }
    if (t.closest("[data-amake]")) { makeCreation(); return; }
    const ax = t.closest("[data-ax]"); if (ax) { const it = everything().find(i => i.id === ax.dataset.ax); if (it) showItem(it); return; }
    const co = t.closest("[data-acoll]"); if (co) { const it = everything().find(i => i.id === co.dataset.acoll); (it.coll || []).forEach(addK); tab = "table"; paint(); return; }
    const po = t.closest("[data-apock]"); if (po) { const it = everything().find(i => i.id === po.dataset.apock); try { collect({t: it.t, y: it.sub, k: "object", src: "the archive", img: it.img, line: it.fact, credit: it.credit}); } catch(_) {} return; }
    const tc = t.closest("[data-tcat]"); if (tc) { tcat = tc.dataset.tcat; paintTable(); return; }
    const tk = t.closest("[data-tk]"); if (tk) { addK(tk.dataset.tk); paintTable(); return; }
    if (t.closest("[data-tbg]")) { XS.tbg = ((XS.tbg || 0) + 1) % 4; save(); $("#spT").className = "sptable bg" + XS.tbg; return; }
    const fl = t.closest('[data-tsel="flip"]'); if (fl && sel >= 0 && XS.collage[sel]) { XS.collage[sel].fl = !XS.collage[sel].fl; save(); paintTable(); e.stopImmediatePropagation(); return; }
  }, true);
  function paint(){ document.querySelectorAll("[data-spt]").forEach(b => b.classList.toggle("on", b.dataset.spt === (tab === "table" ? "table" : "all"))); if (tab === "table") return paintTable(); tab = "all"; return renderAll(); }
  function fileFind(){
    const all = FOUND.concat(XS.finds);
    $("#spBody").insertAdjacentHTML("beforeend", `<div class="spdet" data-spdet><form class="spdetin spform" id="spFF"><div><small>file a find</small><h3>something that left</h3>
      <label>what is it<input class="xp" name="n" required maxlength="60" placeholder="e.g. Clinique Happy in a cube bottle"></label>
      <label>kind<select class="xp" name="cat">${["fashion","scent","beauty","jewellery","music","objects","internet","film","space","other"].map(c => `<option>${c}</option>`).join("")}</select></label>
      <label>born (year)<input class="xp" name="born" maxlength="20" placeholder="1997"></label><label>gone / back<input class="xp" name="gone" maxlength="30" placeholder="2006 · or 'still here'"></label>
      <label>who made it<input class="xp" name="maker" maxlength="60"></label></div><div>
      <label>why it haunts you<textarea class="xp" name="note" maxlength="220" rows="3"></textarea></label>
      <div class="spchips">${SENSES.map(x => `<label class="spck"><input type="checkbox" name="s" value="${x}">${x}</label>`).join("")}</div>
      <label>bring it back (1 to 5)<input type="range" name="rev" min="1" max="5" value="3"></label><label>obscurity (1 to 5)<input type="range" name="obs" min="1" max="5" value="3"></label>
      <label>links to<select class="xp" name="l" multiple size="4">${all.map(f => `<option value="${esc(f.id)}">${esc(f.n)}</option>`).join("")}</select></label>
      <div class="spbtns"><button class="xp" type="submit">file it</button><button class="xp" type="button" data-spx>cancel</button></div></div></form></div>`);
    $("#spFF").onsubmit = ev => { ev.preventDefault(); const fd = new FormData(ev.target); const f = {id: "m" + Date.now().toString(36), mine: 1, n: fd.get("n"), cat: fd.get("cat"), born: fd.get("born") || "?", gone: fd.get("gone") || "?", maker: fd.get("maker"), note: fd.get("note"), s: fd.getAll("s"), rev: +fd.get("rev"), obs: +fd.get("obs"), l: fd.getAll("l")}; XS.finds.unshift(f); XS.finds = XS.finds.slice(0, 60); save(); tab = "found"; paint(); try { award(2); } catch(_) {} toast(`filed: <b>${esc(f.n)}</b>`); };
  }
  async function exportFinds(){
    const data = JSON.stringify({schema: ["id","n (name)","cat","born","gone","maker","note","s (textures)","rev (bring it back 1-5)","obs (obscurity 1-5)","l (links to ids)"], entries: FOUND.concat(XS.finds)}, null, 2);
    const b = new Blob([data], {type: "application/json"}); let dl = null; try { dl = await window.claude.use("downloads"); } catch(_) {}
    if (dl) { try { await dl.save({filename: "gomsn-lost-and-found.json", data: b}); toast("exported."); return; } catch(_) {} }
    const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "gomsn-lost-and-found.json"; document.body.appendChild(a); a.click(); a.remove(); toast("exported.");
  }
  window.openSpecimens = (t) => { closeOverlays(); tab = t === "table" || t === "collage" ? "table" : "all"; paint(); OV.classList.add("open"); try { XS.vis = XS.vis || {}; XS.vis.specimens = 1; save(); } catch(_) {} };

  /* ways in */
  const dr = $("#hudDrawer"); if (dr) { dr.insertAdjacentHTML("afterbegin", `<button id="hudSpec">✂ specimen archive</button>`); $("#hudSpec").onclick = () => window.openSpecimens(); }
  try { VERT.forEach(v => { if (v.id === "explore") v.p.unshift(["specimens", "✂", "the specimen archive", "fashion history cut out and pasted onto old nature plates, plus a collage table"]); if (v.id === "collect") v.p.push(["collage", "✂", "the collage table", "cut, paste, tear, save"], ["found", "⌁", "lost & found", "a database of things that left, came back, or never should have gone"]); if (v.id === "explore") v.p.push(["shelf", "📚", "the deep shelf", "59 archives: fashion, scent, makeup, jewellery, music, objects, theory, architecture"]); }); } catch(_) {}
  const _gp22 = goPlace; goPlace = function(k){ if (k === "specimens" || k === "collage" || k === "found" || k === "shelf") { document.body.classList.remove("inroom"); window.openSpecimens(k === "collage" ? "table" : k === "specimens" ? "cards" : k); return; } return _gp22(k); };
  /* GoMsn hears you mention it */
  const RX = /\b(specimen|collage|archiv|discontinued|minidisc|walkman|perfume|schiaparelli|balenciaga|poiret|courr[eè]ges|rabanne|vintage fashion|cut[- ]?out)/i;
  document.addEventListener("keydown", e => { if (e.key !== "Enter") return; const el = e.target; if (!el || !el.matches || !el.matches("textarea, input")) return; if (RX.test(el.value || "")) setTimeout(() => { try { toast(`✂ <a href="#" onclick="openSpecimens();return false">the specimen archive</a> has that drawer open.`); } catch(_) {} }, 900); }, true);
})();
