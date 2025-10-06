import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { EditProfileDialog } from '@/components/EditProfileDialog';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Clock, 
  XCircle,
  CreditCard,
  Calendar,
  LogOut,
  Edit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileUpdate = (updatedData: any) => {
    if (updateUser) {
      updateUser(updatedData);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'ongoing':
        return <Clock className="h-4 w-4 text-accent" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'ongoing':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return '';
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/src/assets/hero-agriculture.jpg')`
      }}
    >
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">User Dashboard</h1>
            <p className="text-white/80">Welcome back, {user.firstName}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white/80 hover:text-white hover:bg-white/10"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20 border-4 border-white/20">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {user.firstName} {user.lastName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={user.isKycVerified ? 'bg-success/20 text-success border-success/30' : 'bg-accent/20 text-accent border-accent/30'}>
                        {user.isKycVerified ? '✓ KYC Verified' : 'KYC Pending'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-white/60" />
                      <div>
                        <p className="text-sm text-white/60">Phone Number</p>
                        <p className="text-white font-medium">+91 {user.phoneNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-white/60" />
                      <div>
                        <p className="text-sm text-white/60">Email Address</p>
                        <p className="text-white font-medium">{user.email || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-white/60 mt-1" />
                      <div>
                        <p className="text-sm text-white/60">Address</p>
                        <p className="text-white font-medium">{user.address || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Total Bookings</span>
                    <span className="text-white font-bold text-xl">{user.bookingHistory.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Completed</span>
                    <span className="text-success font-bold">
                      {user.bookingHistory.filter(b => b.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Ongoing</span>
                    <span className="text-accent font-bold">
                      {user.bookingHistory.filter(b => b.status === 'ongoing').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Profile Complete</span>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Phone Verified</span>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">KYC Status</span>
                    {user.isKycVerified ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Clock className="h-5 w-5 text-accent" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking History */}
        <Card className="mt-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Booking History</CardTitle>
            <CardDescription className="text-white/70">
              Your recent service bookings and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.bookingHistory.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{booking.serviceName}</h4>
                      <p className="text-sm text-white/60">{booking.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-white">₹{booking.amount.toLocaleString()}</p>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(booking.status)}
                        <Badge variant="outline" className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Dialog */}
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