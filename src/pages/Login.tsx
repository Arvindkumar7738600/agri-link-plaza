import { useState } from "react";
import { Eye, EyeOff, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendOtp = () => {
    setIsOtpSent(true);
  };

  return (
    <div className="min-h-screen pt-8 flex items-center justify-center" style={{background: 'var(--gradient-light)'}}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-elevated bg-card border-0">
            <CardHeader className="text-center">
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/7c821560-56eb-4079-8f44-e64f31f694dd.png" 
                  alt="KisanSeva Plus Logo" 
                  className="h-12 mx-auto"
                />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your KisanSeva Plus account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isOtpSent ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="tel" 
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    style={{background: 'var(--gradient-primary)'}}
                    onClick={handleSendOtp}
                  >
                    Send OTP <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center text-sm text-muted-foreground mb-4">
                    OTP sent to +91 {phoneNumber}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Enter OTP
                    </label>
                    <Input 
                      type="text" 
                      placeholder="6-digit OTP"
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    style={{background: 'var(--gradient-primary)'}}
                  >
                    Verify & Login
                  </Button>
                  
                  <div className="text-center">
                    <Button variant="ghost" size="sm" onClick={() => setIsOtpSent(false)}>
                      Change Phone Number
                    </Button>
                  </div>
                </>
              )}
              
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;