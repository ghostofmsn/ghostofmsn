import * as THREE from 'three';

/* ---------- the ghost, GTA loading-screen style: cel shading, ink outline, aviators, gold chain ---------- */
function ghostModel(toon = true, opts = {}) {
  const g = new THREE.Group();
  const grad = new THREE.DataTexture(new Uint8Array([70, 70, 70, 255, 160, 160, 160, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
  grad.minFilter = grad.magFilter = THREE.NearestFilter; grad.needsUpdate = true;
  const M = (c, o = {}) => toon ? new THREE.MeshToonMaterial(Object.assign({ color: c, gradientMap: grad }, o)) : new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: .6 }, o));
  const ink = new THREE.MeshBasicMaterial({ color: '#0a0608', side: THREE.BackSide });
  const prof = []; for (let i = 0; i <= 28; i++) { const a = i / 28, y = a * 1.2; let r; if (a < .62) r = .44 + (.62 - a) * .22 + Math.sin(a * 40) * .018 * (1 - a / .62); else r = Math.sqrt(Math.max(0, 1 - ((a - .62) / .38) ** 2)) * .45; prof.push(new THREE.Vector2(Math.max(.001, r), y)); }
  const geo = new THREE.LatheGeometry(prof, 48);
  const an = opts.sheet && ANIMAL[opts.sheet]; const body = new THREE.Mesh(geo, M(an ? '#ffffff' : (opts.sheet || '#f6f2ea'), Object.assign({ side: THREE.DoubleSide }, an ? { map: animalTexture(an) } : {}))); g.add(body);
  const out = new THREE.Mesh(geo, ink); out.scale.setScalar(1.045); out.position.y = -.015; g.add(out);
  const eyes = opts.eyes || 'aviators', lensC = opts.lens || '#2a1030';
  if (eyes === 'aviators') {
  /* aviators */
  const lensM = toon ? new THREE.MeshToonMaterial({ color: lensC, gradientMap: grad, emissive: '#3a0a40', emissiveIntensity: .4 }) : M('#111');
  [-.15, .15].forEach(x => { const l = new THREE.Mesh(new THREE.SphereGeometry(.13, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), lensM); l.rotation.x = Math.PI / 2; l.scale.set(1.15, .35, .85); l.position.set(x, .86, .39); g.add(l);
    const fr = new THREE.Mesh(new THREE.TorusGeometry(.13, .012, 8, 30), M('#d9b45a', { emissive: '#3a2a00' })); fr.scale.set(1.15, .85, 1); fr.position.set(x, .86, .42); g.add(fr);
    const shine = new THREE.Mesh(new THREE.PlaneGeometry(.05, .02), new THREE.MeshBasicMaterial({ color: '#ff9ad8' })); shine.position.set(x - .04, .9, .47); shine.rotation.z = .5; g.add(shine); });
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(.08, .015, .015), M('#d9b45a')); bridge.position.set(0, .88, .43); g.add(bridge);
  } else if (eyes !== 'none') {
    const fM = M(eyes === 'cateye' ? '#111' : eyes === 'heart' ? '#ff3d8e' : '#d9b45a'), lM = toon ? new THREE.MeshToonMaterial({ color: lensC, gradientMap: grad, emissive: lensC, emissiveIntensity: .25 }) : M(lensC);
    [-.15, .15].forEach(x => {
      if (eyes === 'cateye') { const l = new THREE.Mesh(new THREE.CircleGeometry(.12, 24), lM); l.scale.set(1.3, .62, 1); l.position.set(x, .87, .435); l.rotation.set(-.05, x * 1.2, x > 0 ? -.25 : .25); g.add(l); const f = new THREE.Mesh(new THREE.TorusGeometry(.12, .02, 8, 30), fM); f.scale.set(1.3, .62, 1); f.position.copy(l.position); f.rotation.copy(l.rotation); g.add(f); const w = new THREE.Mesh(new THREE.ConeGeometry(.035, .09, 3), fM); w.position.set(x * 1.75, .93, .41); w.rotation.z = x > 0 ? -1.1 : 1.1; g.add(w); }
      else if (eyes === 'round') { const l = new THREE.Mesh(new THREE.CircleGeometry(.1, 28), lM); l.position.set(x, .86, .44); l.rotation.y = x * 1.1; g.add(l); const f = new THREE.Mesh(new THREE.TorusGeometry(.1, .012, 8, 30), fM); f.position.copy(l.position); f.rotation.copy(l.rotation); g.add(f); }
      else if (eyes === 'heart') { const sh = new THREE.Shape(); sh.moveTo(0, -.09); sh.bezierCurveTo(-.15, .02, -.07, .12, 0, .05); sh.bezierCurveTo(.07, .12, .15, .02, 0, -.09); const l = new THREE.Mesh(new THREE.ShapeGeometry(sh), lM); l.position.set(x, .86, .44); l.rotation.y = x * 1.1; l.scale.setScalar(1.15); g.add(l); }
      else if (eyes === 'dots') { const l = new THREE.Mesh(new THREE.SphereGeometry(.045, 16, 12), new THREE.MeshBasicMaterial({ color: '#0a0608' })); l.scale.set(.8, 1.3, .4); l.position.set(x * .8, .88, .43); g.add(l); }
    });
    if (eyes !== 'dots' && eyes !== 'heart') { const br = new THREE.Mesh(new THREE.BoxGeometry(.08, .015, .015), fM); br.position.set(0, .88, .44); g.add(br); }
  }
  /* smirk */
  const sm = new THREE.Mesh(new THREE.TorusGeometry(.07, .012, 6, 20, Math.PI * .7), new THREE.MeshBasicMaterial({ color: '#0a0608' })); sm.position.set(.04, .66, .43); sm.rotation.set(0, 0, Math.PI * 1.1); g.add(sm);
    return g;
}
export function mascot(size = 512, pose = 0) {
  /* a clean studio portrait of the room ghost: plaster backdrop, a coloured disc, soft light, no comic filter */
  const S = size * 2, r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); r.setSize(S, S); r.setPixelRatio(1);
  r.outputColorSpace = THREE.SRGBColorSpace; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.1;
  const s = new THREE.Scene(), cam = new THREE.PerspectiveCamera(26, 1, .1, 20);
  cam.position.set(.45, 1.0, 4.4); cam.lookAt(0, .58, 0);
  const key = new THREE.DirectionalLight('#fff4e4', 2.4); key.position.set(1.5, 3, 2.5); s.add(key);
  const rim = new THREE.DirectionalLight(pose % 2 ? '#7fd8ff' : '#ff6a8a', 1.4); rim.position.set(-2.5, 1.5, -1.5); s.add(rim);
  s.add(new THREE.HemisphereLight('#fff6ec', '#b9a58a', 1.0));
  const g = ghostModel(); g.rotation.y = [.3, -.35, .5][pose % 3]; s.add(g);
  r.render(s, cam);
  const c = document.createElement('canvas'); c.width = c.height = size; const x = c.getContext('2d');
  const bg = x.createLinearGradient(0, 0, 0, size); bg.addColorStop(0, '#efe4d2'); bg.addColorStop(1, '#d6c1a2'); x.fillStyle = bg; x.fillRect(0, 0, size, size);
  for (let i = 0; i < size * 3; i++) { x.fillStyle = Math.random() < .5 ? 'rgba(255,255,255,.05)' : 'rgba(90,60,30,.04)'; x.beginPath(); x.arc(Math.random() * size, Math.random() * size, 1 + Math.random() * size * .02, 0, 7); x.fill(); }
  x.fillStyle = ['#1638b8', '#c8141e', '#1638b8'][pose % 3]; x.beginPath(); x.arc(size * .5, size * .52, size * .36, 0, 7); x.fill();
  x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = size * .012; x.beginPath(); x.arc(size * .5, size * .52, size * .3, 0, 7); x.stroke();
  const sh = x.createRadialGradient(size * .5, size * .97, 0, size * .5, size * .97, size * .3); sh.addColorStop(0, 'rgba(0,0,0,.28)'); sh.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = sh; x.fillRect(0, size * .8, size, size * .2);
  x.imageSmoothingQuality = 'high'; x.drawImage(r.domElement, 0, 0, size, size);
  r.dispose(); r.forceContextLoss();
  return c.toDataURL('image/png');
}
export { ghostModel };

