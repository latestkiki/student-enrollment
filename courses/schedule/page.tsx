"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Calendar, Clock, MapPin, Video, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"

interface ScheduleEvent {
  id: string
  title: string
  code: string
  type: "class" | "assignment" | "exam" | "office-hours"
  startTime: string
  endTime: string
  location: string
  instructor?: string
  format: "in-person" | "online" | "hybrid"
  color: string
}

const mockScheduleEvents: ScheduleEvent[] = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    code: "CS 101",
    type: "class",
    startTime: "2025-01-20T10:00:00",
    endTime: "2025-01-20T11:00:00",
    location: "Science Building, Room 101",
    instructor: "Dr. Sarah Johnson",
    format: "in-person",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Business Management Fundamentals",
    code: "BUS 201",
    type: "class",
    startTime: "2025-01-21T14:00:00",
    endTime: "2025-01-21T15:30:00",
    location: "Business Center, Room 205",
    instructor: "Prof. Michael Chen",
    format: "hybrid",
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Introduction to Psychology",
    code: "PSY 150",
    type: "class",
    startTime: "2025-01-21T11:00:00",
    endTime: "2025-01-21T12:30:00",
    location: "Online",
    instructor: "Dr. James Wilson",
    format: "online",
    color: "bg-purple-500",
  },
  {
    id: "4",
    title: "Programming Assignment 3",
    code: "CS 101",
    type: "assignment",
    startTime: "2025-01-22T23:59:00",
    endTime: "2025-01-22T23:59:00",
    location: "Online Submission",
    format: "online",
    color: "bg-orange-500",
  },
  {
    id: "5",
    title: "Midterm Exam",
    code: "BUS 201",
    type: "exam",
    startTime: "2025-01-23T14:00:00",
    endTime: "2025-01-23T16:00:00",
    location: "Business Center, Room 205",
    format: "in-person",
    color: "bg-red-500",
  },
]

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "month">("week")
  const [events] = useState<ScheduleEvent[]>(mockScheduleEvents)

  const getWeekDates = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startTime)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentDate(newDate)
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "class":
        return <Calendar className="h-3 w-3" />
      case "assignment":
        return <Plus className="h-3 w-3" />
      case "exam":
        return <Clock className="h-3 w-3" />
      default:
        return <Calendar className="h-3 w-3" />
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "online":
        return <Video className="h-3 w-3" />
      case "hybrid":
        return (
          <div className="flex">
            <Video className="h-2 w-2" />
            <MapPin className="h-2 w-2" />
          </div>
        )
      default:
        return <MapPin className="h-3 w-3" />
    }
  }

  const weekDates = getWeekDates(currentDate)
  const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8) // 8 AM to 9 PM

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-montserrat)]">
                EduConnect
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/courses/my-courses">
                <Button variant="outline">My Courses</Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline">Browse Courses</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">Class Schedule</h2>
              <p className="text-muted-foreground">View your weekly class schedule and upcoming deadlines</p>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={viewMode} onValueChange={(value: "week" | "month") => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week View</SelectItem>
                  <SelectItem value="month">Month View</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center justify-center mb-6">
            <h3 className="text-xl font-semibold">
              {weekDates[0].toLocaleDateString("en-US", { month: "long", day: "numeric" })} -{" "}
              {weekDates[6].toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </h3>
          </div>

          {viewMode === "week" ? (
            /* Weekly Calendar View */
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-8 border-b">
                  <div className="p-4 border-r bg-muted/50">
                    <span className="text-sm font-medium">Time</span>
                  </div>
                  {weekDates.map((date, index) => (
                    <div key={index} className="p-4 border-r text-center">
                      <div className="text-sm font-medium">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                      <div
                        className={`text-lg ${date.toDateString() === new Date().toDateString() ? "text-primary font-bold" : ""}`}
                      >
                        {date.getDate()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {timeSlots.map((hour) => (
                    <div key={hour} className="grid grid-cols-8 border-b min-h-16">
                      <div className="p-2 border-r bg-muted/50 text-center">
                        <span className="text-sm text-muted-foreground">
                          {hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                        </span>
                      </div>
                      {weekDates.map((date, dayIndex) => {
                        const dayEvents = getEventsForDate(date).filter((event) => {
                          const eventHour = new Date(event.startTime).getHours()
                          return eventHour === hour
                        })

                        return (
                          <div key={dayIndex} className="p-1 border-r relative">
                            {dayEvents.map((event) => (
                              <div
                                key={event.id}
                                className={`${event.color} text-white text-xs p-1 rounded mb-1 cursor-pointer hover:opacity-80`}
                              >
                                <div className="flex items-center space-x-1">
                                  {getEventTypeIcon(event.type)}
                                  <span className="truncate">{event.code}</span>
                                </div>
                                <div className="truncate">{event.title}</div>
                                <div className="flex items-center space-x-1">
                                  {getFormatIcon(event.format)}
                                  <span className="truncate text-xs opacity-90">
                                    {new Date(event.startTime).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Monthly List View */
            <div className="space-y-4">
              {weekDates.map((date) => {
                const dayEvents = getEventsForDate(date)
                return (
                  <Card key={date.toISOString()}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span className={date.toDateString() === new Date().toDateString() ? "text-primary" : ""}>
                          {date.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <Badge variant="secondary">{dayEvents.length} events</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {dayEvents.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No events scheduled</p>
                      ) : (
                        <div className="space-y-3">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-muted/50"
                            >
                              <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium">
                                    {event.code} - {event.title}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {event.type}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                      {new Date(event.startTime).toLocaleTimeString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}
                                      {event.endTime !== event.startTime &&
                                        ` - ${new Date(event.endTime).toLocaleTimeString("en-US", {
                                          hour: "numeric",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}`}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {getFormatIcon(event.format)}
                                    <span>{event.location}</span>
                                  </div>
                                  {event.instructor && <span>{event.instructor}</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Legend */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Classes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Assignments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Exams</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Office Hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
