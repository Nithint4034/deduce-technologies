import React from 'react';
import SideNav from './production/SideNav';
import './ProductionDashboard.css';

function ProductionDashboard({ onLogout }) {
  return (
    <div className="dashboard-page">
      <SideNav />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Production Dashboard</h1>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
        <div className="dashboard-content">
          <h2>Welcome, Production Team!</h2>
          <p>Manage production workflows and tasks.</p>
          {/* Add production-specific content here */}
        </div>
      </div>
    </div>
  );
}

export default ProductionDashboard;