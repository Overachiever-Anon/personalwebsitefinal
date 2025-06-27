'use client';

import { useState, useRef } from 'react';
import { uploadGalleryImage } from '@/app/gallery/actions';
import Image from 'next/image';

interface GalleryUploadProps {
  onImageUploaded: () => void;
}

export default function GalleryUpload({ onImageUploaded }: GalleryUploadProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageName, setImageName] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // No need for Supabase client as we're using server actions

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, WebP, or GIF)';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 5MB';
    }
    return null;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    handleFiles(files[0]);
  };

  const handleFiles = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setImages([file]);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviews([previewUrl]);
    
    // Default name to file name without extension
    const fileName = file.name.split('.').slice(0, -1).join('.');
    setImageName(fileName);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFiles(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
    
    // If all images are removed, reset the form
    if (images.length === 1) {
      setImageName('');
      setImageDescription('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (images.length === 0) {
      setError('Please select an image to upload');
      return;
    }
    
    if (!imageName.trim()) {
      setError('Please provide a name for your image');
      return;
    }
    
    setLoading(true);
    setError('');
    setUploadProgress(0);
    
    try {
      const file = images[0];
      
      // Simulate upload progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      // Create form data for server action
      const formData = new FormData();
      formData.append('file', file);
      
      // Use our server action to upload the image
      const result = await uploadGalleryImage(formData);
      
      clearInterval(progressInterval);
      
      if (result.error) {
        setError(result.error);
        setUploadProgress(0);
        setLoading(false);
        return;
      }
      
      if (!result.url) {
        setError('Failed to get URL for uploaded image');
        setUploadProgress(0);
        setLoading(false);
        return;
      }
      
      // Store metadata in the database
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: imageName.trim(),
          description: imageDescription.trim() || null,
          url: result.url
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(`Database error: ${errorData.message || 'Failed to save image metadata'}`);
        setUploadProgress(0);
        setLoading(false);
        return;
      }
      
      // Success!
      setUploadProgress(100);
      setSuccess('Image uploaded successfully!');
      
      // Reset form
      setImages([]);
      setPreviews([]);
      setImageName('');
      setImageDescription('');
      
      // Notify parent component to refresh the gallery
      onImageUploaded();
      
      // Reset progress and success message after a delay
      setTimeout(() => {
        setUploadProgress(0);
        setSuccess('');
      }, 3000);
      
    } catch (error) {
      console.error('Unexpected error during upload:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-text">Upload Your Images</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Area */}
        <div 
          className={`relative border-2 border-dashed rounded-lg transition-all duration-200 ${
            dragActive 
              ? 'border-accent bg-accent/5 scale-[1.02]' 
              : previews.length > 0
                ? 'border-border bg-background/30' 
                : 'border-border hover:border-accent/60 cursor-pointer'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={previews.length === 0 ? openFileDialog : undefined}
        >
          {previews.length > 0 ? (
            <div className="p-4 grid gap-4 grid-cols-1">
              {previews.map((preview, index) => (
                <div key={preview} className="relative group">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={preview}
                      alt="Image preview"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Image Actions Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 rounded-lg">
                    <button
                      type="button"
                      onClick={openFileDialog}
                      className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors font-medium"
                      aria-label="Replace image"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                      aria-label="Remove image"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="mb-4">
                <svg
                  className={`mx-auto h-12 w-12 transition-colors ${
                    dragActive ? 'text-accent' : 'text-text-secondary'
                  }`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              {loading ? (
                <div className="space-y-3">
                  <div className="text-lg font-medium text-text">Uploading...</div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-text-secondary">{uploadProgress}% complete</div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-lg font-medium text-text">
                    {dragActive ? 'Drop your image here' : 'Drop an image here, or click to browse'}
                  </div>
                  <div className="text-sm text-text-secondary">
                    PNG, JPG, WebP or GIF up to 5MB
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={loading}
            aria-describedby={error ? "upload-error" : undefined}
          />
        </div>
        
        {/* Image Metadata Fields */}
        {previews.length > 0 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="imageName" className="block text-sm font-medium text-text mb-1">
                Image Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="imageName"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-text"
                placeholder="Enter a name for your image"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label htmlFor="imageDescription" className="block text-sm font-medium text-text mb-1">
                Description (Optional)
              </label>
              <textarea
                id="imageDescription"
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-text"
                placeholder="Enter an optional description"
                rows={3}
                disabled={loading}
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload to Gallery'}
              </button>
            </div>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div 
            id="upload-error"
            className="flex items-center gap-2 text-red-500 text-sm"
            role="alert"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {success}
          </div>
        )}
      </form>
    </div>
  );
}
