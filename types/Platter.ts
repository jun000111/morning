export interface Ingredient {
  id: number;
  name: string;
}

export interface IngredientNutrition extends Ingredient {
  calories: number;
  carbs: number;
  fat: number;
  sugar: number;
  fiber: number;
  sodium: number;
  cholesterol: number;
}

export interface PlatterIngredientNutrition {
  id: number;
  name: string;
  description: string;
  ingredients: IngredientNutrition[];
}
