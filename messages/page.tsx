"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, MessageSquare, Send, Search, Plus, Clock, Star, Archive, Trash2, Reply } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  from: {
    name: string
    email: string
    role: "student" | "instructor" | "counselor" | "admin"
    avatar?: string
  }
  to: {
    name: string
    email: string
  }
  subject: string
  content: string
  timestamp: string
  read: boolean
  starred: boolean
  category: "academic" | "administrative" | "counseling" | "general"
}

const mockMessages: Message[] = [
  {
    id: "1",
    from: {
      name: "Dr. Sarah Johnson",
      email: "s.johnson@educonnect.edu",
      role: "instructor",
      avatar: "/professional-woman-counselor.png",
    },
    to: {
      name: "You",
      email: "student@educonnect.edu",
    },
    subject: "Assignment 3 Feedback",
    content:
      "Great work on your latest programming assignment! Your implementation of the sorting algorithm was particularly impressive. I've left some detailed comments in the code review. Keep up the excellent work!",
    timestamp: "2025-01-22T14:30:00",
    read: false,
    starred: true,
    category: "academic",
  },
  {
    id: "2",
    from: {
      name: "Michael Chen",
      email: "m.chen@educonnect.edu",
      role: "counselor",
      avatar: "/professional-career-counselor.png",
    },
    to: {
      name: "You",
      email: "student@educonnect.edu",
    },
    subject: "Career Fair Opportunities",
    content:
      "Hi! I wanted to follow up on our recent career counseling session. The upcoming career fair has several companies that align with your interests in technology. I've attached a list of participating companies and their booth numbers.",
    timestamp: "2025-01-21T10:15:00",
    read: true,
    starred: false,
    category: "counseling",
  },
  {
    id: "3",
    from: {
      name: "Admissions Office",
      email: "admissions@educonnect.edu",
      role: "admin",
    },
    to: {
      name: "You",
      email: "student@educonnect.edu",
    },
    subject: "Spring 2025 Registration Reminder",
    content:
      "This is a friendly reminder that registration for Spring 2025 courses opens next Monday at 8:00 AM. Please review your academic plan with your advisor before registering.",
    timestamp: "2025-01-20T09:00:00",
    read: true,
    starred: false,
    category: "administrative",
  },
  {
    id: "4",
    from: {
      name: "Dr. Emily Rodriguez",
      email: "e.rodriguez@educonnect.edu",
      role: "counselor",
      avatar: "/professional-woman-therapist.png",
    },
    to: {
      name: "You",
      email: "student@educonnect.edu",
    },
    subject: "Appointment Confirmation",
    content:
      "This confirms your counseling appointment scheduled for Thursday, January 25th at 3:30 PM in the Student Wellness Center, Room 301. Please arrive 5 minutes early.",
    timestamp: "2025-01-19T16:45:00",
    read: true,
    starred: false,
    category: "counseling",
  },
  {
    id: "5",
    from: {
      name: "Library Services",
      email: "library@educonnect.edu",
      role: "admin",
    },
    to: {
      name: "You",
      email: "student@educonnect.edu",
    },
    subject: "Book Return Reminder",
    content:
      "You have 2 books due for return by January 25th. You can renew them online or return them to any library location. Late fees apply after the due date.",
    timestamp: "2025-01-18T11:20:00",
    read: false,
    starred: false,
    category: "administrative",
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    content: "",
    category: "general" as const,
  })

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadCount = messages.filter((m) => !m.read).length
  const starredMessages = messages.filter((m) => m.starred)

  const markAsRead = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)))
  }

  const toggleStar = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, starred: !msg.starred } : msg)))
  }

  const deleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
    setSelectedMessage(null)
  }

  const sendMessage = () => {
    // Simulate sending message
    console.log("[v0] Sending message:", newMessage)
    setNewMessage({ to: "", subject: "", content: "", category: "general" })
    setIsComposeOpen(false)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "instructor":
        return "bg-blue-100 text-blue-800"
      case "counselor":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800"
      case "counseling":
        return "bg-green-100 text-green-800"
      case "administrative":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <Link href="/discussions">
                <Button variant="outline">Discussions</Button>
              </Link>
              <Link href="/announcements">
                <Button variant="outline">Announcements</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">Messages</h2>
              <p className="text-muted-foreground">Communicate with instructors, counselors, and staff</p>
            </div>

            <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Compose Message
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Compose New Message</DialogTitle>
                  <DialogDescription>Send a message to faculty or staff members.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="to">To</Label>
                    <Select
                      value={newMessage.to}
                      onValueChange={(value) => setNewMessage({ ...newMessage, to: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s.johnson@educonnect.edu">Dr. Sarah Johnson (Instructor)</SelectItem>
                        <SelectItem value="m.chen@educonnect.edu">Michael Chen (Career Counselor)</SelectItem>
                        <SelectItem value="e.rodriguez@educonnect.edu">Dr. Emily Rodriguez (Counselor)</SelectItem>
                        <SelectItem value="admissions@educonnect.edu">Admissions Office</SelectItem>
                        <SelectItem value="library@educonnect.edu">Library Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newMessage.category}
                      onValueChange={(value: "academic" | "administrative" | "counseling" | "general") =>
                        setNewMessage({ ...newMessage, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="counseling">Counseling</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                      placeholder="Enter message subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Message</Label>
                    <Textarea
                      id="content"
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                      placeholder="Type your message here..."
                      className="min-h-32"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={sendMessage} disabled={!newMessage.to || !newMessage.subject || !newMessage.content}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Inbox</CardTitle>
                    <Badge variant="secondary">{unreadCount} unread</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="unread">Unread</TabsTrigger>
                      <TabsTrigger value="starred">Starred</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-2 mt-4">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedMessage?.id === message.id ? "bg-muted border-primary" : ""
                          } ${!message.read ? "border-l-4 border-l-primary" : ""}`}
                          onClick={() => {
                            setSelectedMessage(message)
                            if (!message.read) markAsRead(message.id)
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.from.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {message.from.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className={`text-sm truncate ${!message.read ? "font-semibold" : ""}`}>
                                  {message.from.name}
                                </p>
                                <div className="flex items-center space-x-1">
                                  {message.starred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(message.timestamp).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <p
                                className={`text-sm truncate mb-1 ${!message.read ? "font-medium" : "text-muted-foreground"}`}
                              >
                                {message.subject}
                              </p>
                              <div className="flex items-center justify-between">
                                <Badge className={getRoleColor(message.from.role)} variant="secondary">
                                  {message.from.role}
                                </Badge>
                                <Badge className={getCategoryColor(message.category)} variant="outline">
                                  {message.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="unread" className="space-y-2 mt-4">
                      {filteredMessages
                        .filter((m) => !m.read)
                        .map((message) => (
                          <div
                            key={message.id}
                            className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border-l-4 border-l-primary ${
                              selectedMessage?.id === message.id ? "bg-muted border-primary" : ""
                            }`}
                            onClick={() => {
                              setSelectedMessage(message)
                              markAsRead(message.id)
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={message.from.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {message.from.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-sm font-semibold truncate">{message.from.name}</p>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(message.timestamp).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm font-medium truncate mb-1">{message.subject}</p>
                                <Badge className={getRoleColor(message.from.role)} variant="secondary">
                                  {message.from.role}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="starred" className="space-y-2 mt-4">
                      {starredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedMessage?.id === message.id ? "bg-muted border-primary" : ""
                          }`}
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.from.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {message.from.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm truncate">{message.from.name}</p>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(message.timestamp).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{message.subject}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={selectedMessage.from.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {selectedMessage.from.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold font-[family-name:var(--font-montserrat)]">
                            {selectedMessage.subject}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-muted-foreground">From: {selectedMessage.from.name}</span>
                            <Badge className={getRoleColor(selectedMessage.from.role)} variant="secondary">
                              {selectedMessage.from.role}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(selectedMessage.timestamp).toLocaleString()}
                            </span>
                            <Badge className={getCategoryColor(selectedMessage.category)} variant="outline">
                              {selectedMessage.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStar(selectedMessage.id)}
                          className="bg-transparent"
                        >
                          <Star
                            className={`h-4 w-4 ${selectedMessage.starred ? "fill-yellow-400 text-yellow-400" : ""}`}
                          />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMessage(selectedMessage.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground leading-relaxed">{selectedMessage.content}</p>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t">
                      <Button>
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        Forward
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a message</h3>
                    <p className="text-muted-foreground">Choose a message from your inbox to read its contents.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
