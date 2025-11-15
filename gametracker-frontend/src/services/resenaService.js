// USA LA URL COMPLETA DEL BACKEND
const API_URL = 'http://localhost:4000/api/resenas';

export const getResenasPorJuego = async (juegoId) => {
    const response = await fetch(`${API_URL}/juego/${juegoId}`);
    if (!response.ok) {
        throw new Error('Error al cargar reseñas');
    }
    return await response.json();
};

export const crearResena = async (datosResena) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosResena),
    });
    if (!response.ok) {
        throw new Error('Error al crear reseña');
    }
    return await response.json();
};

export const eliminarResena = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar reseña');
    }
    return await response.json();
};