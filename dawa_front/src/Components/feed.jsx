// src/components/Feed.jsx
import React from 'react';
import HomeForm from '../Components/form_home';
import '../Styles/Feed.css';

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