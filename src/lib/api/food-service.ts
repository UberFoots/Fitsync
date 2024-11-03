import { fetchWithErrorHandling } from '../fetch-wrapper';

const CALORIE_NINJA_API_KEY = 'O4HSe/aTrF3C12LCj93Qaw==1l9zYQcFDnJcXnxA';
const BASE_URL = 'https://api.calorieninjas.com/v1';

export interface NutritionInfo {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}

export interface NutritionResponse {
  items: NutritionInfo[];
}

export const searchFood = async (query: string): Promise<NutritionResponse> => {
  return fetchWithErrorHandling<NutritionResponse>(
    `${BASE_URL}/nutrition?query=${encodeURIComponent(query)}`,
    {
      headers: {
        'X-Api-Key': CALORIE_NINJA_API_KEY,
      },
    }
  );
};

export const recognizeFoodFromImage = async (file: File): Promise<NutritionResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/imagetextnutrition`, {
    method: 'POST',
    headers: {
      'X-Api-Key': CALORIE_NINJA_API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data as NutritionResponse;
};