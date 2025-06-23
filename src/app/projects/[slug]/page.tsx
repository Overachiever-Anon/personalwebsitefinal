import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export const revalidate = 3600;

async function getProject(slug: string) {
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
    .eq('slug', slug)
    .single();

  if (error || !data) {
    notFound();
  }

  return data;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  return (
    <div className="container-main py-12 md:py-20">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{project.title}</h1>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-text-secondary">
            {project.tags?.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-background/50 rounded-full text-sm">{tag}</span>
            ))}
          </div>
        </header>

        {project.image_url && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 md:mb-12 shadow-lg">
            <Image src={project.image_url} alt={project.title} layout="fill" objectFit="cover" />
          </div>
        )}

        <div className="flex justify-center gap-4 mb-8 md:mb-12">
            {project.repo_url && (
                <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View Repository</a>
            )}
            {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>
            )}
        </div>

        <div className="prose prose-invert prose-lg max-w-none mx-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {project.full_content || ''}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
