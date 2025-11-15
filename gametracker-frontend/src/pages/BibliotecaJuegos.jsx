// src/pages/BibliotecaJuegos.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TarjetaJuego from '../components/TarjetaJuego/TarjetaJuego.jsx'; 
// RUTA CORREGIDA: Incluye la extensión .js
import { getTodosLosJuegos, eliminarJuego, actualizarJuego } from '../services/juegoService.js'; 
import './BibliotecaJuegos.css'; // (Asegúrate de tener este CSS)


const BibliotecaJuegos = () => {
    // ESTADOS
    const [juegos, setJuegos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // --- NUEVO ESTADO PARA EL MODAL ---
    // (Esto reemplaza los 'alert' y 'confirm' que dan error)
    const [modal, setModal] = useState({
        visible: false,
        message: '',
        isConfirm: false,
        confirmAction: null,
    });

    // FUNCIÓN PRINCIPAL DE CARGA DE DATOS (READ)
    const cargarJuegos = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getTodosLosJuegos(); 
            setJuegos(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los juegos. Verifica la conexion con el servidor.');
            setLoading(false);
        }
    }, []);

    // EFECTO para cargar los juegos
    useEffect(() => {
        cargarJuegos();
    }, [cargarJuegos]); 

    // FUNCIÓN DE EDICIÓN
    const handleEditJuego = (juego) => {
        if (juego) {
            navigate(`/agregar-juego/${juego._id}`); 
        } else {
            navigate('/agregar-juego');
        }
    };
    
    // --- FUNCIÓN DE ELIMINACIÓN (Paso 1: Muestra el modal) ---
    const handleDeleteJuego = (juegoId, juegoTitulo) => {
        setModal({
            visible: true,
            message: `¿Estas seguro de que quieres eliminar el juego: ${juegoTitulo}?`,
            isConfirm: true,
            confirmAction: () => performDelete(juegoId)
        });
    };

    // --- FUNCIÓN DE ELIMINACIÓN (Paso 2: Ejecuta la acción) ---
    const performDelete = async (juegoId) => {
        try {
            await eliminarJuego(juegoId);
            setJuegos(juegos.filter(j => j._id !== juegoId));
            setModal({ visible: false, message: '' });
        } catch (error) {
            setModal({
                visible: true,
                message: 'Error al eliminar el juego. Revisa la consola.',
                isConfirm: false
            });
        }
    };

    // FUNCIÓN PARA VER RESEÑAS
    const handleViewReviews = (juego) => {
        navigate(`/resenas/${juego._id}`); 
    };

    // FUNCIÓN PARA MARCAR COMPLETADO
    const handleMarkCompleted = async (juegoId, isCompleted) => {
        try {
            const juegoActualizado = await actualizarJuego(juegoId, { completado: isCompleted });
            setJuegos(juegos.map(j => 
                j._id === juegoId ? { ...j, completado: juegoActualizado.completado } : j
            ));
        } catch (error) {
            setModal({
                visible: true,
                message: 'Error al actualizar el estado del juego.',
                isConfirm: false
            });
        }
    };

    // --- Funciones para manejar el Modal ---
    const handleModalClose = () => {
        setModal({ visible: false, message: '', isConfirm: false, confirmAction: null });
    };

    const handleModalConfirm = () => {
        if (modal.confirmAction) {
            modal.confirmAction();
        }
    };

    // RENDERIZADO CONDICIONAL
    if (loading) return <div className="loading-state">Cargando biblioteca...</div>;
    if (error) return <div className="error-state">Error: {error}</div>;

    return (
        <div className="biblioteca-juegos">
            <h2>Mi Coleccion ({juegos.length})</h2>
            
            <button className="btn-agregar" onClick={() => handleEditJuego(null)}> 
                ➕ Agregar Nuevo Juego
            </button>
            
            <div className="lista-juegos">
                {juegos.length === 0 ? (
                    <p className="mensaje-vacio">No tienes juegos en tu biblioteca. ¡Agrega uno!</p>
                ) : (
                    juegos.map(juego => (
                        <TarjetaJuego 
                            key={juego._id} 
                            juego={juego} 
                            onDelete={() => handleDeleteJuego(juego._id, juego.titulo)} 
                            onMarkCompleted={handleMarkCompleted}
                            onEdit={() => handleEditJuego(juego)} 
                            onViewReviews={() => handleViewReviews(juego)} 
                        />
                    ))
                )}
            </div>

            {/* --- EL NUEVO MODAL --- */}
            {modal.visible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{modal.message}</p>
                        <div className="modal-buttons">
                            <button onClick={handleModalClose} className="btn-cancelar">
                                {modal.isConfirm ? 'Cancelar' : 'Cerrar'}
                            </button>
                            {modal.isConfirm && (
                                <button onClick={handleModalConfirm} className="btn-confirmar">
                                    Confirmar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BibliotecaJuegos;