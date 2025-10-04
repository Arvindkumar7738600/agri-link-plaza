import { Tractor, Users, MapPin, Shield, Clock, Phone, Leaf } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslations } from "@/hooks/useTranslations";

const Services = () => {
  const { t } = useTranslations();
  
  const mainServices = [
    {
      icon: Tractor,
      title: t('equipmentRental'),
      description: t('comprehensiveRentalServices'),
      features: [
        t('tractors'),
        t('harvestersAndCombines'),
        t('tillersAndCultivators'),
        t('irrigationEquipment'),
        t('sprayingSystems')
      ],
      pricing: t('startingFromHour'),
      link: "/booking"
    },
    {
      icon: Users,
      title: t('farmerHiring'),
      description: t('connectWithSkilled'),
      features: [
        t('experiencedFarmWorkers'),
        t('tractorOperators'),
        t('harvestSpecialists'),
        t('irrigationExperts'),
        t('agriculturalConsultants')
      ],
      pricing: t('startingFromDay'),
      link: "/farmers"
    },
    {
      icon: Leaf,
      title: t('fpoServices'),
      description: t('joinFpo'),
      features: [
        t('fpoRegistration'),
        t('collectiveBargaining'),
        t('accessMarkets'),
        t('sharedResources'),
        t('governmentBenefits')
      ],
      pricing: t('freeConsultation'),
      link: "/fpo"
    }
  ];

  const additionalServices = [
    {
      icon: MapPin,
      title: t('locationBasedSearch'),
      description: t('findServicesNear')
    },
    {
      icon: Shield,
      title: t('kycVerificationTitle'),
      description: t('allUsersVerified')
    },
    {
      icon: Clock,
      title: t('support247'),
      description: t('roundClockSupport')
    },
    {
      icon: Phone,
      title: t('emergencyServices'),
      description: t('urgentEquipmentBreakdown')
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: t('registerAndVerify'),
      description: t('createAccountKyc')
    },
    {
      step: "2", 
      title: t('browseAndSelect'),
      description: t('findEquipmentFarmers')
    },
    {
      step: "3",
      title: t('bookAndPay'),
      description: t('secureBookingPayment')
    },
    {
      step: "4",
      title: t('useAndReview'),
      description: t('getServiceFeedback')
    }
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="py-20" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {t('services')}
          </h1>
          <p className="text-lg lg:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            {t('comprehensiveAgricultural')}
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20" style={{background: 'var(--gradient-light)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                      <h4 className="font-semibold mb-3 text-foreground">{t('availableServices')}</h4>
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
                      <div className="text-sm text-muted-foreground">{t('pricesVary')}</div>
                    </div>

                    <Button className="w-full" size="lg" asChild style={{background: 'var(--gradient-primary)'}}>
                      <Link to={service.link}>
                        {t('getStarted')}
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
              {t('additionalFeatures')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('extraServices')}
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
      <section className="py-20" style={{background: 'var(--gradient-section)'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('howItWorks')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('simpleProcess')}
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
      <section className="py-20" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-primary-foreground">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('transparentPricing')}
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              {t('noHiddenFees')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="text-xl font-bold mb-4">{t('basicPlan')}</h3>
              <div className="text-3xl font-bold mb-4">₹0<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2 opacity-90">
                <li>• {t('basicFeature1')}</li>
                <li>• {t('basicFeature2')}</li>
                <li>• {t('basicFeature3')}</li>
              </ul>
            </div>

            <div className="bg-secondary text-secondary-foreground p-6 rounded-lg transform scale-105">
              <h3 className="text-xl font-bold mb-4">{t('premiumPlan')}</h3>
              <div className="text-3xl font-bold mb-4">₹299<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2">
                <li>• {t('premiumFeature1')}</li>
                <li>• {t('premiumFeature2')}</li>
                <li>• {t('premiumFeature3')}</li>
                <li>• {t('premiumFeature4')}</li>
              </ul>
            </div>

            <div className="bg-primary-foreground/10 p-6 rounded-lg backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="text-xl font-bold mb-4">{t('enterprisePlan')}</h3>
              <div className="text-3xl font-bold mb-4">{t('custom')}</div>
              <ul className="space-y-2 opacity-90">
                <li>• {t('enterpriseFeature1')}</li>
                <li>• {t('enterpriseFeature2')}</li>
                <li>• {t('enterpriseFeature3')}</li>
                <li>• {t('enterpriseFeature4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;