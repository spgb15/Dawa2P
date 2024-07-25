// src/components/Topbar.jsx
import React from 'react';
import '../Styles/Topbar.css';

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topbarLeft">
                    <span className="logo">RedSocial UG</span>
                </div>
                <div className="topbarCenter">
                    <input type="text" placeholder="Buscar en RedSocial UG" className="searchInput" />
                </div>
                <div className="topbarRight">
                    <img src="/path/to/user/profile.jpg" alt="profile" className="topbarImg" />
                </div>
            </div>
        </div>
    );
}
