import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    /* baseURL: 'https://localhost:7236', */
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        console.log("token", token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default axiosInstance;