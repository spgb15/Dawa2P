// src/components/Sidebar.jsx
import React from 'react';
import '../styles/Sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">Amigos</li>
                    <li className="sidebarListItem">Recuerdos</li>
                    <li className="sidebarListItem">Guardado</li>
                    <li className="sidebarListItem">Grupos</li>
                    <li className="sidebarListItem">Video</li>
                    <li className="sidebarListItem">Marketplace</li>
                    <li className="sidebarListItem">Ver más</li>
                </ul>
            </div>
        </div>
    );
}
