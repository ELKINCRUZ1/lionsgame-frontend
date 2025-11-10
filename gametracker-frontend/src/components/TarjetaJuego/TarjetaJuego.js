import React from 'react';

const TarjetaJuego = ({ juego, onDelete, onMarkCompleted, onEdit, onViewReviews }) => {
    // La URL de imagen de portada debe ser provista por tu BD
    const imagenUrl = juego.imagenPortada || 'https://via.placeholder.com/150';

    return (
        <div className={`tarjeta-juego ${juego.completado ? 'completado' : ''}`}>
            <img 
                src={imagenUrl} 
                alt={`Portada de ${juego.titulo}`} 
                className="portada"
            />
            
            <div className="info">
                <h3>{juego.titulo}</h3>
                <p><strong>{juego.plataforma}</strong> | {juego.genero}</p>
                {/* Asumiendo que puntaje existe o se calcula con reseñas */}
                <p>⭐ Puntuación: {juego.puntuacion || 'N/A'}</p> 
                <p className="descripcion-corta">{juego.descripcion.substring(0, 100)}...</p>

                <div className="acciones">
                    {/* Botón para Marcar/Desmarcar como completado (PUT) */}
                    <button 
                        onClick={() => onMarkCompleted(juego._id, !juego.completado)} 
                        className={`btn-completado ${juego.completado ? 'btn-unmark' : 'btn-mark'}`}
                    >
                        {juego.completado ? '✅ Completado' : 'Marcar como completado'}
                    </button>

                    {/* Botón para Abrir Reseñas (NUEVO ENLACE) */}
                    <button className="btn-reseña" onClick={() => onViewReviews(juego)}>
                        Ver Reseñas
                    </button>
                    
                    {/* Botón para Editar (NUEVO ENLACE) */}
                    <button className="btn-editar" onClick={() => onEdit(juego)}>
                        ✏️ Editar
                    </button>
                    
                    {/* Botón para Eliminar (DELETE) */}
                    <button className="btn-eliminar" onClick={() => onDelete(juego._id)}>
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TarjetaJuego;