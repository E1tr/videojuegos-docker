const mongoose = require('mongoose');

const videojuegoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    estudio: { type: String, required: true, trim: true },
    plataforma: { type: String, required: true, trim: true },
    anio: { type: Number, required: true, min: 1970, max: 2100 },
    genero: { type: String, required: true, trim: true },
    nota: { type: Number, required: true, min: 0, max: 10, default: 8 }
  },
  {
    collection: 'videojuegos',
    timestamps: true
  }
);

module.exports = mongoose.model('Videojuego', videojuegoSchema);
