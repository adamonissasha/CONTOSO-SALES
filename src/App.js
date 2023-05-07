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
import OrdersAdminPage from './pages/OrdersAdminPage';
import OrdersManagerPage from './pages/OrdersManagerPage';
import StatisticPage from './pages/StatisticPage';

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
        {localStorage.getItem("user") && user.role === "Руководитель отдела продаж" && <Route path="/managers" element={<ManagersPage />} />}
        {localStorage.getItem("user") && user.role === "Менеджер отдела продаж" && <Route path="/products" element={<ProductsPage />} />}
        {localStorage.getItem("user") && user.role === "Менеджер отдела продаж" && <Route path="/clients" element={<ClientsPage />} />}
        {localStorage.getItem("user") && user.role === "Менеджер отдела продаж" && <Route path="/manager/requests" element={<RequestManagerPage currentUser={user} />} />}
        {localStorage.getItem("user") && user.role === "Руководитель отдела продаж" && <Route path="/admin/requests" element={<RequestAdminPage />} />}
        {localStorage.getItem("user") && user.role === "Менеджер отдела продаж" && <Route path="/manager/orders" element={<OrdersManagerPage currentUser={user} />} />}
        {localStorage.getItem("user") && user.role === "Руководитель отдела продаж" && <Route path="/admin/orders" element={<OrdersAdminPage />} />}
        {localStorage.getItem("user") && user.role === "Руководитель отдела продаж" && <Route path="/admin/statistic" element={<StatisticPage />} />}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
