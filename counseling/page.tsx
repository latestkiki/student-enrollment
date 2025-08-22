"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GraduationCap,
  Calendar,
  User,
  Heart,
  Briefcase,
  BookOpen,
  Search,
  Star,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"

interface Counselor {
  id: string
  name: string
  title: string
  specialties: string[]
  rating: number
  experience: string
  location: string
  email: string
  phone: string
  bio: string
  availability: string[]
  image: string
}

const mockCounselors: Counselor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Academic Counselor",
    specialties: ["Academic Planning", "Study Skills", "Time Management"],
    rating: 4.9,
    experience: "8 years",
    location: "Main Campus - Building A, Room 201",
    email: "s.johnson@educonnect.edu",
    phone: "(555) 123-4567",
    bio: "Dr. Johnson specializes in helping students develop effective study strategies and academic planning. She has extensive experience in supporting students through academic challenges and helping them achieve their educational goals.",
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
    image: "/professional-woman-counselor.png",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Career Counselor",
    specialties: ["Career Planning", "Resume Building", "Interview Prep"],
    rating: 4.8,
    experience: "6 years",
    location: "Career Services Center - Room 105",
    email: "m.chen@educonnect.edu",
    phone: "(555) 234-5678",
    bio: "Michael helps students explore career paths, develop professional skills, and prepare for the job market. He has strong connections with local employers and provides valuable networking opportunities.",
    availability: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    image: "/professional-career-counselor.png",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    title: "Personal Counselor",
    specialties: ["Stress Management", "Mental Health", "Personal Development"],
    rating: 4.9,
    experience: "10 years",
    location: "Student Wellness Center - Room 301",
    email: "e.rodriguez@educonnect.edu",
    phone: "(555) 345-6789",
    bio: "Dr. Rodriguez provides personal counseling services to help students manage stress, anxiety, and other personal challenges. She creates a safe and supportive environment for students to discuss their concerns.",
    availability: ["Monday", "Tuesday", "Thursday", "Friday"],
    image: "/professional-woman-therapist.png",
  },
  {
    id: "4",
    name: "James Wilson",
    title: "Financial Aid Counselor",
    specialties: ["Financial Aid", "Scholarships", "Student Loans"],
    rating: 4.7,
    experience: "5 years",
    location: "Financial Aid Office - Room 150",
    email: "j.wilson@educonnect.edu",
    phone: "(555) 456-7890",
    bio: "James assists students with financial aid applications, scholarship opportunities, and understanding student loan options. He helps make education more affordable and accessible.",
    availability: ["Monday", "Wednesday", "Thursday", "Friday"],
    image: "/professional-financial-advisor.png",
  },
]

export default function CounselingPage() {
  const [counselors, setCounselors] = useState<Counselor[]>(mockCounselors)
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSearch =
      counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty =
      specialtyFilter === "all" ||
      counselor.specialties.some((specialty) => specialty.toLowerCase().includes(specialtyFilter.toLowerCase()))
    return matchesSearch && matchesSpecialty
  })

  const allSpecialties = Array.from(new Set(counselors.flatMap((c) => c.specialties)))

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
              <Link href="/appointments">
                <Button variant="outline">My Appointments</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-[family-name:var(--font-montserrat)]">
            Counseling & Support Services
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Get the guidance and support you need to succeed academically, professionally, and personally. Our
            experienced counselors are here to help you navigate your educational journey.
          </p>
          <Link href="/appointments/book">
            <Button size="lg" className="text-lg px-8">
              <Calendar className="h-5 w-5 mr-2" />
              Book an Appointment
            </Button>
          </Link>
        </section>

        {/* Services Overview */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center font-[family-name:var(--font-montserrat)]">
            Our Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2 font-[family-name:var(--font-montserrat)]">Academic Counseling</h4>
                <p className="text-sm text-muted-foreground">
                  Course planning, study strategies, and academic goal setting
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2 font-[family-name:var(--font-montserrat)]">Career Guidance</h4>
                <p className="text-sm text-muted-foreground">
                  Career exploration, resume building, and job search support
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2 font-[family-name:var(--font-montserrat)]">Personal Support</h4>
                <p className="text-sm text-muted-foreground">
                  Stress management, mental health support, and personal development
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2 font-[family-name:var(--font-montserrat)]">Financial Aid</h4>
                <p className="text-sm text-muted-foreground">
                  Scholarship guidance, financial planning, and aid applications
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Counselor Directory */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold font-[family-name:var(--font-montserrat)]">Meet Our Counselors</h3>
            <Badge variant="secondary" className="text-sm">
              {filteredCounselors.length} counselors available
            </Badge>
          </div>

          {/* Search and Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search counselors by name, title, or specialty..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Filter by specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {allSpecialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty.toLowerCase()}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Counselors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounselors.map((counselor) => (
              <Card key={counselor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={counselor.image || "/placeholder.svg"}
                      alt={counselor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg font-[family-name:var(--font-montserrat)]">
                        {counselor.name}
                      </h4>
                      <p className="text-muted-foreground">{counselor.title}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{counselor.rating}</span>
                        <span className="text-sm text-muted-foreground">• {counselor.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {counselor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{counselor.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{counselor.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{counselor.phone}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">{counselor.bio}</p>

                    <div>
                      <p className="text-sm font-medium mb-1">Available:</p>
                      <div className="flex flex-wrap gap-1">
                        {counselor.availability.map((day) => (
                          <Badge key={day} variant="outline" className="text-xs">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Link href={`/appointments/book?counselor=${counselor.id}`} className="flex-1">
                        <Button className="w-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Appointment
                        </Button>
                      </Link>
                      <Link href={`/counseling/${counselor.id}`}>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCounselors.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No counselors found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </section>

        {/* Emergency Support */}
        <section className="mt-12">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Need Immediate Support?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 mb-4">
                If you're experiencing a mental health crisis or need immediate assistance, please contact:
              </p>
              <div className="space-y-2 text-red-800">
                <p>
                  <strong>Campus Crisis Line:</strong> (555) 911-HELP (4357)
                </p>
                <p>
                  <strong>National Suicide Prevention Lifeline:</strong> 988
                </p>
                <p>
                  <strong>Campus Security:</strong> (555) 123-SAFE (7233)
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
