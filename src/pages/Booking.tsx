import { useState } from "react";
import { Search, Filter, MapPin, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Booking = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Equipment" },
    { id: "tractors", label: "Tractors" },
    { id: "harvesters", label: "Harvesters" },
    { id: "tillers", label: "Tillers" },
    { id: "sprayers", label: "Sprayers" },
  ];

  const equipment = [
    {
      id: 1,
      name: "Mahindra 575 DI Tractor",
      category: "tractors",
      power: "47 HP",
      price: "₹800/hour",
      dailyPrice: "₹6,000/day",
      location: "Gurgaon, Haryana",
      distance: "2.5 km",
      rating: 4.8,
      reviews: 127,
      available: true,
      owner: "Rajesh Kumar",
      features: ["GPS Tracking", "Fuel Efficient", "Well Maintained"]
    },
    {
      id: 2,
      name: "John Deere Combine Harvester",
      category: "harvesters",
      power: "130 HP",
      price: "₹2,500/hour",
      dailyPrice: "₹18,000/day",
      location: "Sonipat, Haryana",
      distance: "8.2 km",
      rating: 4.9,
      reviews: 89,
      available: true,
      owner: "Suresh Singh",
      features: ["Advanced Cutting", "Large Capacity", "Operator Included"]
    },
    {
      id: 3,
      name: "Rotary Tiller - 7 Feet",
      category: "tillers",
      power: "35-50 HP Required",
      price: "₹400/hour",
      dailyPrice: "₹3,000/day",
      location: "Faridabad, Haryana",
      distance: "12.1 km",
      rating: 4.6,
      reviews: 203,
      available: false,
      owner: "Amit Sharma",
      features: ["Heavy Duty", "Smooth Operation", "Easy Attachment"]
    },
    {
      id: 4,
      name: "Boom Sprayer - 12 Feet",
      category: "sprayers",
      power: "Tank Capacity: 400L",
      price: "₹300/hour",
      dailyPrice: "₹2,200/day",
      location: "Palwal, Haryana",
      distance: "15.5 km",
      rating: 4.7,
      reviews: 156,
      available: true,
      owner: "Priya Devi",
      features: ["Uniform Spray", "Adjustable Boom", "Chemical Tank"]
    }
  ];

  const filteredEquipment = selectedCategory === "all" 
    ? equipment 
    : equipment.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-8">
      {/* Header */}
      <section className="py-12" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-primary-foreground">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center">
            Book Agricultural Equipment
          </h1>
          <p className="text-lg opacity-90 text-center max-w-2xl mx-auto">
            Find and rent tractors, harvesters, and other farming equipment 
            from verified owners near your location.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-border" style={{background: 'var(--gradient-light)'}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Location Search */}
            <div className="relative flex-1 max-w-md">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                  style={selectedCategory === category.id ? {background: 'var(--gradient-primary)'} : {}}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Search Button */}
            <Button className="flex items-center space-x-2" style={{background: 'var(--gradient-primary)'}}>
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Equipment Listings */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Available Equipment ({filteredEquipment.length})
            </h2>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="hover:shadow-elevated transition-shadow bg-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                        <span className="text-muted-foreground">• {item.distance}</span>
                      </CardDescription>
                    </div>
                    <Badge variant={item.available ? "secondary" : "destructive"}>
                      {item.available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Equipment Details */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Power/Capacity:</span>
                    <span className="font-medium">{item.power}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{item.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({item.reviews} reviews)
                    </span>
                  </div>

                  {/* Owner */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{item.owner}</span>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Hourly Rate:</span>
                      <span className="font-bold text-primary">{item.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Daily Rate:</span>
                      <span className="font-bold text-secondary">{item.dailyPrice}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1" 
                      disabled={!item.available}
                      variant={item.available ? "default" : "secondary"}
                      style={item.available ? {background: 'var(--gradient-primary)'} : {}}
                    >
                      {item.available ? "Book Now" : "Not Available"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Equipment
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12" style={{background: 'var(--gradient-section)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Equipment Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Uptime Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2hrs</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold mb-4">Need Help with Booking?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you find the right 
            equipment for your farming needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>24/7 Support</span>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Call +91 9608792602
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;