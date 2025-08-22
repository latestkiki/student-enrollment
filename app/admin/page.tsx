"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Filter,
  Settings,
  UserCheck,
  AlertCircle,
  TrendingUp,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Shield,
  Database,
  Activity,
} from "lucide-react"
import Link from "next/link"

import { InfoButton } from "@/components/ui/info-button"

const students = [
  {
    id: 1,
    name: "John Student",
    email: "john.student@university.edu",
    major: "Computer Science",
    gpa: 3.8,
    credits: 18,
    status: "Active",
    enrolledDate: "2023-08-15",
    applicationStatus: "approved",
    phone: "(555) 123-4567",
    address: "123 College Ave, University City, ST 12345",
    dateOfBirth: "2001-05-15",
    emergencyContact: {
      name: "Mary Student",
      relationship: "Mother",
      phone: "(555) 987-6543",
    },
    financialAid: {
      totalAid: 15000,
      scholarships: 8000,
      loans: 7000,
      balance: 2500,
    },
    academicHistory: [
      { semester: "Fall 2023", gpa: 3.7, credits: 15, courses: ["CS101", "MATH201", "ENG102"] },
      { semester: "Spring 2024", gpa: 3.9, credits: 18, courses: ["CS201", "MATH301", "PHYS101"] },
    ],
    enrollmentHistory: [
      { courseCode: "CS101", courseName: "Intro to Computer Science", semester: "Fall 2023", grade: "A-" },
      { courseCode: "MATH201", courseName: "Calculus II", semester: "Fall 2023", grade: "B+" },
      { courseCode: "CS201", courseName: "Data Structures", semester: "Spring 2024", grade: "A" },
    ],
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@university.edu",
    major: "Mathematics",
    gpa: 3.9,
    credits: 21,
    status: "Active",
    enrolledDate: "2023-08-15",
    applicationStatus: "approved",
    phone: "(555) 234-5678",
    address: "456 University Blvd, College Town, ST 12346",
    dateOfBirth: "2000-12-03",
    emergencyContact: {
      name: "Robert Doe",
      relationship: "Father",
      phone: "(555) 876-5432",
    },
    financialAid: {
      totalAid: 12000,
      scholarships: 10000,
      loans: 2000,
      balance: 1200,
    },
    academicHistory: [
      { semester: "Fall 2023", gpa: 3.8, credits: 18, courses: ["MATH301", "STAT201", "CS101"] },
      { semester: "Spring 2024", gpa: 4.0, credits: 21, courses: ["MATH401", "STAT301", "PHYS201"] },
    ],
    enrollmentHistory: [
      { courseCode: "MATH301", courseName: "Advanced Calculus", semester: "Fall 2023", grade: "A" },
      { courseCode: "STAT201", courseName: "Statistics", semester: "Fall 2023", grade: "A-" },
      { courseCode: "MATH401", courseName: "Real Analysis", semester: "Spring 2024", grade: "A" },
    ],
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@university.edu",
    major: "Engineering",
    gpa: 3.5,
    credits: 15,
    status: "Probation",
    enrolledDate: "2023-08-15",
    applicationStatus: "approved",
    phone: "(555) 345-6789",
    address: "789 Campus Dr, Student Village, ST 12347",
    dateOfBirth: "2001-08-22",
    emergencyContact: {
      name: "Lisa Johnson",
      relationship: "Mother",
      phone: "(555) 765-4321",
    },
    financialAid: {
      totalAid: 18000,
      scholarships: 5000,
      loans: 13000,
      balance: 4800,
    },
    academicHistory: [
      { semester: "Fall 2023", gpa: 3.2, credits: 12, courses: ["ENG101", "MATH201", "PHYS101"] },
      { semester: "Spring 2024", gpa: 3.8, credits: 15, courses: ["ENG201", "MATH301", "CHEM101"] },
    ],
    enrollmentHistory: [
      { courseCode: "ENG101", courseName: "Engineering Fundamentals", semester: "Fall 2023", grade: "C+" },
      { courseCode: "MATH201", courseName: "Calculus II", semester: "Fall 2023", grade: "B-" },
      { courseCode: "ENG201", courseName: "Statics", semester: "Spring 2024", grade: "B+" },
    ],
  },
]

