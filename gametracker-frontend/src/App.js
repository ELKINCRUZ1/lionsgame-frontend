import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; 

// --- 1. IMPORTAR TODOS TUS COMPONENTES Y PÁGINAS ---
import Navbar from './components/navbar/Navbar';
import BibliotecaJuegos from './pages/BibliotecaJuegos';
import ListaResenas from './pages/ListaResenas';
import EstadisticasPersonales from './pages/EstadisticasPersonales';
import FormularioJuego from './components/FormularioJuego/FormularioJuego'; 

// ¡Asegúrate de que esta ruta sea correcta!
import FormularioResena from './components/FormularioResena/FormularioResena';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <main className="app-content">
          <Routes>
            
            {/* Ruta principal (Biblioteca) */}
            <Route path="/videojuegos" element={<BibliotecaJuegos />} />

            {/* Ruta para CREAR (Formulario vacío) */}
            <Route path="/formulario-juego" element={<FormularioJuego />} />
            
            {/* Ruta para EDITAR (Formulario lleno con :id) */}
            <Route path="/formulario-juego/:id" element={<FormularioJuego />} />

            {/* Ruta para ver Reseñas */}
            <Route path="/resenas/:juegoId" element={<ListaResenas />} />

            {/* ¡¡ESTA ES LA RUTA NUEVA QUE FALTABA!! */}
            <Route path="/agregar-resena/:juegoId" element={<FormularioResena />} />

            {/* Ruta para Estadísticas */}
            <Route path="/estadisticas" element={<EstadisticasPersonales />} />

            {/* Redirección: Si entran a la raíz '/', llévalos a la biblioteca */}
            <Route path="/" element={<Navigate replace to="/videojuegos" />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;