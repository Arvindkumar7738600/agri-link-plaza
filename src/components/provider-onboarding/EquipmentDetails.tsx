import { useState, useRef } from "react";
import { Tractor, Plus, X, ArrowRight, ArrowLeft, Upload, Loader2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProviderFormData } from "@/pages/JoinProvider";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Props {
  formData: ProviderFormData;
  updateFormData: (data: Partial<ProviderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const equipmentTypes = [
  'Tractor',
  'Harvester',
  'Combine Harvester',
  'Rotavator',
  'Cultivator',
  'Seed Drill',
  'Sprayer',
  'Thresher',
  'Plough',
  'Tiller',
  'Other'
];

const commonFeatures = [
  'GPS Tracking',
  'Fuel Efficient',
  'Well Maintained',
  'Power Steering',
  '4WD Available',
  'Operator Included',
  'Insurance Covered',
  'Night Work Ready',
  'Low Hours Usage'
];

const EquipmentDetails = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const { user } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newFeature, setNewFeature] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.equipmentType) {
      newErrors.equipmentType = 'Equipment type is required';
    }
    
    if (!formData.equipmentName.trim()) {
      newErrors.equipmentName = 'Equipment name is required';
    }
    
    if (!formData.hourlyRate && !formData.dailyRate) {
      newErrors.pricing = 'Please enter at least hourly or daily rate';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      updateFormData({ features: [...formData.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    updateFormData({ features: formData.features.filter(f => f !== feature) });
  };

  const handleToggleCommonFeature = (feature: string) => {
    if (formData.features.includes(feature)) {
      handleRemoveFeature(feature);
    } else {
      updateFormData({ features: [...formData.features, feature] });
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [...formData.equipmentPhotos];

    try {
      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Max 5MB`);
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/equipment-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('provider-documents')
          .upload(fileName, file);

        if (error) {
          console.error('Upload error:', error);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('provider-documents')
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      updateFormData({ equipmentPhotos: uploadedUrls });
      toast.success('Photos uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload some photos');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = formData.equipmentPhotos.filter((_, i) => i !== index);
    updateFormData({ equipmentPhotos: newPhotos });
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
        <h2 className="text-2xl font-bold mb-2">Equipment Details</h2>
        <p className="text-muted-foreground">
          Tell us about your equipment
        </p>
      </div>

      <div className="space-y-4">
        {/* Equipment Type */}
        <div className="space-y-2">
          <Label htmlFor="equipmentType" className="flex items-center gap-2">
            <Tractor className="h-4 w-4" />
            Equipment Type *
          </Label>
          <Select
            value={formData.equipmentType}
            onValueChange={(value) => updateFormData({ equipmentType: value })}
          >
            <SelectTrigger className={errors.equipmentType ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select equipment type" />
            </SelectTrigger>
            <SelectContent>
              {equipmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.equipmentType && (
            <p className="text-sm text-destructive">{errors.equipmentType}</p>
          )}
        </div>

        {/* Equipment Name */}
        <div className="space-y-2">
          <Label htmlFor="equipmentName">Equipment Name/Model *</Label>
          <Input
            id="equipmentName"
            placeholder="e.g., John Deere 5039D Power Pro"
            value={formData.equipmentName}
            onChange={(e) => updateFormData({ equipmentName: e.target.value })}
            className={errors.equipmentName ? 'border-destructive' : ''}
          />
          {errors.equipmentName && (
            <p className="text-sm text-destructive">{errors.equipmentName}</p>
          )}
        </div>

        {/* Brand and Model */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              placeholder="e.g., John Deere"
              value={formData.brand}
              onChange={(e) => updateFormData({ brand: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              placeholder="e.g., 5039D"
              value={formData.model}
              onChange={(e) => updateFormData({ model: e.target.value })}
            />
          </div>
        </div>

        {/* Power/Capacity */}
        <div className="space-y-2">
          <Label htmlFor="powerCapacity">Power/Capacity</Label>
          <Input
            id="powerCapacity"
            placeholder="e.g., 41 HP"
            value={formData.powerCapacity}
            onChange={(e) => updateFormData({ powerCapacity: e.target.value })}
          />
        </div>

        {/* Pricing */}
        <div className="space-y-2">
          <Label>Rental Rates *</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="hourlyRate" className="text-xs text-muted-foreground">Hourly Rate (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="e.g., 900"
                  value={formData.hourlyRate || ''}
                  onChange={(e) => updateFormData({ hourlyRate: e.target.value ? Number(e.target.value) : null })}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="dailyRate" className="text-xs text-muted-foreground">Daily Rate (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dailyRate"
                  type="number"
                  placeholder="e.g., 6000"
                  value={formData.dailyRate || ''}
                  onChange={(e) => updateFormData({ dailyRate: e.target.value ? Number(e.target.value) : null })}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          {errors.pricing && (
            <p className="text-sm text-destructive">{errors.pricing}</p>
          )}
        </div>

        {/* Features */}
        <div className="space-y-2">
          <Label>Features</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {commonFeatures.map((feature) => (
              <Badge
                key={feature}
                variant={formData.features.includes(feature) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleToggleCommonFeature(feature)}
              >
                {feature}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add custom feature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
            />
            <Button type="button" variant="outline" onClick={handleAddFeature}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.filter(f => !commonFeatures.includes(f)).map((feature) => (
                <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveFeature(feature)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Equipment Photos */}
        <div className="space-y-2">
          <Label>Equipment Photos</Label>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
          
          <div className="grid grid-cols-3 gap-2">
            {formData.equipmentPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                <img src={photo} alt={`Equipment ${index + 1}`} className="w-full h-full object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => handleRemovePhoto(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {formData.equipmentPhotos.length < 6 && (
              <Button
                type="button"
                variant="outline"
                className="aspect-square border-dashed border-2"
                onClick={() => photoInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Upload className="h-6 w-6" />
                )}
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Upload up to 6 photos. Good photos attract more bookings!
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="equipmentDescription">Description (Optional)</Label>
          <Textarea
            id="equipmentDescription"
            placeholder="Add any additional details about your equipment..."
            value={formData.equipmentDescription}
            onChange={(e) => updateFormData({ equipmentDescription: e.target.value })}
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

export default EquipmentDetails;