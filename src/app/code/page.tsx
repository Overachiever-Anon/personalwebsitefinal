import Link from 'next/link';
export const dynamic = 'force-dynamic';

import { createClient } from '@/utils/supabase/server';
import ProjectCard from '@/components/code/ProjectCard';

export const revalidate = 3600;

interface CodeItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  language: string;
  repository_url: string;
  live_demo_url?: string;
  tags: string[];
}

async function getCodeItems(): Promise<CodeItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('code_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching code items:', error);
    return [];
  }

  return data;
}

export default async function CodePage() {
  const codeItems = await getCodeItems();
  const languages = [...new Set(codeItems.map(item => item.language).filter(Boolean))];

  return (
    <div className="min-h-screen py-12">
      <div className="container-main mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Code Showcase</h1>
          <p className="text-text-secondary text-lg text-center mb-8 max-w-2xl mx-auto">
            A collection of code projects, implementations, and experiments that demonstrate my technical skills and problem-solving approaches across various domains.
          </p>
        </div>
      </div>
      
      {/* TODO: Implement language filtering logic */}
      <div className="container-main mb-12">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <button className="px-4 py-2 rounded-full bg-accent text-text text-sm font-medium">All</button>
          {languages.map((language) => (
            <button key={language} className="px-4 py-2 rounded-full bg-background/50 text-text-secondary hover:bg-background text-sm font-medium transition-colors">
              {language}
            </button>
          ))}
        </div>
      </div>
      
      <section className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codeItems.map((item) => (
            <Link key={item.id} href={`/code/${item.slug}`} className="block">
              <ProjectCard project={{
                id: item.id,
                title: item.title,
                description: item.description,
                language: item.language,
                repo: item.repository_url,
                demoUrl: item.live_demo_url,
                tags: item.tags
              }} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
