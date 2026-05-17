import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Lost & Found Portal</h1>
        <p>Help reunite lost items with their owners</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>🎯 Quick Actions</h3>
          <div className="action-buttons">
            <Link to="/report-lost" className="btn btn-primary">
              Report Lost Item
            </Link>
            <Link to="/report-found" className="btn btn-primary">
              Report Found Item
            </Link>
            <Link to="/view-items" className="btn btn-primary">
              Browse All Items
            </Link>
          </div>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <h4>📋 Lost Items</h4>
            <p>Browse and report items that have been lost.</p>
          </div>
          <div className="info-card">
            <h4>🎁 Found Items</h4>
            <p>Help return found items to their rightful owners.</p>
          </div>
          <div className="info-card">
            <h4>💬 Connect</h4>
            <p>Contact others and arrange item pickups.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
