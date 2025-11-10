// gametracker-frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Solo importamos las PÁGINAS 
import BibliotecaJuegos from './pages/BibliotecaJuegos'; 
import EstadisticasPersonales from './pages/EstadisticasPersonales'; 
import './App.css'; 
// import Navbar from './components/navbar/Navbar';

// ... Componente Navbar ...

function App() {
  return (
    <Router>
        <div className="App">
            {/* <Navbar /> */}
            <main className="content">
                <Routes>
                    <Route path="/" element={<BibliotecaJuegos />} />
                    <Route path="/estadisticas" element={<EstadisticasPersonales />} />
                </Routes>
            </main>
        </div>
    </Router>
  );
}

export default App;