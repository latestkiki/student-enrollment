"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, ChevronLeft, ChevronRight, Upload, FileText, CheckCircle, User, BookOpen } from "lucide-react"
import Link from "next/link"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string

  // Academic Information
  program: string
  startTerm: string
  previousEducation: string
  gpa: string

  // Documents
  transcript: File | null
  idDocument: File | null
  essayFile: File | null

  // Additional Information
  essay: string
  emergencyContact: string
  emergencyPhone: string
  specialNeeds: string

  // Agreements
  termsAccepted: boolean
  privacyAccepted: boolean
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  program: "",
  startTerm: "",
  previousEducation: "",
  gpa: "",
  transcript: null,
  idDocument: null,
  essayFile: null,
  essay: "",
  emergencyContact: "",
  emergencyPhone: "",
  specialNeeds: "",
  termsAccepted: false,
  privacyAccepted: false,
}

export default function EnrollmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: keyof FormData, file: File | null) => {
    updateFormData(field, file)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would typically send the data to your backend
    console.log("[v0] Enrollment form submitted:", formData)

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
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
              Application Submitted Successfully!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your application. We've received your enrollment request and will review it within 3-5
              business days.
            </p>
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-2">Application ID: #ENR-2025-001</h3>
              <p className="text-sm text-muted-foreground">
                Please save this ID for your records. You can use it to track your application status.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/application-status">
                <Button>Track Application</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Return Home</Button>
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
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-montserrat)]">
              Student Enrollment Application
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              <Progress value={progress} className="flex-1" />
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className={currentStep >= 1 ? "text-primary font-medium" : ""}>Personal Info</span>
              <span className={currentStep >= 2 ? "text-primary font-medium" : ""}>Academic Info</span>
              <span className={currentStep >= 3 ? "text-primary font-medium" : ""}>Documents</span>
              <span className={currentStep >= 4 ? "text-primary font-medium" : ""}>Review & Submit</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold font-[family-name:var(--font-montserrat)]">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => updateFormData("city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => updateFormData("state", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => updateFormData("zipCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold font-[family-name:var(--font-montserrat)]">
                      Academic Information
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="program">Program of Interest *</Label>
                      <Select value={formData.program} onValueChange={(value) => updateFormData("program", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="business-admin">Business Administration</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="psychology">Psychology</SelectItem>
                          <SelectItem value="nursing">Nursing</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="arts">Liberal Arts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="startTerm">Preferred Start Term *</Label>
                      <Select value={formData.startTerm} onValueChange={(value) => updateFormData("startTerm", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select start term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fall-2025">Fall 2025</SelectItem>
                          <SelectItem value="spring-2026">Spring 2026</SelectItem>
                          <SelectItem value="summer-2026">Summer 2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="previousEducation">Highest Level of Education *</Label>
                      <Select
                        value={formData.previousEducation}
                        onValueChange={(value) => updateFormData("previousEducation", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School Diploma</SelectItem>
                          <SelectItem value="some-college">Some College</SelectItem>
                          <SelectItem value="associates">Associate's Degree</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="doctorate">Doctorate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="gpa">GPA (if applicable)</Label>
                      <Input
                        id="gpa"
                        placeholder="e.g., 3.5"
                        value={formData.gpa}
                        onChange={(e) => updateFormData("gpa", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="essay">Personal Statement *</Label>
                    <Textarea
                      id="essay"
                      placeholder="Tell us about yourself, your goals, and why you want to join our program..."
                      value={formData.essay}
                      onChange={(e) => updateFormData("essay", e.target.value)}
                      className="min-h-32"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialNeeds">Special Accommodations</Label>
                    <Textarea
                      id="specialNeeds"
                      placeholder="Please describe any special accommodations you may need..."
                      value={formData.specialNeeds}
                      onChange={(e) => updateFormData("specialNeeds", e.target.value)}
                      className="min-h-24"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold font-[family-name:var(--font-montserrat)]">
                      Required Documents
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Official Transcript *</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload your official academic transcript (PDF format preferred)
                        </p>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload("transcript", e.target.files?.[0] || null)}
                          className="max-w-xs mx-auto"
                        />
                        {formData.transcript && (
                          <p className="text-sm text-green-600 mt-2">✓ {formData.transcript.name} uploaded</p>
                        )}
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Government ID *</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload a copy of your driver's license, passport, or state ID
                        </p>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload("idDocument", e.target.files?.[0] || null)}
                          className="max-w-xs mx-auto"
                        />
                        {formData.idDocument && (
                          <p className="text-sm text-green-600 mt-2">✓ {formData.idDocument.name} uploaded</p>
                        )}
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Personal Statement (Optional)</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload additional essay or personal statement if preferred over text entry
                        </p>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload("essayFile", e.target.files?.[0] || null)}
                          className="max-w-xs mx-auto"
                        />
                        {formData.essayFile && (
                          <p className="text-sm text-green-600 mt-2">✓ {formData.essayFile.name} uploaded</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Document Requirements:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Maximum file size: 10MB per document</li>
                      <li>• Accepted formats: PDF, JPG, PNG, DOC, DOCX</li>
                      <li>• Documents must be clear and legible</li>
                      <li>• All documents will be kept confidential</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold font-[family-name:var(--font-montserrat)]">Review & Submit</h3>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>
                          <strong>Name:</strong> {formData.firstName} {formData.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {formData.phone}
                        </p>
                        <p>
                          <strong>Address:</strong> {formData.address}, {formData.city}, {formData.state}{" "}
                          {formData.zipCode}
                        </p>
                        <p>
                          <strong>Emergency Contact:</strong> {formData.emergencyContact} ({formData.emergencyPhone})
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Academic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>
                          <strong>Program:</strong> {formData.program}
                        </p>
                        <p>
                          <strong>Start Term:</strong> {formData.startTerm}
                        </p>
                        <p>
                          <strong>Previous Education:</strong> {formData.previousEducation}
                        </p>
                        {formData.gpa && (
                          <p>
                            <strong>GPA:</strong> {formData.gpa}
                          </p>
                        )}
                        {formData.essay && (
                          <div>
                            <strong>Personal Statement:</strong>
                            <p className="text-sm text-muted-foreground mt-1 p-3 bg-muted/50 rounded">
                              {formData.essay.substring(0, 200)}...
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Documents</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Transcript: {formData.transcript?.name || "Not uploaded"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>ID Document: {formData.idDocument?.name || "Not uploaded"}</span>
                        </div>
                        {formData.essayFile && (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Essay File: {formData.essayFile.name}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and acknowledge that all information provided is accurate and complete. *
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacy"
                          checked={formData.privacyAccepted}
                          onCheckedChange={(checked) => updateFormData("privacyAccepted", checked)}
                        />
                        <Label htmlFor="privacy" className="text-sm">
                          I agree to the{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>{" "}
                          and consent to the processing of my personal data for enrollment purposes. *
                        </Label>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">Before You Submit:</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Review all information for accuracy</li>
                        <li>• Ensure all required documents are uploaded</li>
                        <li>• Application fee of $50 will be processed after submission</li>
                        <li>• You will receive a confirmation email within 24 hours</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                {currentStep < totalSteps ? (
                  <Button onClick={nextStep} className="flex items-center space-x-2">
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.termsAccepted || !formData.privacyAccepted || isSubmitting}
                    className="flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <CheckCircle className="h-4 w-4" />
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
