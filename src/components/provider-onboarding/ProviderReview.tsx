import { useState } from "react";
import { 
  User, MapPin, FileText, Tractor, Users, GraduationCap, Building2,
  ArrowLeft, Loader2, CheckCircle2, Clock, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ProviderFormData, ProviderType } from "@/pages/JoinProvider";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  formData: ProviderFormData;
  providerType: ProviderType;
  onBack: () => void;
  isSubmitting: boolean;
}

const providerTypeLabels: Record<ProviderType, { title: string; icon: any }> = {
  equipment_owner: { title: 'Equipment Owner', icon: Tractor },
  skilled_farmer: { title: 'Skilled Farmer', icon: Users },
  expert_farmer: { title: 'Expert Farmer', icon: GraduationCap },
  fpo_provider: { title: 'FPO Provider', icon: Building2 }
};

const ProviderReview = ({ formData, providerType, onBack, isSubmitting: parentSubmitting }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const TypeIcon = providerTypeLabels[providerType].icon;

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    if (!user) {
      toast.error('Please login to submit');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create provider record
      const { data: providerData, error: providerError } = await supabase
        .from('providers')
        .insert({
          user_id: user.id,
          provider_type: providerType,
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email || null,
          address: formData.address,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode,
          latitude: formData.latitude,
          longitude: formData.longitude,
          identity_proof_type: formData.identityProofType,
          identity_proof_url: formData.identityProofUrl,
          profile_photo_url: formData.profilePhotoUrl || null
        })
        .select()
        .single();

      if (providerError) throw providerError;

      // Create type-specific record
      if (providerType === 'equipment_owner') {
        const { error } = await supabase
          .from('equipment_listings')
          .insert({
            provider_id: providerData.id,
            equipment_type: formData.equipmentType,
            equipment_name: formData.equipmentName,
            brand: formData.brand || null,
            model: formData.model || null,
            power_capacity: formData.powerCapacity || null,
            features: formData.features,
            hourly_rate: formData.hourlyRate,
            daily_rate: formData.dailyRate,
            photos: formData.equipmentPhotos,
            location: formData.address,
            district: formData.district,
            state: formData.state,
            description: formData.equipmentDescription || null
          });
        
        if (error) throw error;
      } else if (providerType === 'skilled_farmer') {
        const { error } = await supabase
          .from('skilled_farmer_profiles')
          .insert({
            provider_id: providerData.id,
            skills: formData.skills,
            experience_years: formData.experienceYears,
            languages: formData.languages,
            specialties: formData.specialties,
            hourly_rate: formData.skilledHourlyRate,
            daily_rate: formData.skilledDailyRate,
            bio: formData.bio || null
          });
        
        if (error) throw error;
      } else if (providerType === 'expert_farmer') {
        const { error } = await supabase
          .from('expert_farmer_profiles')
          .insert({
            provider_id: providerData.id,
            qualifications: formData.qualifications,
            expertise_areas: formData.expertiseAreas,
            consultation_modes: formData.consultationModes,
            consultation_fee: formData.consultationFee,
            experience_years: formData.experienceYears,
            languages: formData.languages,
            certifications: formData.certifications,
            bio: formData.expertBio || null
          });
        
        if (error) throw error;
      } else if (providerType === 'fpo_provider') {
        const { error } = await supabase
          .from('fpo_provider_profiles')
          .insert({
            provider_id: providerData.id,
            fpo_name: formData.fpoName,
            registration_number: formData.registrationNumber || null,
            member_count: formData.memberCount,
            services_offered: formData.servicesOffered,
            crops_handled: formData.cropsHandled,
            operating_areas: formData.operatingAreas,
            contact_person: formData.contactPerson,
            contact_phone: formData.contactPhone,
            description: formData.fpoDescription || null
          });
        
        if (error) throw error;
      }

      toast.success('Application submitted successfully! We will review and get back to you soon.');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4`} style={{ background: 'var(--gradient-primary)' }}>
          <TypeIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Review Your Application</h2>
        <p className="text-muted-foreground">
          Please verify all details before submitting
        </p>
      </div>

      {/* Personal Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{formData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span className="font-medium">+91 {formData.phoneNumber}</span>
          </div>
          {formData.email && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{formData.email}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Address:</span>
            <span className="font-medium text-right max-w-[60%]">{formData.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">District:</span>
            <span className="font-medium">{formData.district}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">State:</span>
            <span className="font-medium">{formData.state}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pincode:</span>
            <span className="font-medium">{formData.pincode}</span>
          </div>
        </CardContent>
      </Card>

      {/* Document Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">ID Proof:</span>
            <Badge variant="secondary">{formData.identityProofType}</Badge>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-4 w-4" />
            <span>Document uploaded</span>
          </div>
        </CardContent>
      </Card>

      {/* Type-specific Details */}
      {providerType === 'equipment_owner' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Tractor className="h-5 w-5" />
              Equipment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{formData.equipmentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{formData.equipmentName}</span>
            </div>
            {formData.brand && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Brand:</span>
                <span className="font-medium">{formData.brand}</span>
              </div>
            )}
            {formData.powerCapacity && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Power:</span>
                <span className="font-medium">{formData.powerCapacity}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hourly Rate:</span>
              <span className="font-medium text-primary">₹{formData.hourlyRate}/hour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily Rate:</span>
              <span className="font-medium text-primary">₹{formData.dailyRate}/day</span>
            </div>
            {formData.features.length > 0 && (
              <div className="pt-2">
                <span className="text-muted-foreground">Features:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.features.map((f) => (
                    <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {providerType === 'skilled_farmer' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Skills & Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Experience:</span>
              <span className="font-medium">{formData.experienceYears} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hourly Rate:</span>
              <span className="font-medium text-primary">₹{formData.skilledHourlyRate}/hour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily Rate:</span>
              <span className="font-medium text-primary">₹{formData.skilledDailyRate}/day</span>
            </div>
            <div className="pt-2">
              <span className="text-muted-foreground">Skills:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.skills.map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <span className="text-muted-foreground">Languages:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.languages.map((l) => (
                  <Badge key={l} variant="secondary" className="text-xs">{l}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {providerType === 'expert_farmer' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Expertise Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Consultation Fee:</span>
              <span className="font-medium text-primary">₹{formData.consultationFee}</span>
            </div>
            <div className="pt-2">
              <span className="text-muted-foreground">Expertise Areas:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.expertiseAreas.map((e) => (
                  <Badge key={e} variant="outline" className="text-xs">{e}</Badge>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <span className="text-muted-foreground">Consultation Modes:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.consultationModes.map((m) => (
                  <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {providerType === 'fpo_provider' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              FPO Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">FPO Name:</span>
              <span className="font-medium">{formData.fpoName}</span>
            </div>
            {formData.registrationNumber && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registration:</span>
                <span className="font-medium">{formData.registrationNumber}</span>
              </div>
            )}
            {formData.memberCount && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Members:</span>
                <span className="font-medium">{formData.memberCount}</span>
              </div>
            )}
            <div className="pt-2">
              <span className="text-muted-foreground">Services:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.servicesOffered.map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Info */}
      <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <Clock className="h-5 w-5 text-amber-600" />
        <div>
          <p className="font-medium text-amber-800">Pending Approval</p>
          <p className="text-sm text-amber-700">
            Your application will be reviewed within 24-48 hours
          </p>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
          I agree to the terms and conditions and confirm that all information provided is accurate. 
          I understand that false information may lead to rejection of my application.
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || !agreedToTerms}
          style={{ background: 'var(--gradient-primary)' }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Application
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProviderReview;