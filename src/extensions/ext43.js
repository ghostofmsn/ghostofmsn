/* =================== EXTENSION 43: four more icons, drawn in 3D (no free photo exists) =================== */
(function(){
  const O = window.DESIGN_OBJ; if (!O) return;
  [["togo", "Togo", "Michel Ducaroy", 1973, "Ligne Roset", "chair", "biomorphic", "quilted polyester, foam", "r3d:togo", "studio render, The Ghost of MSN"],
   ["bocca", "Bocca (Marilyn)", "Studio65", 1970, "Gufram", "chair", "biomorphic", "polyurethane foam, stretch fabric", "r3d:bocca", "studio render, The Ghost of MSN"],
   ["snoopy", "Snoopy", "Achille & Pier Giacomo Castiglioni", 1967, "Flos", "lamp", "pedestal", "enamelled metal, marble", "r3d:snoopy", "studio render, The Ghost of MSN"],
   ["panthella", "Panthella", "Verner Panton", 1971, "Louis Poulsen", "lamp", "pedestal", "acrylic shade, chrome", "r3d:panthella", "studio render, The Ghost of MSN"]
  ].forEach(r => { if (!O.some(o => o[0] === r[0])) O.push(r); });
  const draw = () => O.forEach(o => { if (String(o[8]).startsWith("r3d:")) { try { o[8] = R3D.designRender(o[8].slice(4), 420); } catch(_) {} } });
  (window.requestIdleCallback || (f => setTimeout(f, 4000)))(draw, {timeout: 8000});
  const _oc = window.openCollection; window.openCollection = function(){ draw(); return _oc.apply(this, arguments); };
})();