/* ---------- dataland: a fly-through exhibition, images float in a dark tunnel of light ---------- */
export function dataland(host, items, opts = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  host.appendChild(renderer.domElement); renderer.domElement.className = 'dlcanvas';
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#06040a'); scene.fog = new THREE.FogExp2('#06040a', .045);
  const cam = new THREE.PerspectiveCamera(60, 1, .1, 120);
  /* particles: a data river */
  const N = 4000, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
  const pal = [new THREE.Color('#ff3d8e'), new THREE.Color('#7fd8ff'), new THREE.Color('#9bff6a'), new THREE.Color('#b48cff'), new THREE.Color('#ffd23f')];
  for (let i = 0; i < N; i++) { const a = Math.random() * Math.PI * 2, rr = 4 + Math.random() * 9; pos[i * 3] = Math.cos(a) * rr; pos[i * 3 + 1] = Math.sin(a) * rr * .7; pos[i * 3 + 2] = -Math.random() * (items.length * 3.2 + 40) + 10; const c = pal[i % 5]; col.set([c.r, c.g, c.b], i * 3); }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); pg.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ size: .05, vertexColors: true, transparent: true, opacity: .85 })); scene.add(pts);
  /* a floor of light lines */
  const grid = new THREE.GridHelper(40, 40, '#ff3d8e', '#2a1840'); grid.position.y = -2.4; grid.scale.z = (items.length * 3.2 + 40) / 40; grid.position.z = -(items.length * 3.2) / 2; scene.add(grid);
  const planes = [], loader = new THREE.TextureLoader();
  const tex = (src, cb) => { const im = new Image(); im.onload = () => { const t = new THREE.Texture(im); t.colorSpace = THREE.SRGBColorSpace; t.needsUpdate = true; cb(t, im); }; im.src = src; };
  items.forEach((it, i) => {
    const side = i % 2 ? 1 : -1, z = -i * 3.2, x = side * (1.7 + (i * 37 % 5) * .15), y = Math.sin(i * 1.7) * .5;
    const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = -side * .38; scene.add(g); g.userData.i = i; g.userData.base = y;
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 2.0), new THREE.MeshBasicMaterial({ color: pal[i % 5], transparent: true, opacity: .12 })); glow.position.z = -.05; g.add(glow);
    const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.8, 1.8)), new THREE.LineBasicMaterial({ color: pal[i % 5] })); g.add(frame);
    const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), new THREE.MeshBasicMaterial({ color: '#fff', transparent: true })); g.add(pl); g.userData.pl = pl;
    tex(it.img, (t, im) => { const a = im.width / im.height; pl.material.map = t; pl.material.needsUpdate = true; if (a > 1) pl.scale.set(1, 1 / a, 1); else pl.scale.set(a, 1, 1); });
    /* glitch slices: three thin offset copies that shiver */
    g.userData.slices = [0, 1, 2].map(k => { const s = new THREE.Mesh(new THREE.PlaneGeometry(1.6, .08), new THREE.MeshBasicMaterial({ color: pal[(i + k + 1) % 5], transparent: true, opacity: 0, blending: THREE.AdditiveBlending })); s.position.z = .01; g.add(s); return s; });
    planes.push(g);
  });
  const end = items.length * 3.2 + 2;
  let z = 4, zT = 4, look = { x: 0, y: 0 }, lookT = { x: 0, y: 0 }, hovered = null, running = false, auto = true;
  const el = renderer.domElement;
  host.addEventListener('wheel', e => { e.preventDefault(); zT = Math.max(-end + 6, Math.min(4, zT - e.deltaY * .01)); auto = false; }, { passive: false });
  let drag = null; host.addEventListener('pointerdown', e => { drag = { y: e.clientY, z: zT, moved: 0 }; });
  addEventListener('pointerup', () => { setTimeout(() => drag = null, 0); });
  host.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); lookT.x = ((e.clientX - r.left) / r.width - .5) * .6; lookT.y = ((e.clientY - r.top) / r.height - .5) * .35;
    if (drag) { const dy = e.clientY - drag.y; drag.moved = Math.max(drag.moved, Math.abs(dy)); zT = Math.max(-end + 6, Math.min(4, drag.z + dy * .02)); auto = false; }
    const h = pick(e); if (h !== hovered) { hovered = h; el.style.cursor = h ? 'pointer' : 'grab'; if (opts.hover) opts.hover(h ? items[h.userData.i] : null); } });
  const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
  const pick = e => { const r = el.getBoundingClientRect(); v2.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); ray.setFromCamera(v2, cam); const hit = ray.intersectObjects(planes.map(p => p.userData.pl))[0]; return hit ? hit.object.parent : null; };
  el.addEventListener('click', e => { if (drag && drag.moved > 6) return; const h = pick(e); if (h && opts.open) opts.open(items[h.userData.i], h.userData.i); });
  function resize() { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.fov = w < h ? 78 : 60; cam.updateProjectionMatrix(); }
  addEventListener('resize', resize);
  const clock = new THREE.Clock();
  function frame() {
    if (!running) return; requestAnimationFrame(frame); const t = clock.getElapsedTime();
    if (auto) zT = Math.max(-end + 6, zT - .012);
    z += (zT - z) * .06; look.x += (lookT.x - look.x) * .05; look.y += (lookT.y - look.y) * .05;
    cam.position.set(look.x * 2, -look.y * 1.2 + .2, z); cam.lookAt(look.x * 4, -look.y * 2, z - 8);
    pts.rotation.z = t * .02;
    planes.forEach((g, i) => { g.position.y = g.userData.base + Math.sin(t * .8 + i) * .08; const on = g === hovered; const s = on ? 1.12 : 1; g.scale.lerp(new THREE.Vector3(s, s, s), .12);
      g.userData.slices.forEach((sl, k) => { const glitch = on || Math.random() < .004; sl.material.opacity = glitch ? .5 * Math.random() : sl.material.opacity * .85; if (glitch) { sl.position.y = (Math.random() - .5) * 1.5; sl.position.x = (Math.random() - .5) * .2; sl.scale.y = .5 + Math.random() * 3; } }); });
    renderer.render(scene, cam);
    if (opts.progress) opts.progress(Math.min(1, Math.max(0, (4 - z) / (end - 2))));
  }
  return { start() { if (running) return; running = true; resize(); frame(); }, stop() { running = false; }, go(i) { zT = -i * 3.2 + 3.2; auto = false; }, dispose() { running = false; renderer.dispose(); el.remove(); } };
}

