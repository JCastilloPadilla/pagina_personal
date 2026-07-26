# ccastillo.me — Diseño base (fase 1)

**Fecha:** 2026-07-24
**Estado:** implementado
**Origen:** proyecto de Claude Design `b49ae4f3` (`ccastillo.me.dc.html`)

## Objetivo

Portar la maqueta del sitio personal a un proyecto real en Astro + Tailwind,
dejando la estructura lista para conectar PHP + MySQL en la siguiente fase.
Fase 1 es **solo maqueta**: el contenido vive en archivos, no en base de datos.

## Decisiones

### Astro estático + API PHP en el mismo origen

Astro compila a `dist/`, que es el DocumentRoot de Apache (Laragon). Astro copia
`public/` sin modificar dentro de `dist/`, así que `public/api/*.php` termina en
`dist/api/*.php` y Apache lo ejecuta.

Consecuencias:

- Un solo origen: sin CORS, sin proxy, sin Node en producción.
- Despliegue posible en hosting compartido barato (Apache + PHP + MySQL).
- El precio: nada de rutas dinámicas server-side en Astro. Lo dinámico lo
  resuelve PHP o un fetch desde el cliente. Aceptable para un portafolio.

Alternativa descartada: Astro SSR con adapter de Node. Más potente, pero exige
Node corriendo en producción y coordinar dos servidores.

### El contenido es un módulo tipado

Todo el texto del sitio vive en `src/data/site.ts` con interfaces explícitas
(`Profile`, `Project`, `ContactLink`). Cuando entre MySQL, cambia la fuente de
esos arreglos y **los componentes no se tocan**: los tipos son el contrato.

### Dependencias por npm, no por CDN

La maqueta cargaba three.js desde cdnjs y las fuentes desde Google Fonts. Ambas
pasan a npm (`three`, `@fontsource-variable/*`): funciona sin internet en
Laragon, no hay peticiones a terceros y Vite hace tree-shaking de three.

three.js son ~514 KB, así que se carga con `import()` dinámico en su propio
chunk y solo si `prefers-reduced-motion` no está activo.

## Estructura

```
src/
  data/site.ts        Contenido
  layouts/            BaseLayout
  components/         Nav, Hero, About, Projects, ProjectPlaceholder,
                      Contact, Footer, GameModal, LoginModal
  scripts/            hero3d.ts, packet-catch.ts, modals.ts
  styles/global.css   Tokens @theme
  pages/index.astro
public/api/           Reservado para los endpoints PHP
```

Cada script es un módulo independiente con una interfaz mínima:
`initHeroScene(selector)`, `createGame(canvas, onChange) -> Game`,
`initModals()`. Ninguno conoce el marcado de los otros.

## Divergencias deliberadas respecto a la maqueta

La maqueta era una vista de escritorio con estilos inline. Al portarla:

1. **Responsive.** Los grids de 2 y 3 columnas se apilan bajo `lg:`/`sm:`; el
   nav se vuelve una píldora con scroll horizontal. La maqueta no tenía media
   queries.
2. **Semántica y accesibilidad.** Los `<span onClick>` pasan a `<button>`; las
   listas de tags y contactos son `<ul>`; los inputs del login tienen `<label>`;
   hay enlace de salto al contenido y anillo de foco visible.
3. **Modales nativos.** `<dialog>` en vez de overlays a mano: atrapado de foco,
   fondo inerte y Esc sin código propio.
4. **`prefers-reduced-motion`.** Sin escena 3D y sin transiciones.

## Riesgos conocidos y cómo se mitigaron

- **El canvas de WebGL arrastraba el ancho del layout.** `renderer.setSize()`
  escribe `width`/`height` inline en el canvas; con `aspect-square w-full` eso
  hacía que la columna del hero midiera 435 px dentro de un viewport de 375.
  Se pasa `setSize(w, h, false)` y el tamaño visual lo manda el CSS.
- **El evento `close` de `<dialog>` no es fiable en todos los motores.** Si no
  se despacha, el juego sigue consumiendo CPU tras cerrar y el scroll del fondo
  queda bloqueado. El cierre pasa siempre por `closeDialog()`, invocado desde el
  botón ×, el clic en el backdrop y el evento `cancel` (Esc); el listener de
  `close` queda solo como red de seguridad y la limpieza es idempotente.

## Fuera de alcance en esta fase

Proyectos desde MySQL, formulario de contacto con persistencia, y login real con
sesión PHP. El modal de login responde siempre "Credenciales incorrectas", igual
que la maqueta.

## Verificación

- `npm run check`: 0 errores, 0 avisos, 0 sugerencias (17 archivos).
- `npm run build`: correcto; three.js queda en un chunk aparte de 514 KB.
- Sin desbordamiento horizontal a 360, 375 y 1280 px.
- Comprobado en navegador: canvas WebGL montado, ambos modales abren y cierran,
  el triple clic exige los tres clics, el scroll del fondo se libera al cerrar.
