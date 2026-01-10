import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tractor, 
  Users, 
  GraduationCap, 
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Import step components
import ProviderPersonalDetails from "@/components/provider-onboarding/ProviderPersonalDetails";
import ProviderLocationDetails from "@/components/provider-onboarding/ProviderLocationDetails";
import ProviderDocumentUpload from "@/components/provider-onboarding/ProviderDocumentUpload";
import EquipmentDetails from "@/components/provider-onboarding/EquipmentDetails";
import SkilledFarmerDetails from "@/components/provider-onboarding/SkilledFarmerDetails";
import ExpertFarmerDetails from "@/components/provider-onboarding/ExpertFarmerDetails";
import FPODetails from "@/components/provider-onboarding/FPODetails";
import ProviderReview from "@/components/provider-onboarding/ProviderReview";

export type ProviderType = 'equipment_owner' | 'skilled_farmer' | 'expert_farmer' | 'fpo_provider';

export interface ProviderFormData {
  // Personal Details
  fullName: string;
  phoneNumber: string;
  email: string;
  
  // Location Details
  address: string;
  district: string;
  state: string;
  pincode: string;
  latitude: number | null;
  longitude: number | null;
  
  // Document Details
  identityProofType: string;
  identityProofUrl: string;
  profilePhotoUrl: string;
  
  // Equipment Details (for equipment_owner)
  equipmentType: string;
  equipmentName: string;
  brand: string;
  model: string;
  powerCapacity: string;
  features: string[];
  hourlyRate: number | null;
  dailyRate: number | null;
  equipmentPhotos: string[];
  equipmentDescription: string;
  
  // Skilled Farmer Details
  skills: string[];
  experienceYears: number | null;
  languages: string[];
  specialties: string[];
  skilledHourlyRate: number | null;
  skilledDailyRate: number | null;
  bio: string;
  
  // Expert Farmer Details
  qualifications: string[];
  expertiseAreas: string[];
  consultationModes: string[];
  consultationFee: number | null;
  certifications: string[];
  expertBio: string;
  
  // FPO Details
  fpoName: string;
  registrationNumber: string;
  memberCount: number | null;
  servicesOffered: string[];
  cropsHandled: string[];
  operatingAreas: string[];
  contactPerson: string;
  contactPhone: string;
  fpoDescription: string;
}

const initialFormData: ProviderFormData = {
  fullName: '',
  phoneNumber: '',
  email: '',
  address: '',
  district: '',
  state: '',
  pincode: '',
  latitude: null,
  longitude: null,
  identityProofType: '',
  identityProofUrl: '',
  profilePhotoUrl: '',
  equipmentType: '',
  equipmentName: '',
  brand: '',
  model: '',
  powerCapacity: '',
  features: [],
  hourlyRate: null,
  dailyRate: null,
  equipmentPhotos: [],
  equipmentDescription: '',
  skills: [],
  experienceYears: null,
  languages: [],
  specialties: [],
  skilledHourlyRate: null,
  skilledDailyRate: null,
  bio: '',
  qualifications: [],
  expertiseAreas: [],
  consultationModes: [],
  consultationFee: null,
  certifications: [],
  expertBio: '',
  fpoName: '',
  registrationNumber: '',
  memberCount: null,
  servicesOffered: [],
  cropsHandled: [],
  operatingAreas: [],
  contactPerson: '',
  contactPhone: '',
  fpoDescription: '',
};

const providerTypes = [
  {
    id: 'equipment_owner' as ProviderType,
    title: 'Tractor/Equipment Owner',
    description: 'List your tractors, harvesters, and farming equipment for rent',
    icon: Tractor,
    color: 'from-green-500 to-emerald-600',
    benefits: ['Earn from your equipment', 'Reach more farmers', 'Flexible scheduling']
  },
  {
    id: 'skilled_farmer' as ProviderType,
    title: 'Skilled Farmer',
    description: 'Offer your farming skills and services to other farmers',
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    benefits: ['Set your own rates', 'Work on your schedule', 'Build your reputation']
  },
  {
    id: 'expert_farmer' as ProviderType,
    title: 'Expert/Advisory Farmer',
    description: 'Share your expertise and provide consultation services',
    icon: GraduationCap,
    color: 'from-purple-500 to-violet-600',
    benefits: ['Premium profile', 'Verified badge', 'Higher earnings']
  },
  {
    id: 'fpo_provider' as ProviderType,
    title: 'FPO/Group Provider',
    description: 'Register your FPO or farmer group to offer collective services',
    icon: Building2,
    color: 'from-orange-500 to-amber-600',
    benefits: ['Collective bargaining', 'Wider reach', 'Bulk service options']
  }
];