const applications = [
  {
    id: "ENR-2025-001",
    studentName: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    program: "Psychology",
    submissionDate: "2025-01-15",
    status: "under-review",
    gpa: "3.7",
    documents: { transcript: true, id: true, essay: true },
  },
  {
    id: "ENR-2025-002",
    studentName: "David Brown",
    email: "david.brown@email.com",
    program: "Business Administration",
    submissionDate: "2025-01-14",
    status: "pending-documents",
    gpa: "3.6",
    documents: { transcript: true, id: false, essay: true },
  },
  {
    id: "ENR-2025-003",
    studentName: "Emily Davis",
    email: "emily.davis@email.com",
    program: "Nursing",
    submissionDate: "2025-01-13",
    status: "submitted",
    gpa: "3.9",
    documents: { transcript: true, id: true, essay: false },
  },
]

const courses = [
  {
    id: 1,
    code: "CS101",
    title: "Introduction to Computer Science",
    instructor: "Dr. Sarah Johnson",
    capacity: 30,
    enrolled: 25,
    credits: 3,
    status: "Active",
    semester: "Spring 2024",
  },
  {
    id: 2,
    code: "MATH201",
    title: "Calculus II",
    instructor: "Prof. Michael Smith",
    capacity: 25,
    enrolled: 23,
    credits: 4,
    status: "Active",
    semester: "Spring 2024",
  },
  {
    id: 3,
    code: "ENG102",
    title: "English Literature",
    instructor: "Dr. Emily Davis",
    capacity: 20,
    enrolled: 18,
    credits: 3,
    status: "Active",
    semester: "Spring 2024",
  },
]

