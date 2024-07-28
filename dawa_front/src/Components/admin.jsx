import React from 'react';
import '../Styles/adminPage.css';

const AdminMenu = () => {
    return (
        <div className="admin-container">
            <h1>Administración</h1>
            <div className="admin-grid">
                <div className="admin-section">
                    <h2>Usuarios</h2>
                    <ul>
                        <li>Crear</li>
                        <li>Editar</li>
                        <li>Eliminar</li>
                    </ul>
                </div>
                <div className="admin-section">
                    <h2>Reportes</h2>
                    <ul>
                        <li>Ver</li>
                    </ul>
                </div>
                <div className="admin-section">
                    <h2>Ver Publicaciones</h2>
                    <ul>
                        <li>Crear</li>
                        <li>Editar</li>
                        <li>Eliminar</li>
                    </ul>
                </div>
                <div className="admin-section">
                    <h2>Ver Comentarios</h2>
                    <ul>
                        <li>Crear</li>
                        <li>Editar</li>
                        <li>Eliminar</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
