// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../Styles/Sidebar.css';

export default function Sidebar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`http://127.0.0.1:5000/search?q=${encodeURIComponent(searchQuery)}`);
                const data = await response.json();

                console.log('Response from API:', data);

                if (data.status === 'success') {
                    if (Array.isArray(data.data)) {
                        setSearchResults(data.data);
                    } else if (data.data === null) {
                        setSearchResults([]);
                    } else {
                        setSearchResults([data.data]);
                    }
                } else {
                    setSearchResults([]);
                    setError(data.message || 'No se encontraron resultados');
                }
            } catch (error) {
                setError('Error al buscar usuarios');
            }
            setLoading(false);
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Buscar usuarios..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
                {loading && <p className="loading">Buscando...</p>}
                {error && <p className="error">{error}</p>}
                <ul className="sidebarList">
                    {searchResults.length > 0 ? (
                        searchResults.map((user, index) => (
                            user ? (
                                <li key={index} className="sidebarListItem">
                                    <Link to={`/profile/${user.username}`}>
                                        {user.nombre} ({user.username})
                                    </Link>
                                </li>
                            ) : null
                        ))
                    ) : (
                        <li className="sidebarListItem">No se encontraron usuarios</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
