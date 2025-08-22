import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ScheduleModal from "@/components/ScheduleModal";

const Contact = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case "Call Now":
        window.open("tel:+919608792602", "_self");
        break;
      case "Send Email":
        window.open("mailto:info@kisansevaplus.com", "_self");
        break;
      case "Get Directions":
        window.open("https://maps.google.com?q=KisanSeva+Plus+Complex,+Ranchi,+Jharkhand", "_blank");
        break;
      case "View Schedule":
        setIsScheduleModalOpen(true);
        break;
      default:
        break;
    }
  };
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+91 9608792602",
      description: "24/7 customer support available",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "info@kisansevaplus.com",
      description: "Response within 2-4 hours",
      action: "Send Email"
    },
    {
      icon: MapPin,
      title: "Head Office",
      details: "KisanSeva Plus Complex, Ranchi, Jharkhand",
      description: "Visit us during business hours",
      action: "Get Directions"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Sat: 9:00 AM - 6:00 PM",
      description: "Emergency support 24/7",
      action: "View Schedule"
    }
  ];

  const faqs = [
    {
      question: "How do I verify my KYC documents?",
      answer: "Upload your Aadhaar, PAN, and address proof through our mobile app. Verification typically takes 24-48 hours."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept UPI, Net Banking, Credit/Debit Cards, and Cash on Delivery for equipment rentals."
    },
    {
      question: "Is there insurance coverage for rented equipment?",
      answer: "Yes, all equipment rentals include basic insurance. Additional coverage options are available."
    },
    {
      question: "Can I cancel a booking?",
      answer: "Bookings can be cancelled up to 24 hours before the scheduled time without charges."
    }
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
            Have questions or need support? Our dedicated team is here to help 
            you with all your agricultural service needs.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20" style={{background: 'var(--gradient-light)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="text-center hover:shadow-elevated transition-shadow bg-card">
                  <CardHeader className="pb-4">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="font-semibold text-foreground">{info.details}</div>
                    <CardDescription>{info.description}</CardDescription>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={() => handleAction(info.action)}
                    >
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <Card className="bg-card shadow-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Get in Touch</span>
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        First Name
                      </label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Last Name
                      </label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input type="tel" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Subject
                    </label>
                    <Input placeholder="What is this regarding?" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us how we can help you..."
                      rows={4}
                    />
                  </div>
                  
                  <Button className="w-full" size="lg" style={{background: 'var(--gradient-primary)'}}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Locations
              </h2>
              
              <div className="space-y-6">
                <Card className="bg-card shadow-elevated">
                  <CardHeader>
                    <CardTitle className="text-xl">Head Office - Ranchi</CardTitle>
                    <CardDescription>Main headquarters and customer service center</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-primary mt-0.5" />
                        <span>KisanSeva Plus Complex, Ranchi, Jharkhand - 834002</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>+91 9608792602</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-elevated">
                  <CardHeader>
                    <CardTitle className="text-xl">Regional Office - Punjab</CardTitle>
                    <CardDescription>Northern region operations center</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-secondary mt-0.5" />
                        <span>456 Farm Complex, Ludhiana, Punjab - 141001</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-secondary" />
                        <span>+91 98765 43211</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span>Mon-Sat: 8:00 AM - 7:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card shadow-elevated">
                  <CardHeader>
                    <CardTitle className="text-xl">Regional Office - Maharashtra</CardTitle>
                    <CardDescription>Western region operations center</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-primary mt-0.5" />
                        <span>789 Agri Plaza, Pune, Maharashtra - 411001</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>+91 98765 43212</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our services and platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-elevated transition-shadow bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <Button variant="outline" size="lg">
              View All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-destructive text-destructive-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Emergency Support</h2>
          <p className="text-lg opacity-90 mb-6">
            For urgent equipment breakdowns or emergency assistance, 
            call our 24/7 helpline immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Emergency: +91 9608792602</span>
            </Button>
          </div>
        </div>
      </section>

      <ScheduleModal 
        isOpen={isScheduleModalOpen} 
        onClose={() => setIsScheduleModalOpen(false)} 
      />
    </div>
  );
};

export default Contact;