import axios from 'axios';

export const api = axios.create();

api.interceptors.response.use((response) => response.data);
