const express = require('express');
const router = express.Router();
// 1. Importar las funciones del controlador 
const { 
    obtenerTodasLasResenas, 
    obtenerResenasPorJuego, 
    crearResena, 
    actualizarResena, 
    eliminarResena 
} = require('../controllers/resenasController');

// Rutas base (GET y POST para toda la colección)
router.route('/')
    .get(obtenerTodasLasResenas) // GET /api/reseñas
    .post(crearResena);          // POST /api/reseñas

// Rutas por ID de Reseña (PUT y DELETE)
router.route('/:id') 
    .put(actualizarResena)       // PUT /api/reseñas/:id
    .delete(eliminarResena);     // DELETE /api/reseñas/:id

// Ruta para obtener reseñas por ID de Juego
router.get('/juego/:juegoId', obtenerResenasPorJuego); // GET /api/reseñas/juego/:juegoId


module.exports = router;