/* ---------- animal prints: leopard, pink leopard, zebra (canvas textures) ---------- */
export const ANIMAL = { '#c8903c': 'leopard', '#efede6': 'zebra', '#f2a5c8': 'pinkleo' };
const _atex = {};
export function animalCanvas(kind, S = 256) {
  const c = document.createElement('canvas'); c.width = c.height = S; const x = c.getContext('2d');
  let seed = kind.length * 977; const R = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  if (kind === 'zebra') {
    x.fillStyle = '#f4f1e8'; x.fillRect(0, 0, S, S); x.fillStyle = '#141014';
    for (let i = -2; i < 14; i++) { const y0 = i * S / 11; x.beginPath(); x.moveTo(0, y0);
      for (let k = 0; k <= 16; k++) { const xx = k * S / 16; x.lineTo(xx, y0 + Math.sin(k * .9 + i) * S * .05 + Math.sin(k * .3) * S * .04); }
      for (let k = 16; k >= 0; k--) { const xx = k * S / 16; x.lineTo(xx, y0 + S * (.035 + .025 * Math.abs(Math.sin(k * .7 + i * 1.3))) + Math.sin(k * .9 + i) * S * .05 + Math.sin(k * .3) * S * .04); }
      x.closePath(); x.fill(); }
    return c;
  }
  const pink = kind === 'pinkleo';
  const base = pink ? ['#f9c3da', '#efa0c2'] : ['#e2ac55', '#c98a35'], mid = pink ? '#d86e9e' : '#9a5420', ink = pink ? '#2e0a20' : '#160c06';
  const bg = x.createRadialGradient(S * .4, S * .4, 0, S * .5, S * .5, S * .8); bg.addColorStop(0, base[0]); bg.addColorStop(1, base[1]); x.fillStyle = bg; x.fillRect(0, 0, S, S);
  for (let i = 0; i < 220; i++) { x.fillStyle = pink ? 'rgba(255,230,240,.22)' : 'rgba(250,215,140,.2)'; x.beginPath(); x.ellipse(R() * S, R() * S, 3 + R() * 9, 1 + R() * 3, R() * 3, 0, 7); x.fill(); }
  const blob = (cx, cy, r, col) => { x.fillStyle = col; x.beginPath(); const n = 9; for (let k = 0; k <= n; k++) { const a = k / n * Math.PI * 2, rr = r * (.75 + R() * .45); const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr * .85; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); x.fill(); };
  const rose = [];
  for (let i = 0; i < 13; i++) rose.push([R() * S, R() * S, S * (.06 + R() * .035), R() * 6]);
  for (const [cx0, cy0, r, rot] of rose) for (const dx of [-S, 0, S]) for (const dy of [-S, 0, S]) {
    const cx = cx0 + dx, cy = cy0 + dy;
    blob(cx, cy, r * .78, mid);
    x.strokeStyle = ink; x.lineCap = 'round';
    const segs = 3 + (R() * 3 | 0); let a = rot;
    for (let k = 0; k < segs; k++) { const len = (Math.PI * 2 / segs) * (.55 + R() * .25); x.lineWidth = r * (.32 + R() * .2); x.beginPath(); x.ellipse(cx, cy, r * (1 + R() * .15), r * (.85 + R() * .15), rot * .2, a, a + len); x.stroke(); a += Math.PI * 2 / segs; }
  }
  for (let i = 0; i < 26; i++) { const cx = R() * S, cy = R() * S, r = S * (.012 + R() * .02); for (const dx of [-S, 0, S]) for (const dy of [-S, 0, S]) blob(cx + dx, cy + dy, r, ink); }
  return c;
}
export function animalTexture(kind) {
  if (_atex[kind]) return _atex[kind];
  const t = new THREE.CanvasTexture(animalCanvas(kind)); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.repeat.set(.85, .85); t.anisotropy = 4;
  return (_atex[kind] = t);
}

