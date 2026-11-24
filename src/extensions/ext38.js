/* =================== EXTENSION 38: the blender. everything you saved, blended into a report you can act on =================== */
(function(){
  const RB = () => window.RABBIT || {};
  const pickN = (a, n) => a.slice().sort(() => Math.random() - .5).slice(0, n);
  const uniq = a => [...new Set(a)];
  function blend(){
    const L = XS.learn || [], S = (XS.stash || []).map(s => ({k: "pocket", t: s.t || s.title || "", line: s.line || ""}));
    const all = L.concat(S).filter(x => x.t);
    const by = k => uniq(all.filter(x => x.k === k).map(x => x.t));
    const sounds = by("sound").filter(g => RB()[g]), aes = by("aesthetic"), plants = by("plant").map(p => p.replace(/\s*\(.*\)$/, "")), sites = by("source"), pockets = by("pocket"), sparks = by("spark");
    const n = uniq(all.map(x => x.k + x.t)).length;
    if (n < 3) return null;
    const A = sounds[0] || aes[0] || pockets[0] || "", B = aes[0] && aes[0] !== A ? aes[0] : (plants[0] || pockets[1] || sounds[1] || ""), C = plants[0] && plants[0] !== B ? plants[0] : (sites[0] || sounds[2] || "");
    const niche = [A, B, C].filter(Boolean).join(" × ");
    const places = uniq(sounds.map(g => RB()[g][0]));
    const artists = uniq(sounds.flatMap(g => RB()[g][3].slice(0, 3))).slice(0, 12);
    const next = uniq(sounds.flatMap(g => RB()[g][4])).filter(g => !sounds.includes(g)).slice(0, 6);
    const days = uniq(L.map(x => new Date(x.at).toDateString())).length;
    const title = (A ? A.split(/[\s-]/)[0] : "ghost") + " " + (B ? B.split(/\s/).slice(-1)[0] : "club");
    const R = {n, days, niche, title, sounds, aes, plants, sites, pockets, sparks, places, artists, next,
      todo: [
        artists.length ? ["make the playlist", `a 12-track mix called "${title}": ${artists.join(", ")}. one track each, in that order, then reshuffle until it tells a story.`] : null,
        ["make the moodboard", `put these on one page: ${[].concat(aes.slice(0, 3), plants.slice(0, 3), pockets.slice(0, 3)).join(", ") || niche}. find the one colour they share.`],
        ["make the zine", `8 pages titled "${title}". one page per thing you saved, one sentence each, the last page is a question you still have.`],
        ["post it", `open a topic in the cybercafé called "${niche}" and ask who else is into it.`],
        ["write it down", "leave a letter on the stranger wall about the thing that surprised you most."],
        ["make a piece", `design one object (a bag, a T-shirt, a poster, a dish) that could only exist in "${niche}".`]
      ].filter(Boolean)};
    return R;
  }
  function html(R){
    if (!R) return `<p class="mrp">the blender needs at least three things. spin the wheel, open a plant, enter a rabbit hole, pocket something, then come back.</p>`;
    const li = a => a.map(x => `<li>${esc(x)}</li>`).join("");
    return `<div class="bl38"><small>your blend · ${R.n} things · ${R.days} day${R.days === 1 ? "" : "s"}</small><h3>${esc(R.niche || R.title)}</h3><p class="bl38t">working title: <b>${esc(R.title)}</b></p>
      <div class="bl38g">
      ${R.sounds.length ? `<div><h4>sounds you went into</h4><ul>${li(R.sounds)}</ul></div>` : ""}
      ${R.aes.length ? `<div><h4>aesthetics</h4><ul>${li(R.aes)}</ul></div>` : ""}
      ${R.plants.length ? `<div><h4>weird plants</h4><ul>${li(R.plants)}</ul></div>` : ""}
      ${R.sites.length ? `<div><h4>places you dug</h4><ul>${li(R.sites)}</ul></div>` : ""}
      ${R.pockets.length ? `<div><h4>things you pocketed</h4><ul>${li(R.pockets.slice(0, 12))}</ul></div>` : ""}
      ${R.places.length ? `<div><h4>where your taste comes from</h4><ul>${li(R.places)}</ul></div>` : ""}</div>
      <h4>what to do with it</h4><ol class="bl38do">${R.todo.map(([h, p]) => `<li><b>${esc(h)}</b>${esc(p)}</li>`).join("")}</ol>
      ${R.next.length ? `<h4>where to go next</h4><div class="rhnext">${R.next.map(g => `<button class="rhn" data-bl38rh="${esc(g)}">${esc(g)} →</button>`).join("")}</div>` : ""}</div>`;
  }
  function md(R){
    if (!R) return "";
    const L = (h, a) => a.length ? `## ${h}\n\n${a.map(x => "- " + x).join("\n")}\n\n` : "";
    return `# ${R.niche || R.title}\n\n_working title: ${R.title} · blended on The Ghost of MSN, ${new Date().toLocaleDateString()} · ${R.n} things over ${R.days} day(s)_\n\n` + L("sounds", R.sounds) + L("aesthetics", R.aes) + L("weird plants", R.plants) + L("places dug", R.sites) + L("pocketed", R.pockets) + L("where the taste comes from", R.places) + `## what to do with it\n\n${R.todo.map(([h, p], i) => `${i + 1}. **${h}**: ${p}`).join("\n")}\n\n` + L("next rabbit holes", R.next);
  }
  const J = $("#learn30 .j30act");
  if (J) J.insertAdjacentHTML("afterbegin", `<button class="xp big bl38btn" data-bl38>🌀 blend it all into a report</button>`);
  const jw = $("#learn30 .j30wrap"); if (jw) $("#j30stats").insertAdjacentHTML("afterend", `<div id="bl38out"></div>`);
  let last = null;
  document.addEventListener("click", e => { const t = e.target;
    if (t.closest("[data-bl38]")) { last = blend(); $("#bl38out").innerHTML = html(last) + (last ? `<div class="j30act"><button class="xp" data-bl38md>⬇ download the report (.md)</button><button class="xp" data-j30print>🖨 print / save as PDF</button><button class="xp" data-bl38>🌀 blend again</button></div>` : ""); $("#bl38out").scrollIntoView({behavior: "smooth"}); return; }
    if (t.closest("[data-bl38md]") && last) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([md(last)], {type: "text/markdown"})); a.download = "my-niche-report.md"; document.body.appendChild(a); a.click(); a.remove(); return; }
    const r = t.closest("[data-bl38rh]"); if (r) { $("#learn30").classList.remove("open"); window.openRabbit(r.dataset.bl38rh); return; }
  });
  try { VERT.forEach(v => v.p.forEach(p => { if (p[0] === "learn30") { p[2] = "my journal + the blender"; p[3] = "everything you learned, blended into a report"; } })); } catch(_) {}
})();
