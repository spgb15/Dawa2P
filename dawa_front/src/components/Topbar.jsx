// src/components/Topbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../Styles/Topbar.css';

export default function Topbar() {
    const navigate = useNavigate();
    const { user } = useUser(); 

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topbarLeft">
                    <a href='/home'><span className="logo">RedSocial UG</span></a>
                    
                </div>
                <div className="topbarCenter">
                    <input type="text" placeholder="Buscar en RedSocial UG" className="searchInput" />
                </div>
                <div className="topbarRight">
                    <img
                        src={user?.profilePicture || '/path/to/default/profile.jpg'} // Usa la foto de perfil del usuario
                        alt="profile"
                        className="topbarImg"
                        onClick={handleProfileClick}
                    />
                </div>
            </div>
        </div>
    );
}
