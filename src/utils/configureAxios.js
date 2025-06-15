import axios from 'axios';

export const configureAxios = () => {
    axios.defaults.baseURL = process.env.VITE_API_URL;
    axios.defaults.withCredentials = true;
};