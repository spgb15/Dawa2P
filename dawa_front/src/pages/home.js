// src/pages/home.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Feed from '../components/Feed';
import Contacts from '../components/Contacts';
import HomeForm from '../components/form_home';
import '../styles/Home.css';

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
