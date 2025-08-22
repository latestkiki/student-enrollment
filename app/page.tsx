import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Shield,
  FileText,
  Building,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">EduEnroll</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/admin">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full"></span>
              </Link>
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

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-sidebar-border bg-sidebar">
          <nav className="p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <BookOpen className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/register">
                <Calendar className="h-4 w-4" />
                Enrollment
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/courses">
                <Users className="h-4 w-4" />
                Courses
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/profile">
                <GraduationCap className="h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/universities">
                <Building className="h-4 w-4" />
                Universities
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/services">
                <Users className="h-4 w-4" />
                Services
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/documents">
                <FileText className="h-4 w-4" />
                Documents
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-emerald-100 hover:text-emerald-700 group"
              asChild
            >
              <Link href="/admin">
                <Shield className="h-4 w-4 group-hover:text-emerald-600" />
                Administration
              </Link>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, John!</h2>
            <p className="text-muted-foreground">Here's what's happening with your enrollment.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">6</div>
                <p className="text-xs text-muted-foreground">+2 from last semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">18</div>
                <p className="text-xs text-muted-foreground">Out of 120 total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GPA</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">3.8</div>
                <p className="text-xs text-muted-foreground">+0.2 from last semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">3</div>
                <p className="text-xs text-muted-foreground">Due this week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Current Courses
                </CardTitle>
                <CardDescription>Your enrolled courses for Spring 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Computer Science 101</h4>
                    <p className="text-sm text-muted-foreground">Prof. Johnson • MWF 9:00 AM</p>
                  </div>
                  <Badge variant="secondary">3 Credits</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Mathematics 201</h4>
                    <p className="text-sm text-muted-foreground">Prof. Smith • TTh 2:00 PM</p>
                  </div>
                  <Badge variant="secondary">4 Credits</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">English Literature</h4>
                    <p className="text-sm text-muted-foreground">Prof. Davis • MWF 11:00 AM</p>
                  </div>
                  <Badge variant="secondary">3 Credits</Badge>
                </div>
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/courses">View All Courses</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enrollment Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Degree Progress
                </CardTitle>
                <CardDescription>Track your progress toward graduation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Core Requirements</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Major Requirements</span>
                    <span>10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Freshman orientation completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Academic advisor meeting scheduled</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start gap-3">
                  <Link href="/register">
                    <Calendar className="h-4 w-4" />
                    New Student Registration
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-3 bg-transparent">
                  <Link href="/courses">
                    <Users className="h-4 w-4" />
                    Browse Courses
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-3 bg-transparent">
                  <Link href="/universities">
                    <Building className="h-4 w-4" />
                    University Research
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                  <BookOpen className="h-4 w-4" />
                  Academic Resources
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-3 bg-transparent">
                  <Link href="/services">
                    <Users className="h-4 w-4" />
                    Educational Services
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-3 bg-transparent">
                  <Link href="/documents">
                    <FileText className="h-4 w-4" />
                    Upload Documents
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-3 bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                >
                  <Link href="/admin">
                    <Shield className="h-4 w-4" />
                    Administration Panel
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest enrollment activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Enrolled in Computer Science 101</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-secondary mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Completed course registration</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Updated academic profile</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
