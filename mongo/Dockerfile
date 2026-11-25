# MongoDB 7.0
FROM mongo:7.0
LABEL org.opencontainers.image.source=https://github.com/E1tr/videojuegos-docker

# Los datos y el script de carga, en la carpeta que MongoDB ejecuta al inicializarse
COPY videojuegos.json 01-importar-videojuegos.sh /docker-entrypoint-initdb.d/

# Asegurar formato Unix (LF) y permisos de ejecución (compatible con Windows y Linux)
RUN sed -i 's/\r$//' /docker-entrypoint-initdb.d/01-importar-videojuegos.sh \
 && chmod +x /docker-entrypoint-initdb.d/01-importar-videojuegos.sh
