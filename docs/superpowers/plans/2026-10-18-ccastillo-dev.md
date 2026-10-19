# ccastillo.dev Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. User authorized implementation and VPS publication in this session.

**Goal:** Crear y publicar el laboratorio editorial de Jose Castillo en ccastillo.dev.

**Architecture:** Entrada Astro separada en lab/src, configuración astro.dev.config.mjs y salida dist-dev. Reutilizar dependencias existentes y capturas reales, sin acoplar el documento al portafolio.

**Tech Stack:** Astro, CSS, TypeScript en navegador, Apache estático.

**Spec:** docs/superpowers/specs/2026-10-18-ccastillo-dev-design.md

## Global Constraints

- Mismo repositorio; compilaciones y publicación independientes.
- Sólo enlaces y proyectos verificables; sin métricas inventadas.
- Publicar en /var/www/ccastillo.dev/public_html.
- Mantener permisos de directorios 755, archivos 644 y configuración TLS existente.

## Review Focus

- En móvil, titular sin recortes y navegación utilizable.
- Sin JavaScript, contenido visible y capturas accesibles por enlaces.
- Movimiento reducido respeta preferencia del usuario.
- Publicación conserva .well-known y proyectos alojados en subdirectorios.
- Hash del índice del portafolio idéntico antes y después.

### Task 1: Landing independiente

**Files:** astro.dev.config.mjs, package.json, .gitignore, lab/src/pages/index.astro, lab/src/styles/lab.css, lab/src/scripts/gallery.ts, lab/public/favicon.svg.

**Interfaces:** build:dev produce dist-dev/index.html y recursos en /_lab/. dev:lab sirve en 4322.

- [x] Configurar entrada, salida y scripts independientes.
- [x] Implementar textos aprobados, proyectos reales, capturas y galería con fallback nativo.
- [x] Compilar con npm run build:dev; salida esperada: exit 0 y sólo landing dev en dist-dev.

### Task 2: Verificación visual y funcional

**Files:** capturas y reportes de QA en .taste-skill/ (ignorado).

**Interfaces:** preview:lab sirve dist-dev en puerto 4322.

