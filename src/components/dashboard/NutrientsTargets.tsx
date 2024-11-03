import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CircularProgress } from './CircularProgress';
import { PhotoGallery } from './PhotoGallery';
import { Link } from 'react-router-dom';

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  sodium: number;
}

interface NutrientsTargetsProps {
  nutrition: NutritionData;
}

const DAILY_TARGETS = {
  calories: 2000,
  protein: 50,
  carbs: 275,
  fat: 78,
  sugar: 50,
  sodium: 2.3,
};

const NutrientsTargets: React.FC<NutrientsTargetsProps> = ({ nutrition }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const calculatePercentage = (current: number, target: number) => 
    (current / target) * 100;

  const nutrients = [
    { 
      label: 'Calories', 
      value: calculatePercentage(nutrition.calories, DAILY_TARGETS.calories), 
      color: '#EF4444' 
    },
    { 
      label: 'Protein', 
      value: calculatePercentage(nutrition.protein, DAILY_TARGETS.protein), 
      color: '#10B981' 
    },
    { 
      label: 'Carbs', 
      value: calculatePercentage(nutrition.carbs, DAILY_TARGETS.carbs), 
      color: '#3B82F6' 
    },
    { 
      label: 'Fat', 
      value: calculatePercentage(nutrition.fat, DAILY_TARGETS.fat), 
      color: '#F59E0B' 
    },
    { 
      label: 'Sugar', 
      value: calculatePercentage(nutrition.sugar, DAILY_TARGETS.sugar), 
      color: '#8B5CF6' 
    },
    { 
      label: 'Sodium', 
      value: calculatePercentage(nutrition.sodium, DAILY_TARGETS.sodium), 
      color: '#F97316' 
    }
  ];

  return (
    <>
      <Card className="overflow-hidden group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Link to="/nutrients" className="flex-1">
            <CardTitle className="text-xl font-bold hover:opacity-80 transition-opacity flex items-center">
              Nutrients & Targets
              <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
            </CardTitle>
          </Link>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center"
          >
            {isExpanded ? 'Less' : 'More'}
            {isExpanded ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {nutrients.slice(0, isExpanded ? undefined : 3).map((nutrient, index) => (
              <motion.div
                key={nutrient.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-center"
              >
                <CircularProgress {...nutrient} />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
      <PhotoGallery />
    </>
  );
};

export default NutrientsTargets;