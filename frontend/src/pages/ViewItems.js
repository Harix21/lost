import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemService from '../services/ItemService';
import './ViewItems.css';

function ViewItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchItems();
  }, [filter]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = filter === 'all' 
        ? await ItemService.getAllItems()
        : await ItemService.getItemsByStatus(filter);
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to load items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading items...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-items">
      <h1>Browse Items</h1>
      
      <div className="filter-section">
        <label>Filter by Status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Items</option>
          <option value="lost">Lost Items</option>
          <option value="found">Found Items</option>
          <option value="claimed">Claimed</option>
        </select>
      </div>

      {items.length === 0 ? (
        <div className="no-items">No items found</div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="item-image" />
              )}
              <div className="item-content">
                <h3>{item.title}</h3>
                <p className="item-category">📂 {item.category}</p>
                <p className="item-description">{item.description}</p>
                <div className="item-meta">
                  <span className={`status ${item.status}`}>{item.status.toUpperCase()}</span>
                  <span className="date">📅 {new Date(item.dateReported).toLocaleDateString()}</span>
                </div>
                <Link to={`/item/${item.id}`} className="view-btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewItems;
