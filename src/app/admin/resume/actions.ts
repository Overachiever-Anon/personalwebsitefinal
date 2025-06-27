// src/app/admin/resume/actions.ts
'use server';

import { createServerClient } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';

export type FormState = {
  error?: string;
  success?: string;
};

// Personal Info Actions
export async function updatePersonalInfo(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const personalInfo = {
    full_name: formData.get('full_name') as string,
    title: formData.get('title') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    location: formData.get('location') as string,
    website: formData.get('website') as string,
    linkedin: formData.get('linkedin') as string,
    github: formData.get('github') as string,
    summary: formData.get('summary') as string,
    profile_image_url: formData.get('profile_image_url') as string,
  };

  const id = formData.get('id') as string;
  let result;

  if (id) {
    // Update existing record
    result = await supabase
      .from('resume_personal_info')
      .update(personalInfo)
      .eq('id', id);
  } else {
    // Insert new record
    result = await supabase
      .from('resume_personal_info')
      .insert(personalInfo);
  }

  if (result.error) {
    console.error('Error updating personal info:', result.error);
    return { error: 'Could not update personal information.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Personal information updated successfully.' };
}

// Experience Actions
export async function addExperience(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  // Format highlights array from newline-separated string
  const highlightsString = formData.get('highlights') as string;
  const highlights = highlightsString ? highlightsString.split('\n').map(h => h.trim()).filter(Boolean) : [];

  const experienceData = {
    company: formData.get('company') as string,
    position: formData.get('position') as string,
    location: formData.get('location') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string || null,
    is_current: formData.get('is_current') === 'on',
    description: formData.get('description') as string,
    highlights,
    order_num: parseInt(formData.get('order_num') as string) || 0,
  };

  // If is_current is true, clear end_date
  if (experienceData.is_current) {
    experienceData.end_date = null;
  }

  const { error } = await supabase.from('resume_experience').insert(experienceData);

  if (error) {
    console.error('Error adding experience:', error);
    return { error: 'Could not add experience.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Experience added successfully.' };
}

export async function updateExperience(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Experience ID is required.' };
  }

  // Format highlights array from newline-separated string
  const highlightsString = formData.get('highlights') as string;
  const highlights = highlightsString ? highlightsString.split('\n').map(h => h.trim()).filter(Boolean) : [];

  const experienceData = {
    company: formData.get('company') as string,
    position: formData.get('position') as string,
    location: formData.get('location') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string || null,
    is_current: formData.get('is_current') === 'on',
    description: formData.get('description') as string,
    highlights,
    order_num: parseInt(formData.get('order_num') as string) || 0,
  };

  // If is_current is true, clear end_date
  if (experienceData.is_current) {
    experienceData.end_date = null;
  }

  const { error } = await supabase
    .from('resume_experience')
    .update(experienceData)
    .eq('id', id);

  if (error) {
    console.error('Error updating experience:', error);
    return { error: 'Could not update experience.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Experience updated successfully.' };
}

export async function deleteExperience(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Experience ID is required.' };
  }

  const { error } = await supabase.from('resume_experience').delete().eq('id', id);

  if (error) {
    console.error('Error deleting experience:', error);
    return { error: 'Could not delete experience.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Experience deleted successfully.' };
}

// Education Actions
export async function addEducation(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  // Get highest order number and add 1
  const { data: existingItems } = await supabase
    .from('resume_education')
    .select('order_num')
    .order('order_num', { ascending: false })
    .limit(1);

  const nextOrderNum = existingItems && existingItems.length > 0 ? existingItems[0].order_num + 1 : 0;

  const educationData = {
    institution: formData.get('institution') as string,
    degree: formData.get('degree') as string,
    field: formData.get('field') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string || null,
    location: formData.get('location') as string,
    gpa: formData.get('gpa') as string || null,
    honors: formData.get('honors') as string || null,
    description: formData.get('description') as string || null,
    order_num: nextOrderNum,
  };

  const { error } = await supabase.from('resume_education').insert(educationData);

  if (error) {
    console.error('Error adding education:', error);
    return { error: 'Could not add education.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Education added successfully.' };
}

export async function updateEducation(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Education ID is required.' };
  }

  const educationData = {
    institution: formData.get('institution') as string,
    degree: formData.get('degree') as string,
    field: formData.get('field') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string || null,
    location: formData.get('location') as string,
    gpa: formData.get('gpa') as string || null,
    honors: formData.get('honors') as string || null,
    description: formData.get('description') as string || null,
    order_num: parseInt(formData.get('order_num') as string) || 0,
  };

  const { error } = await supabase
    .from('resume_education')
    .update(educationData)
    .eq('id', id);

  if (error) {
    console.error('Error updating education:', error);
    return { error: 'Could not update education.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Education updated successfully.' };
}

export async function deleteEducation(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Education ID is required.' };
  }

  const { error } = await supabase.from('resume_education').delete().eq('id', id);

  if (error) {
    console.error('Error deleting education:', error);
    return { error: 'Could not delete education.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Education deleted successfully.' };
}

// Skills Actions
export async function addSkill(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  // Get highest order number and add 1
  const { data: existingItems } = await supabase
    .from('resume_skills')
    .select('order_num')
    .order('order_num', { ascending: false })
    .limit(1);

  const nextOrderNum = existingItems && existingItems.length > 0 ? existingItems[0].order_num + 1 : 0;

  // Format skills from comma-separated string to array
  const skillsString = formData.get('skills') as string;
  const skills = skillsString.split(',').map(s => s.trim()).filter(Boolean);

  if (skills.length === 0) {
    return { error: 'At least one skill is required.' };
  }

  const skillData = {
    category: formData.get('category') as string,
    skills,
    order_num: nextOrderNum,
  };

  const { error } = await supabase.from('resume_skills').insert(skillData);

  if (error) {
    console.error('Error adding skill category:', error);
    return { error: 'Could not add skill category.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Skill category added successfully.' };
}

export async function updateSkill(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Skill category ID is required.' };
  }

  // Format skills from comma-separated string to array
  const skillsString = formData.get('skills') as string;
  const skills = skillsString.split(',').map(s => s.trim()).filter(Boolean);

  if (skills.length === 0) {
    return { error: 'At least one skill is required.' };
  }

  const skillData = {
    category: formData.get('category') as string,
    skills,
    order_num: parseInt(formData.get('order_num') as string) || 0,
  };

  const { error } = await supabase
    .from('resume_skills')
    .update(skillData)
    .eq('id', id);

  if (error) {
    console.error('Error updating skill category:', error);
    return { error: 'Could not update skill category.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Skill category updated successfully.' };
}

export async function deleteSkill(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Skill category ID is required.' };
  }

  const { error } = await supabase.from('resume_skills').delete().eq('id', id);

  if (error) {
    console.error('Error deleting skill category:', error);
    return { error: 'Could not delete skill category.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Skill category deleted successfully.' };
}

// Projects Actions
export async function addProject(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  // Get highest order number and add 1
  const { data: existingItems } = await supabase
    .from('resume_projects')
    .select('order_num')
    .order('order_num', { ascending: false })
    .limit(1);

  const nextOrderNum = existingItems && existingItems.length > 0 ? existingItems[0].order_num + 1 : 0;

  // Format technologies from comma-separated string to array
  const technologiesString = formData.get('technologies') as string;
  const technologies = technologiesString.split(',').map(t => t.trim()).filter(Boolean);

  if (technologies.length === 0) {
    return { error: 'At least one technology is required.' };
  }

  const projectData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    technologies,
    url: formData.get('url') as string || null,
    github_url: formData.get('github_url') as string || null,
    image_url: formData.get('image_url') as string || null,
    start_date: formData.get('start_date') as string || null,
    end_date: formData.get('end_date') as string || null,
    order_num: nextOrderNum,
  };

  const { error } = await supabase.from('resume_projects').insert(projectData);

  if (error) {
    console.error('Error adding project:', error);
    return { error: 'Could not add project.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Project added successfully.' };
}

export async function updateProject(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Project ID is required.' };
  }

  // Format technologies from comma-separated string to array
  const technologiesString = formData.get('technologies') as string;
  const technologies = technologiesString.split(',').map(t => t.trim()).filter(Boolean);

  if (technologies.length === 0) {
    return { error: 'At least one technology is required.' };
  }

  const projectData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    technologies,
    url: formData.get('url') as string || null,
    github_url: formData.get('github_url') as string || null,
    image_url: formData.get('image_url') as string || null,
    start_date: formData.get('start_date') as string || null,
    end_date: formData.get('end_date') as string || null,
    order_num: parseInt(formData.get('order_num') as string) || 0,
  };

  const { error } = await supabase
    .from('resume_projects')
    .update(projectData)
    .eq('id', id);

  if (error) {
    console.error('Error updating project:', error);
    return { error: 'Could not update project.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Project updated successfully.' };
}

export async function deleteProject(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Project ID is required.' };
  }

  const { error } = await supabase.from('resume_projects').delete().eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    return { error: 'Could not delete project.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Project deleted successfully.' };
}

// Certifications Actions
export async function addCertification(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  // Get highest order number and add 1
  const { data: existingItems } = await supabase
    .from('resume_certifications')
    .select('order_num')
    .order('order_num', { ascending: false })
    .limit(1);

  const nextOrderNum = existingItems && existingItems.length > 0 ? existingItems[0].order_num + 1 : 0;

  const certificationData = {
    name: formData.get('name') as string,
    issuer: formData.get('issuer') as string,
    date: formData.get('date') as string,
    expires: formData.get('expires') as string || null,
    url: formData.get('url') as string || null,
    description: formData.get('description') as string || null,
    order_num: nextOrderNum,
  };

  const { error } = await supabase.from('resume_certifications').insert(certificationData);

  if (error) {
    console.error('Error adding certification:', error);
    return { error: 'Could not add certification.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Certification added successfully.' };
}

export async function updateCertification(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Certification ID is required.' };
  }

  const certificationData = {
    name: formData.get('name') as string,
    issuer: formData.get('issuer') as string,
    date: formData.get('date') as string,
    expires: formData.get('expires') as string || null,
    url: formData.get('url') as string || null,
    description: formData.get('description') as string || null,
    order_num: parseInt(formData.get('order_num') as string) || 0,
  };

  const { error } = await supabase
    .from('resume_certifications')
    .update(certificationData)
    .eq('id', id);

  if (error) {
    console.error('Error updating certification:', error);
    return { error: 'Could not update certification.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Certification updated successfully.' };
}

export async function deleteCertification(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to update resume information.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { error: 'Certification ID is required.' };
  }

  const { error } = await supabase.from('resume_certifications').delete().eq('id', id);

  if (error) {
    console.error('Error deleting certification:', error);
    return { error: 'Could not delete certification.' };
  }

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: 'Certification deleted successfully.' };
}
