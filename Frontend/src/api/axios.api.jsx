import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Backend
  withCredentials: true, // Importante: permite enviar cookies (JWT en cookie)
  timeout: 10000,
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en petición API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;