const JoinProvider = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedType, setSelectedType] = useState<ProviderType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProviderFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Join KisanSevaPlus as Provider</h1>
          <p className="text-muted-foreground mb-8">Please login or sign up to continue</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button variant="outline" onClick={() => navigate('/signup')}>Sign Up</Button>
          </div>
        </div>
      </div>
    );
  }

  // Pre-fill user data
  if (user && !formData.fullName && !formData.email) {
    setFormData(prev => ({
      ...prev,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      address: user.address || ''
    }));
  }

  const getSteps = () => {
    const baseSteps = ['Personal Details', 'Location', 'Documents'];
    
    switch (selectedType) {
      case 'equipment_owner':
        return [...baseSteps, 'Equipment Details', 'Review'];
      case 'skilled_farmer':
        return [...baseSteps, 'Skills & Experience', 'Review'];
      case 'expert_farmer':
        return [...baseSteps, 'Expertise Details', 'Review'];
      case 'fpo_provider':
        return [...baseSteps, 'FPO Details', 'Review'];
      default:
        return baseSteps;
    }
  };

  const steps = getSteps();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleTypeSelect = (type: ProviderType) => {
    setSelectedType(type);
    setCurrentStep(0);
  };

  const updateFormData = (data: Partial<ProviderFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Submit will be handled in ProviderReview component
      toast.success('Application submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProviderPersonalDetails 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <ProviderLocationDetails 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <ProviderDocumentUpload 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        if (selectedType === 'equipment_owner') {
          return (
            <EquipmentDetails 
              formData={formData} 
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        } else if (selectedType === 'skilled_farmer') {
          return (
            <SkilledFarmerDetails 
              formData={formData} 
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        } else if (selectedType === 'expert_farmer') {
          return (
            <ExpertFarmerDetails 
              formData={formData} 
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        } else if (selectedType === 'fpo_provider') {
          return (
            <FPODetails 
              formData={formData} 
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        }
        return null;
      case 4:
        return (
          <ProviderReview 
            formData={formData}
            providerType={selectedType!}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <section className="py-12" style={{ background: 'var(--gradient-primary)' }}>
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            Join KisanSevaPlus
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-90 max-w-2xl mx-auto"
          >
            Register as a provider and start earning by offering your services to thousands of farmers
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!selectedType ? (
            // Provider Type Selection
            <motion.div
              key="type-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold text-center mb-8">
                Select Your Provider Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {providerTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="cursor-pointer hover:shadow-elevated transition-all duration-300 border-2 hover:border-primary/50 group"
                      onClick={() => handleTypeSelect(type.id)}
                    >
                      <CardHeader>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <type.icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl">{type.title}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {type.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-4 group-hover:bg-primary" variant="outline">
                          Select <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            // Multi-step Form
            <motion.div
              key="multi-step-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              {/* Back to type selection */}
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedType(null);
                  setCurrentStep(0);
                  setFormData(initialFormData);
                }}
                className="mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Change Provider Type
              </Button>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                        index < currentStep 
                          ? 'bg-primary border-primary text-primary-foreground'
                          : index === currentStep
                            ? 'border-primary text-primary'
                            : 'border-muted-foreground/30 text-muted-foreground'
                      }`}>
                        {index < currentStep ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-12 lg:w-24 h-0.5 mx-2 ${
                          index < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {steps.map((step, index) => (
                    <span 
                      key={step} 
                      className={`text-xs lg:text-sm ${
                        index === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'
                      }`}
                      style={{ width: '80px', textAlign: 'center' }}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <Card className="shadow-elevated">
                <CardContent className="p-6 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JoinProvider;