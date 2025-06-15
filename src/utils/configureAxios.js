import axios from 'axios';

export const configureAxios = () => {
    axios.defaults.baseURL = process.env.BACKEND_URL;
    axios.defaults.withCredentials = true;
};