# ccastillo.dev — laboratorio abierto

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
