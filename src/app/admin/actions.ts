// src/app/admin/actions.ts
'use server';

import { createServerClient } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteItem(
  tableName: string, 
  id: number, 
  sectionSlug: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error in deleteItem:', authError);
      return { success: false, error: 'Authentication failed.' };
    }

    // Validate tableName against allowed values to prevent SQL injection
    const allowedTables = ['blog_posts', 'projects', 'code_items', 'research_notes', 'gameplay_clips'];
    if (!allowedTables.includes(tableName)) {
      console.error('Invalid table name:', tableName);
      return { success: false, error: 'Invalid table name provided.' };
    }

    const { error: deleteError } = await supabase.from(tableName).delete().match({ id });

    if (deleteError) {
      console.error('Error deleting item:', deleteError);
      return { success: false, error: deleteError.message };
    }

    // Only revalidate if delete was successful
    revalidatePath('/admin');
    revalidatePath(`/${sectionSlug}`);
    
    return { success: true };

  } catch (error) {
    console.error('Unexpected error in deleteItem:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: message };
  }
}

export async function updateItem(formData: FormData) {
  try {
    const supabase = await createServerClient();

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Auth error in updateItem:', authError);
        return; // Exit gracefully
      }
      
      if (!user) {
        redirect('/login');
      }
    } catch (authError) {
      console.error('Auth service error in updateItem:', authError);
      return; // Exit gracefully
    }

    // Form validation
    const id = formData.get('id') as string;
    const tableName = formData.get('tableName') as string;

    if (!id || !tableName) {
      console.error('Update failed: Missing required form data.');
      return;
    }
    
    // Validate tableName against allowed values to prevent SQL injection
    const allowedTables = ['blog_posts', 'projects', 'code_items', 'research_notes', 'gameplay_clips'];
    if (!allowedTables.includes(tableName)) {
      console.error('Invalid table name:', tableName);
      return;
    }

    const updateData: Record<string, unknown> = {};
    let slug: string | null = null;

    try {
      // Handle the 'featured' checkbox explicitly to correctly set it to false when unchecked.
      if (tableName === 'blog_posts' || tableName === 'gameplay_items') {
        updateData.featured = formData.get('featured') === 'on';
      }

      for (const [key, value] of formData.entries()) {
        // Skip keys that are handled separately or are not part of the table schema
        if (key === 'id' || key === 'tableName' || key === 'featured') continue;

        if (key === 'slug') {
          slug = value as string;
        }

        if (key === 'tags' && typeof value === 'string') {
          updateData[key] = value.split(',').map(tag => tag.trim()).filter(Boolean);
        } else if (key === 'is_published') {
          updateData[key] = value === 'on';
        } else {
          updateData[key] = value;
        }
      }

      const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .match({ id: parseInt(id, 10) });

      if (error) {
        console.error('Error updating item:', error);
        return;
      }

      const sectionSlugMap: { [key: string]: string } = {
        'blog_posts': 'blog',
        'projects': 'projects',
        'code_items': 'code',
        'research_notes': 'research',
        'gameplay_clips': 'gameplay',
      };
      const sectionSlug = sectionSlugMap[tableName];

      revalidatePath('/admin');
      if (sectionSlug) {
        revalidatePath(`/${sectionSlug}`);
        if (slug) {
          revalidatePath(`/${sectionSlug}/${slug}`);
        }
      }
      
      redirect('/admin');
    } catch (dbError) {
      console.error('Database error in updateItem:', dbError);
    }
  } catch (error) {
    console.error('Unexpected error in updateItem:', error);
  }
}

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = await createServerClient();

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('Auth error in uploadImage:', authError);
        return { error: 'Authentication failed. Please try again.' };
      }
      
      if (!user) {
        return { error: 'You must be logged in to upload images.' };
      }
    } catch (authError) {
      console.error('Auth service error in uploadImage:', authError);
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
      
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        return { error: `Failed to upload image: ${uploadError.message}` };
      }

      const { data } = supabase.storage.from('assets-projects').getPublicUrl(filePath);
      if (!data || !data.publicUrl) {
        return { error: 'Failed to get public URL for uploaded image.' };
      }

      return { url: data.publicUrl };
    } catch (storageError) {
      console.error('Storage error in uploadImage:', storageError);
      return { error: 'Failed to process image. Please try again.' };
    }
  } catch (error) {
    console.error('Unexpected error in uploadImage:', error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
