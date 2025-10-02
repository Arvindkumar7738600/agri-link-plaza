import { Users, TrendingUp, Shield, Award, MapPin, BarChart3, Heart, Leaf } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import fpoHeroImage from "@/assets/fpo-hero.jpg";
import punjabImage from "@/assets/state-punjab.jpg";
import maharashtraImage from "@/assets/state-maharashtra.jpg";
import upImage from "@/assets/state-up.jpg";
import karnatakaImage from "@/assets/state-karnataka.jpg";
import tamilnaduImage from "@/assets/state-tamilnadu.jpg";
import gujaratImage from "@/assets/state-gujarat.jpg";

const FPO = () => {
  const statesData = [
    {
      name: "Punjab",
      image: punjabImage,
      fpoCount: "450+",
      mainCrops: "Wheat, Rice, Cotton",
      farmers: "120,000+",
      description: "Punjab leads in mechanized farming with FPOs specializing in wheat and rice production. Strong cooperative networks and government support have made Punjab a model state for FPO implementation.",
      highlights: ["Highest per capita income", "Advanced machinery sharing", "Export-oriented production"],
      color: "from-amber-400 to-yellow-500"
    },
    {
      name: "Maharashtra",
      image: maharashtraImage,
      fpoCount: "680+",
      mainCrops: "Sugarcane, Cotton, Soybean",
      farmers: "200,000+",
      description: "Maharashtra has the largest number of FPOs focusing on sugarcane cooperatives and cotton production. The state's diverse agro-climatic zones support various FPO models from tribal areas to urban farming.",
      highlights: ["Largest FPO network", "Sugar cooperatives model", "Organic farming initiatives"],
      color: "from-orange-400 to-red-500"
    },
    {
      name: "Uttar Pradesh",
      image: upImage,
      fpoCount: "520+",
      mainCrops: "Rice, Wheat, Sugarcane",
      farmers: "180,000+",
      description: "UP's FPOs are transforming traditional farming with focus on sustainable practices and value addition. The state's large agricultural workforce benefits from collective bargaining and shared resources.",
      highlights: ["Largest farming population", "Grain marketing excellence", "Food processing units"],
      color: "from-green-400 to-emerald-500"
    },
    {
      name: "Karnataka",
      image: karnatakaImage,
      fpoCount: "390+",
      mainCrops: "Coffee, Spices, Ragi",
      farmers: "95,000+",
      description: "Karnataka's FPOs excel in high-value crops like coffee and spices. The state pioneered FPO-based organic farming and direct market linkages, setting benchmarks for premium agricultural products.",
      highlights: ["Coffee export leader", "Organic certification", "Tech-enabled farming"],
      color: "from-purple-400 to-indigo-500"
    },
    {
      name: "Tamil Nadu",
      image: tamilnaduImage,
      fpoCount: "410+",
      mainCrops: "Rice, Cotton, Coconut",
      farmers: "105,000+",
      description: "Tamil Nadu's FPOs are known for innovative water management and integrated farming systems. Strong focus on women-led FPOs and agri-processing has created sustainable livelihood opportunities.",
      highlights: ["Women-led FPOs", "Water management", "Agri-processing hubs"],
      color: "from-blue-400 to-cyan-500"
    },
    {
      name: "Gujarat",
      image: gujaratImage,
      fpoCount: "350+",
      mainCrops: "Cotton, Groundnut, Wheat",
      farmers: "90,000+",
      description: "Gujarat's FPOs benefit from strong cooperative culture and entrepreneurial spirit. Focus on dairy integration, cotton marketing, and sustainable agriculture has made Gujarat FPOs financially robust.",
      highlights: ["Dairy-farm integration", "Cotton marketing", "Financial sustainability"],
      color: "from-pink-400 to-rose-500"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Better Market Access",
      description: "FPOs enable small farmers to access larger markets, negotiate better prices, and reduce middleman exploitation through collective bargaining power."
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Shared resources and collective insurance schemes help farmers manage risks related to crop failure, price volatility, and natural disasters."
    },
    {
      icon: Award,
      title: "Quality Standards",
      description: "FPOs ensure consistent quality through standardized practices, leading to better market reputation and premium prices for produce."
    },
    {
      icon: Users,
      title: "Knowledge Sharing",
      description: "Regular training programs, demonstration farms, and peer learning platforms help farmers adopt best practices and modern techniques."
    },
    {
      icon: BarChart3,
      title: "Value Addition",
      description: "FPOs set up processing units and storage facilities, adding value to raw produce and increasing profit margins for member farmers."
    },
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description: "Collective adoption of organic practices, water conservation, and soil health management ensures long-term agricultural sustainability."
    }
  ];

  const features = [
    { label: "Active FPOs", value: "2,800+", icon: Users },
    { label: "Farmer Members", value: "800,000+", icon: Users },
    { label: "States Covered", value: "25+", icon: MapPin },
    { label: "Avg Income Increase", value: "30-40%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={fpoHeroImage}
            alt="Farmer Producer Organizations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white space-y-6">
            <Badge className="bg-primary text-primary-foreground text-sm px-4 py-1">
              Empowering Farmers Together
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Farmer Producer <span className="text-primary">Organizations</span>
            </h1>
            <p className="text-xl leading-relaxed opacity-90">
              Discover how FPOs are transforming Indian agriculture through collective strength, 
              better market access, and sustainable farming practices across states.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Join an FPO
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <IconComponent className="w-10 h-10 mx-auto mb-3 opacity-90" />
                  <div className="text-3xl lg:text-4xl font-bold">{feature.value}</div>
                  <div className="text-sm lg:text-base opacity-90">{feature.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What is FPO Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              What is a Farmer Producer Organization?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Farmer Producer Organization (FPO) is a registered entity formed by primary producers, 
              namely farmers, milk producers, fishermen, weavers, rural artisans, craftsmen, etc. 
              It is a legal entity that works on the principle of collective action and mutual cooperation.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-center">Collective Power</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Small farmers unite to gain bargaining power and access to resources
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="text-center">Member Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Profits shared among members, ensuring equitable growth
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-center">Economic Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    30-40% increase in farmer income through better market access
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* States Section */}
      <section className="py-20" style={{background: 'var(--gradient-light)'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              FPOs Across Indian States
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore how different states are implementing FPOs based on their unique agricultural strengths, 
              crop patterns, and farming traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {statesData.map((state, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={state.image}
                    alt={`${state.name} farming`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${state.color} opacity-40 group-hover:opacity-50 transition-opacity`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-3xl font-bold text-white mb-2">{state.name}</h3>
                    <div className="flex gap-4 text-white text-sm">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {state.fpoCount} FPOs
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {state.farmers} Farmers
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Main Crops</div>
                    <div className="font-semibold text-lg">{state.mainCrops}</div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {state.description}
                  </p>
                  
                  <div>
                    <div className="text-sm font-semibold mb-2">Key Highlights:</div>
                    <ul className="space-y-2">
                      {state.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Benefits of Joining an FPO
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              FPOs provide comprehensive support to farmers, from production to market access, 
              ensuring better income and sustainable livelihoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <IconComponent className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">
              Ready to Join the FPO Movement?
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Connect with existing FPOs in your area or start a new one. Together, we can build 
              a stronger, more prosperous agricultural community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/contact">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FPO;