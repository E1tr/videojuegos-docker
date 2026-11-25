#!/bin/bash
# Se ejecuta SOLO la primera vez que arranca el contenedor (volumen vacío).
# Importa videojuegos.json en la colección "videojuegos" de la base de datos "videojuegos".
set -e

mongoimport \
  --username "$MONGO_INITDB_ROOT_USERNAME" \
  --password "$MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  --db videojuegos --collection videojuegos \
  --jsonArray --file /docker-entrypoint-initdb.d/videojuegos.json
