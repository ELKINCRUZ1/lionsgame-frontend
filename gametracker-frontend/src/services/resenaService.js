// URL base de tu backend (Asegúrate de que el puerto 4000 sea el correcto)
const API_URL = 'http://localhost:4000/api/resenas'; 

/**
 * Obtiene una reseña específica por su ID. (PARA EL FORMULARIO DE EDICIÓN)
 * @param {string} id - ID de la reseña.
 * @returns {Promise<Object>} El objeto de la reseña.
 */
export const getResenaById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Error al cargar la reseña.');
    }
    return await response.json();
};


/**
 * Crea una nueva reseña (POST).
 * @param {Object} datosResena 
 * @returns {Promise<Object>} 
 */
export const crearResena = async (datosResena) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosResena),
    });
    if (!response.ok) {
        throw new Error('Error al crear reseña.');
    }
    return await response.json();
};

/**
 * Actualiza una reseña existente (PUT).
 * @param {string} id - ID de la reseña.
 * @param {Object} datosResena 
 * @returns {Promise<Object>} 
 */
export const actualizarResena = async (id, datosResena) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosResena),
    });
    if (!response.ok) {
        throw new Error('Error al actualizar reseña.');
    }
    return await response.json();
};

/**
 * Elimina una reseña por ID (DELETE).
 * @param {string} id - ID de la reseña.
 * @returns {Promise<void>}
 */
export const eliminarResena = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar reseña.');
    }
    return response; // No devolvemos JSON
};

/**
 * Obtiene todas las reseñas de un juego específico.
 * @param {string} juegoId - ID del juego.
 * @returns {Promise<Array>}
 */
export const getResenasPorJuego = async (juegoId) => {
    const response = await fetch(`${API_URL}/juego/${juegoId}`);
    if (!response.ok) {
        throw new Error('Error al obtener reseñas por juego.');
    }
    return await response.json();
};