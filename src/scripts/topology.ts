/**
 * Topología viva del hero.
 *
 * Nodos, enlaces y paquetes que viajan por ellos: la materia del trabajo de
 * Jose Carlos, no formas abstractas. Todo con materiales `Basic` — sin luces —
 * porque debe leerse como un diagrama de red sobre papel, no como render 3D.
 *
 * La escena conserva el paralaje con el mouse del diseño anterior.
 */
import {
  BufferAttribute,
  BufferGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

const INK = 0x0d1526;
const LINK = 0x2f6bff;
const ALERT = 0xff6b35;

const NODE_COUNT = 11;
const PACKET_COUNT = 13;

interface Node {
  base: Vector3;
  current: Vector3;
  phase: number;
  drift: number;
  mesh: Mesh;
}

interface Packet {
  edge: number;
  t: number;
  speed: number;
  mesh: Mesh;
}

/** Posiciones sembradas a mano: pesan hacia la derecha para dejar
 *  respirar al titular, y con profundidad desigual para que el paralaje
 *  tenga de dónde agarrarse. */
const SEED: [number, number, number, number][] = [
  // x, y, z, tamaño relativo
  [-1.5, 1.9, -0.9, 0.7],
  [-0.3, 0.6, 0.5, 1.3],
  [0.9, 2.2, -0.4, 0.85],
  [1.4, -0.9, 0.9, 1.0],
  [2.6, 1.2, 0.2, 1.5],
  [3.1, -1.9, -0.7, 0.8],
  [4.2, 0.4, 0.7, 1.1],
  [2.0, -2.6, 0.4, 0.7],
  [0.2, -2.1, -1.1, 0.9],
  [3.8, 2.5, -0.5, 0.75],
  [5.0, -1.1, -0.2, 0.65],
];

/** Enlaces del grafo: una espina que recorre la nube más algunos saltos
 *  largos, como una red real con redundancia. */
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 6],
  [3, 5],
  [5, 6],
  [5, 7],
  [7, 8],
  [8, 1],
  [4, 9],
  [9, 6],
  [6, 10],
  [10, 5],
  [0, 8],
];

export function initTopology(selector: string): void {
  const host = document.querySelector<HTMLElement>(selector);
  if (!host) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const width = host.clientWidth || 900;
  const height = host.clientHeight || 600;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    return; // Sin WebGL el hero se queda solo con la tipografía.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(1.6, 0, 9.4);

  const group = new Group();
  scene.add(group);

  // --- Nodos ---------------------------------------------------------------
  const nodeGeometry = new SphereGeometry(1, 18, 14);
  const nodeMaterial = new MeshBasicMaterial({ color: INK, transparent: true, opacity: 0.62 });
  const hubMaterial = new MeshBasicMaterial({ color: LINK, transparent: true, opacity: 0.9 });

  const nodes: Node[] = SEED.slice(0, NODE_COUNT).map(([x, y, z, size], i) => {
    // Los tres nodos más grandes son concentradores: van en azul de enlace.
    const mesh = new Mesh(nodeGeometry, size >= 1.3 ? hubMaterial : nodeMaterial);
    mesh.scale.setScalar(0.055 * size + 0.03);
    mesh.position.set(x, y, z);
    group.add(mesh);

    return {
      base: new Vector3(x, y, z),
      current: new Vector3(x, y, z),
      phase: i * 1.7,
      drift: 0.09 + (i % 4) * 0.035,
      mesh,
    };
  });

  // --- Enlaces -------------------------------------------------------------
  // Una sola geometría para todas las líneas; sus vértices se reescriben
  // cada cuadro siguiendo la deriva de los nodos.
  const edgePositions = new Float32Array(EDGES.length * 6);
  const edgeGeometry = new BufferGeometry();
  edgeGeometry.setAttribute('position', new BufferAttribute(edgePositions, 3));

  const edges = new LineSegments(
    edgeGeometry,
    new LineBasicMaterial({ color: INK, transparent: true, opacity: 0.16 })
  );
  group.add(edges);

  // --- Paquetes ------------------------------------------------------------
  const packetGeometry = new SphereGeometry(0.052, 12, 10);
  const packetMaterial = new MeshBasicMaterial({ color: LINK });
  const alertMaterial = new MeshBasicMaterial({ color: ALERT });

  const packets: Packet[] = Array.from({ length: PACKET_COUNT }, (_, i) => {
    // Uno de cada cinco viaja en naranja: el paquete que no debería estar ahí.
    const mesh = new Mesh(packetGeometry, i % 5 === 0 ? alertMaterial : packetMaterial);
    group.add(mesh);

    return {
      edge: Math.floor(Math.random() * EDGES.length),
      t: Math.random(),
      speed: 0.14 + Math.random() * 0.22,
      mesh,
    };
  });

  // --- Interacción ---------------------------------------------------------
  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  // Observa la caja del elemento, no la ventana: el hero puede cambiar de alto
  // por su propio contenido, y el evento de ventana llega antes de que el
  // layout se asiente.
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  const onResize = () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    resize();
  };
  window.addEventListener('resize', onResize);

  // --- Bucle ---------------------------------------------------------------
  let frame = 0;
  let time = 0;
  let last = performance.now();
  let tiltX = 0;
  let tiltY = 0;

  const tick = (now: number) => {
    const delta = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += delta;

    tiltX += (pointer.y * 0.14 - tiltX) * 0.045;
    tiltY += (pointer.x * 0.2 - tiltY) * 0.045;
    group.rotation.x = tiltX;
    group.rotation.y = tiltY;

    for (const node of nodes) {
      node.current.set(
        node.base.x + Math.sin(time * 0.5 + node.phase) * node.drift,
        node.base.y + Math.cos(time * 0.42 + node.phase) * node.drift,
        node.base.z + Math.sin(time * 0.33 + node.phase) * node.drift * 0.6
      );
      node.mesh.position.copy(node.current);
    }

    EDGES.forEach(([a, b], i) => {
      const from = nodes[a].current;
      const to = nodes[b].current;
      edgePositions.set([from.x, from.y, from.z, to.x, to.y, to.z], i * 6);
    });
    edgeGeometry.attributes.position.needsUpdate = true;

    for (const packet of packets) {
      packet.t += packet.speed * delta;

      if (packet.t >= 1) {
        // Al llegar, el paquete se reencamina por otro enlace.
        packet.t = 0;
        packet.edge = Math.floor(Math.random() * EDGES.length);
        packet.speed = 0.14 + Math.random() * 0.22;
      }

      const [a, b] = EDGES[packet.edge];
      packet.mesh.position.lerpVectors(nodes[a].current, nodes[b].current, packet.t);
    }

    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (!frame) return;
    cancelAnimationFrame(frame);
    frame = 0;
  };

  // Nada de GPU cuando el hero no está a la vista.
  const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
    threshold: 0,
  });
  observer.observe(host);

  start();

  window.addEventListener(
    'pagehide',
    () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      nodeGeometry.dispose();
      packetGeometry.dispose();
      edgeGeometry.dispose();
      [nodeMaterial, hubMaterial, packetMaterial, alertMaterial].forEach((m) => m.dispose());
      (edges.material as LineBasicMaterial).dispose();
      renderer.dispose();
    },
    { once: true }
  );
}
