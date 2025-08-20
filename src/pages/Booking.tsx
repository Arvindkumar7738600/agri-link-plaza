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
    // Tractors
    {
      id: 1,
      name: "Mahindra 575 DI Tractor",
      category: "tractors",
      power: "47 HP",
      price: "₹800/hour",
      dailyPrice: "₹6,000/day",
      location: "Ranchi, Jharkhand",
      distance: "2.5 km",
      rating: 4.8,
      reviews: 127,
      available: true,
      owner: "Rajesh Kumar",
      features: ["GPS Tracking", "Fuel Efficient", "Well Maintained"]
    },
    {
      id: 2,
      name: "Swaraj 855 FE Tractor",
      category: "tractors",
      power: "50 HP",
      price: "₹850/hour",
      dailyPrice: "₹6,500/day",
      location: "Jamshedpur, Jharkhand",
      distance: "5.2 km",
      rating: 4.7,
      reviews: 98,
      available: true,
      owner: "Sunil Sharma",
      features: ["Power Steering", "High Lift Capacity", "4WD Available"]
    },
    {
      id: 3,
      name: "Sonalika DI 60 Tractor",
      category: "tractors",
      power: "60 HP",
      price: "₹900/hour",
      dailyPrice: "₹7,200/day",
      location: "Dhanbad, Jharkhand",
      distance: "8.1 km",
      rating: 4.6,
      reviews: 156,
      available: true,
      owner: "Vikash Singh",
      features: ["Double Clutch", "Oil Immersed Brakes", "Multi Speed PTO"]
    },
    
    // Harvesters
    {
      id: 4,
      name: "John Deere W70 Combine Harvester",
      category: "harvesters",
      power: "130 HP",
      price: "₹2,500/hour",
      dailyPrice: "₹18,000/day",
      location: "Bokaro, Jharkhand",
      distance: "12.3 km",
      rating: 4.9,
      reviews: 89,
      available: true,
      owner: "Suresh Singh",
      features: ["Advanced Cutting", "Large Capacity", "Operator Included"]
    },
    {
      id: 5,
      name: "Kartar 4000 Mini Combine",
      category: "harvesters",
      power: "45 HP",
      price: "₹1,800/hour",
      dailyPrice: "₹12,000/day",
      location: "Hazaribagh, Jharkhand",
      distance: "15.7 km",
      rating: 4.5,
      reviews: 67,
      available: true,
      owner: "Ramesh Yadav",
      features: ["Compact Design", "Easy Maneuver", "Low Fuel Consumption"]
    },
    
    // Tillers
    {
      id: 6,
      name: "Rotary Tiller - 7 Feet",
      category: "tillers",
      power: "35-50 HP Required",
      price: "₹400/hour",
      dailyPrice: "₹3,000/day",
      location: "Giridih, Jharkhand",
      distance: "18.2 km",
      rating: 4.6,
      reviews: 203,
      available: true,
      owner: "Amit Sharma",
      features: ["Heavy Duty", "Smooth Operation", "Easy Attachment"]
    },
    {
      id: 7,
      name: "Disc Harrow - 20 Discs",
      category: "tillers",
      power: "40-60 HP Required",
      price: "₹450/hour",
      dailyPrice: "₹3,500/day",
      location: "Deoghar, Jharkhand",
      distance: "22.1 km",
      rating: 4.4,
      reviews: 134,
      available: true,
      owner: "Mohan Das",
      features: ["Sharp Cutting", "Adjustable Angle", "Durable Build"]
    },
    
    // Sprayers
    {
      id: 8,
      name: "Boom Sprayer - 12 Feet",
      category: "sprayers",
      power: "Tank Capacity: 400L",
      price: "₹300/hour",
      dailyPrice: "₹2,200/day",
      location: "Palamu, Jharkhand",
      distance: "25.5 km",
      rating: 4.7,
      reviews: 156,
      available: true,
      owner: "Priya Devi",
      features: ["Uniform Spray", "Adjustable Boom", "Chemical Tank"]
    },
    {
      id: 9,
      name: "Power Sprayer - High Pressure",
      category: "sprayers",
      power: "Tank Capacity: 200L",
      price: "₹250/hour",
      dailyPrice: "₹1,800/day",
      location: "Gumla, Jharkhand",
      distance: "28.3 km",
      rating: 4.3,
      reviews: 89,
      available: true,
      owner: "Santosh Kumar",
      features: ["High Pressure", "Portable", "Easy Fill"]
    },
    
    // Additional Equipment
    {
      id: 10,
      name: "Seed Drill - 9 Tyne",
      category: "tillers",
      power: "30-45 HP Required",
      price: "₹350/hour",
      dailyPrice: "₹2,800/day",
      location: "Koderma, Jharkhand",
      distance: "30.1 km",
      rating: 4.5,
      reviews: 112,
      available: true,
      owner: "Ravi Shankar",
      features: ["Precise Sowing", "Adjustable Depth", "Uniform Spacing"]
    },
    {
      id: 11,
      name: "Thresher - Multi Crop",
      category: "harvesters",
      power: "20 HP Required",
      price: "₹600/hour",
      dailyPrice: "₹4,500/day",
      location: "Latehar, Jharkhand",
      distance: "32.8 km",
      rating: 4.6,
      reviews: 178,
      available: false,
      owner: "Manoj Singh",
      features: ["Multi Crop", "High Efficiency", "Low Grain Loss"]
    },
    {
      id: 12,
      name: "Cultivator - 9 Tyne",
      category: "tillers",
      power: "35-50 HP Required",
      price: "₹380/hour",
      dailyPrice: "₹2,900/day",
      location: "Chatra, Jharkhand",
      distance: "35.2 km",
      rating: 4.7,
      reviews: 145,
      available: true,
      owner: "Krishna Kumar",
      features: ["Deep Plowing", "Weed Control", "Soil Preparation"]
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
                      onClick={() => {
                        if (item.available) {
                          // Here you can add booking logic
                          alert(`Booking ${item.name} for ${item.price}. Contact owner: ${item.owner}`);
                        }
                      }}
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