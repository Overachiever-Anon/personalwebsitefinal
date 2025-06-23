'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCodeItem(formData: FormData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const rawData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    language: formData.get('language') as string,
    tags: (formData.get('tags') as string)?.split(',').map(tag => tag.trim()).filter(Boolean) || [],
    repository_url: formData.get('repository_url') as string || null,
    live_demo_url: formData.get('live_demo_url') as string || null,
    code_snippet: formData.get('code_snippet') as string,
  };

  if (!rawData.title || !rawData.slug) {
    console.error('Create code item failed: Title and slug are required.');
    return;
  }

  const { error } = await supabase.from('code_items').insert([rawData]);

  if (error) {
    console.error('Error creating code item:', error);
    return;
  }

  revalidatePath('/admin');
  revalidatePath('/code');
  redirect('/admin');
}
