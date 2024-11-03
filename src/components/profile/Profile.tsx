import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Mail, Phone, MapPin } from 'lucide-react'

export const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="w-5 h-5 text-gray-500" />
              <Input defaultValue="John Doe" placeholder="Full Name" />
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-gray-500" />
              <Input defaultValue="john@example.com" placeholder="Email" type="email" />
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-5 h-5 text-gray-500" />
              <Input defaultValue="+1 234 567 890" placeholder="Phone" type="tel" />
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-5 h-5 text-gray-500" />
              <Input defaultValue="New York, USA" placeholder="Location" />
            </div>
            <Button className="mt-4">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}