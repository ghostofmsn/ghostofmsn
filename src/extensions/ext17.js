
/* =================== EXTENSION 17: the quiet room, pure. and its own sound =================== */
(function(){
  const q = $("#quiet"); if (!q) return;
  q.classList.add("pure");
  q.querySelector(".qbg").insertAdjacentHTML("afterend", `<div class="qorb"></div>`);
  q.querySelector(".qhead span").textContent = "nothing to do here. that's the point.";
  q.insertAdjacentHTML("beforeend", `<div class="qsound"><span class="qslab">sound</span><div id="qsnd">${[["off", "silence"], ["rain", "rain"], ["sea", "the sea, batroun"], ["night", "mountain night"], ["pads", "slow pads"], ["oud", "oud drone"], ["brown", "brown noise"], ["box", "music box"], ["demo", "my ringtone, slowed"]].map(([k, n]) => `<button data-snd="${k}">${n}</button>`).join("")}</div><input type="range" id="qvol" min="0" max="100" value="${XS.qvol ?? 55}" title="volume"><button class="qtheme" id="qtheme" title="day / night">◐</button></div>`);
  if (XS.qdark) q.classList.add("ink");
  $("#qtheme").onclick = () => { q.classList.toggle("ink"); XS.qdark = q.classList.contains("ink") ? 1 : 0; xsave(); };

  /* ---------- soundscapes, all made right here in your browser ---------- */
  let ctx = null, master = null, live = [], cur = "off", timers = [];
  const C = () => { if (!ctx) { ctx = new (window.AudioContext || window.webkitAudioContext)(); master = ctx.createGain(); master.connect(ctx.destination); } if (ctx.state === "suspended") ctx.resume(); master.gain.value = (XS.qvol ?? 55) / 100; return ctx; };
  const noiseBuf = (type = "white", secs = 4) => { const c = C(), n = c.sampleRate * secs, b = c.createBuffer(2, n, c.sampleRate); for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); let last = 0; for (let i = 0; i < n; i++) { const w = Math.random() * 2 - 1; if (type === "brown") { last = (last + .02 * w) / 1.02; d[i] = last * 3.5; } else if (type === "pink") { last = .97 * last + .03 * w; d[i] = (last * 4 + w * .15); } else d[i] = w; } } return b; };
  const loop = (buf, gain, filt) => { const c = C(), s = c.createBufferSource(); s.buffer = buf; s.loop = true; const g = c.createGain(); g.gain.value = gain; let node = s; if (filt) { const f = c.createBiquadFilter(); Object.assign(f, {type: filt[0]}); f.frequency.value = filt[1]; if (filt[2]) f.Q.value = filt[2]; node.connect(f); node = f; live.push({f}); } node.connect(g).connect(master); s.start(); live.push({s, g}); return {s, g}; };
  const tone = (f, type, gain, attack = 3) => { const c = C(), o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, c.currentTime); g.gain.linearRampToValueAtTime(gain, c.currentTime + attack); o.connect(g).connect(master); o.start(); live.push({s: o, g}); return {o, g}; };
  const every = (ms, fn) => { const t = setInterval(fn, ms); timers.push(t); fn(); };
  const pluck = (f, vol = .06, dur = 2.5, type = "sine") => { const c = C(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime; o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + dur); o.connect(g).connect(master); o.start(t); o.stop(t + dur + .1); };
  function stop(){ timers.forEach(clearInterval); timers = []; live.forEach(n => { try { n.g && n.g.gain.setTargetAtTime(0, ctx.currentTime, .4); n.s && n.s.stop(ctx.currentTime + 1.6); } catch(_) {} }); live = []; }
  const SC = {
    rain(){ loop(noiseBuf("pink"), .5, ["lowpass", 2400]); loop(noiseBuf("white"), .05, ["highpass", 6000]); every(140, () => { if (Math.random() < .5) pluck(2000 + Math.random() * 3000, .008, .05, "sine"); }); },
    sea(){ const w = loop(noiseBuf("pink", 6), .0, ["lowpass", 900]); every(100, () => { const t = ctx.currentTime % 9 / 9; w.g.gain.setTargetAtTime(.15 + Math.sin(t * Math.PI) ** 2 * .55, ctx.currentTime, .3); }); loop(noiseBuf("white"), .015, ["bandpass", 4000, .5]); },
    night(){ loop(noiseBuf("brown"), .12, ["lowpass", 500]); every(900, () => { if (Math.random() < .7) { for (let k = 0; k < 3; k++) setTimeout(() => pluck(4200 + Math.random() * 300, .012, .06, "square"), k * 70); } }); every(5200, () => { if (Math.random() < .4) pluck(520, .02, 1.4, "sine"); }); },
    pads(){ const ch = [[220, 277.18, 329.63], [196, 246.94, 293.66], [174.61, 220, 261.63], [196, 246.94, 329.63]]; let i = 0; const v = [tone(110, "sine", .05)]; every(8000, () => { const c = ch[i++ % ch.length]; c.forEach((f, k) => { const n = tone(f, k ? "triangle" : "sine", .035, 3); setTimeout(() => { try { n.g.gain.setTargetAtTime(0, ctx.currentTime, 1.5); n.o.stop(ctx.currentTime + 6); } catch(_) {} }, 7000); }); }); },
    oud(){ tone(146.83, "sawtooth", .018); tone(73.42, "sine", .08); const L = ctx.createBiquadFilter(); const hij = [293.66, 311.13, 369.99, 392, 440, 466.16, 523.25, 587.33]; every(1600, () => { if (Math.random() < .75) pluck(hij[Math.random() * hij.length | 0], .05, 2.2, "triangle"); }); },
    brown(){ loop(noiseBuf("brown", 6), .7, ["lowpass", 700]); },
    box(){ const notes = [523.25, 659.25, 783.99, 880, 1046.5, 783.99, 659.25, 587.33]; let i = 0; every(700, () => { pluck(notes[i++ % notes.length] * (Math.random() < .1 ? 2 : 1), .05, 1.8, "sine"); }); },
    demo(){ const r = XS.myRing || XS.ring; if (!r) { toast("make a ringtone first, in 🛠 make."); return; } const F = {C5: 523.25, B4: 493.88, A4: 440, G4: 392, F4: 349.23, E4: 329.63, D4: 293.66, C4: 261.63}, N = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"]; let i = 0; every(60000 / (r.bpm || 120) * 1.6, () => { const n = r.steps[i++ % 16]; if (n >= 0) pluck(F[N[n]] / 2, .06, 3, "sine"); }); tone(65.41, "sine", .05); }
  };
  function set(k){ stop(); cur = k; XS.qsnd = k; xsave(); document.querySelectorAll("#qsnd button").forEach(b => b.classList.toggle("on", b.dataset.snd === k)); if (k !== "off" && SC[k]) { C(); SC[k](); } }
  $("#qsnd").addEventListener("click", e => { const b = e.target.closest("[data-snd]"); if (b) set(b.dataset.snd); });
  $("#qvol").addEventListener("input", e => { XS.qvol = +e.target.value; xsave(); if (master) master.gain.setTargetAtTime(XS.qvol / 100, ctx.currentTime, .1); });
  document.querySelectorAll("#qsnd button").forEach(b => b.classList.toggle("on", b.dataset.snd === (XS.qsnd || "off")));
  /* sound starts only when you choose it, and stops when you leave */
  const _oq = window.openQuiet; window.openQuiet = t => { _oq(t); if (XS.qsnd && XS.qsnd !== "off" && cur === "off") document.querySelectorAll("#qsnd button").forEach(b => b.classList.toggle("on", b.dataset.snd === XS.qsnd)); };
  q.addEventListener("click", e => { if (e.target.closest("[data-qclose]")) set("off"); });
  const _co17 = closeOverlays; closeOverlays = function(){ _co17(); if (!q.classList.contains("open") && cur !== "off") set("off"); };
  /* zen mode keeps its own calm: the quiet room's look */
  const _z = $("#hudZen"); if (_z) _z.addEventListener("click", () => { if (!document.body.classList.contains("zen")) set("off"); });
})();

