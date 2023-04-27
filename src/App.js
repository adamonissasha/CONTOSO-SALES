import { Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
// import ManagersPage from './pages/ManagersPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        {/* <Route path="/managers" element={<ManagersPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
