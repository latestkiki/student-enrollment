"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Bookmark,
  MessageSquare,
  Plus,
  MapPin,
  Calendar,
  GraduationCap,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Briefcase,
  Leaf,
  ChevronDown,
  Star,
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Globe,
  DollarSign,
  Users,
  BookOpen,
  Home,
  Plane,
  CreditCard,
  Flag
} from "lucide-react"
import { useState } from "react"

export default function DecisionsPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    university: "",
    ranking: "",
    major: "",
    level: "all",
    type: "all",
    status: "all"
  })

  const [sortBy, setSortBy] = useState("latest")
  const [savedApplications, setSavedApplications] = useState<string[]>([])

  // Sample university data
  const universities = [
    {
      id: 1,
      name: "Harvard University",
      location: "Cambridge, MA",
      ranking: 1,
      type: "Private",
      acceptanceRate: 4.6,
      tuition: "$54,768",
      popularMajors: ["Computer Science", "Economics", "Biology"],
      requirements: {
        gpa: "3.9+",
        sat: "1500+",
        act: "33+",
        toefl: "100+",
        ielts: "7.0+"
      }
    },
    {
      id: 2,
      name: "Stanford University",
      location: "Stanford, CA",
      ranking: 2,
      type: "Private",
      acceptanceRate: 4.3,
      tuition: "$56,169",
      popularMajors: ["Engineering", "Computer Science", "Business"],
      requirements: {
        gpa: "3.9+",
        sat: "1500+",
        act: "33+",
        toefl: "100+",
        ielts: "7.0+"
      }
    },
    {
      id: 3,
      name: "MIT",
      location: "Cambridge, MA",
      ranking: 3,
      type: "Private",
      acceptanceRate: 6.7,
      tuition: "$57,986",
      popularMajors: ["Engineering", "Computer Science", "Physics"],
      requirements: {
        gpa: "3.9+",
        sat: "1500+",
        act: "34+",
        toefl: "100+",
        ielts: "7.0+"
      }
    },
    {
      id: 4,
      name: "University of California, Berkeley",
      location: "Berkeley, CA",
      ranking: 4,
      type: "Public",
      acceptanceRate: 14.4,
      tuition: "$44,115",
      popularMajors: ["Computer Science", "Engineering", "Business"],
      requirements: {
        gpa: "3.8+",
        sat: "1400+",
        act: "30+",
        toefl: "90+",
        ielts: "6.5+"
      }
    },
    {
      id: 5,
      name: "Columbia University",
      location: "New York, NY",
      ranking: 5,
      type: "Private",
      acceptanceRate: 5.1,
      tuition: "$64,380",
      popularMajors: ["Economics", "Computer Science", "Political Science"],
      requirements: {
        gpa: "3.9+",
        sat: "1500+",
        act: "33+",
        toefl: "100+",
        ielts: "7.0+"
      }
    }
  ]

  // Sample application decisions
  const applicationDecisions = [
    {
      id: 1,
      studentName: "Ronit Chougule",
      location: "Maharashtra, India",
      targetTerm: "Fall 2024",
      university: "Northeastern University",
      program: "Information Technology",
      level: "Graduate",
      status: "ADMIT",
      appliedDate: "Apr 15, 2021",
      decisionDate: "May 27, 2021",
      gpa: "3.8",
      workExperience: "2 years",
      researchPapers: "3",
      profile: {
        gre: "320",
        toefl: "105",
        workExp: "Software Engineer at TCS",
        research: "Published 3 papers in IEEE conferences"
      }
    },
    {
      id: 2,
      studentName: "Sammanika Joshi",
      location: "Lumbini, Nepal",
      targetTerm: "Fall 2026",
      university: "University of Richmond",
      program: "Bachelor of Business Administration (Finance)",
      level: "Undergraduate",
      status: "APPLIED",
      appliedDate: "Aug 14, 2025",
      decisionDate: null,
      gpa: "3.9",
      workExperience: "0 years",
      researchPapers: "0",
      profile: {
        sat: "1450",
        toefl: "110",
        workExp: "High School Student",
        research: "No research experience"
      }
    },
    {
      id: 3,
      studentName: "Obinna Iwuoha",
      location: "Imo, Nigeria",
      targetTerm: "Fall 2025",
      university: "University of Toronto",
      program: "Computer Science",
      level: "Graduate",
      status: "APPLIED",
      appliedDate: "Dec 15, 2024",
      decisionDate: null,
      gpa: "3.7",
      workExperience: "1 year",
      researchPapers: "1",
      profile: {
        gre: "315",
        toefl: "95",
        workExp: "Software Developer at Andela",
        research: "1 paper in ACM conference"
      }
    }
  ]

  const toggleSaved = (applicationId: string) => {
    setSavedApplications(prev => 
      prev.includes(applicationId) 
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ADMIT":
        return "bg-green-500 text-white"
      case "REJECT":
        return "bg-red-500 text-white"
      case "WAITLIST":
        return "bg-yellow-500 text-black"
      case "APPLIED":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">University Decisions & Applications</h1>
            <p className="text-gray-600">Track your applications and explore enrollment possibilities</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Your Application
          </Button>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Left Sidebar - Filters */}
        <div className="w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* University Name */}
              <div>
                <Label htmlFor="university">University Name</Label>
                <Input
                  id="university"
                  placeholder="Search universities..."
                  value={selectedFilters.university}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, university: e.target.value }))}
                />
              </div>

              {/* Ranking */}
              <div>
                <Label htmlFor="ranking">Ranking</Label>
                <Select value={selectedFilters.ranking} onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, ranking: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ranking range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">Top 10</SelectItem>
                    <SelectItem value="11-25">11-25</SelectItem>
                    <SelectItem value="26-50">26-50</SelectItem>
                    <SelectItem value="51-100">51-100</SelectItem>
                    <SelectItem value="100+">100+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Major */}
              <div>
                <Label htmlFor="major">Major</Label>
                <Select value={selectedFilters.major} onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, major: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select major" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="arts">Arts & Humanities</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Level */}
              <div>
                <Label htmlFor="level">Level</Label>
                <Select value={selectedFilters.level} onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type */}
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={selectedFilters.type} onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="ivy-league">Ivy League</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div>
                <Label htmlFor="status">Application Status</Label>
                <Select value={selectedFilters.status} onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="admit">Admitted</SelectItem>
                    <SelectItem value="reject">Rejected</SelectItem>
                    <SelectItem value="waitlist">Waitlisted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Applications</span>
                <Badge variant="secondary">{applicationDecisions.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Admitted</span>
                <Badge className="bg-green-100 text-green-800">
                  {applicationDecisions.filter(app => app.status === "ADMIT").length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {applicationDecisions.filter(app => app.status === "APPLIED").length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Action Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Saved ({savedApplications.length})
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Sort by: Latest</SelectItem>
                  <SelectItem value="earliest">Sort by: Earliest</SelectItem>
                  <SelectItem value="university">Sort by: University</SelectItem>
                  <SelectItem value="status">Sort by: Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussions
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your Own
              </Button>
            </div>
          </div>

          {/* Application Decisions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Applications & Decisions</h2>
            
            {applicationDecisions.map((application) => (
              <Card key={application.id} className="relative">
                {/* Status Banner */}
                <div className={`absolute top-0 right-0 transform rotate-45 translate-x-8 -translate-y-2 px-8 py-1 text-xs font-bold ${getStatusColor(application.status)}`}>
                  {application.status}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Profile Section */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-600" />
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{application.studentName}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {application.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Leaf className="h-4 w-4" />
                              {application.targetTerm}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaved(application.id.toString())}
                          className={savedApplications.includes(application.id.toString()) ? "text-blue-600" : ""}
                        >
                          <Bookmark className={`h-4 w-4 ${savedApplications.includes(application.id.toString()) ? "fill-current" : ""}`} />
                        </Button>
                      </div>

                      {/* Profile Stats */}
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {application.gpa} CGPA
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {application.workExperience} Experience
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {application.researchPapers} Research Papers
                        </span>
                      </div>

                      {/* University Info */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Building className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{application.university}</h4>
                            <p className="text-sm text-gray-600">{application.program}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{application.level}</Badge>
                              {application.status === "ADMIT" && (
                                <Badge className="bg-green-100 text-green-800">Enrolled</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied: {application.appliedDate}
                        </span>
                        {application.decisionDate && (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Decision: {application.decisionDate}
                          </span>
                        )}
                        {!application.decisionDate && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            Decision Pending
                          </span>
                        )}
                      </div>

                      {/* Profile Details */}
                      <div className="border-t pt-4">
                        <h5 className="font-medium text-gray-900 mb-2">Profile Details</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">GRE Score:</span>
                            <span className="ml-2 font-medium">{application.profile.gre}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">TOEFL Score:</span>
                            <span className="ml-2 font-medium">{application.profile.toefl}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Work Experience:</span>
                            <span className="ml-2 font-medium">{application.profile.workExp}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Research:</span>
                            <span className="ml-2 font-medium">{application.profile.research}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* University Explorer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                University Explorer
              </CardTitle>
              <CardDescription>Explore top universities and their admission requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {universities.map((university) => (
                  <Card key={university.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{university.name}</h4>
                          <p className="text-sm text-gray-600">{university.location}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-blue-100 text-blue-800">#{university.ranking}</Badge>
                            <Badge variant="outline">{university.type}</Badge>
                          </div>
                          <div className="mt-3 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Acceptance Rate:</span>
                              <span className="font-medium">{university.acceptanceRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tuition:</span>
                              <span className="font-medium">{university.tuition}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <h6 className="text-sm font-medium text-gray-700 mb-1">Popular Majors:</h6>
                            <div className="flex flex-wrap gap-1">
                              {university.popularMajors.slice(0, 2).map((major, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {major}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}



