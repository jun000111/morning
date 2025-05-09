import api from '../lib/api';
import { User } from '@/types/User';

export const registerUser = async (token: string): Promise<User> => {
  const res = await api.post(
    'api/auth/register',
    {}, // No need to send user info from frontend
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
