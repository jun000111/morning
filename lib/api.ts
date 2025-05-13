import axios from 'axios';
import { ENV } from '@/constants/env';
import { getClerkInstance } from '@clerk/clerk-expo';

const api = axios.create({
  baseURL: ENV.API_URL,
  //baseURL: 'http://192.168.243.232:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const clerk = getClerkInstance();
  const session = await clerk.session?.getToken(); // this should be awaited
  if (session) {
    config.headers.Authorization = `Bearer ${session}`;
  }
  return config;
});

export default api;
