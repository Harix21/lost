import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const ItemService = {
  getAllItems: async () => {
    try {
      const response = await axios.get(`${API_URL}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  getItemById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/items/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching item:', error);
      throw error;
    }
  },

  getItemsByStatus: async (status) => {
    try {
      const response = await axios.get(`${API_URL}/items/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items by status:', error);
      throw error;
    }
  },

  getUserItems: async (email) => {
    try {
      const response = await axios.get(`${API_URL}/items/user/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user items:', error);
      throw error;
    }
  },

  createItem: async (itemData) => {
    try {
      const response = await axios.post(`${API_URL}/items`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  updateItem: async (id, itemData) => {
    try {
      const response = await axios.put(`${API_URL}/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  updateItemStatus: async (id, status) => {
    try {
      const response = await axios.patch(`${API_URL}/items/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating item status:', error);
      throw error;
    }
  },

  deleteItem: async (id) => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }
};

export default ItemService;
