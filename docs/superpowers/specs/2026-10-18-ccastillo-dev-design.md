# ccastillo.dev — laboratorio abierto

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
