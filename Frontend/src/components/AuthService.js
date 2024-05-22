// src/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

class AuthService {
  async login(email, password) {
    const response = await axios
      .post(`${API_URL}/login`, { email, password });
    console.log(response.data.token);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userEmail', email);
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem("userEmail");
  }

  register(email, password) {
    return axios.post(`${API_URL}/signup`, { email, password });
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return user;
    }
    return null;
  }
}

export default new AuthService();
