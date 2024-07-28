import React from 'react';
import TopBar from '../Components/Topbar.jsx';
import '../Styles/profilePage.css';

const ProfilePage = () => {
    return (
        <div>
            <TopBar />
            <div className="profile-container">
                <div className="cover-photo">
                    <img src="/path-to-cover-photo.jpg" alt="Cover" />
                </div>
                <div className="profile-details">
                    <img src="/path-to-profile-photo.jpg" alt="Profile" className="profile-photo" />
                    <h1>Wilmer Pedro Villón</h1>
                    <p>378 amigos</p>
                </div>
                <div className="profile-options">
                    <button>Agregar a historia</button>
                    <button>Editar perfil</button>
                </div>
                <div className="profile-content">
                    <div className="sidebar">
                        <h2>Detalles</h2>
                        <p>Vive en Guayaquil</p>
                        <p>De Guayaquil</p>
                    </div>
                    <div className="main-content">
                        <div className="post-input">
                            <textarea placeholder="¿Qué estás pensando?" />
                            <div className="post-actions">
                                <button>Video en vivo</button>
                                <button>Foto/video</button>
                                <button>Acontecimiento importante</button>
                            </div>
                        </div>
                        <div className="posts">
                            {/* Aquí irán las publicaciones */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;