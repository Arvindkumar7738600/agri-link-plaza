import { useState } from "react";
import { Search, MapPin, Star, User, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Farmers = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");

  const skills = [
    { id: "all", label: "All Skills" },
    { id: "tractor-operator", label: "Tractor Operator" },
    { id: "harvesting", label: "Harvesting" },
    { id: "irrigation", label: "Irrigation" },
    { id: "general-farming", label: "General Farming" },
  ];

  const farmers = [
    {
      id: 1,
      name: "Ramesh Patel",
      skill: "tractor-operator",
      experience: "12 years",
      rate: "₹500/day",
      location: "Gurgaon, Haryana",
      distance: "3.2 km",
      rating: 4.9,
      reviews: 156,
      available: true,
      languages: ["Hindi", "English", "Gujarati"],
      specializations: ["Heavy Machinery", "Land Preparation", "Crop Harvesting"],
      completedJobs: 342
    },
    {
      id: 2,
      name: "Suresh Kumar",
      skill: "harvesting",
      experience: "8 years",
      rate: "₹400/day",
      location: "Faridabad, Haryana", 
      distance: "7.5 km",
      rating: 4.7,
      reviews: 89,
      available: true,
      languages: ["Hindi", "Punjabi"],
      specializations: ["Wheat Harvesting", "Rice Cutting", "Quality Control"],
      completedJobs: 218
    },
    {
      id: 3,
      name: "Priya Sharma",
      skill: "irrigation",
      experience: "6 years",
      rate: "₹350/day",
      location: "Palwal, Haryana",
      distance: "12.8 km",
      rating: 4.8,
      reviews: 127,
      available: false,
      languages: ["Hindi", "English"],
      specializations: ["Drip Irrigation", "Water Management", "System Maintenance"],
      completedJobs: 163
    },
    {
      id: 4,
      name: "Mohan Singh",
      skill: "general-farming",
      experience: "15 years",
      rate: "₹450/day",
      location: "Sonipat, Haryana",
      distance: "9.1 km",
      rating: 4.6,
      reviews: 203,
      available: true,
      languages: ["Hindi", "Punjabi", "English"],
      specializations: ["Crop Planning", "Soil Management", "Pest Control"],
      completedJobs: 456
    }
  ];

  const filteredFarmers = selectedSkill === "all" 
    ? farmers 
    : farmers.filter(farmer => farmer.skill === selectedSkill);

  return (
    <div className="min-h-screen pt-8">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-center">
            Hire Skilled Farmers
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Connect with experienced agricultural professionals and skilled 
            farmers for all your farming operations and seasonal work.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-border">
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
                >
                  {skill.label}
                </Button>
              ))}
            </div>

            {/* Search Button */}
            <Button className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Farmer Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Available Farmers ({filteredFarmers.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredFarmers.map((farmer) => (
              <Card key={farmer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{farmer.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{farmer.location}</span>
                          <span className="text-muted-foreground">• {farmer.distance}</span>
                        </CardDescription>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{farmer.experience}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Award className="h-4 w-4" />
                            <span>{farmer.completedJobs} jobs</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={farmer.available ? "secondary" : "destructive"}>
                      {farmer.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
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
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Languages:</div>
                    <div className="flex flex-wrap gap-1">
                      {farmer.languages.map((language, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Specializations:</div>
                    <div className="flex flex-wrap gap-1">
                      {farmer.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-muted/50 p-3 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Daily Rate:</span>
                    <span className="font-bold text-primary text-lg">{farmer.rate}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1" 
                      disabled={!farmer.available}
                      variant={farmer.available ? "default" : "secondary"}
                    >
                      {farmer.available ? "Hire Now" : "Not Available"}
                    </Button>
                    <Button variant="outline">
                      View Profile
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

      {/* Benefits Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Hire Through KisanSeva Plus?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Professionals</h3>
              <p className="text-muted-foreground">All farmers are background verified with skill assessment</p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rated & Reviewed</h3>
              <p className="text-muted-foreground">Choose based on real reviews from other farmers</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Hiring</h3>
              <p className="text-muted-foreground">Hire for daily, weekly, or seasonal work</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Hire?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Join thousands of farmers who trust KisanSeva Plus for their 
            workforce needs. Get started today!
          </p>
          <Button variant="secondary" size="lg">
            Post Your Job Requirement
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Farmers;