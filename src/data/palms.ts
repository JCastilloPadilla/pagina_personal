/**
 * Dibujo de las palmeras del pie de página.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * PARA CAMBIARLAS POR UN SVG DE VERDAD
 *
 * Sustituye el contenido de `PALM_ARTWORK` por tus propios trazados. Cada
 * palmera necesita:
 *
 *   - `paths`: los atributos `d` de la silueta, rellenos (sin trazo).
 *   - `height`: alto total del dibujo.
 *   - `halfWidth`: media anchura de la copa.
 *
 * El único requisito de las coordenadas es que la **base del tronco quede en
 * (0, 0)** y la palmera crezca hacia arriba, o sea en y negativa. Si tu SVG
 * viene con la esquina superior izquierda en (0,0), réstale su alto a todas las
 * `y` — o dime las medidas y lo ajusto yo.
 *
 * El resto del sistema (colocación, escala, espejo y el balanceo con el cursor)
 * no depende del dibujo: funciona con cualquier silueta.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Mientras tanto, lo de aquí abajo genera las siluetas por geometría. Se calcula
 * al compilar, así que en el navegador solo queda SVG plano.
 */

export interface PalmArtwork {
  id: string;
  /** Alto total del dibujo, con la base del tronco en y = 0. */
  height: number;
  /** Media anchura de la copa. */
  halfWidth: number;
  /** Trazados rellenos que componen la palmera. */
  paths: string[];
  /** Elementos redondos sueltos: nudo de la copa y cocos. */
  circles: { cx: number; cy: number; r: number }[];
}

interface Point {
  x: number;
  y: number;
}

interface PalmShape {
  id: string;
  /** Altura del tronco. */
  h: number;
  /** Curvatura del tronco. */
  bend: number;
  /** Cuántas hojas tiene la copa. */
  fronds: number;
  /** Largo base de las hojas. */
  leaf: number;
  coco: boolean;
}

/** Se dibujan grandes y se reducen al colocarlas: así los enteros bastan para
 *  las coordenadas y cada `d` ocupa la mitad. */
const SHAPES: PalmShape[] = [
  { id: 'palm-a', h: 150, bend: -14, fronds: 8, leaf: 62, coco: true },
  { id: 'palm-b', h: 186, bend: 20, fronds: 9, leaf: 72, coco: false },
  { id: 'palm-c', h: 118, bend: -9, fronds: 7, leaf: 54, coco: true },
];

/** Reparto de las hojas alrededor de la vertical, en grados. */
const FROND_ANGLES: Record<number, number[]> = {
  7: [-84, -60, -34, 0, 34, 60, 84],
  8: [-86, -66, -44, -16, 16, 44, 66, 86],
  9: [-88, -68, -46, -22, 0, 22, 46, 68, 88],
};

/** Muestras a lo largo de cada nervadura. */
const SAMPLES = 11;

const r = (n: number) => Math.round(n);

function quadAt(p0: Point, c: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * c.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * c.y + t * t * p2.y,
  };
}

/** Normal unitaria a la curva en t: hacia dónde se abre la hoja. */
function normalAt(p0: Point, c: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  const tx = 2 * mt * (c.x - p0.x) + 2 * t * (p2.x - c.x);
  const ty = 2 * mt * (c.y - p0.y) + 2 * t * (p2.y - c.y);
  const len = Math.hypot(tx, ty) || 1;
  return { x: -ty / len, y: tx / len };
}

/**
 * Una hoja pinnada: silueta rellena con el borde dentado.
 *
 * La anchura nace en cero, alcanza el máximo pasada la mitad y vuelve a cero en
 * la punta. El dentado alterna entre anchura llena y recortada, desfasado entre
 * los dos lados para que ninguna hoja salga simétrica.
 */
function frondPath(angleDeg: number, baseLength: number): string {
  const a = (angleDeg * Math.PI) / 180;
  const sin = Math.sin(a);
  const cos = Math.cos(a);

  const length = baseLength * (0.84 + 0.3 * Math.abs(sin));
  const droop = 0.62 * length * Math.abs(sin);
  const maxWidth = length * 0.17;

  const p0: Point = { x: 0, y: 0 };
  const p2: Point = { x: length * sin, y: -length * cos + droop };
  const c: Point = { x: 0.5 * length * sin, y: -0.9 * length * cos };

  const width = (t: number) => maxWidth * Math.sin(Math.PI * Math.pow(t, 1.25));

  const left: string[] = [];
  const right: string[] = [];

  for (let i = 1; i < SAMPLES; i++) {
    const t = i / SAMPLES;
    const p = quadAt(p0, c, p2, t);
    const n = normalAt(p0, c, p2, t);
    const w = width(t);

    const wl = w * (i % 2 === 0 ? 1 : 0.42);
    const wr = w * (i % 2 === 0 ? 0.42 : 1);

    left.push(`L${r(p.x + n.x * wl)} ${r(p.y + n.y * wl)}`);
    right.unshift(`L${r(p.x - n.x * wr)} ${r(p.y - n.y * wr)}`);
  }

  return `M0 0${left.join('')}L${r(p2.x)} ${r(p2.y)}${right.join('')}Z`;
}

/** Tronco relleno que se afina hacia la copa. */
function trunkPath(height: number, bend: number): string {
  const p0: Point = { x: 0, y: 0 };
  const p2: Point = { x: 0, y: -height };
  const c: Point = { x: bend, y: -height / 2 };

  const baseWidth = 6;
  const topWidth = 2.4;

  const up: string[] = [];
  const down: string[] = [];

  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const p = quadAt(p0, c, p2, t);
    const n = normalAt(p0, c, p2, t);
    const w = baseWidth + (topWidth - baseWidth) * t;

    up.push(`${i === 0 ? 'M' : 'L'}${r(p.x + n.x * w)} ${r(p.y + n.y * w)}`);
    down.unshift(`L${r(p.x - n.x * w)} ${r(p.y - n.y * w)}`);
  }

  return up.join('') + down.join('') + 'Z';
}

export const PALM_ARTWORK: PalmArtwork[] = SHAPES.map((shape) => {
  const crown = shape.leaf * 1.15;

  const circles = [{ cx: 0, cy: -shape.h, r: 5 }];
  if (shape.coco) {
    circles.push(
      { cx: -7, cy: -shape.h + 9, r: 5 },
      { cx: 7, cy: -shape.h + 9, r: 5 },
      { cx: 0, cy: -shape.h + 15, r: 5 }
    );
  }

  return {
    id: shape.id,
    height: shape.h + crown,
    halfWidth: crown,
    paths: [
      trunkPath(shape.h, shape.bend),
      // Las hojas se dibujan desde la copa: se desplaza su origen allí.
      ...FROND_ANGLES[shape.fronds].map((angle) =>
        translatePath(frondPath(angle, shape.leaf), 0, -shape.h)
      ),
    ],
    circles,
  };
});

/** Desplaza un trazado ya generado. Solo entiende los comandos que emitimos
 *  aquí (M y L absolutos), suficiente para mover las hojas a la copa. */
function translatePath(d: string, dx: number, dy: number): string {
  return d.replace(/([ML])(-?\d+) (-?\d+)/g, (_, cmd, x, y) => {
    return `${cmd}${Number(x) + dx} ${Number(y) + dy}`;
  });
}
