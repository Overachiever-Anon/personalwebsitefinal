-- Create gallery_images table for storing image metadata
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow authenticated users to view all gallery images
CREATE POLICY "Allow authenticated users to view gallery images" ON public.gallery_images
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow public users to view all gallery images
CREATE POLICY "Allow public users to view gallery images" ON public.gallery_images
  FOR SELECT USING (true);

-- Allow users to insert their own gallery images
CREATE POLICY "Allow users to insert their own gallery images" ON public.gallery_images
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own gallery images
CREATE POLICY "Allow users to update their own gallery images" ON public.gallery_images
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Allow users to delete their own gallery images
CREATE POLICY "Allow users to delete their own gallery images" ON public.gallery_images
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Add an index for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_images_user_id ON public.gallery_images(user_id);

-- Add created_at index for sorting
CREATE INDEX IF NOT EXISTS idx_gallery_images_created_at ON public.gallery_images(created_at);
