import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Clock, Users, CheckCircle, GraduationCap, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function CounsellingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/services" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Services
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <MessageCircle className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">Counselling Session</h1>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/">Dashboard</Link>
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Professional Counselling Session</CardTitle>
                    <CardDescription className="text-lg">
                      One-on-one guidance for your academic and career journey
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Get personalized guidance through Google Meet sessions with our experienced counsellors. Receive
                  complete transparency about your case for studying or working overseas. Our flexible pricing ensures
                  you get the support you need within your budget.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>One-on-one consultation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>Google Meet sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>Flexible pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span>Expert counsellors</span>
                  </div>
                </div>

                {/* Session Details */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">What's Included:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Comprehensive case analysis</li>
                    <li>• Study/work overseas guidance</li>
                    <li>• University selection advice</li>
                    <li>• Visa application strategy</li>
                    <li>• Career pathway planning</li>
                    <li>• Follow-up recommendations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Book Your Session</CardTitle>
                <CardDescription>Fill out the form below to schedule your counselling session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Area of Interest</label>
                  <select className="w-full p-2 border border-input rounded-md">
                    <option>Select your area of interest</option>
                    <option>Study Abroad - Undergraduate</option>
                    <option>Study Abroad - Graduate</option>
                    <option>Work Visa Consultation</option>
                    <option>Career Guidance</option>
                    <option>University Selection</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Additional Details</label>
                  <Textarea placeholder="Tell us more about your goals and specific questions..." rows={4} />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book Session - From $50</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Session Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">From $50</div>
                  <p className="text-sm text-muted-foreground">Flexible pricing based on your needs</p>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-sm">Duration:</span>
                    <span className="text-sm font-medium">45-60 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Platform:</span>
                    <span className="text-sm font-medium">Google Meet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Response Time:</span>
                    <span className="text-sm font-medium">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Follow-up:</span>
                    <span className="text-sm font-medium">Email summary</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Counsellor Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Our Counsellors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Expert Team</p>
                      <p className="text-sm text-muted-foreground">10+ years experience</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Our counsellors have helped thousands of students achieve their academic and career goals with
                    personalized guidance and proven strategies.
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Study Abroad</Badge>
                    <Badge variant="secondary">Visa Guidance</Badge>
                    <Badge variant="secondary">Career Planning</Badge>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Direct Contact</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      <a
                        href="mailto:knancyticharwa@gmail.com"
                        className="text-emerald-600 hover:text-emerald-700 hover:underline"
                      >
                        knancyticharwa@gmail.com
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Reach out directly for immediate assistance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about our counselling services? We're here to help!
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
