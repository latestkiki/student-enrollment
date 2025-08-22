"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Search, Clock, CheckCircle, FileText, AlertCircle, Mail, Phone } from "lucide-react"
import Link from "next/link"

interface ApplicationStatus {
  id: string
  studentName: string
  program: string
  submissionDate: string
  status: "submitted" | "under-review" | "approved" | "rejected" | "pending-documents"
  progress: number
  nextSteps: string[]
  documents: {
    name: string
    status: "received" | "pending" | "approved" | "rejected"
  }[]
  timeline: {
    date: string
    event: string
    completed: boolean
  }[]
}

const mockApplication: ApplicationStatus = {
  id: "ENR-2025-001",
  studentName: "John Doe",
  program: "Computer Science",
  submissionDate: "2025-01-15",
  status: "under-review",
  progress: 60,
  nextSteps: [
    "Admissions committee review (in progress)",
    "Interview scheduling (pending)",
    "Final decision notification",
  ],
  documents: [
    { name: "Official Transcript", status: "approved" },
    { name: "Government ID", status: "approved" },
    { name: "Personal Statement", status: "received" },
  ],
  timeline: [
    { date: "2025-01-15", event: "Application submitted", completed: true },
    { date: "2025-01-16", event: "Documents verified", completed: true },
    { date: "2025-01-18", event: "Initial review completed", completed: true },
    { date: "2025-01-22", event: "Committee review", completed: false },
    { date: "2025-01-25", event: "Interview (if required)", completed: false },
    { date: "2025-01-30", event: "Final decision", completed: false },
  ],
}

export default function ApplicationStatusPage() {
  const [applicationId, setApplicationId] = useState("")
  const [application, setApplication] = useState<ApplicationStatus | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!applicationId.trim()) {
      setError("Please enter an application ID")
      return
    }

    setIsSearching(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (applicationId === "ENR-2025-001") {
      setApplication(mockApplication)
    } else {
      setError("Application not found. Please check your application ID.")
      setApplication(null)
    }

    setIsSearching(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "under-review":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending-documents":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4" />
      case "under-review":
        return <AlertCircle className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      case "pending-documents":
        return <FileText className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600"
      case "received":
        return "text-blue-600"
      case "pending":
        return "text-orange-600"
      case "rejected":
        return "text-red-600"
      default:
        return "text-gray-600"
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
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 font-[family-name:var(--font-montserrat)]">
            Application Status Tracker
          </h2>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Track Your Application</CardTitle>
              <CardDescription>
                Enter your application ID to view the current status and progress of your enrollment application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="applicationId">Application ID</Label>
                  <Input
                    id="applicationId"
                    placeholder="e.g., ENR-2025-001"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} disabled={isSearching} className="flex items-center space-x-2">
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    <span>{isSearching ? "Searching..." : "Search"}</span>
                  </Button>
                </div>
              </div>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </CardContent>
          </Card>

          {/* Application Details */}
          {application && (
            <div className="space-y-6">
              {/* Status Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>Application #{application.id}</span>
                        <Badge className={`${getStatusColor(application.status)} flex items-center space-x-1`}>
                          {getStatusIcon(application.status)}
                          <span className="capitalize">{application.status.replace("-", " ")}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Submitted on {new Date(application.submissionDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Application Details</h4>
                      <p>
                        <strong>Student:</strong> {application.studentName}
                      </p>
                      <p>
                        <strong>Program:</strong> {application.program}
                      </p>
                      <p>
                        <strong>Submission Date:</strong> {new Date(application.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{application.progress}%</span>
                        </div>
                        <Progress value={application.progress} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {application.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Document Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {application.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span>{doc.name}</span>
                        </div>
                        <span className={`font-medium capitalize ${getDocumentStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {application.timeline.map((event, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            event.completed ? "bg-primary border-primary" : "border-muted-foreground bg-background"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={event.completed ? "font-medium" : "text-muted-foreground"}>
                              {event.event}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-muted-foreground">admissions@educonnect.edu</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Demo Information */}
          {!application && !error && (
            <Card>
              <CardHeader>
                <CardTitle>Demo Application</CardTitle>
                <CardDescription>
                  Try the demo with application ID: <code className="bg-muted px-2 py-1 rounded">ENR-2025-001</code>
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
