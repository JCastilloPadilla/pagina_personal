/**
 * Cableado del minijuego reservado para una próxima iteración.
 *
 * Los diálogos son <dialog> nativos: el atrapado de foco y el fondo inerte
 * vienen de serie. El cierre, en cambio, pasa siempre por `closeDialog()` en
 * vez de escuchar el evento `close` — hay motores que no lo despachan, y si el
 * juego no se detuviera al cerrar seguiría comiendo CPU en segundo plano.
 */
import { createGame, type Game } from './packet-catch';

/** Qué hay que apagar cuando cada diálogo se cierra. Debe ser idempotente. */
const cleanups = new WeakMap<HTMLDialogElement, () => void>();

function openDialog(dialog: HTMLDialogElement): void {
  document.body.setAttribute('data-modal-open', '');
  dialog.showModal();
}

function closeDialog(dialog: HTMLDialogElement): void {
  if (dialog.open) dialog.close();
  cleanups.get(dialog)?.();

  if (!document.querySelector('dialog[open]')) {
    document.body.removeAttribute('data-modal-open');
  }
}

export function initModals(): void {
  const gameDialog = document.querySelector<HTMLDialogElement>('#game-dialog');

  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-close-dialog]')) {
    const dialog = button.closest('dialog');
    if (dialog) button.addEventListener('click', () => closeDialog(dialog));
  }

  for (const dialog of document.querySelectorAll<HTMLDialogElement>('dialog')) {
    // Esc: tomamos el control en vez de dejar el cierre por defecto, para que
    // la limpieza corra siempre por el mismo camino.
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeDialog(dialog);
    });

    // Red de seguridad por si algo cierra el diálogo sin pasar por aquí.
    dialog.addEventListener('close', () => closeDialog(dialog));

    // Clic en el backdrop: el <dialog> recibe el evento cuando el punto
    // del clic cae fuera de su caja.
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      const outside =
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom;
      if (outside) closeDialog(dialog);
    });
  }

  setupGame(gameDialog);
}

function setupGame(dialog: HTMLDialogElement | null): void {
  const trigger = document.querySelector<HTMLButtonElement>('[data-open-game]');
  const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas');
  if (!dialog || !trigger || !canvas) return;

  const scoreOut = dialog.querySelector<HTMLElement>('[data-game-score]');
  const livesOut = dialog.querySelector<HTMLElement>('[data-game-lives]');

  let game: Game | null = null;

  const ensureGame = (): Game => {
    game ??= createGame(canvas, ({ score, lives }) => {
      if (scoreOut) scoreOut.textContent = String(score);
      if (livesOut) livesOut.textContent = String(Math.max(0, lives));
    });
    return game;
  };

  cleanups.set(dialog, () => game?.stop());

  trigger.addEventListener('click', () => {
    openDialog(dialog);
    ensureGame().start();
  });

  dialog.querySelector('[data-restart-game]')?.addEventListener('click', () => {
    ensureGame().restart();
  });

  // Flechas para quien no juega con mouse.
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      game?.nudge(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      game?.nudge(1);
    }
  });
}
