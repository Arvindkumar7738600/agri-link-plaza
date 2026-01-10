import { useState, useRef } from "react";
import { FileText, Upload, Camera, ArrowRight, ArrowLeft, X, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const documentTypes = [
  { value: 'aadhaar', label: 'Aadhaar Card' },
  { value: 'pan', label: 'PAN Card' },
  { value: 'voter_id', label: 'Voter ID' },
  { value: 'driving_license', label: 'Driving License' },
  { value: 'kisan_credit_card', label: 'Kisan Credit Card' },
];

const ProviderDocumentUpload = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const { user } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploadingId, setIsUploadingId] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const idInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.identityProofType) {
      newErrors.identityProofType = 'Please select document type';
    }
    
    if (!formData.identityProofUrl) {
      newErrors.identityProofUrl = 'Please upload your identity proof';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFile = async (file: File, type: 'id' | 'photo') => {
    if (!user) {
      toast.error('Please login to upload files');
      return null;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${type}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('provider-documents')
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('provider-documents')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setIsUploadingId(true);
    try {
      const url = await uploadFile(file, 'id');
      if (url) {
        updateFormData({ identityProofUrl: url });
        toast.success('Document uploaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to upload document');
    } finally {
      setIsUploadingId(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const url = await uploadFile(file, 'photo');
      if (url) {
        updateFormData({ profilePhotoUrl: url });
        toast.success('Photo uploaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to upload photo');
    } finally {
      setIsUploadingPhoto(false);
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
        <h2 className="text-2xl font-bold mb-2">Document Upload</h2>
        <p className="text-muted-foreground">
          Upload your identity proof for verification
        </p>
      </div>

      <div className="space-y-6">
        {/* Identity Proof Type */}
        <div className="space-y-2">
          <Label htmlFor="documentType" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Document Type *
          </Label>
          <Select
            value={formData.identityProofType}
            onValueChange={(value) => updateFormData({ identityProofType: value })}
          >
            <SelectTrigger className={errors.identityProofType ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((doc) => (
                <SelectItem key={doc.value} value={doc.value}>
                  {doc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.identityProofType && (
            <p className="text-sm text-destructive">{errors.identityProofType}</p>
          )}
        </div>

        {/* Identity Proof Upload */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document *
          </Label>
          <input
            ref={idInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleIdUpload}
            className="hidden"
          />
          
          {formData.identityProofUrl ? (
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="flex-1 text-sm">Document uploaded successfully</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => updateFormData({ identityProofUrl: '' })}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => idInputRef.current?.click()}
              disabled={isUploadingId}
              className={`w-full py-8 border-dashed border-2 ${errors.identityProofUrl ? 'border-destructive' : ''}`}
            >
              {isUploadingId ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Click to upload document
                </>
              )}
            </Button>
          )}
          {errors.identityProofUrl && (
            <p className="text-sm text-destructive">{errors.identityProofUrl}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, PDF. Max size: 5MB
          </p>
        </div>

        {/* Profile Photo Upload (Optional) */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Profile Photo (Optional)
          </Label>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          
          {formData.profilePhotoUrl ? (
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
              <img 
                src={formData.profilePhotoUrl} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="flex-1 text-sm">Photo uploaded</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => updateFormData({ profilePhotoUrl: '' })}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => photoInputRef.current?.click()}
              disabled={isUploadingPhoto}
              className="w-full py-8 border-dashed border-2"
            >
              {isUploadingPhoto ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-5 w-5" />
                  Click to upload photo
                </>
              )}
            </Button>
          )}
          <p className="text-xs text-muted-foreground">
            A clear photo helps build trust with farmers
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button type="submit" style={{ background: 'var(--gradient-primary)' }}>
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default ProviderDocumentUpload;