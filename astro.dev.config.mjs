// Independiente de ccastillo.me: nunca desplegar dist/ en el dominio .dev.
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ccastillo.dev',
  srcDir: './lab/src',
  publicDir: './lab/public',
  outDir: './dist-dev',
  cacheDir: './node_modules/.astro-lab',
  output: 'static',
  build: { assets: '_lab' },
  server: { port: 4322, host: '127.0.0.1' },
  vite: { plugins: [tailwindcss()] },
});
