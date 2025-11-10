import React, { useState } from 'react';
import { crearJuego, actualizarJuego } from '../../services/apiService';
import './FormularioJuego.css'; 

// Valores iniciales basados en los campos de tu modelo Juego.js
const valoresIniciales = {
    titulo: '',
    plataforma: '',
    genero: '',
    añoLanzamiento: new Date().getFullYear(),
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false,
};

// Recibe juegoToEdit si estamos editando, y onSave/onClose del padre
const FormularioJuego = ({ juegoToEdit, onSave, onClose }) => {
    // Si hay un juego para editar, usa sus valores. Si no, usa valoresIniciales.
    const [formData, setFormData] = useState(juegoToEdit || valoresIniciales);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const isEditing = !!juegoToEdit;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Prepara los datos para enviar
        const dataToSend = {
            ...formData,
            añoLanzamiento: Number(formData.añoLanzamiento),
        };

        try {
            let juegoGuardado;
            if (isEditing) {
                // Llama al PUT del Backend
                juegoGuardado = await actualizarJuego(juegoToEdit._id, dataToSend);
            } else {
                // Llama al POST del Backend
                juegoGuardado = await crearJuego(dataToSend);
            }

            onSave(juegoGuardado); // Notifica al componente padre (BibliotecaJuegos)
        } catch (err) {
            setError(isEditing ? 'Error al actualizar el juego.' : 'Error al crear el juego.');
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    };

    //
    // --- AQUÍ ESTÁ LA MAGIA DE LA FUSIÓN ---
    // Este return usa la lógica de arriba pero con las clases CSS correctas.
    //
    return (
        // Usamos la clase principal 'formulario-juego'
        <form className="formulario-juego" onSubmit={handleSubmit}>
            
            {/* Título dinámico */}
            <h2>{isEditing ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h2>
            
            {/* --- Título --- */}
            <div className="form-grupo">
                <label htmlFor="titulo">Título:</label>
                <input 
                    type="text" 
                    id="titulo"
                    name="titulo" 
                    value={formData.titulo} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            {/* --- Plataforma --- */}
            <div className="form-grupo">
                <label htmlFor="plataforma">Plataforma:</label>
                <input 
                    type="text" 
                    id="plataforma"
                    name="plataforma" 
                    value={formData.plataforma} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            {/* --- Género --- */}
            <div className="form-grupo">
                <label htmlFor="genero">Género:</label>
                <input 
                    type="text" 
                    id="genero"
                    name="genero" 
                    value={formData.genero} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            {/* --- URL de Portada --- */}
            <div className="form-grupo">
                <label htmlFor="imagenPortada">URL de Portada (Imagen):</label>
                <input 
                    type="url" 
                    id="imagenPortada"
                    name="imagenPortada" 
                    value={formData.imagenPortada} 
                    onChange={handleChange} 
                />
            </div>
            
            {/* --- Descripción --- */}
            <div className="form-grupo">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea 
                    id="descripcion"
                    name="descripcion" 
                    value={formData.descripcion} 
                    onChange={handleChange} 
                    rows="4"
                />
            </div>
            
            {/* --- Checkbox Completado --- */}
            <div className="form-grupo form-grupo-checkbox">
                <label htmlFor="completado">
                    <input 
                        type="checkbox" 
                        id="completado"
                        name="completado" 
                        checked={formData.completado} 
                        onChange={handleChange} 
                    />
                    Juego Completado
                </label>
            </div>

            {/* --- Mensaje de Error --- */}
            {error && <div className="error-message">{error}</div>}

            {/* --- Botones --- */}
            <div className="form-botones">
                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Juego')}
                </button>
                <button 
                    type="button" 
                    className="btn-cancelar" 
                    onClick={onClose} 
                    disabled={loading}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default FormularioJuego;