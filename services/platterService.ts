import api from '@/lib/api';
import { PlatterIngredientNutrition } from '@/types/Platter';

export const getAllPlatters = async (
  token: string | null
): Promise<Record<string, PlatterIngredientNutrition[]>> => {
  if (!token) {
    throw new Error('Token not exist');
  }

  const res = await api.get('/platters', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
