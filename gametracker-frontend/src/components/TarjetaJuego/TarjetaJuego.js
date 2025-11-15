import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eliminarJuego, actualizarJuego } from '../../services/juegoServices.js';
import './TarjetaJuego.css'; // ¡El CSS pixel!

const TarjetaJuego = ({ juego, onJuegoEliminado, onJuegoActualizado }) => {
    const navigate = useNavigate();

    // --- MANEJADORES DE ACCIONES ---

    // Navega a la página del formulario para editar
    const handleEditar = () => {
        // Esta ruta debe coincidir con la que definas en App.js
        navigate(`/formulario-juego/${juego._id}`);
    };

    // Navega a la página de reseñas
    const handleVerResenas = () => {
        navigate(`/resenas/${juego._id}`);
    };

    // Llama a la API para eliminar
    const handleEliminar = async () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${juego.titulo}"?`)) {
            try {
                await eliminarJuego(juego._id);
                // Avisa al componente padre (BibliotecaJuegos) que este juego fue eliminado
                onJuegoEliminado(juego._id);
            } catch (error) {
                console.error("Error al eliminar el juego", error);
                alert("No se pudo eliminar el juego.");
            }
        }
    };

    // Llama a la API para marcar como completado/pendiente
    const handleToggleCompletado = async () => {
        try {
            // Preparamos solo el dato que cambia
            const datosUpdate = { completado: !juego.completado };
            
            // Llamamos al PUT
            const juegoActualizado = await actualizarJuego(juego._id, datosUpdate);
            
            // Avisamos al padre (BibliotecaJuegos) del cambio
            onJuegoActualizado(juegoActualizado);

        } catch (error) {
            console.error("Error al actualizar estado 'completado'", error);
            alert("No se pudo actualizar el juego.");
        }
    };


    return (
        // Usamos la clase CSS que definimos antes
        <div className="tarjeta-juego">
            
            {/* Imagen de Portada */}
            <img 
                src={juego.imagenPortada || 'https://i.imgur.com/gSjYwL0.png'} // Una imagen placeholder
                alt={`Portada de ${juego.titulo}`} 
                className="tarjeta-juego-imagen"
            />
            
            {/* Información del Juego */}
            <div className="tarjeta-juego-info">
                <h3>{juego.titulo}</h3>
                <p>Plataforma: {juego.plataforma}</p>
                <p>Género: {juego.genero}</p>

                {/* Botón de Completado (cambia de color) */}
                <button 
                    onClick={handleToggleCompletado}
                    className={juego.completado ? 'btn-completado' : 'btn-pendiente'}
                >
                    {juego.completado ? '✅ COMPLETADO' : '⬜ PENDIENTE'}
                </button>
            </div>

            {/* Botones de Acción */}
            <div className="tarjeta-juego-acciones">
                <button onClick={handleEditar} className="btn-editar">✏️ Editar</button>
                <button onClick={handleEliminar} className="btn-eliminar">🗑️ Eliminar</button>
                <button onClick={handleVerResenas} className="btn-resenas">⭐ Reseñas</button>
            </div>
        </div>
    );
};

export default TarjetaJuego;