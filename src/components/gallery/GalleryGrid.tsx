'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { deleteGalleryImage } from '@/app/gallery/actions';
import { useToast } from '@/components/ui/use-toast';

interface GalleryImage {
  id: string;
  created_at: string;
  name: string;
  url: string;
  description: string | null;
  user_id: string;
}

interface GalleryGridProps {
  refreshTrigger: number;
}

export default function GalleryGrid({ refreshTrigger }: GalleryGridProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Fetch the current user
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.id);
      }
    };
    
    fetchCurrentUser();
    
    async function fetchGalleryImages() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching gallery images:', error);
          return;
        }
        
        setImages(data || []);
      } catch (error) {
        console.error('Unexpected error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryImages();
  }, [supabase, refreshTrigger]);
  
  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    setDeleting(true);
    try {
      const result = await deleteGalleryImage(imageId);
      
      if (result.success) {
        // Remove the image from local state
        setImages(images.filter(img => img.id !== imageId));
        
        if (selectedImage?.id === imageId) {
          setSelectedImage(null);
        }
        
        toast({
          title: "Image deleted",
          description: "The image has been successfully deleted.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete the image.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error during image deletion:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during deletion.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="aspect-square relative">
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-text-secondary">No images yet</h3>
        <p className="mt-2 text-text-secondary">Upload your first image to see it here!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id}
            className="aspect-square relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt={image.name || "Gallery image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full bg-background rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.name || "Gallery image"}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 75vw"
              />
            </div>
            
            <div className="p-4 bg-background">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-medium text-text">{selectedImage.name}</h3>
                  {selectedImage.description && (
                    <p className="mt-2 text-text-secondary">{selectedImage.description}</p>
                  )}
                  <p className="text-xs text-text-secondary mt-2">
                    Uploaded {new Date(selectedImage.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                {/* Show delete button if user owns the image */}
                {currentUser && selectedImage.user_id === currentUser && (
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
                    onClick={() => {
                      handleDeleteImage(selectedImage.id);
                    }}
                    disabled={deleting}
                    aria-label="Delete image"
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </div>
            </div>
            
            <button
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
