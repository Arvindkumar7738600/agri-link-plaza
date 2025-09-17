import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Equipment");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSearch = () => {
    // Filter equipment based on search location
    console.log("Searching for equipment near:", searchLocation);
  };

  const handleBookNow = (equipment: any) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/booking-details", { state: { equipment } });
  };

  const categories = ["All Equipment", "Tractors", "Harvesters", "Tillers", "Sprayers"];

  const equipment = [
    {
      id: 1,
      name: "Jhon Deere 5039d power pro",
      category: "Tractors",
      power: "41 HP",
      price: "₹900/hour",
      dailyPrice: "₹6,000/day",
      location: "Bagodar, Hazaribagh , Jharkhand",
      distance: "2.5 km",
      rating: 4.8,
      reviews: 127,
      available: true,
      owner: "Ravi Kumar",
      features: ["GPS Tracking", "Fuel Efficient", "Well Maintained"]
    },
    {
      id: 2,
      name: "Swaraj 855 FE Tractor",
      category: "Tractors",
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
      name: "John Deere W70 Combine Harvester",
      category: "Harvesters",
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
      id: 4,
      name: "Kartar 4000 Mini Combine",
      category: "Harvesters",
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
    {
      id: 5,
      name: "Rotary Tiller - 7 Feet",
      category: "Tillers",
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
      id: 6,
      name: "Disc Harrow - 20 Discs",
      category: "Tillers",
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
    }
  ];

  const filteredEquipment = selectedCategory === "All Equipment" 
    ? equipment 
    : equipment.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Book Agricultural Equipment
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Find and rent tractors, harvesters, and other farming equipment from verified owners near your location..
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            {/* Location Search */}
            <div className="relative flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-80"
              />
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                Search
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Listings */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold mb-2">{item.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                        <span className="text-gray-500">• {item.distance}</span>
                      </CardDescription>
                    </div>
                    <Badge className={`${
                      item.available 
                        ? "bg-green-600 text-white" 
                        : "bg-red-500 text-white"
                    }`}>
                      {item.available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Equipment Details */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Power/Capacity:</span>
                    <span className="font-semibold">{item.power}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      ({item.reviews} reviews)
                    </span>
                  </div>

                  {/* Owner */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Owner:</span>
                    <span className="font-semibold">{item.owner}</span>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gray-100 text-gray-700">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Hourly Rate:</span>
                      <span className="font-bold text-gray-900">{item.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Daily Rate:</span>
                      <span className="font-bold text-gray-900">{item.dailyPrice}</span>
                    </div>
                  </div>

                  {/* Date and Book Now */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">17/09/2025</div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white" 
                      disabled={!item.available}
                      onClick={() => handleBookNow(item)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;