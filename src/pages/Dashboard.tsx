import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { EditProfileDialog } from '@/components/EditProfileDialog';
import { supabase } from '@/integrations/supabase/client';
import { 
  User, Phone, Mail, MapPin, CheckCircle, Clock, XCircle,
  Calendar, LogOut, Edit, Eye, Tractor, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingRow {
  id: string;
  equipment_name: string;
  equipment_location: string | null;
  equipment_power: string | null;
  owner_name: string | null;
  client_name: string;
  client_phone: string;
  client_address: string | null;
  booking_date: string;
  booking_time: string;
  hourly_rate: string | null;
  daily_rate: string | null;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileUpdate = (updatedData: any) => {
    if (updateUser) updateUser(updatedData);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-500/20 text-amber-700 border-amber-300',
      confirmed: 'bg-emerald-500/20 text-emerald-700 border-emerald-300',
      completed: 'bg-blue-500/20 text-blue-700 border-blue-300',
      cancelled: 'bg-red-500/20 text-red-700 border-red-300',
    };
    const icons: Record<string, React.ReactNode> = {
      pending: <Clock className="h-3 w-3 mr-1" />,
      confirmed: <CheckCircle className="h-3 w-3 mr-1" />,
      completed: <CheckCircle className="h-3 w-3 mr-1" />,
      cancelled: <XCircle className="h-3 w-3 mr-1" />,
    };
    return (
      <Badge className={`${styles[status] || styles.pending} flex items-center gap-0`}>
        {icons[status] || icons.pending}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">🌾 Mera Dashboard</h1>
            <p className="text-muted-foreground">Namaste, {user.firstName}! Aapki bookings yahan hain.</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold">{bookings.length}</p>
                </div>
                <Tractor className="h-10 w-10 text-white/60" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Active</p>
                  <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length}</p>
                </div>
                <Clock className="h-10 w-10 text-white/60" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Completed</p>
                  <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'completed').length}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-white/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Profile</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+91 {user.phoneNumber || 'Not set'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{user.address || 'Not set'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking History */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Booking History
                </CardTitle>
                <CardDescription>Aapki sabhi equipment bookings</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Loading bookings...</span>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Tractor className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-muted-foreground">Koi booking nahi mili. Equipment book karein!</p>
                    <Button onClick={() => navigate('/booking')} className="mt-4 bg-green-600 hover:bg-green-700">
                      Book Equipment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-green-100 bg-green-50/30 hover:bg-green-50 transition-colors cursor-pointer group"
                        onClick={() => navigate('/order-details', { state: { booking } })}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                            <Tractor className="h-6 w-6 text-green-700" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{booking.equipment_name}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(booking.booking_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {booking.booking_time}
                              </span>
                              {booking.equipment_location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {booking.equipment_location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(booking.status)}
                          <Eye className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EditProfileDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={user}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default Dashboard;
