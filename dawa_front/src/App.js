import './App.css';
import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../src/Pages/login.js';
import Home from '../src/Pages/home.js';
import Registro from '../src/Pages/registro.js';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path='/register' element={<Registro></Registro>} />
      </Routes>
    </Router>
  );
}

export default App;
