import axios, { AxiosInstance } from 'axios';

if (!import.meta.env.VITE_APP_API_URL) {
    throw new Error('VITE_APP_API_URL no está definida en las variables de entorno');
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Opcionalmente, puedes agregar interceptores para manejar errores globalmente
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la petición:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;