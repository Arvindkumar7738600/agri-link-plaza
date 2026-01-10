import { useState } from "react";
import { Users, Plus, X, ArrowRight, ArrowLeft, IndianRupee } from "lucide-react";
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

const commonSkills = [
  'Tractor Operation',
  'Harvesting',
  'Planting & Sowing',
  'Irrigation Management',
  'Pesticide Application',
  'Fertilizer Application',
  'Land Preparation',
  'Crop Management',
  'Equipment Maintenance',
  'Dairy Farming',
  'Poultry Farming',
  'Organic Farming'
];

const commonLanguages = [
  'Hindi',
  'English',
  'Bengali',
  'Marathi',
  'Telugu',
  'Tamil',
  'Gujarati',
  'Punjabi',
  'Kannada',
  'Odia'
];

const commonSpecialties = [
  'Precision Farming',
  'Organic Methods',
  'Soil Management',
  'Water Management',
  'Crop Protection',
  'Yield Optimization',
  'Seed Selection',
  'Post Harvest',
  'Vegetable Farming',
  'Paddy Cultivation'
];

const SkilledFarmerDetails = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSkill, setNewSkill] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill';
    }
    
    if (!formData.experienceYears) {
      newErrors.experienceYears = 'Experience is required';
    }
    
    if (formData.languages.length === 0) {
      newErrors.languages = 'Please select at least one language';
    }
    
    if (!formData.skilledHourlyRate && !formData.skilledDailyRate) {
      newErrors.pricing = 'Please enter at least hourly or daily rate';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggleSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      updateFormData({ skills: formData.skills.filter(s => s !== skill) });
    } else {
      updateFormData({ skills: [...formData.skills, skill] });
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      updateFormData({ skills: [...formData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleToggleLanguage = (language: string) => {
    if (formData.languages.includes(language)) {
      updateFormData({ languages: formData.languages.filter(l => l !== language) });
    } else {
      updateFormData({ languages: [...formData.languages, language] });
    }
  };

  const handleToggleSpecialty = (specialty: string) => {
    if (formData.specialties.includes(specialty)) {
      updateFormData({ specialties: formData.specialties.filter(s => s !== specialty) });
    } else {
      updateFormData({ specialties: [...formData.specialties, specialty] });
    }
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      updateFormData({ specialties: [...formData.specialties, newSpecialty.trim()] });
      setNewSpecialty('');
    }
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
        <h2 className="text-2xl font-bold mb-2">Skills & Experience</h2>
        <p className="text-muted-foreground">
          Tell us about your farming skills
        </p>
      </div>

      <div className="space-y-4">
        {/* Skills */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Your Skills *
          </Label>
          <div className="flex flex-wrap gap-2">
            {commonSkills.map((skill) => (
              <Badge
                key={skill}
                variant={formData.skills.includes(skill) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add custom skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            />
            <Button type="button" variant="outline" onClick={handleAddSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.skills.filter(s => !commonSkills.includes(s)).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.skills.filter(s => !commonSkills.includes(s)).map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFormData({ skills: formData.skills.filter(s => s !== skill) })}
                  />
                </Badge>
              ))}
            </div>
          )}
          {errors.skills && (
            <p className="text-sm text-destructive">{errors.skills}</p>
          )}
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <Label htmlFor="experienceYears">Years of Experience *</Label>
          <Input
            id="experienceYears"
            type="number"
            placeholder="e.g., 5"
            min={0}
            max={50}
            value={formData.experienceYears || ''}
            onChange={(e) => updateFormData({ experienceYears: e.target.value ? Number(e.target.value) : null })}
            className={errors.experienceYears ? 'border-destructive' : ''}
          />
          {errors.experienceYears && (
            <p className="text-sm text-destructive">{errors.experienceYears}</p>
          )}
        </div>

        {/* Languages */}
        <div className="space-y-2">
          <Label>Languages *</Label>
          <div className="flex flex-wrap gap-2">
            {commonLanguages.map((language) => (
              <Badge
                key={language}
                variant={formData.languages.includes(language) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggleLanguage(language)}
              >
                {language}
              </Badge>
            ))}
          </div>
          {errors.languages && (
            <p className="text-sm text-destructive">{errors.languages}</p>
          )}
        </div>

        {/* Specialties */}
        <div className="space-y-2">
          <Label>Specialties (Optional)</Label>
          <div className="flex flex-wrap gap-2">
            {commonSpecialties.map((specialty) => (
              <Badge
                key={specialty}
                variant={formData.specialties.includes(specialty) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggleSpecialty(specialty)}
              >
                {specialty}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add custom specialty"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialty())}
            />
            <Button type="button" variant="outline" onClick={handleAddSpecialty}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-2">
          <Label>Your Rates *</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="skilledHourlyRate" className="text-xs text-muted-foreground">Hourly Rate (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="skilledHourlyRate"
                  type="number"
                  placeholder="e.g., 150"
                  value={formData.skilledHourlyRate || ''}
                  onChange={(e) => updateFormData({ skilledHourlyRate: e.target.value ? Number(e.target.value) : null })}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="skilledDailyRate" className="text-xs text-muted-foreground">Daily Rate (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="skilledDailyRate"
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.skilledDailyRate || ''}
                  onChange={(e) => updateFormData({ skilledDailyRate: e.target.value ? Number(e.target.value) : null })}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          {errors.pricing && (
            <p className="text-sm text-destructive">{errors.pricing}</p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">About You (Optional)</Label>
          <Textarea
            id="bio"
            placeholder="Tell farmers about your experience and what makes you a great hire..."
            value={formData.bio}
            onChange={(e) => updateFormData({ bio: e.target.value })}
            rows={3}
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

export default SkilledFarmerDetails;