import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { saveBookingToFirestore } from "@/lib/firestore";
import { toast } from "@/hooks/use-toast";

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const equipment = location.state?.equipment;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.firstName + " " + user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    date: "",
    time: "",
    address: ""
  });

  // Get user's location for address auto-fill
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you would use Google Maps Geocoding API here
          // For demo purposes, we'll set a placeholder address
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

  // Redirect if not authenticated or no equipment data
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!equipment) {
      navigate("/booking");
      return;
    }
  }, [isAuthenticated, equipment, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    // Validate all fields are filled
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
      await saveBookingToFirestore({
        equipmentName: equipment.name,
        equipmentLocation: equipment.location,
        equipmentPower: equipment.power,
        owner: equipment.owner,
        clientName: formData.fullName,
        clientPhone: formData.phoneNumber,
        clientAddress: formData.address,
        date: formData.date,
        time: formData.time,
        hourlyRate: equipment.price,
        dailyRate: equipment.dailyPrice
      });

      toast({
        title: "Booking Successful!",
        description: `Your booking for ${equipment.name} has been confirmed.`,
      });

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Error saving booking data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/booking");
  };

  if (!equipment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/booking")}
          className="mb-6 text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Equipment
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Equipment Details */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-green-700">
                {equipment.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Equipment Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{equipment.location} • {equipment.distance}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{equipment.rating}</span>
                  <span className="text-sm text-gray-600">({equipment.reviews} reviews)</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Power/Capacity:</span>
                  <span className="font-semibold">{equipment.power}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Owner:</span>
                  <span className="font-semibold">{equipment.owner}</span>
                </div>

                <div>
                  <span className="text-gray-600 text-sm">Features:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {equipment.features.map((feature: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="bg-green-50 p-4 rounded-lg mt-6">
                <h3 className="font-semibold text-green-800 mb-3">Pricing Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-700">Hourly Rate:</span>
                    <span className="font-bold text-green-800">{equipment.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Daily Rate:</span>
                    <span className="font-bold text-green-800">{equipment.dailyPrice}</span>
                  </div>
                  <hr className="my-2 border-green-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-green-800">Total:</span>
                    <span className="text-green-800">{equipment.dailyPrice}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center text-gray-800">
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="mt-1"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="mt-1"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Time */}
                <div>
                  <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                    Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Address (Auto-filled with GPS) */}
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Address (Auto-filled via GPS) *
                  </Label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="Your address will be auto-filled using GPS"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll use your current location to auto-fill your address
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;