import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User, Tractor, IndianRupee, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import "leaflet/dist/leaflet.css";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [ownerLocation, setOwnerLocation] = useState({ lat: 20.5937, lng: 78.9629 }); // Default: center of India
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!booking) {
      navigate("/dashboard");
      return;
    }
  }, [booking, navigate]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const L = await import("leaflet");

      // Fix default marker icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, { zoomControl: true }).setView([ownerLocation.lat, ownerLocation.lng], 13);
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const tractorIcon = L.divIcon({
        className: "custom-tractor-marker",
        html: `<div style="background: linear-gradient(135deg, #16a34a, #059669); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(22,163,74,0.5); border: 3px solid white;">
          <span style="font-size: 22px;">🚜</span>
        </div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      const marker = L.marker([ownerLocation.lat, ownerLocation.lng], { icon: tractorIcon }).addTo(map);
      marker.bindPopup(`<strong>${booking?.owner_name || 'Equipment Owner'}</strong><br/>📍 Live Location`);

      mapInstanceRef.current = map;
      markerRef.current = marker;
      setIsMapReady(true);

      // Simulate live GPS movement
      const simulateMovement = () => {
        setOwnerLocation(prev => {
          const newLat = prev.lat + (Math.random() - 0.5) * 0.002;
          const newLng = prev.lng + (Math.random() - 0.5) * 0.002;
          return { lat: newLat, lng: newLng };
        });
      };
      const interval = setInterval(simulateMovement, 3000);
      return () => clearInterval(interval);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker on location change
  useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      markerRef.current.setLatLng([ownerLocation.lat, ownerLocation.lng]);
    }
  }, [ownerLocation]);

  // Get user's real location for map centering
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setOwnerLocation({ lat: latitude + 0.005, lng: longitude + 0.003 }); // Slightly offset to simulate nearby owner
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 14);
          }
        },
        () => {} // Silently fail, use default
      );
    }
  }, []);

  if (!booking) return null;

  const getStatusStyle = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-amber-100 text-amber-800 border-amber-300",
      confirmed: "bg-emerald-100 text-emerald-800 border-emerald-300",
      completed: "bg-blue-100 text-blue-800 border-blue-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return map[status] || map.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Back */}
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-50">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Order Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Tractor className="h-6 w-6 text-green-600" />
              {booking.equipment_name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Order ID: <span className="font-mono text-xs">{booking.id?.slice(0, 8).toUpperCase()}</span>
            </p>
          </div>
          <Badge className={`${getStatusStyle(booking.status)} text-sm px-4 py-1`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Details Card */}
          <div className="space-y-6">
            <Card className="border-green-100 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800">📋 Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem icon={<Calendar className="h-4 w-4" />} label="Date" value={new Date(booking.booking_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} />
                  <InfoItem icon={<Clock className="h-4 w-4" />} label="Time" value={booking.booking_time} />
                </div>
                <Separator />
                <InfoItem icon={<MapPin className="h-4 w-4" />} label="Equipment Location" value={booking.equipment_location || 'N/A'} />
                {booking.equipment_power && (
                  <InfoItem icon={<Tractor className="h-4 w-4" />} label="Power/Capacity" value={booking.equipment_power} />
                )}
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card className="border-green-100 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800">💰 Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 rounded-xl p-4 space-y-3">
                  {booking.hourly_rate && (
                    <div className="flex justify-between">
                      <span className="text-green-700">Hourly Rate</span>
                      <span className="font-bold text-green-900">{booking.hourly_rate}</span>
                    </div>
                  )}
                  {booking.daily_rate && (
                    <div className="flex justify-between">
                      <span className="text-green-700">Daily Rate</span>
                      <span className="font-bold text-green-900">{booking.daily_rate}</span>
                    </div>
                  )}
                  <Separator className="bg-green-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-green-800">Total</span>
                    <span className="text-green-900">{booking.daily_rate || booking.hourly_rate || 'Contact Owner'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-green-100 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800">👤 Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoItem icon={<User className="h-4 w-4" />} label="Owner" value={booking.owner_name || 'N/A'} />
                <InfoItem icon={<User className="h-4 w-4" />} label="Booked By" value={booking.client_name} />
                <InfoItem icon={<Phone className="h-4 w-4" />} label="Phone" value={booking.client_phone} />
                {booking.client_address && (
                  <InfoItem icon={<MapPin className="h-4 w-4" />} label="Address" value={booking.client_address} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Live GPS Tracking Map */}
          <div className="space-y-4">
            <Card className="border-green-100 shadow-md overflow-hidden">
              <CardHeader className="pb-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Navigation className="h-5 w-5 animate-pulse" />
                  🚜 Live Equipment Tracking
                </CardTitle>
                <p className="text-sm text-white/80">Real-time GPS location of your booked equipment</p>
              </CardHeader>
              <CardContent className="p-0">
                <div ref={mapRef} className="h-[400px] w-full" />
                <div className="p-4 bg-green-50 border-t border-green-100">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-700 font-medium">Equipment is on the move</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    📍 Lat: {ownerLocation.lat.toFixed(4)}, Lng: {ownerLocation.lng.toFixed(4)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-green-100 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800">📅 Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <TimelineItem
                    title="Booking Created"
                    time={new Date(booking.created_at).toLocaleString('en-IN')}
                    active
                  />
                  <TimelineItem
                    title="Owner Notified"
                    time="Awaiting confirmation"
                    active={booking.status !== 'pending'}
                  />
                  <TimelineItem
                    title="Equipment Dispatched"
                    time={booking.status === 'confirmed' ? 'On the way' : 'Pending'}
                    active={booking.status === 'confirmed' || booking.status === 'completed'}
                  />
                  <TimelineItem
                    title="Service Completed"
                    time={booking.status === 'completed' ? 'Done' : 'Pending'}
                    active={booking.status === 'completed'}
                    isLast
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <div className="text-green-600 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground text-sm">{value}</p>
    </div>
  </div>
);

const TimelineItem = ({ title, time, active, isLast }: { title: string; time: string; active: boolean; isLast?: boolean }) => (
  <div className="flex gap-3">
    <div className="flex flex-col items-center">
      <div className={`h-3 w-3 rounded-full ${active ? 'bg-green-500' : 'bg-gray-300'} ring-4 ${active ? 'ring-green-100' : 'ring-gray-100'}`} />
      {!isLast && <div className={`w-0.5 flex-1 ${active ? 'bg-green-300' : 'bg-gray-200'}`} />}
    </div>
    <div className="pb-4">
      <p className={`text-sm font-medium ${active ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);

export default OrderDetails;
