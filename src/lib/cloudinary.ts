// Cloudinary configuration for KYC document uploads
const CLOUDINARY_CLOUD_NAME = 'dtm4om1ht';
const CLOUDINARY_UPLOAD_PRESET = 'kisansevaplus';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

export const uploadDocumentToCloudinary = async (file: File, userId: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', `kyc-documents/${userId}`);
    
    console.log("Uploading to Cloudinary:", file.name);
    
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Upload successful! URL:", data.secure_url);
    
    return data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Failed to upload document: ${error.message || 'Unknown error'}`);
  }
};
