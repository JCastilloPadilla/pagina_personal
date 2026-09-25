import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('perfil y ficha técnica reflejan el contenido aprobado', async () => {
  const [site, about, footer, index] = await Promise.all([
    read('src/data/site.ts'),
    read('src/components/About.astro'),
    read('src/components/Footer.astro'),
    read('src/pages/index.astro'),
  ]);

  assert.match(site, /'Redes, sistemas y automatización en práctica\.'/);
  assert.match(site, /y mis áreas de mayor interés son: redes, sistemas y seguridad\./);
  assert.match(site, /'Fuera del código: café, netflix y desarmar cosas para ver cómo funcionan\.'/);
  assert.match(site, /'Café, netflix y cosas por armar'/);
  assert.match(site, /\{ label: 'Lenguajes', items: \['HTML', 'CSS', 'JavaScript', 'PHP', 'Dart'\] \}/);
  assert.match(site, /\{ label: 'Herramientas', items: \['Apache', 'Git', 'MySQL', 'Debian'\] \}/);
  assert.match(about, /stackGroups\.map/);
  assert.doesNotMatch(footer, /data-lock-tap/);
  assert.doesNotMatch(index, /LoginModal/);
});

test('QR no muestra un botón mientras no está desplegado y el juego queda guardado', async () => {
  const [site, work, index, game] = await Promise.all([
    read('src/data/site.ts'),
    read('src/components/Work.astro'),
    read('src/pages/index.astro'),
    read('src/components/GameModal.astro'),
  ]);

  assert.doesNotMatch(site, /action:\s*\{/);
  assert.doesNotMatch(work, /Ir al generador/);
  assert.match(index, /GameModal/);
  assert.match(game, /Packet Catch/);
});

test('la navegación y la franja de estado tienen una composición móvil explícita', async () => {
  const [nav, hero] = await Promise.all([
    read('src/components/Nav.astro'),
    read('src/components/Hero.astro'),
  ]);

  assert.doesNotMatch(nav, /overflow-x-auto/);
  assert.match(nav, /flex-1 min-w-0/);
  assert.doesNotMatch(hero, /min-h-\[100svh\]/);
  assert.match(hero, /flex flex-col sm:min-h-\[88vh\]/);
  assert.match(hero, /grid w-full[^\"]*gap-2[^\"]*sm:flex/);
  assert.match(hero, /sm:flex-1 sm:justify-center/);
});

test('el pie reserva espacio móvil para el jardín sin invadir sus leyendas', async () => {
  const footer = await read('src/components/Footer.astro');

  assert.match(footer, /px-6 pb-20 sm:px-8 sm:pb-4/);
});

test('el hero conserva la presentación original sin retrato personal', async () => {
  const hero = await read('src/components/Hero.astro');

  assert.doesNotMatch(hero, /import portrait from/);
  assert.doesNotMatch(hero, /data-hero-portrait/);
  assert.match(hero, /<p class="u-rise u-label text-ink\/80" style="animation-delay: 60ms">\s*\{profile\.place\}/);
  assert.match(hero, /\{profile\.place\}[\s\S]*?<h1/);
  assert.doesNotMatch(hero, /lg:col-start-2/);
});
