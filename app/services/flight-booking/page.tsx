"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plane, CalendarIcon, Users, MapPin, Clock, Star, ArrowLeft, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { format } from "date-fns"

export default function FlightBookingPage() {
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()

  const popularDestinations = [
    { city: "New York", country: "USA", price: "$450", image: "/new-york-skyline.png" },
    { city: "London", country: "UK", price: "$650", image: "/london-big-ben.png" },
    { city: "Toronto", country: "Canada", price: "$380", image: "/toronto-skyline.png" },
    { city: "Sydney", country: "Australia", price: "$850", image: "/sydney-opera-house.png" },
    { city: "Berlin", country: "Germany", price: "$520", image: "/berlin-brandenburg-gate.png" },
    { city: "Tokyo", country: "Japan", price: "$720", image: "/tokyo-skyline.png" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Link>
            </Button>
            <div className="h-6 w-px bg-border mx-2" />
            <Plane className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Flight Booking Service</h1>
          </div>
          <Badge className="bg-blue-500 hover:bg-blue-600">Student Discounts Available</Badge>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Book Your Flight</h2>
          <p className="text-muted-foreground text-lg">
            Find the best flight deals for your academic journey. Special student discounts available for study abroad
            programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flight Search Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Flight Search
                </CardTitle>
                <CardDescription>Find and book flights for your educational journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Trip Type */}
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="roundtrip" name="tripType" defaultChecked className="text-primary" />
                    <Label htmlFor="roundtrip">Round Trip</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="oneway" name="tripType" className="text-primary" />
                    <Label htmlFor="oneway">One Way</Label>
                  </div>
                </div>

                {/* From and To */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="from" placeholder="Departure city" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="to" placeholder="Destination city" className="pl-10" />
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? format(departureDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Passengers and Class */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Passengers</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Passenger</SelectItem>
                        <SelectItem value="2">2 Passengers</SelectItem>
                        <SelectItem value="3">3 Passengers</SelectItem>
                        <SelectItem value="4">4+ Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select defaultValue="economy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premium">Premium Economy</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="first">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">Special Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Any special requirements or preferences (student visa documentation, dietary restrictions, etc.)"
                    className="min-h-[80px]"
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Plane className="mr-2 h-4 w-4" />
                  Search Flights
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Flight Booking Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>24/7 Support Available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Student Discount Programs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Group Booking Available</span>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Contact Our Travel Experts</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href="mailto:knancyticharwa@gmail.com" className="text-primary hover:underline">
                        knancyticharwa@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Booking Fee</span>
                    <span className="font-semibold">$25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Student Discount</span>
                    <span className="font-semibold text-green-600">-$10</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Service Fee</span>
                      <span className="font-bold text-primary">$15</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">*Flight prices vary by destination and dates</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Popular Study Destinations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={`${destination.city}, ${destination.country}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-600">From {destination.price}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg">{destination.city}</h4>
                  <p className="text-muted-foreground">{destination.country}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
