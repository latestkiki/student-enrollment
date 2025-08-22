"use client"

interface Announcement {
  id: string
  title: string
  content: string
  author: {
    name: string
    role: "admin" | "instructor" | "counselor"
    department?: string
    avatar?: string
  }
  category: "academic" | "administrative" | "events" | "emergency" | "general"
  priority: "low" | "medium" | "high" | "urgent"
  timestamp: string
  expiryDate?: string
  targetAudience: "all" | "students" | "faculty" | "staff"
  tags: string[]
  read: boolean
  starred: boolean
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Emergency: Campus Closure Due to Weather",
    content:
      "Due to severe weather conditions, the campus will be closed today, January 22nd. All classes are cancelled and will be conducted online. Please check your email for virtual meeting links from your instructors.",
    author: {
      name: "Campus Administration",
      role: "admin",
      department: "Administration",
    },
    category: "emergency",
    priority: "urgent",
    timestamp: "2025-01-22T06:00:00",
    expiryDate: "2025-01-23T23:59:59",
    targetAudience: "all",
    tags: ["weather", "closure", "emergency"],
    read: false,
    starred: true,
  },
  {
    id: "2",
    title: "Spring 2025 Registration Opens Monday",
    content:
      "Registration for Spring 2025 courses begins Monday, January 27th at 8:00 AM. Priority registration for seniors starts Friday, January 24th. Please meet with your academic advisor before registering to ensure you're on track for graduation.",
    author: {
      name: "Registrar's Office",
      role: "admin",
      department: "Academic Affairs",
    },
    category: "academic",
    priority: "high",
    timestamp: "2025-01-21T09:00:00",
    expiryDate: "2025-01-27T23:59:59",
    targetAudience: "students",
    tags: ["registration", "spring-2025", "courses"],
    read: true,
    starred: false,
  },
  {
    id: "3",
    title: "Career Fair 2025 - February 15th",
    content:
      "Join us for the annual Career Fair on February 15th from 10 AM to 4 PM in the Student Center. Over 100 companies will be present, including tech giants, healthcare organizations, and local businesses. Bring multiple copies of your resume!",
    author: {
      name: "Michael Chen",
      role: "counselor",
      department: "Career Services",
      avatar: "/professional-career-counselor.png",
    },
    category: "events",
    priority: "medium",
    timestamp: "2025-01-20T14:30:00",
    expiryDate: "2025-02-15T23:59:59",
    targetAudience: "students",
    tags: ["career-fair", "networking", "jobs"],
    read: true,
    starred: true,
  },
  {
    id: "4",
    title: "Library Extended Hours During Finals",
    content:
      "The library will extend its hours during finals week (January 27 - February 2). We'll be open 24/7 to provide students with quiet study spaces. Additional study rooms and computer labs will also be available.",
    author: {
      name: "Library Services",
      role: "admin",
      department: "Library",
    },
    category: "academic",
    priority: "medium",
    timestamp: "2025-01-19T11:15:00",
    expiryDate: "2025-02-02T23:59:59",
    targetAudience: "students",
    tags: ["library", "finals", "study-hours"],
    read: false,
    starred: false,
  },
  {
    id: "5",
    title: "Mental Health Awareness Week",
    content:
      "Join us for Mental Health Awareness Week from January 28 - February 1. Events include stress management workshops, meditation sessions, therapy dog visits, and free mental health screenings. Your wellbeing matters!",
    author: {
      name: "Dr. Emily Rodriguez",
      role: "counselor",
      department: "Student Wellness",
      avatar: "/professional-woman-therapist.png",
    },
    category: "events",
    priority: "medium",
    timestamp: "2025-01-18T16:00:00",
    expiryDate: "2025-02-01T23:59:59",
    targetAudience: "all",
    tags: ["mental-health", "wellness", "events"],
    read: true,
    starred: false,
  },
  {
    id: "6",
    title: "New Parking Regulations Effective February 1st",
    content:\
      "\
