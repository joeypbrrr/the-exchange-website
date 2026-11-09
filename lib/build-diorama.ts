import {
  Box3,
  BufferGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  type Material,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export function triangleCount(root: Group) {
  let total = 0;
  root.traverse((obj) => {
    const mesh = obj as Mesh;
    const geo = mesh.geometry as BufferGeometry | undefined;
    if (!geo?.index) {
      const pos = geo?.getAttribute("position");
      if (pos) total += Math.floor(pos.count / 3);
      return;
    }
    total += geo.index.count / 3;
  });
  return total;
}

function sitOnFloor(geo: BufferGeometry) {
  geo.computeBoundingBox();
  const box = geo.boundingBox;
  if (!box) return;
  geo.translate(
    -(box.min.x + box.max.x) / 2,
    -box.min.y,
    -(box.min.z + box.max.z) / 2,
  );
  geo.computeVertexNormals();
}

function upperShape() {
  const s = new Shape();
  s.moveTo(-0.95, 0);
  s.bezierCurveTo(-1.1, 0.12, -1.1, 0.42, -0.9, 0.55);
  s.bezierCurveTo(-0.74, 0.66, -0.58, 0.5, -0.46, 0.36);
  s.bezierCurveTo(-0.3, 0.55, -0.05, 0.64, 0.12, 0.5);
  s.bezierCurveTo(0.4, 0.34, 0.72, 0.26, 0.98, 0.16);
  s.bezierCurveTo(1.1, 0.1, 1.06, 0, 0.82, 0);
  s.lineTo(-0.95, 0);
  return s;
}

function soleShape() {
  const s = new Shape();
  s.moveTo(-1.08, 0.22);
  s.bezierCurveTo(-1.28, 0.22, -1.3, -0.22, -1.08, -0.22);
  s.bezierCurveTo(-0.45, -0.16, 0.05, -0.18, 0.42, -0.32);
  s.bezierCurveTo(0.86, -0.48, 1.16, -0.36, 1.18, 0);
  s.bezierCurveTo(1.16, 0.36, 0.86, 0.48, 0.42, 0.32);
  s.bezierCurveTo(0.05, 0.18, -0.45, 0.16, -1.08, 0.22);
  return s;
}

function makeShoe() {
  const shoe = new Group();
  const soleMat = new MeshStandardMaterial({
    color: 0xf4f5f7,
    roughness: 0.55,
    metalness: 0.02,
  });
  const outsoleMat = new MeshStandardMaterial({
    color: 0xd7dbe2,
    roughness: 0.72,
    metalness: 0.02,
  });
  const upperMat = new MeshPhysicalMaterial({
    color: 0x1c1a24,
    roughness: 0.42,
    metalness: 0.18,
    clearcoat: 0.25,
    clearcoatRoughness: 0.45,
  });
  const laceMat = new MeshStandardMaterial({
    color: 0x2a2433,
    roughness: 0.6,
    metalness: 0.05,
  });
  const holeMat = new MeshStandardMaterial({
    color: 0x07060c,
    roughness: 0.8,
  });

  const outsole = new ExtrudeGeometry(soleShape(), {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 10,
  });
  outsole.rotateX(-Math.PI / 2);
  sitOnFloor(outsole);
  const outsoleMesh = new Mesh(outsole, outsoleMat);

  const mid = new ExtrudeGeometry(soleShape(), {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.035,
    bevelSegments: 2,
    curveSegments: 10,
  });
  mid.rotateX(-Math.PI / 2);
  mid.scale(0.94, 1, 0.9);
  sitOnFloor(mid);
  const midMesh = new Mesh(mid, soleMat);
  midMesh.position.y = 0.1;

  const upper = new ExtrudeGeometry(upperShape(), {
    depth: 0.48,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 12,
  });
  sitOnFloor(upper);
  const upperMesh = new Mesh(upper, upperMat);
  upperMesh.position.y = 0.22;

  const tongue = new Mesh(new RoundedBoxGeometry(0.28, 0.22, 0.1, 2, 0.04), upperMat);
  tongue.position.set(-0.05, 0.62, 0);
  tongue.rotation.z = -0.4;

  const collar = new Mesh(new SphereGeometry(0.12, 14, 10), holeMat);
  collar.scale.set(1.1, 0.55, 0.85);
  collar.position.set(-0.55, 0.48, 0);

  shoe.add(outsoleMesh, midMesh, upperMesh, tongue, collar);

  const pairs = [
    { x: -0.22, y: 0.5 },
    { x: -0.05, y: 0.56 },
    { x: 0.12, y: 0.5 },
    { x: 0.28, y: 0.42 },
  ];
  pairs.forEach((pair, index) => {
    const curve = new CatmullRomCurve3([
      new Vector3(pair.x, pair.y, -0.14),
      new Vector3(pair.x + (index % 2 ? 0.05 : -0.02), pair.y + 0.06, 0),
      new Vector3(pair.x, pair.y, 0.14),
    ]);
    shoe.add(new Mesh(new TubeGeometry(curve, 10, 0.012, 5, false), laceMat));
  });

  for (let i = 0; i < 6; i += 1) {
    const hole = new Mesh(new CylinderGeometry(0.015, 0.015, 0.02, 8), holeMat);
    hole.rotation.z = Math.PI / 2;
    hole.position.set(0.55 + (i % 3) * 0.08, 0.28 + Math.floor(i / 3) * 0.07, 0.2);
    shoe.add(hole);
  }

  shoe.scale.setScalar(1.05);
  return shoe;
}

function reed(geo: BufferGeometry) {
  const pos = geo.getAttribute("position");
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const r = Math.hypot(x, z);
    if (r > 0.43 && Math.abs(y) < 0.04) {
      const a = Math.atan2(z, x);
      const n = 1 + 0.035 * Math.sin(a * 42);
      pos.setX(i, (x / r) * r * n);
      pos.setZ(i, (z / r) * r * n);
    }
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

function makeCoin(material: Material) {
  const pts = [
    new Vector2(0.01, -0.04),
    new Vector2(0.4, -0.045),
    new Vector2(0.47, -0.028),
    new Vector2(0.5, 0),
    new Vector2(0.47, 0.028),
    new Vector2(0.4, 0.045),
    new Vector2(0.01, 0.04),
  ];
  const geo = new LatheGeometry(pts, 48);
  reed(geo);
  const coin = new Group();
  coin.add(new Mesh(geo, material));
  const ring = new Mesh(new TorusGeometry(0.22, 0.012, 6, 28), material);
  ring.rotation.x = Math.PI / 2;
  coin.add(ring);
  const stud = new Mesh(new CylinderGeometry(0.07, 0.07, 0.02, 16), material);
  stud.rotation.x = Math.PI / 2;
  coin.add(stud);
  return coin;
}

function makePhone() {
  const phone = new Group();
  const bodyMat = new MeshPhysicalMaterial({
    color: 0x14141c,
    roughness: 0.28,
    metalness: 0.55,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
  });
  const body = new Mesh(new RoundedBoxGeometry(0.78, 1.56, 0.09, 4, 0.09), bodyMat);
  const screen = new Mesh(
    new RoundedBoxGeometry(0.66, 1.4, 0.01, 3, 0.04),
    new MeshStandardMaterial({
      color: 0x24143f,
      roughness: 0.35,
      metalness: 0.1,
      emissive: 0x1a1030,
      emissiveIntensity: 0.4,
    }),
  );
  screen.position.z = 0.05;
  screen.name = "phone-screen";
  const island = new Mesh(
    new RoundedBoxGeometry(0.28, 0.09, 0.015, 2, 0.03),
    bodyMat,
  );
  island.position.set(0.12, 0.58, 0.058);
  const lensMat = new MeshStandardMaterial({
    color: 0x0b0b10,
    roughness: 0.2,
    metalness: 0.4,
  });
  const lensA = new Mesh(new CylinderGeometry(0.028, 0.028, 0.02, 16), lensMat);
  const lensB = lensA.clone();
  lensA.rotation.x = Math.PI / 2;
  lensB.rotation.x = Math.PI / 2;
  lensA.position.set(-0.22, 0.58, 0.06);
  lensB.position.set(-0.14, 0.58, 0.06);
  const button = new Mesh(
    new RoundedBoxGeometry(0.015, 0.16, 0.03, 1, 0.004),
    bodyMat,
  );
  button.position.set(0.4, 0.15, 0);
  phone.add(body, screen, island, lensA, lensB, button);
  return phone;
}

function makeBars() {
  const group = new Group();
  const layout = [
    { s: [1.15, 0.22, 0.48] as const, p: [-0.46, 0, 0.08], r: 0.04 },
    { s: [1.05, 0.22, 0.46] as const, p: [0.42, 0, -0.02], r: -0.05 },
    { s: [0.92, 0.2, 0.42] as const, p: [0.02, 0, 0.28], r: 0.12 },
    { s: [0.84, 0.2, 0.4] as const, p: [-0.16, 0.22, 0.02], r: -0.08 },
    { s: [0.72, 0.18, 0.36] as const, p: [0.28, 0.22, 0.12], r: 0.1 },
    { s: [0.58, 0.18, 0.32] as const, p: [0.06, 0.42, 0.06], r: -0.04 },
  ];
  layout.forEach((bar, index) => {
    const mat = new MeshPhysicalMaterial({
      color: index % 2 === 0 ? 0xf2c14d : 0xe3ae3a,
      metalness: 1,
      roughness: 0.18 + index * 0.03,
      clearcoat: 0.45,
      clearcoatRoughness: 0.28,
    });
    const mesh = new Mesh(
      new RoundedBoxGeometry(bar.s[0], bar.s[1], bar.s[2], 3, 0.035),
      mat,
    );
    const inset = new Mesh(
      new RoundedBoxGeometry(bar.s[0] * 0.72, 0.012, bar.s[2] * 0.62, 2, 0.01),
      new MeshPhysicalMaterial({
        color: 0xc9952e,
        metalness: 1,
        roughness: 0.35,
      }),
    );
    inset.position.y = bar.s[1] / 2;
    mesh.add(inset);
    mesh.position.set(bar.p[0], bar.p[1] + bar.s[1] / 2, bar.p[2]);
    mesh.rotation.y = bar.r;
    group.add(mesh);
  });
  return group;
}

function makeTower() {
  const tower = new Group();
  const caseMat = new MeshPhysicalMaterial({
    color: 0x121218,
    roughness: 0.35,
    metalness: 0.7,
    clearcoat: 0.2,
  });
  const shell = new Mesh(new RoundedBoxGeometry(0.72, 1.35, 0.72, 3, 0.04), caseMat);
  const glass = new Mesh(
    new RoundedBoxGeometry(0.5, 1.05, 0.04, 2, 0.02),
    new MeshStandardMaterial({
      color: 0x1a1030,
      roughness: 0.15,
      metalness: 0.2,
      transparent: true,
      opacity: 0.55,
    }),
  );
  glass.position.z = 0.34;
  tower.add(shell, glass);
  const fanColors = [0x7a45e8, 0x3c78ff, 0x9a5cff];
  fanColors.forEach((color, index) => {
    const fan = new Mesh(
      new TorusGeometry(0.13, 0.012, 8, 24),
      new MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.55,
        roughness: 0.4,
      }),
    );
    fan.position.set(0, 0.34 - index * 0.32, 0.37);
    tower.add(fan);
  });
  return tower;
}

