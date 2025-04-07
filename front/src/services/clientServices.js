import axios from 'axios';

const API_URL = 'http://localhost:5000/api/clients';

export const getClient = async () => { 
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching Clients:', error);
    throw error; 
  }
};

export const createClient = async (clients) => {
  console.log('Sending Client data:', clients);
  
  try {
    const response = await axios.post(API_URL, clients);
    return response.data;
  } catch (error) {
    console.error('Error creating Client:', error.response ? error.response.data : error);
    throw error;
  }
};

export const updateClient = async (id, clients) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, clients);
    return response.data;
  } catch (error) {
    console.error('Error updating Client:', error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Client:', error);
    throw error;
  }
};
