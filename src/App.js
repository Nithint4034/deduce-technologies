import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  const [page, setPage] = useState('login');

  return page === 'registration' ? (
    <Registration onSignIn={() => setPage('login')} />
  ) : (
    <Login onSignUp={() => setPage('registration')} />
  );
}

export default App;
