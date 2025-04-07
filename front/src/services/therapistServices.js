import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Therapists';

export const getTherapist = async () => { 
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching Therapists:');
    throw error; 
  }
};

export const createTherapist = async (therapists) => {
  console.log('Sending Therapist data:');
  
  try {
    const response = await axios.post(API_URL, therapists);
    return response.data;
  } catch (error) {
    console.error('Error creating Therapist:', error.response ? error.response.data : error);
    throw error;
  }
};

export const updateTherapist = async (id, therapists) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, therapists);
    return response.data;
  } catch (error) {
    console.error('Error updating Therapist:', error);
    throw error;
  }
};

export const deleteTherapist = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Therapist:', error);
    throw error;
  }
};
