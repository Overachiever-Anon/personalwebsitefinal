export const dynamic = 'force-dynamic';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export const revalidate = 3600;

async function getCodeItem(slug: string) {
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
    .from('code_items')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    notFound();
  }

  return data;
}

export default async function CodeItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCodeItem(slug);

  return (
    <div className="container-main py-12 md:py-20">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">{item.title}</h1>
          <p className="text-lg text-text-secondary mb-4">{item.description}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-text-secondary">
            <span className="px-3 py-1 bg-background/50 rounded-full text-sm font-mono">{item.language}</span>
            {item.tags?.map((tag: string) => (
              <span key={tag} className="text-sm">#{tag}</span>
            ))}
          </div>
        </header>

        <div className="flex justify-start gap-4 mb-8 md:mb-12">
            {item.repository_url && (
                <a href={item.repository_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View Repository</a>
            )}
            {item.live_demo_url && (
                <a href={item.live_demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>
            )}
        </div>

        <div className="prose prose-invert prose-lg max-w-none mx-auto bg-card p-4 sm:p-6 rounded-lg border border-border">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {item.code_snippet || ''}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
