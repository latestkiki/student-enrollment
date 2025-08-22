"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  User,
  MapPin,
  TrendingUp,
  Award,
  FileText,
  Video,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

interface EnrolledCourse {
  id: string
  code: string
  title: string
  instructor: string
  credits: number
  semester: string
  schedule: {
    days: string[]
    time: string
    location: string
  }
  progress: number
  grade: string
  assignments: {
    completed: number
    total: number
  }
  nextClass: string
  format: "in-person" | "online" | "hybrid"
}

const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: "1",
    code: "CS 101",
    title: "Introduction to Computer Science",
    instructor: "Dr. Sarah Johnson",
    credits: 3,
    semester: "Fall 2025",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "10:00 AM - 11:00 AM",
      location: "Science Building, Room 101",
    },
    progress: 75,
    grade: "A-",
    assignments: {
      completed: 8,
      total: 10,
    },
    nextClass: "2025-01-24T10:00:00",
    format: "in-person",
  },
  {
    id: "2",
    code: "BUS 201",
    title: "Business Management Fundamentals",
    instructor: "Prof. Michael Chen",
    credits: 4,
    semester: "Fall 2025",
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "2:00 PM - 3:30 PM",
      location: "Business Center, Room 205",
    },
    progress: 60,
    grade: "B+",
    assignments: {
      completed: 6,
      total: 12,
    },
    nextClass: "2025-01-23T14:00:00",
    format: "hybrid",
  },
  {
    id: "4",
    code: "PSY 150",
    title: "Introduction to Psychology",
    instructor: "Dr. James Wilson",
    credits: 3,
    semester: "Fall 2025",
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "11:00 AM - 12:30 PM",
      location: "Online",
    },
    progress: 85,
    grade: "A",
    assignments: {
      completed: 9,
      total: 10,
    },
    nextClass: "2025-01-23T11:00:00",
    format: "online",
  },
]

export default function MyCoursesPage() {
  const [enrolledCourses] = useState<EnrolledCourse[]>(mockEnrolledCourses)

  const totalCredits = enrolledCourses.reduce((sum, course) => sum + course.credits, 0)
  const averageProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length
  const completedAssignments = enrolledCourses.reduce((sum, course) => sum + course.assignments.completed, 0)
  const totalAssignments = enrolledCourses.reduce((sum, course) => sum + course.assignments.total, 0)

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800"
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800"
    if (grade.startsWith("D")) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "online":
        return <Video className="h-4 w-4" />
      case "hybrid":
        return (
          <div className="flex items-center">
            <Video className="h-3 w-3" />
            <MapPin className="h-3 w-3" />
          </div>
        )
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getNextClassTime = (nextClass: string) => {
    const date = new Date(nextClass)
    const now = new Date()
    const diffHours = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60))

    if (diffHours < 24) {
      return `in ${diffHours} hours`
    } else {
      return `on ${date.toLocaleDateString()}`
    }
  }

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
              <Link href="/courses">
                <Button variant="outline">Browse Courses</Button>
              </Link>
              <Link href="/courses/schedule">
                <Button variant="outline">Schedule</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">My Courses</h2>
            <p className="text-muted-foreground">Track your academic progress and manage your enrolled courses</p>
          </div>

          {/* Academic Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Enrolled Courses</span>
                </div>
                <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Total Credits</span>
                </div>
                <div className="text-2xl font-bold">{totalCredits}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Avg Progress</span>
                </div>
                <div className="text-2xl font-bold">{Math.round(averageProgress)}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Assignments</span>
                </div>
                <div className="text-2xl font-bold">
                  {completedAssignments}/{totalAssignments}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="current" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Current Courses</TabsTrigger>
              <TabsTrigger value="schedule">This Week</TabsTrigger>
              <TabsTrigger value="grades">Grades & Progress</TabsTrigger>
            </TabsList>

            {/* Current Courses */}
            <TabsContent value="current" className="space-y-6">
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="outline">{course.code}</Badge>
                            <Badge className={getGradeColor(course.grade)}>{course.grade}</Badge>
                            <div className="flex items-center space-x-1">
                              {getFormatIcon(course.format)}
                              <span className="text-sm text-muted-foreground capitalize">{course.format}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-semibold mb-1 font-[family-name:var(--font-montserrat)]">
                            {course.title}
                          </h3>

                          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>{course.instructor}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4" />
                                <span>
                                  {course.credits} Credits • {course.semester}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{course.schedule.days.join(", ")}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{course.schedule.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-muted-foreground mb-1">
                            Next class {getNextClassTime(course.nextClass)}
                          </div>
                          <div className="text-sm font-medium">{course.schedule.location}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Course Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Assignments Completed</span>
                            <span>
                              {course.assignments.completed}/{course.assignments.total}
                            </span>
                          </div>
                          <Progress value={(course.assignments.completed / course.assignments.total) * 100} />
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4 pt-4 border-t">
                        <Link href={`/courses/${course.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <BookOpen className="h-4 w-4 mr-1" />
                            Course Details
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <FileText className="h-4 w-4 mr-1" />
                          Assignments
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Discussions
                        </Button>
                        {course.format === "online" && (
                          <Button size="sm">
                            <Video className="h-4 w-4 mr-1" />
                            Join Class
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Weekly Schedule */}
            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>This Week's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
                      const dayClasses = enrolledCourses.filter((course) => course.schedule.days.includes(day))

                      return (
                        <div key={day} className="border-l-4 border-primary pl-4">
                          <h4 className="font-semibold mb-2">{day}</h4>
                          {dayClasses.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No classes scheduled</p>
                          ) : (
                            <div className="space-y-2">
                              {dayClasses.map((course) => (
                                <div
                                  key={course.id}
                                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                >
                                  <div>
                                    <p className="font-medium">
                                      {course.code} - {course.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {course.schedule.time} • {course.schedule.location}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-1">{getFormatIcon(course.format)}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Grades & Progress */}
            <TabsContent value="grades" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Grades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {enrolledCourses.map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{course.code}</p>
                            <p className="text-sm text-muted-foreground">{course.title}</p>
                          </div>
                          <Badge className={getGradeColor(course.grade)}>{course.grade}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Academic Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {enrolledCourses.map((course) => (
                        <div key={course.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{course.code}</span>
                            <span className="text-sm">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Semester Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{totalCredits}</div>
                      <p className="text-sm text-muted-foreground">Credits Enrolled</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{Math.round(averageProgress)}%</div>
                      <p className="text-sm text-muted-foreground">Average Progress</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {((completedAssignments / totalAssignments) * 100).toFixed(0)}%
                      </div>
                      <p className="text-sm text-muted-foreground">Assignments Complete</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
