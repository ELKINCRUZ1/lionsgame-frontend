import React from 'react';
import './GameCard.css';

const GameCard = ({ game, onDelete, onMarkCompleted, onEdit, onViewReviews }) => {
  const imageUrl = game.imagenPortada || 'https://via.placeholder.com/150';

  return (
    <div className={`game-card ${game.completado ? 'completed' : ''}`}>
      <img src={imageUrl} alt={`Cover of ${game.titulo || game.title}`} className="game-cover" />

      <div className="game-info">
        <h3 className="game-title">{game.titulo || game.title}</h3>
        <p className="game-meta"><strong>{game.plataforma || game.platform}</strong> · {game.genero || game.genre}</p>
        <p className="game-score">⭐ {game.puntuacion ?? 'N/A'}</p>
        {game.descripcion && <p className="game-desc">{(game.descripcion || '').substring(0, 120)}{(game.descripcion || '').length > 120 ? '...' : ''}</p>}

        <div className="game-actions">
          <button
            className={`btn-complete ${game.completado ? 'btn-unmark' : 'btn-mark'}`}
            onClick={() => onMarkCompleted && onMarkCompleted(game._id || game.id, !game.completado)}
          >
            {game.completado ? '✅ Completado' : 'Marcar completado'}
          </button>

          <button className="btn-reviews" onClick={() => onViewReviews && onViewReviews(game)}>
            Ver Reseñas
          </button>

          <button className="btn-edit" onClick={() => onEdit && onEdit(game)}>
            ✏️ Editar
          </button>

          <button className="btn-delete" onClick={() => onDelete && onDelete(game._id || game.id)}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
