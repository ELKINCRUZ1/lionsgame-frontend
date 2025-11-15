import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { crearResena, actualizarResena, getResenaById } from '../../services/resenaService.js'; 
import './FormularioResena.css'; 

// Valores iniciales (se mantienen)
const valoresIniciales = {
    puntuacion: 5,
    textoReseña: '',
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: true,
};

// Componente para crear/editar
const FormularioResena = () => {
    // Obtenemos el ID de la reseña de la URL
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState(valoresIniciales);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // eslint-disable-next-line
    const [isEditing, setIsEditing] = useState(!!id); // Chequeamos si hay ID

    // --- EFECTO: Cargar datos existentes si estamos editando ---
    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            const fetchResena = async () => {
                try {
                    const resena = await getResenaById(id); 
                    setFormData(resena);
                } catch (err) {
                    // Si falla la carga, mostramos el error
                    setError('Error al cargar los datos de la reseña para editar.'); 
                } finally {
                    setLoading(false);
                }
            };
            fetchResena();
        }
    }, [id, isEditing]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Los datos que se envían al backend
        const dataToSend = {
            // El juegoId no se puede editar, así que lo mandamos si existe
            juegoId: formData.juegoId || null, 
            ...formData,
            puntuacion: Number(formData.puntuacion),
            horasJugadas: Number(formData.horasJugadas),
        };

        try {
            if (isEditing) {
                // MODO EDICIÓN (PUT)
                await actualizarResena(id, dataToSend); 
                alert('Reseña actualizada con éxito.'); // <-- MENSAJE DE ÉXITO
            } else {
                // MODO CREACIÓN (POST)
                await crearResena(dataToSend);
                alert('Reseña creada con éxito.'); // <-- MENSAJE DE ÉXITO
            }
            
            // Éxito: Volvemos a la lista de reseñas del juego.
            const targetId = isEditing ? formData.juegoId : dataToSend.juegoId;
            navigate(`/resenas/${targetId || 'default'}`); 

        } catch (err) {
            // Si el servidor devuelve un error (ej. campos vacíos), lo atrapamos.
            setError('Error al guardar la reseña. Asegúrate de llenar todos los campos.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div><p>Cargando formulario...</p></div>;

    return (
        <div className="formulario-resena-container">
            <form onSubmit={handleSubmit} className="formulario-resena">
                
                {/* Título: Usa isEditing para mostrar 'Editar' o 'Escribir' */}
                <h2>{isEditing ? '✏️ Editar Reseña' : '✍️ Escribe tu Reseña'}</h2>
                
                {/* PUNTUACIÓN (Estrellas) */}
                <div className="form-grupo">
                    <label htmlFor="puntuacion">Puntuación (1-5 Estrellas):</label>
                    <select 
                        id="puntuacion" 
                        name="puntuacion"
                        value={formData.puntuacion} 
                        onChange={handleChange} 
                        required
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
                        name="horasJugadas"
                        value={formData.horasJugadas} 
                        onChange={handleChange} 
                        min="0"
                        placeholder="Ej: 50"
                    />
                </div>

                {/* TEXTO DE LA RESEÑA */}
                <div className="form-grupo">
                    <label htmlFor="textoReseña">Tu Reseña (¡obligatorio!):</label>
                    <textarea 
                        id="textoReseña"
                        name="textoReseña"
                        value={formData.textoReseña} 
                        onChange={handleChange} 
                        rows="6"
                        placeholder="Escribe lo que piensas del juego..."
                        required
                    ></textarea>
                </div>

                {/* Dificultad y Recomendaría */}
                <div className="form-grupo">
                    <label>Dificultad Percibida:</label>
                    <select name="dificultad" value={formData.dificultad} onChange={handleChange}>
                        <option value="Fácil">Fácil</option>
                        <option value="Normal">Normal</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                </div>

                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        name="recomendaria" 
                        checked={formData.recomendaria} 
                        onChange={handleChange} 
                    />
                    ¿Recomendarías este juego?
                </label>


                {error && <div className="error-message">{error}</div>}

                <div className="form-botones">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Reseña')}
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