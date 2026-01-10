import { useState } from "react";
import { Building2, Plus, X, ArrowRight, ArrowLeft, Users } from "lucide-react";
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

const commonServices = [
  'Input Supply',
  'Output Marketing',
  'Credit Linkage',
  'Training & Capacity Building',
  'Equipment Rental',
  'Warehouse Facility',
  'Processing & Value Addition',
  'Insurance Services',
  'Transportation',
  'Quality Testing'
];

const commonCrops = [
  'Rice',
  'Wheat',
  'Maize',
  'Pulses',
  'Vegetables',
  'Fruits',
  'Cotton',
  'Sugarcane',
  'Oilseeds',
  'Spices',
  'Dairy',
  'Poultry'
];

const FPODetails = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newArea, setNewArea] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fpoName.trim()) {
      newErrors.fpoName = 'FPO name is required';
    }
    
    if (formData.servicesOffered.length === 0) {
      newErrors.servicesOffered = 'Please select at least one service';
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person name is required';
    }
    
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggle = (field: keyof Pick<ProviderFormData, 'servicesOffered' | 'cropsHandled'>, value: string) => {
    const currentValues = formData[field] as string[];
    if (currentValues.includes(value)) {
      updateFormData({ [field]: currentValues.filter(v => v !== value) });
    } else {
      updateFormData({ [field]: [...currentValues, value] });
    }
  };

  const handleAddArea = () => {
    if (newArea.trim() && !formData.operatingAreas.includes(newArea.trim())) {
      updateFormData({ operatingAreas: [...formData.operatingAreas, newArea.trim()] });
      setNewArea('');
    }
  };

  const handleRemoveArea = (area: string) => {
    updateFormData({ operatingAreas: formData.operatingAreas.filter(a => a !== area) });
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
        <h2 className="text-2xl font-bold mb-2">FPO Details</h2>
        <p className="text-muted-foreground">
          Tell us about your Farmer Producer Organization
        </p>
      </div>

      <div className="space-y-4">
        {/* FPO Name */}
        <div className="space-y-2">
          <Label htmlFor="fpoName" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            FPO Name *
          </Label>
          <Input
            id="fpoName"
            placeholder="Enter FPO name"
            value={formData.fpoName}
            onChange={(e) => updateFormData({ fpoName: e.target.value })}
            className={errors.fpoName ? 'border-destructive' : ''}
          />
          {errors.fpoName && (
            <p className="text-sm text-destructive">{errors.fpoName}</p>
          )}
        </div>

        {/* Registration Number & Member Count */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              placeholder="FPO registration number"
              value={formData.registrationNumber}
              onChange={(e) => updateFormData({ registrationNumber: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="memberCount" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Member Count
            </Label>
            <Input
              id="memberCount"
              type="number"
              placeholder="Number of members"
              value={formData.memberCount || ''}
              onChange={(e) => updateFormData({ memberCount: e.target.value ? Number(e.target.value) : null })}
            />
          </div>
        </div>

        {/* Services Offered */}
        <div className="space-y-2">
          <Label>Services Offered *</Label>
          <div className="flex flex-wrap gap-2">
            {commonServices.map((service) => (
              <Badge
                key={service}
                variant={formData.servicesOffered.includes(service) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggle('servicesOffered', service)}
              >
                {service}
              </Badge>
            ))}
          </div>
          {errors.servicesOffered && (
            <p className="text-sm text-destructive">{errors.servicesOffered}</p>
          )}
        </div>

        {/* Crops Handled */}
        <div className="space-y-2">
          <Label>Crops/Products Handled</Label>
          <div className="flex flex-wrap gap-2">
            {commonCrops.map((crop) => (
              <Badge
                key={crop}
                variant={formData.cropsHandled.includes(crop) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggle('cropsHandled', crop)}
              >
                {crop}
              </Badge>
            ))}
          </div>
        </div>

        {/* Operating Areas */}
        <div className="space-y-2">
          <Label>Operating Areas/Districts</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add district/area"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddArea())}
            />
            <Button type="button" variant="outline" onClick={handleAddArea}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.operatingAreas.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.operatingAreas.map((area) => (
                <Badge key={area} variant="secondary" className="flex items-center gap-1">
                  {area}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveArea(area)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Contact Person */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person *</Label>
            <Input
              id="contactPerson"
              placeholder="Name of contact person"
              value={formData.contactPerson}
              onChange={(e) => updateFormData({ contactPerson: e.target.value })}
              className={errors.contactPerson ? 'border-destructive' : ''}
            />
            {errors.contactPerson && (
              <p className="text-sm text-destructive">{errors.contactPerson}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone *</Label>
            <Input
              id="contactPhone"
              placeholder="Phone number"
              value={formData.contactPhone}
              onChange={(e) => updateFormData({ contactPhone: e.target.value })}
              className={errors.contactPhone ? 'border-destructive' : ''}
            />
            {errors.contactPhone && (
              <p className="text-sm text-destructive">{errors.contactPhone}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="fpoDescription">About the FPO</Label>
          <Textarea
            id="fpoDescription"
            placeholder="Describe your FPO, its history, achievements, and goals..."
            value={formData.fpoDescription}
            onChange={(e) => updateFormData({ fpoDescription: e.target.value })}
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

export default FPODetails;