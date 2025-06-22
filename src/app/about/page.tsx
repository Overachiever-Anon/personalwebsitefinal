import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <div className="container-main mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About Me</h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Placeholder for profile image */}
            <div className="w-48 h-48 rounded-full border-4 border-accent/30 overflow-hidden flex items-center justify-center bg-background/30">
              <span className="text-6xl">👤</span>
            </div>
            
            <div className="md:flex-1">
              <p className="text-lg mb-4">
                Hello! I'm <span className="text-accent font-medium">Andreas Kurz</span>, a researcher, 
                developer, and gaming enthusiast with a passion for exploring the intersection of 
                technology, design, and human experience.
              </p>
              <p className="text-text-secondary mb-6">
                Currently based in <span className="font-medium">Berlin, Germany</span>, 
                I work on problems spanning quantum computing, machine learning, 
                data visualization, and human-computer interaction.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-background/50 hover:bg-background rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a 
                  href="https://twitter.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-background/50 hover:bg-background rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>
                <a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-background/50 hover:bg-background rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="/files/CV.pdf" 
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent/80 hover:bg-accent text-text rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section - Inspired by yihui.org */}
      <section className="container-main mb-16">
        <div className="max-w-4xl mx-auto prose dark:prose-invert prose-headings:text-text prose-p:text-text-secondary prose-a:text-accent">
          <h2>Biography</h2>
          
          <p>
            I'm currently a Research Scientist at <a href="#" className="font-medium">Tech Research Institute</a>, 
            where I lead projects exploring quantum computing algorithms and their applications in optimization problems.
            Previously, I worked as a Senior Software Engineer at <a href="#" className="font-medium">Future Labs</a> developing 
            advanced data visualization tools for scientific applications.
          </p>

          <p>
            I received my Ph.D in Computer Science from <a href="#" className="font-medium">University of Technology</a> in 2020, 
            where my research focused on interpretable machine learning models and their applications in 
            healthcare and scientific discovery. Prior to that, I completed my M.Sc. in Computational Physics 
            from <a href="#" className="font-medium">State University</a>.
          </p>
          
          <p>
            When I'm not working on research or coding projects, you might find me experimenting with 
            game development, exploring virtual worlds, or writing about technology and its implications 
            for society. I'm also passionate about open-source software and regularly contribute to 
            projects that align with my interests.
          </p>
          
          <h2>Research Interests</h2>
          
          <ul>
            <li>Quantum Computing & Quantum Information</li>
            <li>Machine Learning Interpretability</li>
            <li>Scientific Data Visualization</li>
            <li>Human-Computer Interaction</li>
            <li>Computational Linguistics</li>
          </ul>
          
          <h2>Technical Skills</h2>
          
          <div className="not-prose mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { category: "Languages", items: ["Python", "TypeScript", "C++", "Julia"] },
                { category: "ML/AI", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face"] },
                { category: "Data Viz", items: ["D3.js", "Plotly", "Three.js", "WebGL"] },
                { category: "Web", items: ["React", "Next.js", "Tailwind CSS", "GraphQL"] },
                { category: "Scientific", items: ["NumPy", "Qiskit", "PennyLane", "SciPy"] },
                { category: "Other", items: ["Git", "Docker", "CUDA", "LaTeX"] },
              ].map((skillGroup, i) => (
                <div key={i} className="p-4 bg-background/30 rounded-lg">
                  <h3 className="font-bold mb-2 text-sm">{skillGroup.category}</h3>
                  <ul className="space-y-1">
                    {skillGroup.items.map((skill, j) => (
                      <li key={j} className="text-text-secondary text-sm">{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <h2>Teaching</h2>
          
          <p>
            I occasionally teach courses and workshops on topics related to my research interests.
            Recent courses include:
          </p>
          
          <ul>
            <li>Introduction to Quantum Computing (Fall 2023)</li>
            <li>Advanced Data Visualization Techniques (Spring 2023)</li>
            <li>Machine Learning for Scientific Applications (Fall 2022)</li>
          </ul>

          <h2>Publications</h2>
          
          <p>
            For a complete list of my publications, please visit the <Link href="/research" className="font-medium">Research</Link> section.
            Here are a few selected publications:
          </p>
          
          <ul>
            <li>
              <strong>Kurz, A.</strong>, Smith, J., & Zhang, L. (2024). "Advances in Quantum Computing Algorithms for Optimization Problems." 
              <em>Journal of Quantum Information Processing</em>.
            </li>
            <li>
              <strong>Kurz, A.</strong>, Johnson, M., & Chen, R. (2023). "Improving Neural Network Interpretability Through Integrated Gradients." 
              <em>Neural Information Processing Systems</em>.
            </li>
            <li>
              <strong>Kurz, A.</strong> & Williams, T. (2023). "Novel Data Visualization Techniques for High-Dimensional Scientific Datasets." 
              <em>IEEE Visualization Conference</em>.
            </li>
          </ul>
          
          <h2>Personal Interests</h2>
          
          <p>
            Beyond my academic and professional work, I enjoy:
          </p>
          
          <ul>
            <li>Competitive gaming (primarily strategy and FPS games)</li>
            <li>Playing piano and composing electronic music</li>
            <li>Science fiction literature and film</li>
            <li>Japanese language and culture</li>
            <li>Long-distance running</li>
          </ul>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="container-main mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Get In Touch</h2>
          
          <div className="card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <ul className="space-y-3 text-text-secondary">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>email@example.com</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Berlin, Germany</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Office Hours: Mon-Fri 10:00-16:00 CET</span>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Affiliations:</h4>
                  <ul className="list-disc list-inside text-text-secondary">
                    <li>Tech Research Institute</li>
                    <li>International Association for Quantum Computing</li>
                    <li>Data Visualization Society</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      className="w-full px-3 py-2 bg-background/50 border border-border rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-accent/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full px-3 py-2 bg-background/50 border border-border rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-accent/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 bg-background/50 border border-border rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-2 bg-accent text-text rounded-md hover:bg-accent/80 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
