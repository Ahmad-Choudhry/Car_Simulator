import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7043', // Your backend's URL
  withCredentials: true, // Include credentials (cookies) with each request
});

export const fetchCars = async () => {
  try {
    const response = await api.get('/api/cars');
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const addCar = async (car) => {
  try {
    const response = await api.post('/api/cars', car);
    return response.data;
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
};

// ... other API functions
