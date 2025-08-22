"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  GraduationCap,
  ArrowLeft,
  BookOpen,
  Settings,
  Calendar,
  Mail,
  Edit3,
  Save,
  X,
  Trophy,
  Target,
} from "lucide-react"
import Link from "next/link"
import { InfoButton } from "@/components/ui/info-button"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Student",
    email: "john.student@university.edu",
    phone: "(555) 123-4567",
    dateOfBirth: "2000-05-15",
    address: "123 College Ave",
    city: "University City",
    state: "CA",
    zipCode: "90210",
    major: "Computer Science",
    minor: "Mathematics",
    expectedGraduation: "Spring 2026",
    gpa: "3.8",
    bio: "Passionate computer science student with interests in artificial intelligence and software development. Active member of the programming club and volunteer tutor.",
    emergencyContact: "Jane Student",
    emergencyPhone: "(555) 987-6543",
    emergencyRelation: "Mother",
  })

  const enrolledCourses = [
    { code: "CS101", title: "Introduction to Computer Science", credits: 3, grade: "A-", semester: "Fall 2023" },
    { code: "MATH201", title: "Calculus II", credits: 4, grade: "B+", semester: "Fall 2023" },
    { code: "ENG102", title: "English Literature", credits: 3, grade: "A", semester: "Spring 2024" },
    { code: "PHYS201", title: "Physics I", credits: 4, grade: "B", semester: "Spring 2024" },
    { code: "CS201", title: "Data Structures", credits: 3, grade: "In Progress", semester: "Current" },
    { code: "MATH301", title: "Linear Algebra", credits: 3, grade: "In Progress", semester: "Current" },
  ]

  const achievements = [
    { title: "Dean's List", description: "Fall 2023 Semester", date: "Dec 2023" },
    { title: "Programming Competition", description: "3rd Place Regional", date: "Nov 2023" },
    { title: "Volunteer Tutor", description: "50+ Hours Completed", date: "Ongoing" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false)
    console.log("Profile updated:", profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  const getGradeColor = (grade: string) => {
    if (grade === "In Progress") return "bg-blue-100 text-blue-800"
    if (grade.startsWith("A")) return "bg-green-100 text-green-800"
    if (grade.startsWith("B")) return "bg-yellow-100 text-yellow-800"
    if (grade.startsWith("C")) return "bg-orange-100 text-orange-800"
    return "bg-gray-100 text-gray-800"
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
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {profileData.firstName[0]}
                  {profileData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {profileData.firstName} {profileData.lastName}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {profileData.firstName[0]}
                {profileData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-lg text-muted-foreground mb-2">{profileData.major} Major</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {profileData.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Expected Graduation: {profileData.expectedGraduation}
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  GPA: {profileData.gpa}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="gap-2 bg-transparent">
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Academic Progress */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Academic Progress
                    <InfoButton content="Track your progress toward degree completion across different requirement categories" />
                  </CardTitle>
                  <CardDescription>Your progress toward degree completion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>15% (18/120 credits)</span>
                    </div>
                    <Progress value={15} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Core Requirements</span>
                      <span>25% (9/36 credits)</span>
                    </div>
                    <Progress value={25} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Major Requirements</span>
                      <span>10% (6/60 credits)</span>
                    </div>
                    <Progress value={10} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Electives</span>
                      <span>12% (3/24 credits)</span>
                    </div>
                    <Progress value={12} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      Current Semester
                      <InfoButton content="Summary of your current semester enrollment and academic standing" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Enrolled Courses</span>
                      <span className="font-medium">6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Credit Hours</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current GPA</span>
                      <span className="font-medium text-primary">{profileData.gpa}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      Achievements
                      <InfoButton content="Academic honors, awards, and recognitions you've earned during your studies" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">{achievement.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{achievement.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Current Courses
                  <InfoButton content="Courses you're currently enrolled in for the active semester" />
                </CardTitle>
                <CardDescription>Spring 2024 Enrollment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses
                    .filter((course) => course.semester === "Current")
                    .map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{course.code}</h4>
                          <p className="text-sm text-muted-foreground">{course.title}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{course.credits} Credits</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{course.grade}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Tab */}
          <TabsContent value="academic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Academic History
                  <InfoButton content="Complete record of all courses taken, grades received, and academic performance over time" />
                </CardTitle>
                <CardDescription>Complete course history and grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrolledCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{course.code}</h4>
                          <Badge variant="outline">{course.semester}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{course.title}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{course.credits} Credits</span>
                          <Badge className={getGradeColor(course.grade)}>{course.grade}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Academic Information
                    <InfoButton content="Your declared major, minor, and expected graduation timeline" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="major">Major</Label>
                        <Select value={profileData.major} onValueChange={(value) => handleInputChange("major", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minor">Minor</Label>
                        <Input
                          id="minor"
                          value={profileData.minor}
                          onChange={(e) => handleInputChange("minor", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expectedGraduation">Expected Graduation</Label>
                        <Input
                          id="expectedGraduation"
                          value={profileData.expectedGraduation}
                          onChange={(e) => handleInputChange("expectedGraduation", e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label className="text-sm font-medium">Major</Label>
                        <p className="text-sm text-muted-foreground">{profileData.major}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Minor</Label>
                        <p className="text-sm text-muted-foreground">{profileData.minor}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Expected Graduation</Label>
                        <p className="text-sm text-muted-foreground">{profileData.expectedGraduation}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Current GPA</Label>
                        <p className="text-sm text-muted-foreground">{profileData.gpa}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={6}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">{profileData.bio}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Personal Information
                    <InfoButton content="Your basic contact information and personal details on file with the university" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label className="text-sm font-medium">Full Name</Label>
                        <p className="text-sm text-muted-foreground">
                          {profileData.firstName} {profileData.lastName}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p className="text-sm text-muted-foreground">{profileData.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Phone</Label>
                        <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Date of Birth</Label>
                        <p className="text-sm text-muted-foreground">{profileData.dateOfBirth}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={profileData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={profileData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={profileData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label className="text-sm font-medium">Address</Label>
                        <p className="text-sm text-muted-foreground">
                          {profileData.address}
                          <br />
                          {profileData.city}, {profileData.state} {profileData.zipCode}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Emergency Contact
                  <InfoButton content="Primary emergency contact information for use in case of urgent situations" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Phone Number</Label>
                      <Input
                        id="emergencyPhone"
                        value={profileData.emergencyPhone}
                        onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelation">Relationship</Label>
                      <Input
                        id="emergencyRelation"
                        value={profileData.emergencyRelation}
                        onChange={(e) => handleInputChange("emergencyRelation", e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Contact Name</Label>
                      <p className="text-sm text-muted-foreground">{profileData.emergencyContact}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone Number</Label>
                      <p className="text-sm text-muted-foreground">{profileData.emergencyPhone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Relationship</Label>
                      <p className="text-sm text-muted-foreground">{profileData.emergencyRelation}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Account Settings
                  <InfoButton content="Manage your account security, privacy preferences, and data export options" />
                </CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Password</h4>
                    <Button variant="outline" className="bg-transparent">
                      Change Password
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                    <Button variant="outline" className="bg-transparent">
                      Enable 2FA
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Privacy Settings</h4>
                    <Button variant="outline" className="bg-transparent">
                      Manage Privacy
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Download Data</h4>
                    <Button variant="outline" className="bg-transparent">
                      Export Profile Data
                    </Button>
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
