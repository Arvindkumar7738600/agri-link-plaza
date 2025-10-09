import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Star, ArrowLeft, User, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { saveHireToFirestore } from "@/lib/firestore";
import { toast } from "@/hooks/use-toast";

const HireFarmerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const farmer = location.state?.farmer;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.firstName + " " + user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    date: "",
    time: "",
    address: "",
    duration: "daily",
    specialRequirements: ""
  });

  // Get user's location for address auto-fill
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            address: `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}, Jharkhand, India`
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          setFormData(prev => ({
            ...prev,
            address: "Unable to get location. Please enter manually."
          }));
        }
      );
    }
  }, []);

  // Redirect if not authenticated or no farmer data
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!farmer) {
      navigate("/farmers");
      return;
    }
  }, [isAuthenticated, farmer, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    // Validate all required fields
    const requiredFields = ['fullName', 'phoneNumber', 'date', 'time', 'address'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Firestore
      await saveHireToFirestore({
        farmerName: farmer.name,
        farmerLocation: farmer.location,
        farmerSkills: farmer.skills,
        farmerRating: farmer.rating,
        clientName: formData.fullName,
        clientPhone: formData.phoneNumber,
        clientAddress: formData.address,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        rate: formData.duration === 'hourly' ? farmer.hourlyRate : farmer.dailyRate,
        specialRequirements: formData.specialRequirements || "None"
      });

      toast({
        title: "Hiring Successful!",
        description: `You have successfully hired ${farmer.name}. We will contact you shortly.`,
      });

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Error saving hire data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete hiring. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/farmers");
  };

  if (!farmer) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/farmers")}
          className="mb-6 hover-scale"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Farmers
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Farmer Details Card */}
          <Card className="bg-card border-border shadow-elevated hover:shadow-elegant transition-all duration-300 animate-scale-in">
            <CardHeader style={{background: 'var(--gradient-primary)'}} className="text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-primary-foreground/20 p-4 rounded-full">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center space-x-2">
                    <span>{farmer.name}</span>
                    {farmer.verified && (
                      <Award className="h-5 w-5 text-green-300" />
                    )}
                  </CardTitle>
                  <p className="opacity-90 text-sm">{farmer.experience} Experience</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {/* Location */}
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{farmer.location} • {farmer.distance}</p>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-medium">{farmer.rating} ★ ({farmer.reviews} reviews)</p>
                </div>
              </div>

              {/* Languages */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.languages.map((lang: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.specialties.map((specialty: string, index: number) => (
                    <Badge key={index} className="bg-secondary text-secondary-foreground">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pricing Summary */}
              <div style={{background: 'var(--gradient-subtle)'}} className="p-4 rounded-lg mt-6 border border-primary/20">
                <h3 className="font-semibold text-primary mb-3">Pricing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Hourly Rate:</span>
                    <span className="font-bold text-primary text-lg">{farmer.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Daily Rate:</span>
                    <span className="font-bold text-secondary text-lg">{farmer.dailyRate}</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <Button variant="outline" className="w-full" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Contact Farmer
              </Button>
            </CardContent>
          </Card>

          {/* Hiring Form */}
          <Card className="bg-card border-border shadow-elevated animate-scale-in">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">
                Hiring Details
              </CardTitle>
              <p className="text-center text-sm text-muted-foreground">
                Fill in the details to hire {farmer.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Enter your phone number"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">
                    Start Date *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">
                    Start Time *
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Duration Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Duration Type *</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={formData.duration === 'hourly' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('duration', 'hourly')}
                      className="flex-1"
                    >
                      Hourly
                    </Button>
                    <Button
                      type="button"
                      variant={formData.duration === 'daily' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('duration', 'daily')}
                      className="flex-1"
                    >
                      Daily
                    </Button>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Farm Address *
                  </Label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    rows={3}
                    placeholder="Your address will be auto-filled using GPS"
                  />
                  <p className="text-xs text-muted-foreground">
                    Auto-filled using GPS location
                  </p>
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements" className="text-sm font-medium">
                    Special Requirements (Optional)
                  </Label>
                  <textarea
                    id="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    rows={2}
                    placeholder="Any specific requirements or instructions..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1"
                  style={{background: 'var(--gradient-primary)'}}
                  disabled={isSubmitting}
                >
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