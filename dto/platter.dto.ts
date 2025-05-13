import { IngredientBaseDTO } from './ingredient.dto';
import { NutritionBaseDTO } from './nutrition.dto';

type PlatterBaseDTO = {
  id: string;
  name: string;
  description: string;
};

export type PlatterDTO = PlatterBaseDTO & {
  nutritions: NutritionBaseDTO;
} & {
  ingredients: IngredientBaseDTO[];
};

export type CalendarPlatterDTO = PlatterDTO & {
  date: string;
};
