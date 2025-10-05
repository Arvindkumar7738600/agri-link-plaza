import { useState, useEffect, useRef } from "react";
import { Phone, User, Mail, MapPin, Upload, ArrowRight, CheckCircle, Loader2, AlertCircle, Camera, FileUp, Navigation } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'camera' | 'file' | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    otp: '',
    aadhaarFile: null as File | null,
    termsAccepted: false,
    documentUrls: [] as string[]
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

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

  const getAddressFromGPS = async () => {
    setIsGettingLocation(true);
    try {
      if (!navigator.geolocation) {
        toast({
          title: "Location Not Supported",
          description: "Your browser doesn't support geolocation",
          variant: "destructive",
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            
            if (data.display_name) {
              updateFormData('address', data.display_name);
              toast({
                title: "Location Found",
                description: "Address filled automatically",
              });
            }
          } catch (error) {
            toast({
              title: "Failed to Get Address",
              description: "Could not fetch address from location",
              variant: "destructive",
            });
          } finally {
            setIsGettingLocation(false);
          }
        },
        (error) => {
          toast({
            title: "Location Error",
            description: error.message,
            variant: "destructive",
          });
          setIsGettingLocation(false);
        }
      );
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Failed to get your location",
        variant: "destructive",
      });
      setIsGettingLocation(false);
    }
  };

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsOtpSent(true);
      setResendTimer(60);
      
      toast({
        title: "OTP Sent Successfully",
        description: `Verification code sent to +91 ${formData.phoneNumber}`,
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
    if (formData.otp.length !== 6) {
      setErrors({ otp: 'Please enter complete 6-digit OTP' });
      return;
    }
    
    setIsVerifying(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(3);
      toast({
        title: "Phone Verified",
        description: "Phone number verified successfully",
      });
    } catch (error) {
      setErrors({ otp: 'Invalid OTP. Please try again.' });
    } finally {
      setIsVerifying(false);
    }
  };

  const uploadDocumentToFirebase = async (file: File): Promise<string> => {
    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `kyc-documents/${formData.phoneNumber}/${timestamp}_${file.name}`);
      
      console.log("Uploading file to Firebase Storage:", file.name);
      await uploadBytes(storageRef, file);
      
      console.log("Getting download URL...");
      const downloadURL = await getDownloadURL(storageRef);
      
      console.log("Upload successful! URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Firebase upload error:", error);
      throw new Error(`Failed to upload document: ${error.message || 'Unknown error'}`);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    updateFormData('aadhaarFile', file);
    setUploadMethod(null);
  };

  const handleCompleteRegistration = async () => {
    if (!formData.aadhaarFile) {
      setErrors({ aadhaar: 'Please upload Aadhaar card' });
      return;
    }
    if (!formData.termsAccepted) {
      setErrors({ terms: 'Please accept terms and conditions' });
      return;
    }

    setIsLoading(true);
    console.log("Starting registration process...");
    
    try {
      toast({
        title: "Uploading Documents",
        description: "Please wait while we upload your documents...",
      });

      // Upload document to Firebase Storage
      console.log("Attempting to upload to Firebase...");
      const documentUrl = await uploadDocumentToFirebase(formData.aadhaarFile);
      console.log("Document uploaded successfully:", documentUrl);
      
      // Register user with all details including document
      login(formData.phoneNumber, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        isKycVerified: false,
        documentUrl: documentUrl
      });
      
      toast({
        title: "Registration Successful",
        description: "Welcome to KisanSeva Plus! KYC verification pending.",
      });
      
      console.log("Registration complete, navigating to dashboard...");
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      const errorMessage = error.message || "Failed to upload documents. Please try again.";
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log("Loading state cleared");
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    setCurrentStep(currentStep + 1);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
        <div className="max-w-lg mx-auto w-full">
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 rounded-2xl overflow-hidden">
            <CardHeader className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 mx-auto">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">Join KisanSeva Plus</CardTitle>
              <CardDescription className="text-white/80">
                {currentStep === 1 && "Create your account - Step 1 of 3"}
                {currentStep === 2 && "Verify your phone - Step 2 of 3"}
                {currentStep === 3 && "Complete KYC - Step 3 of 3"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-2 block">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                        <Input 
                          placeholder="First name" 
                          className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                        />
                        {errors.firstName && (
                          <div className="flex items-center mt-1 text-sm text-red-300">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-2 block">
                        Last Name
                      </label>
                      <Input 
                        placeholder="Last name" 
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                      />
                      {errors.lastName && (
                        <div className="flex items-center mt-1 text-sm text-red-300">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                      />
                      {errors.email && (
                        <div className="flex items-center mt-1 text-sm text-red-300">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                      <Input 
                        type="tel" 
                        placeholder="9876543210" 
                        className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                        value={formData.phoneNumber}
                        onChange={(e) => updateFormData('phoneNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        maxLength={10}
                      />
                      {errors.phoneNumber && (
                        <div className="flex items-center mt-1 text-sm text-red-300">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phoneNumber}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-white/80">
                        Address
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={getAddressFromGPS}
                        disabled={isGettingLocation}
                        className="text-white/80 hover:text-white hover:bg-white/10 h-8"
                      >
                        {isGettingLocation ? (
                          <>
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            Getting Location...
                          </>
                        ) : (
                          <>
                            <Navigation className="h-3 w-3 mr-1" />
                            Use GPS
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                      <Textarea 
                        placeholder="Your complete address or use GPS" 
                        className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40 resize-none"
                        rows={3}
                        value={formData.address}
                        onChange={(e) => updateFormData('address', e.target.value)}
                      />
                      {errors.address && (
                        <div className="flex items-center mt-1 text-sm text-red-300">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.address}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 rounded-xl shadow-lg border-0" 
                    size="lg"
                    onClick={handleNextStep}
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Step 2: Phone Verification */}
              {currentStep === 2 && (
                <>
                  {!isOtpSent ? (
                    <>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2 text-white">Verify Phone Number</h3>
                        <p className="text-sm text-white/70 mb-6">
                          We'll send an OTP to +91 {formData.phoneNumber}
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 rounded-xl shadow-lg border-0" 
                        size="lg"
                        onClick={handleSendOtp}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          'Send OTP'
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-center mb-4">
                        <div className="flex items-center justify-center mb-2">
                          <CheckCircle className="h-5 w-5 text-success mr-2" />
                          <span className="text-sm font-medium text-white">OTP Sent Successfully</span>
                        </div>
                        <p className="text-sm text-white/70">
                          Verification code sent to +91 {formData.phoneNumber}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-white/80 mb-3 block text-center">
                          Enter 6-Digit OTP
                        </label>
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={6}
                            value={formData.otp}
                            onChange={(value) => updateFormData('otp', value)}
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
                        {errors.otp && (
                          <div className="flex items-center justify-center mt-2 text-sm text-red-300">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.otp}
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 rounded-xl shadow-lg border-0" 
                        size="lg"
                        onClick={handleVerifyOtp}
                        disabled={isVerifying || formData.otp.length !== 6}
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            Verify & Continue <CheckCircle className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                      
                      <div className="text-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleSendOtp}
                          disabled={resendTimer > 0 || isLoading}
                          className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                          {resendTimer > 0 ? (
                            `Resend OTP in ${resendTimer}s`
                          ) : (
                            "Resend OTP"
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Step 3: KYC Documents */}
              {currentStep === 3 && (
                <>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2 text-white">Complete KYC Verification</h3>
                    <p className="text-sm text-white/70 mb-6">
                      Upload your Aadhaar card for account verification
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {!formData.aadhaarFile ? (
                      <>
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 bg-white/5 backdrop-blur-sm">
                          <Upload className="h-8 w-8 text-white/60 mx-auto mb-3" />
                          <p className="text-sm font-medium mb-1 text-white">Upload Aadhaar Card</p>
                          <p className="text-xs text-white/60 mb-4">Choose how you want to upload (Max 5MB)</p>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-col h-auto py-4"
                              onClick={() => {
                                setUploadMethod('camera');
                                cameraInputRef.current?.click();
                              }}
                            >
                              <Camera className="h-6 w-6 mb-2" />
                              <span className="text-xs">Take Photo</span>
                            </Button>
                            
                            <Button
                              type="button"
                              variant="outline"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-col h-auto py-4"
                              onClick={() => {
                                setUploadMethod('file');
                                fileInputRef.current?.click();
                              }}
                            >
                              <FileUp className="h-6 w-6 mb-2" />
                              <span className="text-xs">Choose File</span>
                            </Button>
                          </div>

                          <input
                            ref={cameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="border-2 border-white/20 rounded-lg p-6 bg-white/5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-success" />
                            <div>
                              <p className="text-sm font-medium text-white">Document Uploaded</p>
                              <p className="text-xs text-white/60">{formData.aadhaarFile.name}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => updateFormData('aadhaarFile', null)}
                            className="text-white/60 hover:text-white hover:bg-white/10"
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {errors.aadhaar && (
                      <div className="flex items-center justify-center text-sm text-red-300">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.aadhaar}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => updateFormData('termsAccepted', checked)}
                      className="border-white/20 data-[state=checked]:bg-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-white/80 leading-relaxed cursor-pointer">
                      I agree to the Terms of Service and Privacy Policy. I understand that my documents will be verified within 24-48 hours.
                    </label>
                  </div>
                  {errors.terms && (
                    <div className="flex items-center text-sm text-red-300">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.terms}
                    </div>
                  )}
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 rounded-xl shadow-lg border-0" 
                    size="lg"
                    onClick={handleCompleteRegistration}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Completing Registration...
                      </>
                    ) : (
                      'Complete Registration'
                    )}
                  </Button>
                </>
              )}
              
              <div className="text-center text-sm text-white/70">
                Already have an account?{" "}
                <Link to="/login" className="text-primary-light font-medium hover:text-primary underline">
                  Login here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;