const express = require('express');
const router = express.Router();
const { 
    obtenerTodosLosJuegos, 
    crearJuego, 
    obtenerJuego, 
    actualizarJuego, 
    eliminarJuego 
} = require('../controllers/juegosController');

// Rutas sin ID (Aplicadas a toda la colección)
router.route('/')
    .get(obtenerTodosLosJuegos) // GET /api/juegos
    .post(crearJuego);          // POST /api/juegos

// Rutas con ID (Aplicadas a un juego específico)
router.route('/:id')
    .get(obtenerJuego)          // GET /api/juegos/:id
    .put(actualizarJuego)       // PUT /api/juegos/:id
    .delete(eliminarJuego);     // DELETE /api/juegos/:id

module.exports = router;