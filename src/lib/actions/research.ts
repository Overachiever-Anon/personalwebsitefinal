'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createResearchNote(formData: FormData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const rawData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    authors: (formData.get('authors') as string)?.split(',').map(a => a.trim()).filter(Boolean) || [],
    category: formData.get('category') as string || null,
    publication_source: formData.get('publication_source') as string || null,
    publication_date: formData.get('publication_date') as string || null,
    abstract: formData.get('abstract') as string || null,
    tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
    document_url: formData.get('document_url') as string || null,
    external_url: formData.get('external_url') as string || null,
    full_text: formData.get('full_text') as string || null,
  };

  if (!rawData.title || !rawData.slug) {
    console.error('Create research note failed: Title and slug are required.');
    return;
  }

  const { error } = await supabase.from('research_notes').insert([rawData]);

  if (error) {
    console.error('Error creating research note:', error);
    return;
  }

  revalidatePath('/admin');
  revalidatePath('/research');
  redirect('/admin');
}
