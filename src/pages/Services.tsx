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
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Services
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive agricultural solutions designed to support farmers 
            at every stage of their farming journey, from equipment rental 
            to skilled workforce hiring.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
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

                    <Button className="w-full" size="lg" asChild>
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
      <section className="py-20 bg-muted/30">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple 4-step process to access agricultural services and equipment 
              through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-border transform translate-x-1/2"></div>
                )}
                <div className="bg-primary text-primary-foreground w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold relative z-10">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
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