const enrollments = [
  {
    id: 1,
    studentName: "John Student",
    courseName: "CS101",
    enrollDate: "2024-01-15",
    status: "Enrolled",
    grade: "A-",
  },
  { id: 2, studentName: "Jane Doe", courseName: "MATH201", enrollDate: "2024-01-15", status: "Enrolled", grade: "A" },
  {
    id: 3,
    studentName: "Mike Johnson",
    courseName: "ENG102",
    enrollDate: "2024-01-16",
    status: "Waitlist",
    grade: "-",
  },
]

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "enrolled":
      case "approved":
        return <Badge className="bg-emerald-100 text-emerald-800">{status}</Badge>
      case "probation":
      case "waitlist":
      case "under-review":
      case "pending-documents":
        return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
      case "inactive":
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">{status}</Badge>
      case "submitted":
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return <Clock className="h-3 w-3" />
      case "under-review":
        return <AlertCircle className="h-3 w-3" />
      case "approved":
      case "active":
      case "enrolled":
        return <CheckCircle className="h-3 w-3" />
      case "rejected":
      case "inactive":
        return <XCircle className="h-3 w-3" />
      case "pending-documents":
        return <FileText className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EduEnroll Administration</h1>
              <p className="text-xs text-muted-foreground">Comprehensive Student Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <AlertCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3 pl-3 border-l">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">Super Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Administration Dashboard</h2>
          <p className="text-muted-foreground">
            Complete management system for students, applications, courses, and analytics
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-emerald-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Total Students
                    <InfoButton content="Total number of enrolled students across all programs and semesters" />
                  </CardTitle>
                  <Users className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% from last semester</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Pending Applications
                    <InfoButton content="Student applications awaiting administrative review and approval" />
                  </CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Active Courses
                    <InfoButton content="Currently available courses for student enrollment this semester" />
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <p className="text-xs text-muted-foreground">+5 new this semester</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    System Health
                    <InfoButton content="Overall system uptime and performance metrics for the enrollment platform" />
                  </CardTitle>
                  <Activity className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">98.5%</div>
                  <p className="text-xs text-muted-foreground">Uptime this month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Recent Applications
                  </CardTitle>
                  <CardDescription>Latest student applications requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 5).map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(app.status)}
                          <div>
                            <p className="font-medium text-sm">{app.studentName}</p>
                            <p className="text-xs text-muted-foreground">
                              {app.program} • {app.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(app.status)}
                          <Link href={`/admin/applications/${app.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-emerald-600" />
                    Recent Enrollments
                  </CardTitle>
                  <CardDescription>Latest student course enrollments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrollments.slice(0, 5).map((enrollment) => (
                      <div
                        key={enrollment.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(enrollment.status)}
                          <div>
                            <p className="font-medium text-sm">{enrollment.studentName}</p>
                            <p className="text-xs text-muted-foreground">{enrollment.courseName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(enrollment.status)}
                          <p className="text-xs text-muted-foreground mt-1">{enrollment.enrollDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    System Alerts
                  </CardTitle>
                  <CardDescription>Important notifications requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Course Capacity Alert</p>
                        <p className="text-xs text-red-600">PHYS201 is at full capacity with 15 waitlisted students</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Clock className="h-4 w-4 text-yellow-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Registration Deadline</p>
                        <p className="text-xs text-yellow-600">Spring 2024 registration ends in 3 days</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">New Applications</p>
                        <p className="text-xs text-blue-600">{applications.length} applications pending review</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Frequently used administrative functions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Review Pending Applications
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Student Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Course Administration
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Application Management
                  <InfoButton content="Review, approve, or reject student applications. Track document submissions and application status." />
                </CardTitle>
                <CardDescription>Review and process student applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Application ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-mono text-sm">{app.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{app.studentName}</p>
                            <p className="text-sm text-muted-foreground">{app.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{app.program}</TableCell>
                        <TableCell className="font-medium">{app.gpa}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Badge variant={app.documents.transcript ? "default" : "secondary"} className="text-xs">
                              T
                            </Badge>
                            <Badge variant={app.documents.id ? "default" : "secondary"} className="text-xs">
                              ID
                            </Badge>
                            <Badge variant={app.documents.essay ? "default" : "secondary"} className="text-xs">
                              E
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(app.status)}
                            {getStatusBadge(app.status)}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(app.submissionDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Link href={`/admin/applications/${app.id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            {app.status === "submitted" && (
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                Review
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="h-4 w-4" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                      <DialogDescription>Create a new student record in the system.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="Enter first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Enter last name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="student@university.edu" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="major">Major</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select major" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="computer-science">Computer Science</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" className="bg-transparent">
                          Cancel
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">Create Student</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  Student Information Management
                  <InfoButton content="Access comprehensive student records including personal, academic, and financial information" />
                </CardTitle>
                <CardDescription>Comprehensive access to all student records and information</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact Info</TableHead>
                      <TableHead>Academic Info</TableHead>
                      <TableHead>Financial Status</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <p className="text-xs text-muted-foreground">ID: {student.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{student.phone}</p>
                            <p className="text-xs text-muted-foreground">{student.address}</p>
                            <p className="text-xs text-muted-foreground">
                              DOB: {new Date(student.dateOfBirth).toLocaleDateString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.major}</p>
                            <p className="text-sm">
                              GPA: {student.gpa} | Credits: {student.credits}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Enrolled: {new Date(student.enrolledDate).toLocaleDateString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">Aid: ${student.financialAid.totalAid.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">
                              Balance: ${student.financialAid.balance.toLocaleString()}
                            </p>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="outline" className="text-xs">
                                Scholarship: ${student.financialAid.scholarships.toLocaleString()}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-emerald-600" />
                                    Student Profile: {student.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Comprehensive student information and academic records
                                  </DialogDescription>
                                </DialogHeader>

                                <Tabs defaultValue="personal" className="w-full">
                                  <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                    <TabsTrigger value="academic">Academic Records</TabsTrigger>
                                    <TabsTrigger value="financial">Financial Info</TabsTrigger>
                                    <TabsTrigger value="enrollment">Enrollment History</TabsTrigger>
                                  </TabsList>

                                  <TabsContent value="personal" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Personal Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <div>
                                            <Label className="text-sm font-medium">Full Name</Label>
                                            <p className="text-sm">{student.name}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Email</Label>
                                            <p className="text-sm">{student.email}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Phone</Label>
                                            <p className="text-sm">{student.phone}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Date of Birth</Label>
                                            <p className="text-sm">
                                              {new Date(student.dateOfBirth).toLocaleDateString()}
                                            </p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Address</Label>
                                            <p className="text-sm">{student.address}</p>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Emergency Contact</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <div>
                                            <Label className="text-sm font-medium">Name</Label>
                                            <p className="text-sm">{student.emergencyContact.name}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Relationship</Label>
                                            <p className="text-sm">{student.emergencyContact.relationship}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Phone</Label>
                                            <p className="text-sm">{student.emergencyContact.phone}</p>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="academic" className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Current Academic Status</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-3 gap-4">
                                          <div>
                                            <Label className="text-sm font-medium">Major</Label>
                                            <p className="text-lg font-semibold">{student.major}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Current GPA</Label>
                                            <p className="text-lg font-semibold text-emerald-600">{student.gpa}</p>
                                          </div>
                                          <div>
                                            <Label className="text-sm font-medium">Total Credits</Label>
                                            <p className="text-lg font-semibold">{student.credits}</p>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Academic History</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <Table>
                                            <TableHeader>
                                              <TableRow>
                                                <TableHead>Semester</TableHead>
                                                <TableHead>GPA</TableHead>
                                                <TableHead>Credits</TableHead>
                                                <TableHead>Courses</TableHead>
                                              </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                              {student.academicHistory.map((record, index) => (
                                                <TableRow key={index}>
                                                  <TableCell className="font-medium">{record.semester}</TableCell>
                                                  <TableCell>{record.gpa}</TableCell>
                                                  <TableCell>{record.credits}</TableCell>
                                                  <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                      {record.courses.map((course, i) => (
                                                        <Badge key={i} variant="outline" className="text-xs">
                                                          {course}
                                                        </Badge>
                                                      ))}
                                                    </div>
                                                  </TableCell>
                                                </TableRow>
                                              ))}
                                            </TableBody>
                                          </Table>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="financial" className="space-y-4">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Financial Information</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="grid grid-cols-2 gap-6">
                                          <div className="space-y-4">
                                            <div>
                                              <Label className="text-sm font-medium">Total Financial Aid</Label>
                                              <p className="text-2xl font-bold text-emerald-600">
                                                ${student.financialAid.totalAid.toLocaleString()}
                                              </p>
                                            </div>
                                            <div>
                                              <Label className="text-sm font-medium">Scholarships</Label>
                                              <p className="text-lg font-semibold text-blue-600">
                                                ${student.financialAid.scholarships.toLocaleString()}
                                              </p>
                                            </div>
                                            <div>
                                              <Label className="text-sm font-medium">Loans</Label>
                                              <p className="text-lg font-semibold text-orange-600">
                                                ${student.financialAid.loans.toLocaleString()}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="space-y-4">
                                            <div>
                                              <Label className="text-sm font-medium">Outstanding Balance</Label>
                                              <p className="text-2xl font-bold text-red-600">
                                                ${student.financialAid.balance.toLocaleString()}
                                              </p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                              <h4 className="font-medium mb-2">Payment Status</h4>
                                              <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                  <span>Aid Coverage</span>
                                                  <span className="font-medium">
                                                    {Math.round(
                                                      (student.financialAid.totalAid /
                                                        (student.financialAid.totalAid +
                                                          student.financialAid.balance)) *
                                                        100,
                                                    )}
                                                    %
                                                  </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                  <div
                                                    className="bg-emerald-500 h-2 rounded-full"
                                                    style={{
                                                      width: `${Math.round((student.financialAid.totalAid / (student.financialAid.totalAid + student.financialAid.balance)) * 100)}%`,
                                                    }}
                                                  ></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </TabsContent>

                                  <TabsContent value="enrollment" className="space-y-4">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">Course Enrollment History</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <Table>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead>Course Code</TableHead>
                                              <TableHead>Course Name</TableHead>
                                              <TableHead>Semester</TableHead>
                                              <TableHead>Grade</TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            {student.enrollmentHistory.map((enrollment, index) => (
                                              <TableRow key={index}>
                                                <TableCell className="font-medium">{enrollment.courseCode}</TableCell>
                                                <TableCell>{enrollment.courseName}</TableCell>
                                                <TableCell>{enrollment.semester}</TableCell>
                                                <TableCell>
                                                  <Badge
                                                    variant={
                                                      enrollment.grade.startsWith("A")
                                                        ? "default"
                                                        : enrollment.grade.startsWith("B")
                                                          ? "secondary"
                                                          : "outline"
                                                    }
                                                    className={
                                                      enrollment.grade.startsWith("A")
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : enrollment.grade.startsWith("B")
                                                          ? "bg-blue-100 text-blue-800"
                                                          : ""
                                                    }
                                                  >
                                                    {enrollment.grade}
                                                  </Badge>
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </CardContent>
                                    </Card>
                                  </TabsContent>
                                </Tabs>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search courses..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="h-4 w-4" />
                      Add Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Course</DialogTitle>
                      <DialogDescription>Create a new course in the system.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="courseCode">Course Code</Label>
                          <Input id="courseCode" placeholder="CS101" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="credits">Credits</Label>
                          <Input id="credits" type="number" placeholder="3" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseTitle">Course Title</Label>
                        <Input id="courseTitle" placeholder="Introduction to Computer Science" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instructor">Instructor</Label>
                        <Input id="instructor" placeholder="Dr. Jane Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input id="capacity" type="number" placeholder="30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Course description..." />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" className="bg-transparent">
                          Cancel
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">Create Course</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Course Management
                  <InfoButton content="Create, edit, and manage course offerings, enrollment limits, and instructor assignments" />
                </CardTitle>
                <CardDescription>Manage all available courses and their details</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Enrollment</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>
                              {course.enrolled}/{course.capacity}
                            </span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 transition-all duration-300"
                                style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>{getStatusBadge(course.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search enrollments..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                  Enrollment Management
                  <InfoButton content="Monitor student course enrollments, manage waitlists, and track academic progress" />
                </CardTitle>
                <CardDescription>Monitor and manage student course enrollments and grades</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Enrollment Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                        <TableCell>{enrollment.courseName}</TableCell>
                        <TableCell>{enrollment.enrollDate}</TableCell>
                        <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${enrollment.grade === "A" || enrollment.grade === "A-" ? "text-emerald-600" : "text-muted-foreground"}`}
                          >
                            {enrollment.grade}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-emerald-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    Enrollment Trends
                    <InfoButton content="Historical enrollment data showing growth patterns and semester-over-semester changes" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Fall 2023</span>
                      <span className="font-medium">1,156 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Spring 2024</span>
                      <span className="font-medium">1,247 students</span>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span className="text-sm font-medium">Growth Rate</span>
                      <span className="font-bold">+7.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Popular Majors
                    <InfoButton content="Most popular academic programs based on current student enrollment numbers" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Computer Science</span>
                      <span className="font-medium">342 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Business</span>
                      <span className="font-medium">298 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Engineering</span>
                      <span className="font-medium">267 students</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Semester Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Average GPA</span>
                      <span className="font-medium">3.42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Retention Rate</span>
                      <span className="font-medium">89.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-gray-600" />
                  System Performance
                  <InfoButton content="Key performance indicators including completion rates, ratings, and system utilization metrics" />
                </CardTitle>
                <CardDescription>Comprehensive analytics and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 border border-border rounded-lg bg-emerald-50">
                      <div className="text-2xl font-bold text-emerald-600">89%</div>
                      <div className="text-sm text-muted-foreground">Course Completion</div>
                    </div>
                    <div className="p-4 border border-border rounded-lg bg-blue-50">
                      <div className="text-2xl font-bold text-blue-600">3.4</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </div>
                    <div className="p-4 border border-border rounded-lg bg-purple-50">
                      <div className="text-2xl font-bold text-purple-600">92%</div>
                      <div className="text-sm text-muted-foreground">Capacity Utilization</div>
                    </div>
                    <div className="p-4 border border-border rounded-lg bg-orange-50">
                      <div className="text-2xl font-bold text-orange-600">156</div>
                      <div className="text-sm text-muted-foreground">Waitlisted Students</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
