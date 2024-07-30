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
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('tokenss');
    if (token) {
      validateToken(token);
    }
  }, []);

  const validateToken = (token) => {
    fetch('http://192.168.100.10:5000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setIsAuthenticated(true);
        setIsTokenValid(true);
        setUser(JSON.parse(localStorage.getItem('user')));
      } else {
        setIsAuthenticated(false);
        setIsTokenValid(false);
        setUser(null);
        localStorage.removeItem('tokenss');
      }
    })
    .catch(err => {
      console.error("Error al validar el token:", err);
      setIsAuthenticated(false);
      setIsTokenValid(false);
      setUser(null);
      localStorage.removeItem('tokenss');
    });
  };

  const handleAuthentication = (authenticated, id, role, token) => {
    setIsAuthenticated(authenticated);
    if (authenticated) {
      setUser({ id_usuario: id, role });
      localStorage.setItem('user', JSON.stringify({ id_usuario: id, role }));
      localStorage.setItem('tokenss', token);
      validateToken(token);
    } else {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('tokenss');
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated && isTokenValid ? <Navigate to="/home" /> : <Login onAuthenticate={handleAuthentication} />}
        />
        <Route
          path="/register"
          element={isAuthenticated && isTokenValid ? <Navigate to="/home" /> : <Registro />}
        />
        <Route
          path="/home"
          element={isAuthenticated && isTokenValid ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/chats"
          element={isAuthenticated && isTokenValid ? <ChatsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated && isTokenValid ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAuthenticated && isTokenValid && user?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
