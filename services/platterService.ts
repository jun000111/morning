import api from '@/lib/api';
import { PlatterIngredientNutrition } from '@/types/Platter';

export const getAllPlatters = async (): Promise<
  Record<string, PlatterIngredientNutrition[]>
> => {
  const res = await api.get('/platters');
  return res.data;
};
