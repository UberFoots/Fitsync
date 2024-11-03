import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const RecommendationsPanel = () => {
  const recommendations = [
    {
      icon: AlertCircle,
      title: 'Low Protein Intake',
      description: 'Consider adding more lean meats or plant-based proteins to reach your daily goal.',
      color: 'text-yellow-500'
    },
    {
      icon: Lightbulb,
      title: 'Optimal Meal Timing',
      description: 'Try spacing your meals 3-4 hours apart for better nutrient absorption.',
      color: 'text-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Progress Update',
      description: "You're consistently meeting your fiber goals. Keep it up!",
      color: 'text-green-500'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-xl bg-primary/5 backdrop-blur-sm"
            >
              <div className={`p-2 rounded-lg bg-card ${rec.color}`}>
                <rec.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{rec.title}</h3>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};