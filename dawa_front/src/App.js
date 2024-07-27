import './App.css';
import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../src/Pages/login.js';
import Home from '../src/Pages/home.js';
import Registro from '../src/Pages/registro.js';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleAuthentication = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onAuthenticate={handleAuthentication} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path='/register' element={<Registro></Registro>} />
      </Routes>
    </Router>
  );
}

export default App;
