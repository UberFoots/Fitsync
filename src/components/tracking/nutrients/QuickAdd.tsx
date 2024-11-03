import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Camera, ScanLine } from 'lucide-react';
import { motion } from 'framer-motion';

export const QuickAdd = () => {
  const recentFoods = [
    { name: 'Oatmeal with Berries', calories: 320 },
    { name: 'Grilled Chicken Salad', calories: 450 },
    { name: 'Greek Yogurt', calories: 150 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Add Food</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search foods..." />
          </div>
          <Button variant="outline" size="icon">
            <Camera className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ScanLine className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Recent Foods</h3>
          {recentFoods.map((food, index) => (
            <motion.div
              key={food.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <span className="font-medium">{food.name}</span>
              <span className="text-sm text-muted-foreground">{food.calories} kcal</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};