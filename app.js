require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const videojuegosRouter = require('./src/routes/videojuegos');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Falta la variable MONGODB_URI. Copia .env.example como .env y revísalo.');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const app = express();

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', videojuegosRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Aplicación disponible en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);
  });
