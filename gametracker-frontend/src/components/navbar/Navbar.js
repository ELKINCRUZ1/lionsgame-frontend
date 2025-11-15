import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // El CSS pixel

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                
                {/* --- ¡SOLO EL LOGO! --- */}
                <Link to="/" className="navbar-logo-link">
                    <img 
                        src="/logo.png" // Tu logo.png de la carpeta public
                        alt="Logo de LionsGame" 
                        className="navbar-logo-img" 
                    />
                    {/* --- ¡NOMBRE CAMBIADO! --- */}
                    <span className="navbar-logo-text">LionsGame</span>
                </Link>

                {/* --- ¡MENÚ CORREGIDO Y LÓGICO! --- */}
                <ul className="nav-menu">
                    
                    {/* 1. Link a INICIO */}
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" end>
                            Inicio
                        </NavLink>
                    </li>
                    
                    {/* 2. Link a VIDEOJUEGOS (Mi Colección) */}
                    <li className="nav-item">
                        <NavLink to="/videojuegos" className="nav-link">
                            Videojuegos
                        </NavLink>
                    </li>
                    
                    {/* 3. Link a AGREGAR JUEGO (Formulario) */}
                    <li className="nav-item">
                        <NavLink to="/formulario-juego" className="nav-link">
                            Agregar juego
                        </NavLink>
                    </li>

                    {/* 4. ¡EL NUEVO LINK RECOMENDADO! */}
                    <li className="nav-item">
                        <NavLink to="/estadisticas" className="nav-link">
                            Estadísticas
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;