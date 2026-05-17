import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ViewItems from './pages/ViewItems';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';
import MyListings from './pages/MyListings';
import ItemDetail from './pages/ItemDetail';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-items" element={<ViewItems />} />
          <Route path="/report-lost" element={<ReportLost />} />
          <Route path="/report-found" element={<ReportFound />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
