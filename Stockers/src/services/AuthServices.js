import api from './api';

export const AuthService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password
      });
      console.log('Results: ',response.data);
      return response.data; 
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },
  getProfile: async () => {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('No token found');

    const response = await api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
};
