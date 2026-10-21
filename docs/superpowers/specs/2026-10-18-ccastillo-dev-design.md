# ccastillo.dev — laboratorio abierto

> **Revisión vigente, 20 de octubre de 2026:** portada y footer con remates orgánicos; React habilitado solo en el laboratorio. Entrada de proyectos con SplitFlapText («Siempre hay algo», estados centrados cada tres segundos). QR usa un esquema vectorial y un botón negro animado para revelar el código escaneable con PixelTransition; símbolo decorativo con MetallicPaint en grafito/plata. Remira conserva una sola captura, estado «En construcción» y progreso real con respuestas de demostración. FlowTrix tiene diagrama interactivo compacto, con explicación junto a los nodos y bloque de título estático en escritorio. Automatizaciones cierra los proyectos en una franja discreta y sin animación. «El laboratorio» describe pruebas de web, bases de datos, APIs e integraciones, con CursorGrid tenue. Footer con su altura original e imagen desplazada arriba. Se conserva movimiento reducido y contenido sin JavaScript. El usuario autoriza commit y push a GitHub; la publicación en la VPS sigue pendiente de instrucción expresa.

> **Remates de imagen vigentes, 19 de octubre de 2026:** el usuario pide regenerar los bordes señalados en las capturas con un acabado de nube/punteado irregular, como su tercera referencia. ImageGen edita sólo la franja inferior de la portada y la superior del footer, conservando temas, paleta y áreas de lectura. Fuentes `hero-workshop-cloud-edge-v4.png` y `footer-coast-cloud-edge-v3.png`; prompts en `lab/src/assets/cloud-edges.md`. Se usan bordes transparentes reales, sin velos globales ni máscaras CSS. `object-position` ancla el hero abajo y el footer arriba para conservar los remates. Alfa verificada en originales y WebP; borde inferior del hero totalmente transparente y borde superior del footer casi totalmente transparente. Capturas y QA a 1920/1440/390 px, sin desbordamiento ni excepciones JS. Se mantiene exclusivamente local.

> **Publicación suspendida por instrucción del usuario:** a partir de su revisión de la portada «Taller de prototipos», iterar exclusivamente en el servidor local con recarga en vivo. El usuario indicará expresamente cuándo volver a publicar en la VPS; la autorización anterior de despliegue ya no aplica a las siguientes iteraciones.

> **Footer local vigente (v2 editorial):** el usuario mantiene la composición costera, pero pide unificar colores, tono editorial y punteado con la portada. Se regenera con ImageGen usando la costa anterior como referencia de composición y el hero actual como referencia de estilo. Imagen `lab/src/assets/footer-editorial-coast-v2.png`, procedencia y prompt en el Markdown homónimo; WebP ~380 kB. Fondo a todo el ancho, papel frío #EDF1F7, tinta #0D1526, acentos #2F6BFF y puerta naranja. El mar es claro y admite texto oscuro, eliminando el salto tropical saturado. Vegetación, costa y sombras se resuelven con tinta y punteado. Se conservan el velero, el estudio, el contacto y los enlaces reales. Sin filtros ni overlays. Revisado en 1920/1440/768/390/320 px. Implementación exclusivamente local, sin publicación.

> **Revisión local de portada, vigente (v3):** el usuario aclara que quiere una imagen panorámica de lado a lado, como la de ccastillo.me, con una zona despejada dentro del propio dibujo para el texto. Rechaza la solución en columnas de v2. Se modifica el taller original usando la ilustración de .me como referencia de composición: escritorio continuo a todo el ancho en la parte inferior, pared vacía arriba y en el centro, equipos más altos hacia el extremo derecho. Fuente `lab/src/assets/hero-workshop-panorama-v3.png`; prompt en `hero-workshop-panorama-v3.md`. El hero usa esa única imagen a sangre y texto superpuesto sobre la pared vacía, sin columnas, velos, filtros, máscaras ni pseudo-elementos. Verificado en 1920/1440/1024/768/390/320 px, sin desbordamiento. No publicar esta revisión sin instrucción expresa.

> **Dirección actual, revisión del 18 de octubre de 2026:** el usuario solicita rediseñar lo construido siguiendo la línea de ccastillo.me. Esto sustituye la dirección de color y tipografía inicial descrita abajo. Se conservan alcance, proyectos y autorización de publicación.

## Sistema visual compartido (vigente)