export function buildFrame(kind: "gold" | "phone" | "shoe" | "tower") {
  const root = new Group();
  if (kind === "shoe") root.add(makeShoe());
  if (kind === "phone") {
    const phone = makePhone();
    phone.rotation.set(-0.08, 0.5, 0);
    root.add(phone);
  }
  if (kind === "gold") {
    const bars = makeBars();
    bars.scale.setScalar(1.15);
    root.add(bars);
    const coinMat = new MeshPhysicalMaterial({
      color: 0xf0c14a,
      metalness: 1,
      roughness: 0.22,
    });
    const coin = makeCoin(coinMat);
    coin.position.set(0.7, 0.08, 0.55);
    root.add(coin);
  }
  if (kind === "tower") root.add(makeTower());
  const box = new Box3().setFromObject(root);
  const center = box.getCenter(new Vector3());
  root.position.sub(center);
  return root;
}

export function buildDiorama() {
  const root = new Group();
  const shoe = makeShoe();
  shoe.rotation.y = 0.18;
  shoe.position.set(-0.05, 0.28, 0.05);

  const phone = makePhone();
  phone.position.set(-1.45, 0.82, -0.35);
  phone.rotation.set(0, 0.15, 0);

  const bars = makeBars();
  bars.position.set(0.72, 0, -0.2);

  const gold = new MeshPhysicalMaterial({
    color: 0xf0c14a,
    metalness: 1,
    roughness: 0.22,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
  });
  const coins = new Group();
  for (let i = 0; i < 6; i += 1) {
    const coin = makeCoin(gold);
    coin.position.y = i * 0.07;
    coin.rotation.y = i * 0.35;
    coins.add(coin);
  }
  const lean = makeCoin(gold);
  lean.rotation.x = -Math.PI / 2;
  lean.position.set(0.46, 0.03, 0.08);
  lean.scale.setScalar(0.85);
  const flat = makeCoin(gold);
  flat.rotation.x = -Math.PI / 2;
  flat.position.set(0.15, 0.03, 0.48);
  coins.add(lean, flat);
  coins.scale.setScalar(0.34);
  coins.position.set(0.95, 0, 0.42);

  root.add(shoe, phone, bars, coins);

  const box = new Box3().setFromObject(root);
  const center = box.getCenter(new Vector3());
  root.position.sub(center);
  root.position.y += box.getSize(new Vector3()).y * 0.02;

  return { root, triangles: triangleCount(root) };
}
