import { useState, useRef } from "react";
import { Camera, X, Edit2, ZoomIn, ChevronLeft, ChevronRight, Upload, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { uploadDocumentToCloudinary } from "@/lib/cloudinary";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface EquipmentImageGalleryProps {
  isProvider?: boolean;
  equipmentId?: string;
  userId?: string;
}

const EquipmentImageGallery = ({ isProvider = false, userId }: EquipmentImageGalleryProps) => {
  const [images, setImages] = useState<{ url: string; file?: File; name: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter(f => {
      if (!f.type.startsWith("image/")) {
        toast({ title: "Invalid file", description: `${f.name} is not an image.`, variant: "destructive" });
        return false;
      }
      if (f.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: `${f.name} exceeds 10MB limit.`, variant: "destructive" });
        return false;
      }
      return true;
    });

    const newImages = validFiles.map(f => ({
      url: URL.createObjectURL(f),
      file: f,
      name: f.name,
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const handleUploadAll = async () => {
    const pendingImages = images.filter(img => img.file);
    if (pendingImages.length === 0) {
      toast({ title: "No new images", description: "All images are already uploaded." });
      return;
    }

    setUploading(true);
    try {
      const uploaded = await Promise.all(
        pendingImages.map(async (img) => {
          const url = await uploadDocumentToCloudinary(img.file!, userId || "equipment");
          return { url, name: img.name };
        })
      );

      setImages(prev =>
        prev.map(img => {
          const match = uploaded.find(u => u.name === img.name);
          return match ? { url: match.url, name: match.name } : img;
        })
      );

      toast({ title: "Upload successful!", description: `${uploaded.length} image(s) uploaded.` });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (index: number) => {
    setImages(prev => {
      const img = prev[index];
      if (img.file) URL.revokeObjectURL(img.url);
      return prev.filter((_, i) => i !== index);
    });
    if (selectedIndex === index) setSelectedIndex(null);
  };

  const handleReplace = (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      setImages(prev => {
        const updated = [...prev];
        if (updated[index].file) URL.revokeObjectURL(updated[index].url);
        updated[index] = { url: URL.createObjectURL(file), file, name: file.name };
        return updated;
      });
    };
    input.click();
  };

  const navigateLightbox = (dir: number) => {
    if (selectedIndex === null) return;
    const next = selectedIndex + dir;
    if (next >= 0 && next < images.length) setSelectedIndex(next);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Camera className="h-5 w-5 text-green-600" />
          Equipment Photos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Gallery Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105"
                  onClick={() => setSelectedIndex(i)}
                />
                {/* Overlay controls */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setSelectedIndex(i)}
                    className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <ZoomIn className="h-4 w-4 text-gray-700" />
                  </button>
                  {isProvider && (
                    <>
                      <button
                        onClick={() => handleReplace(i)}
                        className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                      >
                        <Edit2 className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </button>
                    </>
                  )}
                </div>
                {/* Pending badge */}
                {img.file && (
                  <span className="absolute top-1 left-1 text-[10px] bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded font-medium">
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {images.length === 0 && !isProvider && (
          <div className="text-center py-8 text-gray-400">
            <Camera className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No equipment photos available yet.</p>
          </div>
        )}

        {/* Upload controls for providers */}
        {isProvider && (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-colors"
            >
              <ImagePlus className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm font-medium text-green-700">Click to add photos</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB each</p>
            </div>

            {images.some(img => img.file) && (
              <Button
                onClick={handleUploadAll}
                disabled={uploading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : `Upload ${images.filter(i => i.file).length} Photo(s)`}
              </Button>
            )}
          </div>
        )}

        {/* Lightbox */}
        <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
          <DialogContent className="max-w-3xl p-2 bg-black/95 border-none">
            {selectedIndex !== null && (
              <div className="relative flex items-center justify-center min-h-[60vh]">
                <img
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].name}
                  className="max-h-[80vh] max-w-full object-contain rounded"
                />
                {selectedIndex > 0 && (
                  <button
                    onClick={() => navigateLightbox(-1)}
                    className="absolute left-2 p-2 bg-white/20 hover:bg-white/40 rounded-full"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                )}
                {selectedIndex < images.length - 1 && (
                  <button
                    onClick={() => navigateLightbox(1)}
                    className="absolute right-2 p-2 bg-white/20 hover:bg-white/40 rounded-full"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                )}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EquipmentImageGallery;
