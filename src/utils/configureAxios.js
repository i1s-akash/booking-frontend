import axios from 'axios';

export const configureAxios = () => {
    axios.defaults.baseURL = window.location.hostname === 'localhost'
    ? process.env.BACKEND_URL
    : process.env.VITE_API_URL;
    axios.defaults.withCredentials = true;
};