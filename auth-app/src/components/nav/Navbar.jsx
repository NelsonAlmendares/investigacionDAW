import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarBasic = ({ logout, setView }) => {
    const navigate = useNavigate();

    const handleNavigation = (view) => {
        setView(view); // Cambiar el estado en el componente Render
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container">
                <a className="navbar-brand" href="#">Universidad Don Bosco</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-light active" aria-current="page" onClick={() => handleNavigation('home')}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" onClick={() => handleNavigation('adduser')}>Agregar usuario</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" onClick={() => handleNavigation('admon')}>Administración privada</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <div className="dropdown">
                            <a className="btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="img-profile" src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/f8239007-7d36-45ce-a0a1-fdf91052b10e/299f5e14-73c4-4a9b-99c9-e44adbc218cf.png" alt="" />
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Configuración</a></li>
                                <li><a className="dropdown-item" href="#">Soporte técnico</a></li>
                                <li><a className="dropdown-item" onClick={logout}>Cerrar sesión</a></li> {/* Aquí se llama a la función logout */}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default NavbarBasic;
