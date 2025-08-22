"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Globe, Calendar, Star, Building, DollarSign, MapPin, TrendingUp, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function UniversitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [showPrograms, setShowPrograms] = useState(false)

  const countries = [
    {
      flag: "🇺🇸",
      name: "USA",
      universities: [
        "Harvard University",
        "MIT",
        "Stanford University",
        "UC Berkeley",
        "UCLA",
        "Princeton",
        "Yale",
        "Columbia",
      ],
      stats: { acceptance: "5-15%", tuition: "$50K-70K", deadline: "Jan 1" },
    },
    {
      flag: "🇨🇦",
      name: "Canada",
      universities: [
        "University of Toronto",
        "UBC",
        "McGill University",
        "University of Waterloo",
        "McMaster",
        "Queen's",
      ],
      stats: { acceptance: "15-25%", tuition: "$25K-35K", deadline: "Jan 15" },
    },
    {
      flag: "🇲🇽",
      name: "Mexico",
      universities: ["UNAM", "Tecnológico de Monterrey", "ITAM", "Universidad Iberoamericana", "ITESO"],
      stats: { acceptance: "20-40%", tuition: "$5K-15K", deadline: "Mar 1" },
    },
    {
      flag: "🇬🇧",
      name: "UK",
      universities: [
        "Oxford University",
        "Cambridge University",
        "Imperial College",
        "UCL",
        "King's College",
        "Edinburgh",
      ],
      stats: { acceptance: "10-20%", tuition: "$30K-45K", deadline: "Jan 15" },
    },
    {
      flag: "🇩🇪",
      name: "Germany",
      universities: ["TU Munich", "Heidelberg University", "LMU Munich", "TU Berlin", "RWTH Aachen"],
      stats: { acceptance: "30-50%", tuition: "€350-750", deadline: "Jul 15" },
    },
    {
      flag: "🇫🇷",
      name: "France",
      universities: ["Sorbonne University", "ENS Paris", "École Polytechnique", "Sciences Po", "HEC Paris"],
      stats: { acceptance: "15-30%", tuition: "€170-15K", deadline: "Apr 30" },
    },
    {
      flag: "🇳🇱",
      name: "Netherlands",
      universities: ["TU Delft", "University of Amsterdam", "Utrecht University", "Leiden University", "Erasmus"],
      stats: { acceptance: "25-40%", tuition: "€2K-20K", deadline: "May 1" },
    },
    {
      flag: "🇨🇭",
      name: "Switzerland",
      universities: ["ETH Zurich", "EPFL", "University of Basel", "University of Zurich", "Geneva"],
      stats: { acceptance: "20-35%", tuition: "CHF 1K-2K", deadline: "Apr 30" },
    },
    {
      flag: "🇸🇪",
      name: "Sweden",
      universities: ["KTH Royal Institute", "Lund University", "Stockholm University", "Chalmers", "Uppsala"],
      stats: { acceptance: "30-45%", tuition: "Free-€15K", deadline: "Jan 15" },
    },
    {
      flag: "🇮🇹",
      name: "Italy",
      universities: ["Bocconi University", "University of Bologna", "Sapienza Rome", "Politecnico Milano", "Padova"],
      stats: { acceptance: "25-40%", tuition: "€1K-15K", deadline: "May 30" },
    },
    {
      flag: "🇸🇬",
      name: "Singapore",
      universities: ["NUS", "NTU", "SMU", "SUTD", "SIT"],
      stats: { acceptance: "15-25%", tuition: "$8K-25K", deadline: "Feb 28" },
    },
    {
      flag: "🇯🇵",
      name: "Japan",
      universities: ["University of Tokyo", "Kyoto University", "Osaka University", "Tokyo Tech", "Waseda"],
      stats: { acceptance: "20-35%", tuition: "$5K-15K", deadline: "Feb 25" },
    },
    {
      flag: "🇰🇷",
      name: "South Korea",
      universities: ["Seoul National", "KAIST", "Yonsei University", "Korea University", "POSTECH"],
      stats: { acceptance: "15-30%", tuition: "$6K-18K", deadline: "Nov 30" },
    },
    {
      flag: "🇨🇳",
      name: "China",
      universities: ["Tsinghua University", "Peking University", "Fudan University", "Shanghai Jiao Tong", "Zhejiang"],
      stats: { acceptance: "10-25%", tuition: "$4K-12K", deadline: "Jan 31" },
    },
    {
      flag: "🇮🇳",
      name: "India",
      universities: ["IIT Delhi", "IISc Bangalore", "JNU", "Delhi University", "IIT Bombay"],
      stats: { acceptance: "1-15%", tuition: "$2K-8K", deadline: "Apr 30" },
    },
    {
      flag: "🇭🇰",
      name: "Hong Kong",
      universities: ["HKU", "HKUST", "CUHK", "City University", "PolyU"],
      stats: { acceptance: "15-30%", tuition: "$15K-25K", deadline: "Dec 1" },
    },
    {
      flag: "🇹🇭",
      name: "Thailand",
      universities: ["Chulalongkorn", "Mahidol University", "KMUTT", "Thammasat", "Kasetsart"],
      stats: { acceptance: "25-45%", tuition: "$3K-10K", deadline: "Mar 31" },
    },
    {
      flag: "🇲🇾",
      name: "Malaysia",
      universities: ["University of Malaya", "USM", "UTM", "UKM", "UPM"],
      stats: { acceptance: "30-50%", tuition: "$2K-8K", deadline: "May 31" },
    },
    {
      flag: "🇿🇦",
      name: "South Africa",
      universities: ["UCT", "Wits University", "Stellenbosch", "University of Pretoria", "Rhodes"],
      stats: { acceptance: "20-40%", tuition: "$4K-12K", deadline: "Sep 30" },
    },
    {
      flag: "🇪🇬",
      name: "Egypt",
      universities: ["Cairo University", "AUC", "Alexandria University", "Ain Shams", "Helwan"],
      stats: { acceptance: "30-60%", tuition: "$1K-8K", deadline: "Aug 31" },
    },
    {
      flag: "🇳🇬",
      name: "Nigeria",
      universities: ["University of Ibadan", "OAU", "UNILAG", "University of Nigeria", "ABU"],
      stats: { acceptance: "25-50%", tuition: "$500-3K", deadline: "Jul 31" },
    },
    {
      flag: "🇰🇪",
      name: "Kenya",
      universities: ["University of Nairobi", "Strathmore University", "JKUAT", "Moi University", "Egerton"],
      stats: { acceptance: "30-55%", tuition: "$1K-5K", deadline: "Aug 15" },
    },
    {
      flag: "🇬🇭",
      name: "Ghana",
      universities: ["University of Ghana", "KNUST", "UCC", "UDS", "GIMPA"],
      stats: { acceptance: "35-60%", tuition: "$800-4K", deadline: "Jul 31" },
    },
    {
      flag: "🇲🇦",
      name: "Morocco",
      universities: ["Mohammed V University", "Al Akhawayn", "Hassan II", "Cadi Ayyad", "Ibn Tofail"],
      stats: { acceptance: "40-65%", tuition: "$1K-6K", deadline: "Jun 30" },
    },
    {
      flag: "🇦🇺",
      name: "Australia",
      universities: ["University of Melbourne", "University of Sydney", "ANU", "UNSW", "Monash"],
      stats: { acceptance: "20-35%", tuition: "$25K-45K", deadline: "Dec 31" },
    },
    {
      flag: "🇳🇿",
      name: "New Zealand",
      universities: ["University of Auckland", "University of Otago", "Victoria Wellington", "Canterbury", "Massey"],
      stats: { acceptance: "25-40%", tuition: "$20K-35K", deadline: "Dec 1" },
    },
    {
      flag: "🇧🇷",
      name: "Brazil",
      universities: ["USP", "UNICAMP", "PUC-Rio", "UFRJ", "UFMG"],
      stats: { acceptance: "15-40%", tuition: "Free-$15K", deadline: "Dec 15" },
    },
    {
      flag: "🇦🇷",
      name: "Argentina",
      universities: ["UBA", "ITBA", "Universidad Austral", "UTDT", "UCA"],
      stats: { acceptance: "20-45%", tuition: "Free-$12K", deadline: "Nov 30" },
    },
    {
      flag: "🇨🇱",
      name: "Chile",
      universities: ["UC Chile", "Universidad de Chile", "Universidad de los Andes", "UTFSM", "UDP"],
      stats: { acceptance: "25-50%", tuition: "$3K-18K", deadline: "Dec 31" },
    },
  ]

  const popularPrograms = [
    {
      category: "Technology & Engineering",
      programs: [
        {
          name: "Computer Science",
          universities: ["MIT", "Stanford", "Carnegie Mellon", "UC Berkeley", "NUS"],
          demand: "Very High",
          avgSalary: "$120K",
        },
        {
          name: "Data Science",
          universities: ["Stanford", "Harvard", "NTU", "TU Delft", "ETH Zurich"],
          demand: "Very High",
          avgSalary: "$115K",
        },
        {
          name: "Artificial Intelligence",
          universities: ["MIT", "Stanford", "CMU", "Oxford", "Toronto"],
          demand: "Extremely High",
          avgSalary: "$140K",
        },
        {
          name: "Software Engineering",
          universities: ["MIT", "Stanford", "Waterloo", "Cambridge", "KAIST"],
          demand: "Very High",
          avgSalary: "$110K",
        },
        {
          name: "Cybersecurity",
          universities: ["Carnegie Mellon", "Georgia Tech", "Purdue", "RHUL", "NUS"],
          demand: "High",
          avgSalary: "$105K",
        },
        {
          name: "Mechanical Engineering",
          universities: ["MIT", "Stanford", "TUM", "Tokyo Tech", "Imperial"],
          demand: "High",
          avgSalary: "$85K",
        },
        {
          name: "Electrical Engineering",
          universities: ["MIT", "Stanford", "UC Berkeley", "ETH Zurich", "NTU"],
          demand: "High",
          avgSalary: "$95K",
        },
        {
          name: "Biomedical Engineering",
          universities: ["Johns Hopkins", "MIT", "Stanford", "Imperial", "NUS"],
          demand: "High",
          avgSalary: "$88K",
        },
      ],
    },
    {
      category: "Business & Finance",
      programs: [
        {
          name: "MBA",
          universities: ["Wharton", "Harvard", "INSEAD", "LBS", "Kellogg"],
          demand: "High",
          avgSalary: "$150K",
        },
        {
          name: "Finance",
          universities: ["Wharton", "NYU Stern", "LSE", "HEC Paris", "NUS"],
          demand: "High",
          avgSalary: "$95K",
        },
        {
          name: "Marketing",
          universities: ["Kellogg", "Wharton", "INSEAD", "IE Business", "Melbourne"],
          demand: "Medium",
          avgSalary: "$75K",
        },
        {
          name: "International Business",
          universities: ["Thunderbird", "Georgetown", "INSEAD", "IE", "NUS"],
          demand: "Medium",
          avgSalary: "$80K",
        },
        {
          name: "Entrepreneurship",
          universities: ["Stanford", "Babson", "MIT", "Berkeley", "INSEAD"],
          demand: "Medium",
          avgSalary: "$90K",
        },
        {
          name: "Supply Chain Management",
          universities: ["MIT", "Michigan State", "ASU", "Cranfield", "NUS"],
          demand: "High",
          avgSalary: "$85K",
        },
      ],
    },
    {
      category: "Health & Life Sciences",
      programs: [
        {
          name: "Medicine",
          universities: ["Harvard", "Johns Hopkins", "Oxford", "Karolinska", "Melbourne"],
          demand: "Very High",
          avgSalary: "$200K",
        },
        {
          name: "Nursing",
          universities: ["Johns Hopkins", "UPenn", "UCSF", "King's College", "Toronto"],
          demand: "Very High",
          avgSalary: "$75K",
        },
        {
          name: "Public Health",
          universities: ["Johns Hopkins", "Harvard", "Imperial", "Melbourne", "NUS"],
          demand: "High",
          avgSalary: "$65K",
        },
        {
          name: "Pharmacy",
          universities: ["UCSF", "UNC", "King's College", "Monash", "NUS"],
          demand: "Medium",
          avgSalary: "$125K",
        },
        {
          name: "Biotechnology",
          universities: ["MIT", "Stanford", "Cambridge", "ETH Zurich", "NUS"],
          demand: "High",
          avgSalary: "$85K",
        },
        {
          name: "Psychology",
          universities: ["Stanford", "Harvard", "Oxford", "Cambridge", "Melbourne"],
          demand: "Medium",
          avgSalary: "$60K",
        },
      ],
    },
    {
      category: "Social Sciences & Humanities",
      programs: [
        {
          name: "International Relations",
          universities: ["Georgetown", "LSE", "Sciences Po", "Oxford", "ANU"],
          demand: "Medium",
          avgSalary: "$65K",
        },
        {
          name: "Law",
          universities: ["Harvard", "Yale", "Oxford", "Cambridge", "Melbourne"],
          demand: "High",
          avgSalary: "$120K",
        },
        {
          name: "Political Science",
          universities: ["Harvard", "Princeton", "LSE", "Oxford", "ANU"],
          demand: "Medium",
          avgSalary: "$55K",
        },
        {
          name: "Economics",
          universities: ["MIT", "Harvard", "LSE", "Chicago", "Cambridge"],
          demand: "High",
          avgSalary: "$85K",
        },
        {
          name: "Journalism",
          universities: ["Columbia", "Northwestern", "LSE", "City London", "Melbourne"],
          demand: "Low",
          avgSalary: "$45K",
        },
        {
          name: "Education",
          universities: ["Stanford", "Harvard", "Teachers College", "Cambridge", "Melbourne"],
          demand: "Medium",
          avgSalary: "$50K",
        },
      ],
    },
    {
      category: "Creative & Design",
      programs: [
        {
          name: "Architecture",
          universities: ["MIT", "AA London", "TU Delft", "ETH Zurich", "Melbourne"],
          demand: "Medium",
          avgSalary: "$75K",
        },
        {
          name: "Graphic Design",
          universities: ["RISD", "Parsons", "RCA", "RMIT", "NTU"],
          demand: "Medium",
          avgSalary: "$50K",
        },
        {
          name: "Industrial Design",
          universities: ["Stanford", "RISD", "RCA", "TU Delft", "KAIST"],
          demand: "Medium",
          avgSalary: "$65K",
        },
        { name: "Film Studies", universities: ["USC", "NYU", "UCLA", "LFS", "RMIT"], demand: "Low", avgSalary: "$55K" },
        {
          name: "Fashion Design",
          universities: ["Parsons", "Central Saint Martins", "FIT", "RMIT", "Bunka"],
          demand: "Low",
          avgSalary: "$45K",
        },
      ],
    },
    {
      category: "Sciences & Mathematics",
      programs: [
        {
          name: "Physics",
          universities: ["MIT", "Harvard", "Cambridge", "ETH Zurich", "Tokyo"],
          demand: "Medium",
          avgSalary: "$85K",
        },
        {
          name: "Chemistry",
          universities: ["MIT", "Harvard", "Cambridge", "ETH Zurich", "Tokyo"],
          demand: "Medium",
          avgSalary: "$75K",
        },
        {
          name: "Mathematics",
          universities: ["MIT", "Harvard", "Cambridge", "Princeton", "ETH Zurich"],
          demand: "Medium",
          avgSalary: "$80K",
        },
        {
          name: "Environmental Science",
          universities: ["Stanford", "Yale", "Imperial", "ANU", "NUS"],
          demand: "High",
          avgSalary: "$65K",
        },
        {
          name: "Marine Biology",
          universities: ["Scripps", "Woods Hole", "Miami", "James Cook", "NUS"],
          demand: "Low",
          avgSalary: "$55K",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Building className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">University Research Tools</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Comprehensive tools to research universities, predict admissions, and find the perfect program for your
            academic journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search universities, programs, or locations..." className="pl-10 h-12 text-lg" />
          </div>
        </div>

        {/* University Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Universities By Country - Made clickable with dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-emerald-600" />
                    <CardTitle className="text-xl">Top Universities By Country</CardTitle>
                  </div>
                  <CardDescription>
                    Find statistics like acceptance rates, expenses, deadlines, and test scores.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="text-sm font-medium text-gray-700">Featured Countries:</div>
                    <div className="space-y-2">
                      {countries.slice(0, 8).map((country) => (
                        <div key={country.name} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">
                            {country.flag} {country.name}
                          </span>
                          <span className="text-emerald-600 font-medium">
                            {country.universities.slice(0, 3).join(", ")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-sm text-emerald-600 font-medium">
                      Click to view all {countries.length} countries →
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>Acceptance rates & rankings</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>Tuition & living costs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Application deadlines</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-emerald-600" />
                  Top Universities By Country
                </DialogTitle>
                <DialogDescription>
                  Browse universities by country with detailed statistics and information
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {countries.map((country) => (
                  <Card
                    key={country.name}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCountry(country.name)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{country.flag}</span>
                        <CardTitle className="text-lg">{country.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Top Universities:</div>
                        <div className="space-y-1">
                          {country.universities.slice(0, 3).map((uni) => (
                            <div key={uni} className="text-sm text-emerald-600">
                              • {uni}
                            </div>
                          ))}
                          {country.universities.length > 3 && (
                            <div className="text-sm text-gray-500">+{country.universities.length - 3} more</div>
                          )}
                        </div>
                        <div className="pt-2 space-y-1 text-xs text-gray-600">
                          <div>Acceptance: {country.stats.acceptance}</div>
                          <div>Tuition: {country.stats.tuition}</div>
                          <div>Deadline: {country.stats.deadline}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* UniPredict */}
          <Link href="/universities/unipredict">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-emerald-600" />
                  <CardTitle className="text-xl">UniPredict</CardTitle>
                </div>
                <CardDescription>Predicts where you can get admits based on your academic profile.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  <div className="text-sm font-medium text-gray-700">Sample Analysis Example:</div>
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg border">
                    <div className="text-sm font-semibold text-gray-800 mb-2">Student Profile: Sarah Chen</div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                      <div>
                        <span className="font-medium text-gray-600">Academic:</span>
                        <div className="text-gray-700">GPA: 3.7/4.0 • SAT: 1420</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Background:</span>
                        <div className="text-gray-700">Computer Science • International</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Extracurriculars:</span>
                        <div className="text-gray-700">Research, Coding Club, Volunteer</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Essays:</span>
                        <div className="text-gray-700">Strong personal statement</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">AI Prediction Results:</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-red-50 p-2 rounded text-xs">
                        <span className="font-medium text-red-800">Reach Schools</span>
                        <span className="text-red-600">5-20% chance</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-gray-600">• MIT: 8%</div>
                        <div className="text-gray-600">• Stanford: 6%</div>
                        <div className="text-gray-600">• Harvard: 5%</div>
                        <div className="text-gray-600">• UC Berkeley: 18%</div>
                      </div>

                      <div className="flex justify-between items-center bg-yellow-50 p-2 rounded text-xs">
                        <span className="font-medium text-yellow-800">Match Schools</span>
                        <span className="text-yellow-600">40-70% chance</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-gray-600">• UCLA: 65%</div>
                        <div className="text-gray-600">• UCSD: 72%</div>
                        <div className="text-gray-600">• UT Austin: 58%</div>
                        <div className="text-gray-600">• Georgia Tech: 45%</div>
                      </div>

                      <div className="flex justify-between items-center bg-green-50 p-2 rounded text-xs">
                        <span className="font-medium text-green-800">Safety Schools</span>
                        <span className="text-green-600">80-95% chance</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-gray-600">• Penn State: 88%</div>
                        <div className="text-gray-600">• ASU: 92%</div>
                        <div className="text-gray-600">• Rutgers: 85%</div>
                        <div className="text-gray-600">• Virginia Tech: 81%</div>
                      </div>
                    </div>

                    <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                      <div className="font-medium text-blue-800 mb-1">AI Recommendations:</div>
                      <div className="text-blue-700 space-y-1">
                        <div>• Retake SAT to reach 1500+ for better reach school chances</div>
                        <div>• Add leadership role to strengthen extracurricular profile</div>
                        <div>• Consider applying Early Decision to top choice match school</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-gray-700">How UniPredict Works:</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Analyzes your GPA, test scores, extracurriculars, and essays</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Compares with historical admission data from 5,000+ universities</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Uses AI algorithms to predict admission probability</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-gray-700">Sample Predictions by Profile:</div>
                  <div className="space-y-2">
                    <div className="bg-emerald-50 p-2 rounded text-sm">
                      <div className="font-medium text-emerald-800">Strong Profile (GPA 3.8+, SAT 1450+)</div>
                      <div className="text-emerald-600">Harvard: 12% • MIT: 15% • Stanford: 8%</div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded text-sm">
                      <div className="font-medium text-blue-800">Good Profile (GPA 3.5+, IELTS 7.0+)</div>
                      <div className="text-blue-600">UCL: 65% • NUS: 78% • TU Munich: 82%</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded text-sm">
                      <div className="font-medium text-purple-800">Solid Profile (GPA 3.2+, TOEFL 90+)</div>
                      <div className="text-purple-600">ASU: 85% • York: 75% • Griffith: 90%</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-gray-700">Prediction Factors:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>Academic Performance (40%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-blue-500" />
                      <span>Test Scores (30%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3 text-green-500" />
                      <span>Extracurriculars (20%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-purple-500" />
                      <span>Essays & LORs (10%)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>95% accuracy rate with 250K+ predictions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>Real-time updates with latest admission trends</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="h-4 w-4" />
                    <span>Covers universities in 80+ countries</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* RateMyChances */}
          <Link href="/universities/rate-my-chances">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-emerald-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-emerald-600" />
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">RateMyChances</CardTitle>
                    <Badge variant="destructive" className="text-xs">
                      New
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Rate My Chances considers your YMGrad profile and estimates a percent chance of your admit with
                  profile building advice.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  <div className="text-sm font-medium text-gray-700">How RateMyChances Works:</div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-gray-800">Comprehensive Profile Analysis</div>
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Academic Performance: GPA, Class Rank, Course Rigor</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Standardized Tests: SAT, ACT, IELTS, TOEFL, GRE, GMAT</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Extracurriculars: Leadership, Sports, Volunteering, Awards</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>Personal Essays: Quality, Uniqueness, Storytelling</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Demographics: Geographic, Socioeconomic, First-Gen Status</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm font-medium text-gray-700">Sample Analysis Example:</div>
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border">
                    <div className="text-sm font-semibold text-gray-800 mb-2">Student Profile: Alex Rodriguez</div>
                    <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                      <div>
                        <span className="font-medium text-gray-600">Academic:</span>
                        <div className="text-gray-700">GPA: 3.85/4.0 • SAT: 1480 • Top 10%</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Major:</span>
                        <div className="text-gray-700">Biomedical Engineering</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Background:</span>
                        <div className="text-gray-700">Hispanic • First-Gen • California</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Activities:</span>
                        <div className="text-gray-700">Research, Debate Captain, Hospital Volunteer</div>
                      </div>
                    </div>

                    <div className="text-sm font-medium text-gray-700 mb-2">RateMyChances Analysis:</div>
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800">Stanford University</span>
                          <span className="text-lg font-bold text-orange-600">22%</span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>• Strong academic profile matches Stanford's standards</div>
                          <div>• First-gen status provides significant boost (+8%)</div>
                          <div>• Research experience aligns with biomedical focus</div>
                          <div className="text-orange-600 font-medium">Recommendation: Apply Early Action</div>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800">UC Berkeley</span>
                          <span className="text-lg font-bold text-yellow-600">68%</span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>• In-state advantage for California resident (+15%)</div>
                          <div>• GPA above average for engineering program</div>
                          <div>• Strong extracurricular leadership profile</div>
                          <div className="text-yellow-600 font-medium">Recommendation: Strong match school</div>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800">UC San Diego</span>
                          <span className="text-lg font-bold text-green-600">85%</span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>• Stats well above UCSD engineering averages</div>
                          <div>• Biomedical program has higher acceptance rate</div>
                          <div>• Holistic review favors well-rounded profile</div>
                          <div className="text-green-600 font-medium">Recommendation: Likely admission</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-blue-50 rounded text-xs">
                      <div className="font-medium text-blue-800 mb-1">Profile Enhancement Tips:</div>
                      <div className="text-blue-700 space-y-1">
                        <div>• Consider retaking SAT to reach 1500+ for top-tier schools</div>
                        <div>• Publish research findings or present at science fair</div>
                        <div>• Apply to summer research programs at target universities</div>
                        <div>• Highlight unique Hispanic heritage in personal essays</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm font-medium text-gray-700">Chance Categories Explained:</div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between bg-red-50 p-2 rounded text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium text-red-800">Reach Schools (0-25%)</span>
                      </div>
                      <span className="text-red-600">Dream schools, apply to 2-3</span>
                    </div>
                    <div className="flex items-center justify-between bg-yellow-50 p-2 rounded text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium text-yellow-800">Match Schools (25-75%)</span>
                      </div>
                      <span className="text-yellow-600">Realistic options, apply to 4-6</span>
                    </div>
                    <div className="flex items-center justify-between bg-green-50 p-2 rounded text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-800">Safety Schools (75-95%)</span>
                      </div>
                      <span className="text-green-600">Backup options, apply to 2-3</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-gray-700">Key Features:</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Real-time admission data from 3,000+ universities</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Personalized recommendations based on your unique profile</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Detailed breakdown of admission factors and their impact</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Actionable advice to improve your admission chances</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-gray-700">Sample Ratings by Profile Type:</div>
                  <div className="space-y-2">
                    <div className="bg-emerald-50 p-2 rounded text-sm">
                      <div className="font-medium text-emerald-800">High Achiever (GPA 3.8+, SAT 1500+)</div>
                      <div className="text-emerald-600">Harvard: 18% • MIT: 22% • Stanford: 15%</div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded text-sm">
                      <div className="font-medium text-blue-800">Strong Student (GPA 3.5+, SAT 1350+)</div>
                      <div className="text-blue-600">UCLA: 45% • NYU: 62% • BU: 78%</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded text-sm">
                      <div className="font-medium text-purple-800">Solid Candidate (GPA 3.2+, SAT 1200+)</div>
                      <div className="text-purple-600">Penn State: 75% • ASU: 88% • Temple: 92%</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>Personalized admission chances</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>Profile improvement tips</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Popular Programs - Made clickable with dialog */}
          <Dialog open={showPrograms} onOpenChange={setShowPrograms}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Star className="h-6 w-6 text-emerald-600" />
                    <CardTitle className="text-xl">Popular Programs</CardTitle>
                  </div>
                  <CardDescription>
                    Search universities offering programs of your choice across different fields.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="text-sm font-medium text-gray-700">Top Programs Globally:</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Computer Science</span>
                        <span className="text-emerald-600 font-medium">MIT, NUS, ETH Zurich</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Business/MBA</span>
                        <span className="text-emerald-600 font-medium">Wharton, INSEAD, LBS</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Engineering</span>
                        <span className="text-emerald-600 font-medium">TUM, Tokyo Tech, UCT</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Medicine</span>
                        <span className="text-emerald-600 font-medium">Karolinska, Kyoto, Wits</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Data Science</span>
                        <span className="text-emerald-600 font-medium">Stanford, NTU, TU Delft</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">International Relations</span>
                        <span className="text-emerald-600 font-medium">Georgetown, LSE, Sciences Po</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Architecture</span>
                        <span className="text-emerald-600 font-medium">MIT, AA London, TU Delft</span>
                      </div>
                    </div>
                    <div className="text-center text-sm text-emerald-600 font-medium">
                      Click to explore all programs by category →
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="h-4 w-4" />
                      <span>Program-specific search</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>Trending fields & majors</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-emerald-600" />
                  Popular Programs by Category
                </DialogTitle>
                <DialogDescription>
                  Explore programs across different fields with top universities, demand levels, and salary expectations
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {popularPrograms.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      {category.category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.programs.map((program) => (
                        <Card key={program.name} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-800">{program.name}</h4>
                              <div className="flex gap-1">
                                <Badge
                                  variant={
                                    program.demand === "Extremely High"
                                      ? "destructive"
                                      : program.demand === "Very High"
                                        ? "default"
                                        : program.demand === "High"
                                          ? "secondary"
                                          : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {program.demand}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">Top Universities:</span>
                                <div className="text-emerald-600 text-xs mt-1">{program.universities.join(" • ")}</div>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600">Avg. Starting Salary:</span>
                                <span className="font-medium text-green-600">{program.avgSalary}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* High Ranked Cheap Universities */}
          <Link href="/universities/affordable-rankings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building className="h-6 w-6 text-emerald-600" />
                  <CardTitle className="text-xl">High Ranked Cheap Universities</CardTitle>
                </div>
                <CardDescription>
                  Find the universities with low tuition and the best rankings for value education.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-gray-700">Best Value Schools Worldwide:</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">UT Austin (USA)</span>
                      <span className="text-emerald-600 font-medium">$11K/yr - Rank #38</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">UNC Chapel Hill (USA)</span>
                      <span className="text-emerald-600 font-medium">$9K/yr - Rank #28</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">TU Berlin (Germany)</span>
                      <span className="text-emerald-600 font-medium">€350/yr - Rank #158</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Sorbonne Paris (France)</span>
                      <span className="text-emerald-600 font-medium">€170/yr - Rank #83</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">University of Vienna (Austria)</span>
                      <span className="text-emerald-600 font-medium">€750/yr - Rank #151</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">IIT Delhi (India)</span>
                      <span className="text-emerald-600 font-medium">$2K/yr - Rank #197</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">University of Cape Town (SA)</span>
                      <span className="text-emerald-600 font-medium">$4K/yr - Rank #237</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">NUS Singapore</span>
                      <span className="text-emerald-600 font-medium">$8K/yr - Rank #11</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">University of São Paulo (Brazil)</span>
                      <span className="text-emerald-600 font-medium">Free - Rank #115</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Cairo University (Egypt)</span>
                      <span className="text-emerald-600 font-medium">$1K/yr - Rank #561</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>Low tuition fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>High academic rankings</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Top Universities by State/Province */}
          <Link href="/universities/by-location">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                  <CardTitle className="text-xl">Top Universities by Region</CardTitle>
                </div>
                <CardDescription>
                  Find the most popular universities by region across Asia, Europe, Africa, and Americas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-gray-700">Popular Regions Worldwide:</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">California, USA</span>
                      <span className="text-emerald-600 font-medium">Stanford, UCLA, Berkeley</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Massachusetts, USA</span>
                      <span className="text-emerald-600 font-medium">Harvard, MIT, Tufts</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Ontario, Canada</span>
                      <span className="text-emerald-600 font-medium">UofT, McMaster, Queen's</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Tokyo, Japan</span>
                      <span className="text-emerald-600 font-medium">Tokyo, Waseda, Keio</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Seoul, South Korea</span>
                      <span className="text-emerald-600 font-medium">Seoul National, Yonsei, Korea</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Bavaria, Germany</span>
                      <span className="text-emerald-600 font-medium">TUM, LMU, Erlangen</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Île-de-France, France</span>
                      <span className="text-emerald-600 font-medium">Sorbonne, ENS, Polytechnique</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Western Cape, SA</span>
                      <span className="text-emerald-600 font-medium">UCT, Stellenbosch, UWC</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Cairo, Egypt</span>
                      <span className="text-emerald-600 font-medium">Cairo, AUC, Ain Shams</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Lagos, Nigeria</span>
                      <span className="text-emerald-600 font-medium">UNILAG, LASU, Pan-Atlantic</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">New South Wales, Australia</span>
                      <span className="text-emerald-600 font-medium">Sydney, UNSW, Macquarie</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">São Paulo, Brazil</span>
                      <span className="text-emerald-600 font-medium">USP, UNICAMP, FGV</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Location-based search</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>Regional popularity rankings</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">5,000+</div>
              <div className="text-sm text-gray-600">Universities Tracked</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">80+</div>
              <div className="text-sm text-gray-600">Countries Covered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">95%</div>
              <div className="text-sm text-gray-600">Prediction Accuracy</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">250K+</div>
              <div className="text-sm text-gray-600">Students Helped</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Back */}
        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
