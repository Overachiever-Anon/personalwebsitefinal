import Link from 'next/link';
import Image from 'next/image';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  featured: boolean;
}

const projects: ProjectItem[] = [
  {
    id: 'code-analysis-tool',
    title: 'AI-Driven Code Analysis Tool',
    description: 'An innovative tool leveraging machine learning to analyze code quality, identify potential bugs, and suggest optimizations across multiple programming languages.',
    tags: ['Machine Learning', 'Software Engineering', 'Python', 'TypeScript'],
    image: '/projects/code-analysis.jpg',
    featured: true
  },
  {
    id: 'quantum-algorithm',
    title: 'Quantum Algorithm Optimization',
    description: 'Research project focused on optimizing quantum computing algorithms for practical applications in cryptography and data processing.',
    tags: ['Quantum Computing', 'Algorithms', 'Research', 'Python'],
    image: '/projects/quantum.jpg',
    featured: true
  },
  {
    id: 'data-viz-library',
    title: 'Advanced Data Visualization Library',
    description: 'Open-source library providing innovative visualization components for complex datasets in scientific and business intelligence domains.',
    tags: ['Data Visualization', 'JavaScript', 'D3.js', 'Open Source'],
    image: '/projects/data-viz.jpg', 
    featured: false
  },
  {
    id: 'neural-network-framework',
    title: 'Custom Neural Network Framework',
    description: 'A lightweight neural network framework designed for educational purposes with clear visualizations of network operations.',
    tags: ['Deep Learning', 'Python', 'Education', 'TensorFlow'],
    image: '/projects/neural-network.jpg',
    featured: false
  },
  {
    id: 'augmented-reality-prototype',
    title: 'Academic Research AR Prototype',
    description: 'Augmented reality prototype demonstrating novel interaction techniques for scientific data exploration in laboratory environments.',
    tags: ['Augmented Reality', 'Unity', 'C#', 'UX Research'],
    image: '/projects/ar-prototype.jpg',
    featured: false
  },
  {
    id: 'computational-linguistics',
    title: 'Computational Linguistics Parser',
    description: 'A natural language processing tool that analyzes linguistic structures with applications in automated translation and text analysis.',
    tags: ['NLP', 'Linguistics', 'Python', 'Research'],
    image: '/projects/linguistics.jpg',
    featured: false
  }
];

export default function ProjectsPage() {
  // Separate featured and regular projects
  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);
  
  return (
    <div className="min-h-screen py-12">
      {/* Page Header with Animated Border */}
      <div className="relative container-main mb-16">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-secondary opacity-30 blur-md"></div>
        <div className="relative bg-card border border-border p-8 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Projects</h1>
          <p className="text-text-secondary text-lg max-w-3xl">
            Showcasing a collection of technical and research projects spanning various domains including 
            machine learning, data visualization, quantum computing, and more.
          </p>
        </div>
      </div>
      
      {/* Featured Projects */}
      <section className="container-main mb-20">
        <h2 className="section-heading mb-8">Featured Projects</h2>
        
        <div className="grid grid-cols-1 gap-12">
          {featuredProjects.map((project) => (
            <div key={project.id} className="group">
              <Link href={`/projects/${project.id}`}>
                <div className="card hover:shadow-accent/20 transition-all overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Project Image */}
                    <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 group-hover:opacity-70 transition-opacity z-10"></div>
                      {/* Placeholder instead of image until real images are added */}
                      <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                        <span className="text-6xl">💡</span>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="md:w-1/2 p-6 md:p-8">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-background/50 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-accent inline-flex items-center gap-1 font-medium">
                        View Project Details
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* Regular Projects */}
      <section className="container-main">
        <h2 className="section-heading mb-8">All Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularProjects.map((project) => (
            <Link 
              key={project.id} 
              href={`/projects/${project.id}`}
              className="card hover:shadow-accent/20 transition-all p-6 hover:scale-[1.02]"
            >
              {/* Project Card Content */}
              <div className="flex items-start gap-4">
                {/* Project Icon/Mini Image */}
                <div className="w-12 h-12 rounded-md bg-background/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔬</span>
                </div>
                
                {/* Project Info */}
                <div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-text-secondary text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 bg-background/50 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="px-2 py-0.5 rounded-full text-xs text-text-secondary">
                        +{project.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
