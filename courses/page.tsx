"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Search, Clock, Users, Calendar, BookOpen, Star, MapPin, User } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  code: string
  title: string
  description: string
  instructor: string
  credits: number
  department: string
  level: "undergraduate" | "graduate"
  semester: string
  schedule: {
    days: string[]
    time: string
    location: string
  }
  capacity: number
  enrolled: number
  prerequisites: string[]
  rating: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  format: "in-person" | "online" | "hybrid"
}

const mockCourses: Course[] = [
  {
    id: "1",
    code: "CS 101",
    title: "Introduction to Computer Science",
    description:
      "Fundamental concepts of computer science including programming basics, algorithms, and data structures. Perfect for beginners with no prior programming experience.",
    instructor: "Dr. Sarah Johnson",
    credits: 3,
    department: "Computer Science",
    level: "undergraduate",
    semester: "Fall 2025",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "10:00 AM - 11:00 AM",
      location: "Science Building, Room 101",
    },
    capacity: 30,
    enrolled: 25,
    prerequisites: [],
    rating: 4.8,
    difficulty: "Beginner",
    format: "in-person",
  },
  {
    id: "2",
    code: "BUS 201",
    title: "Business Management Fundamentals",
    description:
      "Core principles of business management, leadership, and organizational behavior. Covers strategic planning, team management, and business ethics.",
    instructor: "Prof. Michael Chen",
    credits: 4,
    department: "Business Administration",
    level: "undergraduate",
    semester: "Fall 2025",
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "2:00 PM - 3:30 PM",
      location: "Business Center, Room 205",
    },
    capacity: 40,
    enrolled: 32,
    prerequisites: ["BUS 101"],
    rating: 4.6,
    difficulty: "Intermediate",
    format: "hybrid",
  },
  {
    id: "3",
    code: "ENG 301",
    title: "Advanced Engineering Mathematics",
    description:
      "Advanced mathematical concepts for engineering applications including differential equations, linear algebra, and complex analysis.",
    instructor: "Dr. Emily Rodriguez",
    credits: 4,
    department: "Engineering",
    level: "undergraduate",
    semester: "Fall 2025",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "1:00 PM - 2:00 PM",
      location: "Engineering Hall, Room 301",
    },
    capacity: 25,
    enrolled: 20,
    prerequisites: ["MATH 201", "MATH 202"],
    rating: 4.4,
    difficulty: "Advanced",
    format: "in-person",
  },
  {
    id: "4",
    code: "PSY 150",
    title: "Introduction to Psychology",
    description:
      "Overview of psychological principles, research methods, and major areas of psychology including cognitive, social, and developmental psychology.",
    instructor: "Dr. James Wilson",
    credits: 3,
    department: "Psychology",
    level: "undergraduate",
    semester: "Fall 2025",
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "11:00 AM - 12:30 PM",
      location: "Online",
    },
    capacity: 50,
    enrolled: 45,
    prerequisites: [],
    rating: 4.7,
    difficulty: "Beginner",
    format: "online",
  },
  {
    id: "5",
    code: "NUR 401",
    title: "Advanced Clinical Practice",
    description:
      "Advanced nursing practice in clinical settings with focus on patient care, medical procedures, and healthcare management.",
    instructor: "Prof. Lisa Anderson",
    credits: 5,
    department: "Nursing",
    level: "undergraduate",
    semester: "Fall 2025",
    schedule: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      time: "8:00 AM - 12:00 PM",
      location: "Medical Center, Various Locations",
    },
    capacity: 15,
    enrolled: 12,
    prerequisites: ["NUR 301", "NUR 302"],
    rating: 4.9,
    difficulty: "Advanced",
    format: "in-person",
  },
  {
    id: "6",
    code: "ART 200",
    title: "Digital Design Fundamentals",
    description:
      "Introduction to digital design principles, software tools, and creative processes. Covers graphic design, web design, and multimedia creation.",
    instructor: "Prof. Maria Garcia",
    credits: 3,
    department: "Arts",
    level: "undergraduate",
    semester: "Fall 2025",
    schedule: {
      days: ["Monday", "Wednesday"],
      time: "3:00 PM - 5:00 PM",
      location: "Art Studio, Room 120",
    },
    capacity: 20,
    enrolled: 18,
    prerequisites: ["ART 101"],
    rating: 4.5,
    difficulty: "Intermediate",
    format: "hybrid",
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [formatFilter, setFormatFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || course.department === departmentFilter
    const matchesLevel = levelFilter === "all" || course.level === levelFilter
    const matchesFormat = formatFilter === "all" || course.format === formatFilter
    const matchesDifficulty = difficultyFilter === "all" || course.difficulty === difficultyFilter

    return matchesSearch && matchesDepartment && matchesLevel && matchesFormat && matchesDifficulty
  })

  const departments = Array.from(new Set(courses.map((c) => c.department)))

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "online":
        return "🌐"
      case "hybrid":
        return "🔄"
      default:
        return "🏫"
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
              <Link href="/courses/my-courses">
                <Button variant="outline">My Courses</Button>
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
        {/* Hero Section */}
        <section className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 font-[family-name:var(--font-montserrat)]">Course Catalog</h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Explore our comprehensive course offerings and enroll in classes that match your academic goals and
            interests.
          </p>
        </section>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            <TabsTrigger value="departments">By Department</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search courses by title, code, instructor, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={levelFilter} onValueChange={setLevelFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={formatFilter} onValueChange={setFormatFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Formats</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
              <Badge variant="secondary">Fall 2025 Semester</Badge>
            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {course.code}
                        </Badge>
                        <CardTitle className="text-lg font-[family-name:var(--font-montserrat)] leading-tight">
                          {course.title}
                        </CardTitle>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        <Badge className={getDifficultyColor(course.difficulty)} variant="secondary">
                          {course.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{course.instructor}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {course.credits} Credits • {course.department}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{course.schedule.days.join(", ")}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.schedule.time}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="flex items-center space-x-1">
                          <span>{getFormatIcon(course.format)}</span>
                          <span>{course.schedule.location}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {course.enrolled}/{course.capacity} enrolled
                        </span>
                        {course.enrolled >= course.capacity && (
                          <Badge variant="destructive" className="text-xs">
                            Full
                          </Badge>
                        )}
                      </div>
                    </div>

                    {course.prerequisites.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Prerequisites:</p>
                        <div className="flex flex-wrap gap-1">
                          {course.prerequisites.map((prereq) => (
                            <Badge key={prereq} variant="outline" className="text-xs">
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2 pt-2">
                      <Link href={`/courses/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </Link>
                      <Button className="flex-1" disabled={course.enrolled >= course.capacity}>
                        {course.enrolled >= course.capacity ? "Full" : "Enroll"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((department) => {
                const deptCourses = courses.filter((c) => c.department === department)
                return (
                  <Card key={department} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="font-[family-name:var(--font-montserrat)]">{department}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Available Courses:</span>
                          <Badge variant="secondary">{deptCourses.length}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Total Credits:</span>
                          <span>{deptCourses.reduce((sum, c) => sum + c.credits, 0)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Avg. Rating:</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>
                              {(deptCourses.reduce((sum, c) => sum + c.rating, 0) / deptCourses.length).toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4 bg-transparent"
                          variant="outline"
                          onClick={() => setDepartmentFilter(department)}
                        >
                          Browse {department} Courses
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
