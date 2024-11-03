import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface NutrientChartsProps {
  timeframe: 'daily' | 'weekly' | 'monthly';
}

const chartConfig = {
  gridColor: "hsl(var(--muted-foreground)/0.2)",
  axisColor: "hsl(var(--muted-foreground)/0.5)",
  tooltipCursor: "hsl(var(--muted-foreground)/0.1)",
  animationDuration: 1000,
  fontSize: 12,
  fontColor: "hsl(var(--muted-foreground))",
};

export const NutrientCharts: React.FC<NutrientChartsProps> = ({ timeframe }) => {
  const data = [
    { name: 'Mon', calories: 2100, protein: 95, carbs: 240, fat: 70 },
    { name: 'Tue', calories: 1950, protein: 88, carbs: 220, fat: 65 },
    { name: 'Wed', calories: 2200, protein: 92, carbs: 250, fat: 75 },
    { name: 'Thu', calories: 1850, protein: 85, carbs: 210, fat: 62 },
    { name: 'Fri', calories: 2050, protein: 90, carbs: 235, fat: 68 },
    { name: 'Sat', calories: 2300, protein: 98, carbs: 260, fat: 78 },
    { name: 'Sun', calories: 1900, protein: 87, carbs: 215, fat: 64 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg shadow-lg border bg-card p-3 !border-border/50 backdrop-blur-sm">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'calories' ? ' kcal' : 'g'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrient Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
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
                  dataKey="name"
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
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="hsl(var(--primary))"
                  fill="url(#colorCalories)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={chartConfig.gridColor}
                  vertical={false}
                />
                <XAxis 
                  dataKey="name"
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
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="protein" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="carbs" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fat" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};