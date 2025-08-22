"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  GraduationCap,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface Document {
  id: string
  name: string
  type: string
  category: string
  uploadDate: string
  status: "approved" | "pending" | "rejected"
  size: string
  description?: string
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "High School Transcript.pdf",
      type: "PDF",
      category: "Academic Records",
      uploadDate: "2024-01-15",
      status: "approved",
      size: "2.3 MB",
      description: "Official high school transcript",
    },
    {
      id: "2",
      name: "Birth Certificate.pdf",
      type: "PDF",
      category: "Identity Documents",
      uploadDate: "2024-01-14",
      status: "pending",
      size: "1.1 MB",
      description: "Birth certificate for identity verification",
    },
    {
      id: "3",
      name: "SAT Scores.pdf",
      type: "PDF",
      category: "Test Scores",
      uploadDate: "2024-01-13",
      status: "approved",
      size: "856 KB",
      description: "Official SAT score report",
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState("")
  const [description, setDescription] = useState("")

  const documentCategories = [
    "Academic Records",
    "Identity Documents",
    "Test Scores",
    "Financial Documents",
    "Letters of Recommendation",
    "Personal Statement",
    "Other",
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selectedCategory) {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.split("/")[1]?.toUpperCase() || "FILE",
        category: selectedCategory,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "pending",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        description: description || `Uploaded ${file.name}`,
      }
      setDocuments([...documents, newDocument])
      setDescription("")
      setSelectedCategory("")
      // Reset file input
      event.target.value = ""
    }
  }

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Document Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">JS</span>
            </div>
            <span className="text-sm font-medium">John Student</span>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">My Documents</h2>
          <p className="text-muted-foreground">Upload and manage your academic and personal documents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Document
              </CardTitle>
              <CardDescription>Add new documents to your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Document Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the document"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="file">Choose File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  disabled={!selectedCategory}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
              </div>

              <Button className="w-full" disabled={!selectedCategory}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Uploaded Documents
              </CardTitle>
              <CardDescription>Manage your uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No documents uploaded yet</p>
                  <p className="text-sm text-muted-foreground">Upload your first document to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <h4 className="font-medium">{doc.name}</h4>
                            {getStatusIcon(doc.status)}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline">{doc.category}</Badge>
                            <Badge variant="secondary">{doc.type}</Badge>
                            {getStatusBadge(doc.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{doc.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()} • Size: {doc.size}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteDocument(doc.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Required Documents Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Required Documents Checklist</CardTitle>
            <CardDescription>Make sure you have uploaded all required documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "High School Transcript", required: true, uploaded: true },
                { name: "Birth Certificate", required: true, uploaded: true },
                { name: "SAT/ACT Scores", required: true, uploaded: true },
                { name: "Letters of Recommendation", required: true, uploaded: false },
                { name: "Personal Statement", required: true, uploaded: false },
                { name: "Financial Aid Documents", required: false, uploaded: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  {item.uploaded ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-600" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.required ? "Required" : "Optional"}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
