import { UserRegisterDTO } from '@/types/User';
import { User } from '@/types/User';
import api from '../lib/api';

export const registerUser = async (user: UserRegisterDTO): Promise<User> => {
  const res = await api.post('/users/register', {
    ...user,
  });
  return res.data;
};
