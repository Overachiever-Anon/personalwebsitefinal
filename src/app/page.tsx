import Link from 'next/link';
import Image from 'next/image';
import { createServerClient } from '@/utils/supabase';

async function getHomepageContent() {
  const supabase = await createServerClient();

  // Helper to fetch data and handle errors gracefully.
  const fetchData = async (query: any) => {
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching data:', error.message);
      return []; // Return empty array on error to prevent crashes.
    }
    return data || []; // Return data or empty array if data is null.
  };

  const [
    hero,
    skills,
    timeline,
    blogPosts,
    gameplayClips,
  ] = await Promise.all([
    fetchData(supabase.from('homepage_hero').select('*')),
    fetchData(supabase.from('homepage_skills').select('*').order('id', { ascending: true })),
    fetchData(supabase.from('homepage_timeline').select('*').order('date', { ascending: false })),
    fetchData(supabase.from('blog_posts').select('*').eq('featured', true).order('created_at', { ascending: false })),
    fetchData(supabase.from('gameplay_clips').select('*').eq('featured', true).order('created_at', { ascending: false }))
  ]);

  return {
    hero: hero[0] || {},
    skills: skills || [],
    timelineEvents: timeline || [],
    featuredBlogs: blogPosts || [],
    featuredGameplay: gameplayClips || [],
  };
}

type Hero = {
  title?: string;
  subtitle?: string;
  profile_image_url?: string;
  cta_text?: string;
  cta_link?: string;
};

type Skill = {
  id: string;
  name: string;
  icon_svg?: string;
};

type BlogPost = {
  id: string;
  slug: string;
  image_url?: string;
  title: string;
  created_at: string;
  excerpt?: string;
};

type GameplayClip = {
  id: string;
  slug: string;
  thumbnail_url?: string;
  title: string;
  game: string;
};

type TimelineEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export default async function Home() {
  const { hero, skills, timelineEvents, featuredBlogs, featuredGameplay } = await getHomepageContent();

  return (
    <div className="bg-background text-white">
      {/* Hero Section with Profile */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-bold mb-6 text-white leading-tight">{hero.title || "Andreas Kurz"}</h1>
              <p className="text-2xl mb-4 text-accent">{hero.subtitle || "Researcher, Developer, Gaming Enthusiast"}</p>
              <p className="text-lg mb-8 text-gray-300">
                I'm passionate about pushing the boundaries of what's possible through research and development. 
                With expertise in AI, web development, and a love for gaming, I create solutions 
                that blend technical excellence with user-centered design.
              </p>
              <div className="flex gap-4">
                <Link href={hero.cta_link || "/projects"} className="px-6 py-3 bg-accent hover:bg-accent/80 text-white font-medium rounded-lg transition-all duration-300">
                  {hero.cta_text || "View Projects"}
                </Link>
                <Link href="/contact" className="px-6 py-3 border border-accent/50 hover:border-accent text-accent hover:bg-accent/10 font-medium rounded-lg transition-all duration-300">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent/30">
                {hero.profile_image_url ? (
                  <Image 
                    src={hero.profile_image_url} 
                    alt={hero.title || "Andreas Kurz"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-800">
                    <span className="text-6xl">AK</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Achievements */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill: Skill) => (
              <div key={skill.id} className="p-6 bg-background rounded-xl shadow-lg hover:shadow-accent/20 transition-all duration-300 flex flex-col items-center text-center">
                {skill.icon_svg ? (
                  <div dangerouslySetInnerHTML={{ __html: skill.icon_svg }} className="w-12 h-12 mb-4 text-accent" />
                ) : (
                  <div className="w-12 h-12 mb-4 bg-accent/10 rounded-lg"></div>
                )}
                <h3 className="text-xl font-bold">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Featured Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredBlogs.map((blog: BlogPost) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
                  <div className="bg-background-light rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] shadow-lg">
                    <div className="h-48 bg-gray-800 relative">
                      {blog.image_url ? (
                        <Image 
                          src={blog.image_url} 
                          alt={blog.title} 
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-800 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
                          <span className="text-2xl font-bold">Blog Post</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-accent mb-2">{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">{blog.title}</h3>
                      <p className="text-gray-400">{blog.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blog" className="text-accent hover:text-accent/80 font-medium inline-flex items-center group">
                View All Blog Posts
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Gaming Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredGameplay.map((clip: GameplayClip) => (
                <Link key={clip.id} href={`/gameplay/${clip.slug}`} className="group">
                  <div className="bg-background-light rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02] shadow-lg relative">
                    <div className="h-48 bg-gray-800 relative">
                      {clip.thumbnail_url ? (
                        <Image 
                          src={clip.thumbnail_url} 
                          alt={clip.title} 
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-900 to-blue-900 group-hover:from-purple-800 group-hover:to-blue-800 transition-all duration-300">
                          <span className="text-2xl font-bold">{clip.game}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">{clip.title}</h3>
                      <p className="text-accent">{clip.game}</p>
                    </div>
                    {/* Play button overlay */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/gameplay" className="text-accent hover:text-accent/80 font-medium inline-flex items-center group">
                View All Gameplay
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">My Journey</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent/30"></div>
            
            {/* Timeline events */}
            <div className="space-y-16">
              {timelineEvents.map((event: TimelineEvent, index: number) => (
                <div key={event.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content side */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <h3 className="text-xl font-bold text-accent">{event.title}</h3>
                    <p className="text-gray-400 my-2">{event.description}</p>
                  </div>
                  
                  {/* Center dot */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Year side */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
                    <span className="text-2xl font-bold">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Whether you're looking for a research collaborator, developer, or just want to connect, I'd love to hear from you.
          </p>
          <Link href="/contact" className="px-8 py-4 bg-accent hover:bg-accent/80 text-white font-medium rounded-lg transition-all duration-300 inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
