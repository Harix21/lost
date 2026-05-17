import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';
import './ItemDetail.css';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const data = await ItemService.getItemById(id);
      setItem(data);
      setError(null);
    } catch (err) {
      setError('Failed to load item details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent to ${item.contactName}!\n\nYour message has been sent. They will contact you soon.`);
    setContactMessage('');
    setShowContact(false);
  };

  if (loading) return <div className="loading">Loading item details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="error">Item not found</div>;

  return (
    <div className="item-detail">
      <div className="item-detail-container">
        <div className="item-image-section">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="detail-image" />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>

        <div className="item-info-section">
          <h1>{item.title}</h1>
          
          <div className="item-header-info">
            <span className={`status-badge ${item.status}`}>{item.status.toUpperCase()}</span>
            <span className="category-badge">{item.category.toUpperCase()}</span>
          </div>

          <div className="description-box">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <label>Location:</label>
              <p>📍 {item.location}</p>
            </div>
            <div className="detail-item">
              <label>Date Reported:</label>
              <p>📅 {new Date(item.dateReported).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="contact-section">
            <h3>Contact Information</h3>
            <div className="contact-info">
              <p><strong>Name:</strong> {item.contactName}</p>
              <p><strong>Email:</strong> {item.contactEmail}</p>
              <p><strong>Phone:</strong> {item.contactPhone}</p>
            </div>

            <button 
              className="contact-btn"
              onClick={() => setShowContact(!showContact)}
            >
              {showContact ? 'Cancel' : 'Contact Owner'}
            </button>

            {showContact && (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <textarea
                  placeholder="Write your message here..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows="4"
                  required
                />
                <button type="submit" className="send-btn">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
