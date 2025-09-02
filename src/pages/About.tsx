import { Target, Eye, Award, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      name: "Arvind Kumar",
      role: "Founder",
      experience: "1st-year Data Science, IIT Madras",
      description: "From Ranchi, Jharkhand. Passionate about combining technology with agriculture to solve farmers' real-life problems. Hafto ka kaam, ganto mein!"
    },
    {
      name: "Aman Raj",
      role: "Co-Founder",
      experience: "1st-year Data Science, IIT Madras",
      description: "From Ranchi, Jharkhand. Young visionary working to transform Indian agriculture through technology and make farming easier and more profitable."
    },
    {
      name: "Priyanshu Kumar",
      role: "Team Member",
      experience: "Student at IIT Patna",
      description: "Dedicated team member contributing to our mission of modernizing agriculture and empowering rural communities with technology."
    }
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About KisanSeva Plus
            </h1>
            <p className="text-lg lg:text-xl opacity-90 leading-relaxed">
              Founded by farmers, for farmers. KisanSeva Plus bridges the gap between 
              traditional farming and modern technology, creating opportunities for 
              agricultural growth across India.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20" style={{background: 'var(--gradient-light)'}}>
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
            <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl text-primary-foreground shadow-elevated">
              <h3 className="text-2xl font-bold mb-6">Impact Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">₹50Cr+</div>
                  <div className="text-sm opacity-90">Equipment Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">2L+</div>
                  <div className="text-sm opacity-90">Farming Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm opacity-90">Villages Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-sm opacity-90">Return Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const colors = [
                'from-green-400 to-emerald-500', // Our Mission - Green
                'from-blue-400 to-cyan-500', // Our Vision - Blue  
                'from-purple-400 to-violet-500', // Our Values - Purple
                'from-orange-400 to-amber-500' // Our Community - Orange
              ];
              const bgColors = [
                'bg-green-50', // Our Mission background
                'bg-blue-50', // Our Vision background  
                'bg-purple-50', // Our Values background
                'bg-orange-50' // Our Community background
              ];
              return (
                <div key={index} className={`${bgColors[index]} rounded-3xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                  <div className="text-center space-y-6">
                    <div className={`bg-gradient-to-br ${colors[index]} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20" style={{background: 'var(--gradient-section)'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Young visionaries from IIT Madras working to transform Indian agriculture through technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-elevated transition-shadow bg-card">
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
      <section className="py-20" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you're a farmer looking for equipment, an equipment owner 
            wanting to maximize returns, or an agricultural professional seeking 
            opportunities, we welcome you to our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/signup">Become a Partner</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;