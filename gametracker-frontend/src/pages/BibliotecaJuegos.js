import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodosLosJuegos, eliminarJuego, actualizarJuego } from '../services/juegoServices.js'; // Asegúrate que la 's' sea correcta
import TarjetaJuego from '../components/TarjetaJuego/TarjetaJuego';
import './BibliotecaJuegos.css'; // El CSS que hicimos para el grid

const BibliotecaJuegos = () => {
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Cargar todos los juegos cuando el componente se monta
    useEffect(() => {
        const cargarJuegos = async () => {
            try {
                setLoading(true);
                const response = await getTodosLosJuegos();
                setJuegos(response.data); // Arreglo para el error .map
            } catch (err) {
                setError('Error al cargar la colección de juegos. El backend está apagado?');
            } finally {
                setLoading(false);
            }
        };
        cargarJuegos();
    }, []);

    // --- FUNCIONES PARA LOS HIJOS (Tarjetas) ---

    // Quita el juego eliminado de la lista (el 'state')
    const handleJuegoEliminado = (idJuegoEliminado) => {
        setJuegos(juegosActuales => 
            juegosActuales.filter(juego => juego._id !== idJuegoEliminado)
        );
    };

    // Actualiza la lista cuando un juego cambia (ej. 'completado')
    const handleJuegoActualizado = (juegoActualizado) => {
        setJuegos(juegosActuales => 
            juegosActuales.map(juego => 
                juego._id === juegoActualizado._id ? juegoActualizado : juego
            )
        );
    };


    // --- RENDERIZADO ---
    if (loading) return <div><p>Cargando colección...</p></div>;
    if (error) return <div><p>{error}</p></div>;

    return (
        <div className="biblioteca-container">
            <h1>🎮 Mi Colección ({juegos.length}) 🎮</h1>
            
            <button 
                onClick={() => navigate('/formulario-juego')}
                className="btn-agregar-juego" // Estilo verde pixel
            >
                + Agregar Nuevo Juego
            </button>

            <div className="biblioteca-grid">
                {juegos.length === 0 ? (
                    <p>No tienes juegos en tu biblioteca. ¡Agrega uno!</p>
                ) : (
                    juegos.map(juego => (
                        <TarjetaJuego 
                            key={juego._id} 
                            juego={juego}
                            onJuegoEliminado={handleJuegoEliminado}
                            onJuegoActualizado={handleJuegoActualizado}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BibliotecaJuegos;