import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sessions';

export const getSession = async () => { 
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching Sessions:', error);
    throw error; 
  }
};

export const createSession = async (session) => {
  console.log('Sending Session data:', session);
  
  try {
    const response = await axios.post(API_URL, session);
    return response.data;
  } catch (error) {
    console.error('Error creating Session:', error.response ? error.response.data : error);
    throw error;
  }
};

export const updateSession = async (id, session) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, session);
    return response.data;
  } catch (error) {
    console.error('Error updating Session:', error);
    throw error;
  }
};

export const deleteSession = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Session:', error);
    throw error;
  }
};
