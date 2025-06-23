import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO date string format
  readTime: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
  category?: string;
}

interface DatabaseBlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt?: string;
  created_at: string;
  read_time?: string;
  tags?: string;
  featured?: boolean;
  image_url?: string;
  category?: string;
}

// Fetch blog posts from Supabase
async function getBlogPosts(): Promise<BlogPost[]> {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  // Map database fields to BlogPost interface
  return posts.map((post: DatabaseBlogPost) => ({
    id: post.slug || post.id.toString(),
    title: post.title,
    excerpt: post.excerpt || 'No excerpt available',
    date: new Date(post.created_at).toISOString().split('T')[0], // Format as YYYY-MM-DD
    readTime: post.read_time || '5 min read',
    tags: Array.isArray(post.tags) ? post.tags : (post.tags ? [post.tags] : []),
    featured: post.featured || false,
    imageUrl: post.image_url || undefined,
    category: post.category || undefined,
  }))
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  // Separate featured and regular posts
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  // Get all unique tags
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))].sort();
  
  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="min-h-screen py-12">
      {/* Blog Header - Inspired by yihui.org */}
      <div className="container-main mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Blog</h1>
          <p className="text-text-secondary text-lg text-center mb-8 max-w-2xl mx-auto">
            Thoughts, analyses, and explorations across various domains including technology, 
            research, design, and academic writing.
          </p>
          
          {/* Search and Tag Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full md:w-64 px-4 py-2 bg-background/50 border border-border rounded-md 
                focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <svg 
                className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button className="px-3 py-1 text-sm bg-accent text-text rounded-full whitespace-nowrap">
                All Topics
              </button>
              {allTags.slice(0, 5).map((tag, i) => (
                <button 
                  key={i}
                  className="px-3 py-1 text-sm bg-background/50 text-text-secondary rounded-full hover:bg-background transition-colors whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
              {allTags.length > 5 && (
                <button className="px-3 py-1 text-sm bg-background/50 text-text-secondary rounded-full hover:bg-background transition-colors whitespace-nowrap">
                  More...
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container-main mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.id}`}
                className="group"
              >
                <article className="card overflow-hidden hover:shadow-accent/20 transition-all h-full flex flex-col">
                  {/* Post Image/Header */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                    {/* Placeholder for image */}
                    <div className="w-full h-full bg-background/30 flex items-center justify-center">
                      <span className="text-4xl">{post.title.charAt(0)}</span>
                    </div>
                    
                    {/* Post metadata overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-accent text-text text-xs rounded-full">
                          Featured
                        </span>
                        <span className="text-text-secondary text-sm">
                          {formatDate(post.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-text-secondary mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags && post.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 bg-background/50 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Read time and link */}
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary text-sm">
                          {post.readTime}
                        </span>
                        <span className="text-accent inline-flex items-center gap-1 text-sm font-medium">
                          Read More
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Regular Posts - yihui.org inspired minimal design */}
      <section className="container-main mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 border-b border-border pb-2">Recent Articles</h2>
          
          <div className="divide-y divide-border">
            {regularPosts.map((post) => (
              <article key={post.id} className="py-6 group">
                <Link href={`/blog/${post.id}`}>
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Post metadata */}
                    <div className="md:w-1/4 text-text-secondary text-sm">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <div className="text-xs mt-1">{post.readTime}</div>
                    </div>
                    
                    {/* Post content */}
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary mb-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 bg-background/50 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Subscription */}
      <section className="container-main mb-12">
        <div className="card p-8 border-accent/30 border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to the Newsletter</h3>
            <p className="text-text-secondary mb-6">
              Get notified when new articles are published. No spam, unsubscribe at any time.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-background/50 border border-border rounded-md 
                focus:outline-none focus:ring-2 focus:ring-accent/50"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-text rounded-md hover:bg-accent/80 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
