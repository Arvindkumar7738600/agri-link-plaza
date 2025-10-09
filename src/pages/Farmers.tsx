import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Star, Clock, Phone, User, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks/useTranslations";

const Farmers = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const { t } = useTranslations();

  const skills = [
    { id: "all", label: "All Skills" },
    { id: "tractor-operator", label: "Tractor Operator" },
    { id: "harvesting", label: "Harvesting" },
    { id: "planting", label: "Planting & Sowing" },
    { id: "irrigation", label: "Irrigation" },
    { id: "pesticide", label: "Pesticide Application" },
  ];

  const farmers = [
    {
      id: 1,
      name: "Ramesh Kumar",
      skills: ["tractor-operator", "planting"],
      experience: "8 years",
      hourlyRate: "₹150/hour",
      dailyRate: "₹1,200/day",
      location: "Ranchi, Jharkhand",
      distance: "3.2 km",
      rating: 4.9,
      reviews: 156,
      available: true,
      languages: ["Hindi", "English"],
      verified: true,
      specialties: ["Precision Farming", "Organic Methods", "Soil Management"]
    },
    {
      id: 2,
      name: "Sunil Singh",
      skills: ["harvesting", "tractor-operator"],
      experience: "12 years",
      hourlyRate: "₹180/hour",
      dailyRate: "₹1,400/day",
      location: "Jamshedpur, Jharkhand",
      distance: "5.8 km",
      rating: 4.8,
      reviews: 203,
      available: true,
      languages: ["Hindi", "Bengali"],
      verified: true,
      specialties: ["Combine Operation", "Crop Management", "Equipment Maintenance"]
    },
    {
      id: 3,
      name: "Vikash Yadav",
      skills: ["irrigation", "pesticide"],
      experience: "6 years",
      hourlyRate: "₹120/hour",
      dailyRate: "₹950/day",
      location: "Dhanbad, Jharkhand",
      distance: "8.5 km",
      rating: 4.7,
      reviews: 89,
      available: true,
      languages: ["Hindi"],
      verified: true,
      specialties: ["Drip Irrigation", "Pest Control", "Fertilizer Application"]
    },
    {
      id: 4,
      name: "Priya Devi",
      skills: ["planting", "harvesting"],
      experience: "5 years",
      hourlyRate: "₹130/hour",
      dailyRate: "₹1,000/day",
      location: "Bokaro, Jharkhand",
      distance: "10.2 km",
      rating: 4.6,
      reviews: 127,
      available: true,
      languages: ["Hindi", "English"],
      verified: true,
      specialties: ["Vegetable Farming", "Seed Selection", "Post Harvest"]
    },
    {
      id: 5,
      name: "Manoj Sharma",
      skills: ["tractor-operator", "irrigation"],
      experience: "10 years",
      hourlyRate: "₹160/hour",
      dailyRate: "₹1,300/day",
      location: "Hazaribagh, Jharkhand",
      distance: "12.7 km",
      rating: 4.8,
      reviews: 178,
      available: false,
      languages: ["Hindi", "English"],
      verified: true,
      specialties: ["Heavy Machinery", "Water Management", "Land Preparation"]
    },
    {
      id: 6,
      name: "Krishna Das",
      skills: ["pesticide", "planting"],
      experience: "7 years",
      hourlyRate: "₹140/hour",
      dailyRate: "₹1,100/day",
      location: "Giridih, Jharkhand",
      distance: "15.3 km",
      rating: 4.5,
      reviews: 94,
      available: true,
      languages: ["Hindi"],
      verified: true,
      specialties: ["Crop Protection", "Seasonal Planning", "Yield Optimization"]
    }
  ];

  const filteredFarmers = selectedSkill === "all" 
    ? farmers 
    : farmers.filter(farmer => farmer.skills.includes(selectedSkill));

  return (
    <div className="min-h-screen pt-8">
      {/* Header */}
      <section className="py-12" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-primary-foreground">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center">
            Hire Skilled Farmers
          </h1>
          <p className="text-lg opacity-90 text-center max-w-2xl mx-auto">
            Connect with experienced agricultural workers and skilled farmers 
            in your area. Get the expertise you need for your farming operations.
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

            {/* Skill Filter */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Button
                  key={skill.id}
                  variant={selectedSkill === skill.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSkill(skill.id)}
                  className="whitespace-nowrap"
                  style={selectedSkill === skill.id ? {background: 'var(--gradient-primary)'} : {}}
                >
                  {skill.label}
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

      {/* Farmers Listings */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Available Farmers ({filteredFarmers.length})
            </h2>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredFarmers.map((farmer) => (
              <Card key={farmer.id} className="hover:shadow-elevated transition-shadow bg-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1 flex items-center space-x-2">
                          <span>{farmer.name}</span>
                          {farmer.verified && (
                            <Award className="h-4 w-4 text-green-500" />
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{farmer.location}</span>
                          <span className="text-muted-foreground">• {farmer.distance}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={farmer.available ? "secondary" : "destructive"}>
                      {farmer.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Experience */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{farmer.experience}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{farmer.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({farmer.reviews} reviews)
                    </span>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Languages:</span>
                    <span className="font-medium">{farmer.languages.join(", ")}</span>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {farmer.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skills.find(s => s.id === skill)?.label || skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Specialties:</div>
                    <div className="flex flex-wrap gap-1">
                      {farmer.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Hourly Rate:</span>
                      <span className="font-bold text-primary">{farmer.hourlyRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Daily Rate:</span>
                      <span className="font-bold text-secondary">{farmer.dailyRate}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1" 
                      disabled={!farmer.available}
                      variant={farmer.available ? "default" : "secondary"}
                      style={farmer.available ? {background: 'var(--gradient-primary)'} : {}}
                      onClick={() => {
                        if (farmer.available) {
                          navigate('/hire-farmer-details', { state: { farmer } });
                        }
                      }}
                    >
                      {farmer.available ? "Hire Now" : "Not Available"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Farmers
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12" style={{background: 'var(--gradient-section)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Skilled Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Job Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1hr</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">4.7★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold mb-4">Need Help Finding the Right Farmer?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Our support team can help you find farmers with specific skills 
            and experience for your agricultural needs.
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

export default Farmers;