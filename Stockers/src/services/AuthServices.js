import API from '../app/config/api';

export const login = async (email, password) => {
  try {
    const response = await API.post('/login', {
      email,
      password
    });

    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};
