import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:3009', // Adjust the baseURL as needed
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
