import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
