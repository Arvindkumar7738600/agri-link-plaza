import { useState } from "react";
import { Phone, User, Mail, MapPin, Upload, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    setIsOtpSent(true);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="min-h-screen pt-8 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #9ebd13 0%, #008552 100%)'}}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/7c821560-56eb-4079-8f44-e64f31f694dd.png" 
                  alt="KisanSeva Plus Logo" 
                  className="h-12 mx-auto"
                />
              </div>
              <CardTitle className="text-2xl font-bold">Join KisanSeva Plus</CardTitle>
              <CardDescription>
                {currentStep === 1 && "Create your account - Step 1 of 3"}
                {currentStep === 2 && "Verify your phone - Step 2 of 3"}
                {currentStep === 3 && "Complete KYC - Step 3 of 3"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="First name" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Last Name
                      </label>
                      <Input placeholder="Last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="email" placeholder="your@email.com" className="pl-10" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="tel" placeholder="+91 9876543210" className="pl-10" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea placeholder="Your complete address" className="pl-10" rows={3} />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    style={{background: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)'}}
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
                        <h3 className="text-lg font-semibold mb-2">Verify Phone Number</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          We'll send an OTP to verify your phone number
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        size="lg"
                        style={{background: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)'}}
                        onClick={handleSendOtp}
                      >
                        Send OTP
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-center text-sm text-muted-foreground mb-4">
                        OTP sent to your phone number
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
                        style={{background: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)'}}
                        onClick={handleNextStep}
                      >
                        Verify & Continue
                      </Button>
                    </>
                  )}
                </>
              )}

              {/* Step 3: KYC Documents */}
              {currentStep === 3 && (
                <>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Complete KYC Verification</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Upload your documents for account verification
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium mb-1">Aadhaar Card</p>
                      <p className="text-xs text-muted-foreground">Upload front and back</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                    
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium mb-1">PAN Card</p>
                      <p className="text-xs text-muted-foreground">Upload clear image</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the Terms of Service and Privacy Policy. I understand that my documents will be verified within 24-48 hours.
                    </label>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    style={{background: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)'}}
                  >
                    Complete Registration
                  </Button>
                </>
              )}
              
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
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