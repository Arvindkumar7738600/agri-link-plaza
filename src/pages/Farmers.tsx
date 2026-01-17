import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Star, Clock, Phone, User, Award, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks/useTranslations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SkilledFarmer {
  id: string;
  skills: string[];
  experience_years: number | null;
  hourly_rate: number | null;
  daily_rate: number | null;
  availability_status: string;
  languages: string[] | null;
  specialties: string[] | null;
  bio: string | null;
  provider: {
    id: string;
    full_name: string;
    phone_number: string;
    district: string | null;
    state: string | null;
    profile_photo_url: string | null;
  };
}

interface ExpertFarmer {
  id: string;
  expertise_areas: string[];
  experience_years: number | null;
  consultation_fee: number | null;
  availability_status: string;
  languages: string[] | null;
  qualifications: string[] | null;
  certifications: string[] | null;
  bio: string | null;
  is_verified_expert: boolean;
  consultation_modes: string[] | null;
  provider: {
    id: string;
    full_name: string;
    phone_number: string;
    district: string | null;
    state: string | null;
    profile_photo_url: string | null;
  };
}

const Farmers = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [skilledFarmers, setSkilledFarmers] = useState<SkilledFarmer[]>([]);
  const [expertFarmers, setExpertFarmers] = useState<ExpertFarmer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'skilled' | 'expert'>('skilled');
  const { t } = useTranslations();

  const skills = [
    { id: "all", label: "All Skills" },
    { id: "tractor-operator", label: "Tractor Operator" },
    { id: "harvesting", label: "Harvesting" },
    { id: "planting", label: "Planting & Sowing" },
    { id: "irrigation", label: "Irrigation" },
    { id: "pesticide", label: "Pesticide Application" },
  ];

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      // Fetch skilled farmers
      const { data: skilledData, error: skilledError } = await supabase
        .from('skilled_farmer_profiles')
        .select(`
          *,
          provider:providers!skilled_farmer_profiles_provider_id_fkey(id, full_name, phone_number, district, state, profile_photo_url)
        `)
        .eq('is_active', true);

      if (skilledError) throw skilledError;

      // Fetch expert farmers
      const { data: expertData, error: expertError } = await supabase
        .from('expert_farmer_profiles')
        .select(`
          *,
          provider:providers!expert_farmer_profiles_provider_id_fkey(id, full_name, phone_number, district, state, profile_photo_url)
        `)
        .eq('is_active', true);

      if (expertError) throw expertError;

      setSkilledFarmers((skilledData || []).map(item => ({
        ...item,
        provider: item.provider as SkilledFarmer['provider']
      })));
      
      setExpertFarmers((expertData || []).map(item => ({
        ...item,
        provider: item.provider as ExpertFarmer['provider']
      })));
    } catch (error) {
      console.error('Error fetching farmers:', error);
      toast.error('Failed to load farmer listings');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSkilledFarmers = selectedSkill === "all" 
    ? skilledFarmers 
    : skilledFarmers.filter(farmer => 
        farmer.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()))
      );

  return (
    <div className="min-h-screen pt-8">
      {/* Header */}
      <section className="py-12" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-primary-foreground">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center">
            Hire Skilled Farmers
          </h1>
          <p className="text-lg opacity-90 text-center max-w-2xl mx-auto">
            Connect with experienced agricultural workers and skilled farmers 
            in your area. Get the expertise you need for your farming operations.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-border" style={{background: 'var(--gradient-light)'}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Location Search */}
            <div className="relative flex-1 max-w-md">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Skill Filter */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Button
                  key={skill.id}
                  variant={selectedSkill === skill.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSkill(skill.id)}
                  className="whitespace-nowrap"
                  style={selectedSkill === skill.id ? {background: 'var(--gradient-primary)'} : {}}
                >
                  {skill.label}
                </Button>
              ))}
            </div>

            {/* Search Button */}
            <Button className="flex items-center space-x-2" style={{background: 'var(--gradient-primary)'}}>
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Farmers Listings */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Tab Switch */}
          <div className="flex gap-4 mb-8">
            <Button 
              variant={activeTab === 'skilled' ? 'default' : 'outline'}
              onClick={() => setActiveTab('skilled')}
              style={activeTab === 'skilled' ? {background: 'var(--gradient-primary)'} : {}}
            >
              Skilled Farmers ({filteredSkilledFarmers.length})
            </Button>
            <Button 
              variant={activeTab === 'expert' ? 'default' : 'outline'}
              onClick={() => setActiveTab('expert')}
              style={activeTab === 'expert' ? {background: 'var(--gradient-primary)'} : {}}
            >
              Expert Farmers ({expertFarmers.length})
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading farmers...</span>
            </div>
          ) : activeTab === 'skilled' ? (
            /* Skilled Farmers Grid */
            filteredSkilledFarmers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No skilled farmers found. Check back later!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSkilledFarmers.map((farmer) => (
                  <Card key={farmer.id} className="hover:shadow-elevated transition-shadow bg-card">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1 flex items-center space-x-2">
                              <span>{farmer.provider?.full_name}</span>
                              <Award className="h-4 w-4 text-green-500" />
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{farmer.provider?.district}, {farmer.provider?.state}</span>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={farmer.availability_status === 'available' ? "secondary" : "destructive"}>
                          {farmer.availability_status === 'available' ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="font-medium">{farmer.experience_years || 0} years</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">4.5</span>
                        </div>
                        <span className="text-sm text-muted-foreground">(New)</span>
                      </div>

                      {farmer.languages && farmer.languages.length > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Languages:</span>
                          <span className="font-medium">{farmer.languages.join(", ")}</span>
                        </div>
                      )}

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Skills:</div>
                        <div className="flex flex-wrap gap-1">
                          {farmer.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {farmer.specialties && farmer.specialties.length > 0 && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Specialties:</div>
                          <div className="flex flex-wrap gap-1">
                            {farmer.specialties.slice(0, 3).map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Hourly Rate:</span>
                          <span className="font-bold text-primary">
                            {farmer.hourly_rate ? `₹${farmer.hourly_rate}/hour` : 'Contact'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Daily Rate:</span>
                          <span className="font-bold text-secondary">
                            {farmer.daily_rate ? `₹${farmer.daily_rate}/day` : 'Contact'}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1" 
                          disabled={farmer.availability_status !== 'available'}
                          variant={farmer.availability_status === 'available' ? "default" : "secondary"}
                          style={farmer.availability_status === 'available' ? {background: 'var(--gradient-primary)'} : {}}
                          onClick={() => {
                            if (farmer.availability_status === 'available') {
                              navigate('/hire-farmer-details', { 
                                state: { 
                                  farmer: {
                                    id: farmer.id,
                                    name: farmer.provider?.full_name,
                                    skills: farmer.skills,
                                    experience: `${farmer.experience_years || 0} years`,
                                    hourlyRate: farmer.hourly_rate ? `₹${farmer.hourly_rate}/hour` : 'Contact',
                                    dailyRate: farmer.daily_rate ? `₹${farmer.daily_rate}/day` : 'Contact',
                                    location: `${farmer.provider?.district}, ${farmer.provider?.state}`,
                                    languages: farmer.languages || [],
                                    specialties: farmer.specialties || [],
                                    available: farmer.availability_status === 'available'
                                  }
                                } 
                              });
                            }
                          }}
                        >
                          {farmer.availability_status === 'available' ? "Hire Now" : "Not Available"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ) : (
            /* Expert Farmers Grid */
            expertFarmers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No expert farmers found. Check back later!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {expertFarmers.map((farmer) => (
                  <Card key={farmer.id} className="hover:shadow-elevated transition-shadow bg-card border-2 border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1 flex items-center space-x-2">
                              <span>{farmer.provider?.full_name}</span>
                              {farmer.is_verified_expert && (
                                <Badge className="bg-blue-500 text-white text-xs">Verified Expert</Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{farmer.provider?.district}, {farmer.provider?.state}</span>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={farmer.availability_status === 'available' ? "secondary" : "destructive"}>
                          {farmer.availability_status === 'available' ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="font-medium">{farmer.experience_years || 0} years</span>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Expertise:</div>
                        <div className="flex flex-wrap gap-1">
                          {farmer.expertise_areas.slice(0, 3).map((area, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {farmer.qualifications && farmer.qualifications.length > 0 && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Qualifications:</div>
                          <div className="flex flex-wrap gap-1">
                            {farmer.qualifications.slice(0, 2).map((qual, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {qual}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {farmer.consultation_modes && farmer.consultation_modes.length > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Consult via:</span>
                          <span className="font-medium">{farmer.consultation_modes.join(", ")}</span>
                        </div>
                      )}

                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Consultation Fee:</span>
                          <span className="font-bold text-primary text-lg">
                            {farmer.consultation_fee ? `₹${farmer.consultation_fee}` : 'Contact'}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1" 
                          disabled={farmer.availability_status !== 'available'}
                          style={farmer.availability_status === 'available' ? {background: 'var(--gradient-primary)'} : {}}
                        >
                          {farmer.availability_status === 'available' ? "Book Consultation" : "Not Available"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12" style={{background: 'var(--gradient-section)'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Skilled Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Job Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1hr</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">4.7★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12" style={{background: 'var(--gradient-primary)'}}>
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold mb-4">Need Help Finding the Right Farmer?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Our support team can help you find farmers with specific skills 
            and experience for your agricultural needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>24/7 Support</span>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Call +91 9608792602
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Farmers;