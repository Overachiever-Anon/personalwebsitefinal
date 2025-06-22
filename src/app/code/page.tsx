import Link from 'next/link';
import ProjectCard from '@/components/code/ProjectCard';

interface CodeItem {
  id: string;
  title: string;
  description: string;
  language: string;
  repo: string;
  demoUrl?: string;
  tags: string[];
}

const codeProjects: CodeItem[] = [
  {
    id: 'neural-network-implementation',
    title: 'Neural Network Implementation',
    description: 'A custom neural network library built from scratch in Python with NumPy, demonstrating core machine learning concepts and backpropagation.',
    language: 'Python',
    repo: 'https://github.com/username/neural-network',
    tags: ['Machine Learning', 'Python', 'NumPy']
  },
  {
    id: 'quantum-computing-simulator',
    title: 'Quantum Computing Simulator',
    description: 'A simple quantum circuit simulator that demonstrates quantum gates and basic quantum algorithms.',
    language: 'Python',
    repo: 'https://github.com/username/quantum-sim',
    demoUrl: 'https://quantum-sim-demo.vercel.app',
    tags: ['Quantum Computing', 'Python', 'Physics']
  },
  {
    id: 'data-visualization-toolkit',
    title: 'Data Visualization Toolkit',
    description: 'A collection of reusable D3.js and React components for creating interactive data visualizations.',
    language: 'TypeScript',
    repo: 'https://github.com/username/data-viz-toolkit',
    demoUrl: 'https://data-viz-toolkit.vercel.app',
    tags: ['Data Visualization', 'TypeScript', 'D3.js', 'React']
  },
  {
    id: 'algorithm-visualizer',
    title: 'Algorithm Visualizer',
    description: 'Interactive visualizations of common algorithms including sorting, pathfinding, and graph algorithms.',
    language: 'JavaScript',
    repo: 'https://github.com/username/algorithm-visualizer',
    demoUrl: 'https://algo-viz-demo.vercel.app',
    tags: ['Algorithms', 'JavaScript', 'Educational']
  },
  {
    id: 'compiler-design',
    title: 'Mini Compiler Project',
    description: 'A simplified compiler implementation demonstrating lexical analysis, parsing, and code generation for a custom language.',
    language: 'C++',
    repo: 'https://github.com/username/mini-compiler',
    tags: ['Compilers', 'C++', 'Language Design']
  },
  {
    id: 'distributed-systems',
    title: 'Distributed Systems Framework',
    description: 'A framework for building fault-tolerant distributed systems with consensus algorithms.',
    language: 'Go',
    repo: 'https://github.com/username/distributed-sys',
    tags: ['Distributed Systems', 'Go', 'Consensus Algorithms']
  }
];

export default function CodePage() {
  return (
    <div className="min-h-screen py-12">
      {/* Page Header */}
      <div className="relative container-main mb-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-secondary to-accent opacity-30 blur-md"></div>
        <div className="relative bg-card border border-border p-8 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Code Showcase</h1>
          <p className="text-text-secondary text-lg max-w-3xl">
            A collection of code projects, implementations, and experiments that demonstrate my
            technical skills and problem-solving approaches across various domains.
          </p>
        </div>
      </div>
      
      {/* Language Filter */}
      <div className="container-main mb-12">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <button className="px-4 py-2 rounded-full bg-accent text-text text-sm font-medium">
            All
          </button>
          {[...new Set(codeProjects.map(project => project.language))].map((language) => (
            <button 
              key={language} 
              className="px-4 py-2 rounded-full bg-background/50 text-text-secondary hover:bg-background text-sm font-medium transition-colors"
            >
              {language}
            </button>
          ))}
        </div>
      </div>
      
      {/* Code Projects Grid */}
      <section className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codeProjects.map((project) => (
            <div key={project.id}>
              <Link 
                href={`/code/${project.id}`}
                className="block"
              >
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