- [x] Ejecutar npm run check, npm run build, node --test tests/*.test.mjs y revisar salida.
- [x] Inspeccionar escritorio, tableta y móvil; corregir problemas visibles.
- [x] Verificar galería, enlaces, imágenes, ausencia de overflow y fallback sin JS en navegador.

### Task 3: Publicar y documentar

**Files:** infra/ccastillo.dev/README.md, README.md.

**Interfaces:** dist-dev se transfiere por SSH al document root existente.

- [x] Respaldar índice anterior fuera del webroot y copiar recursos antes del índice.
- [x] Verificar HTTPS 200, recursos, HTTP 301 y hash intacto de .me; revertir si falla.
- [x] Documentar compilación y despliegue; registrar resultados y commit/push del cambio autorizado.

## Evidencia de ejecución

Implementación directa en la rama existente `codex/portfolio-redesign`, tal como autorizó el usuario en este repositorio. Ambos builds terminaron con exit 0; `npm run check` y el check con configuración dev: 0 errores, 0 warnings, 0 hints. Las cinco pruebas existentes pasan. El build del portafolio conserva una advertencia previa sobre un chunk superior a 500 kB.

Inspector visual: escritorio 1440, tableta 768, móvil 390, 0 FAIL, 2 WARN con excepciones documentadas en el informe visual. Se corrigieron tamaño del hero móvil, salto del título de proceso y contraste de CTA. Escalas fluidas y ausencia de video aceptadas porque las capturas son evidencia del producto. Paleta aprobada marfil/naranja y falso positivo de caption «Agente Windows» anotados. Puntuación interna de diseño/usabilidad/creatividad/contenido: 8/8.5/7/8, ponderado 7.95. Sólo capturas propias de FlowTrix; ninguna imagen externa ni contenido de muestra.

Smoke de navegador ejecutado localmente y en https://ccastillo.dev/: anchos 320/390/768/1440, 0 overflow, imágenes válidas, selección y anuncio de galería correctos, anclas válidas, 0 excepciones. Sin JS, contenido visible y tres enlaces a capturas con HTTP 200. Movimiento reducido: 0 animaciones.

Publicado el 18 de octubre de 2026 (hora de Mazatlán). Índice y todos los recursos devuelven 200; HTTP redirige 301 a HTTPS; www responde 200; HSTS, nosniff y SAMEORIGIN presentes. Enlaces externos a FlowTrix, repo QR y portafolio: 200. Respaldo del placeholder: `/var/backups/ccastillo.dev/20261019T000156Z/index.html` (nombre UTC).

SHA-256 del índice publicado idéntico al build: `b55b37a14f9aca8f7dccc22d91a39cb52b440761f7f4988667c4fb105381a4a3`.

SHA-256 del índice de ccastillo.me antes/después idéntico: `b2d780cd155bfe38e02e0f441529ccf9f65448b50302bebc0384218be03140f6`.

## Revisión: seguir el diseño de ccastillo.me

El usuario rechaza la dirección serif/marfil y solicita seguir la línea visual del portafolio. Se actualiza la especificación y se implementa directamente esa corrección sobre la landing existente.

- [x] Compartir estilos globales, fuentes Archivo/Plex, paleta fría, navegación entre corchetes y filetes de ccastillo.me.
- [x] Portada costera de redes con el titular «Laboratorio de desarrollo.», manteniendo proyectos y enlaces reales.
- [x] Reutilizar UtilityRule y FooterGarden sin modificar los originales; cierre azul de la misma familia.
- [x] Optimizar portada: PNG original 2464 kB → WebP de 247 kB.
- [x] Revisar capturas de escritorio, tableta y móvil, corregir tamaños, reducir espacios sobrantes y mejorar cuerpo de lectura a 16–17 px.
- [x] Build y diagnósticos Astro correctos, 5 pruebas existentes pasando; smoke local a 320/390/768/1440 sin overflow, galería y fallback sin JS correctos.
- [x] Publicar manteniendo webroot, permisos y configuración HTTPS; verificar todos los recursos.

Inspector: 0 FAIL con excepciones de marca explícitas. El sistema visual solicitado usa monospace, etiquetas de 11 px, índices, filetes, firma con degradado, tres fuentes y halo de legibilidad en el nombre del header; estas decisiones del usuario tienen prioridad sobre las prohibiciones genéricas de la guía. La cuota de imágenes excluye miniaturas pequeñas: se conservan las capturas reales y la ilustración propia en vez de agregar stock. Avisos de las escalas tipográficas y navegación translúcida aceptados como parte del sistema de marca; el párrafo destacado de tableta se redujo de 30 a 24 px y el texto de proyectos secundarios se subió de 15 a 16 px después de la última medición. Contraste de texto secundario 5.3:1, conforme AA. No existe video propio pertinente.

Crítica visual final: diseño 8.5, usabilidad 8.5, creatividad 8, contenido 8; ponderado 8.35/10. El logro principal es continuidad real con el portafolio: misma tipografía, paleta, retícula, componentes ilustrados y remate. Se preserva el foco de laboratorio mediante el título, la ilustración de enlaces de red y los proyectos con sus estados.

Publicado con respaldo de la versión previa en `/var/backups/ccastillo.dev/20261019T001222Z/`. SHA-256 del nuevo índice: `242a2da8031795d02d0c7ad40420eef559a672ed8101b5ff34daddaf0b18d6c5`. El índice público coincide con la compilación; fuentes, imágenes, CSS y favicon devuelven 200, HTTP redirige 301 a HTTPS y www responde 200. Hash del portafolio intacto: `b2d780cd155bfe38e02e0f441529ccf9f65448b50302bebc0384218be03140f6`.
