import React from 'react';
import SideNav from './travelshoot/SideNav';
import './TravelshootDashboard.css';

function TravelshootDashboard({ onLogout }) {
  return (
    <div className="dashboard-page">
      <SideNav />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Travelshoot Dashboard</h1>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
        <div className="dashboard-content">
          <h2>Welcome, Travelshoot Team!</h2>
          <p>Plan and manage travel shoots.</p>
          {/* Add travelshoot-specific content here */}
        </div>
      </div>
    </div>
  );
}

export default TravelshootDashboard;