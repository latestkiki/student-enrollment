"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GraduationCap, Search, Filter, Clock, Users, MapPin, Star, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { InfoButton } from "@/components/ui/info-button"

// Mock course data
const courses = [
  {
    id: 1,
    code: "CS101",
    title: "Introduction to Computer Science",
    instructor: "Dr. Sarah Johnson",
    credits: 3,
    schedule: "MWF 9:00-10:00 AM",
    location: "Tech Building 101",
    capacity: 30,
    enrolled: 25,
    rating: 4.8,
    description:
      "An introduction to computer science fundamentals including programming concepts, algorithms, and problem-solving techniques.",
    prerequisites: "None",
    department: "Computer Science",
    semester: "Spring 2024",
    status: "available",
  },
  {
    id: 2,
    code: "MATH201",
    title: "Calculus II",
    instructor: "Prof. Michael Smith",
    credits: 4,
    schedule: "TTh 2:00-3:30 PM",
    location: "Math Building 205",
    capacity: 25,
    enrolled: 23,
    rating: 4.5,
    description:
      "Continuation of Calculus I covering integration techniques, applications of integrals, and infinite series.",
    prerequisites: "MATH101 - Calculus I",
    department: "Mathematics",
    semester: "Spring 2024",
    status: "available",
  },
  {
    id: 3,
    code: "ENG102",
    title: "English Literature",
    instructor: "Dr. Emily Davis",
    credits: 3,
    schedule: "MWF 11:00-12:00 PM",
    location: "Liberal Arts 150",
    capacity: 20,
    enrolled: 18,
    rating: 4.7,
    description:
      "Survey of English literature from medieval times to the present, focusing on major works and literary movements.",
    prerequisites: "ENG101 - English Composition",
    department: "English",
    semester: "Spring 2024",
    status: "available",
  },
  {
    id: 4,
    code: "PHYS201",
    title: "Physics I",
    instructor: "Dr. Robert Wilson",
    credits: 4,
    schedule: "MWF 1:00-2:00 PM, Lab: T 3:00-5:00 PM",
    location: "Science Building 301",
    capacity: 24,
    enrolled: 24,
    rating: 4.3,
    description: "Introduction to mechanics, thermodynamics, and wave motion with laboratory component.",
    prerequisites: "MATH101 - Calculus I",
    department: "Physics",
    semester: "Spring 2024",
    status: "waitlist",
  },
  {
    id: 5,
    code: "BUS101",
    title: "Introduction to Business",
    instructor: "Prof. Lisa Anderson",
    credits: 3,
    schedule: "TTh 10:00-11:30 AM",
    location: "Business Building 120",
    capacity: 35,
    enrolled: 32,
    rating: 4.6,
    description: "Overview of business principles including management, marketing, finance, and entrepreneurship.",
    prerequisites: "None",
    department: "Business",
    semester: "Spring 2024",
    status: "available",
  },
  {
    id: 6,
    code: "HIST101",
    title: "World History",
    instructor: "Dr. James Brown",
    credits: 3,
    schedule: "MWF 10:00-11:00 AM",
    location: "Humanities 210",
    capacity: 30,
    enrolled: 30,
    rating: 4.4,
    description: "Survey of world history from ancient civilizations to the modern era.",
    prerequisites: "None",
    department: "History",
    semester: "Spring 2024",
    status: "full",
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null)

  const departments = ["all", "Computer Science", "Mathematics", "English", "Physics", "Business", "History"]
  const statuses = ["all", "available", "waitlist", "full"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || course.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-primary text-primary-foreground">Available</Badge>
      case "waitlist":
        return <Badge variant="secondary">Waitlist</Badge>
      case "full":
        return <Badge variant="destructive">Full</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getEnrollmentButton = (course: (typeof courses)[0]) => {
    switch (course.status) {
      case "available":
        return <Button className="w-full">Enroll Now</Button>
      case "waitlist":
        return (
          <Button variant="secondary" className="w-full">
            Join Waitlist
          </Button>
        )
      case "full":
        return (
          <Button variant="outline" disabled className="w-full bg-transparent">
            Course Full
          </Button>
        )
      default:
        return (
          <Button variant="outline" disabled className="w-full bg-transparent">
            Unavailable
          </Button>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">EduEnroll</h1>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">JS</span>
              </div>
              <span className="text-sm font-medium">John Student</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            Course Catalog
            <InfoButton content="Browse all available courses for the current semester. Use filters to find courses by department or enrollment status." />
          </h2>
          <p className="text-muted-foreground">Browse and enroll in available courses for Spring 2024</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, instructors, or course codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <CardTitle className="text-lg">{course.code}</CardTitle>
                    <CardDescription className="font-medium text-foreground">{course.title}</CardDescription>
                  </div>
                  {getStatusBadge(course.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                  <InfoButton content="Average student rating based on course evaluations from previous semesters" />
                  <span>•</span>
                  <span>{course.credits} Credits</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{course.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm items-center">
                    <span className="flex items-center gap-1">
                      Enrollment
                      <InfoButton content="Current enrollment numbers vs. maximum capacity. Green bar shows how full the course is." />
                    </span>
                    <span>
                      {course.enrolled}/{course.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedCourse(course)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          {selectedCourse?.code} - {selectedCourse?.title}
                          <InfoButton content="Detailed course information including prerequisites, schedule, and enrollment options" />
                        </DialogTitle>
                        <DialogDescription>
                          {selectedCourse?.department} • {selectedCourse?.semester}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedCourse && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-semibold mb-1">Instructor</h4>
                                <p className="text-sm text-muted-foreground">{selectedCourse.instructor}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-1">Schedule</h4>
                                <p className="text-sm text-muted-foreground">{selectedCourse.schedule}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-1">Location</h4>
                                <p className="text-sm text-muted-foreground">{selectedCourse.location}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-semibold mb-1">Credits</h4>
                                <p className="text-sm text-muted-foreground">{selectedCourse.credits} credit hours</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-1">Prerequisites</h4>
                                <p className="text-sm text-muted-foreground">{selectedCourse.prerequisites}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-1">Rating</h4>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{selectedCourse.rating}/5.0</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Course Description</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedCourse.description}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm items-center">
                              <span className="flex items-center gap-1">
                                Enrollment Status
                                <InfoButton content="Current enrollment numbers vs. maximum capacity. Green bar shows how full the course is." />
                              </span>
                              <span>
                                {selectedCourse.enrolled}/{selectedCourse.capacity} students
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${(selectedCourse.enrolled / selectedCourse.capacity) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex gap-3">{getEnrollmentButton(selectedCourse)}</div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  {getEnrollmentButton(course)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
