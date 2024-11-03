import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface NutrientSummaryProps {
  timeframe: 'daily' | 'weekly' | 'monthly';
}

export const NutrientSummary: React.FC<NutrientSummaryProps> = ({ timeframe }) => {
  const nutrients = [
    { name: 'Calories', current: 1840, target: 2200, unit: 'kcal', color: 'from-blue-500 to-blue-600' },
    { name: 'Protein', current: 82, target: 120, unit: 'g', color: 'from-green-500 to-green-600' },
    { name: 'Carbs', current: 210, target: 275, unit: 'g', color: 'from-orange-500 to-orange-600' },
    { name: 'Fat', current: 65, target: 78, unit: 'g', color: 'from-purple-500 to-purple-600' },
    { name: 'Fiber', current: 18, target: 25, unit: 'g', color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrient Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {nutrients.map((nutrient, index) => (
          <motion.div
            key={nutrient.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{nutrient.name}</span>
              <span className="text-sm text-muted-foreground">
                {nutrient.current} / {nutrient.target} {nutrient.unit}
              </span>
            </div>
            <div className="relative h-2">
              <div className="absolute inset-0 rounded-full bg-primary/10" />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(nutrient.current / nutrient.target) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${nutrient.color}`}
              />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};