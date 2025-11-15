import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eliminarJuego, actualizarJuego } from '../../services/juegoServices.js';
import './TarjetaJuego.css'; // El CSS pixel

// Recibe los handlers de estado 'onJuegoEliminado' y 'onJuegoActualizado'
const TarjetaJuego = ({ juego, onJuegoEliminado, onJuegoActualizado, colorIndex, esModoReseña }) => {
    const navigate = useNavigate();

    // Lógica de color dinámico
    const PIXEL_COLORS = ['--rojo', '--naranja', '--azul', '--fucsia', '--verde', '--amarillo']; 
    const bgColorVar = PIXEL_COLORS[colorIndex % PIXEL_COLORS.length];


    const handleEditar = () => {
        navigate(`/formulario-juego/${juego._id}`);
    };

    const handleVerResenas = () => {
        navigate(`/resenas/${juego._id}`);
    };

    const handleEliminar = async () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${juego.titulo}"?`)) {
            try {
                await eliminarJuego(juego._id);
                onJuegoEliminado(juego._id); // <-- LLAMA AL HANDLER FILTER (ACTUALIZACIÓN INSTANTÁNEA)
            } catch (error) {
                console.error("Error al eliminar el juego", error);
                alert("Error: No se pudo eliminar el juego. Revisa la consola (F12).");
            }
        }
    };

    const handleToggleCompletado = async () => {
        try {
            const datosUpdate = { completado: !juego.completado };
            const juegoActualizado = await actualizarJuego(juego._id, datosUpdate);
            onJuegoActualizado(juegoActualizado); // <-- LLAMA AL HANDLER MAP (ACTUALIZACIÓN INSTANTÁNEA)
        } catch (error) {
            console.error("Error al actualizar estado 'completado'", error);
            alert("Error: No se pudo actualizar el estado del juego. Revisa la consola (F12).");
        }
    };


    return (
        <div 
            className="tarjeta-juego"
            style={{ backgroundColor: `var(${bgColorVar})` }}
        >
            
            <img 
                src={juego.imagenPortada || 'https://i.imgur.com/gSjYwL0.png'} 
                alt={`Portada de ${juego.titulo}`} 
                className="tarjeta-juego-imagen"
            />
            
            <div className="tarjeta-juego-info">
                <h3>{juego.titulo}</h3>
                <p>Plataforma: {juego.plataforma}</p>
                <p>Género: {juego.genero}</p>

                <button 
                    onClick={handleToggleCompletado}
                    className={juego.completado ? 'btn-completado' : 'btn-pendiente'}
                >
                    {juego.completado ? '✅ COMPLETADO' : '⬜ PENDIENTE'}
                </button>
            </div>

            <div className="tarjeta-juego-acciones-pequenas">
                <button onClick={handleEditar} className="btn-editar">✏️ Editar</button>
                <button onClick={handleEliminar} className="btn-eliminar">🗑️ Eliminar</button>
            </div>
            
            <button 
                onClick={handleVerResenas} 
                className={`btn-resenas-grande ${esModoReseña ? 'resenas-glow' : ''}`}
            >
                ⭐ Reseñas
            </button>
        </div>
    );
};

export default TarjetaJuego;