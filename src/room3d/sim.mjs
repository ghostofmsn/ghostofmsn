import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { ANIMAL, animalTexture } from './extras.mjs';

/* ---------- a Sims-ish 3D avatar from the closet: soft plastic skin, painted face, studio light ---------- */
let R = null;
function rr(size) { if (!R) { R = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }); R.outputColorSpace = THREE.SRGBColorSpace; R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.1; } R.setPixelRatio(1); return R; }
const shade = (h, k) => { const c = new THREE.Color(h); c.multiplyScalar(k); return c; };
function faceTex(s) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 512; const x = c.getContext('2d');
  x.clearRect(0, 0, 512, 512);
  /* blush */
  const bl = (cx) => { const g = x.createRadialGradient(cx, 330, 4, cx, 330, 60); g.addColorStop(0, 'rgba(255,90,120,.28)'); g.addColorStop(1, 'rgba(255,90,120,0)'); x.fillStyle = g; x.fillRect(cx - 60, 270, 120, 120); };
  bl(170); bl(342);
  /* eyes */
  [[190, 250], [322, 250]].forEach(([cx, cy], i) => {
    x.save(); x.beginPath(); x.ellipse(cx, cy, 34, 20, 0, 0, Math.PI * 2); x.fillStyle = '#fbf7f2'; x.fill(); x.clip();
    x.fillStyle = s.eye; x.beginPath(); x.arc(cx + (i ? -3 : 3), cy + 2, 17, 0, 7); x.fill();
    x.fillStyle = '#0a0606'; x.beginPath(); x.arc(cx + (i ? -3 : 3), cy + 2, 8, 0, 7); x.fill();
    x.fillStyle = '#fff'; x.beginPath(); x.arc(cx + (i ? -8 : -2), cy - 5, 4.5, 0, 7); x.fill(); x.restore();
    x.lineWidth = s.lash ? 6 : 3; x.strokeStyle = '#1a0e0e'; x.beginPath(); x.ellipse(cx, cy, 34, 20, 0, Math.PI * 1.05, Math.PI * 1.95); x.stroke();
    if (s.lash) { x.lineWidth = 3; for (let k = 0; k < 4; k++) { const a = Math.PI * (1.15 + k * .2), px = cx + Math.cos(a) * 34, py = cy + Math.sin(a) * 20; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(a) * 9 + (i ? -2 : 2), py + Math.sin(a) * 9 - 2); x.stroke(); } }
    /* brows */
    x.strokeStyle = s.brow; x.lineWidth = s.lash ? 7 : 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 34, cy - 40 + (i ? 4 : 0)); x.quadraticCurveTo(cx, cy - 56, cx + 34, cy - 38 - (i ? 0 : 4)); x.stroke();
  });
  /* nose */
  x.strokeStyle = 'rgba(80,40,30,.35)'; x.lineWidth = 4; x.beginPath(); x.moveTo(250, 300); x.quadraticCurveTo(244, 330, 256, 336); x.quadraticCurveTo(266, 336, 268, 330); x.stroke();
  /* lips */
  const lc = s.lips; x.fillStyle = lc; x.beginPath(); x.moveTo(214, 384); x.bezierCurveTo(232, 368, 248, 366, 256, 372); x.bezierCurveTo(264, 366, 280, 368, 298, 384); x.bezierCurveTo(280, 404, 232, 404, 214, 384); x.fill();
  x.strokeStyle = 'rgba(60,10,20,.5)'; x.lineWidth = 2.5; x.beginPath(); x.moveTo(216, 384); x.quadraticCurveTo(256, 390, 296, 384); x.stroke();
  x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.ellipse(250, 393, 14, 4, 0, 0, 7); x.fill();
  /* facial hair */
  if (s.fh === 'stubble' || s.fh === 'beard') { x.fillStyle = s.fh === 'beard' ? s.hair : 'rgba(40,25,20,.35)'; for (let i = 0; i < (s.fh === 'beard' ? 2200 : 900); i++) { const a = Math.random() * Math.PI, r = 150 + Math.random() * 40; const px = 256 + Math.cos(a) * r * .9, py = 330 + Math.sin(a) * r * .75; if (py > 340 && !(py > 362 && py < 408 && Math.abs(px - 256) < 50)) x.fillRect(px, py, 3, 3); } }
  if (s.fh === 'moustache') { x.fillStyle = s.hair; x.beginPath(); x.ellipse(256, 360, 46, 10, 0, 0, 7); x.fill(); }
  if (s.freckles) { x.fillStyle = 'rgba(120,60,40,.45)'; for (let i = 0; i < 40; i++) x.beginPath(), x.arc(170 + Math.random() * 172 + (Math.random() < .5 ? -10 : 10), 300 + Math.random() * 40, 2.5, 0, 7), x.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
export function simAvatar(s, size = 512, mode = 'full') {
  const r = rr(); r.setSize(size, mode === 'full' ? size * 1.25 : size);
  const sc = new THREE.Scene();
  const W = { slim: [.95, .9], soft: [1.18, 1.18], straight: [1.02, .95], broad: [1.22, 1.0] }[s.body || 'slim'];
  const M = (c, o = {}) => { const an = ANIMAL[String(c).toLowerCase()]; return new THREE.MeshPhysicalMaterial(Object.assign({ color: an ? '#ffffff' : c, roughness: .55, clearcoat: .15, sheen: .3, sheenColor: new THREE.Color('#fff') }, o, an ? { map: animalTexture(an), sheen: .1 } : {})); };
  const skin = M(s.skin, { roughness: .45, clearcoat: .35, clearcoatRoughness: .5, sheen: .6, sheenColor: shade(s.skin, 1.2) });
  const hairM = M(s.hair, { roughness: .35, clearcoat: .6, sheen: 1, sheenColor: shade(s.hair, 1.6) });
  const top = M(s.top, { roughness: .8 }), bot = M(s.bottom, { roughness: .75 }), shoe = M(s.shoes, { roughness: .4, clearcoat: .6 });
  const cap = (rad, len, m) => new THREE.Mesh(new THREE.CapsuleGeometry(rad, len, 8, 24), m);
  const g = new THREE.Group(); sc.add(g);
  const at = (o, x, y, z, rx = 0, ry = 0, rz = 0) => { o.position.set(x, y, z); o.rotation.set(rx, ry, rz); g.add(o); return o; };
  /* legs + skirt/pants */
  const skirt = /mini|maxi/.test(s.bottomK);
  [-1, 1].forEach(k => { at(cap(.075 * W[1], .64, skirt ? skin : bot), k * .095 * W[1], .48, 0); at(new THREE.Mesh(new RoundedBoxGeometry(.15, .09, .27, 3, .035), shoe), k * .095 * W[1], .06, .04); });
  if (skirt) at(new THREE.Mesh(new THREE.CylinderGeometry(.14 * W[1], .24 * W[1], s.bottomK === 'maxi' ? .78 : .32, 32, 1, true), M(s.bottom, { side: THREE.DoubleSide })), 0, s.bottomK === 'maxi' ? .55 : .78, 0);
  else at(cap(.15 * W[1], .14, bot), 0, .9, 0).scale.set(1, 1, .72);
  const sleeve = /tube|halter|corset/.test(s.topK) ? skin : top; const sleeve0 = () => sleeve;
  /* torso */
  const torso = at(cap(.185 * W[0], .28, top), 0, 1.2, 0); torso.scale.set(1, 1, .66);
  if (s.topK === 'tube' || s.topK === 'halter' || s.topK === 'corset') { at(cap(.155 * W[0], .12, skin), 0, 1.36, 0).scale.set(1, 1, .6); }
  at(new THREE.Mesh(new THREE.CylinderGeometry(.055, .062, .12, 20), skin), 0, 1.48, 0);
  [-1, 1].forEach(k => at(new THREE.Mesh(new THREE.SphereGeometry(.07 * W[0], 20, 14), sleeve0()), k * .2 * W[0], 1.37, 0));
  /* arms */
  
  [-1, 1].forEach(k => { at(cap(.056, .24, sleeve), k * .245 * W[0], 1.24, 0, 0, 0, k * .16); at(cap(.048, .24, skin), k * .285 * W[0], .98, .03, -.12, 0, k * .08); at(new THREE.Mesh(new THREE.SphereGeometry(.052, 16, 12), skin), k * .3 * W[0], .82, .05); });
  if (s.outer) { [-1, 1].forEach(k => at(cap(.052, .27, M(s.outer)), k * .218 * W[0], 1.24, 0, 0, 0, k * .14)); const jk = at(cap(.172 * W[0], .3, M(s.outer, { side: THREE.DoubleSide })), 0, 1.2, -.01); jk.scale.set(1, 1, .64); }
  /* head */
  const HY = 1.68, HR = .158;
  const head = at(new THREE.Mesh(new THREE.SphereGeometry(HR, 48, 32), skin), 0, HY, 0); head.scale.set(.92, 1.08, .95);
  const face = new THREE.Mesh(new THREE.SphereGeometry(HR * 1.004, 48, 32, Math.PI / 2 - .95, 1.9, .55, 1.6), new THREE.MeshStandardMaterial({ map: faceTex(s), transparent: true, roughness: .5 })); at(face, 0, HY, 0).scale.set(.92, 1.08, .95);
  [-1, 1].forEach(k => at(new THREE.Mesh(new THREE.SphereGeometry(.028, 16, 12), skin), k * HR * .93, HY - .01, -.01).scale.set(.5, 1, .8));
  /* hair */
  const hcap = at(new THREE.Mesh(new THREE.SphereGeometry(HR * 1.07, 48, 24, 0, Math.PI * 2, 0, s.hairdo === 'buzz' ? 1.05 : 1.62), hairM), 0, HY + .012, -.02, -.42); hcap.scale.set(.96, 1.1, 1.02);
  const hd = s.hairdo;
  if (hd === 'long' || hd === 'bob') { const len = hd === 'long' ? .42 : .2; const back = at(new THREE.Mesh(new THREE.CylinderGeometry(HR * 1.04, HR * (hd === 'long' ? 1.3 : 1.18), len, 40, 1, true, Math.PI * .3, Math.PI * 1.4), M(s.hair, { side: THREE.DoubleSide, roughness: .35, clearcoat: .6 })), 0, HY - len / 2 + .02, -.01); back.scale.z = .95; }
  if (hd === 'buns') [-1, 1].forEach(k => at(new THREE.Mesh(new THREE.SphereGeometry(.06, 24, 16), hairM), k * .11, HY + .15, -.03));
  if (hd === 'pigtails') [-1, 1].forEach(k => at(cap(.045, .2, hairM), k * .18, HY - .1, -.03, 0, 0, k * .3));
  if (hd === 'curls') for (let i = 0; i < 46; i++) { const a = Math.random() * Math.PI * 2, b = Math.random() * 1.6; const p = new THREE.Vector3(Math.sin(b) * Math.cos(a), Math.cos(b) * .9, Math.sin(b) * Math.sin(a)); if (p.z > .55 && p.y < .4) continue; at(new THREE.Mesh(new THREE.SphereGeometry(.045 + Math.random() * .02, 12, 10), hairM), p.x * HR * 1.15, HY + p.y * HR * 1.15 - .02, p.z * HR * 1.1 - .02); }
  if (hd === 'spikes') for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; const cn = at(new THREE.Mesh(new THREE.ConeGeometry(.03, .11, 10), hairM), Math.cos(a) * .09, HY + .15, Math.sin(a) * .08 - .01); cn.rotation.set(Math.sin(a) * .6, 0, -Math.cos(a) * .6); }
  if (s.glasses) [-1, 1].forEach(k => { const f = at(new THREE.Mesh(new THREE.TorusGeometry(.033, .006, 8, 24), M('#111')), k * .055, HY + .012, HR * .95); f.scale.set(1.2, 1, 1); });
  if (s.hoops) [-1, 1].forEach(k => at(new THREE.Mesh(new THREE.TorusGeometry(.025, .004, 8, 24), M('#e8c45a', { metalness: 1, roughness: .2 })), k * HR * .95, HY - .07, 0, 0, Math.PI / 2, 0));
  g.rotation.y = -.25;
  /* light it like a create-a-sim screen */
  sc.add(new THREE.HemisphereLight('#eef4ff', '#6a5a7a', 1.3));
  const key = new THREE.DirectionalLight('#fff4ea', 2.4); key.position.set(1.5, 3, 3); sc.add(key);
  const rim = new THREE.DirectionalLight('#b8d8ff', 1.6); rim.position.set(-2, 2, -2); sc.add(rim);
  const cam = new THREE.PerspectiveCamera(mode === 'full' ? 26 : 26, mode === 'full' ? 1 / 1.25 : 1, .1, 20);
  if (mode === 'full') { cam.position.set(.3, 1.2, 4.2); cam.lookAt(0, .98, 0); } else { cam.position.set(.12, 1.72, 1.2); cam.lookAt(0, 1.66, 0); }
  r.setClearColor(0x000000, 0); r.render(sc, cam);
  const url = r.domElement.toDataURL('image/png');
  sc.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); } });
  return url;
}

