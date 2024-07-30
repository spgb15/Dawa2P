// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/login';
import Home from './Pages/home';
import Registro from './Pages/registro';
import ChatsPage from './Pages/chats';
import ProfilePage from './Pages/profile';
import AdminPage from './Pages/admin';
import { useUser } from './context/UserContext'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser } = useUser(); 

  const handleAuthentication = (authenticated, id, role) => {
    setIsAuthenticated(authenticated);
    if (authenticated) {
      setUser({ id_usuario: id, role });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsAuthenticated(true);
      setUser(user);
    }
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onAuthenticate={handleAuthentication} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/chats" element={isAuthenticated ? <ChatsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

//<Route path="/chats" element={isAuthenticated ? <ChatsPage /> : <Navigate to="/login" />} />
//<Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
//<Route path="/admin" element={isAuthenticated && userRole === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
