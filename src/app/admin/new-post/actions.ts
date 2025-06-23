// src/app/admin/new-post/actions.ts
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// A simple utility to convert a title to a URL-friendly slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

// Utility to process tags from comma-separated string
function processTags(tagsString: string): string[] {
  if (!tagsString) return []
  return tagsString
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
}

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Extract form data
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const imageUrl = formData.get('imageUrl') as string
  const tagsString = formData.get('tags') as string
  const featured = formData.get('featured') === 'on'
  const readTime = formData.get('readTime') as string
  const category = formData.get('category') as string

  // Validate required fields
  if (!title || !content || !excerpt) {
    console.error('Missing required fields: title, content, and excerpt are required')
    // TODO: Return error to the client
    return
  }

  const slug = createSlug(title)
  const tags = processTags(tagsString)

  // Prepare the post data
  const postData: Record<string, unknown> = {
    title,
    content,
    excerpt,
    slug,
    is_published: true,
    featured,
  }

  // Add optional fields if they have values
  if (imageUrl) postData.image_url = imageUrl
  if (tags.length > 0) postData.tags = tags
  if (readTime) postData.read_time = readTime
  if (category) postData.category = category

  console.log('Creating post with data:', postData)

  const { error } = await supabase.from('blog_posts').insert([postData])

  if (error) {
    console.error('Error creating post:', error)
    // TODO: Handle error display on the client side
    return
  }

  console.log('Post created successfully!')

  // Clear the cache for the blog page to show the new post immediately
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)

  // Redirect to the new post's page after successful creation
  redirect(`/blog/${slug}`)
}
