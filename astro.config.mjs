// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://ccastillo.me',
  output: 'static',

  // `dist/` es el DocumentRoot que sirve Apache (Laragon).
  // Todo lo que viva en `public/` se copia tal cual ahí dentro,
  // incluidos los futuros `public/api/*.php`.
  outDir: './dist',

  publicDir: './public',

  server: {
    port: 4321,
    // Por defecto Astro escucha solo en ::1 (IPv6). Si el navegador resuelve
    // `localhost` a 127.0.0.1, ve el puerto cerrado. `host: true` lo abre en
    // todas las interfaces: funciona por IPv4, por IPv6 y desde el celular en
    // la misma red. Para limitarlo solo a esta máquina: host: '127.0.0.1'.
    host: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});