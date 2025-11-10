const mongoose = require('mongoose');

// La estructura del videojuego
const JuegoSchema = new mongoose.Schema({
    // Propiedades 
    titulo: {
        type: String,
        required: [true, 'El título del juego es obligatorio.'],
        trim: true
    },
    genero: { 
        type: String,
        required: [true, 'El género es obligatorio.']
    },
    plataforma: {
        type: String,
        required: [true, 'La plataforma es obligatoria.']
    },
    añoLanzamiento: { 
        type: Number
    },
    desarrollador: { 
        type: String
    },
    imagenPortada: { 
        type: String 
    },
    descripcion: { 
        type: String
    },
    completado: {
        type: Boolean,
        default: false // Por defecto, el juego no está completado
    },
    fechaCreacion: {  
        type: Date,
        default: Date.now
    }
});

// Exporta el modelo
module.exports = mongoose.model('Juego', JuegoSchema);
