import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Tractor,
  Users,
  GraduationCap,
  Building2,
  Edit,
  Plus,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

interface Provider {
  id: string;
  full_name: string;
  phone_number: string;
  email: string | null;
  address: string | null;
  district: string | null;
  state: string | null;
  pincode: string | null;
  provider_type: string;
  approval_status: string;
  rejection_reason: string | null;
  created_at: string;
  profile_photo_url: string | null;
}

interface EquipmentListing {
  id: string;
  equipment_name: string;
  equipment_type: string;
  hourly_rate: number | null;
  daily_rate: number | null;
  availability_status: string;
  is_active: boolean;
}

interface Booking {
  id: string;
  client_name: string;
  client_phone: string;
  equipment_name: string;
  booking_date: string;
  booking_time: string;
  status: string;
}

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [equipment, setEquipment] = useState<EquipmentListing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.id) {
      fetchProviderData();
    }
  }, [user, isAuthenticated, loading, navigate]);

  const fetchProviderData = async () => {
    try {
      // Fetch provider profile
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (providerError) {
        if (providerError.code === 'PGRST116') {
          // No provider profile found
          setProvider(null);
        } else {
          throw providerError;
        }
      } else {
        setProvider(providerData);

        // If equipment owner, fetch equipment listings
        if (providerData.provider_type === 'equipment_owner') {
          const { data: equipmentData } = await supabase
            .from('equipment_listings')
            .select('*')
            .eq('provider_id', providerData.id);
          
          setEquipment(equipmentData || []);
        }

        // Fetch bookings for this provider's equipment
        // Note: This would need a more complex query in production
        // For now, we'll show bookings where the equipment name matches
      }
    } catch (error) {
      console.error('Error fetching provider data:', error);
      toast.error('Failed to load provider data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 text-white"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" /> Pending</Badge>;
    }
  };

  const getProviderTypeIcon = (type: string) => {
    switch (type) {
      case 'equipment_owner':
        return <Tractor className="h-5 w-5" />;
      case 'skilled_farmer':
        return <Users className="h-5 w-5" />;
      case 'expert_farmer':
        return <GraduationCap className="h-5 w-5" />;
      case 'fpo_provider':
        return <Building2 className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getProviderTypeLabel = (type: string) => {
    switch (type) {
      case 'equipment_owner':
        return 'Equipment Owner';
      case 'skilled_farmer':
        return 'Skilled Farmer';
      case 'expert_farmer':
        return 'Expert Farmer';
      case 'fpo_provider':
        return 'FPO Provider';
      default:
        return type;
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-2xl text-center py-16">
          <div className="bg-muted/50 p-8 rounded-2xl">
            <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Provider Profile Found</h2>
            <p className="text-muted-foreground mb-6">
              You haven't registered as a provider yet. Join KisanSevaPlus to list your services!
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/join-provider')}
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Join as Provider
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your listings, view bookings, and track your application status</p>
        </div>

        {/* Status Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  {getProviderTypeIcon(provider.provider_type)}
                </div>
                <div>
                  <CardTitle className="text-xl">{provider.full_name}</CardTitle>
                  <CardDescription>{getProviderTypeLabel(provider.provider_type)}</CardDescription>
                </div>
              </div>
              {getStatusBadge(provider.approval_status)}
            </div>
          </CardHeader>
          <CardContent>
            {provider.approval_status === 'rejected' && provider.rejection_reason && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
                <p className="text-sm text-destructive font-medium">Rejection Reason:</p>
                <p className="text-sm text-destructive/80">{provider.rejection_reason}</p>
              </div>
            )}
            
            {provider.approval_status === 'pending' && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-yellow-600">
                  <Clock className="h-4 w-4" />
                  <p className="text-sm font-medium">Your application is under review. We'll notify you once it's processed.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{provider.phone_number}</span>
              </div>
              {provider.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{provider.email}</span>
                </div>
              )}
              {provider.district && provider.state && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{provider.district}, {provider.state}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(provider.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-6">
            {provider.provider_type === 'equipment_owner' ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Equipment Listings</h3>
                  {provider.approval_status === 'approved' && (
                    <Button size="sm" style={{ background: 'var(--gradient-primary)' }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Equipment
                    </Button>
                  )}
                </div>

                {equipment.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Tractor className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No equipment listed yet</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {equipment.map((item) => (
                      <Card key={item.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{item.equipment_name}</CardTitle>
                            <Badge variant={item.is_active ? "secondary" : "outline"}>
                              {item.availability_status}
                            </Badge>
                          </div>
                          <CardDescription>{item.equipment_type}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-4 text-sm">
                            {item.hourly_rate && <span>₹{item.hourly_rate}/hr</span>}
                            {item.daily_rate && <span>₹{item.daily_rate}/day</span>}
                          </div>
                          <Button variant="outline" size="sm" className="mt-3">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <p className="text-lg font-medium">Your profile is your listing!</p>
                <p className="text-muted-foreground">
                  As a {getProviderTypeLabel(provider.provider_type)}, your profile details serve as your listing.
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Booking Requests</h3>
            </div>

            {bookings.length === 0 ? (
              <Card className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No booking requests yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Booking requests from customers will appear here
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{booking.client_name}</p>
                          <p className="text-sm text-muted-foreground">{booking.equipment_name}</p>
                          <p className="text-sm">{booking.booking_date} at {booking.booking_time}</p>
                        </div>
                        <Badge>{booking.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button variant="outline" size="sm" disabled={provider.approval_status !== 'approved'}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p>{provider.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <p>{provider.phone_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{provider.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Provider Type</label>
                    <p>{getProviderTypeLabel(provider.provider_type)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">District</label>
                    <p>{provider.district || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">State</label>
                    <p>{provider.state || 'Not provided'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <p>{provider.address || 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderDashboard;
