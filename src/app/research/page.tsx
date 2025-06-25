export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';


interface ResearchNote {
  id: string;
  slug: string;
  title: string;
  abstract: string;
  authors: string[];
  publication_date: string;
  publication_source?: string;
  tags: string[];
  category: string;
  document_url?: string;
  external_url?: string;
}

async function getResearchNotes(): Promise<ResearchNote[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('research_notes')
    .select('*')
    .order('publication_date', { ascending: false });

  if (error) {
    console.error('Error fetching research notes:', error);
    return [];
  }

  return data;
}

export default async function ResearchPage() {
  const researchNotes = await getResearchNotes();

  const getYear = (dateStr: string) => new Date(dateStr).getFullYear();

  const groupedByYear = researchNotes.reduce((acc, item) => {
    const year = item.publication_date ? getYear(item.publication_date) : 'Undated';
    acc[year] = [...(acc[year] || []), item];
    return acc;
  }, {} as Record<string, ResearchNote[]>);
  
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));
  const categories = [...new Set(researchNotes.map(item => item.category).filter(Boolean))];
  
  return (
    <div className="min-h-screen py-12">
      <div className="relative container-main mb-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary opacity-30 blur-md"></div>
        <div className="relative bg-card border border-border p-8 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Research</h1>
          <p className="text-text-secondary text-lg max-w-3xl">
            Academic publications, working papers, and research projects exploring areas including quantum computing, machine learning, data visualization, and more.
          </p>
        </div>
      </div>
      
      {/* TODO: Implement category filtering */}
      <div className="container-main mb-12">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <button className="px-4 py-2 rounded-full bg-accent text-text text-sm font-medium">All Research</button>
          {categories.map((category) => (
            <button key={category} className="px-4 py-2 rounded-full bg-background/50 text-text-secondary hover:bg-background text-sm font-medium transition-colors">
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <section className="container-main">
        {sortedYears.map((year) => (
          <div key={year} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">{year}</h2>
            <div className="space-y-8">
              {groupedByYear[year].map((item) => (
                <div key={item.id} className="card hover:shadow-accent/20 transition-all p-6 border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-background/80 rounded-full text-xs font-medium">{item.category}</span>
                    <div className="flex gap-2">
                      {item.document_url && (
                        <a href={item.document_url} target="_blank" rel="noopener noreferrer" className="p-1 hover:text-accent transition-colors" title="Download PDF">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </a>
                      )}
                      {item.external_url && (
                        <a href={item.external_url} target="_blank" rel="noopener noreferrer" className="p-1 hover:text-accent transition-colors" title="View External Link">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <Link href={`/research/${item.slug}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-accent transition-colors">{item.title}</h3>
                  </Link>
                  
                  <p className="text-text-secondary text-sm mb-4">{(item.authors || []).join(', ')}</p>
                  
                  {item.publication_source && (
                    <p className="text-accent text-sm mb-4 italic">{item.publication_source}</p>
                  )}
                  
                  <p className="text-text-secondary mb-4 text-sm">{item.abstract}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {(item.tags || []).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-background/50 rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      
      {/* Research Collaborators */}
      <section className="container-main py-12">
        <h2 className="section-heading mb-8">Collaborators</h2>
        <div className="card p-6">
          <p className="text-text-secondary mb-6">
            My research is conducted in collaboration with excellent scholars and institutions from around the world.
            If you are interested in potential collaboration opportunities, please reach out via the contact page.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Stanford University",
              "MIT",
              "ETH Zurich",
              "Tsinghua University",
              "Tokyo Institute of Technology",
              "Max Planck Institute",
              "University of Oxford",
              "Carnegie Mellon University"
            ].map((institution, i) => (
              <div 
                key={i} 
                className="p-4 bg-background/30 rounded text-center hover:bg-background/50 transition-colors"
              >
                {institution}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
