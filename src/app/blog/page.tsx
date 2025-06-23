import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO date string format
  readTime: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'future-of-quantum-computing',
    title: 'The Future of Quantum Computing: Promises and Challenges',
    excerpt: 'Exploring the current state of quantum computing research, the challenges ahead, and how it might transform various industries in the coming decades.',
    date: '2024-06-15',
    readTime: '8 min read',
    tags: ['Quantum Computing', 'Technology', 'Research'],
    featured: true,
    imageUrl: '/blog/quantum-computing.jpg'
  },
  {
    id: 'interpretable-machine-learning',
    title: 'Making Machine Learning Models More Interpretable',
    excerpt: 'A discussion on the importance of interpretability in AI systems and various techniques to make complex models more transparent and explainable.',
    date: '2024-05-28',
    readTime: '12 min read',
    tags: ['Machine Learning', 'AI Ethics', 'Data Science'],
    featured: true,
    imageUrl: '/blog/interpretable-ml.jpg'
  },
  {
    id: 'designing-effective-visualizations',
    title: 'Principles for Designing Effective Data Visualizations',
    excerpt: 'A guide to creating impactful data visualizations that communicate insights clearly while avoiding common pitfalls in visual design.',
    date: '2024-05-10',
    readTime: '6 min read',
    tags: ['Data Visualization', 'Design', 'Communication'],
    featured: false,
    imageUrl: '/blog/data-viz.jpg'
  },
  {
    id: 'game-design-mechanics',
    title: 'Learning from Game Design: Engagement Mechanics for User Experiences',
    excerpt: 'How principles from game design can be applied to create more engaging user experiences in software applications and digital interfaces.',
    date: '2024-04-22',
    readTime: '9 min read',
    tags: ['Game Design', 'UX', 'Human-Computer Interaction'],
    featured: false,
    imageUrl: '/blog/game-design.jpg'
  },
  {
    id: 'programming-language-evolution',
    title: 'The Evolution of Programming Languages: Past, Present, and Future',
    excerpt: 'A historical overview of how programming languages have evolved over time and speculation about future trends in language design.',
    date: '2024-04-05',
    readTime: '10 min read',
    tags: ['Programming', 'Computer Science', 'History'],
    featured: false
  },
  {
    id: 'ethics-in-technology',
    title: 'Ethical Considerations in Emerging Technologies',
    excerpt: 'Discussing the ethical challenges posed by advances in AI, biotechnology, and surveillance systems, and how we might address them.',
    date: '2024-03-18',
    readTime: '7 min read',
    tags: ['Ethics', 'Technology', 'Society'],
    featured: false
  },
  {
    id: 'academic-writing-tips',
    title: 'Improving Your Academic Writing: Tips from Years of Research Publishing',
    excerpt: 'Lessons learned from publishing academic papers and how to communicate complex ideas effectively in scholarly writing.',
    date: '2024-03-01',
    readTime: '8 min read',
    tags: ['Academic', 'Writing', 'Research'],
    featured: false
  },
  {
    id: 'deep-learning-frameworks',
    title: 'Comparing Modern Deep Learning Frameworks: Which One to Choose?',
    excerpt: 'An analysis of popular deep learning frameworks, their strengths, weaknesses, and guidance on selecting the right one for your project.',
    date: '2024-02-15',
    readTime: '11 min read',
    tags: ['Deep Learning', 'Frameworks', 'Programming'],
    featured: false
  }
];

export default function BlogPage() {
  // Separate featured and regular posts
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  // Get all unique tags
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))].sort();
  
  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="min-h-screen py-12">
      {/* Blog Header - Inspired by yihui.org */}
      <div className="container-main mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Blog</h1>
          <p className="text-text-secondary text-lg text-center mb-8 max-w-2xl mx-auto">
            Thoughts, analyses, and explorations across various domains including technology, 
            research, design, and academic writing.
          </p>
          
          {/* Search and Tag Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full md:w-64 px-4 py-2 bg-background/50 border border-border rounded-md 
                focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <svg 
                className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button className="px-3 py-1 text-sm bg-accent text-text rounded-full whitespace-nowrap">
                All Topics
              </button>
              {allTags.slice(0, 5).map((tag, i) => (
                <button 
                  key={i}
                  className="px-3 py-1 text-sm bg-background/50 text-text-secondary rounded-full hover:bg-background transition-colors whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
              {allTags.length > 5 && (
                <button className="px-3 py-1 text-sm bg-background/50 text-text-secondary rounded-full hover:bg-background transition-colors whitespace-nowrap">
                  More...
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container-main mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.id}`}
                className="group"
              >
                <article className="card overflow-hidden hover:shadow-accent/20 transition-all h-full flex flex-col">
                  {/* Post Image/Header */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                    {/* Placeholder for image */}
                    <div className="w-full h-full bg-background/30 flex items-center justify-center">
                      <span className="text-4xl">{post.title.charAt(0)}</span>
                    </div>
                    
                    {/* Post metadata overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-accent text-text text-xs rounded-full">
                          Featured
                        </span>
                        <span className="text-text-secondary text-sm">
                          {formatDate(post.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-text-secondary mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags && post.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 bg-background/50 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Read time and link */}
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary text-sm">
                          {post.readTime}
                        </span>
                        <span className="text-accent inline-flex items-center gap-1 text-sm font-medium">
                          Read More
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Regular Posts - yihui.org inspired minimal design */}
      <section className="container-main mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 border-b border-border pb-2">Recent Articles</h2>
          
          <div className="divide-y divide-border">
            {regularPosts.map((post) => (
              <article key={post.id} className="py-6 group">
                <Link href={`/blog/${post.id}`}>
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Post metadata */}
                    <div className="md:w-1/4 text-text-secondary text-sm">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <div className="text-xs mt-1">{post.readTime}</div>
                    </div>
                    
                    {/* Post content */}
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary mb-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 bg-background/50 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Subscription */}
      <section className="container-main mb-12">
        <div className="card p-8 border-accent/30 border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to the Newsletter</h3>
            <p className="text-text-secondary mb-6">
              Get notified when new articles are published. No spam, unsubscribe at any time.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-background/50 border border-border rounded-md 
                focus:outline-none focus:ring-2 focus:ring-accent/50"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-text rounded-md hover:bg-accent/80 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
