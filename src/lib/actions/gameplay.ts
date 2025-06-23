'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createGameplayItem(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const rawData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    game_name: formData.get('game_name') as string,
    platform: formData.get('platform') as string || null,
    description: formData.get('description') as string || null,
    video_url: formData.get('video_url') as string,
    thumbnail_url: formData.get('thumbnail_url') as string || null,
    tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
  };

  if (!rawData.title || !rawData.slug || !rawData.game_name || !rawData.video_url) {
    console.error('Create gameplay item failed: Required fields are missing.');
    return;
  }

  const { error } = await supabase.from('gameplay_items').insert([rawData]);

  if (error) {
    console.error('Error creating gameplay item:', error);
    return;
  }

  revalidatePath('/admin');
  revalidatePath('/gameplay');
  redirect('/admin');
}