- Importar el sistema de estilos y las fuentes reales del portafolio: Archivo Variable con ancho 116%, IBM Plex Sans e IBM Plex Mono. Papel frío #EDF1F7, tinta #0D1526, azul #2F6BFF y verde de estado #12B76A.
- Seguir su navegación fija entre corchetes, etiquetas técnicas, márgenes de 1180px, retícula con filetes, índices de sección y botones de 3px.
- Portada actual: «Taller de prototipos», tercera opción generada con ImageGen y elegida por el usuario; original en `lab/src/assets/hero-prototype-workshop.png`, prompt y procedencia junto al archivo. Sustituye la ilustración costera anterior. WebP calidad 85 en build (~411 kB). Escritorio: taller a la derecha con velo para legibilidad; móvil y tableta: dibujo en la parte inferior. Titular «Laboratorio de desarrollo.»
- Composición de FlowTrix en dos columnas, proyectos secundarios en filas, contenido abierto sobre el mismo papel y cierre azul con palmeras.
- Reutilizar directamente UtilityRule y FooterGarden del portafolio; no duplicar ni modificar los originales.
- La instrucción de seguir la marca existente prevalece sobre las prohibiciones genéricas del skill de diseño para mono, etiquetas, líneas, numeración, degradado de firma y tercera fuente. No agregar fotografías o video ajenos para llenar cuotas: la evidencia son las capturas reales y la ilustración propia.
- Implementación directa de esta corrección visual; verificar y actualizar la publicación existente usando la autorización de despliegue de esta conversación.

## Primera dirección (histórica, sustituida)

Dirección aprobada por el usuario el 18 de octubre de 2026: cuaderno editorial de desarrollo, fondo marfil, tinta oscura, naranja, composición asimétrica, titulares grandes. Apertura: «Ideas que terminan en código.» Proyectos reales con enlaces y estado honesto; espacio para trabajo en proceso; GitHub y portafolio personal al cierre. El usuario autoriza implementar en el mismo repositorio y publicar en la VPS en el espacio de ccastillo.dev.

## Decisiones de implementación

- Astro existente, entrada y compilación independientes en `lab/` y `dist-dev/`. Conservar intacto el portafolio y su compilación.
- Paleta aprobada: marfil neutro, tinta carbón y naranja vivo, evitando tonos terracota. Serif editorial y sans de lectura, fuentes locales.
- Dirección sorteada: type-only-statement, seed 311849322; la tipografía abre y las capturas reales aportan evidencia después. El listado se adapta a tres proyectos reales, en lugar de inventar los seis a doce registros del blueprint. El footer se reduce al contenido real, sin imponer una pantalla vacía.
- Inventario específico: Jose Castillo, Mazatlán, redes, agentes Windows, FlowTrix, Facultad de Informática UAS, telemetría, automatizaciones internas, generador QR, GitHub JCastilloPadilla, portafolio ccastillo.me, VPS propia.
- Idea: los proyectos y estados reales de Jose Castillo se convierten en las entradas de su cuaderno de laboratorio; el recorrido va de idea a implementación y evidencia.
- Interacción: seleccionar capturas reales de FlowTrix. Sin JavaScript los enlaces abren las imágenes.

## Argumento y textos

1. Este es el laboratorio de Jose Castillo → «Ideas que terminan en código.»; «Proyectos web, redes y pequeñas herramientas. Un espacio para construir, probar y compartir lo que voy aprendiendo.»; acción «Explorar proyectos».
2. Aquí se puede examinar trabajo real → «Dentro del laboratorio»: FlowTrix, captura real, enlaces a la demo; generador QR con código público; automatizaciones de uso interno. No simular disponibilidad ni telemetría.
3. El laboratorio es un proceso abierto → «Siempre en proceso.»; texto breve sobre construir para entender redes y automatizar tareas; tecnologías y procedencia reales.
4. Se puede seguir el trabajo → «Sigamos construyendo.»; GitHub, correo y enlace al portafolio.

## Verificación y publicación

Compilar ambos sitios, ejecutar diagnósticos y pruebas existentes. Revisar capturas 1440/768/390 y funcionamiento de galería con y sin JS. Publicar sólo dist-dev en /var/www/ccastillo.dev/public_html, conservando .well-known y demás subdirectorios de futuras apps. Respaldar el índice anterior fuera del directorio público. No cambiar Apache ni Certbot. Comprobar HTTPS, archivos, redirección HTTP y hash intacto de ccastillo.me. Revertir el índice si fallan la página o sus recursos.
