'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GalleryGrid from './GalleryGrid';
import GalleryUpload from './GalleryUpload';

export default function GalleryPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // This function will be called after successful uploads
  const handleImageUploaded = () => {
    // Increment the counter to trigger a re-fetch in the GalleryGrid component
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-text">My Gallery</h1>
      
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="view">View Gallery</TabsTrigger>
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view" className="focus-visible:outline-none">
          <GalleryGrid refreshTrigger={refreshTrigger} />
        </TabsContent>
        
        <TabsContent value="upload" className="focus-visible:outline-none">
          <GalleryUpload onImageUploaded={handleImageUploaded} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
