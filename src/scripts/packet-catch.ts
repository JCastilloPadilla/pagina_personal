/**
 * Packet Catch — minijuego del easter egg del footer.
 *
 * Atrapas los paquetes azules con el router y esquivas los rojos.
 * El módulo no toca el DOM fuera del canvas: reporta puntaje por callback.
 */

// Mismos tokens que el sitio: azul de enlace para lo bueno, naranja para lo
// que no debería estar en la red.
const INK = '#0D1526';
const LINK = '#2F6BFF';
const ALERT = '#FF6B35';
const UP = '#12B76A';

const PADDLE_WIDTH = 76;
const PADDLE_HEIGHT = 12;
const SPAWN_INTERVAL = 58; // en frames normalizados a 60fps
const KEYBOARD_STEP = 34;

interface Packet {
  x: number;
  y: number;
  speed: number;
  bad: boolean;
}

export interface GameState {
  score: number;
  lives: number;
  over: boolean;
}

export interface Game {
  start(): void;
  stop(): void;
  restart(): void;
  nudge(direction: -1 | 1): void;
}

export function createGame(
  canvas: HTMLCanvasElement,
  onChange: (state: GameState) => void
): Game {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D no disponible');

  let paddleX = canvas.width / 2;
  let packets: Packet[] = [];
  let spawnAccumulator = 0;
  let lastFrame = 0;
  let score = 0;
  let lives = 3;
  let frame = 0;
  let over = false;

  const report = () => onChange({ score, lives, over });

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    paddleX = (event.clientX - rect.left) * (canvas.width / rect.width);
  };

  const drawPaddle = () => {
    const y = canvas.height - 26;
    const x = paddleX - PADDLE_WIDTH / 2;

    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.roundRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT, 2);
    ctx.fill();

    // Antenita del router.
    ctx.fillStyle = UP;
    ctx.fillRect(paddleX - 3, y + 4, 6, 4);
  };

  const drawGameOver = () => {
    ctx.fillStyle = 'rgba(11,18,32,0.82)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#EDF1F7';
    ctx.textAlign = 'center';
    ctx.font = '700 28px "Archivo Variable", Arial, sans-serif';
    ctx.fillText('Paquetes perdidos', canvas.width / 2, canvas.height / 2 - 4);
    ctx.font = '500 13px "IBM Plex Mono", monospace';
    ctx.fillText(`PUNTAJE ${score}`, canvas.width / 2, canvas.height / 2 + 26);
  };

  const loop = (now: number) => {
    // dt normalizado: 1.0 == un frame de 60fps. Se limita para que un tab
    // en segundo plano no teletransporte los paquetes al volver.
    const delta = Math.min(2.5, (now - lastFrame) / 16.67);
    lastFrame = now;

    spawnAccumulator += delta;
    if (spawnAccumulator >= SPAWN_INTERVAL) {
      spawnAccumulator = 0;
      packets.push({
        x: 24 + Math.random() * (canvas.width - 48),
        y: -14,
        speed: 1.1 + Math.random() * 0.9,
        bad: Math.random() < 0.24,
      });
    }

    paddleX = Math.max(
      PADDLE_WIDTH / 2,
      Math.min(canvas.width - PADDLE_WIDTH / 2, paddleX)
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const paddleTop = canvas.height - 26;
    let changed = false;

    packets = packets.filter((packet) => {
      packet.y += packet.speed * delta;

      const caught =
        packet.y > paddleTop - 6 &&
        packet.y < paddleTop + PADDLE_HEIGHT + 6 &&
        Math.abs(packet.x - paddleX) < PADDLE_WIDTH / 2 + 8;

      if (caught) {
        if (packet.bad) lives--;
        else score += 10;
        changed = true;
        return false;
      }

      if (packet.y > canvas.height + 20) {
        // Dejar caer un paquete bueno cuesta una vida; los malos, nada.
        if (!packet.bad) {
          lives--;
          changed = true;
        }
        return false;
      }

      ctx.fillStyle = packet.bad ? ALERT : LINK;
      ctx.beginPath();
      ctx.arc(packet.x, packet.y, 7, 0, Math.PI * 2);
      ctx.fill();

      return true;
    });

    drawPaddle();

    if (lives <= 0) {
      over = true;
      drawGameOver();
      frame = 0;
      report();
      return;
    }

    if (changed) report();

    frame = requestAnimationFrame(loop);
  };

  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    canvas.removeEventListener('pointermove', onPointerMove);
  };

  const start = () => {
    stop();
    paddleX = canvas.width / 2;
    packets = [];
    spawnAccumulator = 0;
    score = 0;
    lives = 3;
    over = false;
    lastFrame = performance.now();
    report();
    canvas.addEventListener('pointermove', onPointerMove);
    frame = requestAnimationFrame(loop);
  };

  return {
    start,
    stop,
    restart: start,
    nudge(direction) {
      paddleX += direction * KEYBOARD_STEP;
    },
  };
}
