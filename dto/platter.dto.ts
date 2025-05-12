import { IngredientBaseDTO } from './ingredient.dto';
import { NutritionBaseDTO } from './nutrition.dto';

type PlatterBaseDTO = {
  id: number;
  name: string;
  description: string;
};

export type PlatterDTO = PlatterBaseDTO & {
  nutriSummary: NutritionBaseDTO;
  ingredients: IngredientBaseDTO[];
  ingredientsNutrition: Record<string, NutritionBaseDTO>;
};

export type CalendarPlatterDTO = PlatterDTO & {
  date: string;
};