/* ---------- the abyss: a museum you fall into, rings of forgotten and imagined pieces ---------- */
export function abyss(host, items, opts = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#040306'); scene.fog = new THREE.FogExp2('#040306', .05);
  const cam = new THREE.PerspectiveCamera(70, 1, .1, 200);
  const texCache = {}, tex = src => { if (texCache[src]) return texCache[src]; const t = new THREE.Texture(); const im = new Image(); im.onload = () => { t.image = im; t.colorSpace = THREE.SRGBColorSpace; t.needsUpdate = true; t.userData.a = im.width / im.height; }; im.src = src; return texCache[src] = t; };
  const rings = [], tiles = [];
  const shells = [[8, 30, 9, .9], [13, 46, 11, 1.25], [20, 64, 13, 1.7]];
  let idx = 0;
  shells.forEach(([R, cols, rows, sz], si) => {
    const ring = new THREE.Group(); scene.add(ring); rings.push(ring);
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      if (Math.random() < .12 + si * .05) continue;
      const it = items[(idx++ * 7 + si * 3) % items.length], a = c / cols * Math.PI * 2 + (r % 2) * (Math.PI / cols), y = (r - rows / 2) * sz * 1.15;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(sz, sz), new THREE.MeshBasicMaterial({ map: tex(it.img), transparent: true, opacity: .92, side: THREE.DoubleSide }));
      m.position.set(Math.sin(a) * R, y, Math.cos(a) * R); m.lookAt(0, y * .6, 0);
      m.userData = { it, base: m.position.clone(), ph: Math.random() * 6 };
      if (it.imagined) { const e = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(sz * 1.06, sz * 1.06)), new THREE.LineBasicMaterial({ color: '#ff3dd4' })); m.add(e); }
      ring.add(m); tiles.push(m);
    }
  });
  const N = 2500, pos = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const a = Math.random() * 6.28, R = 4 + Math.random() * 30; pos.set([Math.sin(a) * R, (Math.random() - .5) * 40, Math.cos(a) * R], i * 3); }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: '#c9b6ff', size: .05, transparent: true, opacity: .6 })); scene.add(dust);
  /* the focus: one piece pulled out of the dark */
  const focus = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })); scene.add(focus);
  let yaw = 0, pitch = 0, yawT = 0, pitchT = 0, fall = 0, hovered = null, focused = null, running = false, drag = null;
  const el = renderer.domElement;
  host.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, yaw: yawT, pitch: pitchT, moved: 0 }; });
  addEventListener('pointerup', () => setTimeout(() => drag = null, 0));
  const ray = new THREE.Raycaster(), v = new THREE.Vector2();
  const pick = e => { const r = el.getBoundingClientRect(); v.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); ray.setFromCamera(v, cam); const h = ray.intersectObjects(tiles, false)[0]; return h ? h.object : null; };
  host.addEventListener('pointermove', e => { if (drag) { const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.moved = Math.max(drag.moved, Math.abs(dx) + Math.abs(dy)); yawT = drag.yaw - dx * .005; pitchT = Math.max(-.7, Math.min(.7, drag.pitch - dy * .004)); return; } const h = pick(e); if (h !== hovered) { hovered = h; el.style.cursor = h ? 'pointer' : 'grab'; opts.hover && opts.hover(h ? h.userData.it : null); } });
  host.addEventListener('wheel', e => { e.preventDefault(); fall += e.deltaY * .01; }, { passive: false });
  el.addEventListener('click', e => { if (drag && drag.moved > 6) return; const h = pick(e); if (h) show(h.userData.it); });
  function show(it) { focused = it; focus.material.map = tex(it.img); focus.material.needsUpdate = true; focus.material.opacity = 0; const a = focus.material.map.userData.a || 1; focus.scale.set(a > 1 ? 1 : a, a > 1 ? 1 / a : 1, 1); opts.focus && opts.focus(it); }
  function resize() { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.fov = w < h ? 85 : 70; cam.updateProjectionMatrix(); }
  addEventListener('resize', resize);
  const clock = new THREE.Clock(), dir = new THREE.Vector3();
  function frame() {
    if (!running) return; requestAnimationFrame(frame); const t = clock.getElapsedTime();
    yaw += (yawT - yaw) * .06; pitch += (pitchT - pitch) * .06;
    cam.position.set(0, Math.sin(fall * .1) * 2, 0); cam.rotation.set(pitch, yaw, 0, 'YXZ');
    rings.forEach((r, i) => { r.rotation.y = t * (i % 2 ? -.012 : .018) + fall * .02 * (i + 1); });
    dust.rotation.y = t * .01;
    tiles.forEach(m => { const on = m === hovered; m.position.y = m.userData.base.y + Math.sin(t * .6 + m.userData.ph) * .08; const s = on ? 1.25 : 1; m.scale.lerp(new THREE.Vector3(s, s, s), .15); m.material.opacity = on ? 1 : .88; });
    if (focused) { cam.getWorldDirection(dir); focus.position.copy(cam.position).addScaledVector(dir, 3.2); focus.quaternion.copy(cam.quaternion); focus.material.opacity += (1 - focus.material.opacity) * .12; } else focus.material.opacity *= .85;
    renderer.render(scene, cam);
  }
  return { start() { if (running) return; running = true; resize(); frame(); }, stop() { running = false; }, close() { focused = null; }, show, dispose() { running = false; renderer.dispose(); el.remove(); } };
}
