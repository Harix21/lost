import React, { useState } from 'react';
import ItemService from '../services/ItemService';
import './ReportForm.css';

function ReportFound() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    location: '',
    dateFound: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    imageUrl: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ItemService.createItem({
        ...formData,
        status: 'found',
        dateLost: formData.dateFound
      });
      setMessage('Found item reported successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'other',
        location: '',
        dateFound: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        imageUrl: ''
      });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error reporting item. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Report Found Item</h1>
      
      {message && <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
        {message}
      </div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Red Wallet"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe the item in detail..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="electronics">Electronics</option>
              <option value="jewelry">Jewelry</option>
              <option value="clothing">Clothing</option>
              <option value="documents">Documents</option>
              <option value="bag">Bag/Luggage</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date Found *</label>
            <input
              type="date"
              name="dateFound"
              value={formData.dateFound}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location Found *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Where was it found?"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <h3>Your Contact Information</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Report Found Item</button>
      </form>
    </div>
  );
}

export default ReportFound;
