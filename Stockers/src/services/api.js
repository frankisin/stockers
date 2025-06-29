import axios from 'axios';

const api = axios.create({
  baseURL: 'https://stockers.onrender.com/', // all API routes will be relative to this
  withCredentials: true // set to true if your backend is using cookies for auth
});

export default api;
