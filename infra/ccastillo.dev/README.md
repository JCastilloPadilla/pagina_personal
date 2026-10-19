# ccastillo.dev en Oracle VPS

Configurado el 18 de octubre de 2026 como sitio independiente de ccastillo.me.
La página `index.html` de esta carpeta conserva el placeholder inicial como
referencia. La landing actual se genera desde `lab/src/` con
`astro.dev.config.mjs`; no se despliega este placeholder ni la salida del
portafolio personal.

## Landing y despliegue

1. `npm run build:dev` produce `dist-dev/` (una página, favicon y `_lab/`).
2. `npx astro check --config astro.dev.config.mjs` verifica los tipos.
3. `npm run preview:lab` permite revisar la salida en el puerto 4322.
4. Empaquetar **solamente** `index.html`, `favicon.svg` y `_lab/` de `dist-dev/`
   y transferir el archivo por SSH a un directorio temporal de la VPS.
5. Respaldar `index.html` y, si existe, `favicon.svg` en
   `/var/backups/ccastillo.dev/<fecha-UTC>/`, fuera del directorio público.
6. Instalar primero los recursos versionados de `_lab/` y el favicon; instalar
   el nuevo índice como `index.next.html` y renombrarlo a `index.html` en el
   mismo directorio para activar la página de forma atómica.
7. Mantener propietario `ubuntu:www-data`, carpetas 755 y archivos 644.
   No borrar ni sustituir el directorio público: conservar `.well-known/`,
   proyectos futuros y recursos de versiones previas.
8. Comprobar `https://ccastillo.dev/`, todos los recursos, redirección HTTP,
   `https://www.ccastillo.dev/` y hash intacto del índice de `ccastillo.me`.

No se necesitan cambios a Apache, TLS ni reinicio de servicios. Las claves
SSH se indican desde la máquina del operador y nunca forman parte del repo.

Si falla el índice o sus recursos, restaurar `index.html` desde el respaldo
con `install` a un archivo temporal y `mv` dentro del webroot. Restaurar
también el favicon anterior si existía. Los recursos versionados pueden
permanecer: no interfieren con el índice anterior.

## Rutas y permisos

- Contenido público: `/var/www/ccastillo.dev/public_html`, propietario `ubuntu:www-data`.
- Directorios: 755; archivos públicos: 644. Apache puede leer, pero no escribir.
- HTTP: `/etc/apache2/sites-available/ccastillo.dev.conf` (http.conf).
- HTTPS: `/etc/apache2/sites-available/ccastillo.dev-ssl.conf` (https.conf).
- Reglas compartidas: `/etc/apache2/ccastillo.dev-security.conf` (security.conf).
- Logs: `/var/log/apache2/ccastillo.dev*`.
- Respaldo de la configuración previa: `/root/backup-ccastillo-dev-20261018`.

HTTP redirige a HTTPS, excepto la ruta ACME utilizada para emitir y renovar
certificados. El certificado cubre ccastillo.dev y www.ccastillo.dev.
HTTPS usa la configuración TLS mantenida por Certbot y añade HSTS,
nosniff, SAMEORIGIN y strict-origin-when-cross-origin.

Listado de directorios, .htaccess, CGI, SSI y enlaces simbólicos están desactivados.
Los archivos ocultos, copias de respaldo, claves y scripts PHP no se sirven.
Antes de alojar PHP hay que configurar un runtime, por ejemplo PHP-FPM,
y adaptar explícitamente esas reglas para no exponer código fuente.
Aplicaciones con Node o Python necesitan su proceso y proxy configurados aparte.
Esta configuración no sustituye la seguridad de las aplicaciones futuras.

## Renovación

El timer existente `certbot.timer` ejecuta las renovaciones. El hook
`/etc/letsencrypt/renewal-hooks/deploy/ccastillo-dev-apache-reload`
(reload-apache.sh) valida Apache y lo recarga al renovar este certificado.
Las claves privadas permanecen en la VPS y no se guardan en Git.

Prueba realizada con éxito:

```sh
sudo certbot renew --cert-name ccastillo.dev --dry-run --no-random-sleep-on-renew --run-deploy-hooks
```

Tras cambiar una configuración:

```sh
sudo apachectl configtest && sudo systemctl reload apache2
```

Para deshabilitar el sitio, conservando contenido y certificado:

```sh
sudo a2dissite ccastillo.dev.conf ccastillo.dev-ssl.conf
sudo apachectl configtest && sudo systemctl reload apache2
```
