# ccastillo.me — Rediseño de composición

**Fecha:** 2026-07-24
**Estado:** implementado
**Sustituye la dirección visual de:** [diseño base](./2026-07-24-ccastillo-diseno-base-design.md)

## Encargo

Conservar el header (la píldora flotante) y el carácter interactivo del sitio.
Rehacer la composición general.

## Diagnóstico

La maqueta original apilaba la misma pieza cinco veces: tarjeta blanca al 80 %,
radio de 26–30 px, sombra difusa. Hero, sobre mí, proyectos, contacto — todo con
el mismo peso visual y el mismo contorno. Sin jerarquía más allá del tamaño de
letra, y sin nada que dijera a qué se dedica su dueño: el degradado crema, lila y
durazno con serif de contraste alto podía ser de cualquier portafolio.

## Dirección

### Color: los pares de un cable Ethernet

La paleta sale del código T568B — azul, naranja y verde — sobre papel frío en
lugar de crema. No es decoración: cada color hace un trabajo.

| Token       | Hex       | Función                                    |
| ----------- | --------- | ------------------------------------------ |
| `ground`    | `#EDF1F7` | Papel frío, el fondo de toda la página     |
| `ink`       | `#0D1526` | Texto y elementos sólidos                  |
| `graphite`  | `#59637A` | Texto secundario (5.3:1 sobre `ground`)    |
| `link`      | `#2F6BFF` | El enlace: acento primario, hover, foco    |
| `alert`     | `#FF6B35` | Lo excepcional: premios, paquete anómalo   |
| `up`        | `#12B76A` | Estado activo                              |
| `night`     | `#0B1220` | La banda de FlowTrix                       |

### Tipografía

- **Archivo Variable** con el eje de ancho abierto a 116 % para titulares. Lee a
  rotulación de equipo de rack, que es el mundo del que trata el sitio.
- **IBM Plex Sans** para lectura. Nació para una empresa de tecnología y trae de
  regalo una monoespaciada hermana.
- **IBM Plex Mono** para todo lo que es dato: etiquetas de sección, nombres de
  herramientas, cifras, premios.

Se descarta el serif de contraste alto del diseño anterior: es la tipografía por
defecto de cualquier portafolio generado hoy.

### Forma

Una sola pieza redonda en toda la página: la píldora del nav, que el cliente
quería conservar. Todo lo demás es recto (radio de 3 px o cero). Esa singularidad
es lo que la hace funcionar; rodeada de otras veinte formas redondas no destacaba.

### Composición

| Sección   | Antes                              | Ahora                                                        |
| --------- | ---------------------------------- | ------------------------------------------------------------ |
| Hero      | Texto izquierda, caja 3D derecha   | Topología a sangre completa, titular encima, franja de estado |
| Sobre mí  | Tarjeta + nube de 10 etiquetas     | Editorial abierto + ficha técnica agrupada por función        |
| FlowTrix  | Tarjeta blanca como las demás      | **Banda oscura a sangre completa**, la única del sitio        |
| Proyectos | Dos tarjetas con hueco de captura  | Lista con filetes                                             |
| Contacto  | Tres tarjetas idénticas            | Una acción principal: el correo a 64 px                       |

Las secciones ya no se separan con sombras sino con filetes y etiquetas mono, el
lenguaje de una hoja de especificaciones.

### Firma

La topología viva del hero: nodos, enlaces y paquetes que viajan por ellos, con
uno de cada cinco en naranja — el paquete que no debería estar ahí. Sustituye a
las formas 3D abstractas, que no decían nada del oficio. Conserva el paralaje con
el mouse del diseño anterior.

Se dibuja con materiales `Basic` y sin luces: debe leerse como un diagrama de
red, no como un render.

### Riesgo asumido

La banda oscura de FlowTrix rompe la página a la mitad. Es deliberado: es el
proyecto premiado, es lo que hay que mirar, y un panel de monitoreo se ve así.
Toda la audacia del diseño se gasta ahí; el resto se mantiene callado.

## Decisiones de movimiento

La entrada escalonada del hero anima **solo el desplazamiento, nunca la
opacidad**. Si la animación no llega a correr —pestaña en segundo plano, motor
sin composición, un fallo cualquiera— el titular queda 24 px abajo, pero se lee.

Por el mismo criterio se descartó la revelación por scroll con
`IntersectionObserver`: en pruebas quedaban cuatro de siete bloques en
`opacity: 0` cuando el navegador no producía cuadros. Una animación decorativa no
puede ser condición para que el contenido exista.

## Verificación

- `npm run check`: 0 errores, 0 avisos, 0 sugerencias (18 archivos).
- `npm run build`: correcto; three.js aislado en un chunk de 508 KB con carga
  dinámica.
- Sin desbordamiento horizontal ni elementos en `opacity: 0` a 375 y 1280 px.
- Ambos modales abren, cierran y liberan el scroll; el triple clic exige los tres.
- Contraste: `graphite` sobre `ground` 5.3:1; los textos de la banda oscura se
  subieron de `white/45` y `white/35` a `white/60` y `white/50` tras medirlos.

## Sin cambios

Estructura del proyecto, contrato de `src/data/site.ts`, estrategia de despliegue
(Astro estático a `dist/` + PHP en `public/api/`) y el alcance de la fase 1: sigue
siendo maqueta, sin MySQL.
