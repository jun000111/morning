import axios from 'axios';
import { ENV } from '@/constants/env';

const api = axios.create({
  //baseURL: ENV.API_URL,
  baseURL: 'http://192.168.57.232:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
