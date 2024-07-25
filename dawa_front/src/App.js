import './App.css';
import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login.js';
import Home from './pages/home.js'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