/* ---------- spotify, wired to the connector's real tools ---------- */
(function(){
  let MCP = null; try { window.claude && window.claude.use && window.claude.use("mcp").then(m => { MCP = m; }).catch(() => {}); } catch(_) {}
  const SV = "Spotify", LANG = (navigator.language || "en-US");
  const call = async (tool, input) => { if (!MCP) throw {code: "no_mcp"}; const r = await MCP.callTool(SV, tool, input); let p = r && (r.payload !== undefined ? r.payload : r); if (p && p.content && Array.isArray(p.content)) { try { p = JSON.parse(p.content.map(c => c.text || "").join("")); } catch(_) {} } if (typeof p === "string") { try { p = JSON.parse(p); } catch(_) {} } return p; };
  const why = e => e && e.code === "no_mcp" ? "connect Spotify in your claude.ai settings (Connectors), then open this page from its claude.ai link." : (e && /PREMIUM|NOT_SUBSCRIBED/i.test(JSON.stringify(e)) ? "making playlists needs Spotify Premium. search still works." : "Spotify didn't answer. try again in a moment.");
  let audio = null;
  const preview = (url, btn, fallback) => { try { if (audio) { audio.pause(); if (audio._b === btn) { audio = null; btn.textContent = "▶ 30s"; return; } if (audio._b) audio._b.textContent = "▶ 30s"; } audio = new Audio(url); audio._b = btn; audio.volume = .9; btn.textContent = "■ stop"; audio.onended = () => { btn.textContent = "▶ 30s"; }; audio.play().catch(() => { btn.textContent = "open ↗"; window.open(fallback, "_blank", "noopener"); }); } catch(_) { window.open(fallback, "_blank", "noopener"); } };
  const row = e => { const cov = ((e.display || {}).covers || []).find(c => c.size === "SMALL") || ((e.display || {}).covers || [])[0], pv = (e.display || {}).audio_preview_url;
    return `<div class="sprow"><img class="spcov" src="${cov ? esc(cov.url) : ""}" alt="" onerror="this.remove()"><span><b>${esc(e.name)}</b> ${esc((e.creators || []).map(c => c.name).join(", "))} <i>${esc((e.display || {}).type_label || "")}</i></span>
      ${pv ? `<button class="linkbtn" data-sppv="${esc(pv)}" data-spurl="${esc(e.url)}">▶ 30s</button>` : ""}<a href="${esc(e.url)}" target="_blank" rel="noopener">play in spotify ↗</a>${e.uri ? `<button class="linkbtn" data-spadd2="${esc(e.uri)}">♡ save</button>` : ""}</div>`; };
  window.spSearch = async (q, box, limit = 6) => { box.innerHTML = "searching your spotify…"; try { const p = await call("search", {prompt: q, language: LANG, limit}); const ents = (p && p.entities) || []; box.innerHTML = ents.length ? ents.map(row).join("") : "nothing found on your spotify."; } catch(e) { box.textContent = why(e); } };
  document.addEventListener("click", async e => {
    const pv = e.target.closest("[data-sppv]"); if (pv) { e.preventDefault(); preview(pv.dataset.sppv, pv, pv.dataset.spurl); return; }
    const sv = e.target.closest("[data-spadd2]"); if (sv) { e.preventDefault(); try { await call("save_to_library", {uri: sv.dataset.spadd2}); sv.textContent = "saved ✓"; } catch(err) { toast(why(err)); } }
  });
  window.spNowPlaying = async () => { try { const p = await call("get_currently_playing", {}); const it = (p && (p.item || p.entity || (p.entities || [])[0])) || p || {}; const n = it.name || it.title; if (!n) { toast("nothing is playing on your spotify right now."); return null; } const by = (it.creators || it.artists || []).map(c => c.name || c).join(", "); const line = `♫ ${n}${by ? " – " + by : ""}`; $("#mypm").textContent = line; me.pm = line; xsave(); toast(`now showing: ${esc(line)}`); window.roomNP && window.roomNP(line); return line; } catch(e) { toast(why(e)); return null; } };
  window.spPlaylist = async L => { try { toast("asking spotify to build it…"); const p = await call("generate_playlist", {prompt: `create a playlist called "${L.title}" with these songs: ${L.items.slice(0, 30).join("; ")}`, language: LANG}); const url = p && (p.url || (p.playlist && p.playlist.url) || ((p.entities || [])[0] || {}).url); toast(url ? `made it on your spotify ✓ <a href="${esc(url)}" target="_blank" rel="noopener">open ↗</a>` : "spotify made your playlist ✓"); } catch(e) { toast(why(e)); } };
  /* the quiet room: something calm from your own spotify */
  const qs = $("#qsnd"); if (qs) { qs.insertAdjacentHTML("beforeend", `<button data-qsp>✦ from my spotify</button>`); document.querySelector("#quiet .qsound").insertAdjacentHTML("afterend", `<div id="qspbox"></div>`);
    qs.addEventListener("click", e => { if (!e.target.closest("[data-qsp]")) return; const box = $("#qspbox"); box.classList.toggle("on"); if (box.classList.contains("on")) window.spSearch("calm ambient music for slowing down", box, 6); }); }
})();
