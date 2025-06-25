import Link from 'next/link';
import Image from 'next/image';
export const dynamic = 'force-dynamic';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const revalidate = 3600; // Revalidate at most once per hour

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string | null;
  is_featured: boolean;
  repo_url: string | null;
  live_url: string | null;
}

async function getProjects(): Promise<Project[]> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data.map(p => ({
    id: p.id.toString(),
    slug: p.slug,
    title: p.title,
    description: p.description || '',
    tags: p.tags || [],
    image_url: p.image_url,
    is_featured: p.is_featured || false,
    repo_url: p.repo_url,
    live_url: p.live_url,
  }));
}

export default async function ProjectsPage() {
  const allProjects = await getProjects();
  
  const featuredProjects = allProjects.filter(p => p.is_featured);
  const regularProjects = allProjects.filter(p => !p.is_featured);
  
  return (
    <div className="min-h-screen py-12">
      <div className="relative container-main mb-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-secondary opacity-30 blur-md"></div>
        <div className="relative bg-card border border-border p-8 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Projects</h1>
          <p className="text-text-secondary text-lg max-w-3xl">
            Showcasing a collection of technical and research projects spanning various domains including machine learning, data visualization, quantum computing, and more.
          </p>
        </div>
      </div>
      
      <section className="container-main mb-20">
        <h2 className="section-heading mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 gap-12">
          {featuredProjects.map((project) => (
            <div key={project.id} className="group">
              <Link href={`/projects/${project.slug}`}>
                <div className="card hover:shadow-accent/20 transition-all overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 group-hover:opacity-70 transition-opacity z-10"></div>
                      {project.image_url ? (
                        <Image src={project.image_url} alt={project.title} layout="fill" objectFit="cover" className="bg-gray-800" />
                      ) : (
                        <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                          <span className="text-6xl">💡</span>
                        </div>
                      )}
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-text-secondary mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                      <span className="text-accent inline-flex items-center gap-1 font-medium">
                        View Project Details
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      <section className="container-main">
        <h2 className="section-heading mb-8">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularProjects.length > 0 ? (
            regularProjects.map((project) => (
              <Link href={`/projects/${project.slug}`} key={project.id}>
                <div className="card h-full flex flex-col hover:shadow-accent/20 transition-all overflow-hidden border border-border hover:border-accent/30 group">
                  <div className="aspect-video relative bg-background/30">
                    {project.image_url && <Image src={project.image_url} alt={project.title} layout="fill" objectFit="cover" className="bg-gray-800" />}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-text-secondary mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-background/50 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-auto pt-4 border-t border-border/50">
                      {project.repo_url && (
                        <a href={project.repo_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                          Repository
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-text-secondary">No projects found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
