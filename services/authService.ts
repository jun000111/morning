import api from '../lib/api';
import { UserResponseDTO } from '@/dto/user.dto';
import { generatedUser } from '@/utils/randomGenerator';

export const registerUser = async (token: string): Promise<UserResponseDTO> => {
  const res = await api.post('api/auth/register', generatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
