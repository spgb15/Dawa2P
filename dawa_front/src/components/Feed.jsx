// src/components/Feed.jsx
import React from 'react';
import HomeForm from './form_home';
import '../styles/Feed.css';

export default function Feed() {
    return (
        <div className="feed">
            <HomeForm />
            <div className="posts">
                {/* Aquí irían las publicaciones */}
            </div>
        </div>
    );
}
