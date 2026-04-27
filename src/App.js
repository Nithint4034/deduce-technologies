import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import AdminDashboard from './components/AdminDashboard';
import ProductionDashboard from './components/ProductionDashboard';
import TravelshootDashboard from './components/TravelshootDashboard';

function App() {
  const [page, setPage] = useState('login');
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setUserRole(role);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setUserRole('');
    setPage('login');
  };

  if (page === 'dashboard') {
    switch (userRole) {
      case 'Admin':
        return <AdminDashboard onLogout={handleLogout} />;
      case 'Production':
        return <ProductionDashboard onLogout={handleLogout} />;
      case 'Travelshoot':
        return <TravelshootDashboard onLogout={handleLogout} />;
      default:
        return <Login onSignUp={() => setPage('registration')} onLogin={handleLogin} />;
    }
  }

  return page === 'registration' ? (
    <Registration onSignIn={() => setPage('login')} />
  ) : (
    <Login onSignUp={() => setPage('registration')} onLogin={handleLogin} />
  );
}

export default App;
