import { useState, useEffect } from "react";
import { Mail, ArrowRight, CheckCircle, Loader2, AlertCircle, User, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [loginMethod, setLoginMethod] = useState<"otp" | "password">("otp");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSendOtp = async () => {
    setEmailError("");
    
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
        }
      });

      if (error) throw error;

      setIsOtpSent(true);
      setResendTimer(60);
      
      toast({
        title: "OTP Sent Successfully",
        description: `Verification code sent to ${email}`,
      });
    } catch (error: any) {
      if (error.message?.includes("Signups not allowed")) {
        setEmailError("Account not found. Please sign up first.");
      } else {
        toast({
          title: "Failed to Send OTP",
          description: error.message || "Please try again later",
          variant: "destructive",
        });
      }
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
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email'
      });
      
      if (error) throw error;
      
      toast({
        title: "Login Successful",
        description: "Welcome to KisanSeva Plus!",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      setOtpError("Invalid OTP. Please try again.");
      toast({
        title: "Invalid OTP",
        description: error.message || "Please check and enter the correct OTP",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePasswordLogin = async () => {
    setEmailError("");
    setPasswordError("");
    
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;
      
      toast({
        title: "Login Successful",
        description: "Welcome to KisanSeva Plus!",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      if (error.message?.includes("Invalid login credentials")) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Failed",
          description: error.message || "Please try again later",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    setOtpError("");
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
        }
      });

      if (error) throw error;
      
      setResendTimer(60);
      toast({
        title: "OTP Resent",
        description: "New verification code sent to your email",
      });
    } catch (error: any) {
      toast({
        title: "Failed to Resend OTP",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/src/assets/hero-agriculture.jpg')`
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Glass Effect Login Card */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              {/* User Avatar */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              
              {/* Welcome Text */}
              <div className="text-center mb-8 space-y-2">
                <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                <h2 className="text-xl font-semibold text-white/90">KisanSeva Plus</h2>
                <p className="text-sm text-white/70 italic">Hafto Ka Kaam Ghanto Mein</p>
              </div>

              {/* Login Method Tabs */}
              <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "otp" | "password")} className="mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm">
                  <TabsTrigger value="otp" className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70">
                    Email OTP
                  </TabsTrigger>
                  <TabsTrigger value="password" className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70">
                    Password
                  </TabsTrigger>
                </TabsList>

                {/* OTP Login */}
                <TabsContent value="otp" className="mt-6 space-y-6">
                  {!isOtpSent ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-white/80 mb-2 block">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                          <Input 
                            type="email" 
                            placeholder="Enter your email address"
                            className={`pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/20 ${emailError ? 'border-red-400' : ''}`}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailError("");
                            }}
                          />
                          {emailError && (
                            <div className="flex items-center mt-2 text-sm text-red-300">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {emailError}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 rounded-xl shadow-lg border-0" 
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
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-sm font-medium text-white">OTP Sent Successfully</span>
                        </div>
                        <p className="text-sm text-white/70">
                          Verification code sent to {email}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-white/80 mb-3 block text-center">
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
                            className="gap-2"
                          >
                            <InputOTPGroup className="gap-2">
                              <InputOTPSlot index={0} className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-white/40" />
                              <InputOTPSlot index={1} className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-white/40" />
                              <InputOTPSlot index={2} className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-white/40" />
                              <InputOTPSlot index={3} className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-white/40" />
                              <InputOTPSlot index={4} className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-white/40" />
                              <InputOTPSlot index={5} className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-white/40" />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                        {otpError && (
                          <div className="flex items-center justify-center mt-2 text-sm text-red-300">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {otpError}
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 rounded-xl shadow-lg border-0" 
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
                            className="text-white/80 hover:text-white hover:bg-white/10"
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
                          }} className="text-white/80 hover:text-white hover:bg-white/10">
                            Change Email Address
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>

                {/* Password Login */}
                <TabsContent value="password" className="mt-6 space-y-6">
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                      <Input 
                        type="email" 
                        placeholder="Enter your email address"
                        className={`pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/20 ${emailError ? 'border-red-400' : ''}`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError("");
                        }}
                      />
                      {emailError && (
                        <div className="flex items-center mt-2 text-sm text-red-300">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {emailError}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`pl-10 pr-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/20 ${passwordError ? 'border-red-400' : ''}`}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError("");
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      {passwordError && (
                        <div className="flex items-center mt-2 text-sm text-red-300">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {passwordError}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 rounded-xl shadow-lg border-0" 
                    onClick={handlePasswordLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Login <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
              
              <div className="text-center text-sm text-white/70 mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary-light font-medium hover:text-primary underline">
                  Sign up here
                </Link>
              </div>
              
              {/* Founder Tagline */}
              <div className="absolute bottom-4 right-6 text-xs text-white/50 italic">
                Founder of IIT Madras Students
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
