import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Activity, Heart, Flame, Apple } from 'lucide-react'

export const Tracking = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Activity Tracking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">8,432</span>
            </div>
            <Progress value={84} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">Goal: 10,000 steps</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Heart Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">72 BPM</span>
            </div>
            <Progress value={72} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">Resting heart rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Flame className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">1,842</span>
            </div>
            <Progress value={84} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">Goal: 2,200 calories</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}