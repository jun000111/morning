import api from '@/lib/api';

export const setCalendarBlock = async (date: string) => {
  const res = await api.post('api/calendar/setBlock', { date });
  console.log(res);
  return res.data;
};

export const getCalendarBlock = async () => {
  console.log('calling');
  const res = await api.get('api/calendar/getBlock');
  return res.data;
};
