"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  GraduationCap,
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Plus,
  Edit,
  Trash2,
  Video,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

interface Appointment {
  id: string
  counselorName: string
  counselorTitle: string
  date: string
  time: string
  duration: number
  type: "in-person" | "virtual" | "phone"
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  location?: string
  meetingLink?: string
  notes?: string
  reason: string
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    counselorName: "Dr. Sarah Johnson",
    counselorTitle: "Academic Counselor",
    date: "2025-01-25",
    time: "10:00 AM",
    duration: 60,
    type: "in-person",
    status: "scheduled",
    location: "Main Campus - Building A, Room 201",
    reason: "Academic planning for next semester",
    notes: "Discuss course selection and study strategies",
  },
  {
    id: "2",
    counselorName: "Michael Chen",
    counselorTitle: "Career Counselor",
    date: "2025-01-22",
    time: "2:00 PM",
    duration: 45,
    type: "virtual",
    status: "completed",
    meetingLink: "https://meet.educonnect.edu/career-session-123",
    reason: "Resume review and interview preparation",
    notes: "Reviewed resume, practiced interview questions. Follow-up scheduled for next week.",
  },
  {
    id: "3",
    counselorName: "Dr. Emily Rodriguez",
    counselorTitle: "Personal Counselor",
    date: "2025-01-28",
    time: "3:30 PM",
    duration: 50,
    type: "in-person",
    status: "scheduled",
    location: "Student Wellness Center - Room 301",
    reason: "Stress management and coping strategies",
  },
  {
    id: "4",
    counselorName: "James Wilson",
    counselorTitle: "Financial Aid Counselor",
    date: "2025-01-20",
    time: "11:00 AM",
    duration: 30,
    type: "phone",
    status: "completed",
    reason: "Scholarship application assistance",
    notes: "Completed FAFSA review, identified 3 scholarship opportunities",
  },
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")

  const upcomingAppointments = appointments.filter((apt) => apt.status === "scheduled")
  const pastAppointments = appointments.filter((apt) => apt.status === "completed" || apt.status === "cancelled")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no-show":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "virtual":
        return <Video className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: "cancelled" as const } : apt)),
    )
    setIsCancelDialogOpen(false)
    setCancelReason("")
    setSelectedAppointment(null)
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
              <Link href="/appointments/book">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </Link>
              <Link href="/counseling">
                <Button variant="outline">Find Counselors</Button>
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
            <h2 className="text-3xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">My Appointments</h2>
            <p className="text-muted-foreground">Manage your counseling appointments and sessions</p>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
              <TabsTrigger value="history">History ({pastAppointments.length})</TabsTrigger>
            </TabsList>

            {/* Upcoming Appointments */}
            <TabsContent value="upcoming" className="space-y-6">
              {upcomingAppointments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming appointments</h3>
                    <p className="text-muted-foreground mb-4">
                      Schedule an appointment with one of our counselors to get the support you need.
                    </p>
                    <Link href="/appointments/book">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Book Your First Appointment
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg font-[family-name:var(--font-montserrat)]">
                                  {appointment.counselorName}
                                </h3>
                                <p className="text-muted-foreground">{appointment.counselorTitle}</p>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {appointment.time} ({appointment.duration} minutes)
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                  {getTypeIcon(appointment.type)}
                                  <span className="capitalize">{appointment.type}</span>
                                  <Badge className={getStatusColor(appointment.status)}>
                                    {appointment.status.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {appointment.location && (
                                  <div className="flex items-start space-x-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <span>{appointment.location}</span>
                                  </div>
                                )}
                                {appointment.meetingLink && (
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Video className="h-4 w-4 text-muted-foreground" />
                                    <a
                                      href={appointment.meetingLink}
                                      className="text-primary hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Join Meeting
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm font-medium mb-1">Reason for appointment:</p>
                              <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                            </div>

                            {appointment.notes && (
                              <div className="mb-4">
                                <p className="text-sm font-medium mb-1">Notes:</p>
                                <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Edit className="h-4 w-4 mr-1" />
                              Reschedule
                            </Button>
                            <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                                  onClick={() => setSelectedAppointment(appointment)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Cancel Appointment</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to cancel your appointment with {appointment.counselorName} on{" "}
                                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}?
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="cancelReason">Reason for cancellation (optional)</Label>
                                    <Textarea
                                      id="cancelReason"
                                      placeholder="Let us know why you're cancelling..."
                                      value={cancelReason}
                                      onChange={(e) => setCancelReason(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                                    Keep Appointment
                                  </Button>
                                  <Button variant="destructive" onClick={() => handleCancelAppointment(appointment.id)}>
                                    Cancel Appointment
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Appointment History */}
            <TabsContent value="history" className="space-y-6">
              {pastAppointments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No appointment history</h3>
                    <p className="text-muted-foreground">Your completed and cancelled appointments will appear here.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <Card key={appointment.id} className="opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="font-semibold font-[family-name:var(--font-montserrat)]">
                                  {appointment.counselorName}
                                </h3>
                                <p className="text-sm text-muted-foreground">{appointment.counselorTitle}</p>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-3">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {appointment.time} ({appointment.duration} minutes)
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {getTypeIcon(appointment.type)}
                                <span className="text-sm capitalize">{appointment.type}</span>
                                <Badge className={getStatusColor(appointment.status)}>
                                  {appointment.status.toUpperCase()}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Reason:</strong> {appointment.reason}
                            </p>

                            {appointment.notes && (
                              <p className="text-sm text-muted-foreground">
                                <strong>Notes:</strong> {appointment.notes}
                              </p>
                            )}
                          </div>

                          <div className="ml-4">
                            {appointment.status === "completed" && (
                              <Button size="sm" variant="outline" className="bg-transparent">
                                <Plus className="h-4 w-4 mr-1" />
                                Book Again
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
