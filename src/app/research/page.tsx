import Link from 'next/link';

interface ResearchItem {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  year: number;
  journal?: string;
  conference?: string;
  tags: string[];
  category: 'Publication' | 'Working Paper' | 'Conference';
  pdfUrl?: string;
  doi?: string;
}

const researchItems: ResearchItem[] = [
  {
    id: 'quantum-computing-advances',
    title: 'Advances in Quantum Computing Algorithms for Optimization Problems',
    abstract: 'This paper explores novel quantum algorithms for solving complex optimization problems, demonstrating significant speedup compared to classical approaches. We present theoretical foundations and experimental results using current quantum hardware.',
    authors: ['A. Kurz', 'J. Smith', 'L. Zhang'],
    year: 2024,
    journal: 'Journal of Quantum Information Processing',
    tags: ['Quantum Computing', 'Algorithms', 'Optimization'],
    category: 'Publication',
    doi: '10.1000/xyz123',
    pdfUrl: '/research/quantum-computing.pdf'
  },
  {
    id: 'neural-network-interpretability',
    title: 'Improving Neural Network Interpretability Through Integrated Gradients',
    abstract: 'We propose a new method for interpreting neural network decisions using integrated gradients, allowing for more transparent and explainable AI systems. Our approach is evaluated across multiple domains including image classification and natural language processing.',
    authors: ['A. Kurz', 'M. Johnson', 'R. Chen'],
    year: 2023,
    journal: 'Neural Information Processing Systems',
    tags: ['Deep Learning', 'Interpretability', 'XAI'],
    category: 'Publication',
    doi: '10.1000/abc456',
    pdfUrl: '/research/neural-interpretability.pdf'
  },
  {
    id: 'data-visualization-techniques',
    title: 'Novel Data Visualization Techniques for High-Dimensional Scientific Datasets',
    abstract: 'This research introduces innovative visualization methods for exploring and analyzing high-dimensional scientific data. We demonstrate applications in astrophysics, molecular biology, and climate science with improved pattern discovery capabilities.',
    authors: ['A. Kurz', 'T. Williams'],
    year: 2023,
    conference: 'IEEE Visualization Conference',
    tags: ['Data Visualization', 'Scientific Computing', 'Human-Computer Interaction'],
    category: 'Conference',
    pdfUrl: '/research/data-visualization.pdf'
  },
  {
    id: 'reinforcement-learning-frameworks',
    title: 'Comparative Analysis of Reinforcement Learning Frameworks for Robotic Control',
    abstract: 'We present a systematic comparison of current reinforcement learning frameworks applied to robotic control tasks. The analysis covers sample efficiency, stability, and transfer learning capabilities across different robotic platforms.',
    authors: ['A. Kurz', 'S. Patel', 'H. Garcia'],
    year: 2022,
    journal: 'Robotics and Autonomous Systems',
    tags: ['Reinforcement Learning', 'Robotics', 'Control Systems'],
    category: 'Publication',
    doi: '10.1000/def789',
    pdfUrl: '/research/rl-frameworks.pdf'
  },
  {
    id: 'privacy-preserving-ml',
    title: 'Privacy-Preserving Machine Learning: Challenges and Future Directions',
    abstract: 'This working paper examines current challenges in privacy-preserving machine learning techniques including federated learning, differential privacy, and secure multi-party computation. We outline promising research directions and open problems in the field.',
    authors: ['A. Kurz', 'K. Nakamura'],
    year: 2024,
    tags: ['Privacy', 'Machine Learning', 'Security', 'Federated Learning'],
    category: 'Working Paper',
    pdfUrl: '/research/privacy-ml.pdf'
  }
];

export default function ResearchPage() {
  // Group research items by year
  const groupedByYear = researchItems.reduce((acc, item) => {
    acc[item.year] = [...(acc[item.year] || []), item];
    return acc;
  }, {} as Record<number, ResearchItem[]>);
  
  // Sort years in descending order
  const sortedYears = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);
  
  return (
    <div className="min-h-screen py-12">
      {/* Page Header */}
      <div className="relative container-main mb-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary opacity-30 blur-md"></div>
        <div className="relative bg-card border border-border p-8 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Research</h1>
          <p className="text-text-secondary text-lg max-w-3xl">
            Academic publications, working papers, and research projects exploring areas including 
            quantum computing, machine learning, data visualization, and more.
          </p>
        </div>
      </div>
      
      {/* Research Categories */}
      <div className="container-main mb-12">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <button className="px-4 py-2 rounded-full bg-accent text-text text-sm font-medium">
            All Research
          </button>
          {['Publication', 'Conference', 'Working Paper'].map((category) => (
            <button 
              key={category} 
              className="px-4 py-2 rounded-full bg-background/50 text-text-secondary hover:bg-background text-sm font-medium transition-colors"
            >
              {category}s
            </button>
          ))}
        </div>
      </div>
      
      {/* Research Publications by Year */}
      <section className="container-main">
        {sortedYears.map((year) => (
          <div key={year} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">
              {year}
            </h2>
            
            <div className="space-y-8">
              {groupedByYear[year].map((item) => (
                <div key={item.id} className="card hover:shadow-accent/20 transition-all p-6 border border-border">
                  {/* Publication Type Badge */}
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-background/80 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                    <div className="flex gap-2">
                      {item.pdfUrl && (
                        <Link 
                          href={item.pdfUrl} 
                          className="p-1 hover:text-accent transition-colors"
                          title="Download PDF"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </Link>
                      )}
                      {item.doi && (
                        <a 
                          href={`https://doi.org/${item.doi}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1 hover:text-accent transition-colors"
                          title="View DOI"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Title & Authors */}
                  <Link href={`/research/${item.id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  
                  <p className="text-text-secondary text-sm mb-4">
                    {item.authors.join(', ')}
                  </p>
                  
                  {/* Journal/Conference */}
                  {(item.journal || item.conference) && (
                    <p className="text-accent text-sm mb-4 italic">
                      {item.journal || item.conference}
                    </p>
                  )}
                  
                  {/* Abstract */}
                  <p className="text-text-secondary mb-4 text-sm">
                    {item.abstract}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 bg-background/50 rounded-full text-xs"
                      >
                        {tag}
                      </span>
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
