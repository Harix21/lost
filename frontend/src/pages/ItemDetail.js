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
  const [contactForm, setContactForm] = useState({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState(null);

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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus(null);

    try {
      await ItemService.sendContactMessage(id, contactForm);
      setContactStatus({ type: 'success', text: `Your message was sent to ${item.contactName}.` });
      setContactForm({ senderName: '', senderEmail: '', senderPhone: '', message: '' });
      setShowContact(false);
    } catch (err) {
      setContactStatus({ type: 'error', text: 'Unable to send your message. Please try again later.' });
      console.error(err);
    }
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

            {contactStatus && (
              <div className={`message ${contactStatus.type === 'success' ? 'success' : 'error'}`}>
                {contactStatus.text}
              </div>
            )}

            <button 
              className="contact-btn"
              onClick={() => {
                setShowContact(!showContact);
                setContactStatus(null);
              }}
            >
              {showContact ? 'Cancel' : 'Contact Owner'}
            </button>

            {showContact && (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    name="senderName"
                    value={contactForm.senderName}
                    onChange={(e) => setContactForm({ ...contactForm, senderName: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                  <input
                    type="email"
                    name="senderEmail"
                    value={contactForm.senderEmail}
                    onChange={(e) => setContactForm({ ...contactForm, senderEmail: e.target.value })}
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="tel"
                    name="senderPhone"
                    value={contactForm.senderPhone}
                    onChange={(e) => setContactForm({ ...contactForm, senderPhone: e.target.value })}
                    placeholder="Your phone"
                  />
                </div>
                <textarea
                  placeholder="Write your message here..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
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
