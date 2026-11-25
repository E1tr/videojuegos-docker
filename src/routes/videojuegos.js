const express = require('express');
const Videojuego = require('../models/Videojuego');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const videojuegos = await Videojuego.find().sort({ anio: -1, titulo: 1 }).lean();
    res.render('index.njk', { videojuegos });
  } catch (err) {
    res.status(500).send('Error al cargar los videojuegos.');
  }
});

router.get('/nuevo', (req, res) => {
  res.render('form.njk', { juego: null, accion: '/', tituloPagina: 'Añadir videojuego' });
});

router.post('/', async (req, res) => {
  try {
    const { titulo, estudio, plataforma, anio, genero, nota } = req.body;
    await Videojuego.create({
      titulo,
      estudio,
      plataforma,
      anio: Number(anio),
      genero,
      nota: Number(nota)
    });
    res.redirect('/');
  } catch (err) {
    res.status(400).send('Error al crear el videojuego: ' + err.message);
  }
});

router.get('/editar/:id', async (req, res) => {
  try {
    const juego = await Videojuego.findById(req.params.id).lean();
    if (!juego) return res.status(404).send('Videojuego no encontrado.');
    res.render('form.njk', {
      juego,
      accion: `/editar/${juego._id}`,
      tituloPagina: 'Editar videojuego'
    });
  } catch (err) {
    res.status(400).send('ID no válido.');
  }
});

router.post('/editar/:id', async (req, res) => {
  try {
    const { titulo, estudio, plataforma, anio, genero, nota } = req.body;
    await Videojuego.findByIdAndUpdate(
      req.params.id,
      {
        titulo,
        estudio,
        plataforma,
        anio: Number(anio),
        genero,
        nota: Number(nota)
      },
      { runValidators: true }
    );
    res.redirect('/');
  } catch (err) {
    res.status(400).send('Error al actualizar el videojuego: ' + err.message);
  }
});

router.post('/eliminar/:id', async (req, res) => {
  try {
    await Videojuego.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(400).send('Error al eliminar el videojuego.');
  }
});

router.get('/api/videojuegos', async (req, res) => {
  try {
    const videojuegos = await Videojuego.find().sort({ anio: -1, titulo: 1 }).lean();
    res.json(videojuegos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
