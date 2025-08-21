import { ArrowRight, Tractor, Users, Shield, MapPin, Smartphone, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";

const Home = () => {
  const services = [
    {
      icon: Tractor,
      title: "Equipment Rental",
      description: "Rent tractors, harvesters, and other agricultural machinery from verified owners",
      link: "/booking"
    },
    {
      icon: Users,
      title: "Farmer Hiring",
      description: "Connect with skilled farmers and agricultural workers for your farming needs",
      link: "/farmers"
    },
    {
      icon: MapPin,
      title: "Location-Based Search",
      description: "Find equipment and services near your location with GPS integration",
      link: "/services"
    },
    {
      icon: Shield,
      title: "Verified Users",
      description: "All users are KYC verified for safe and secure transactions",
      link: "/about"
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for farmers on the go with intuitive mobile interface"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support in multiple languages"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe and secure payment gateway with multiple payment options"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-screen" style={{backgroundColor: '#4a7c59'}}>
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                  Connecting <span className="text-yellow-300">Farmer</span>
                  <br />with Agricultural
                  <br />Solutions
                </h1>
                <p className="text-lg lg:text-xl opacity-90 mb-6 leading-relaxed">
                  Rent tractors, hire skilled farmers, and access agricultural equipment across India. Making farming efficient and profitable for everyone.
                </p>
                <p className="text-sm opacity-80 italic">
                  Built by student entrepreneurs from IIT Madras who understand farming communities
                </p>
              </div>

              {/* Search Card */}
              <Card className="bg-white text-gray-900 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Find Services Near You</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Service Type</label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tractor">Tractor Rental</SelectItem>
                          <SelectItem value="harvester">Harvester Rental</SelectItem>
                          <SelectItem value="farmer">Hire Farmers</SelectItem>
                          <SelectItem value="equipment">Other Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <Input placeholder="Enter city or pin code" className="w-full" />
                    </div>
                  </div>
                  <Button className="w-full text-white" style={{backgroundColor: '#4a7c59'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3e6b4a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a7c59'}>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </CardContent>  
              </Card>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Agricultural field with growing crops" 
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{background: 'var(--gradient-light)'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive agricultural solutions designed to empower farmers 
              and modernize farming practices across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group hover:shadow-elevated transition-all duration-300 border-border hover:border-primary/30 bg-card">
                  <CardHeader className="text-center pb-4">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="mb-4 leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <Button variant="outline" size="sm" asChild className="group-hover:border-primary group-hover:text-primary">
                      <Link to={service.link}>
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Choose KisanSeva Plus?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Built specifically for Indian farmers, our platform combines 
                traditional farming wisdom with modern technology to create 
                the most comprehensive agricultural marketplace.
              </p>
              
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl text-primary-foreground shadow-elevated">
                <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Quick 2-minute registration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>KYC verification in 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Start booking immediately</span>
                  </div>
                </div>
                <Button variant="secondary" size="lg" className="w-full" asChild>
                  <Link to="/signup">Join KisanSeva Plus Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-primary-foreground">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg opacity-90">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-lg opacity-90">Equipment Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-lg opacity-90">States Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-lg opacity-90">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;