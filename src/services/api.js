import axios from 'axios';

// Create an Axios instance with base URL and default headers
export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Flask backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});
