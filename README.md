# Videojuegos: aplicación Node.js + MongoDB con Docker

Aplicación web (Express + Nunjucks) que hace un CRUD de videojuegos sobre MongoDB.

Las imágenes están publicadas en GitHub Container Registry:

- `ghcr.io/e1tr/videojuegos-app:1.0`: la aplicación
- `ghcr.io/e1tr/videojuegos-mongo:1.0`: MongoDB 7.0 con los 5 videojuegos iniciales

## Requisitos

Solo Docker (con Docker Compose). No hace falta instalar Node.js ni MongoDB.

## Puesta en marcha

```bash
git clone https://github.com/E1tr/videojuegos-docker.git
cd videojuegos-docker
cp .env.example .env       # y edita .env para poner tu propia contraseña
docker compose pull        # descarga las imágenes desde ghcr.io
docker compose up -d       # arranca MongoDB y la aplicación
```

Abre `http://localhost:3000`.

## Parar

```bash
docker compose down        # para y borra los contenedores (los datos se conservan)
docker compose down -v     # además BORRA los datos (vuelven los 5 iniciales)
```
