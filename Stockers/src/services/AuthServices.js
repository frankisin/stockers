import api from './API';

export const AuthService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password
      });

      return response.data; // this might include a token or user info
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  }
};
