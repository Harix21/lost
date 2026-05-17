import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">🔍 Lost & Found</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/view-items">Browse Items</Link>
          <Link to="/report-lost">Report Lost</Link>
          <Link to="/report-found">Report Found</Link>
          <Link to="/my-listings">My Listings</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
