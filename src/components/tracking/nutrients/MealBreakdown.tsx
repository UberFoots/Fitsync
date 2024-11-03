import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const MealBreakdown = () => {
  const meals = [
    { 
      name: 'Breakfast', 
      time: '8:00 AM',
      calories: 450,
      nutrients: { protein: 25, carbs: 45, fat: 15 }
    },
    { 
      name: 'Lunch', 
      time: '12:30 PM',
      calories: 650,
      nutrients: { protein: 35, carbs: 65, fat: 22 }
    },
    { 
      name: 'Dinner', 
      time: '7:00 PM',
      calories: 550,
      nutrients: { protein: 30, carbs: 55, fat: 18 }
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-primary/5 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">{meal.name}</h3>
                  <p className="text-sm text-muted-foreground">{meal.time}</p>
                </div>
                <span className="text-lg font-semibold">{meal.calories} kcal</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="font-medium">{meal.nutrients.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="font-medium">{meal.nutrients.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fat</p>
                  <p className="font-medium">{meal.nutrients.fat}g</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};