/* ---------- make-your-own ghost: sheet, eyewear, boots peeking out, poster or studio ---------- */
export function ghostMake(spec = {}, size = 420) {
  const W = size, H = Math.round(size * 1.25), S = 2;
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); r.setSize(W * S, H * S); r.setPixelRatio(1);
  r.outputColorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Scene(), cam = new THREE.PerspectiveCamera(24, W / H, .1, 30);
  cam.position.set(.8, 1.05, 5.6); cam.lookAt(0, .9, 0);
  const key = new THREE.DirectionalLight('#fff1dc', 3); key.position.set(2, 3.5, 3); s.add(key);
  const bgK = spec.bg || 'gta';
  const rim = new THREE.DirectionalLight(bgK === 'gta' ? '#ff4fa0' : '#ffd9c0', 2); rim.position.set(-3, 1.6, -2); s.add(rim);
  const rim2 = new THREE.DirectionalLight('#5fd8ff', 1.2); rim2.position.set(3, .5, -2); s.add(rim2);
  s.add(new THREE.AmbientLight('#ffffff', .6));
  const grad = new THREE.DataTexture(new Uint8Array([60, 60, 60, 255, 150, 150, 150, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
  grad.minFilter = grad.magFilter = THREE.NearestFilter; grad.needsUpdate = true;
  const ink = new THREE.MeshBasicMaterial({ color: '#0a0608', side: THREE.BackSide });
  const LIFT = { peek: [.5, .1], calf: [.56, .3], knee: [.66, .55] }[spec.lift || 'peek'];
  const g = ghostModel(true, spec); g.position.y = LIFT[0]; g.rotation.y = spec.turn != null ? spec.turn : .25;
  g.children.slice(0, 2).forEach(m => {
    const geo = m.geometry.clone(), p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i); if (y > .62) continue;
      const a = Math.atan2(x, z) - .3, front = Math.max(0, Math.cos(a)) ** 1.6, t = (.62 - y) / .62;
      p.setXYZ(i, x * (1 + front * t * .22), y + front * t * t * LIFT[1], z * (1 + front * t * .22) + front * t * .05); }
    geo.computeVertexNormals(); m.geometry = geo; });
  s.add(g);
  const toon = o => new THREE.MeshToonMaterial(Object.assign({ gradientMap: grad }, o));
  const bk = spec.boots || 'leopard', an = { leopard: 1, zebra: 1, pinkleo: 1 }[bk];
  const bootM = an ? toon({ color: '#ffffff', map: animalTexture(bk) }) : toon({ color: { white: '#f4f2ee', cherry: '#c8141e', black: '#1a1418', silver: '#c9ccd4', none: spec.sheet && !ANIMAL[spec.sheet] ? spec.sheet : '#f6f2ea' }[bk] || '#f4f2ee' });
  const legM = toon({ color: '#f6f2ea' }), heelM = toon({ color: '#141014' });
  const yaw = g.rotation.y;
  const add = (geo, m, x, y, z, rx = 0, rz = 0, sc) => { const o = new THREE.Mesh(geo, m); o.position.set(x * Math.cos(yaw) + z * Math.sin(yaw), y, -x * Math.sin(yaw) + z * Math.cos(yaw)); o.rotation.set(rx, yaw, rz); if (sc) o.scale.set(...sc); s.add(o); const e = new THREE.Mesh(geo, ink); e.position.copy(o.position); e.rotation.copy(o.rotation); e.scale.copy(o.scale).multiplyScalar(1.08); s.add(e); return o; };
  [[-.11, .03], [.11, -.03]].forEach(([x, z]) => {
    add(new THREE.CapsuleGeometry(.058, .4, 8, 20), legM, x, .62, z);
    if (bk === 'none') { add(new THREE.CapsuleGeometry(.06, .3, 8, 20), legM, x, .28, z); add(new THREE.BoxGeometry(.11, .05, .2), legM, x, .03, z + .05); return; }
    add(new THREE.CylinderGeometry(.078, .07, .4, 24), bootM, x, .25, z);
    add(new THREE.CylinderGeometry(.082, .082, .03, 24), bootM, x, .45, z);
    add(new THREE.BoxGeometry(.12, .06, .22), bootM, x, .04, z + .06);
    add(new THREE.ConeGeometry(.06, .14, 16), bootM, x, .04, z + .22, Math.PI / 2, 0, [1, 1, .5]);
    add(new THREE.CylinderGeometry(.02, .012, .1, 10), heelM, x, .05, z - .06);
  });
  r.render(s, cam);
  const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  if (bgK === 'gta') {
    const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, spec.sky || '#ff3d8e'); bg.addColorStop(.45, '#ff8a3d'); bg.addColorStop(.75, '#ffd23f'); bg.addColorStop(1, '#ffe9a8'); x.fillStyle = bg; x.fillRect(0, 0, W, H);
    x.fillStyle = '#ffe9a8'; x.beginPath(); x.arc(W * .5, H * .6, W * .3, Math.PI, 0); x.fill();
    x.fillStyle = spec.sky || '#ff3d8e'; for (let i = 0; i < 6; i++) x.fillRect(W * .2, H * .6 - W * .2 + i * W * .055, W * .6, W * .012 + i * 1.5);
    x.globalAlpha = .18; x.fillStyle = '#5a0a3a'; for (let yy = 0; yy < H; yy += 9) for (let xx = (yy / 9 % 2) * 4.5; xx < W; xx += 9) { x.beginPath(); x.arc(xx, yy, 1 + 2.4 * (yy / H), 0, 7); x.fill(); } x.globalAlpha = 1;
  } else if (bgK === 'studio') {
    const bg = x.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#efe4d2'); bg.addColorStop(1, '#d6c1a2'); x.fillStyle = bg; x.fillRect(0, 0, W, H);
    x.fillStyle = spec.sky || '#1638b8'; x.beginPath(); x.arc(W * .5, H * .44, W * .36, 0, 7); x.fill();
  }
  if (bgK !== 'none') { x.fillStyle = 'rgba(20,6,20,.45)'; x.beginPath(); x.ellipse(W * .5, H * .955, W * .22, H * .022, 0, 0, 7); x.fill(); }
  x.drawImage(r.domElement, 0, 0, W, H);
  if (bgK === 'gta') { x.lineWidth = W * .025; x.strokeStyle = '#0a0608'; x.strokeRect(x.lineWidth / 2, x.lineWidth / 2, W - x.lineWidth, H - x.lineWidth); x.lineWidth = W * .01; x.strokeStyle = '#fff'; x.strokeRect(W * .035, W * .035, W - W * .07, H - W * .07); }
  r.dispose(); r.forceContextLoss();
  return c.toDataURL('image/png');
}
export function ghostBoots(size = 420, kind = 'leopard') { return ghostMake({ boots: kind, lift: 'peek', bg: 'gta' }, size); }

