import { Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import ManagersPage from './pages/ManagersPage';
import ProductsPage from './pages/ProductsPage';
import ClientsPage from './pages/ClientsPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/managers" element={<ManagersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/clients" element={<ClientsPage />} />
      </Routes>
    </div>
  );
}

export default App;
