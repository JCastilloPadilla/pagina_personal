# ccastillo.me

Sitio personal de Jose Carlos Castillo Padilla.

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
