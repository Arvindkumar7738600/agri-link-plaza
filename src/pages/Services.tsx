import { Tractor, Users, MapPin, Shield, Clock, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const mainServices = [
    {
      icon: Tractor,
      title: "Equipment Rental",
      description: "Comprehensive agricultural machinery rental services",
      features: [
        "Tractors (20HP to 100HP)",
        "Harvesters & Combines",
        "Tillers & Cultivators", 
        "Irrigation Equipment",
        "Spraying Systems"
      ],
      pricing: "Starting from ₹500/hour",
      link: "/booking"
    },
    {
      icon: Users,
      title: "Farmer Hiring",
      description: "Connect with skilled agricultural professionals",
      features: [
        "Experienced Farm Workers",
        "Tractor Operators",
        "Harvest Specialists",
        "Irrigation Experts",
        "Agricultural Consultants"
      ],
      pricing: "Starting from ₹300/day",
      link: "/farmers"
    }
  ];

  const additionalServices = [
    {
      icon: MapPin,
      title: "Location-Based Search",
      description: "Find services and equipment near your location with GPS integration"
    },
    {
      icon: Shield,
      title: "KYC Verification",
      description: "All users verified for safe and secure transactions"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support in multiple languages"
    },
    {
      icon: Phone,
      title: "Emergency Services",
      description: "Urgent equipment breakdown and replacement services"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Register & Verify",
      description: "Create account and complete KYC verification"
    },
    {
      step: "2", 
      title: "Browse & Select",
      description: "Find equipment or farmers based on your location"
    },
    {
      step: "3",
      title: "Book & Pay",
      description: "Secure booking with flexible payment options"
    },
    {
      step: "4",
      title: "Use & Review",
      description: "Get service and provide feedback for improvement"
    }
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-lg lg:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Comprehensive agricultural solutions designed to support farmers 
            at every stage of their farming journey, from equipment rental 
            to skilled workforce hiring.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20" style={{background: 'var(--gradient-light)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-elevated transition-shadow duration-300 bg-card">
                  <CardHeader className="text-center pb-4">
                    <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-lg">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Available Services:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-lg font-semibold text-primary mb-2">{service.pricing}</div>
                      <div className="text-sm text-muted-foreground">Prices vary by location and duration</div>
                    </div>

                    <Button className="w-full" size="lg" asChild style={{background: 'var(--gradient-primary)'}}>
                      <Link to={service.link}>
                        Get Started
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Additional Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Extra services and features that make KisanSeva Plus the most 
              comprehensive agricultural platform in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              const colors = [
                'from-emerald-400 to-teal-500', // Location-Based Search - Teal
                'from-indigo-400 to-blue-500', // KYC Verification - Blue
                'from-amber-400 to-orange-500', // 24/7 Support - Orange
                'from-rose-400 to-pink-500' // Emergency Services - Pink
              ];
              const bgColors = [
                'bg-teal-50', // Location-Based Search background
                'bg-blue-50', // KYC Verification background  
                'bg-orange-50', // 24/7 Support background
                'bg-pink-50' // Emergency Services background
              ];
              return (
                <div key={index} className={`${bgColors[index]} rounded-3xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                  <div className="text-center space-y-6">
                    <div className={`bg-gradient-to-br ${colors[index]} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Simple 4-step process to access agricultural services and equipment 
                through our platform.
              </p>
              
              <div className="space-y-6">
                {processSteps.map((step, index) => {
                  const stepColors = ['bg-green-100 text-green-600', 'bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600'];
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stepColors[index]} font-bold text-lg`}>
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
                    {/* Status Bar */}
                    <div className="h-8 bg-gray-100 flex items-center justify-center">
                      <div className="w-32 h-6 bg-black rounded-full"></div>
                    </div>
                    
                    {/* Screen Content */}
                    <div className="p-6 text-center h-full bg-gradient-to-b from-green-500 to-green-600 text-white flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-6">Simple Process</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                          <span className="text-sm">Register & Verify</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                          <span className="text-sm">Browse & Select</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                          <span className="text-sm">Book & Pay</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                          <span className="text-sm">Use & Review</span>
                        </div>
                      </div>
                      
                      {/* QR Code */}
                      <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                          <div className="grid grid-cols-3 gap-1">
                            {[...Array(9)].map((_, i) => (
                              <div key={i} className="w-2 h-2 bg-gray-800 rounded-sm"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs opacity-80">Scan to start booking</p>
                    </div>
                  </div>
                </div>
                
                {/* App Store Buttons */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <Button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                        <div className="w-3 h-3 border-2 border-black rounded-sm"></div>
                      </div>
                      <div>
                        <div className="text-xs">GET IT ON</div>
                        <div className="font-bold">Google Play</div>
                      </div>
                    </div>
                  </Button>
                  <Button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                        <div className="w-3 h-3 bg-black rounded-sm"></div>
                      </div>
                      <div>
                        <div className="text-xs">Download on the</div>
                        <div className="font-bold">App Store</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-primary-foreground">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              No hidden fees, no surprise charges. Pay only for what you use 
              with our flexible pricing structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="text-xl font-bold mb-4">Basic Plan</h3>
              <div className="text-3xl font-bold mb-4">₹0<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2 opacity-90">
                <li>• 5 bookings per month</li>
                <li>• Basic support</li>
                <li>• Standard pricing</li>
              </ul>
            </div>

            <div className="bg-secondary text-secondary-foreground p-6 rounded-lg transform scale-105">
              <h3 className="text-xl font-bold mb-4">Premium Plan</h3>
              <div className="text-3xl font-bold mb-4">₹299<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2">
                <li>• Unlimited bookings</li>
                <li>• Priority support</li>
                <li>• 10% discount on all services</li>
                <li>• Advanced filters</li>
              </ul>
            </div>

            <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="text-xl font-bold mb-4">Enterprise</h3>
              <div className="text-3xl font-bold mb-4">Custom</div>
              <ul className="space-y-2 opacity-90">
                <li>• Bulk booking discounts</li>
                <li>• Dedicated account manager</li>
                <li>• Custom integrations</li>
                <li>• 24/7 priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;