import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  sodium: number;
}

interface DailyOverviewProps {
  nutrition: NutritionData;
}

const generateTimeData = (totalCalories: number) => {
  const hours = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
  let accumulatedCalories = 0;
  
  return hours.map(time => {
    accumulatedCalories += (totalCalories / 6) * (0.8 + Math.random() * 0.4);
    return {
      time,
      calories: Math.round(accumulatedCalories),
    };
  });
};

const weightData = [
  { date: 'Mon', weight: 75.5 },
  { date: 'Tue', weight: 75.2 },
  { date: 'Wed', weight: 75.0 },
  { date: 'Thu', weight: 74.8 },
  { date: 'Fri', weight: 74.6 },
  { date: 'Sat', weight: 74.5 },
  { date: 'Sun', weight: 74.3 },
];

const sleepData = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 6.8 },
  { day: 'Wed', hours: 7.2 },
  { day: 'Thu', hours: 8.0 },
  { day: 'Fri', hours: 7.0 },
  { day: 'Sat', hours: 8.5 },
  { day: 'Sun', hours: 7.8 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg shadow-lg border bg-card p-3 !border-border/50 backdrop-blur-sm">
        <p className="text-sm font-medium mb-1">{label}</p>
        <p className="text-sm font-semibold text-primary">
          {payload[0].value} {payload[0].name === 'hours' ? 'hrs' : 
            payload[0].name === 'weight' ? 'kg' : 'kcal'}
        </p>
      </div>
    );
  }
  return null;
};

const chartConfig = {
  gridColor: "hsl(var(--muted-foreground)/0.2)",
  axisColor: "hsl(var(--muted-foreground)/0.5)",
  tooltipCursor: "hsl(var(--muted-foreground)/0.1)",
  animationDuration: 1000,
  fontSize: 12,
  fontColor: "hsl(var(--muted-foreground))",
};

export const DailyOverview: React.FC<DailyOverviewProps> = ({ nutrition }) => {
  const calorieData = React.useMemo(() => generateTimeData(nutrition.calories), [nutrition.calories]);
  const expenditureData = React.useMemo(() => generateTimeData(nutrition.calories * 0.8), [nutrition.calories]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-[240px]"
          >
            <h3 className="text-sm font-medium mb-4 text-muted-foreground">Calorie Intake</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={calorieData}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={chartConfig.gridColor} 
                  vertical={false}
                />
                <XAxis 
                  dataKey="time" 
                  stroke={chartConfig.axisColor}
                  fontSize={chartConfig.fontSize}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: chartConfig.fontColor }}
                />
                <YAxis 
                  stroke={chartConfig.axisColor}
                  fontSize={chartConfig.fontSize}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  tick={{ fill: chartConfig.fontColor }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: chartConfig.tooltipCursor }}
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="hsl(var(--primary))"
                  fill="url(#colorCalories)"
                  strokeWidth={2}
                  animationDuration={chartConfig.animationDuration}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-[240px]"
          >
            <h3 className="text-sm font-medium mb-4 text-muted-foreground">Weight Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={chartConfig.gridColor}
                  vertical={false}
                />
                <XAxis 
                  dataKey="date" 
                  stroke={chartConfig.axisColor}
                  fontSize={chartConfig.fontSize}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: chartConfig.fontColor }}
                />
                <YAxis 
                  stroke={chartConfig.axisColor}
                  fontSize={chartConfig.fontSize}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                  tick={{ fill: chartConfig.fontColor }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ stroke: chartConfig.tooltipCursor }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#10B981' }}
                  animationDuration={chartConfig.animationDuration}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[240px]"
          >
            <h3 className="text-sm font-medium mb-4 text-muted-foreground">Energy Expenditure</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={expenditureData}>
                <defs>
                  <linearGradient id="colorExpenditure" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={chartConfig.gridColor}
                  vertical={false}
                />
                <XAxis 
                  dataKey="time" 
                  stroke={chartConfig.axisColor}
                  fontSize={chartConfig.fontSize}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: chartConfig.fontColor }}
                />
                <YAxis 
                  stroke={chartConfig.axisColor}
                  fontSize={chartConfig.fontSize}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: chartConfig.fontColor }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: chartConfig.tooltipCursor }}
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="#F59E0B"
                  fill="url(#colorExpenditure)"
                  strokeWidth={2}
                  animationDuration={chartConfig.animationDuration}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-[240px]"
          >
            <h3 className="text-sm font-medium mb-4 text-muted-foreground">Sleep Pattern</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData}>
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={chartConfig.gridColor}
                  vertical={false}
                />
                <XAxis 
                  dataKey="day" 
                  stroke={chartConfig.axisColor}
                  fontSize={chartConfig.fontSize}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: chartConfig.fontColor }}
                />
                <YAxis 
                  stroke={chartConfig.axisColor}
                  fontSize={chartConfig.fontSize}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 10]}
                  tick={{ fill: chartConfig.fontColor }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ stroke: chartConfig.tooltipCursor }}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#8B5CF6' }}
                  animationDuration={chartConfig.animationDuration}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};