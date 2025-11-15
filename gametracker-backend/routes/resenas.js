const express = require('express');
const router = express.Router(); 

const {
    obtenerTodasLasResenas,
    obtenerResenasPorJuego,
    crearResena,
    actualizarResena,
    eliminarResena
} = require('../controllers/resenasController'); // <-- Este es el archivo que me mostraste

router.route('/')
    .get(obtenerTodasLasResenas) 
    .post(crearResena);


router.route('/juego/:juegoId')
    .get(obtenerResenasPorJuego); 


router.route('/:id')
    .put(actualizarResena)     
    .delete(eliminarResena);   
   
module.exports = router;