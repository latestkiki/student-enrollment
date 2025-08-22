"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { GraduationCap, ArrowLeft, CheckCircle, Video, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface TimeSlot {
  time: string
  available: boolean
}

const mockCounselors = [
  { id: "1", name: "Dr. Sarah Johnson", title: "Academic Counselor" },
  { id: "2", name: "Michael Chen", title: "Career Counselor" },
  { id: "3", name: "Dr. Emily Rodriguez", title: "Personal Counselor" },
  { id: "4", name: "James Wilson", title: "Financial Aid Counselor" },
]

const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: false },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: false },
]

export default function BookAppointmentPage() {
  const searchParams = useSearchParams()
  const preselectedCounselor = searchParams.get("counselor")

  const [step, setStep] = useState(1)
  const [selectedCounselor, setSelectedCounselor] = useState(preselectedCounselor || "")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("in-person")
  const [duration, setDuration] = useState("60")
  const [reason, setReason] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsBooked(true)
  }

  const canProceedFromStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return selectedCounselor && appointmentType && duration
      case 2:
        return selectedDate && selectedTime
      case 3:
        return reason.trim().length > 0
      default:
        return true
    }
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-montserrat)]">
                EduConnect
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-montserrat)]">
              Appointment Booked Successfully!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your appointment has been scheduled. You'll receive a confirmation email shortly with all the details.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4">Appointment Details:</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Counselor:</strong> {mockCounselors.find((c) => c.id === selectedCounselor)?.name}
                </p>
                <p>
                  <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedTime}
                </p>
                <p>
                  <strong>Duration:</strong> {duration} minutes
                </p>
                <p>
                  <strong>Type:</strong> {appointmentType.replace("-", " ")}
                </p>
                <p>
                  <strong>Reason:</strong> {reason}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <Button>View My Appointments</Button>
              </Link>
              <Link href="/counseling">
                <Button variant="outline">Back to Counselors</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
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
            <Link href="/counseling">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Counselors</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">Book an Appointment</h2>
            <p className="text-muted-foreground">Schedule a session with one of our counselors</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-12 h-0.5 mx-2 ${step > stepNumber ? "bg-primary" : "bg-muted"}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              {/* Step 1: Select Counselor and Type */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 font-[family-name:var(--font-montserrat)]">
                      Select Counselor & Appointment Type
                    </h3>
                  </div>

                  <div>
                    <Label htmlFor="counselor">Choose a Counselor *</Label>
                    <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a counselor" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCounselors.map((counselor) => (
                          <SelectItem key={counselor.id} value={counselor.id}>
                            {counselor.name} - {counselor.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Appointment Type *</Label>
                    <RadioGroup value={appointmentType} onValueChange={setAppointmentType} className="mt-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-person" id="in-person" />
                        <Label htmlFor="in-person" className="flex items-center space-x-2 cursor-pointer">
                          <MapPin className="h-4 w-4" />
                          <span>In-Person</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="virtual" id="virtual" />
                        <Label htmlFor="virtual" className="flex items-center space-x-2 cursor-pointer">
                          <Video className="h-4 w-4" />
                          <span>Virtual Meeting</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone" className="flex items-center space-x-2 cursor-pointer">
                          <Phone className="h-4 w-4" />
                          <span>Phone Call</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="duration">Session Duration *</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Select Date and Time */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 font-[family-name:var(--font-montserrat)]">
                      Select Date & Time
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Choose Date *</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                        className="rounded-md border"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Available Times *</Label>
                      {selectedDate ? (
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot.time}
                              variant={selectedTime === slot.time ? "default" : "outline"}
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              className="justify-center bg-transparent"
                            >
                              {slot.time}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Please select a date first</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Appointment Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 font-[family-name:var(--font-montserrat)]">
                      Appointment Details
                    </h3>
                  </div>

                  <div>
                    <Label htmlFor="reason">Reason for Appointment *</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the main reason for your appointment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic-planning">Academic Planning</SelectItem>
                        <SelectItem value="course-selection">Course Selection</SelectItem>
                        <SelectItem value="study-skills">Study Skills & Time Management</SelectItem>
                        <SelectItem value="career-guidance">Career Guidance</SelectItem>
                        <SelectItem value="resume-review">Resume Review</SelectItem>
                        <SelectItem value="interview-prep">Interview Preparation</SelectItem>
                        <SelectItem value="stress-management">Stress Management</SelectItem>
                        <SelectItem value="personal-support">Personal Support</SelectItem>
                        <SelectItem value="financial-aid">Financial Aid</SelectItem>
                        <SelectItem value="scholarships">Scholarships</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Please provide any additional information that might help the counselor prepare for your session..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="min-h-24"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review and Confirm */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 font-[family-name:var(--font-montserrat)]">
                      Review & Confirm
                    </h3>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Appointment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Counselor</p>
                          <p>{mockCounselors.find((c) => c.id === selectedCounselor)?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                          <p>
                            {selectedDate?.toLocaleDateString()} at {selectedTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Duration</p>
                          <p>{duration} minutes</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Type</p>
                          <div className="flex items-center space-x-2">
                            {appointmentType === "virtual" && <Video className="h-4 w-4" />}
                            {appointmentType === "phone" && <Phone className="h-4 w-4" />}
                            {appointmentType === "in-person" && <MapPin className="h-4 w-4" />}
                            <span className="capitalize">{appointmentType.replace("-", " ")}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Reason</p>
                        <p>{reason.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>
                      </div>
                      {additionalNotes && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Additional Notes</p>
                          <p className="text-sm">{additionalNotes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Before Your Appointment:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• You'll receive a confirmation email with appointment details</li>
                      <li>• Please arrive 5 minutes early for in-person appointments</li>
                      <li>• For virtual meetings, you'll receive a meeting link via email</li>
                      <li>• You can reschedule or cancel up to 24 hours in advance</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t">
                <Button variant="outline" onClick={handlePrevious} disabled={step === 1} className="bg-transparent">
                  Previous
                </Button>

                {step < 4 ? (
                  <Button onClick={handleNext} disabled={!canProceedFromStep(step)}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Booking...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
