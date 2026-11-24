import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { ghostModel } from './extras.mjs';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* GoMsn's room, in three dimensions. every object is a door. */
export function init(host, opts = {}) {
  const narrow = () => innerWidth < innerHeight * 1.1;
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement); renderer.domElement.id = 'r3d';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#140a12');
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture; scene.environmentIntensity = .35;
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);

  /* ---------- helpers ---------- */
  const T = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); fn(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.userData.ctx = x; return t; };
  const M = (color, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: .7, metalness: 0 }, o));
  const sh = m => { m.castShadow = true; m.receiveShadow = true; return m; };
  const box = (w, h, d, m, r = .02) => sh(new THREE.Mesh(r ? new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2)) : new THREE.BoxGeometry(w, h, d), m));
  const cyl = (rt, rb, h, m, s = 28) => sh(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s), m));
  const sph = (r, m, s = 32) => sh(new THREE.Mesh(new THREE.SphereGeometry(r, s, s / 2), m));
  const plane = (w, h, m) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); p.receiveShadow = true; return p; };
  const at = (o, x, y, z, ry = 0, rx = 0, rz = 0) => { o.position.set(x, y, z); o.rotation.set(rx, ry, rz); return o; };
  const DOORS = [];
  const door = (go, parent = scene, w) => { const g = new THREE.Group(); g.userData.go = go; if (w) g.userData.w = w; parent.add(g); DOORS.push(g); return g; };
  const add = (g, ...o) => { o.forEach(x => g.add(x)); return o[0]; };
  const serif = '"Instrument Serif", Georgia, serif', mono = '"Space Mono", monospace', grot = '"Space Grotesk", Arial, sans-serif';

  /* ---------- the shell: small, round-cornered, plaster and mosaic. space-age, but calm ---------- */
  const W = 8.6, D = 6.4, H = 3.2;
  const plaster = (base) => T(1024, 1024, (x, w, h) => { x.fillStyle = base; x.fillRect(0, 0, w, h); for (let i = 0; i < 900; i++) { const px = Math.random() * w, py = Math.random() * h, r = 20 + Math.random() * 120; const g = x.createRadialGradient(px, py, 0, px, py, r); const l = Math.random() < .5 ? 'rgba(255,255,255,.05)' : 'rgba(90,60,30,.045)'; g.addColorStop(0, l); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(px - r, py - r, r * 2, r * 2); } for (let i = 0; i < 160; i++) { x.strokeStyle = 'rgba(255,255,255,.06)'; x.lineWidth = 2 + Math.random() * 6; x.beginPath(); const px = Math.random() * w, py = Math.random() * h; x.arc(px, py, 40 + Math.random() * 140, Math.random() * 6, Math.random() * 6 + 1.4); x.stroke(); } });
  const wpB = plaster('#d9c4a6'); wpB.wrapS = wpB.wrapT = THREE.RepeatWrapping; wpB.repeat.set(2, 1);
  const wpL = plaster('#d4bd9c'); wpL.wrapS = wpL.wrapT = THREE.RepeatWrapping; wpL.repeat.set(1.6, 1);
  const mosaic = T(1024, 1024, (x, w, h) => { const n = 8, zz = w / n / 2; x.fillStyle = '#efe6d6'; x.fillRect(0, 0, w, h); x.fillStyle = '#141114';
    for (let r = -1; r < n * 2 + 2; r += 2) { x.beginPath(); for (let i = 0; i <= n * 2; i++) { const X = i * zz, Y = r * zz + (i % 2 ? zz : 0); i ? x.lineTo(X, Y) : x.moveTo(X, Y); } for (let i = n * 2; i >= 0; i--) { const X = i * zz, Y = (r + 1) * zz + (i % 2 ? zz : 0); x.lineTo(X, Y); } x.closePath(); x.fill(); }
    x.globalAlpha = .06; for (let i = 0; i < 6000; i++) { x.fillStyle = Math.random() < .5 ? '#000' : '#fff'; x.fillRect(Math.random() * w, Math.random() * h, 2, 2); } x.globalAlpha = 1; });
  mosaic.wrapS = mosaic.wrapT = THREE.RepeatWrapping; mosaic.repeat.set(3.4, 3.2);
  const floor = at(plane(W, D + 3, M('#ffffff', { map: mosaic, roughness: .35 })), 0, 0, 1.5, 0, -Math.PI / 2); scene.add(floor);
  const wallM = M('#fff', { map: wpB, roughness: .95 }), wallL = M('#fff', { map: wpL, roughness: .95 });
  const back = at(box(W + .3, H, .2, wallM, 0), 0, H / 2, -D / 2 - .1); scene.add(back);
  const left = at(box(.2, H, D + 3, wallL, 0), -W / 2 - .1, H / 2, 1.5); scene.add(left);
  const right = at(box(.2, H, D + 3, wallL, 0), W / 2 + .1, H / 2, 1.5); scene.add(right);
  const ceilT = plaster('#e6d6bd');
  const ceil = at(plane(W + .4, D + 4, M('#fff', { map: ceilT, roughness: 1, side: THREE.DoubleSide })), 0, H, 1.5, 0, Math.PI / 2); ceil.receiveShadow = false; scene.add(ceil);
  /* coved corners: soft rounded seams so the room feels like one piece of clay */
  const cove = M('#d6c1a2', { roughness: .95 });
  [[-W / 2, -D / 2]].forEach(() => {});
  scene.add(at(cyl(.22, .22, H, cove, 24), -W / 2, H / 2, -D / 2), at(cyl(.22, .22, H, cove, 24), W / 2, H / 2, -D / 2));
  scene.add(at(box(W, .06, .06, M('#c9b18e'), .02), 0, .03, -D / 2 + .03));
  /* red velvet curtains: the lodge is never far */
  const velT = T(512, 64, (x, w, h) => { for (let i = 0; i < w; i++) { const k = Math.sin(i / w * Math.PI * 16); x.fillStyle = `hsl(355,82%,${18 + (k * .5 + .5) * 16}%)`; x.fillRect(i, 0, 1, h); } });
  velT.wrapS = THREE.RepeatWrapping;
  const drape = (len, x0, z0, axis) => { const geo = new THREE.PlaneGeometry(len, H - .06, Math.round(len * 40), 1); const pa = geo.attributes.position; for (let i = 0; i < pa.count; i++) pa.setZ(i, Math.sin(pa.getX(i) * 29) * .045); geo.computeVertexNormals(); const t = velT.clone(); t.repeat.set(len / 1.1, 1); t.needsUpdate = true;
    const m = new THREE.Mesh(geo, M('#fff', { map: t, roughness: .9, side: THREE.DoubleSide })); m.receiveShadow = true; scene.add(m);
    if (axis === 'z') at(m, x0, (H - .06) / 2, z0 + len / 2, Math.PI / 2); else at(m, x0 + len / 2, (H - .06) / 2, z0); return m; };
  drape(D + 2.6, -W / 2 + .12, -D / 2 + .05, 'z'); drape(1.2, -W / 2 + .05, -D / 2 + .1, 'x'); drape(1.0, W / 2 - 1.05, -D / 2 + .1, 'x');
  /* recessed ceiling discs, like a 70s lab */
  [[-1.8, -1.2], [0, -1.6], [1.8, -1.2], [-1.2, .6], [1.2, .6]].forEach(([x, z]) => { const d = new THREE.Mesh(new THREE.CircleGeometry(.42, 48), new THREE.MeshBasicMaterial({ color: '#fff3dc' })); at(d, x, H - .005, z, 0, Math.PI / 2); scene.add(d); const ring = sh(new THREE.Mesh(new THREE.TorusGeometry(.44, .03, 10, 48), M('#cdb79a'))); at(ring, x, H - .02, z, 0, Math.PI / 2); scene.add(ring); });

  /* ---------- lights ---------- */
  scene.add(new THREE.HemisphereLight('#fff1dc', '#3a2418', .9));
  const sun = new THREE.DirectionalLight('#ffe6c4', 1.2); sun.position.set(0, 2.2, -6); sun.castShadow = true;
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 20 }); sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -.0004; sun.shadow.radius = 5;
  scene.add(sun);
  const fill = new THREE.DirectionalLight('#ffd9b0', .6); fill.position.set(2, 4, 6); scene.add(fill);
  const pl = (c, i, d, x, y, z) => { const l = new THREE.PointLight(c, i, d, 2); l.position.set(x, y, z); scene.add(l); return l; };
  const red = M('#c8141e', { roughness: .25, metalness: .05 }), blue = M('#1638b8', { roughness: .3, metalness: .05 }), chrome = M('#e8e8ea', { metalness: 1, roughness: .12 });
  const velB = M('#1b3aa8', { roughness: .95 }), velR = M('#b5121c', { roughness: .95 });

  /* ---------- the window: a round porthole, the sky outside follows your clock ---------- */
  const win = door('window');
  const sky = T(1024, 1024, () => {});
  const SKIES = [ // [hour, top, mid, low, horizon, sun?]
    [0, '#05061a', '#0d1033', '#1a1440', '#2a1a40', 'moon'], [5, '#1a1f4a', '#5a4a8a', '#e88aa0', '#ffc59a', 'dawn'], [7, '#6fb0ff', '#a9d4ff', '#ffe2c0', '#ffd7a0', 'sun'],
    [12, '#3d8fff', '#7fc0ff', '#cfeaff', '#e8f6ff', 'sun'], [17, '#4a7ad8', '#ff9a70', '#ffc070', '#ffe2a0', 'sun'], [19, '#2a1650', '#c8406e', '#ff8a5a', '#ffc070', 'dusk'], [21, '#0a0b2a', '#1a1648', '#3a1f58', '#4a2a50', 'moon'], [24, '#05061a', '#0d1033', '#1a1440', '#2a1a40', 'moon']];
  const lerpC = (a, b, k) => { const A = new THREE.Color(a), B = new THREE.Color(b); return '#' + A.lerp(B, k).getHexString(); };
  let skyMode = 'night';
  function drawSky(hr){
    let i = 0; while (i < SKIES.length - 2 && SKIES[i + 1][0] <= hr) i++; const a = SKIES[i], b = SKIES[i + 1], k = (hr - a[0]) / (b[0] - a[0]);
    const c = [1, 2, 3, 4].map(j => lerpC(a[j], b[j], k)); const kind = k < .5 ? a[5] : b[5]; skyMode = kind;
    const g = sky.userData.ctx, w = 1024, h = 1024;
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, c[0]); gr.addColorStop(.45, c[1]); gr.addColorStop(.75, c[2]); gr.addColorStop(1, c[3]); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    const night = kind === 'moon';
    if (night) { for (let s = 0; s < 260; s++) { g.fillStyle = `rgba(255,255,255,${.3 + Math.random() * .7})`; g.fillRect(Math.random() * w, Math.random() * h * .7, 2, 2); } g.fillStyle = '#fff6d8'; g.beginPath(); g.arc(700, 260, 70, 0, 7); g.fill(); g.fillStyle = c[0]; g.beginPath(); g.arc(670, 240, 66, 0, 7); g.fill(); }
    else { const sy = kind === 'sun' ? 260 + Math.abs(hr - 12.5) * 40 : 640; const sg = g.createRadialGradient(560, sy, 0, 560, sy, 240); sg.addColorStop(0, 'rgba(255,250,230,1)'); sg.addColorStop(.18, 'rgba(255,236,190,.95)'); sg.addColorStop(1, 'rgba(255,220,170,0)'); g.fillStyle = sg; g.fillRect(0, 0, w, h);
      for (let cl = 0; cl < 7; cl++) { const cx = (cl * 173 + hr * 37) % w, cy = 180 + (cl * 97 % 300); g.fillStyle = kind === 'sun' ? 'rgba(255,255,255,.75)' : 'rgba(255,200,210,.5)'; for (let p = 0; p < 6; p++) { g.beginPath(); g.arc(cx + p * 34, cy + Math.sin(p) * 12, 34 + (p % 3) * 12, 0, 7); g.fill(); } } }
    /* a garden horizon: soft hills, a cypress, a few trees */
    g.fillStyle = night ? '#0b1410' : kind === 'dusk' ? '#2a1a2a' : '#4a8a3a'; g.beginPath(); g.moveTo(0, 820); for (let x = 0; x <= w; x += 32) g.lineTo(x, 800 + Math.sin(x * .008) * 30 + Math.sin(x * .03) * 8); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    g.fillStyle = night ? '#060c08' : kind === 'dusk' ? '#1a1020' : '#2f6a2a'; [[160, 120], [300, 90], [820, 140], [920, 100]].forEach(([x, s]) => { g.beginPath(); g.ellipse(x, 800 - s * .6, s * .6, s, 0, 0, 7); g.fill(); });
    g.fillRect(880, 640, 18, 180); g.beginPath(); g.ellipse(889, 620, 26, 110, 0, 0, 7); g.fill();
    sky.needsUpdate = true;
    const L = { moon: ['#9fb0ff', .55, '#8aa0ff', .5, '#0a0b1a', 1.6], dawn: ['#ffd0c0', .85, '#ffb08a', 1.1, '#3a2030', 1.1], sun: ['#fff4e2', 1.15, '#fff0d6', 1.7, '#cfe6ff', .5], dusk: ['#ffc0a0', .85, '#ff9060', 1.3, '#3a1a20', 1.2] }[kind];
    scene.children.forEach(o => { if (o.isHemisphereLight) { o.color.set(L[0]); o.intensity = L[1]; } }); sun.color.set(L[2]); sun.intensity = L[3]; scene.background.set(L[4]); lampBoost = L[5];
  }
  let lampBoost = 1;
  const porthole = add(win, at(new THREE.Mesh(new THREE.CircleGeometry(1.0, 72), new THREE.MeshBasicMaterial({ map: sky, toneMapped: false })), 0, 0, .01));
  add(win, sh(new THREE.Mesh(new THREE.TorusGeometry(1.04, .07, 24, 96), chrome)));
  add(win, at(sh(new THREE.Mesh(new THREE.TorusGeometry(1.2, .12, 24, 96), M('#e6d4b8', { roughness: .9 }))), 0, 0, -.05));
  add(win, at(box(1.8, .05, .22, M('#e6d4b8', { roughness: .9 }), .02), 0, -1.05, .1));
  at(win, 0, 1.65, -D / 2 + .02);
  const winL = pl('#fff0d0', 2, 6, 0, 1.6, -1.6);

  /* ---------- the ghost: centre stage on a round blue rug, under the light ---------- */
  const rugT = T(1024, 1024, (g, w, h) => { g.fillStyle = '#1636b0'; g.beginPath(); g.arc(512, 512, 510, 0, 7); g.fill(); g.strokeStyle = '#c8141e'; g.lineWidth = 26; [430, 330, 230].forEach(r => { g.beginPath(); g.arc(512, 512, r, 0, 7); g.stroke(); }); g.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 3000; i++) g.fillRect(Math.random() * w, Math.random() * h, 2, 2); });
  const rug = at(new THREE.Mesh(new THREE.CircleGeometry(1.5, 72), M('#fff', { map: rugT, roughness: 1, transparent: true })), 0, .006, .6, 0, -Math.PI / 2); rug.receiveShadow = true; scene.add(rug);
  const ped = new THREE.Group(); scene.add(ped);
  add(ped, at(cyl(.46, .5, .1, chrome, 64), 0, .05, 0));
  at(ped, 0, 0, .6);
  const gh = door('chat:ghost');
  { const gm = ghostModel(); gm.scale.setScalar(.62); gm.traverse(m => { if (m.isMesh) m.castShadow = true; }); gh.add(gm); }
  gh.position.set(0, .1, .6);
  const ghL = new THREE.SpotLight('#fff2e0', 14, 6, .45, .6, 1.2); ghL.position.set(0, H - .1, 1.2); ghL.target = gh; scene.add(ghL);

  /* ---------- the sofa: blue velvet, all tubes and curves ---------- */
  const sofa = new THREE.Group(); scene.add(sofa);
  const tube = (r, len, m) => sh(new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 12, 32), m));
  add(sofa, at(box(2.4, .36, .95, velB, .17), 0, .2, 0), at(tube(.23, 2.0, velB), 0, .62, -.36, 0, 0, Math.PI / 2), at(tube(.23, .5, velB), -1.15, .5, 0, 0, Math.PI / 2), at(tube(.23, .5, velB), 1.15, .5, 0, 0, Math.PI / 2));
  [-.75, 0, .75].forEach(x => add(sofa, at(box(.72, .16, .7, M('#2448c0', { roughness: .95 }), .08), x, .44, .08)));
  /* red bolsters */
  [-.5, .35].forEach((x, i) => add(sofa, at(tube(.09, .45, velR), x, .62, .05, .3 + i * .5, 0, Math.PI / 2)));
  sofa.position.set(-2.6, 0, -.9); sofa.rotation.y = .45;
  const ball = door('arcade'); ball.visible = false;
  add(ball, sph(.13, M('#0a0a0a', { roughness: .08, metalness: .1 })));
  const eight = T(128, 128, (g) => { g.fillStyle = '#fff'; g.beginPath(); g.arc(64, 64, 60, 0, 7); g.fill(); g.fillStyle = '#000'; g.font = 'bold 80px ' + grot; g.textAlign = 'center'; g.fillText('8', 64, 92); });
  add(ball, at(new THREE.Mesh(new THREE.CircleGeometry(.06, 24), new THREE.MeshStandardMaterial({ map: eight, roughness: .2 })), .07, .06, .09, .75, -.4));
  ball.position.set(-2.1, .66, -.5);
  const gTex = T(256, 128, (g) => { g.fillStyle = '#f4ede0'; g.fillRect(0, 0, 256, 128); g.fillStyle = '#c8141e'; g.font = 'italic 64px ' + serif; g.textAlign = 'center'; g.fillText('GoMsn', 128, 84); });
  const cush = new THREE.Group(); scene.add(cush);
  add(cush, box(.5, .4, .12, M('#f4ede0', { roughness: 1 }), .06), at(plane(.44, .26, M('#fff', { map: gTex, roughness: 1 })), 0, 0, .062));
  at(cush, -2.8, .66, -1.05, .45, -.2);

  /* ---------- the table: red lacquer tulip, with her things ---------- */
  const tbl = new THREE.Group(); scene.add(tbl);
  add(tbl, at(cyl(.62, .62, .05, red, 64), 0, .52, 0), at(cyl(.07, .32, .5, red, 40), 0, .25, 0), at(cyl(.36, .36, .02, red, 48), 0, .01, 0));
  tbl.position.set(2.4, 0, .25);
  const tw = door('letters');
  const mint = M('#9fd8c8', { roughness: .35, metalness: .1 });
  add(tw, at(box(.56, .14, .4, mint, .05), 0, .07, 0), at(box(.6, .07, .12, mint, .035), 0, .17, -.15));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) add(tw, at(cyl(.018, .018, .02, M('#1a1a1a', { roughness: .3 }), 12), -.2 + c * .05, .15 + r * .006, .06 + r * .05, 0, .25));
  const paper = T(256, 256, (g) => { g.fillStyle = '#fbf8f0'; g.fillRect(0, 0, 256, 256); g.fillStyle = '#333'; g.font = '22px ' + mono; ['dear you,', 'you are', 'entering.'].forEach((s, i) => g.fillText(s, 20, 50 + i * 30)); });
  add(tw, at(plane(.32, .3, M('#fff', { map: paper, side: THREE.DoubleSide })), 0, .33, -.17, 0, -.25));
  tw.position.set(2.25, .545, .35); tw.rotation.y = -.5; tw.scale.setScalar(.8);
  const cam = door('dash');
  add(cam, at(box(.3, .18, .12, M('#151515', { roughness: .4 }), .03), 0, .09, 0), at(cyl(.06, .065, .1, M('#222', { roughness: .2, metalness: .5 })), 0, .09, .1, 0, Math.PI / 2));
  add(cam, at(new THREE.Mesh(new THREE.CircleGeometry(.045, 24), new THREE.MeshStandardMaterial({ color: '#2a4a8a', roughness: .05, metalness: .6 })), 0, .09, .151));
  cam.position.set(2.7, .545, .05); cam.rotation.y = -.9; cam.scale.setScalar(.85);
  const misc = new THREE.Group(); scene.add(misc);
  add(misc, at(cyl(.05, .06, .15, M('#ff8fc0', { roughness: .05, transparent: true, opacity: .75, metalness: .1 })), 2.65, .62, .55), at(cyl(.025, .025, .04, M('#d9b45a', { metalness: .9, roughness: .2 })), 2.65, .715, .55));
  const books = door('profile:theghost');
  [['IN PRAISE OF SHADOWS', '#2b2b2b', '#e8d9b0'], ['THE FUTURE OF NOSTALGIA', '#c8443a', '#fff'], ['GHOSTS OF MY LIFE', '#e9e3d4', '#222'], ['OUT OF PLACE', '#1f4d7a', '#f3e6c4'], ['SITT MARIE ROSE', '#e8b84a', '#222']].forEach(([s, bg, fg], i) => {
    const t = T(512, 64, (g) => { g.fillStyle = bg; g.fillRect(0, 0, 512, 64); g.fillStyle = fg; g.font = 'bold 26px ' + grot; g.textAlign = 'center'; g.fillText(s, 256, 42); });
    const b = new THREE.Group(); books.add(b); const h = .07 + (i % 3) * .015;
    add(b, box(.55 - i * .02, h, .38, M(bg, { roughness: .8 }), .008), at(plane(.53 - i * .02, h * .9, M('#fff', { map: t })), 0, 0, .191));
    at(b, 0, .04 + i * .085, 0, (i % 2 ? .12 : -.08) + i * .03);
  });
  at(books, 2.05, .545, .0, .4); books.scale.setScalar(.45);
  /* blue dome pendant over the table */
  const pend = new THREE.Group(); scene.add(pend);
  const dome = add(pend, sh(new THREE.Mesh(new THREE.SphereGeometry(.34, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), M('#1638b8', { roughness: .25, side: THREE.DoubleSide }))));
  const bulb = add(pend, at(sph(.09, new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#fff1d0', emissiveIntensity: 2 })), 0, -.02, 0)); bulb.userData.glow = 1; bulb.castShadow = false;
  add(pend, at(cyl(.006, .006, 1.4, M('#111')), 0, .9, 0)); at(pend, 2.4, 2.1, .25); const pendL = pl('#fff0d0', 4, 4, 2.4, 1.8, .25);
  const chair = new THREE.Group(); scene.add(chair);
  const leather = M('#b5121c', { roughness: .45 });
  add(chair, at(box(.5, .05, .48, leather, .02), 0, .46, 0), at(box(.48, .4, .04, leather, .02), 0, .72, -.24, -.12));
  [[-.25, 0], [.25, 0]].forEach(([x]) => { add(chair, at(cyl(.015, .015, .46, chrome, 10), x, .23, .22), at(cyl(.015, .015, .5, chrome, 10), x, .02, 0, 0, Math.PI / 2), at(cyl(.015, .015, .5, chrome, 10), x, .7, -.26)); });
  at(chair, 1.6, 0, -1.75, -.5);

  /* ---------- the computer: on a white curved console, back right ---------- */
  const deskM = M('#f1ebe0', { roughness: .35 }), beige = M('#e3d6bb', { roughness: .55 }), beige2 = M('#cfc0a2', { roughness: .6 });
  const desk = new THREE.Group(); scene.add(desk);
  add(desk, at(box(1.9, .08, .8, deskM, .04), 0, .74, 0), at(cyl(.38, .38, .74, deskM, 40), -.5, .37, 0), at(cyl(.38, .38, .74, deskM, 40), .5, .37, 0)); desk.children[1].scale.z = .8; desk.children[2].scale.z = .8;
  at(desk, 2.75, 0, -2.5, -.3);
  const pc = door('msn');
  add(pc, at(box(1.0, .86, .78, beige, .07), 0, .45, 0), at(box(.7, .6, .45, beige2, .1), 0, .43, -.5));
  add(pc, at(box(.92, .1, .5, beige2, .04), 0, .03, .05));
  const bez = add(pc, at(box(.92, .75, .04, M('#d9cbae', { roughness: .5 }), .03), 0, .47, .39));
  add(pc, at(box(.8, .63, .02, M('#111', { roughness: .2 }), .01), 0, .47, .405));
  add(pc, at(new THREE.Mesh(new THREE.CircleGeometry(.018, 16), new THREE.MeshBasicMaterial({ color: '#4dff7a' })), .38, .14, .413));
  /* sticky notes on the bezel */
  [['u up?', '#ffe66b', -.4, .74, .2], ['call mum', '#ff9ec7', .43, .7, -.25]].forEach(([s, c, x, y, r]) => {
    const t = T(128, 128, (g) => { g.fillStyle = c; g.fillRect(0, 0, 128, 128); g.fillStyle = '#222'; g.font = '26px ' + mono; g.fillText(s, 10, 60); });
    add(pc, at(plane(.13, .13, M('#fff', { map: t })), x, y, .414, 0, 0, r));
  });
  const face = T(512, 384, () => {});
  const scrGeo = new THREE.PlaneGeometry(.78, .6, 40, 30); const base = scrGeo.attributes.position.array.slice();
  const screen = add(pc, at(new THREE.Mesh(scrGeo, new THREE.MeshBasicMaterial({ map: face, toneMapped: false })), 0, .47, .418));
  pc.position.set(2.62, .78, -2.45); pc.rotation.y = -.3;
  /* keyboard, mouse, tower */
  const kb = add(pc, at(box(.82, .04, .26, beige, .015), 0, .02, .72, 0, .06));
  for (let r = 0; r < 4; r++) for (let c = 0; c < 13; c++) add(pc, at(box(.05, .02, .045, beige2, .006), -.36 + c * .06, .05, .64 + r * .055, 0, .06));
  add(pc, at(box(.09, .035, .14, beige, .03), .62, .02, .72));
  
  const scrLight = pl('#ff3a6a', 2.2, 3.5, 2.5, 1.3, -1.9);

  let look = { x: 0, y: 0 }, hoverPC = 0, bulgeT = 0;
  const TVL = opts.tvLines || ['come closer', "they're all online", 'touch the screen', "don't be shy", 'appear offline? cute.', 'long live the new flesh', 'click. i dare you.', "it's warmer in here"];
  let line = TVL[0], li = 0, typed = 0, lineT = 0;
  function drawFace(t) {
    const g = face.userData.ctx, w = 512, h = 384;
    const rg = g.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, 330); rg.addColorStop(0, '#7a1430'); rg.addColorStop(1, '#14030a');
    g.fillStyle = rg; g.fillRect(0, 0, w, h);
    const talking = typed < line.length, open = talking ? (Math.sin(t * 28) * .5 + .5) * (.5 + Math.random() * .5) : .05;
    /* eyes */
    [[160, 120], [352, 120]].forEach(([x, y]) => {
      g.save(); g.beginPath(); g.ellipse(x, y, 58, 26, 0, 0, Math.PI * 2); g.fillStyle = '#f6d9dc'; g.fill(); g.clip();
      const px = x + look.x * 22, py = y + look.y * 10; g.fillStyle = '#3a1a10'; g.beginPath(); g.arc(px, py, 20, 0, 7); g.fill();
      g.fillStyle = '#000'; g.beginPath(); g.arc(px, py, 9, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(px - 6, py - 7, 4, 0, 7); g.fill();
      const blink = (t % 4.7) < .12 ? 1 : 0; if (blink) { g.fillStyle = '#5a1020'; g.fillRect(x - 60, y - 30, 120, 60); } g.restore();
      g.strokeStyle = '#2a0610'; g.lineWidth = 3; g.beginPath(); g.ellipse(x, y, 58, 26, 0, 0, Math.PI * 2); g.stroke();
    });
    /* lips */
    const cx = 256, cy = 262, mw = 120, oh = 6 + open * 34;
    g.fillStyle = '#12020a'; g.beginPath(); g.ellipse(cx, cy, mw * .78, oh, 0, 0, 7); g.fill();
    if (open > .3) { g.fillStyle = '#f1e6df'; g.fillRect(cx - 60, cy - oh + 2, 120, 9); }
    const lip = g.createLinearGradient(0, cy - 50, 0, cy + 60); lip.addColorStop(0, '#ff3d5e'); lip.addColorStop(1, '#a3082c'); g.fillStyle = lip;
    g.beginPath(); g.moveTo(cx - mw, cy); g.bezierCurveTo(cx - 70, cy - 48, cx - 20, cy - 52, cx, cy - 36); g.bezierCurveTo(cx + 20, cy - 52, cx + 70, cy - 48, cx + mw, cy);
    g.bezierCurveTo(cx + 60, cy - oh * .6, cx - 60, cy - oh * .6, cx - mw, cy); g.fill();
    g.beginPath(); g.moveTo(cx - mw, cy); g.bezierCurveTo(cx - 60, cy + oh + 6, cx + 60, cy + oh + 6, cx + mw, cy); g.bezierCurveTo(cx + 70, cy + 58 + oh * .4, cx - 70, cy + 58 + oh * .4, cx - mw, cy); g.fill();
    g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(cx - 30, cy + 30 + oh * .3, 24, 6, -.1, 0, 7); g.fill();
    /* words */
    g.font = 'bold 26px ' + mono; g.fillStyle = '#ffd2dc'; g.textAlign = 'center'; g.fillText(line.slice(0, typed) + ((t * 2 | 0) % 2 ? '▌' : ' '), w / 2, 360);
    /* scanlines, roll bar, static */
    g.fillStyle = 'rgba(0,0,0,.28)'; for (let y = 0; y < h; y += 3) g.fillRect(0, y, w, 1);
    const ry = (t * 60) % (h + 80) - 40; const rb = g.createLinearGradient(0, ry - 30, 0, ry + 30); rb.addColorStop(0, 'rgba(255,255,255,0)'); rb.addColorStop(.5, 'rgba(255,200,220,.08)'); rb.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rb; g.fillRect(0, ry - 30, w, 60);
    if (Math.random() < .04) { g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(0, Math.random() * h, w, 4 + Math.random() * 10); }
    const vg = g.createRadialGradient(w / 2, h / 2, 140, w / 2, h / 2, 320); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)'); g.fillStyle = vg; g.fillRect(0, 0, w, h);
    face.needsUpdate = true;
  }

  /* ---------- the red room upstairs: a marble boy on a red plinth ---------- */
  const rr = door('gallery', scene, 'the red room, upstairs');
  const marble = M('#f3efe8', { roughness: .32 });
  add(rr, at(cyl(.22, .22, 1.0, red, 40), 0, .5, 0));
  const st = new THREE.Group(); rr.add(st);
  add(st, at(cyl(.06, .05, .42, marble, 16), 0, .21, 0), at(cyl(.11, .08, .3, marble, 16), 0, .55, 0, 0, 0, -.05), at(sph(.075, marble, 20), 0, .78, 0));
  at(st, 0, 1.0, 0, -.4);
  at(rr, -3.4, 0, -2.65); const rrL = new THREE.SpotLight('#ffd9b0', 6, 3, .6, .6, 1.5); rrL.position.set(-3.0, 2.9, -1.9); rrL.target = st; scene.add(rrL);

  /* ---------- back wall: cut-out art, posters, the clock, ON AIR, polaroids ---------- */
  const cut = (seed, w = 512, h = 640) => T(w, h, (g) => { g.fillStyle = '#f2e8d8'; g.fillRect(0, 0, w, h); const cs = ['#1638b8', '#c8141e', '#f2a01a', '#1638b8', '#e8501a']; for (let i = 0; i < 4; i++) { g.fillStyle = cs[(i + seed) % 5]; g.beginPath(); const cx = (Math.sin(seed * 5 + i * 2.1) * .3 + .5) * w, cy = (Math.cos(seed * 3 + i * 1.3) * .3 + .5) * h, r = 90 + (i * 41 % 80); g.moveTo(cx + r, cy); for (let a = 0; a <= 6.3; a += .3) { const rr2 = r * (.75 + Math.sin(a * 3 + seed + i) * .25); g.lineTo(cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2); } g.fill(); } });
  const frameM = M('#f4ede0', { roughness: .4 });
  const framed = (g, w, h, tex, depth = .04, fr = .03) => { add(g, box(w + fr * 2, h + fr * 2, depth, frameM, .01)); add(g, at(plane(w, h, M('#fff', { map: tex, roughness: .8 })), 0, 0, depth / 2 + .002)); };
  const gal = door('gallery'); framed(gal, .62, .8, cut(2)); at(gal, -2.45, 1.75, -D / 2 + .03);
  const gal2 = new THREE.Group(); gal.add(gal2); framed(gal2, .34, .44, cut(5, 256, 320)); at(gal2, -.62, -.18, 0);
  const posterT = (bg, fg, title, year, deco) => T(330, 480, (g) => { g.fillStyle = bg; g.fillRect(0, 0, 330, 480); deco(g); g.fillStyle = fg; g.textAlign = 'center'; g.font = 'bold 44px ' + grot; title.split('|').forEach((s, i) => g.fillText(s, 165, 360 + i * 44)); g.font = '20px ' + mono; g.fillText(year, 165, 455); });
  const posters = door('chat:latenight');
  [[posterT('#0e0e0e', '#f4f0e6', 'LA JETÉE', '1962', g => { g.strokeStyle = '#f4f0e6'; g.lineWidth = 4; [70, 50, 30].forEach(r => { g.beginPath(); g.arc(165, 170, r, 0, 7); g.stroke(); }); }), 0],
   [posterT('#c8141e', '#120208', 'VIDEO|DROME', '1983', g => { g.fillStyle = '#120208'; g.fillRect(85, 70, 160, 130); g.fillStyle = '#ff5a7a'; g.beginPath(); g.ellipse(165, 150, 50, 16, 0, 0, 7); g.fill(); }), .58]
  ].forEach(([t, x]) => { const p = new THREE.Group(); posters.add(p); add(p, box(.5, .72, .015, M('#fff', { roughness: .9 }), .002), at(plane(.48, .7, M('#fff', { map: t, roughness: .7 })), 0, 0, .009)); at(p, x, 0, 0); });
  at(posters, -W / 2 + .26, 1.75, .7, Math.PI / 2);
  /* the portal: an arched door in the right wall, light leaking from the other side */
  const portal = door('worlds');
  const beyond = T(512, 768, (g) => { const gr = g.createLinearGradient(0, 0, 0, 768); gr.addColorStop(0, '#7fc8ff'); gr.addColorStop(.6, '#d9f2ff'); gr.addColorStop(.62, '#7ad04a'); gr.addColorStop(1, '#3a8a2a'); g.fillStyle = gr; g.fillRect(0, 0, 512, 768); g.fillStyle = '#fff'; for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(100 + i * 80, 160 + (i % 2) * 40, 40, 0, 7); g.fill(); } });
  const arch = new THREE.Shape(); arch.moveTo(-.5, 0); arch.lineTo(-.5, 1.3); arch.absarc(0, 1.3, .5, Math.PI, 0, true); arch.lineTo(.5, 0); arch.lineTo(-.5, 0);
  const ag = new THREE.ShapeGeometry(arch, 32); const uv = ag.attributes.uv, pos = ag.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + .5), pos.getY(i) / 1.8);
  /* a breeze-block wall of round glass: terracotta squares, coloured glass discs, some open to the light */
  { const C = 8, Rw = 7, px = 128, cw = C * px, ch = Rw * px;
    const GL = ['#d8601a', '#1f45c8', '#4fae3a', '#1f9a8a', '#e0a810', '#e9dcc0', '#7a2a1a', '#0f2fa8', '#a8b84a', '#c8781a', '#4a2a6a', '#2a7a4a', '#9ac8e0', '#d89838', '#6a8ab8'];
    let sd = 7; const Rn = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    const glow = T(cw, ch, () => {}), wall = T(cw, ch, (g) => {
      const gl = glow.userData.ctx; gl.fillStyle = '#000'; gl.fillRect(0, 0, cw, ch);
      g.fillStyle = '#d9cbbd'; g.fillRect(0, 0, cw, ch);
      for (let r = 0; r < Rw; r++) for (let c = 0; c < C; c++) {
        const x = c * px + 5, y = r * px + 5, s = px - 10, cx = x + s / 2, cy = y + s / 2, rad = s * .4;
        const tg = g.createLinearGradient(x, y, x + s, y + s); tg.addColorStop(0, '#d79a7c'); tg.addColorStop(1, '#b8775a'); g.fillStyle = tg; g.fillRect(x, y, s, s);
        g.fillStyle = '#9a5c42'; g.beginPath(); g.arc(cx + 3, cy + 3, rad + 5, 0, 7); g.fill();
        g.fillStyle = '#e8b49a'; g.beginPath(); g.arc(cx - 2, cy - 2, rad + 3, 0, 7); g.fill();
        const open = Rn() < .16 || (r === 0 || c === C - 1) && Rn() < .45;
        if (open) { const og = g.createRadialGradient(cx - rad * .3, cy - rad * .3, 2, cx, cy, rad); og.addColorStop(0, '#e6a888'); og.addColorStop(1, '#8a4a32'); g.fillStyle = og; g.beginPath(); g.arc(cx, cy, rad, 0, 7); g.fill();
          g.fillStyle = 'rgba(255,236,210,.85)'; g.beginPath(); g.arc(cx - rad * .15, cy + rad * .1, rad * .75, Math.PI * .1, Math.PI * 1.2); g.fill();
          gl.fillStyle = '#5a3a28'; gl.beginPath(); gl.arc(cx, cy, rad * .6, 0, 7); gl.fill(); continue; }
        const col = GL[(Rn() * GL.length) | 0];
        const gg = g.createRadialGradient(cx - rad * .35, cy - rad * .35, 2, cx, cy, rad); gg.addColorStop(0, '#ffffff66'); gg.addColorStop(.2, col); gg.addColorStop(1, col);
        g.fillStyle = gg; g.beginPath(); g.arc(cx, cy, rad, 0, 7); g.fill();
        for (let k = 0; k < 40; k++) { g.fillStyle = Rn() < .5 ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.12)'; const a = Rn() * 7, d = Rn() * rad * .9; g.beginPath(); g.ellipse(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 3 + Rn() * 6, 1.5 + Rn() * 3, Rn() * 3, 0, 7); g.fill(); }
        g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, rad, 0, 7); g.stroke();
        gl.fillStyle = col; gl.globalAlpha = .55; gl.beginPath(); gl.arc(cx, cy, rad * .85, 0, 7); gl.fill(); gl.globalAlpha = 1;
      }
    });
    glow.needsUpdate = true;
    const bw = 2.7, bh = bw * Rw / C;
    const panel = at(new THREE.Mesh(new THREE.PlaneGeometry(bw, bh), M('#ffffff', { map: wall, emissive: '#ffffff', emissiveMap: glow, emissiveIntensity: .4, roughness: .55 })), -1.05, .25 + bh / 2, .012);
    portal.add(panel);
    const cap = at(box(bw + .08, .06, .08, M('#c98a6c', { roughness: .8 }), .01), -1.05, .25 + bh + .03, .04); portal.add(cap);
    at(portal, W / 2 - .02, 0, 0, -Math.PI / 2);
    pl('#ffd9a8', 1.6, 3.2, W / 2 - .7, 1.6, -1.05); }
  /* the clock, red and round */
  const clk = door('tm');
  const dial = T(256, 256, (g) => { g.fillStyle = '#fbf6ea'; g.beginPath(); g.arc(128, 128, 128, 0, 7); g.fill(); g.fillStyle = '#222'; g.font = '30px ' + grot; g.textAlign = 'center'; g.textBaseline = 'middle'; for (let i = 1; i <= 12; i++) { const a = i / 12 * Math.PI * 2; g.fillText(i, 128 + Math.sin(a) * 100, 128 - Math.cos(a) * 100); } });
  const vinyl = T(512, 512, (g) => { g.fillStyle = '#0c0c0c'; g.beginPath(); g.arc(256, 256, 256, 0, 7); g.fill(); g.strokeStyle = '#2a2a2a'; for (let r = 110; r < 250; r += 5) { g.lineWidth = 1; g.beginPath(); g.arc(256, 256, r, 0, 7); g.stroke(); } g.fillStyle = '#e8301e'; g.beginPath(); g.arc(256, 256, 100, 0, 7); g.fill(); g.fillStyle = '#111'; g.font = 'bold 22px ' + grot; g.textAlign = 'center'; g.textBaseline = 'middle'; for (let i = 1; i <= 12; i++) { const a = i / 12 * Math.PI * 2; g.fillText(i, 256 + Math.sin(a) * 78, 256 - Math.cos(a) * 78); } g.fillStyle = '#fff'; g.beginPath(); g.arc(256, 256, 6, 0, 7); g.fill(); });
  add(clk, at(cyl(.36, .36, .02, M('#0c0c0c', { roughness: .25 }), 64), 0, 0, 0, 0, Math.PI / 2));
  add(clk, at(new THREE.Mesh(new THREE.CircleGeometry(.36, 64), M('#fff', { map: vinyl, roughness: .3, metalness: .2 })), 0, 0, .012));
  const hand = (len, w, c) => { const g = new THREE.Group(); add(g, at(box(w, len, .01, M(c), .002), 0, len / 2 - .03, 0)); g.position.z = .04; clk.add(g); return g; };
  const hh = hand(.1, .018, '#f4ede0'), mh = hand(.14, .012, '#f4ede0'), secH = hand(.15, .005, '#111'); [hh, mh, secH].forEach(g => g.position.z = .02);
  at(clk, 2.1, 2.5, -D / 2 + .03);
  const air = door('radio');
  const airT = T(512, 160, (g) => { g.fillStyle = '#2a0508'; g.fillRect(0, 0, 512, 160); g.fillStyle = '#ff2a3c'; g.shadowColor = '#ff2a3c'; g.shadowBlur = 30; g.font = 'bold 96px ' + grot; g.textAlign = 'center'; g.fillText('ON AIR', 256, 115); });
  add(air, box(.7, .23, .06, M('#1a1a1a', { roughness: .4 }), .03), at(new THREE.Mesh(new THREE.PlaneGeometry(.66, .2), new THREE.MeshBasicMaterial({ map: airT, toneMapped: false })), 0, 0, .032));
  at(air, -1.45, 2.8, -D / 2 + .05); const airL = pl('#ff2a3c', .9, 2.5, -1.45, 2.6, -2.8);
  const hood = door('hood');
  const pcol = ['#ff9ec7', '#7fd8ff', '#ffd23f', '#b48cff', '#9bff9b', '#ff7a5c'];
  pcol.forEach((c, i) => { const t = T(128, 150, (g) => { g.fillStyle = '#fbfaf5'; g.fillRect(0, 0, 128, 150); const gr = g.createLinearGradient(0, 8, 0, 118); gr.addColorStop(0, c); gr.addColorStop(1, '#1a1020'); g.fillStyle = gr; g.fillRect(8, 8, 112, 104); g.fillStyle = 'rgba(255,255,255,.85)'; g.beginPath(); g.arc(64, 54, 18, 0, 7); g.fill(); g.fillRect(40, 74, 48, 40); g.fillStyle = '#333'; g.font = '14px ' + mono; g.fillText('#' + (i + 1), 10, 138); });
    add(hood, at(plane(.2, .235, M('#fff', { map: t, roughness: .8 })), (i % 3) * .24, -Math.floor(i / 3) * .29, i * .001, 0, 0, Math.sin(i * 2.3) * .15)); });
  at(hood, W / 2 - .02, 2.2, 1.1, -Math.PI / 2);
  /* chrome cd tower */
  const cds = door('arch');
  { const om = M('#f28a1a', { roughness: .15 }), inner = M('#3a1a06', { roughness: .8 });
    [0, 1, 2].forEach(i => { const g = new THREE.Group(); cds.add(g); add(g, cyl(.24, .24, .2, om, 48), at(cyl(.2, .2, .005, inner, 40), 0, .1, 0)); add(g, at(box(.2, .12, .03, inner, .01), .12, 0, .23, 0)); at(g, (i % 2) * .05, .2 + i * .22, 0, i * 1.2); });
    add(cds, at(cyl(.24, .24, .02, om, 48), .05, .78, 0)); [0, 1, 2].forEach(i => { const a2 = i / 3 * Math.PI * 2; add(cds, at(sph(.03, M('#222')), Math.cos(a2) * .18, .03, Math.sin(a2) * .18)); });
    add(cds, at(cyl(.035, .03, .07, M('#fff', { roughness: .1 })), -.06, .83, .04), at(sph(.035, M('#222')), .07, .82, -.03)); }
  at(cds, -3.85, 0, -.2);
  const plant = new THREE.Group(); scene.add(plant);
  add(plant, at(cyl(.24, .2, .46, M('#f4ede0', { roughness: .5 })), 0, .23, 0));
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, r = .15 + (i % 3) * .1, y = .75 + (i * 37 % 60) / 100; const lf = sph(.22, M('#2f7a3e', { roughness: .6, side: THREE.DoubleSide }), 20); lf.scale.set(1, .12, .6); at(lf, Math.cos(a) * r, y, Math.sin(a) * r, -a, 0, .5); plant.add(lf); add(plant, at(cyl(.008, .01, y - .3, M('#3a6a2a')), Math.cos(a) * r * .5, (y + .3) / 2, Math.sin(a) * r * .5)); }
  at(plant, -1.95, 0, -2.75);
  /* glowing panton discs, three, by the window */
  const disc = door('niche');
  const discT = c => T(128, 128, (g) => { const gr = g.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, '#fff2d8'); gr.addColorStop(.35, c); gr.addColorStop(1, '#2a0a20'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); });
  ['#ff7a3c', '#ff3d5e', '#1638b8'].forEach((c, i) => { const d = cyl(.17, .17, .05, new THREE.MeshStandardMaterial({ map: discT(c), emissive: '#ffffff', emissiveMap: discT(c), emissiveIntensity: .9, roughness: .3 }), 40); at(d, 0, -i * .4, 0, 0, Math.PI / 2); d.userData.glow = 1; disc.add(d); });
  at(disc, 1.6, 1.9, -D / 2 + .04);
  const mapD = door('map');
  const mapT = T(320, 240, (g) => { g.fillStyle = '#efe4c8'; g.fillRect(0, 0, 320, 240); g.strokeStyle = '#1638b8'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, 150); g.bezierCurveTo(80, 120, 140, 200, 320, 160); g.stroke(); g.strokeStyle = '#c8141e'; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(40, 60); g.bezierCurveTo(120, 20, 200, 160, 270, 90); g.stroke(); g.setLineDash([]); g.fillStyle = '#c8141e'; g.font = '20px ' + mono; g.fillText('you are here (ish)', 70, 220); g.beginPath(); g.arc(270, 90, 8, 0, 7); g.fill(); });
  framed(mapD, .5, .38, mapT, .03, .03); at(mapD, -W / 2 + .26, 2.55, -.5, Math.PI / 2);
  /* red mushroom lamp */
  const lamp = door('atlas');
  const mush = add(lamp, at(sh(new THREE.Mesh(new THREE.SphereGeometry(.3, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), M('#c8141e', { roughness: .2, emissive: '#3a0000' }))), 0, 1.0, 0));
  add(lamp, at(cyl(.02, .03, 1.0, red), 0, .5, 0), at(cyl(.16, .18, .03, red, 32), 0, .015, 0));
  at(lamp, -3.75, 0, -1.7); const lampL = pl('#ffb070', 3, 4, -3.75, .9, -1.7);
  /* mirror */
  const mir = door('closet');
  add(mir, box(.62, 1.1, .06, M('#d0101c', { roughness: .18 }), .06));
  const refl = add(mir, at(new THREE.Mesh(new THREE.PlaneGeometry(.52, .58), M('#e8e4ec', { metalness: 1, roughness: .05, envMapIntensity: 2.4 })), 0, .2, .032));
  const wheel = T(256, 256, (g) => { g.fillStyle = '#f4ede0'; g.beginPath(); g.arc(128, 128, 124, 0, 7); g.fill(); g.fillStyle = '#d0101c'; g.beginPath(); g.arc(128, 128, 48, 0, 7); g.fill(); g.fillStyle = '#222'; g.font = 'bold 22px ' + grot; g.textAlign = 'center'; g.fillText('MENU', 128, 40); g.fillText('▶❚❚', 128, 228); g.fillText('⏮', 34, 136); g.fillText('⏭', 222, 136); });
  add(mir, at(new THREE.Mesh(new THREE.CircleGeometry(.2, 48), M('#fff', { map: wheel, roughness: .5 })), 0, -.3, .032));
  at(mir, W / 2 - .03, 1.45, 2.0, -Math.PI / 2);
  /* the crate: red milk crate, teal records */
  const crate = door('crates');
  const crM = M('#e8301e', { roughness: .45 });
  add(crate, at(box(.52, .04, .52, crM, .01), 0, .02, 0));
  [[0, .25, .02, .52], [0, -.25, .02, .52]].forEach(([x, z]) => add(crate, at(box(.52, .42, .03, crM, .01), 0, .21, z)));
  [-.25, .25].forEach(x => add(crate, at(box(.03, .42, .52, crM, .01), x, .21, 0)));
  for (let i = 0; i < 12; i++) add(crate, at(box(.44, .44, .012, M(`hsl(${170 + i * 3},70%,${60 + i % 3 * 6}%)`, { roughness: .4 }), .004), 0, .34, -.2 + i * .036, 0, -.25 + i * .02));
  at(crate, -3.05, 0, 2.35, .45);
  /* the blue hand chair: say hi to the ghosts */
  const gtr = door('ghosts');
  { const hb = M('#1a3fd0', { roughness: .08, metalness: .05 }), cap = (r, l) => sh(new THREE.Mesh(new THREE.CapsuleGeometry(r, l, 12, 28), hb));
    add(gtr, at(box(.78, .44, .74, hb, .18), 0, .22, 0), at(box(.7, .3, .26, hb, .13), 0, .52, -.24));
    [[-.27, .46, .1], [-.09, .56, .03], [.09, .54, -.03], [.27, .44, -.1]].forEach(([x, l, rz]) => { const f = cap(.088, l); at(f, x, .62 + l / 2, -.28, 0, -.06, rz); gtr.add(f); });
    const th1 = cap(.1, .22); at(th1, .44, .42, .02, 0, 0, -.35); gtr.add(th1);
    const th2 = cap(.095, .2); at(th2, .52, .62, .1, 0, -.35, -.08); gtr.add(th2); }
  at(gtr, 3.55, 0, -1.4, -.45);


  /* ---------- the moodboard pieces ---------- */
  const deco = new THREE.Group(); scene.add(deco);
  { const oa = M('#ff8a1a', { roughness: .05, transparent: true, opacity: .55 });
    const sg = new THREE.Group(); deco.add(sg); add(sg, at(box(1.0, .02, .3, oa, .01), 0, .7, 0), at(box(1.0, .02, .3, oa, .01), 0, .38, 0), at(box(.02, .7, .3, oa, .01), -.49, .35, 0), at(box(.02, .7, .3, oa, .01), .49, .35, 0), at(box(.02, .32, .3, oa, .01), .1, .54, 0));
    add(sg, at(box(.18, .22, .14, M('#f4ede0'), .02), -.3, .5, 0), at(cyl(.05, .05, .2, M('#1638b8', { roughness: .2 })), .3, .49, 0)); at(sg, 1.3, 0, -D / 2 + .22); }
  { const pts = []; for (let i = 0; i <= 120; i++) { const t = i / 120, x = -.6 + t * 1.2, y = .08 + (Math.sin(t * Math.PI * 8 - Math.PI / 2) * .5 + .5) * .38; pts.push(new THREE.Vector3(x, y, 0)); }
    const sq = sh(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, .07, 20), M('#d0101c', { roughness: .12 }))); deco.add(sq); at(sq, -1.4, 0, -D / 2 + .3); }
  { const gm = M('#1f8a3a', { roughness: .15 }); const cg = new THREE.Group(); deco.add(cg); add(cg, at(box(.55, .26, .5, gm, .1), 0, .13, 0), at(box(.42, .14, .42, gm, .06), 0, .33, .02), at(box(.55, .2, .5, gm, .09), 0, .5, 0), at(box(.55, .34, .14, gm, .07), 0, .78, -.2)); at(cg, 2.75, 0, 1.55, -2.5); }

  /* ---------- move mode: sims build mode, drag things around ---------- */
  const MOV = {sofa, table: tbl, plant, chair, crate, guitars: gtr, cds, lamp, books, gallery: gal, posters, portal, clock: clk, onair: air, polaroids: hood, discs: disc, map: mapD, window: win, mirror: mir, ghost: gh, desk};
  const FOLLOW = {sofa: [ball, cush], table: [tw, cam, misc, books, pend], ghost: [ped, rug], desk: [pc]};
  Object.entries(MOV).forEach(([k, g]) => { g.userData.mid = k; const p = g.position; g.userData.kind = Math.abs(p.z + D / 2) < .35 ? 'back' : Math.abs(p.x + W / 2) < .45 ? 'left' : 'floor'; });
  let moveOn = false, dragging = null; const mplane = new THREE.Plane(), hitP = new THREE.Vector3(), off = new THREE.Vector3();
  const moveRoot = o => { while (o && !(o.userData && o.userData.mid)) o = o.parent; return o; };
  function place(k, pos) { const g = MOV[k]; if (!g) return; const d = new THREE.Vector3(pos[0], pos[1], pos[2]).sub(g.position); g.position.add(d); (FOLLOW[k] || []).forEach(f => f.position.add(d)); DOORS.forEach(dg => { dg.updateMatrixWorld(true); boxes.set(dg, new THREE.Box3().setFromObject(dg)); }); }
  host.addEventListener('pointerdown', e => { if (!moveOn) return; const r = el0.getBoundingClientRect(); ndc.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(Object.values(MOV), true)[0]; if (!hit) return; const g = moveRoot(hit.object); if (!g) return; e.stopPropagation(); e.preventDefault();
    const kind = g.userData.kind; if (kind === 'floor') mplane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, g.position.y, 0)); else if (kind === 'back') mplane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), g.position.clone()); else mplane.setFromNormalAndCoplanarPoint(new THREE.Vector3(1, 0, 0), g.position.clone());
    ray.ray.intersectPlane(mplane, hitP); off.copy(g.position).sub(hitP); dragging = g; host.style.cursor = 'grabbing'; }, true);
  host.addEventListener('pointermove', e => { if (!dragging) return; e.stopPropagation(); const r = el0.getBoundingClientRect(); ndc.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); ray.setFromCamera(ndc, camera); if (!ray.ray.intersectPlane(mplane, hitP)) return;
    const n = hitP.clone().add(off), g = dragging, k = g.userData.kind; if (k === 'floor') { n.x = Math.max(-W / 2 + .5, Math.min(W / 2 - .4, n.x)); n.z = Math.max(-D / 2 + .4, Math.min(D / 2 + 1.5, n.z)); n.y = g.position.y; } else { n.y = Math.max(.6, Math.min(H - .4, n.y)); if (k === 'back') { n.x = Math.max(-W / 2 + .5, Math.min(W / 2 - .5, n.x)); n.z = g.position.z; } else { n.z = Math.max(-D / 2 + .5, Math.min(D / 2 - .4, n.z)); n.x = g.position.x; } }
    place(g.userData.mid, [n.x, n.y, n.z]); }, true);
  addEventListener('pointerup', () => { if (dragging) { const g = dragging; dragging = null; host.style.cursor = ''; opts.moved && opts.moved(g.userData.mid, g.position.toArray()); } });
  function setMove(on) { moveOn = on; Object.values(MOV).forEach(g => g.traverse(m => { if (m.isMesh && m.material && m.material.emissive && !m.userData.glow) { if (!m.userData.e1) m.userData.e1 = m.material.emissive.clone(); m.material.emissive.copy(m.userData.e1); if (on) m.material.emissive.add(new THREE.Color(.05, .09, .02)); } })); }

  /* ---------- design your room ---------- */
  const lights = { hemi: scene.children.find(o => o.isHemisphereLight), sun };
  const sofaMats = []; sofa.traverse(m => { if (m.isMesh) sofaMats.push(m.material); });
  const redrawWall = (tex, base, stripe) => { const x = tex.userData.ctx, w = 512, h = 512; x.fillStyle = base; x.fillRect(0, 0, w, h); x.globalAlpha = .08; x.fillStyle = stripe; for (let i = 0; i < w; i += 32) x.fillRect(i, 0, 12, h); x.globalAlpha = .05; for (let i = 0; i < 3000; i++) { x.fillStyle = Math.random() < .5 ? '#000' : '#fff'; x.fillRect(Math.random() * w, Math.random() * h, 2, 2); } x.globalAlpha = 1; tex.needsUpdate = true; };
  const redrawRug = (a, b2, edge) => { const g = rugT.userData.ctx; g.clearRect(0, 0, 1024, 1024); g.fillStyle = a; g.beginPath(); g.arc(512, 512, 510, 0, 7); g.fill(); g.strokeStyle = edge || b2; g.lineWidth = 26; [430, 330, 230].forEach(r => { g.beginPath(); g.arc(512, 512, r, 0, 7); g.stroke(); }); rugT.needsUpdate = true; };
  const MOODS0 = { night: ['#ffe2c4', .55, '#ffd3a0', 1.1, '#140a12'], golden: ['#ffd0a0', .9, '#ffb060', 2.2, '#3a1a10'], day: ['#ffffff', 1.3, '#fff6ea', 2.0, '#9fc8ff'], neon: ['#ff7ad8', .7, '#7a5aff', 1.6, '#0a0420'], blue: ['#8ab8ff', .6, '#a0c0ff', .9, '#020818'] };
  function theme(t = {}) {
    if (t.back) redrawWall(wpB, t.back, '#000'); if (t.left) redrawWall(wpL, t.left, '#000');
    if (t.floor) floor.material.color.set(t.floor);
    if (t.rugA || t.rugB) redrawRug(t.rugA || '#1636b0', t.rugB || '#c8141e', t.rugEdge);
    if (t.sofa) sofaMats.forEach(m => m.color.set(t.sofa));
    if (t.mood) { const hrs = {night: 23, golden: 18, day: 12, neon: 21, blue: 5.5, auto: -1}[t.mood]; skyHour = hrs == null || hrs < 0 ? null : hrs; drawSky(skyHour == null ? nowH() : skyHour); }
  }

  /* ---------- picking, hovering, the camera ---------- */
  const anchors = new Map(), boxes = new Map();
  DOORS.forEach(g => { g.updateMatrixWorld(true); boxes.set(g, new THREE.Box3().setFromObject(g)); });
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const ownerOf = o => { while (o && !o.userData.go) o = o.parent; return o; };
  let hovered = null;
  function pickAt(cx, cy) {
    const r = renderer.domElement.getBoundingClientRect(); ndc.set((cx - r.left) / r.width * 2 - 1, -(cy - r.top) / r.height * 2 + 1);
    ray.setFromCamera(ndc, camera); const hit = ray.intersectObjects(scene.children, true).find(h => h.object.visible && h.object !== floor);
    return hit ? ownerOf(hit.object) : null;
  }
  const glowOn = (g, on) => g.traverse(m => { if (!m.isMesh || !m.material || !m.material.emissive || m.userData.glow) return; if (!m.userData.e0) m.userData.e0 = m.material.emissive.clone(); m.material.emissive.copy(m.userData.e0); if (on) m.material.emissive.add(new THREE.Color(.16, .08, .05)); });
  function setHover(g) {
    if (g === hovered) return; if (hovered) { glowOn(hovered, false); const a = anchors.get(hovered); a && a.classList.remove('act'); }
    hovered = g; hoverPC = g && g.userData.go === 'msn' ? 1 : 0;
    if (g) { glowOn(g, true); const a = anchors.get(g); a && a.classList.add('act'); }
    renderer.domElement.style.cursor = g ? 'pointer' : 'grab';
  }
  /* camera: sims-style, drag to turn, wheel to zoom */
  const target = new THREE.Vector3(0, 1.15, -.4);
  let az = 0, el = .08, rad = 7.9, azT = az, radT = rad, drag = null, moved = 0;
  const el0 = renderer.domElement;
  host.addEventListener('pointerdown', e => { if (moveOn) return; drag = { x: e.clientX, az: azT }; moved = 0; });
  addEventListener('pointerup', () => { drag = null; });
  host.addEventListener('pointermove', e => { if (drag) { const dx = e.clientX - drag.x; moved = Math.max(moved, Math.abs(dx)); azT = Math.max(-.6, Math.min(.6, drag.az - dx * .004)); } });
  host.addEventListener('pointermove', e => { const r = host.getBoundingClientRect(); look.x = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1)); look.y = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1)); if (!drag && !moveOn) setHover(pickAt(e.clientX, e.clientY)); }, true);
  host.addEventListener('wheel', e => { e.preventDefault(); radT = Math.max(3.6, Math.min(9.2, radT + e.deltaY * .01)); }, { passive: false });
  host.addEventListener('click', e => { if (moved > 6) { e.stopPropagation(); e.preventDefault(); } }, true);
  el0.addEventListener('click', e => { if (moved > 6 || moveOn) return; const g = pickAt(e.clientX, e.clientY); if (g && opts.go) opts.go(g.userData.go, e); });
  const turn = d => { azT = Math.max(-.6, Math.min(.6, azT + d)); };

  /* invisible html anchors that follow each object on screen, so the rest of the site can talk to them */
  DOORS.forEach(g => { const a = document.createElement('div'); a.className = 'hs r3a'; a.dataset.go = g.userData.go; a.tabIndex = 0; if (g.userData.w) a.dataset.w = g.userData.w; host.appendChild(a); anchors.set(g, a); a.addEventListener('focus', () => setHover(g)); });
  const v = new THREE.Vector3();
  function placeAnchors() {
    const r = renderer.domElement.getBoundingClientRect(), hr = host.getBoundingClientRect();
    DOORS.forEach(g => { const b = boxes.get(g); let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (let i = 0; i < 8; i++) { v.set(i & 1 ? b.max.x : b.min.x, i & 2 ? b.max.y : b.min.y, i & 4 ? b.max.z : b.min.z).project(camera); const sx = (v.x + 1) / 2 * r.width, sy = (1 - v.y) / 2 * r.height; x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy); }
      const a = anchors.get(g); Object.assign(a.style, { left: (x0 + r.left - hr.left + host.scrollLeft) + 'px', top: (y0 + r.top - hr.top) + 'px', width: (x1 - x0) + 'px', height: (y1 - y0) + 'px' }); });
  }
  function resize() { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.fov = narrow() ? 64 : 44; if (!resize.done) { radT = rad = narrow() ? 8.6 : 7.9; resize.done = 1; } camera.updateProjectionMatrix(); }
  addEventListener('resize', resize); resize();

  const nowH = () => { const d = new Date(); return d.getHours() + d.getMinutes() / 60; }; let skyHour = null, lastSky = 0; drawSky(nowH());
  /* ---------- loop ---------- */
  const clock = new THREE.Clock(); let running = false;
  function frame() {
    if (!running) return; requestAnimationFrame(frame);
    const t = clock.getElapsedTime(), dt = Math.min(clock.getDelta(), .05);
    az += (azT - az) * .08; rad += (radT - rad) * .08;
    const sway = Math.sin(t * .15) * .02;
    camera.position.set(target.x + Math.sin(az + sway) * Math.cos(el) * rad, target.y + Math.sin(el) * rad, target.z + Math.cos(az + sway) * Math.cos(el) * rad); camera.lookAt(target);
    /* the screen breathes, and leans toward you when you come close */
    lineT += 1 / 60; if (typed < line.length) { if (lineT > .07) { typed++; lineT = 0; } } else if (lineT > 2.2) { line = TVL[++li % TVL.length]; typed = 0; lineT = 0; }
    if (hoverPC && line !== 'touch the screen' && typed >= line.length) { line = 'touch the screen'; typed = 0; }
    bulgeT += ((hoverPC ? .11 : .035) - bulgeT) * .06; const bulge = bulgeT + Math.sin(t * 1.6) * .012;
    const p = scrGeo.attributes.position.array; for (let i = 0; i < p.length; i += 3) { const x = base[i] / .39, y = base[i + 1] / .3; p[i + 2] = bulge * Math.max(0, (1 - x * x)) * Math.max(0, (1 - y * y)); } scrGeo.attributes.position.needsUpdate = true;
    drawFace(t); scrLight.intensity = 2.6 + Math.random() * .8 + hoverPC * 2;
    airL.intensity = 1.2 + Math.sin(t * 9) * .15;
    secH.rotation.z = -new Date().getSeconds() / 60 * Math.PI * 2;
    gh.position.y = .12 + Math.sin(t * 1.4) * .03; gh.rotation.y = Math.sin(t * .5) * .25 + look.x * .3;
    hh.rotation.z = -((new Date().getHours() % 12 + new Date().getMinutes() / 60) / 12) * Math.PI * 2; mh.rotation.z = -(new Date().getMinutes() / 60) * Math.PI * 2;
    if (skyHour == null && (t - lastSky) > 60) { lastSky = t; drawSky(nowH()); } lampL.intensity = 2.2 * lampBoost; pendL.intensity = 3 * lampBoost;
    DOORS.forEach(g => { const s = g === hovered ? 1.025 : 1; g.scale.lerp(new THREE.Vector3(s, s, s), .15); });
    renderer.render(scene, camera); placeAnchors();
  }
  return {
    start() { if (running) return; running = true; resize(); clock.start(); frame(); },
    stop() { running = false; },
    resize, turn, theme, setMove, place, zoom: d => { radT = Math.max(3.6, Math.min(7.4, radT + d)); }, sky: h => { skyHour = h; drawSky(h == null ? nowH() : h); }, skyMode: () => skyMode,
    anchors
  };
}

