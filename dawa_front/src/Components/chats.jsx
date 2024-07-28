import React, { useState } from 'react';
import TopBar from '../Components/Topbar.jsx';
import '../Styles/chatPage.css';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'me' }]);
            setInput('');
        }
    };

    return (
        <div>
            <TopBar />
            <div className="chat-container">
                <div className="sidebar">
                    <input type="text" placeholder="Buscar en Messenger" className="search-bar" />
                    <div className="chat-list">
                        {/* Lista de chats */}
                    </div>
                </div>
                <div className="chat-window">
                    <div className="chat-header">
                        <h2>Chat con Nombre de Usuario</h2>
                    </div>
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <form className="chat-input" onSubmit={handleSendMessage}>
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            placeholder="Escribe un mensaje..."
                        />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;