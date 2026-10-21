# Capturas de proyectos — 20 de octubre de 2026

Capturas reales tomadas con Chromium a 1440 × 1000, sin modificar las interfaces.

- `qr-desktop.png`: https://qr.ccastillo.dev/, contenido Enlace.
- `qr-wifi-desktop.png`: el mismo sitio, formulario WiFi.
- `qr-contact-desktop.png`: el mismo sitio, formulario Contacto.
- `qr-scan.png`: imagen PNG del canvas del generador, configurado con el destino
  exacto `https://qr.ccastillo.dev/`. Incluye su margen de lectura.
- `remira-desktop.png`: portada del frontend local actual de Remira.
- `remira-analysis-desktop.png`: formulario de análisis del mismo prototipo.

Remira se inspeccionó en `D:/FIMAZ/7MO Semestre/Tecnicas de Inteligencia Artificial`
y se sirvió temporalmente en el puerto 5180 para capturar el frontend, sin modificar
sus archivos. README y código confirman que la interfaz utiliza respuestas simuladas;
la conexión con el backend sigue pendiente. La evaluación del modelo es preliminar.
La landing del laboratorio lo presenta expresamente como «En construcción».

La captura de Remira se optimiza a WebP con Astro. El generador QR ya no muestra
capturas de pantalla: usa un esquema SVG propio. `qr-scan.svg` vectoriza exactamente
los módulos oscuros de `qr-scan.png`, conserva su margen blanco y el mismo destino;
se usa tanto dentro del esquema como en la vista ampliada para escanear.
No se usan imágenes generadas para representar
interfaces que no existen.
