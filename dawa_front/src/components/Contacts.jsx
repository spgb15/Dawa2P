import React, { useState, useEffect } from 'react';
import '../Styles/Contacts.css'; 
import { Link } from 'react-router-dom';

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const tokens = localStorage.getItem('tokenss');
                if (!tokens) {
                    throw new Error('Token no encontrado en el almacenamiento local.');
                }

                const response = await fetch('http://127.0.0.1:5000/api/friends', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tokens })
                });

                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('text/html')) {
                    const text = await response.text();
                    throw new Error(`La respuesta del servidor no es un JSON válido. Respuesta HTML: ${text}`);
                }

                if (!response.ok) {
                    throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('Resultado de la respuesta:', result);

                if (result.status === 'success') {
                    // Aquí ajustamos para manejar si `data` es un objeto en lugar de un array
                    if (Array.isArray(result.data)) {
                        setContacts(result.data);
                    } else if (result.data && result.data.amigo_id) {
                        // Si `data` es un solo objeto, conviértelo en un array
                        setContacts([result.data]);
                    } else {
                        throw new Error('Los datos recibidos no son un array ni un objeto válido.');
                    }
                } else {
                    setError(result.message || 'No se encontraron contactos');
                }
            } catch (err) {
                console.error('Error al obtener contactos', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const contactsList = Array.isArray(contacts) ? (
        contacts.map(contact => (
            <li key={contact.amigo_id} className="contactItem">
                <Link to={`/chats`}>
                    {contact.nombre}
                </Link>
            </li>
        ))
    ) : (
        <p>No se encontraron contactos</p>
    );

    return (
        <div className="contacts">
            <div className="contactsWrapper">
                <h4>Contactos</h4>
                {loading && <p>Cargando contactos...</p>}
                {error && <p className="error">{error}</p>}
                <ul className="contactsList">
                    {contactsList}
                </ul>
            </div>
        </div>
    );
}
