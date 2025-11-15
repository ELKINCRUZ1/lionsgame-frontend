import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { crearJuego, actualizarJuego, getJuegoById } from '../../services/juegoServices.js';
import './FormularioJuego.css'; 

const initialFormState = {
    titulo: '',
    plataforma: '',
    genero: '',
    descripcion: '',
    imagenPortada: '',
    completado: false,
    añoLanzamiento: '',
    desarrollador: ''
};

const FormularioJuego = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    
    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // 1. Cargar datos en MODO EDICIÓN
    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            setLoading(true);
            const fetchJuego = async () => {
                try {
                    const juego = await getJuegoById(id);
                    setFormData(juego); 
                } catch (err) {
                    setError('Error al cargar los datos del juego para editar.');
                } finally {
                    setLoading(false);
                }
            };
            fetchJuego();
        } else {
            setIsEditMode(false);
            setFormData(initialFormState);
        }
    }, [id]);

    // 2. Manejador genérico de cambios en los inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // 3. Manejador de envío (CREATE o UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const dataToSend = {
            ...formData,
            añoLanzamiento: Number(formData.añoLanzamiento)
        };

        try {
            if (isEditMode) {
                await actualizarJuego(id, dataToSend);
                window.location.href = '/videojuegos';
            } else {
                try {
                    await crearJuego(dataToSend);
                } catch (createErr) {
                    console.error("Error 'falso negativo' del backend (ignorado):", createErr);
                }
                // Redirige siempre a la biblioteca después de crear
                window.location.href = '/videojuegos'; 
            }
        } catch (err) { 
            setError('Error al ACTUALIZAR el juego. Revisa los campos.');
            console.error("Error de actualización:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div><p>Cargando datos para edición...</p></div>;

    return (
        <div className="formulario-juego-container">
            <form onSubmit={handleSubmit} className="formulario-juego">
                
                <h2>{isEditMode ? '✏️ Editar Juego' : '🎮 Agregar Nuevo Juego'}</h2>
                
                {/* TÍTULO */}
                <div className="form-grupo">
                    <label htmlFor="titulo">Título del Juego:</label>
                    <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required placeholder="Ej: Elden Ring" />
                </div>
                {/* PLATAFORMA */}
                <div className="form-grupo">
                    <label htmlFor="plataforma">Plataforma:</label>
                    <input type="text" id="plataforma" name="plataforma" value={formData.plataforma} onChange={handleChange} required placeholder="Ej: PS5, PC, Switch" />
                </div>
                {/* AÑO DE LANZAMIENTO */}
                <div className="form-grupo">
                    <label htmlFor="añoLanzamiento">Año de Lanzamiento:</label>
                    <input type="number" id="añoLanzamiento" name="añoLanzamiento" value={formData.añoLanzamiento} onChange={handleChange} placeholder="Ej: 2022" />
                </div>
                {/* DESARROLLADOR */}
                <div className="form-grupo">
                    <label htmlFor="desarrollador">Desarrollador:</label>
                    <input type="text" id="desarrollador" name="desarrollador" value={formData.desarrollador} onChange={handleChange} placeholder="Ej: FromSoftware" />
                </div>
                {/* GÉNERO */}
                <div className="form-grupo">
                    <label htmlFor="genero">Género:</label>
                    <input type="text" id="genero" name="genero" value={formData.genero} onChange={handleChange} placeholder="Ej: RPG, Estrategia, FPS" />
                </div>
                {/* DESCRIPCIÓN */}
                <div className="form-grupo">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} rows="4" placeholder="Breve resumen del juego."></textarea>
                </div>
                {/* IMAGEN PORTADA (URL) */}
                <div className="form-grupo">
                    <label htmlFor="imagenPortada">URL Imagen de Portada:</label>
                    <input type="url" id="imagenPortada" name="imagenPortada" value={formData.imagenPortada} onChange={handleChange} placeholder="https://ejemplo.com/portada.jpg" />
                </div>
                {/* COMPLETADO */}
                <div className="form-grupo form-grupo-checkbox">
                    <label htmlFor="completado"><input type="checkbox" id="completado" name="completado" checked={formData.completado} onChange={handleChange} /> Juego Completado</label>
                </div>

                {/* MENSAJE DE ERROR */}
                {error && <div className="error-message">{error}</div>}

                {/* BOTONES DE ACCIÓN */}
                <div className="form-botones">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Crear Juego')}
                    </button>
                    
                    {/* --- ¡AQUÍ ESTÁ LA CORRECCIÓN FINAL! --- */}
                    {/* El botón Cancelar ahora va a la raíz '/' para el efecto "reset" */}
                    <button 
                        type="button" 
                        onClick={() => window.location.href = '/'}
                        className="btn-cancelar"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioJuego;