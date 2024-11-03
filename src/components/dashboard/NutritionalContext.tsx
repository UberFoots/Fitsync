import React, { createContext, useContext, useState, useEffect } from 'react';
import { NutritionInfo } from '@/lib/api/food-service';

interface NutritionalState {
  dailyNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugar: number;
    sodium: number;
  };
  addFoodItem: (item: NutritionInfo) => void;
  resetDaily: () => void;
}

const initialState = {
  dailyNutrition: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    sodium: 0,
  },
  addFoodItem: () => {},
  resetDaily: () => {},
};

const NutritionalContext = createContext<NutritionalState>(initialState);

export const useNutritional = () => useContext(NutritionalContext);

export const NutritionalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dailyNutrition, setDailyNutrition] = useState(initialState.dailyNutrition);

  const addFoodItem = (item: NutritionInfo) => {
    setDailyNutrition(prev => ({
      calories: prev.calories + item.calories,
      protein: prev.protein + item.protein_g,
      carbs: prev.carbs + item.carbohydrates_total_g,
      fat: prev.fat + item.fat_total_g,
      sugar: prev.sugar + item.sugar_g,
      sodium: prev.sodium + item.sodium_mg / 1000, // Convert to grams
    }));
  };

  const resetDaily = () => {
    setDailyNutrition(initialState.dailyNutrition);
  };

  // Reset nutrition data at midnight
  useEffect(() => {
    const now = new Date();
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );
    const msToMidnight = night.getTime() - now.getTime();

    const timeout = setTimeout(resetDaily, msToMidnight);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <NutritionalContext.Provider value={{ dailyNutrition, addFoodItem, resetDaily }}>
      {children}
    </NutritionalContext.Provider>
  );
};