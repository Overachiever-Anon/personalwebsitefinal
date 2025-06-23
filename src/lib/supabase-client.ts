import { createSupabaseClient } from '@/utils/supabase'
import type { BlogPost, LolGameplay, Project, ResearchNote } from '@/types/database'

// Projects
export async function getProjects() {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  
  return data as Project[]
}

export async function getFeaturedProjects() {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
  
  return data as Project[]
}

export async function getProjectById(id: string) {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching project with id ${id}:`, error)
    return null
  }
  
  return data as Project
}

// Blog Posts
export async function getBlogPosts(publishedOnly = true) {
  const supabase = createSupabaseClient()
  let query = supabase
    .from('blog_posts')
    .select('*')
    
  if (publishedOnly) {
    query = query.eq('is_published', true)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  
  return data as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
  
  return data as BlogPost
}

// Research Notes
export async function getResearchNotes() {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('research_notes')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching research notes:', error)
    return []
  }
  
  return data as ResearchNote[]
}

export async function getResearchNoteById(id: string) {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('research_notes')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching research note with id ${id}:`, error)
    return null
  }
  
  return data as ResearchNote
}

// LoL Gameplay
export async function getLolGameplayVideos() {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('lol_gameplay')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching LoL gameplay videos:', error)
    return []
  }
  
  return data as LolGameplay[]
}

export async function getLolGameplayById(id: string) {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('lol_gameplay')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching LoL gameplay with id ${id}:`, error)
    return null
  }
  
  return data as LolGameplay
}
