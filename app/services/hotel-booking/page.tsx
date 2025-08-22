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
import { Hotel, CalendarIcon, MapPin, Star, Wifi, Coffee, ArrowLeft, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { format } from "date-fns"

export default function HotelBookingPage() {
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()

  const featuredHotels = [
    {
      name: "Student Inn Downtown",
      location: "New York, USA",
      price: "$89/night",
      rating: 4.2,
      amenities: ["Free WiFi", "Study Rooms", "24/7 Front Desk"],
      image: "/modern-hotel-lobby.png",
    },
    {
      name: "Campus Lodge",
      location: "London, UK",
      price: "$75/night",
      rating: 4.5,
      amenities: ["Free Breakfast", "Gym", "Student Discounts"],
      image: "/cozy-hotel-room.png",
    },
    {
      name: "University Suites",
      location: "Toronto, Canada",
      price: "$65/night",
      rating: 4.3,
      amenities: ["Kitchenette", "Laundry", "Study Areas"],
      image: "/hotel-suite-kitchen.png",
    },
    {
      name: "Scholar's Rest",
      location: "Berlin, Germany",
      price: "$58/night",
      rating: 4.4,
      amenities: ["Free WiFi", "Bike Rental", "Student Rates"],
      image: "/boutique-hotel-exterior.png",
    },
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
            <Hotel className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Hotel Booking Service</h1>
          </div>
          <Badge className="bg-green-500 hover:bg-green-600">Student Rates Available</Badge>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Find Your Perfect Stay</h2>
          <p className="text-muted-foreground text-lg">
            Book comfortable accommodations for your academic journey. Special student rates and study-friendly
            amenities available.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hotel Search Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="h-5 w-5" />
                  Hotel Search
                </CardTitle>
                <CardDescription>Find and book accommodations for your educational journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Destination */}
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="destination" placeholder="City, university, or landmark" className="pl-10" />
                  </div>
                </div>

                {/* Check-in and Check-out Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Guests and Rooms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guests">Guests</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Rooms</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Room</SelectItem>
                        <SelectItem value="2">2 Rooms</SelectItem>
                        <SelectItem value="3">3 Rooms</SelectItem>
                        <SelectItem value="4">4+ Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Room Type */}
                <div className="space-y-2">
                  <Label htmlFor="roomType">Preferred Room Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Room</SelectItem>
                      <SelectItem value="deluxe">Deluxe Room</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="studio">Studio Apartment</SelectItem>
                      <SelectItem value="shared">Shared Accommodation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">Special Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Any special requirements (study space, quiet room, accessibility needs, etc.)"
                    className="min-h-[80px]"
                  />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  <Hotel className="mr-2 h-4 w-4" />
                  Search Hotels
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hotel Booking Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Student-Friendly Properties</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <span>Free WiFi Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Coffee className="h-4 w-4 text-muted-foreground" />
                  <span>Study Areas Available</span>
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
                    <span className="font-semibold">$15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Student Discount</span>
                    <span className="font-semibold text-green-600">-$5</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Service Fee</span>
                      <span className="font-bold text-primary">$10</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">*Hotel prices vary by location and dates</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Hotels */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Student-Friendly Hotels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600">{hotel.price}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-1">{hotel.name}</h4>
                  <p className="text-muted-foreground text-sm mb-2">{hotel.location}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                  <div className="space-y-1">
                    {hotel.amenities.slice(0, 2).map((amenity, i) => (
                      <div key={i} className="text-xs text-muted-foreground">
                        • {amenity}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
