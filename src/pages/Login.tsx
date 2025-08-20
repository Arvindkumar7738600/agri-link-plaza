import { useState, useEffect } from "react";
import { Phone, ArrowRight, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Timer for resend OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSendOtp = async () => {
    setPhoneError("");
    
    if (!phoneNumber) {
      setPhoneError("Phone number is required");
      return;
    }
    
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, call your SMS service API here
      // const response = await fetch('/api/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber: `+91${phoneNumber}` })
      // });
      
      setIsOtpSent(true);
      setResendTimer(30); // 30 seconds cooldown
      toast({
        title: "OTP Sent Successfully",
        description: `Verification code sent to +91 ${phoneNumber}`,
      });
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, call your verification API here
      // const response = await fetch('/api/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber: `+91${phoneNumber}`, otp })
      // });
      
      // For demo purposes, accept any 6-digit OTP
      toast({
        title: "Login Successful",
        description: "Welcome to KisanSeva Plus!",
      });
      
      // Redirect to dashboard or home
      navigate('/');
    } catch (error) {
      setOtpError("Invalid OTP. Please try again.");
      toast({
        title: "Invalid OTP",
        description: "Please check and enter the correct OTP",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    setOtpError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResendTimer(30);
      toast({
        title: "OTP Resent",
        description: "New verification code sent to your phone",
      });
    } catch (error) {
      toast({
        title: "Failed to Resend OTP",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                        placeholder="Enter 10-digit mobile number"
                        className={`pl-10 ${phoneError ? 'border-destructive' : ''}`}
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10));
                          setPhoneError("");
                        }}
                        maxLength={10}
                      />
                      {phoneError && (
                        <div className="flex items-center mt-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {phoneError}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: 10-digit number without +91
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    style={{background: 'var(--gradient-primary)'}}
                    onClick={handleSendOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm font-medium">OTP Sent Successfully</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Verification code sent to +91 {phoneNumber}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block text-center">
                      Enter 6-Digit OTP
                    </label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => {
                          setOtp(value);
                          setOtpError("");
                        }}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    {otpError && (
                      <div className="flex items-center justify-center mt-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {otpError}
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    style={{background: 'var(--gradient-primary)'}}
                    onClick={handleVerifyOtp}
                    disabled={isVerifying || otp.length !== 6}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Login <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  <div className="space-y-3">
                    <div className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleResendOtp}
                        disabled={resendTimer > 0 || isLoading}
                      >
                        {resendTimer > 0 ? (
                          `Resend OTP in ${resendTimer}s`
                        ) : isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Resending...
                          </>
                        ) : (
                          "Resend OTP"
                        )}
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setIsOtpSent(false);
                        setOtp("");
                        setOtpError("");
                        setResendTimer(0);
                      }}>
                        Change Phone Number
                      </Button>
                    </div>
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