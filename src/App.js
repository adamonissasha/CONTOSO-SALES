import { Routes, Route } from 'react-router-dom';
import React from 'react';

import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
