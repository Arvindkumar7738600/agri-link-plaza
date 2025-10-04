import { Target, Eye, Award, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslations } from "@/hooks/useTranslations";

const About = () => {
  const { t } = useTranslations();
  
  const values = [
    {
      icon: Target,
      title: t('ourMission'),
      description: t('missionDesc')
    },
    {
      icon: Eye,
      title: t('ourVision'),
      description: t('visionDesc')
    },
    {
      icon: Award,
      title: t('ourValues'),
      description: t('valuesDesc')
    },
    {
      icon: Users,
      title: t('ourCommunity'),
      description: t('communityDesc')
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
              {t('aboutTitle')}
            </h1>
            <p className="text-lg lg:text-xl opacity-90 leading-relaxed">
              {t('aboutIntro')}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20" style={{background: 'var(--gradient-light)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">{t('ourStory')}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('storyPara1')}</p>
                <p>{t('storyPara2')}</p>
                <p>{t('storyPara3')}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-8 rounded-3xl text-foreground shadow-elevated border border-purple-200">
              <h3 className="text-2xl font-bold mb-6 text-purple-900">{t('impactNumbers')}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-purple-800">₹50Cr+</div>
                  <div className="text-sm text-purple-700">{t('equipmentBookingsValue')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-purple-800">2L+</div>
                  <div className="text-sm text-purple-700">{t('farmingHours')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-purple-800">500+</div>
                  <div className="text-sm text-purple-700">{t('villagesReached')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-purple-800">95%</div>
                  <div className="text-sm text-purple-700">{t('returnRate')}</div>
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
              {t('whatDrivesUs')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('whatDrivesUsDesc')}
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
              {t('meetOurTeam')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('meetOurTeamDesc')}
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
            {t('joinMission')}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t('joinMissionDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/signup">{t('becomePartner')}</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">{t('contactUsButton')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;