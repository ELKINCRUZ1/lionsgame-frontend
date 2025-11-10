import React, { useState, useEffect } from 'react';
import TarjetaJuego from '../components/TarjetaJuego/TarjetaJuego'; 
import FormularioJuego from '../components/FormularioJuego/FormularioJuego'; // Para crear/editar
import ListaReseñas from '../components/ListaReseñas';     // Para ver reseñas
import { getJuegos, eliminarJuego, actualizarJuego } from '../services/apiService'; 
import './BibliotecaJuegos.css';

const BibliotecaJuegos = () => {
    const [juegos, setJuegos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ESTADOS PARA MODALES
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [juegoAEditar, setJuegoAEditar] = useState(null); 
    const [juegoConResenasAbiertas, setJuegoConResenasAbiertas] = useState(null); 
    // FIN ESTADOS PARA MODALES

    const cargarJuegos = async () => {
        setLoading(true);
        try {
            const data = await getJuegos(); 
            setJuegos(data);
            setLoading(false);
        } catch (err) {
            setError('Error al conectar con el servidor.');
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarJuegos();
    }, []); 

    //        FUNCIONES DE MANEJO DE ESTADO Y CRUD

    // MÉTODOS DE CIERRE/APERTURA DE MODALES
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setJuegoAEditar(null);
    }
    
    const handleOpenReviews = (juego) => {
        setJuegoConResenasAbiertas(juego);
    }

    const handleCloseReviews = () => {
        setJuegoConResenasAbiertas(null);
    }

    // MÉTODOS DE CREACIÓN Y EDICIÓN (Llamado por FormularioJuego)
    const handleEditJuego = (juego) => {
        setJuegoAEditar(juego); // Carga los datos para edición, o null para crear
        setIsFormOpen(true);
    };
    
    const handleSaveJuego = (juegoGuardado) => {
        if (juegoAEditar) {
            // Edición (PUT)
            setJuegos(juegos.map(j => 
                j._id === juegoGuardado._id ? juegoGuardado : j
            ));
        } else {
            // Creación (POST)
            setJuegos([juegoGuardado, ...juegos]); 
        }
        
        handleCloseForm(); // Cierra y limpia
    };

    // MÉTODO DE ELIMINACIÓN (DELETE)
    const handleDeleteJuego = async (juegoId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
            try {
                await eliminarJuego(juegoId);
                setJuegos(juegos.filter(j => j._id !== juegoId));
            } catch (error) {
                alert('Error al eliminar el juego. Revisa la consola.');
            }
        }
    };

    // MÉTODO DE MARCAR COMPLETADO (PUT parcial)
    const handleMarkCompleted = async (juegoId, isCompleted) => {
        try {
            const juegoActualizado = await actualizarJuego(juegoId, { completado: isCompleted });
            setJuegos(juegos.map(j => 
                j._id === juegoId ? { ...j, completado: juegoActualizado.completado } : j
            ));
        } catch (error) {
            alert('Error al actualizar el estado del juego.');
        }
    };


    if (loading) return <div>Cargando biblioteca...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="biblioteca-juegos">
            <h2>Mi Colección ({juegos.length})</h2>
            
            {/* Botón para CREAR (llama a handleEditJuego con null) */}
            <button className="btn-agregar" onClick={() => handleEditJuego(null)}> 
                ➕ Agregar Nuevo Juego
            </button>
            
            {/* MODAL CONDICIONAL DE FORMULARIO JUEGO (Crear/Editar) */}

            {isFormOpen && (
                <div className="modal-overlay"> 
                    <FormularioJuego 
                        juegoToEdit={juegoAEditar} 
                        onClose={handleCloseForm}
                        onSave={handleSaveJuego}
                    />
                </div>
            )}
            
            {/* MODAL CONDICIONAL DE LISTA RESEÑAS                  */}
 
            {juegoConResenasAbiertas && (
                <div className="modal-overlay"> 
                    <ListaReseñas 
                        juegoId={juegoConResenasAbiertas._id} 
                        juegoTitulo={juegoConResenasAbiertas.titulo} 
                        onClose={handleCloseReviews} 
                    />
                </div>
            )}


            <div className="lista-juegos">
                {juegos.length === 0 ? (
                    <p>No tienes juegos en tu biblioteca. ¡Agrega uno!</p>
                ) : (
                    juegos.map(juego => (
                        <TarjetaJuego 
                            key={juego._id} 
                            juego={juego} 
                            onDelete={handleDeleteJuego} 
                            onMarkCompleted={handleMarkCompleted}
                            onEdit={handleEditJuego} 
                            onViewReviews={handleOpenReviews} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BibliotecaJuegos;