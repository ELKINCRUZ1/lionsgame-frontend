const Juego = require('../models/Juego'); // Importa el modelo

// 1. OBTENER TODOS (GET /api/juegos)
const obtenerTodosLosJuegos = async (req, res) => {
    try {
        const juegos = await Juego.find({});
        res.status(200).json({ success: true, data: juegos });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener los juegos.' });
    }
};

// 2. CREAR JUEGO (POST /api/juegos)
const crearJuego = async (req, res) => {
    try {
        // req.body contiene los datos enviados desde el frontend (título, género, etc.)
        const nuevoJuego = await Juego.create(req.body);
        // Responde con estado 201 (Creado) y el juego que se acaba de guardar
        res.status(201).json({ success: true, data: nuevoJuego });
    } catch (error) {
        // Mongoose maneja las validaciones 'required' y envía un error 400
        res.status(400).json({ success: false, error: error.message });
    }
};

// 3. OBTENER UNO (GET /api/juegos/:id)
const obtenerJuego = async (req, res) => {
    try {
        const juego = await Juego.findById(req.params.id);
        if (!juego) {
            return res.status(404).json({ success: false, error: 'Juego no encontrado.' });
        }
        res.status(200).json({ success: true, data: juego });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 4. ACTUALIZAR JUEGO (PUT /api/juegos/:id)
const actualizarJuego = async (req, res) => {
    try {
        // { new: true } asegura que devuelve la versión actualizada
        const juegoActualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true // Ejecuta las validaciones del modelo antes de actualizar
        });
        if (!juegoActualizado) {
            return res.status(404).json({ success: false, error: 'Juego no encontrado para actualizar.' });
        }
        res.status(200).json({ success: true, data: juegoActualizado });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// 5. ELIMINAR JUEGO (DELETE /api/juegos/:id)
const eliminarJuego = async (req, res) => {
    try {
        const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);
        if (!juegoEliminado) {
            return res.status(404).json({ success: false, error: 'Juego no encontrado para eliminar.' });
        }
        // Responde con un estado 204 (No Content) para una eliminación exitosa
        res.status(204).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Exportar todas las funciones
module.exports = {
    obtenerTodosLosJuegos,
    crearJuego,
    obtenerJuego,
    actualizarJuego,
    eliminarJuego
};