import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Award, CheckCircle, Star, ArrowLeft, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ResearchPaperPage() {
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
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">Research Paper Drafting & Publishing</h1>
            <Badge className="bg-orange-500 hover:bg-orange-600">ON FIRE</Badge>
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
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Research Paper Drafting & Publishing Help</CardTitle>
                    <CardDescription className="text-lg">
                      Boost your academic profile with credible research publications
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Publishing credible research papers with your name can significantly boost your academic profile! This
                  service is extremely crucial for MS/PhD applications and O-1/EB-1 visa applicants who need to
                  demonstrate extraordinary ability in their field.
                </p>

                {/* Key Benefits */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Why Research Publications Matter:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <span>Essential for MS/PhD applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <span>Critical for O-1/EB-1 visa applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <span>Demonstrates expertise in your field</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <span>Increases academic credibility</span>
                    </li>
                  </ul>
                </div>

                {/* Process */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Our Research Paper Process:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          1
                        </div>
                        <span className="font-medium">Topic Selection</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Identify relevant research topics in your field</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          2
                        </div>
                        <span className="font-medium">Research & Writing</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Comprehensive research and professional writing</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          3
                        </div>
                        <span className="font-medium">Journal Selection</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Target appropriate journals for publication</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          4
                        </div>
                        <span className="font-medium">Publication Support</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Complete support through publication process</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Form */}
            <Card>
              <CardHeader>
                <CardTitle>Start Your Research Paper Project</CardTitle>
                <CardDescription>Tell us about your research interests and academic goals</CardDescription>
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
                    <label className="text-sm font-medium mb-2 block">Academic Level</label>
                    <select className="w-full p-2 border border-input rounded-md">
                      <option>Select your level</option>
                      <option>Undergraduate</option>
                      <option>Master's Student</option>
                      <option>PhD Candidate</option>
                      <option>Professional</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Field of Study</label>
                    <Input placeholder="e.g., Computer Science, Biology" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Research Area of Interest</label>
                  <Textarea
                    placeholder="Describe your research interests and the topics you'd like to explore..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Purpose</label>
                  <select className="w-full p-2 border border-input rounded-md">
                    <option>Select purpose</option>
                    <option>MS/PhD Application</option>
                    <option>O-1 Visa Application</option>
                    <option>EB-1 Visa Application</option>
                    <option>Academic Career</option>
                    <option>Professional Development</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Timeline</label>
                  <select className="w-full p-2 border border-input rounded-md">
                    <option>Select timeline</option>
                    <option>1-2 months</option>
                    <option>3-4 months</option>
                    <option>5-6 months</option>
                    <option>6+ months</option>
                  </select>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Get Started - From $200</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">From $200</div>
                  <p className="text-sm text-muted-foreground">Based on research complexity</p>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-sm">Timeline:</span>
                    <span className="text-sm font-medium">1-6 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Revisions:</span>
                    <span className="text-sm font-medium">Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Publication Support:</span>
                    <span className="text-sm font-medium">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Your Name:</span>
                    <span className="text-sm font-medium">As Author</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Success Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm font-medium">Sarah M.</p>
                    <p className="text-xs text-muted-foreground mb-2">PhD in Computer Science</p>
                    <p className="text-sm">"Published 3 papers that helped me get into Stanford!"</p>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm font-medium">David L.</p>
                    <p className="text-xs text-muted-foreground mb-2">O-1 Visa Applicant</p>
                    <p className="text-sm">"Research publications were key to my visa approval."</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expertise Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Research Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Computer Science</Badge>
                  <Badge variant="secondary">Engineering</Badge>
                  <Badge variant="secondary">Business</Badge>
                  <Badge variant="secondary">Medicine</Badge>
                  <Badge variant="secondary">Psychology</Badge>
                  <Badge variant="secondary">Biology</Badge>
                  <Badge variant="secondary">Physics</Badge>
                  <Badge variant="secondary">Economics</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  We cover all major academic disciplines with expert researchers in each field.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
