# ccastillo.dev en Oracle VPS

Configurado el 18 de octubre de 2026 como sitio independiente de ccastillo.me.
La página index.html es provisional; no contiene el portafolio personal.

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
