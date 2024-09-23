import React, { useState } from 'react';
import Login from '../login/Login';
import NavbarBasic from '../nav/Navbar';
import { Admon } from '../protected/Admon';
import AddUser from '../register/AddUser';
import '../../css/style.css';

const Render = () => {
    const [token, setToken] = useState('');
    const [view, setView] = useState('login'); // Estado para manejar la vista actual

    const logout = () => {
        setToken('');
        setView('login'); // Resetear vista al cerrar sesión
    };

    return (
        <div className="content">
            {!token ? (
                <Login setToken={setToken} />
            ) : (
                <div className="navcontent">
                    <NavbarBasic logout={logout} setView={setView} />
                    {view === 'admon' && <Admon />}
                    {view === 'adduser' && <AddUser />} {/* Mostrar el componente de agregar usuario */}
                </div>
            )}
        </div>
    );
};

export default Render;
