// USA LA URL COMPLETA DEL BACKEND
const API_URL = 'http://localhost:4000/api/juegos'; 

export const getTodosLosJuegos = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al cargar juegos');
    }
    return await response.json();
};

export const getJuegoById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Error al cargar juego');
    }
    return await response.json();
};

export const crearJuego = async (datosJuego) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosJuego),
    });
    if (!response.ok) {
        throw new Error('Error al crear juego');
    }
    return await response.json();
};

export const actualizarJuego = async (id, datosJuego) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosJuego),
    });
    if (!response.ok) {
        throw new Error('Error al actualizar juego');
    }
    return await response.json();
};

export const eliminarJuego = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar juego');
    }
    return await response.json();
};