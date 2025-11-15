import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { crearResena } from '../../services/resenaService.js';
import './FormularioResena.css'; // ¡Su propio CSS!

const FormularioResena = () => {
    // Obtenemos el ID del juego de la URL
    const { juegoId } = useParams(); 
    const navigate = useNavigate();

    // Estado para los campos del formulario
    const [puntuacion, setPuntuacion] = useState(5);
    const [textoReseña, setTextoReseña] = useState('');
    const [horasJugadas, setHorasJugadas] = useState(0);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Preparamos los datos para enviar al backend
        const datosResena = {
            juegoId: juegoId,
            puntuacion: Number(puntuacion),
            textoReseña: textoReseña,
            horasJugadas: Number(horasJugadas)
            // (El backend usará los 'defaults' para los otros campos)
        };

        try {
            // Llamamos a la API para crear la reseña
            await crearResena(datosResena);
            
            // ¡Éxito! Volvemos a la página anterior (la lista de reseñas)
            navigate(-1); // Esto es como "darle al botón de atrás"

        } catch (err) {
            setError('Error al guardar la reseña. ¿Llenaste todos los campos?');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        // Usamos las clases de CSS que vamos a crear
        <div className="formulario-resena-container">
            <form onSubmit={handleSubmit} className="formulario-resena">
                <h2>✍️ Escribe tu Reseña</h2>
                
                {/* PUNTUACIÓN (Estrellas) */}
                <div className="form-grupo">
                    <label htmlFor="puntuacion">Puntuación (1-5 Estrellas):</label>
                    <select 
                        id="puntuacion" 
                        value={puntuacion} 
                        onChange={(e) => setPuntuacion(e.target.value)}
                    >
                        <option value={5}>⭐⭐⭐⭐⭐ (Excelente)</option>
                        <option value={4}>⭐⭐⭐⭐ (Bueno)</option>
                        <option value={3}>⭐⭐⭐ (Regular)</option>
                        <option value={2}>⭐⭐ (Malo)</option>
                        <option value={1}>⭐ (Terrible)</option>
                    </select>
                </div>

                {/* HORAS JUGADAS */}
                <div className="form-grupo">
                    <label htmlFor="horasJugadas">Horas Jugadas:</label>
                    <input 
                        type="number" 
                        id="horasJugadas"
                        value={horasJugadas} 
                        onChange={(e) => setHorasJugadas(e.target.value)} 
                        placeholder="Ej: 50"
                    />
                </div>

                {/* TEXTO DE LA RESEÑA */}
                <div className="form-grupo">
                    <label htmlFor="textoReseña">Tu Reseña (¡obligatorio!):</label>
                    <textarea 
                        id="textoReseña"
                        value={textoReseña} 
                        onChange={(e) => setTextoReseña(e.target.value)} 
                        rows="6"
                        placeholder="Escribe lo que piensas del juego..."
                        required
                    ></textarea>
                </div>

                {/* MENSAJE DE ERROR (SI HAY) */}
                {error && <div className="error-message">{error}</div>}

                {/* BOTONES DE ACCIÓN */}
                <div className="form-botones">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar Reseña'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate(-1)} // Vuelve atrás
                        className="btn-cancelar"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioResena;