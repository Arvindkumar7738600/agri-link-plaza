import { useState } from "react";
import { Search, HelpCircle, Settings, DollarSign, Zap, Shield, Users, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [
    {
      id: "general",
      title: "General Questions",
      icon: HelpCircle,
      color: "from-blue-500 to-purple-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-purple-500"
    },
    {
      id: "services",
      title: "Services & Solutions",
      icon: Settings,
      color: "from-green-500 to-teal-500",
      iconBg: "bg-gradient-to-br from-green-500 to-teal-500"
    },
    {
      id: "pricing",
      title: "Pricing & Billing",
      icon: DollarSign,
      color: "from-pink-500 to-purple-500",
      iconBg: "bg-gradient-to-br from-pink-500 to-purple-500"
    },
    {
      id: "technical",
      title: "Technical",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500"
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: Shield,
      color: "from-cyan-500 to-blue-500",
      iconBg: "bg-gradient-to-br from-cyan-500 to-blue-500"
    },
    {
      id: "support",
      title: "Support & Implementation",
      icon: Users,
      color: "from-purple-500 to-indigo-500",
      iconBg: "bg-gradient-to-br from-purple-500 to-indigo-500"
    }
  ];

  const faqs = {
    general: [
      {
        question: "KisanSeva Plus kya hai aur aap kya karte hain?",
        answer: "KisanSeva Plus ek digital platform hai jo farmers ko modern agricultural services provide karta hai. Hum crop monitoring, weather predictions, market prices, government schemes, expert advice, aur direct market access dete hain. Hamara mission hai technology ke through farming ko easier aur profitable banana."
      },
      {
        question: "Kaun kaun se kisanon ke liye yeh service hai?",
        answer: "Hamare services sabhi prakar ke kisanon ke liye hain - chote farmers se lekar bade commercial farmers tak. Hum individual farmers, FPOs (Farmer Producer Organizations), aur agricultural businesses ke saath kaam karte hain."
      },
      {
        question: "Registration kaise karein?",
        answer: "Registration bahut simple hai. Aap hamare website par ja kar 'Sign Up' par click karein. Apna naam, phone number, aur basic farm details dalein. Verification ke baad aap turant services use kar sakte hain. Registration completely free hai."
      },
      {
        question: "Kya yeh service Hindi aur local languages mein available hai?",
        answer: "Haan bilkul! Hamara platform Hindi, English, aur 6 major regional languages (Marathi, Punjabi, Tamil, Telugu, Gujarati, Bengali) mein available hai. Aap apni preferred language select kar sakte hain."
      }
    ],
    services: [
      {
        question: "Kaun kaun si services provide karte hain aap?",
        answer: "Hum multiple services provide karte hain: 1) Real-time crop monitoring via satellite imagery, 2) Weather forecasting aur alerts, 3) Mandi prices aur market trends, 4) Government schemes ki information, 5) Expert agricultural advice through video/call, 6) Direct buyer connection for produce selling, 7) Quality testing services, 8) Farm equipment rental information."
      },
      {
        question: "Crop monitoring kaise kaam karta hai?",
        answer: "Hamara crop monitoring system satellite imagery aur AI technology use karta hai. Yeh aapke crop ki health, growth pattern, water requirements, aur disease detection ko track karta hai. Aapko regular updates aur alerts milte hain agar koi problem detect hoti hai."
      },
      {
        question: "Expert advice kaise milti hai?",
        answer: "Aap apne dashboard se directly agricultural experts ko call ya video call kar sakte hain. Experts aapke questions answer karte hain soil testing, seed selection, pest control, fertilizer use, aur best farming practices ke baare mein. Scheduled consultations bhi book kar sakte hain."
      },
      {
        question: "Market access kaise milta hai?",
        answer: "Hamara platform aapko directly buyers ke saath connect karta hai. Aap apni produce ki details, quantity, aur expected price dal sakte hain. Interested buyers directly aapse contact karenge. Yeh middlemen ko eliminate karta hai aur better prices ensure karta hai."
      }
    ],
    pricing: [
      {
        question: "Services ki cost kya hai?",
        answer: "Hamare basic services (weather updates, mandi prices, government schemes) completely free hain. Premium services jaise expert consultations aur advanced crop monitoring ke liye reasonable monthly/yearly plans hain starting from ₹299/month. Aap apni requirement ke according plan choose kar sakte hain."
      },
      {
        question: "Payment kaise kar sakte hain?",
        answer: "Multiple payment options available hain - UPI, credit/debit card, net banking, aur wallet payments. Aap cash payment bhi selected centers par kar sakte hain. All payments secure aur encrypted hain."
      },
      {
        question: "Kya refund policy hai?",
        answer: "Agar aap service se satisfied nahi hain, to first 7 days ke andar full refund mil sakta hai. Premium services ke liye specific terms apply hote hain jo subscription time par clearly mentioned hote hain."
      },
      {
        question: "Kya group discounts available hain FPOs ke liye?",
        answer: "Haan! FPOs aur farmer groups ke liye special discount packages available hain. 10+ farmers ke group ke liye 20-30% discount mil sakta hai. Details ke liye hamse contact karein."
      }
    ],
    technical: [
      {
        question: "Kya internet connection zaroori hai?",
        answer: "Basic features ke liye minimal internet requirement hai. Hum low bandwidth optimization use karte hain jo slow connections par bhi kaam karta hai. Kuch features offline mode mein bhi available hain jo automatically sync ho jaate hain jab internet available ho."
      },
      {
        question: "Kaun se devices supported hain?",
        answer: "Hamara platform smartphones (Android aur iOS), tablets, aur computers (web browser) sabhi par kaam karta hai. Minimum requirement hai: Android 6.0+, iOS 12+, ya modern web browser."
      },
      {
        question: "Data storage kaise hota hai?",
        answer: "Aapka saara farm data securely cloud servers par stored hota hai with regular backups. Aap apne historical data ko kabhi bhi access kar sakte hain - crop records, transactions, expert consultations, everything."
      },
      {
        question: "Technical problems ho to kya karein?",
        answer: "Hamari 24/7 technical support team available hai. Aap helpline number, email, ya in-app chat se support le sakte hain. Common issues ke liye step-by-step video tutorials bhi available hain in your preferred language."
      }
    ],
    security: [
      {
        question: "Mera data kitna secure hai?",
        answer: "Aapka data completely secure hai. Hum bank-level encryption use karte hain (256-bit SSL). Aapka personal information, farm details, aur payment information strictly confidential rakha jata hai. Third parties ke saath kabhi share nahi hota bina aapki permission ke."
      },
      {
        question: "Privacy policy kya hai?",
        answer: "Hamari strict privacy policy hai. Aapka data sirf services provide karne ke liye use hota hai. Marketing ya third-party sharing ke liye kabhi use nahi hota. Aap apni settings mein control kar sakte hain ki kaun si information visible ho aur kisko."
      },
      {
        question: "Account security kaise ensure karein?",
        answer: "Strong password use karein, two-factor authentication enable karein (OTP via SMS), aur apne login credentials kabhi share na karein. Agar suspicious activity dikhe to turant password change karein aur hamse contact karein."
      },
      {
        question: "Government data ke saath kaise integrate hota hai?",
        answer: "Hum officially authorized APIs use karte hain government databases se connect karne ke liye. Yeh subsidy information, PM-KISAN status, aur government schemes ka access provide karta hai securely."
      }
    ],
    support: [
      {
        question: "Customer support kab available hai?",
        answer: "Hamari customer support team Monday to Saturday, 8 AM to 8 PM available hai. Emergency farming issues ke liye 24/7 helpline bhi available hai. Sundays ko bhi limited support available hai."
      },
      {
        question: "Training aur onboarding kaise hoti hai?",
        answer: "New users ke liye complete onboarding program hai. Video tutorials, step-by-step guides, aur personal training sessions available hain. Local language support ensures ki aap easily platform use karna seekh sakte hain. FPOs ke liye group training sessions bhi organize karte hain."
      },
      {
        question: "Field visits karte hain kya experts?",
        answer: "Haan, premium plans mein periodic field visits included hain. Experts physically aapki farm par aa kar soil testing, crop inspection, aur personalized recommendations provide karte hain. Emergency cases mein bhi field visits arrange ki ja sakti hain."
      },
      {
        question: "Kya community support available hai?",
        answer: "Haan! Hamara farmer community forum hai jahan aap doosre farmers se connect kar sakte hain, experiences share kar sakte hain, aur tips exchange kar sakte hain. Success stories, best practices, aur local knowledge sharing hoti hai regularly."
      }
    ]
  };

  const filteredFAQs = () => {
    if (!searchQuery && !selectedCategory) return faqs;
    
    let filtered: typeof faqs = {
      general: [],
      services: [],
      pricing: [],
      technical: [],
      security: [],
      support: []
    };

    Object.entries(faqs).forEach(([category, questions]) => {
      if (selectedCategory && category !== selectedCategory) return;
      
      const matchingQuestions = questions.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      filtered[category as keyof typeof faqs] = matchingQuestions;
    });

    return filtered;
  };

  const displayedFAQs = filteredFAQs();
  const hasResults = Object.values(displayedFAQs).some(arr => arr.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              KisanSeva Plus ki services, pricing, implementation process, aur zyada ke baare mein common questions ke quick answers paayein. 
              Jo dhoondh rahe hain nahi mil raha? Hum help karne ke liye hain.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search frequently asked questions..."
                className="pl-12 h-14 text-lg bg-card border-2 shadow-lg focus:shadow-xl transition-shadow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <Card
                  key={category.id}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 overflow-hidden animate-fade-in ${
                    isSelected ? 'border-primary shadow-2xl ring-2 ring-primary/20' : 'border-border'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                >
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity"></div>
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl ${category.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {faqs[category.id as keyof typeof faqs].length} questions
                    </div>
                    {isSelected && (
                      <div className="mt-4 text-sm font-medium text-primary">
                        ✓ Selected
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedCategory && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
              >
                Clear Filter
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {!hasResults ? (
            <Card className="p-12 text-center">
              <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
                Clear All Filters
              </Button>
            </Card>
          ) : (
            <div className="space-y-12">
              {Object.entries(displayedFAQs).map(([categoryId, questions]) => {
                if (questions.length === 0) return null;
                
                const category = categories.find(c => c.id === categoryId);
                if (!category) return null;

                const Icon = category.icon;

                return (
                  <div key={categoryId} className="animate-fade-in">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl ${category.iconBg} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold">{category.title}</h2>
                    </div>

                    <Card className="border-2 shadow-lg overflow-hidden">
                      <Accordion type="single" collapsible className="w-full">
                        {questions.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`${categoryId}-${index}`}
                            className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                          >
                            <AccordionTrigger className="px-6 py-5 text-left hover:no-underline">
                              <span className="text-lg font-semibold pr-4">{faq.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 pt-2">
                              <div className="text-muted-foreground leading-relaxed text-base bg-muted/30 p-4 rounded-lg">
                                {faq.answer}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Hamari support team aapki help ke liye ready hai. Hum se contact karein aur hum aapke saare questions ka jawab denge.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/contact")} className="shadow-lg hover:shadow-xl">
              Contact Support
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/signup")} className="shadow-lg hover:shadow-xl">
              Get Started Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
