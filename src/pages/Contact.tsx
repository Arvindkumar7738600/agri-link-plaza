import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScheduleModal from "@/components/ScheduleModal";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const navigate = useNavigate();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: ""
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Uncomment once the enquiries table is created via Supabase migration
      // const { error } = await supabase
      //   .from('enquiries')
      //   .insert({
      //     first_name: formData.firstName,
      //     last_name: formData.lastName,
      //     email: formData.email,
      //     phone_number: formData.phoneNumber,
      //     subject: formData.subject,
      //     message: formData.message
      //   });
      // if (error) throw error;
      
      // Simulate successful submission for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. We'll get back to you soon.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: ""
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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

      {/* Call Center Style Contact Section */}
      <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(135deg, hsl(120, 60%, 35%) 0%, hsl(120, 50%, 45%) 50%, hsl(120, 45%, 55%) 100%)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-white space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Need Help? Get Free Consultation!
              </h2>
              <p className="text-lg lg:text-xl opacity-90 leading-relaxed">
                Experience you can trust, service you can count on. KisanSeva Plus – your partner in progress!
              </p>
              <Button 
                size="lg" 
                className="bg-white text-green-700 hover:bg-green-50 font-semibold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open("tel:+919608792602", "_self")}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Us Now
              </Button>
            </div>

            {/* Right Side - Call Center Image */}
            <div className="relative lg:ml-8">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/ea069e53-81b5-4810-b8db-c25bd54f94a5.png" 
                  alt="Customer support executives at KisanSeva Plus call center"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20" style={{background: 'var(--gradient-light)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const colors = [
                'from-green-400 to-emerald-500', // Phone Support - Green
                'from-blue-400 to-cyan-500', // Email Support - Blue  
                'from-purple-400 to-violet-500', // Head Office - Purple
                'from-orange-400 to-amber-500' // Business Hours - Orange
              ];
              const bgColors = [
                'bg-green-50', // Phone Support background
                'bg-blue-50', // Email Support background  
                'bg-purple-50', // Head Office background
                'bg-orange-50' // Business Hours background
              ];
              return (
                <div key={index} className={`${bgColors[index]} rounded-3xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                  <div className="text-center space-y-6">
                    <div className={`bg-gradient-to-br ${colors[index]} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {info.title}
                      </h3>
                      <div className="text-gray-800 font-semibold text-sm">{info.details}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {info.description}
                      </p>
                      <button 
                        className="bg-white text-gray-700 hover:bg-gray-100 transition-colors px-4 py-2 rounded-lg border border-gray-300 font-medium text-sm"
                        onClick={() => handleAction(info.action)}
                      >
                        {info.action}
                      </button>
                    </div>
                  </div>
                </div>
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
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          First Name
                        </label>
                        <Input 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Last Name
                        </label>
                        <Input 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email Address
                      </label>
                      <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number
                      </label>
                      <Input 
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Subject
                      </label>
                      <Input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Message
                      </label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        rows={4}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full" 
                      size="lg" 
                      style={{background: 'var(--gradient-primary)'}}
                      disabled={isSubmitting}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
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
            <Button variant="outline" size="lg" onClick={() => navigate("/faqs")}>
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