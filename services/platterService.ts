import api from '@/lib/api';
import { Platter } from '@/types/Platter';

export const getAllPlatters = async (): Promise<Platter[]> => {
  const res = await api.get('/platters');
  return res.data;
};
