const mongoose = require('mongoose');

const ResenaSchema = new mongoose.Schema({
    juegoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Juego', 
        required: [true, 'La reseña debe estar asociada a un juego.']
    },
    textoReseña: { 
        type: String,
        required: [true, 'El texto de la reseña es obligatorio.'],
        trim: true,
        maxlength: 500 
    },
    puntuacion: {
        type: Number,
        required: [true, 'La puntuación con estrellas es obligatoria.'],
        min: 1, 
        max: 5 
    },
    horasJugadas: { 
        type: Number,
        default: 0
    },
    dificultad: {
        type: String,
        enum: ['Fácil', 'Normal', 'Difícil'],
    },
    recomendaria: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

// Esta es la única línea de exportación que necesitas.
module.exports = mongoose.models.Resena || mongoose.model('Resena', ResenaSchema);