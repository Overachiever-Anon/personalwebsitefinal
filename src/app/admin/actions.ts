// src/app/admin/actions.ts
'use server';

import { createServerClient } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteItem(formData: FormData) {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const id = formData.get('id') as string;
  const tableName = formData.get('tableName') as string;
  const sectionSlug = formData.get('sectionSlug') as string;

  if (!id || !tableName || !sectionSlug) {
    console.error('Delete failed: Missing required form data.');
    return;
  }

  const { error } = await supabase.from(tableName).delete().match({ id: parseInt(id, 10) });

  if (error) {
    console.error('Error deleting item:', error);
    return;
  }

  revalidatePath('/admin');
  revalidatePath(`/${sectionSlug}`);
}

export async function updateItem(formData: FormData) {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const id = formData.get('id') as string;
  const tableName = formData.get('tableName') as string;

  if (!id || !tableName) {
    console.error('Update failed: Missing required form data.');
    return;
  }

  const updateData: Record<string, unknown> = {};
  let slug: string | null = null;

  for (const [key, value] of formData.entries()) {
    if (key === 'id' || key === 'tableName') continue;

    if (key === 'slug') {
      slug = value as string;
    }

    if (key === 'tags' && typeof value === 'string') {
      updateData[key] = value.split(',').map(tag => tag.trim()).filter(Boolean);
    } else if (key === 'is_published' || key === 'featured') {
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
    'gameplay_items': 'gameplay',
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
}

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'You must be logged in to upload images.' };
  }

  const file = formData.get('file') as File;
  if (!file || file.size === 0) {
    return { error: 'No file provided.' };
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Image upload error:', uploadError);
    return { error: `Failed to upload image: ${uploadError.message}` };
  }

  const { data } = supabase.storage.from('images').getPublicUrl(filePath);

  return { url: data.publicUrl };
}
