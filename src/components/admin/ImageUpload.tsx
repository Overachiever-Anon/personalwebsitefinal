// src/components/admin/ImageUpload.tsx
'use client';

import { useState, useRef } from 'react';
import { uploadImage } from '@/app/admin/actions';
import Image from 'next/image';

interface ImageUploadProps {
  name: string;
  defaultValue?: string | null;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({ 
  name, 
  defaultValue, 
  label = "Featured Image",
  required = false 
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setUploadProgress(0);

    // Simulate upload progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90));
    }, 100);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadImage(formData);
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        setImageUrl(result.url);
        // Brief success feedback
        setTimeout(() => setUploadProgress(0), 1000);
      }
    } catch {
      clearInterval(progressInterval);
      setError('Upload failed. Please try again.');
    }

    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleFileUpload(file);
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
      handleFileUpload(files[0]);
    }
  };

  const removeImage = () => {
    setImageUrl('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="block text-lg font-medium text-text">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg transition-all duration-200 ${
          dragActive 
            ? 'border-accent bg-accent/5 scale-[1.02]' 
            : imageUrl 
              ? 'border-border bg-background/30' 
              : 'border-border hover:border-accent/60 cursor-pointer'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!imageUrl ? openFileDialog : undefined}
      >
        {imageUrl ? (
          /* Image Preview */
          <div className="relative group">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image 
                src={imageUrl} 
                alt="Uploaded image preview" 
                fill
                className="object-cover"
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
                onClick={removeImage}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                aria-label="Remove image"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          /* Upload Interface */
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
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div 
          id={`${name}-error`}
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
      {imageUrl && !loading && !error && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Image uploaded successfully
        </div>
      )}

      {/* Hidden Input for Form Submission */}
      <input type="hidden" name={name} value={imageUrl} />
    </div>
  );
}
