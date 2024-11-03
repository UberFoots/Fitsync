'use client'

import React from 'react'
import { Card } from '../ui/card'
import { Progress } from '../ui/progress'
import { Activity, Heart, Flame, Apple } from 'lucide-react'
import NutrientsTargets from './NutrientsTargets'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome to FitSync</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Daily Steps"
            value="8,432"
            target="10,000"
            progress={84}
            icon={<Activity className="h-6 w-6 text-blue-500" />}
          />
          <MetricCard
            title="Heart Rate"
            value="72"
            unit="bpm"
            progress={72}
            icon={<Heart className="h-6 w-6 text-red-500" />}
          />
          <MetricCard
            title="Calories Burned"
            value="1,842"
            target="2,200"
            progress={84}
            icon={<Flame className="h-6 w-6 text-orange-500" />}
          />
          <MetricCard
            title="Nutrition"
            value="1,560"
            target="2,000"
            unit="cal"
            progress={78}
            icon={<Apple className="h-6 w-6 text-green-500" />}
          />
        </div>

        <div className="mb-8">
          <NutrientsTargets />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityFeed />
          <UpcomingWorkouts />
        </div>
      </div>
    </div>
  )
}

const MetricCard = ({ title, value, target, unit, progress, icon }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        {icon}
      </div>
      <div className="mb-2">
        <span className="text-2xl font-bold">{value}</span>
        {target && <span className="text-gray-500 text-sm ml-1">/ {target}</span>}
        {unit && <span className="text-gray-500 text-sm ml-1">{unit}</span>}
      </div>
      {progress && (
        <Progress value={progress} className="h-2" />
      )}
    </Card>
  )
}

const ActivityFeed = () => {
  const activities = [
    { time: '9:00 AM', activity: 'Morning Run', duration: '30 mins' },
    { time: '11:30 AM', activity: 'Strength Training', duration: '45 mins' },
    { time: '2:00 PM', activity: 'Yoga Session', duration: '60 mins' },
  ]

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-700 mb-4">Today's Activities</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{activity.activity}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
            <span className="text-sm text-gray-500">{activity.duration}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

const UpcomingWorkouts = () => {
  const workouts = [
    { day: 'Tomorrow', workout: 'HIIT Training', time: '8:00 AM' },
    { day: 'Wednesday', workout: 'Swimming', time: '7:30 AM' },
    { day: 'Thursday', workout: 'Cycling', time: '6:30 AM' },
  ]

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-700 mb-4">Upcoming Workouts</h3>
      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{workout.workout}</p>
              <p className="text-sm text-gray-500">{workout.day}</p>
            </div>
            <span className="text-sm text-gray-500">{workout.time}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default Dashboard