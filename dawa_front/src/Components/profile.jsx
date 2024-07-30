// src/Pages/profile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../Components/Topbar.jsx';
import '../Styles/profilePage.css';
import { useUser } from '../context/UserContext';

const ProfilePage = () => {
    const { username } = useParams(); 
    const { user } = useUser(); 
    const [profile, setProfile] = useState({
        name: '',
        friendsCount: 0,
        coverPhoto: '/default-cover-photo.jpg',
        profilePhoto: '/default-profile-photo.jpg',
        location: 'Ubicación desconocida',
        hometown: 'Lugar de origen desconocido'
    });
    const [selectedUserProfile, setSelectedUserProfile] = useState(null); 
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    const fetchProfileData = async () => {
        if (!username) {
            console.error('No username provided');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/user/profile?username=${encodeURIComponent(username)}`);
            const data = await response.json();
            console.log('Profile data:', data);

            if (data.status === 'success') {
                setSelectedUserProfile({
                    name: data.data.nombre || '',
                    friendsCount: data.data.amigos || 0,
                    coverPhoto: data.data.coverPhoto || '/default-cover-photo.jpg',
                    profilePhoto: data.data.profilePhoto || '/default-profile-photo.jpg',
                    location: data.data.location || 'Ubicación desconocida',
                    hometown: data.data.hometown || 'Lugar de origen desconocido'
                });
            } else {
                console.error('Error fetching profile data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const fetchUserPosts = async () => {
        if (!username) {
            console.error('No username provided');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/posts?username=${encodeURIComponent(username)}`);
            const data = await response.json();
            console.log('Posts data:', data);

            if (data.status === 'success') {
                setPosts(data.data);
            } else {
                console.error('Error fetching posts data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching posts data:', error);
        }
    };

    const fetchCurrentUserProfile = async () => {
        if (!user) {
            console.error('No user data available');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/user/profile?user_id=${user.id_usuario}`);
            const data = await response.json();
            console.log('Current user profile data:', data);

            if (data.status === 'success') {
                setProfile({
                    name: data.data.nombre || '',
                    friendsCount: data.data.amigos || 0,
                    coverPhoto: data.data.coverPhoto || '/default-cover-photo.jpg',
                    profilePhoto: data.data.profilePhoto || '/default-profile-photo.jpg',
                    location: data.data.location || 'Ubicación desconocida',
                    hometown: data.data.hometown || 'Lugar de origen desconocido'
                });
            } else {
                console.error('Error fetching profile data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchCurrentUserProfile();
        fetchProfileData();
        fetchUserPosts();
    }, [username, user]);

    const handlePostSubmit = async () => {
        if (!newPostContent) {
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: user.id_usuario, content: newPostContent }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setNewPostContent('');
                fetchUserPosts(); 
            } else {
                console.error('Error posting data:', data.message);
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <div>
            <TopBar />
            <div className="profile-container">
                <div className="cover-photo">
                    <img src={selectedUserProfile?.coverPhoto || profile.coverPhoto} alt="Cover" />
                </div>
                <div className="profile-details">
                    <img src={selectedUserProfile?.profilePhoto || profile.profilePhoto} alt="Profile" className="profile-photo" />
                    <h1>{selectedUserProfile?.name || profile.name}</h1>
                    <p>{selectedUserProfile?.friendsCount || profile.friendsCount} amigos</p>
                </div>
                <div className="profile-options">
                    {user?.username === username && (
                        <>
                            <button>Agregar a historia</button>
                            <button>Editar perfil</button>
                        </>
                    )}
                </div>
                <div className="profile-content">
                    <div className="sidebar">
                        <h2>Detalles</h2>
                        <p>{selectedUserProfile?.location || profile.location}</p>
                        <p>{selectedUserProfile?.hometown || profile.hometown}</p>
                    </div>
                    <div className="main-content">
                        {user?.username === username && (
                            <div className="post-input">
                                <textarea
                                    placeholder="¿Qué estás pensando?"
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                />
                                <div className="post-actions">
                                    <button onClick={handlePostSubmit}>Publicar</button>
                                </div>
                            </div>
                        )}
                        <div className="posts">
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <div key={post.post_id} className="post">
                                        <h3>{post.author_name}</h3>
                                        <p>{post.content}</p>
                                        <small>{new Date(post.date_posted).toLocaleString()}</small>
                                    </div>
                                ))
                            ) : (
                                <p>No hay publicaciones para mostrar.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
