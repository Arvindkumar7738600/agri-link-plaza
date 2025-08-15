import { Target, Eye, Award, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To modernize Indian agriculture by connecting farmers with technology, equipment, and skilled professionals through a trusted digital platform."
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To become India's leading agricultural marketplace, empowering millions of farmers with access to resources and opportunities."
    },
    {
      icon: Award,
      title: "Our Values",
      description: "Trust, Innovation, Sustainability, and Farmer-first approach guide everything we do at KisanSeva Plus."
    },
    {
      icon: Users,
      title: "Our Community",
      description: "Building a strong network of farmers, equipment owners, and agricultural professionals across India."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      experience: "15+ years in Agriculture",
      description: "Former agricultural officer with deep understanding of farmer challenges"
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      experience: "12+ years in Technology",
      description: "Tech expert focused on building farmer-friendly digital solutions"
    },
    {
      name: "Amit Singh",
      role: "Head of Operations",
      experience: "10+ years in Logistics",
      description: "Specialist in agricultural supply chain and equipment management"
    }
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About KisanSeva Plus
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Founded by farmers, for farmers. KisanSeva Plus bridges the gap between 
              traditional farming and modern technology, creating opportunities for 
              agricultural growth across India.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  KisanSeva Plus was born from a simple observation: farmers across India 
                  had limited access to modern agricultural equipment and skilled labor, 
                  while equipment owners struggled to maximize their asset utilization.
                </p>
                <p>
                  Founded in 2023, our platform has grown from a small team of agricultural 
                  enthusiasts to a comprehensive ecosystem serving thousands of farmers 
                  across 25+ states in India.
                </p>
                <p>
                  We believe that technology should empower farmers, not complicate their 
                  lives. That's why every feature we build is designed with simplicity, 
                  reliability, and farmer needs at its core.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Impact Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">₹50Cr+</div>
                  <div className="text-sm text-muted-foreground">Equipment Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">2L+</div>
                  <div className="text-sm text-muted-foreground">Farming Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Villages Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Return Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values shape how we build products, serve customers, 
              and contribute to the agricultural community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals with deep agricultural expertise and 
              technology background working to transform farming in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <div className="text-primary font-medium">{member.role}</div>
                  <div className="text-sm text-muted-foreground">{member.experience}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you're a farmer looking for equipment, an equipment owner 
            wanting to maximize returns, or an agricultural professional seeking 
            opportunities, we welcome you to our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
              Become a Partner
            </button>
            <button className="border border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary-foreground hover:text-primary transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;