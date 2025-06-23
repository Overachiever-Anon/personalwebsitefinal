import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export const revalidate = 3600;

async function getResearchNote(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('research_notes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    notFound();
  }

  return data;
}

export default async function ResearchNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = await getResearchNote(slug);

  return (
    <div className="container-main py-12 md:py-20">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 border-b border-border pb-8">
          <p className="text-accent text-sm mb-2">{note.category}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{note.title}</h1>
          <div className="text-text-secondary">
            <p className="mb-2">By {note.authors?.join(', ')}</p>
            <p className="text-sm">Published in <span className="font-semibold">{note.publication_source}</span> on {new Date(note.publication_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {note.tags?.map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 bg-background/50 rounded-full text-xs">#{tag}</span>
            ))}
          </div>
        </header>

        <div className="flex justify-start gap-4 mb-8 md:mb-12">
            {note.document_url && (
                <a href={note.document_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Download PDF</a>
            )}
            {note.external_url && (
                <a href={note.external_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Publication</a>
            )}
        </div>

        {note.abstract && (
            <blockquote className="border-l-4 border-accent bg-card p-4 my-8">
                <p className="italic text-text-secondary">{note.abstract}</p>
            </blockquote>
        )}

        <div className="prose prose-invert prose-lg max-w-none mx-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {note.full_text || ''}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
