'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Activity, Users, BarChart3, Bell } from "lucide-react"
import messages from "@/messages.json"

const Home = () => {

  // Sample admin stats data
  const adminStats = [
    { title: "Active Users", value: "3,842", icon: <Users className="h-6 w-6" /> },
    { title: "Daily Workouts", value: "1,253", icon: <Activity className="h-6 w-6" /> },
    { title: "Engagement Rate", value: "78%", icon: <BarChart3 className="h-6 w-6" /> },
    { title: "New Signups", value: "127", icon: <Users className="h-6 w-6" /> }
  ]

  // Recent notifications
  const notifications = [
    { title: "System Update", content: "New feature deployment scheduled for tomorrow" },
    { title: "User Milestone", content: "1000+ users completed the 30-day challenge" },
    { title: "Support Queue", content: "5 new support tickets require attention" }
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Section */}
      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Feedback Carousel */}
          <Card className="lg:col-span-2 border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <span>Recent User Feedback</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">LIVE</span>
              </CardTitle>
              <CardDescription>
                Latest feedback from FitMate users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                
              >
                <CarouselContent>
                  {messages.slice(0, 5).map((message, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="border border-gray-100 shadow-sm">
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{message.title}</h3>
                          <p className="text-sm text-gray-600">{message.content}</p>
                          <div className="mt-3 flex items-center">
                            <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                              <Users className="h-4 w-4" />
                            </div>
                            <span className="text-xs ml-2 text-gray-500">User #{index + 1001}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </CardContent>
          </Card>

          {/* Notifications Panel */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>
                System updates and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h4 className="font-medium mb-1">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">Today</span>
                      <button className="text-xs text-blue-600">Mark as read</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12 p-6">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2025 FitMate Admin Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home