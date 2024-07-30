// src/Pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import TopBar from '../Components/Topbar.jsx';
import '../Styles/profilePage.css';
import { useUser } from '../context/UserContext'; 

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        name: '',
        friendsCount: 0,
        coverPhoto: '',
        profilePhoto: '',
        location: '',
        hometown: '',
    });
    const { user } = useUser(); 

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!user) {
                console.error('No user data available');
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:5000/profile?user_id=${user.id_usuario}`); 
                const data = await response.json();

                if (data.result) {
                    setProfile({
                        name: data.data.nombre,
                        friendsCount: data.data.amigos || 0,
                        coverPhoto: data.data.coverPhoto || '/default-cover-photo.jpg',
                        profilePhoto: data.data.profilePhoto || '/default-profile-photo.jpg',
                        location: data.data.vive_en || 'Ubicación desconocida',
                        hometown: data.data.de || 'Lugar de origen desconocido'
                    });
                } else {
                    console.error('Error fetching profile data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [user]);

    return (
        <div>
            <TopBar />
            <div className="profile-container">
                <div className="cover-photo">
                    <img src={profile.coverPhoto} alt="Cover" />
                </div>
                <div className="profile-details">
                    <img src={profile.profilePhoto} alt="Profile" className="profile-photo" />
                    <h1>{profile.name}</h1>
                    <p>{profile.friendsCount} amigos</p>
                </div>
                <div className="profile-options">
                    <button>Agregar a historia</button>
                    <button>Editar perfil</button>
                </div>
                <div className="profile-content">
                    <div className="sidebar">
                        <h2>Detalles</h2>
                        <p>{profile.location}</p>
                        <p>{profile.hometown}</p>
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
