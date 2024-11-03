import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, BarChart3, TrendingUp } from 'lucide-react';

interface TimeframeSelectorProps {
  timeframe: 'daily' | 'weekly' | 'monthly';
  onChange: (timeframe: 'daily' | 'weekly' | 'monthly') => void;
}

export const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ 
  timeframe, 
  onChange 
}) => {
  return (
    <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-xl p-1">
      <Button
        size="sm"
        variant={timeframe === 'daily' ? 'default' : 'ghost'}
        onClick={() => onChange('daily')}
        className="rounded-lg"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Daily
      </Button>
      <Button
        size="sm"
        variant={timeframe === 'weekly' ? 'default' : 'ghost'}
        onClick={() => onChange('weekly')}
        className="rounded-lg"
      >
        <BarChart3 className="h-4 w-4 mr-2" />
        Weekly
      </Button>
      <Button
        size="sm"
        variant={timeframe === 'monthly' ? 'default' : 'ghost'}
        onClick={() => onChange('monthly')}
        className="rounded-lg"
      >
        <TrendingUp className="h-4 w-4 mr-2" />
        Monthly
      </Button>
    </div>
  );
};