import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Port ของ Backend NestJS
});

// ดักจับก่อนยิง Request เพื่อใส่ Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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