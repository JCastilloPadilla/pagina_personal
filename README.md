# ccastillo.me + ccastillo.dev

Sitio personal de Jose Carlos Castillo Padilla.

El repositorio contiene dos sitios independientes. El portafolio sigue en
`src/` y se compila en `dist/`. El laboratorio editorial de **ccastillo.dev**
vive en `lab/` y se compila en `dist-dev/`.

| Sitio | Desarrollo | Compilación | Salida |
| --- | --- | --- | --- |
| ccastillo.me | `npm run dev` (4321) | `npm run build` | `dist/` |
| ccastillo.dev | `npm run dev:lab` (4322) | `npm run build:dev` | `dist-dev/` |

Para revisar la salida del laboratorio: `npm run preview:lab`.
El laboratorio habilita React únicamente en `astro.dev.config.mjs` e integra
SplitText en el titular, Magnet en los botones, AnimatedContent en los proyectos
y DecryptedText en la etiqueta del laboratorio. Las nuevas secciones usan
PixelTransition para revelar un QR escaneable y SpotlightCard en Remira.
Automatizaciones cierra los proyectos después de FlowTrix con un bloque breve
de texto sobre scripts de uso propio, sin banda animada ni controles interactivos.
El contenido se renderiza en servidor y los efectos respetan movimiento reducido.
La entrada a los proyectos usa SplitFlapText: «Siempre hay algo» con un tablero
que alterna «EN DESARROLLO», «EN PRUEBAS» y «EN LÍNEA», sin botón de pausa y con
cambios cada tres segundos mientras está visible.
El símbolo del título QR usa MetallicPaint en plata/grafito y el fondo de
«El laboratorio» usa CursorGrid tenue, implementados en `LabEffects.tsx`.
Son decorativos: el contenido sigue visible sin WebGL o JavaScript y el
movimiento reducido conserva una presentación estática.
Código y licencia: `lab/src/components/react-bits/`.
La portada y el footer están en `lab/src/pages/index.astro`. Las secciones están
en `lab/src/components/ProjectSections.astro`; sus galerías y controles React,
en `ProjectShowcase.tsx`. Los estilos propios están en `lab/src/styles/`.
Las capturas reales de QR y Remira están en `lab/src/assets/projects/`, con una
nota de procedencia. Remira muestra su captura principal. QR utiliza un esquema
vectorial propio (`QRBlueprint.tsx`), con entradas de enlace, WiFi y contacto,
conexiones animadas y un código escaneable en SVG, sin captura de pantalla.
FlowTrix tiene una sección propia sin imágenes del dashboard: `FlowNetwork.tsx`
representa equipos, agente, alertas e históricos con nodos seleccionables y
conexiones animadas. Es un esquema ilustrativo sin monitoreo en vivo.
Remira está marcado «En construcción»; sus respuestas aún
son simuladas. Astro copia las imágenes optimizadas
con nombres versionados en `dist-dev/_lab/`. No requiere servicios externos,
base de datos ni un proceso Node en producción.

El laboratorio sigue el sistema visual de `ccastillo.me`: importa sus estilos
globales, Archivo e IBM Plex. El separador de postes y luces se retiró del laboratorio.
El footer local usa una costa editorial a todo el ancho: tinta azul, papel frío
y sombras punteadas, con texto oscuro sobre mar claro. Fuente actual:
`lab/src/assets/footer-coast-cloud-edge-v3.png`. La portada usa la ilustración «Taller de prototipos», elegida
por el usuario. La revisión local usa `lab/src/assets/hero-workshop-cloud-edge-v4.png`,
una escena de lado a lado con escritorio continuo abajo y pared despejada para el
texto. Es un fondo a todo el ancho, sin columnas, velos ni filtros.
Ambas imágenes incorporan un remate irregular de nube/punteado con transparencia
real: abajo en la portada y arriba en el footer, para integrarse con el fondo.
El encuadre conserva esos bordes. Se optimizan a WebP manteniendo alfa durante el build.
Los prompts y la procedencia de esta edición están en `lab/src/assets/cloud-edges.md`.
Los ajustes propios de composición quedan en
`lab/src/styles/lab.css`.

El despliegue del laboratorio se documenta en
[infra/ccastillo.dev/README.md](infra/ccastillo.dev/README.md).

**Stack:** Astro 7 (estático) · Tailwind 4 · React (islas) · three.js · Paper Shaders · PHP 8 + MySQL (pendiente)

## Cómo verlo en local

```bash
npm install
npm run dev
```

Abre <http://localhost:4321>. Recarga en caliente al guardar cualquier archivo.

Es la forma recomendada mientras iteramos el diseño: no necesitas Laragon
encendido porque todavía no hay PHP.

## Estructura

```
src/
  data/site.ts        Todo el contenido del sitio (perfil, stack, proyectos, contacto)
  layouts/            Documento base: <head>, fuentes, fondo
  components/         Nav, Hero, About, Featured, Work, Contact, Footer y los dos modales
  components/HeroWarp.tsx  Isla de React: fondo del hero con Paper Shaders
  scripts/            topology.ts (three.js), packet-catch.ts (minijuego), modals.ts
  styles/global.css   Tokens de color y tipografía (@theme de Tailwind 4)
  pages/index.astro   Única página; ensambla las secciones
public/               Se copia tal cual a dist/ — aquí irán los api/*.php
dist/                 Salida del build (ignorada por git)
```

La dirección visual está documentada en
[docs/superpowers/specs](docs/superpowers/specs/2026-07-24-ccastillo-rediseno-composicion.md):
paleta, tipografías y por qué la banda de FlowTrix es la única sección oscura.

Para cambiar textos, proyectos o enlaces: **`src/data/site.ts`**. Los componentes
leen de ahí, así que no hace falta tocar el marcado.

## Compilar

```bash
npm run build
```

Genera `dist/`. `npm run preview` lo sirve para revisarlo antes de publicar.

## Cuando entre PHP + MySQL

La estructura ya está preparada. Astro copia `public/` **sin tocar** dentro de
`dist/`, así que un `public/api/contacto.php` termina en `dist/api/contacto.php`
y Apache lo ejecuta desde el mismo origen que el sitio: sin CORS y sin Node en
producción.

Solo falta apuntar el DocumentRoot de Laragon a `dist/`:

1. Laragon → *Menú* → **Apache** → **sites-enabled** → `auto.ccastillo.test.conf`
2. Cambia las dos rutas de `C:/laragon/www/ccastillo` a `C:/laragon/www/ccastillo/dist`
3. Laragon → **Recargar Apache**

Con eso, <http://ccastillo.test> sirve el sitio compilado y ejecuta los PHP.
Durante el desarrollo del diseño sigue siendo más cómodo `npm run dev`.

## Comandos

| Comando           | Qué hace                                  |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en `:4321`         |
| `npm run build`   | Compila a `dist/`                         |
| `npm run preview` | Sirve `dist/` para revisión               |
| `npm run check`   | Verifica tipos y diagnósticos de Astro    |
