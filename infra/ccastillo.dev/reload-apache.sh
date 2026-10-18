#!/bin/sh
set -eu

if [ "${RENEWED_LINEAGE:-}" = "/etc/letsencrypt/live/ccastillo.dev" ]; then
    /usr/sbin/apachectl configtest
    /usr/bin/systemctl reload apache2
fi
