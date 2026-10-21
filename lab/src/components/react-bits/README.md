# React Bits en el laboratorio

Componentes TypeScript de https://github.com/DavidHDev/react-bits, obtenidos el
2026-10-20 de `src/ts-default`: SplitText, Magnet, AnimatedContent, DecryptedText,
PixelTransition, SpotlightCard, ScrollVelocity, SplitFlapText, MetallicPaint y
CursorGrid, con sus CSS correspondientes.
Se conserva la licencia original en LICENSE.md.

Adaptación local: SplitText mantiene visible el texto renderizado en servidor,
antes de hidratar y sin JavaScript. DecryptedText también conserva el texto inicial
legible hasta la hidratación. AnimatedContent recibe `visibility: visible`
desde la página con el mismo propósito. Los componentes conservan sus controles
de movimiento reducido; Magnet ignora los eventos táctiles.

LabMotion.tsx ajusta los efectos a la página: entrada breve del titular, atracción
de botones limitada a 5px y una sola revelación de la etiqueta del laboratorio.
ProjectShowcase.tsx usa PixelTransition para revelar el QR escaneable, SpotlightCard
para la presentación de Remira. La antigua banda ScrollVelocity se retiró para
mantener discreta la sección de automatizaciones.
ProjectStatus.tsx usa SplitFlapText con el texto fijo «Siempre hay algo» y alterna
«EN DESARROLLO», «EN PRUEBAS» y «EN LÍNEA» cada tres segundos, sin botón de pausa;
solo cambia cuando está visible y no cambia con movimiento reducido. El primer
texto se renderiza completo sin JavaScript (intro=false). SplitFlapText solo adapta
sus imports de tipos a la configuración TypeScript del proyecto.
PixelTransition añade nombre accesible y estado aria-pressed al control; ScrollVelocity
omite un argumento sin uso y SpotlightCard conserva su prefijo WebKit con setProperty.

React se habilita exclusivamente en astro.dev.config.mjs. La vista local está en
http://127.0.0.1:4322/. Publicación en VPS pendiente de autorización del usuario.

LabEffects.tsx aplica MetallicPaint al símbolo decorativo del título QR, con
grafito/plata, un matiz azul frío y velocidad 0.22. La máscara SVG de respaldo
mantiene el símbolo visible sin JavaScript o WebGL. Se adapta el contenedor de
MetallicPaint a span para conservar la semántica inline del título.
CursorGrid ocupa el fondo de «El laboratorio»: celdas de 42px, líneas azul gris,
estela grafito de baja opacidad y sin pulsos ni actividad automática. No intercepta
eventos del contenido. Con movimiento reducido no se monta la cuadrícula; el metal
queda pausado. Ambos componentes conservan su suspensión fuera de pantalla.
