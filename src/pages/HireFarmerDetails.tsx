import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Star, ArrowLeft, User, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HireFarmerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const farmer = location.state?.farmer;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: (user?.firstName || "") + " " + (user?.lastName || ""),
    phoneNumber: user?.phoneNumber || "",
    date: "",
    time: "",
    address: "",
    duration: "daily",
    specialRequirements: ""
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await res.json();
            setFormData(prev => ({ ...prev, address: data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
          } catch {
            setFormData(prev => ({ ...prev, address: `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}, Jharkhand, India` }));
          }
        },
        () => setFormData(prev => ({ ...prev, address: "Please enter your address manually." }))
      );
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (!farmer) { navigate("/farmers"); return; }
  }, [isAuthenticated, farmer, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    const requiredFields = ['fullName', 'phoneNumber', 'date', 'time', 'address'] as const;
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error("Not authenticated");

      const { error } = await supabase.from('hires').insert({
        user_id: authUser.id,
        farmer_name: farmer.name,
        farmer_location: farmer.location,
        farmer_skills: farmer.skills,
        client_name: formData.fullName,
        client_phone: formData.phoneNumber,
        client_address: formData.address,
        hire_date: formData.date,
        hire_time: formData.time,
        duration_type: formData.duration,
        rate: formData.duration === 'hourly' ? farmer.hourlyRate : farmer.dailyRate,
        special_requirements: formData.specialRequirements || null,
        status: 'pending'
      });

      if (error) throw error;

      toast.success(`Successfully hired ${farmer.name}! We will contact you shortly.`);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error: any) {
      console.error("Error saving hire:", error);
      toast.error(error.message || "Failed to complete hiring. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!farmer) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/farmers")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Farmers
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Farmer Details Card */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader style={{background: 'var(--gradient-primary)'}} className="text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-primary-foreground/20 p-4 rounded-full">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center space-x-2">
                    <span>{farmer.name}</span>
                    {farmer.verified && <Award className="h-5 w-5 text-green-300" />}
                  </CardTitle>
                  <p className="opacity-90 text-sm">{farmer.experience} Experience</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{farmer.location}</p>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.languages?.map((lang: string, i: number) => (
                    <Badge key={i} variant="secondary">{lang}</Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.skills?.map((skill: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-primary/10 text-primary">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.specialties?.map((s: string, i: number) => (
                    <Badge key={i} className="bg-secondary text-secondary-foreground">{s}</Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                <h3 className="font-semibold text-primary mb-3">Pricing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-muted-foreground">Hourly Rate:</span><span className="font-bold text-primary text-lg">{farmer.hourlyRate}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Daily Rate:</span><span className="font-bold text-secondary text-lg">{farmer.dailyRate}</span></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hiring Form */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">Hiring Details</CardTitle>
              <p className="text-center text-sm text-muted-foreground">Fill in the details to hire {farmer.name}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} placeholder="Enter your phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Start Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="date" type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Start Time *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="time" type="time" value={formData.time} onChange={(e) => handleInputChange('time', e.target.value)} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Duration Type *</Label>
                  <div className="flex gap-4">
                    <Button type="button" variant={formData.duration === 'hourly' ? 'default' : 'outline'} onClick={() => handleInputChange('duration', 'hourly')} className="flex-1">Hourly</Button>
                    <Button type="button" variant={formData.duration === 'daily' ? 'default' : 'outline'} onClick={() => handleInputChange('duration', 'daily')} className="flex-1">Daily</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Farm Address *</Label>
                  <textarea id="address" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary" rows={3} placeholder="Your address will be auto-filled using GPS" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                  <textarea id="specialRequirements" value={formData.specialRequirements} onChange={(e) => handleInputChange('specialRequirements', e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary" rows={2} placeholder="Any specific requirements..." />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button onClick={() => navigate("/farmers")} variant="outline" className="flex-1" disabled={isSubmitting}>Cancel</Button>
                <Button onClick={handleConfirm} className="flex-1 bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Confirm Hiring"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HireFarmerDetails;
