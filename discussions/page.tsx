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
import {
  GraduationCap,
  MessageSquare,
  Search,
  Plus,
  ThumbsUp,
  MessageCircle,
  Pin,
  Clock,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

interface Discussion {
  id: string
  title: string
  content: string
  author: {
    name: string
    role: "student" | "instructor" | "counselor" | "admin"
    avatar?: string
  }
  category: "academic" | "general" | "course-specific" | "announcements"
  course?: string
  timestamp: string
  replies: number
  likes: number
  pinned: boolean
  tags: string[]
}

interface Reply {
  id: string
  discussionId: string
  content: string
  author: {
    name: string
    role: "student" | "instructor" | "counselor" | "admin"
    avatar?: string
  }
  timestamp: string
  likes: number
}

const mockDiscussions: Discussion[] = [
  {
    id: "1",
    title: "Study Group for CS 101 Final Exam",
    content:
      "Hey everyone! I'm organizing a study group for the CS 101 final exam. We'll meet this Saturday at 2 PM in the library. Topics will include algorithms, data structures, and programming concepts. Let me know if you're interested!",
    author: {
      name: "Alex Johnson",
      role: "student",
    },
    category: "course-specific",
    course: "CS 101",
    timestamp: "2025-01-22T10:30:00",
    replies: 8,
    likes: 12,
    pinned: false,
    tags: ["study-group", "final-exam", "cs101"],
  },
  {
    id: "2",
    title: "Important: Spring 2025 Registration Updates",
    content:
      "Please note the following updates for Spring 2025 registration: Registration opens Monday at 8 AM. Priority registration for seniors begins Friday. New course offerings have been added to the catalog. Check your email for detailed information.",
    author: {
      name: "Dr. Sarah Johnson",
      role: "instructor",
      avatar: "/professional-woman-counselor.png",
    },
    category: "announcements",
    timestamp: "2025-01-21T14:00:00",
    replies: 3,
    likes: 25,
    pinned: true,
    tags: ["registration", "spring-2025", "important"],
  },
  {
    id: "3",
    title: "Career Fair Networking Tips",
    content:
      "The career fair is coming up next month! Here are some tips for making the most of it: Research companies beforehand, prepare your elevator pitch, bring multiple copies of your resume, dress professionally, and follow up with contacts afterward.",
    author: {
      name: "Michael Chen",
      role: "counselor",
      avatar: "/professional-career-counselor.png",
    },
    category: "general",
    timestamp: "2025-01-20T16:45:00",
    replies: 15,
    likes: 32,
    pinned: false,
    tags: ["career-fair", "networking", "professional-development"],
  },
  {
    id: "4",
    title: "Question about Business Management Assignment",
    content:
      "I'm working on the case study analysis for BUS 201 and I'm having trouble understanding the financial projections section. Has anyone else tackled this part yet? Any insights would be helpful!",
    author: {
      name: "Emma Davis",
      role: "student",
    },
    category: "course-specific",
    course: "BUS 201",
    timestamp: "2025-01-19T11:20:00",
    replies: 6,
    likes: 4,
    pinned: false,
    tags: ["bus201", "assignment-help", "case-study"],
  },
  {
    id: "5",
    title: "Mental Health Resources and Support",
    content:
      "Remember that your mental health is just as important as your academic success. The counseling center offers free services including individual counseling, group therapy, and stress management workshops. Don't hesitate to reach out if you need support.",
    author: {
      name: "Dr. Emily Rodriguez",
      role: "counselor",
      avatar: "/professional-woman-therapist.png",
    },
    category: "general",
    timestamp: "2025-01-18T09:15:00",
    replies: 12,
    likes: 45,
    pinned: true,
    tags: ["mental-health", "counseling", "support"],
  },
]

const mockReplies: Reply[] = [
  {
    id: "1",
    discussionId: "1",
    content: "Count me in! I really need help with the sorting algorithms section.",
    author: {
      name: "Maria Garcia",
      role: "student",
    },
    timestamp: "2025-01-22T11:00:00",
    likes: 3,
  },
  {
    id: "2",
    discussionId: "1",
    content: "Great idea! I can bring some practice problems I've been working on.",
    author: {
      name: "James Wilson",
      role: "student",
    },
    timestamp: "2025-01-22T11:30:00",
    likes: 2,
  },
]

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>(mockDiscussions)
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null)
  const [replies] = useState<Reply[]>(mockReplies)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isNewDiscussionOpen, setIsNewDiscussionOpen] = useState(false)
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "general" as const,
    course: "",
    tags: "",
  })

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || discussion.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const pinnedDiscussions = filteredDiscussions.filter((d) => d.pinned)
  const regularDiscussions = filteredDiscussions.filter((d) => !d.pinned)

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
      case "course-specific":
        return "bg-green-100 text-green-800"
      case "announcements":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const createDiscussion = () => {
    const discussion: Discussion = {
      id: Date.now().toString(),
      title: newDiscussion.title,
      content: newDiscussion.content,
      author: {
        name: "You",
        role: "student",
      },
      category: newDiscussion.category,
      course: newDiscussion.course || undefined,
      timestamp: new Date().toISOString(),
      replies: 0,
      likes: 0,
      pinned: false,
      tags: newDiscussion.tags.split(",").map((tag) => tag.trim()),
    }

    setDiscussions((prev) => [discussion, ...prev])
    setNewDiscussion({ title: "", content: "", category: "general", course: "", tags: "" })
    setIsNewDiscussionOpen(false)
  }

  const discussionReplies = replies.filter((reply) => reply.discussionId === selectedDiscussion?.id)

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
              <Link href="/messages">
                <Button variant="outline">Messages</Button>
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
              <h2 className="text-3xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">Discussion Forums</h2>
              <p className="text-muted-foreground">Connect with your academic community</p>
            </div>

            <Dialog open={isNewDiscussionOpen} onOpenChange={setIsNewDiscussionOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Start New Discussion</DialogTitle>
                  <DialogDescription>
                    Share your thoughts, questions, or announcements with the community.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newDiscussion.title}
                      onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                      placeholder="Enter discussion title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newDiscussion.category}
                      onValueChange={(value: "academic" | "general" | "course-specific" | "announcements") =>
                        setNewDiscussion({ ...newDiscussion, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Discussion</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="course-specific">Course Specific</SelectItem>
                        <SelectItem value="announcements">Announcements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newDiscussion.category === "course-specific" && (
                    <div>
                      <Label htmlFor="course">Course</Label>
                      <Select
                        value={newDiscussion.course}
                        onValueChange={(value) => setNewDiscussion({ ...newDiscussion, course: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CS 101">CS 101 - Introduction to Computer Science</SelectItem>
                          <SelectItem value="BUS 201">BUS 201 - Business Management Fundamentals</SelectItem>
                          <SelectItem value="PSY 150">PSY 150 - Introduction to Psychology</SelectItem>
                          <SelectItem value="ENG 301">ENG 301 - Advanced Engineering Mathematics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={newDiscussion.tags}
                      onChange={(e) => setNewDiscussion({ ...newDiscussion, tags: e.target.value })}
                      placeholder="e.g., study-group, assignment-help, career"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newDiscussion.content}
                      onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                      placeholder="Share your thoughts, questions, or information..."
                      className="min-h-32"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewDiscussionOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createDiscussion} disabled={!newDiscussion.title || !newDiscussion.content}>
                    Create Discussion
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Discussion List */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Discussions</CardTitle>
                    <Badge variant="secondary">{filteredDiscussions.length} topics</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search discussions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="course-specific">Course Specific</SelectItem>
                        <SelectItem value="announcements">Announcements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="pinned">Pinned</TabsTrigger>
                      <TabsTrigger value="trending">Trending</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-3 mt-4">
                      {/* Pinned Discussions */}
                      {pinnedDiscussions.map((discussion) => (
                        <div
                          key={discussion.id}
                          className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedDiscussion?.id === discussion.id ? "bg-muted border-primary" : ""
                          }`}
                          onClick={() => setSelectedDiscussion(discussion)}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {discussion.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <Pin className="h-4 w-4 text-primary" />
                                <h3 className="font-semibold truncate">{discussion.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{discussion.content}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Badge className={getRoleColor(discussion.author.role)} variant="secondary">
                                    {discussion.author.role}
                                  </Badge>
                                  <Badge className={getCategoryColor(discussion.category)} variant="outline">
                                    {discussion.category}
                                  </Badge>
                                  {discussion.course && (
                                    <Badge variant="outline" className="text-xs">
                                      {discussion.course}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{discussion.likes}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MessageCircle className="h-3 w-3" />
                                    <span>{discussion.replies}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{new Date(discussion.timestamp).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Regular Discussions */}
                      {regularDiscussions.map((discussion) => (
                        <div
                          key={discussion.id}
                          className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedDiscussion?.id === discussion.id ? "bg-muted border-primary" : ""
                          }`}
                          onClick={() => setSelectedDiscussion(discussion)}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {discussion.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate mb-1">{discussion.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{discussion.content}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Badge className={getRoleColor(discussion.author.role)} variant="secondary">
                                    {discussion.author.role}
                                  </Badge>
                                  <Badge className={getCategoryColor(discussion.category)} variant="outline">
                                    {discussion.category}
                                  </Badge>
                                  {discussion.course && (
                                    <Badge variant="outline" className="text-xs">
                                      {discussion.course}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{discussion.likes}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MessageCircle className="h-3 w-3" />
                                    <span>{discussion.replies}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{new Date(discussion.timestamp).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="pinned" className="space-y-3 mt-4">
                      {pinnedDiscussions.map((discussion) => (
                        <div
                          key={discussion.id}
                          className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => setSelectedDiscussion(discussion)}
                        >
                          <div className="flex items-start space-x-3">
                            <Pin className="h-5 w-5 text-primary mt-1" />
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{discussion.title}</h3>
                              <p className="text-sm text-muted-foreground">{discussion.author.name}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="trending" className="space-y-3 mt-4">
                      {regularDiscussions
                        .sort((a, b) => b.likes + b.replies - (a.likes + a.replies))
                        .slice(0, 5)
                        .map((discussion) => (
                          <div
                            key={discussion.id}
                            className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => setSelectedDiscussion(discussion)}
                          >
                            <div className="flex items-start space-x-3">
                              <TrendingUp className="h-5 w-5 text-primary mt-1" />
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{discussion.title}</h3>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <span>{discussion.likes} likes</span>
                                  <span>{discussion.replies} replies</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Discussion Detail & Sidebar */}
            <div className="space-y-6">
              {selectedDiscussion ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedDiscussion.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedDiscussion.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold font-[family-name:var(--font-montserrat)]">
                          {selectedDiscussion.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-muted-foreground">by {selectedDiscussion.author.name}</span>
                          <Badge className={getRoleColor(selectedDiscussion.author.role)} variant="secondary">
                            {selectedDiscussion.author.role}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(selectedDiscussion.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{selectedDiscussion.content}</p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {selectedDiscussion.likes}
                        </Button>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          <span>{selectedDiscussion.replies} replies</span>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {discussionReplies.length > 0 && (
                      <div className="space-y-3 pt-4 border-t">
                        <h4 className="font-semibold">Replies</h4>
                        {discussionReplies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {reply.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium">{reply.author.name}</span>
                                <Badge className={getRoleColor(reply.author.role)} variant="secondary">
                                  {reply.author.role}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(reply.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{reply.content}</p>
                              <Button variant="ghost" size="sm" className="mt-1 p-0 h-auto">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {reply.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form */}
                    <div className="pt-4 border-t">
                      <Textarea placeholder="Write a reply..." className="mb-2" />
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Post Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a discussion</h3>
                    <p className="text-muted-foreground">Choose a topic to view the full discussion and replies.</p>
                  </CardContent>
                </Card>
              )}

              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Discussions</span>
                    <Badge variant="secondary">{discussions.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Replies</span>
                    <Badge variant="secondary">{discussions.reduce((sum, d) => sum + d.replies, 0)}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Community Members</span>
                    <Badge variant="secondary">1,247</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
