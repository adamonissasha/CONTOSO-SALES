import { Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import ManagersPage from './pages/ManagersPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        <Route path="/account" element={<AccountPage currentUser={user} />} />
        <Route path="/managers" element={<ManagersPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
