import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronDown } from 'lucide-react';
import { TargetManager } from './nutrients/TargetManager';
import { QuickAdd } from './nutrients/QuickAdd';
import { MealBreakdown } from './nutrients/MealBreakdown';
import { RecommendationsPanel } from './nutrients/RecommendationsPanel';
import { TimeframeSelector } from './nutrients/TimeframeSelector';
import { useNutritionStore } from '@/lib/store/nutrition-store';

export const NutrientsAndTargets = () => {
  const { timeframe, setTimeframe } = useNutritionStore();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Nutrients & Targets</h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
            <Calendar className="h-4 w-4" />
            <span>Today's Overview</span>
          </div>
        </div>
        <TimeframeSelector timeframe={timeframe} onChange={setTimeframe} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TargetManager />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <QuickAdd />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MealBreakdown />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RecommendationsPanel />
        </motion.div>
      </div>
    </div>
  );
};