import { useState, useEffect } from "react";
import { Search, MapPin, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EquipmentItem {
  id: string;
  equipment_name: string;
  equipment_type: string;
  power_capacity: string | null;
  hourly_rate: number | null;
  daily_rate: number | null;
  location: string | null;
  district: string | null;
  state: string | null;
  availability_status: string;
  features: string[] | null;
  brand: string | null;
  model: string | null;
  provider: {
    full_name: string;
    phone_number: string;
  };
}

const Booking = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Equipment");
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const categories = ["All Equipment", "Tractor", "Harvester", "Tiller", "Sprayer", "Plough", "Cultivator"];

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from('equipment_listings')
        .select(`
          *,
          provider:providers!equipment_listings_provider_id_fkey(full_name, phone_number)
        `)
        .eq('is_active', true);

      if (error) throw error;

      // Transform the data to match our interface
      const transformedData = (data || []).map(item => ({
        ...item,
        provider: item.provider as { full_name: string; phone_number: string }
      }));

      setEquipment(transformedData);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      toast.error('Failed to load equipment listings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    // Filter equipment based on search location
    console.log("Searching for equipment near:", searchLocation);
  };

  const handleBookNow = (item: EquipmentItem) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Transform to match expected format
    const equipmentData = {
      id: item.id,
      name: item.equipment_name,
      category: item.equipment_type,
      power: item.power_capacity || 'N/A',
      price: item.hourly_rate ? `₹${item.hourly_rate}/hour` : 'Contact for price',
      dailyPrice: item.daily_rate ? `₹${item.daily_rate}/day` : 'Contact for price',
      location: item.location || `${item.district || ''}, ${item.state || ''}`,
      distance: 'Nearby',
      rating: 4.5,
      reviews: 0,
      available: item.availability_status === 'available',
      owner: item.provider?.full_name || 'Unknown',
      features: item.features || []
    };
    
    navigate("/booking-details", { state: { equipment: equipmentData } });
  };

  const filteredEquipment = selectedCategory === "All Equipment" 
    ? equipment 
    : equipment.filter(item => item.equipment_type.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Book Agricultural Equipment
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Find and rent tractors, harvesters, and other farming equipment from verified owners near your location..
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            {/* Location Search */}
            <div className="relative flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-80"
              />
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                Search
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Listings */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading equipment...</span>
            </div>
          ) : filteredEquipment.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No equipment found. Check back later or try a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEquipment.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow bg-white border border-gray-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold mb-2">{item.equipment_name}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location || `${item.district || ''}, ${item.state || ''}`}</span>
                        </CardDescription>
                      </div>
                      <Badge className={`${
                        item.availability_status === 'available' 
                          ? "bg-green-600 text-white" 
                          : "bg-red-500 text-white"
                      }`}>
                        {item.availability_status === 'available' ? "Available" : "Booked"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Equipment Details */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Power/Capacity:</span>
                      <span className="font-semibold">{item.power_capacity || 'N/A'}</span>
                    </div>

                    {/* Brand & Model */}
                    {(item.brand || item.model) && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Brand/Model:</span>
                        <span className="font-semibold">{item.brand} {item.model}</span>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.5</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        (New listing)
                      </span>
                    </div>

                    {/* Owner */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Owner:</span>
                      <span className="font-semibold">{item.provider?.full_name || 'Unknown'}</span>
                    </div>

                    {/* Features */}
                    {item.features && item.features.length > 0 && (
                      <div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-gray-100 text-gray-700">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Hourly Rate:</span>
                        <span className="font-bold text-gray-900">
                          {item.hourly_rate ? `₹${item.hourly_rate}/hour` : 'Contact'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Daily Rate:</span>
                        <span className="font-bold text-gray-900">
                          {item.daily_rate ? `₹${item.daily_rate}/day` : 'Contact'}
                        </span>
                      </div>
                    </div>

                    {/* Book Now */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white" 
                        disabled={item.availability_status !== 'available'}
                        onClick={() => handleBookNow(item)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Booking;