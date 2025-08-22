import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Users,
  FileText,
  Plane,
  GraduationCap,
  BookOpen,
  MessageCircle,
  Award,
  Globe,
  Video,
  Hotel,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Counselling Session",
      description:
        "Google Meet session with our counsellors. Get transparency on your case for study/work overseas. Charges fully adjustable in services' pricing.",
      icon: MessageCircle,
      badge: null,
      price: "From $50",
    },
    {
      id: 2,
      title: "Research Paper Drafting & Publishing Help",
      description:
        "Publishing credible research papers with your name on them can help boost your profile! Extremely crucial for MS/PhD and O-1/EB-1 visa applicants.",
      icon: FileText,
      badge: "ON FIRE",
      badgeColor: "bg-orange-500",
      price: "From $200",
    },
    {
      id: 3,
      title: "Visa Application Help",
      description:
        "Ace the visa application through our help in the paperwork, financial planning, and visa Interview mock rounds. Applicable for USA, Canada, UK, Germany, and more.",
      icon: Plane,
      badge: "ON FIRE",
      badgeColor: "bg-orange-500",
      price: "From $150",
    },
    {
      id: 4,
      title: "Apply For An EB-1 Visa",
      description:
        "The EB-1 visa is a talent-based immigrant visa in the US for individuals with extraordinary ability in their field.",
      icon: Award,
      badge: "ON FIRE",
      badgeColor: "bg-orange-500",
      price: "From $500",
    },
    {
      id: 5,
      title: "Complete Application Help",
      description: "Get your application into the top 10% of the applications the committee evaluates for admission.",
      icon: GraduationCap,
      badge: "POPULAR",
      badgeColor: "bg-green-500",
      price: "From $300",
    },
    {
      id: 6,
      title: "Profile Evaluation & University Shortlisting",
      description:
        "Use my pruning strategy to get admits from the best universities your profile can get you into without wasting money.",
      icon: Users,
      badge: null,
      price: "From $75",
    },
    {
      id: 7,
      title: "Statement of Purpose/Essay Drafting",
      description:
        "Ivy league graduates work FROM SCRATCH or with your existing draft, zero plagiarism, and unlimited changes - free of charge.",
      icon: BookOpen,
      badge: null,
      price: "From $100",
    },
    {
      id: 8,
      title: "Apply For An O-1 Visa",
      description:
        "The O-1 visa is a talent-based non-immigrant work visa in the US for individuals with extra-ordinary ability in their field.",
      icon: Globe,
      badge: "ON FIRE",
      badgeColor: "bg-orange-500",
      price: "From $400",
    },
    {
      id: 9,
      title: "US Visa Mock Interview",
      description:
        "The final step to your US visa is a Visa interview with an officer from the US consulate. Ace the interview with proven tricks and techniques.",
      icon: Video,
      badge: null,
      price: "From $60",
    },
    {
      id: 10,
      title: "Flight Booking Service",
      description:
        "Book flights for your academic journey with special student discounts. We help you find the best deals for study abroad programs and university visits.",
      icon: Plane,
      badge: "NEW",
      badgeColor: "bg-blue-500",
      price: "From $15",
    },
    {
      id: 11,
      title: "Hotel Booking Service",
      description:
        "Find comfortable accommodations near universities and study centers. Student-friendly properties with study areas and special rates available.",
      icon: Hotel,
      badge: "NEW",
      badgeColor: "bg-green-500",
      price: "From $10",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">EduEnroll Services</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Back to Dashboard</Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">JS</span>
              </div>
              <span className="text-sm font-medium">John Student</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Search Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Educational Services</h2>
          <p className="text-muted-foreground mb-6">
            Discover professional services to enhance your academic journey and career prospects.
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for a Service" className="pl-10 h-12 text-base" />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-yellow-400 hover:bg-yellow-500 text-black">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="relative hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
              >
                {service.badge && (
                  <div
                    className={`absolute -top-2 -right-2 ${service.badgeColor} text-white px-3 py-1 text-xs font-bold rounded-full transform rotate-12 z-10`}
                  >
                    {service.badge}
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">{service.price}</span>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                      <Link href={getServiceLink(service.id)}>Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Need Custom Assistance?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the service you're looking for? Our expert counselors are here to help you with personalized
                guidance for your academic and career goals.
              </p>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Contact Our Counselors
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Helper function to generate service links
function getServiceLink(serviceId: number) {
  const serviceRoutes = {
    1: "/services/counselling",
    2: "/services/research-paper",
    3: "/services/visa-application",
    4: "/services/eb1-visa",
    5: "/services/application-help",
    6: "/services/profile-evaluation",
    7: "/services/essay-drafting",
    8: "/services/o1-visa",
    9: "/services/visa-interview",
    10: "/services/flight-booking",
    11: "/services/hotel-booking",
  }
  return serviceRoutes[serviceId as keyof typeof serviceRoutes] || "/services"
}
