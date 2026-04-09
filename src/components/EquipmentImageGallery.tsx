import { useState, useRef, useEffect } from "react";
import { Camera, X, Edit2, ZoomIn, ChevronLeft, ChevronRight, Upload, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { uploadDocumentToCloudinary } from "@/lib/cloudinary";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface EquipmentImageGalleryProps {
  isProvider?: boolean;
  equipmentId?: string;
  providerId?: string;
  userId?: string;
}

const EquipmentImageGallery = ({ isProvider = false, equipmentId, providerId, userId }: EquipmentImageGalleryProps) => {
  const [images, setImages] = useState<{ id?: string; url: string; file?: File; name: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load images from DB
  useEffect(() => {
    const loadImages = async () => {
      if (!equipmentId) { setLoading(false); return; }
      const { data, error } = await supabase
        .from("equipment_images" as any)
        .select("id, image_url, display_order")
        .eq("equipment_listing_id", equipmentId)
        .order("display_order", { ascending: true });

      if (!error && data) {
        setImages((data as any[]).map((img: any) => ({ id: img.id, url: img.image_url, name: `photo-${img.display_order}` })));
      }
      setLoading(false);
    };
    loadImages();
  }, [equipmentId]);

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
    if (!equipmentId || !providerId) {
      toast({ title: "Missing info", description: "Equipment or provider info not available.", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const uploaded = await Promise.all(
        pendingImages.map(async (img, idx) => {
          const url = await uploadDocumentToCloudinary(img.file!, userId || "equipment");
          // Save to DB
          const { data, error } = await supabase
            .from("equipment_images" as any)
            .insert({
              equipment_listing_id: equipmentId,
              provider_id: providerId,
              image_url: url,
              display_order: images.indexOf(img) + idx,
            } as any)
            .select("id")
            .single();

          if (error) throw error;
          return { id: (data as any)?.id, url, name: img.name };
        })
      );

      setImages(prev =>
        prev.map(img => {
          const match = uploaded.find(u => u.name === img.name);
          return match ? { id: match.id, url: match.url, name: match.name } : img;
        })
      );

      toast({ title: "Upload successful!", description: `${uploaded.length} image(s) uploaded.` });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (index: number) => {
    const img = images[index];
    if (img.id) {
      await supabase.from("equipment_images" as any).delete().eq("id", img.id);
    }
    if (img.file) URL.revokeObjectURL(img.url);
    setImages(prev => prev.filter((_, i) => i !== index));
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
        updated[index] = { ...updated[index], url: URL.createObjectURL(file), file, name: file.name };
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

  if (loading) {
    return (
      <Card className="bg-white">
        <CardContent className="py-8 text-center text-muted-foreground">Loading photos...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Camera className="h-5 w-5 text-green-600" />
          Equipment Photos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => setSelectedIndex(i)} className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100">
                    <ZoomIn className="h-4 w-4 text-gray-700" />
                  </button>
                  {isProvider && (
                    <>
                      <button onClick={() => handleReplace(i)} className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100">
                        <Edit2 className="h-4 w-4 text-blue-600" />
                      </button>
                      <button onClick={() => handleDelete(i)} className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100">
                        <X className="h-4 w-4 text-red-600" />
                      </button>
                    </>
                  )}
                </div>
                {img.file && (
                  <span className="absolute top-1 left-1 text-[10px] bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded font-medium">
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && !isProvider && (
          <div className="text-center py-8 text-gray-400">
            <Camera className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No equipment photos available yet.</p>
          </div>
        )}

        {isProvider && (
          <div className="space-y-3">
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-colors"
            >
              <ImagePlus className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm font-medium text-green-700">Click to add photos</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB each</p>
            </div>
            {images.some(img => img.file) && (
              <Button onClick={handleUploadAll} disabled={uploading} className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : `Upload ${images.filter(i => i.file).length} Photo(s)`}
              </Button>
            )}
          </div>
        )}

        <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
          <DialogContent className="max-w-3xl p-2 bg-black/95 border-none">
            {selectedIndex !== null && (
              <div className="relative flex items-center justify-center min-h-[60vh]">
                <img src={images[selectedIndex].url} alt={images[selectedIndex].name} className="max-h-[80vh] max-w-full object-contain rounded" />
                {selectedIndex > 0 && (
                  <button onClick={() => navigateLightbox(-1)} className="absolute left-2 p-2 bg-white/20 hover:bg-white/40 rounded-full">
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                )}
                {selectedIndex < images.length - 1 && (
                  <button onClick={() => navigateLightbox(1)} className="absolute right-2 p-2 bg-white/20 hover:bg-white/40 rounded-full">
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
