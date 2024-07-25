// src/pages/home.js
import React from 'react';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';
import Feed from '../Components/Feed';
import Contacts from '../Components/Contacts';
import '../Styles/Home.css';

export default function Home() {
    return (
        <div className="contenedor_home">
            <Topbar />
            <div className="homeWrapper">
                <Sidebar />
                <Feed />
                <Contacts />
            </div>
        </div>
    );
}
