import { useState } from "react";
import { GraduationCap, Plus, X, ArrowRight, ArrowLeft, IndianRupee, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ProviderFormData } from "@/pages/JoinProvider";
import { toast } from "sonner";

interface Props {
  formData: ProviderFormData;
  updateFormData: (data: Partial<ProviderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const expertiseAreas = [
  'Crop Science',
  'Soil Health',
  'Pest Management',
  'Organic Farming',
  'Precision Agriculture',
  'Water Management',
  'Farm Economics',
  'Animal Husbandry',
  'Horticulture',
  'Agricultural Marketing',
  'Climate Smart Agriculture',
  'Farm Mechanization'
];

const qualificationOptions = [
  'B.Sc Agriculture',
  'M.Sc Agriculture',
  'Ph.D Agriculture',
  'Agricultural Engineering',
  'Diploma in Agriculture',
  'Certified Farm Advisor',
  'KVK Training',
  'IARI Certificate',
  'Self-Taught Expert'
];

const consultationModeOptions = [
  'In-Person Visit',
  'Phone Consultation',
  'Video Call',
  'WhatsApp Chat',
  'Field Demonstration'
];

const commonLanguages = [
  'Hindi',
  'English',
  'Bengali',
  'Marathi',
  'Telugu',
  'Tamil',
  'Gujarati',
  'Punjabi'
];

const ExpertFarmerDetails = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newCertification, setNewCertification] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.expertiseAreas.length === 0) {
      newErrors.expertiseAreas = 'Please select at least one area of expertise';
    }
    
    if (formData.consultationModes.length === 0) {
      newErrors.consultationModes = 'Please select at least one consultation mode';
    }
    
    if (!formData.consultationFee) {
      newErrors.consultationFee = 'Consultation fee is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggle = (field: keyof Pick<ProviderFormData, 'expertiseAreas' | 'qualifications' | 'consultationModes' | 'languages'>, value: string) => {
    const currentValues = formData[field] as string[];
    if (currentValues.includes(value)) {
      updateFormData({ [field]: currentValues.filter(v => v !== value) });
    } else {
      updateFormData({ [field]: [...currentValues, value] });
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      updateFormData({ certifications: [...formData.certifications, newCertification.trim()] });
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (cert: string) => {
    updateFormData({ certifications: formData.certifications.filter(c => c !== cert) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    } else {
      toast.error('Please fix the errors before continuing');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-4">
          <Award className="h-4 w-4" />
          <span className="text-sm font-medium">Premium Expert Profile</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Expertise Details</h2>
        <p className="text-muted-foreground">
          Set up your expert advisory profile
        </p>
      </div>

      <div className="space-y-4">
        {/* Expertise Areas */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Areas of Expertise *
          </Label>
          <div className="flex flex-wrap gap-2">
            {expertiseAreas.map((area) => (
              <Badge
                key={area}
                variant={formData.expertiseAreas.includes(area) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggle('expertiseAreas', area)}
              >
                {area}
              </Badge>
            ))}
          </div>
          {errors.expertiseAreas && (
            <p className="text-sm text-destructive">{errors.expertiseAreas}</p>
          )}
        </div>

        {/* Qualifications */}
        <div className="space-y-2">
          <Label>Qualifications</Label>
          <div className="flex flex-wrap gap-2">
            {qualificationOptions.map((qual) => (
              <Badge
                key={qual}
                variant={formData.qualifications.includes(qual) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggle('qualifications', qual)}
              >
                {qual}
              </Badge>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expertExperience">Years of Experience</Label>
            <Input
              id="expertExperience"
              type="number"
              placeholder="e.g., 10"
              min={0}
              max={50}
              value={formData.experienceYears || ''}
              onChange={(e) => updateFormData({ experienceYears: e.target.value ? Number(e.target.value) : null })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="consultationFee">Consultation Fee (₹) *</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="consultationFee"
                type="number"
                placeholder="e.g., 500"
                value={formData.consultationFee || ''}
                onChange={(e) => updateFormData({ consultationFee: e.target.value ? Number(e.target.value) : null })}
                className={`pl-9 ${errors.consultationFee ? 'border-destructive' : ''}`}
              />
            </div>
            {errors.consultationFee && (
              <p className="text-sm text-destructive">{errors.consultationFee}</p>
            )}
          </div>
        </div>

        {/* Consultation Modes */}
        <div className="space-y-2">
          <Label>Consultation Modes *</Label>
          <div className="flex flex-wrap gap-2">
            {consultationModeOptions.map((mode) => (
              <Badge
                key={mode}
                variant={formData.consultationModes.includes(mode) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggle('consultationModes', mode)}
              >
                {mode}
              </Badge>
            ))}
          </div>
          {errors.consultationModes && (
            <p className="text-sm text-destructive">{errors.consultationModes}</p>
          )}
        </div>

        {/* Languages */}
        <div className="space-y-2">
          <Label>Languages</Label>
          <div className="flex flex-wrap gap-2">
            {commonLanguages.map((lang) => (
              <Badge
                key={lang}
                variant={formData.languages.includes(lang) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggle('languages', lang)}
              >
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-2">
          <Label>Certifications & Awards</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add certification or award"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
            />
            <Button type="button" variant="outline" onClick={handleAddCertification}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.certifications.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {cert}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveCertification(cert)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="expertBio">About Your Expertise</Label>
          <Textarea
            id="expertBio"
            placeholder="Describe your expertise, achievements, and how you can help farmers..."
            value={formData.expertBio}
            onChange={(e) => updateFormData({ expertBio: e.target.value })}
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button type="submit" style={{ background: 'var(--gradient-primary)' }}>
          Review & Submit
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default ExpertFarmerDetails;