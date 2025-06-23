'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const rawData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    image_url: formData.get('image_url') as string || null,
    tags: (formData.get('tags') as string)?.split(',').map(tag => tag.trim()).filter(Boolean) || [],
    repo_url: formData.get('repo_url') as string || null,
    live_url: formData.get('live_url') as string || null,
    full_content: formData.get('full_content') as string || null,
    is_featured: formData.get('is_featured') === 'on',
  };

  if (!rawData.title || !rawData.slug || !rawData.description) {
    console.error('Create project failed: Missing required fields.');
    // You might want to return a message to the user here
    return;
  }

  const { error } = await supabase.from('projects').insert([rawData]);

  if (error) {
    console.error('Error creating project:', error);
    // You might want to return a message to the user here
    return;
  }

  revalidatePath('/admin');
  revalidatePath('/projects');
  redirect('/admin');
}
