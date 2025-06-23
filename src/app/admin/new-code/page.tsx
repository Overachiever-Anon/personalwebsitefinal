'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCodeItem } from '@/lib/actions/code';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewCodeItemPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    languages: '',
    difficulty: '',
    github_url: '',
    demo_url: '',
    code_content: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // The form will submit naturally, we just need to show loading state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container-main py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-text">Create New Code Snippet</h1>
            </div>
            <p className="text-text-secondary text-lg">Share useful code snippets, algorithms, and programming techniques.</p>
          </div>

          <form onSubmit={handleSubmit} action={createCodeItem} className="space-y-10">
            {/* Basic Information Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Basic Information
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-text mb-2">
                      Code Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      required
                      placeholder="e.g., React Hook for API Fetching"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="slug" className="block text-sm font-medium text-text mb-2">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      required
                      placeholder="auto-generated-from-title"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-text-secondary">Auto-generated from title, or customize as needed</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-text mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60 resize-none"
                    required
                    placeholder="Explain what this code does and how it works..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </section>

            {/* Media & Categorization Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Media & Categories
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ImageUpload name="image_url" label="Code Screenshot" />
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-text mb-2">
                      Code Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      <option value="">Select a category...</option>
                      <option value="Algorithm">Algorithm</option>
                      <option value="Data Structure">Data Structure</option>
                      <option value="Design Pattern">Design Pattern</option>
                      <option value="Utility Function">Utility Function</option>
                      <option value="React Hook">React Hook</option>
                      <option value="API Integration">API Integration</option>
                      <option value="Database Query">Database Query</option>
                      <option value="Testing">Testing</option>
                      <option value="Configuration">Configuration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="languages" className="block text-sm font-medium text-text mb-2">
                      Programming Languages
                    </label>
                    <input
                      type="text"
                      id="languages"
                      name="languages"
                      value={formData.languages}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="JavaScript, TypeScript, Python"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-text-secondary">Separate languages with commas</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="difficulty" className="block text-sm font-medium text-text mb-2">
                      Difficulty Level
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      <option value="">Select difficulty...</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Links & Resources Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Links & Resources
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="github_url" className="block text-sm font-medium text-text mb-2">
                    GitHub Repository
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <input
                      type="url"
                      id="github_url"
                      name="github_url"
                      value={formData.github_url}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="https://github.com/username/repo"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="demo_url" className="block text-sm font-medium text-text mb-2">
                    Live Demo URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <input
                      type="url"
                      id="demo_url"
                      name="demo_url"
                      value={formData.demo_url}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="https://codepen.io/your-demo"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Code Content Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Code Content
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="code_content" className="block text-sm font-medium text-text mb-2">
                    Code (Markdown) *
                  </label>
                  <textarea
                    id="code_content"
                    name="code_content"
                    value={formData.code_content}
                    onChange={handleInputChange}
                    rows={15}
                    className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60 resize-none font-mono text-sm"
                    required
                    placeholder="```javascript
function useApiHook(url) {
  // Your code here
}
```

### Usage
Explain how to use this code snippet..."
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-text-secondary">Use Markdown with code blocks for syntax highlighting</p>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border p-6 -mx-6">
              <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-sm text-text-secondary">
                  * Required fields must be completed before publishing
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-6 py-3 bg-background border border-border rounded-lg hover:bg-background/80 transition-all duration-200 font-medium text-text disabled:opacity-50"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Code Item
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
