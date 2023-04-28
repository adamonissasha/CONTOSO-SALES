import { Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import ManagersPage from './pages/ManagersPage';
import ProductsPage from './pages/ProductsPage';
import ClientsPage from './pages/ClientsPage';
import NotFoundPage from './pages/NotFoundPage';
import RequestManagerPage from './pages/RequestsManagerPage';
import RequestAdminPage from './pages/RequestsAdminPage';

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        {localStorage.getItem("user") && <Route path="/account" element={<AccountPage currentUser={user} />} />}
        {localStorage.getItem("user") && <Route path="/managers" element={<ManagersPage />} />}
        {localStorage.getItem("user") && <Route path="/products" element={<ProductsPage />} />}
        {localStorage.getItem("user") && <Route path="/clients" element={<ClientsPage />} />}
        {localStorage.getItem("user") && <Route path="/manager/requests" element={<RequestManagerPage currentUser={user} />} />}
        {localStorage.getItem("user") && <Route path="/admin/requests" element={<RequestAdminPage currentUser={user} />} />}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
