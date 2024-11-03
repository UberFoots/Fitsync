import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { MapPin, Calendar, Coffee, Salad, Fish } from 'lucide-react';
import NutrientsTargets from './NutrientsTargets';
import { DailyOverview } from './DailyOverview';
import { FoodSearch } from './FoodSearch';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNutritional } from './NutritionalContext';
import { getCurrentLocation } from '@/lib/api/location-service';

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const meals = [
  { icon: Coffee, title: 'Breakfast', time: '8:00 AM', calories: 450 },
  { icon: Salad, title: 'Lunch', time: '12:30 PM', calories: 650 },
  { icon: Fish, title: 'Dinner', time: '7:00 PM', calories: 550 }
];

const schedule = [
  { time: '6:00 AM', activity: 'Morning Run', duration: '30 mins' },
  { time: '9:00 AM', activity: 'Team Meeting', duration: '1 hour' },
  { time: '2:00 PM', activity: 'Gym Session', duration: '45 mins' },
  { time: '5:00 PM', activity: 'Yoga Class', duration: '1 hour' }
];

export const Dashboard = () => {
  const [currentDate] = useState(new Date());
  const [userLocation, setUserLocation] = useState({ city: '', state: '' });
  const { dailyNutrition } = useNutritional();
  const { scrollY } = useScroll();

  const headerY = useTransform(scrollY, [0, 200], [0, -20]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getCurrentLocation();
        setUserLocation({
          city: location.city || location.locality,
          state: location.principalSubdivision
        });
      } catch (error) {
        console.error('Error getting location:', error);
        setUserLocation({ city: 'New York', state: 'NY' });
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div 
        style={{ y: headerY, opacity: headerOpacity }}
        className="text-center mb-8"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
        >
          Welcome back, John!
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center space-x-2 text-sm text-muted-foreground"
        >
          <Calendar className="h-4 w-4" />
          <span>{formatDate(currentDate)}</span>
          <MapPin className="h-4 w-4 ml-2" />
          <span>{userLocation.city}, {userLocation.state}</span>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <FoodSearch />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <NutrientsTargets nutrition={dailyNutrition} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DailyOverview nutrition={dailyNutrition} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Today's Meals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meals.map((meal, index) => {
                  const Icon = meal.icon;
                  return (
                    <motion.div
                      key={meal.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 rounded-xl bg-primary/5 backdrop-blur-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-xl">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{meal.title}</h3>
                          <p className="text-sm text-muted-foreground">{meal.time}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{meal.calories} kcal</span>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <motion.div
                    key={item.time}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 rounded-xl bg-primary/5 backdrop-blur-sm"
                  >
                    <div>
                      <h3 className="font-medium">{item.activity}</h3>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{item.duration}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};