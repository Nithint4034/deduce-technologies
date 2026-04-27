import React from 'react';
import './AdminDashboard.css';

function AdminDashboard({ onLogout }) {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
      <div className="dashboard-content">
        <h2>Welcome, Admin!</h2>
        <p>You have access to all administrative features.</p>
        {/* Add admin-specific content here */}
      </div>
    </div>
  );
}

export default AdminDashboard;