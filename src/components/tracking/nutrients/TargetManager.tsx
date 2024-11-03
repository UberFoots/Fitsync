import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth-store';

export const TargetManager = () => {
  const { user, updateUserPreferences } = useAuthStore();
  const [formData, setFormData] = React.useState({
    dailyCalories: user?.preferences?.dailyCalories || 2000,
    protein: user?.preferences?.protein || 150,
    carbs: user?.preferences?.carbs || 200,
    fat: user?.preferences?.fat || 70
  });

  const presetDiets = [
    { name: 'Balanced', calories: 2000, protein: 150, carbs: 200, fat: 70 },
    { name: 'Keto', calories: 1800, protein: 135, carbs: 45, fat: 140 },
    { name: 'High Protein', calories: 2200, protein: 220, carbs: 165, fat: 75 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handlePresetClick = (preset: typeof presetDiets[0]) => {
    setFormData({
      dailyCalories: preset.calories,
      protein: preset.protein,
      carbs: preset.carbs,
      fat: preset.fat
    });
  };

  const handleSave = async () => {
    await updateUserPreferences(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Target Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Daily Calories</label>
            <Input 
              type="number" 
              name="dailyCalories"
              value={formData.dailyCalories}
              onChange={handleInputChange}
              placeholder="e.g., 2000" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Protein (g)</label>
            <Input 
              type="number" 
              name="protein"
              value={formData.protein}
              onChange={handleInputChange}
              placeholder="e.g., 150" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Carbs (g)</label>
            <Input 
              type="number" 
              name="carbs"
              value={formData.carbs}
              onChange={handleInputChange}
              placeholder="e.g., 200" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Fat (g)</label>
            <Input 
              type="number" 
              name="fat"
              value={formData.fat}
              onChange={handleInputChange}
              placeholder="e.g., 70" 
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Preset Diets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {presetDiets.map((diet, index) => (
              <motion.div
                key={diet.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePresetClick(diet)}
                className="p-3 rounded-xl bg-primary/5 backdrop-blur-sm cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <h4 className="font-medium">{diet.name}</h4>
                <p className="text-sm text-muted-foreground">{diet.calories} kcal</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  );
};