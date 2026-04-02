import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Calendar, Clock, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const farmerIcon = new L.DivIcon({
  html: `<div style="background: #16a34a; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); animation: pulse 2s infinite;">👨‍🌾</div>`,
  className: "custom-farmer-marker",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

interface HireRow {
  id: string;
  farmer_name: string;
  farmer_location: string | null;
  farmer_skills: string[] | null;
  client_name: string;
  client_phone: string;
  client_address: string | null;
  hire_date: string;
  hire_time: string;
  duration_type: string;
  rate: string | null;
  special_requirements: string | null;
  status: string;
  created_at: string;
}

const HireOrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hire: HireRow | undefined = location.state?.hire;
  const [farmerPosition, setFarmerPosition] = useState<[number, number]>([23.3441, 85.3096]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hire) { navigate("/dashboard"); return; }
    // Simulate GPS movement
    intervalRef.current = setInterval(() => {
      setFarmerPosition(prev => [
        prev[0] + (Math.random() - 0.5) * 0.002,
        prev[1] + (Math.random() - 0.5) * 0.002,
      ]);
    }, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [hire, navigate]);

  if (!hire) return null;

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = { pending: 'bg-amber-500/20 text-amber-700', confirmed: 'bg-emerald-500/20 text-emerald-700', completed: 'bg-blue-500/20 text-blue-700', cancelled: 'bg-red-500/20 text-red-700' };
    return map[status] || map.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hire Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Hire Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className={getStatusColor(hire.status)}>{hire.status.charAt(0).toUpperCase() + hire.status.slice(1)}</Badge>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-muted-foreground">Farmer</span><span className="font-semibold">{hire.farmer_name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-semibold">{hire.farmer_location || 'N/A'}</span></div>
                  {hire.farmer_skills && (
                    <div>
                      <span className="text-muted-foreground text-sm">Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">{hire.farmer_skills.map((s, i) => <Badge key={i} variant="outline" className="text-xs">{s}</Badge>)}</div>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(hire.hire_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-semibold flex items-center gap-1"><Clock className="h-4 w-4" />{hire.hire_time}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-semibold">{hire.duration_type}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Rate</span><span className="font-bold text-green-600 text-lg">{hire.rate || 'Contact'}</span></div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-muted-foreground">Client</span><span className="font-semibold">{hire.client_name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-semibold flex items-center gap-1"><Phone className="h-4 w-4" />{hire.client_phone}</span></div>
                  {hire.client_address && <div><span className="text-muted-foreground text-sm">Address:</span><p className="text-sm mt-1">{hire.client_address}</p></div>}
                  {hire.special_requirements && <div><span className="text-muted-foreground text-sm">Requirements:</span><p className="text-sm mt-1">{hire.special_requirements}</p></div>}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Order Timeline</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Hire Requested', time: new Date(hire.created_at).toLocaleString('en-IN'), done: true },
                    { label: 'Confirmed', time: hire.status !== 'pending' ? 'Confirmed' : 'Pending', done: hire.status !== 'pending' },
                    { label: 'Farmer En Route', time: hire.status === 'confirmed' ? 'On the way' : 'Waiting', done: hire.status === 'confirmed' },
                    { label: 'Work Completed', time: hire.status === 'completed' ? 'Done' : 'Pending', done: hire.status === 'completed' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className={`font-medium ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                        <p className="text-xs text-muted-foreground">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live GPS Map */}
          <Card className="h-fit sticky top-24">
            <CardHeader className="bg-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Live Farmer Location</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <style>{`
                @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
                .custom-farmer-marker { background: transparent !important; border: none !important; }
              `}</style>
              <div className="h-[500px] rounded-b-lg overflow-hidden">
                <MapContainer center={farmerPosition} zoom={14} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                  <Marker position={farmerPosition} icon={farmerIcon}>
                    <Popup><b>{hire.farmer_name}</b><br />📍 Live Location<br />Status: {hire.status}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="p-4 bg-green-50 border-t">
                <div className="flex items-center gap-2"><div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" /><span className="text-sm font-medium text-green-700">Live Tracking Active</span></div>
                <p className="text-xs text-muted-foreground mt-1">Farmer location updates every 3 seconds</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HireOrderDetails;
