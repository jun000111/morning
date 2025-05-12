import api from '@/lib/api';
import { CalendarPlatterDTO, PlatterDTO } from '@/dto/platter.dto';

export const getAllPlatters = async (): Promise<PlatterDTO[]> => {
  const res = await api.get('api/platters');
  return res.data;
};

export const getCalenderPlatters = async (): Promise<CalendarPlatterDTO[]> => {
  const results = await api.get(`api/platters/calendar`);
  console.log(results);
  return results.data;
};
