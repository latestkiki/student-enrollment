"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ApplicationDetail {
  id: string
  studentName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  emergencyContact: string
  emergencyPhone: string
  program: string
  startTerm: string
  previousEducation: string
  gpa: string
  essay: string
  specialNeeds: string
  submissionDate: string
  status: "submitted" | "under-review" | "approved" | "rejected" | "pending-documents"
  documents: {
    transcript: { uploaded: boolean; filename?: string; verified: boolean }
    id: { uploaded: boolean; filename?: string; verified: boolean }
    essay: { uploaded: boolean; filename?: string; verified: boolean }
  }
  timeline: {
    date: string
    event: string
    completed: boolean
    note?: string
  }[]
}

const mockApplication: ApplicationDetail = {
  id: "ENR-2025-001",
  studentName: "John Doe",
  email: "john.doe@email.com",
  phone: "(555) 123-4567",
  dateOfBirth: "1995-03-15",
  address: "123 Main Street",
  city: "Springfield",
  state: "IL",
  zipCode: "62701",
  emergencyContact: "Jane Doe",
  emergencyPhone: "(555) 987-6543",
  program: "Computer Science",
  startTerm: "Fall 2025",
  previousEducation: "High School Diploma",
  gpa: "3.8",
  essay:
    "I am passionate about computer science and technology. Throughout my high school years, I have developed a strong foundation in mathematics and science, which has prepared me for the challenges of a computer science program. I am particularly interested in artificial intelligence and machine learning, and I believe that your program will provide me with the knowledge and skills necessary to pursue a career in this exciting field. I am committed to academic excellence and look forward to contributing to the university community through my dedication and enthusiasm for learning.",
  specialNeeds: "",
  submissionDate: "2025-01-15",
  status: "under-review",
  documents: {
    transcript: { uploaded: true, filename: "transcript_john_doe.pdf", verified: true },
    id: { uploaded: true, filename: "drivers_license_john_doe.pdf", verified: true },
    essay: { uploaded: false, filename: undefined, verified: false },
  },
  timeline: [
    { date: "2025-01-15", event: "Application submitted", completed: true },
    { date: "2025-01-16", event: "Documents verified", completed: true, note: "All required documents received" },
    { date: "2025-01-18", event: "Initial review completed", completed: true },
    { date: "2025-01-22", event: "Committee review", completed: false },
    { date: "2025-01-25", event: "Interview (if required)", completed: false },
    { date: "2025-01-30", event: "Final decision", completed: false },
  ],
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const [application, setApplication] = useState<ApplicationDetail>(mockApplication)
  const [decisionNote, setDecisionNote] = useState("")
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

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

  const handleApprove = () => {
    setApplication((prev) => ({ ...prev, status: "approved" }))
    setIsApproveDialogOpen(false)
    setDecisionNote("")
  }

  const handleReject = () => {
    setApplication((prev) => ({ ...prev, status: "rejected" }))
    setIsRejectDialogOpen(false)
    setDecisionNote("")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-montserrat)]">
                EduConnect Admin
              </h1>
            </div>
            <Link href="/admin">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">Application Review</h2>
              <p className="text-muted-foreground">Application ID: {application.id}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={`${getStatusColor(application.status)} text-sm px-3 py-1`}>
                {application.status.replace("-", " ").toUpperCase()}
              </Badge>
              {application.status === "under-review" && (
                <div className="flex space-x-2">
                  <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Approve Application</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to approve this application? The student will be notified via email.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="approveNote">Approval Note (Optional)</Label>
                          <Textarea
                            id="approveNote"
                            placeholder="Add any notes for the approval..."
                            value={decisionNote}
                            onChange={(e) => setDecisionNote(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                          Approve Application
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject Application</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to reject this application? Please provide a reason for the rejection.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="rejectNote">Rejection Reason *</Label>
                          <Textarea
                            id="rejectNote"
                            placeholder="Please provide a reason for rejection..."
                            value={decisionNote}
                            onChange={(e) => setDecisionNote(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleReject} disabled={!decisionNote.trim()}>
                          Reject Application
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                      <p className="font-medium">{application.studentName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                      <p>{new Date(application.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                      <p className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{application.email}</span>
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                      <p className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{application.phone}</span>
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                    <p className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 mt-1" />
                      <span>
                        {application.address}, {application.city}, {application.state} {application.zipCode}
                      </span>
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                      <p>{application.emergencyContact}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Emergency Phone</Label>
                      <p>{application.emergencyPhone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Academic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Program of Interest</Label>
                      <p className="font-medium">{application.program}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Start Term</Label>
                      <p>{application.startTerm}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Previous Education</Label>
                      <p>{application.previousEducation}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">GPA</Label>
                      <p className="font-medium">{application.gpa}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Personal Statement</Label>
                    <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm leading-relaxed">{application.essay}</p>
                    </div>
                  </div>
                  {application.specialNeeds && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Special Accommodations</Label>
                      <p className="mt-1">{application.specialNeeds}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Official Transcript</p>
                          {application.documents.transcript.filename && (
                            <p className="text-sm text-muted-foreground">{application.documents.transcript.filename}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {application.documents.transcript.verified ? (
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Government ID</p>
                          {application.documents.id.filename && (
                            <p className="text-sm text-muted-foreground">{application.documents.id.filename}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {application.documents.id.verified ? (
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>

                    {!application.documents.essay.uploaded && (
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Personal Statement File</p>
                            <p className="text-sm text-muted-foreground">Not uploaded (text version provided)</p>
                          </div>
                        </div>
                        <Badge variant="secondary">N/A</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Application Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {application.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full border-2 mt-1 ${
                            event.completed ? "bg-primary border-primary" : "border-muted-foreground bg-background"
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${event.completed ? "font-medium" : "text-muted-foreground"}`}>
                            {event.event}
                          </p>
                          <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                          {event.note && <p className="text-xs text-muted-foreground mt-1">{event.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </CardContent>
              </Card>

              {/* Application Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Submitted:</span>
                    <span>{new Date(application.submissionDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Documents:</span>
                    <span>
                      {Object.values(application.documents).filter((doc) => doc.uploaded).length}/
                      {Object.keys(application.documents).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GPA:</span>
                    <span className="font-medium">{application.gpa}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
