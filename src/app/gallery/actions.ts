'use server';

import { createServerClient } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteGalleryImage(imageId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error in deleteGalleryImage:', authError);
      return { success: false, error: 'Authentication failed.' };
    }

    // First, get the image details to get the file path
    const { data: imageData, error: fetchError } = await supabase
      .from('gallery_images')
      .select('url, user_id')
      .eq('id', imageId)
      .single();

    if (fetchError || !imageData) {
      console.error('Error fetching image data:', fetchError);
      return { success: false, error: 'Image not found.' };
    }

    // Check ownership
    if (imageData.user_id !== user.id) {
      return { success: false, error: 'You do not have permission to delete this image.' };
    }

    // Extract the filename from the URL to delete from storage
    const urlParts = imageData.url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `gallery/${fileName}`;

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('images')
      .remove([filePath]);

    if (storageError) {
      console.error('Storage deletion error:', storageError);
      // Continue anyway to delete the database record
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', imageId);

    if (dbError) {
      console.error('Database deletion error:', dbError);
      return { success: false, error: dbError.message };
    }

    // Revalidate path to reflect changes
    revalidatePath('/gallery');

    return { success: true };
  } catch (error) {
    console.error('Unexpected error in deleteGalleryImage:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: message };
  }
}

export async function uploadGalleryImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = await createServerClient();

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('Auth error in uploadGalleryImage:', authError);
        return { error: 'Authentication failed. Please try again.' };
      }
      
      if (!user) {
        return { error: 'You must be logged in to upload images.' };
      }
    } catch (authError) {
      console.error('Auth service error in uploadGalleryImage:', authError);
      return { error: 'Authentication service unavailable. Please try again later.' };
    }

    // File validation
    const file = formData.get('file') as File;
    if (!file || file.size === 0) {
      return { error: 'No file provided.' };
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { error: 'File size exceeds 5MB limit.' };
    }

    try {
      const fileExt = file.name.split('.').pop();
      
      // Validate file extension
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      if (fileExt && !allowedExtensions.includes(fileExt.toLowerCase())) {
        return { error: `File type .${fileExt} is not supported. Use: ${allowedExtensions.join(', ')}` };
      }
      
      const fileName = `gallery-${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Gallery image upload error:', uploadError);
        return { error: `Failed to upload image: ${uploadError.message}` };
      }

      // Get a public URL from the same bucket we uploaded to
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      if (!data || !data.publicUrl) {
        return { error: 'Failed to get public URL for uploaded image.' };
      }

      // Ensure the gallery path exists in the database
      revalidatePath('/gallery');
      
      return { url: data.publicUrl };
    } catch (storageError) {
      console.error('Storage error in uploadGalleryImage:', storageError);
      return { error: 'Failed to process image. Please try again.' };
    }
  } catch (error) {
    console.error('Unexpected error in uploadGalleryImage:', error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
