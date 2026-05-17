import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import './MyListings.css';

function MyListings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
      fetchUserItems(email);
    } else {
      setError('Please provide your email to view your listings');
      setLoading(false);
    }
  }, []);

  const fetchUserItems = async (email) => {
    try {
      setLoading(true);
      const data = await ItemService.getUserItems(email);
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to load your items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await ItemService.deleteItem(id);
        setItems(items.filter(item => item.id !== id));
      } catch (error) {
        setError('Failed to delete item');
        console.error(error);
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await ItemService.updateItemStatus(id, newStatus);
      setItems(items.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
    } catch (error) {
      setError('Failed to update item status');
      console.error(error);
    }
  };

  if (loading) return <div className="loading">Loading your listings...</div>;

  return (
    <div className="my-listings">
      <h1>My Listings</h1>
      
      {error && <div className="error-message">{error}</div>}

      {items.length === 0 ? (
        <div className="no-items">
          <p>You haven't listed any items yet.</p>
        </div>
      ) : (
        <div className="listings-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date Reported</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>
                    <select 
                      value={item.status} 
                      onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="lost">Lost</option>
                      <option value="found">Found</option>
                      <option value="claimed">Claimed</option>
                    </select>
                  </td>
                  <td>{new Date(item.dateReported).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyListings;