/* ---------- studio renders of design icons we have no free photo of ---------- */
export function designRender(key, size = 500) {
  const W = size, H = Math.round(size * 1.15);
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); r.setSize(W, H); r.setPixelRatio(1.5);
  r.outputColorSpace = THREE.SRGBColorSpace; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
  const s = new THREE.Scene(), cam = new THREE.PerspectiveCamera(28, W / H, .1, 50);
  const key1 = new THREE.DirectionalLight('#fff4e8', 2.6); key1.position.set(2.5, 4, 3.5); s.add(key1);
  const rim = new THREE.DirectionalLight('#dfe8ff', 1.2); rim.position.set(-3, 2, -2); s.add(rim);
  s.add(new THREE.HemisphereLight('#ffffff', '#b8a890', .9));
  const g = new THREE.Group(); s.add(g);
  const P = (c, o = {}) => new THREE.MeshPhysicalMaterial(Object.assign({ color: c, roughness: .5 }, o));
  if (key === 'togo') {
    const m = P('#3e4a28', { roughness: .9, sheen: .6, sheenColor: new THREE.Color('#7f8a5a'), sheenRoughness: .6 });
    for (let i = 0; i < 5; i++) { const t = new THREE.Mesh(new THREE.CapsuleGeometry(.17, 1.1, 10, 32), m); t.rotation.z = Math.PI / 2; t.position.set(0, .2 + i * .02, .55 - i * .2); t.scale.set(1, 1, .9); g.add(t); }
    for (let i = 0; i < 5; i++) { const t = new THREE.Mesh(new THREE.CapsuleGeometry(.16, 1.05, 10, 32), m); t.rotation.z = Math.PI / 2; const a = .35 + i * .22; t.position.set(0, .3 + Math.sin(a) * (.35 + i * .17), -.35 - Math.cos(a) * .12 - i * .06); g.add(t); }
    cam.position.set(3.3, 2.1, 3.9); cam.lookAt(0, .42, 0);
  } else if (key === 'bocca') {
    const m = P('#b30f18', { roughness: .5, clearcoat: .2 });
    const lip = (top) => { const sh = new THREE.Shape(); const w = 1.1;
      if (top) { sh.moveTo(-w, 0); sh.bezierCurveTo(-w * .8, .35, -w * .35, .55, -.08, .42); sh.quadraticCurveTo(0, .38, .08, .42); sh.bezierCurveTo(w * .35, .55, w * .8, .35, w, 0); sh.quadraticCurveTo(0, -.06, -w, 0); }
      else { sh.moveTo(-w, 0); sh.quadraticCurveTo(0, .06, w, 0); sh.bezierCurveTo(w * .8, -.4, w * .4, -.55, 0, -.55); sh.bezierCurveTo(-w * .4, -.55, -w * .8, -.4, -w, 0); }
      const geo = new THREE.ExtrudeGeometry(sh, { depth: .5, bevelEnabled: true, bevelThickness: .18, bevelSize: .14, bevelSegments: 10, curveSegments: 40 }); geo.translate(0, 0, -.25); return new THREE.Mesh(geo, m); };
    const t = lip(true); t.position.set(0, .62, -.12); t.rotation.x = -.15; g.add(t);
    const b = lip(false); b.position.set(0, .6, .12); b.rotation.x = .1; g.add(b);
    cam.position.set(0, 1.2, 7.6); cam.lookAt(0, .5, 0);
  } else if (key === 'snoopy') {
    const shade = new THREE.Mesh(new THREE.SphereGeometry(.45, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), P('#a8461e', { roughness: .18, clearcoat: 1, side: THREE.DoubleSide })); shade.scale.set(1, .42, 1); shade.position.set(.08, .82, 0); shade.rotation.z = -.12; g.add(shade);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(.42, 48), new THREE.MeshBasicMaterial({ color: '#fff6e4' })); disc.rotation.x = Math.PI / 2; disc.rotation.y = -.12; disc.position.set(.08, .815, 0); g.add(disc);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.11, .13, .82, 32), P('#f2efe9', { roughness: .3, clearcoat: .6 })); stem.position.set(-.06, .4, 0); stem.rotation.z = .16; g.add(stem);
    const glow = new THREE.PointLight('#ffe2b0', 3, 2); glow.position.set(.1, .6, .2); s.add(glow);
    cam.position.set(1.4, 1.2, 2.4); cam.lookAt(0, .5, 0);
  } else if (key === 'panthella') {
    const chrome = P('#d9dbe0', { metalness: 1, roughness: .15 });
    const prof = []; for (let i = 0; i <= 30; i++) { const t = i / 30, y = t * 1.25; prof.push(new THREE.Vector2(.02 + .26 * Math.pow(1 - t, 6) + .012, y)); }
    const stem = new THREE.Mesh(new THREE.LatheGeometry(prof, 48), chrome); g.add(stem);
    const shade = new THREE.Mesh(new THREE.SphereGeometry(.4, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), P('#d41a14', { roughness: .2, clearcoat: 1, side: THREE.DoubleSide })); shade.position.y = 1.22; g.add(shade);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(.025, 16, 12), chrome); knob.position.y = 1.63; g.add(knob);
    cam.position.set(1.1, 1.0, 3.6); cam.lookAt(0, .82, 0);
  }
  const env = new THREE.PMREMGenerator(r); s.environment = env.fromScene(new (class extends THREE.Scene { constructor(){ super(); const l = new THREE.Mesh(new THREE.SphereGeometry(5, 16, 8), new THREE.MeshBasicMaterial({ color: '#cfcac0', side: THREE.BackSide })); this.add(l); const b = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ color: '#ffffff' })); b.position.set(0, 4, 0); b.rotation.x = Math.PI / 2; this.add(b); } })(), .04).texture;
  r.render(s, cam);
  const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  x.fillStyle = '#f2efe9'; x.fillRect(0, 0, W, H);
  const sh = x.createRadialGradient(W / 2, H * .9, 0, W / 2, H * .9, W * .45); sh.addColorStop(0, 'rgba(0,0,0,.22)'); sh.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = sh; x.fillRect(0, H * .75, W, H * .25);
  x.drawImage(r.domElement, 0, 0, W, H);
  env.dispose(); r.dispose(); r.forceContextLoss();
  return c.toDataURL('image/jpeg', .9);
}
