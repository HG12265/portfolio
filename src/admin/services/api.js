import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local session state if unauthorized
      if (window.location.pathname.startsWith('/studio') && window.location.pathname !== '/studio/login') {
        window.location.href = '/studio/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
