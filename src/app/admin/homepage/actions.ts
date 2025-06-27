// src/app/admin/homepage/actions.ts
'use server';

import { createServerClient } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';


export type FormState = {
  error?: string;
  success?: string;
};

export async function updateHero(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update the hero section.' };
  }

  const heroData = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    profile_image_url: formData.get('profile_image_url') as string,
    cta_text: formData.get('cta_text') as string,
    cta_link: formData.get('cta_link') as string,
    description: formData.get('description') as string,
  };

  // Check if a hero record exists
  const { data: existingHero, error: fetchError } = await supabase
    .from('homepage_hero')
    .select('id')
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116: no rows found
    console.error('Error fetching hero:', fetchError);
    return { error: 'Could not fetch hero data.' };
  }

  if (existingHero) {
    // Update existing record
    const { error } = await supabase
      .from('homepage_hero')
      .update(heroData)
      .eq('id', existingHero.id);

    if (error) {
      console.error('Error updating hero:', error);
      return { error: 'Could not update hero section.' };
    }
  } else {
    // Insert new record
    const { error } = await supabase.from('homepage_hero').insert(heroData);

    if (error) {
      console.error('Error inserting hero:', error);
      return { error: 'Could not create hero section.' };
    }
  }

  revalidatePath('/admin/homepage');
  revalidatePath('/'); // Also revalidate the public homepage
  return { success: 'Hero section updated successfully.' };
}

export async function addSkill(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const skillData = {
    name: formData.get('name') as string,
    icon_svg: formData.get('icon_svg') as string,
  };

  if (!skillData.name) {
    return { error: 'Skill name is required.' };
  }

  const { error } = await supabase.from('homepage_skills').insert(skillData);

  if (error) {
    console.error('Error adding skill:', error);
    return { error: 'Could not add skill.' };
  }

  revalidatePath('/admin/homepage');
  revalidatePath('/');
  return { success: 'Skill added successfully.' };
}

export async function deleteSkill(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const id = formData.get('id') as string;

  if (!id) {
    return { error: 'Skill ID is required.' };
  }

  const { error } = await supabase.from('homepage_skills').delete().eq('id', id);

  if (error) {
    console.error('Error deleting skill:', error);
    return { error: 'Could not delete skill.' };
  }

  revalidatePath('/admin/homepage');
  revalidatePath('/');
  return { success: 'Skill deleted successfully.' };
}

export async function addTimelineEvent(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const eventData = {
    date: formData.get('date') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  };

  if (!eventData.date || !eventData.title || !eventData.description) {
    return { error: 'All timeline event fields are required.' };
  }

  const { error } = await supabase.from('homepage_timeline').insert(eventData);

  if (error) {
    console.error('Error adding timeline event:', error);
    return { error: 'Could not add timeline event.' };
  }

  revalidatePath('/admin/homepage');
  revalidatePath('/');
  return { success: 'Timeline event added successfully.' };
}

export async function deleteTimelineEvent(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const id = formData.get('id') as string;

  if (!id) {
    return { error: 'Event ID is required.' };
  }

  const { error } = await supabase.from('homepage_timeline').delete().eq('id', id);

  if (error) {
    console.error('Error deleting timeline event:', error);
    return { error: 'Could not delete timeline event.' };
  }

  revalidatePath('/admin/homepage');
  revalidatePath('/');
  return { success: 'Timeline event deleted successfully.' };
}
