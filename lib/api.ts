import axios from 'axios';
import { ENV } from '@/constants/env';

const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
