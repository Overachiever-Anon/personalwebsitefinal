'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createResearchNote } from '@/lib/actions/research';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewResearchPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    authors: '',
    category: '',
    publication_source: '',
    publication_date: '',
    abstract: '',
    keywords: '',
    research_field: '',
    methodology: '',
    external_url: '',
    pdf_url: ''
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

  const handleSubmit = async () => {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-text">Create New Research Note</h1>
            </div>
            <p className="text-text-secondary text-lg">Document and share research findings, papers, and academic insights.</p>
          </div>

          <form onSubmit={handleSubmit} action={createResearchNote} className="space-y-10">
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
                      Research Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      required
                      placeholder="e.g., The Impact of AI on Quantum Computing"
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
                  <label htmlFor="abstract" className="block text-sm font-medium text-text mb-2">
                    Abstract *
                  </label>
                  <textarea
                    id="abstract"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60 resize-none"
                    required
                    placeholder="Provide a concise summary of the research findings and methodology..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </section>

            {/* Research Details Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Research Details
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="authors" className="block text-sm font-medium text-text mb-2">
                      Authors
                    </label>
                    <input
                      type="text"
                      id="authors"
                      name="authors"
                      value={formData.authors}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="Jane Doe, John Smith, Dr. Alice Johnson"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-text-secondary">Separate multiple authors with commas</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="research_field" className="block text-sm font-medium text-text mb-2">
                      Research Field
                    </label>
                    <select
                      id="research_field"
                      name="research_field"
                      value={formData.research_field}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      <option value="">Select research field...</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Quantum Computing">Quantum Computing</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Biocomputing">Biocomputing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="methodology" className="block text-sm font-medium text-text mb-2">
                      Methodology
                    </label>
                    <select
                      id="methodology"
                      name="methodology"
                      value={formData.methodology}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      <option value="">Select methodology...</option>
                      <option value="Experimental">Experimental</option>
                      <option value="Theoretical">Theoretical</option>
                      <option value="Empirical">Empirical</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Survey">Survey</option>
                      <option value="Literature Review">Literature Review</option>
                      <option value="Meta-Analysis">Meta-Analysis</option>
                      <option value="Mixed Methods">Mixed Methods</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-text mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="AI Research, Quantum Physics, Data Analysis"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="publication_source" className="block text-sm font-medium text-text mb-2">
                      Publication Source
                    </label>
                    <input
                      type="text"
                      id="publication_source"
                      name="publication_source"
                      value={formData.publication_source}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="Journal of AI Research, arXiv, IEEE"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="publication_date" className="block text-sm font-medium text-text mb-2">
                      Publication Date
                    </label>
                    <input
                      type="date"
                      id="publication_date"
                      name="publication_date"
                      value={formData.publication_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <label htmlFor="keywords" className="block text-sm font-medium text-text mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                  placeholder="machine learning, neural networks, deep learning, optimization"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-text-secondary">Separate keywords with commas for better searchability</p>
              </div>
            </section>

            {/* Media & Resources Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Media & Resources
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ImageUpload name="image_url" label="Research Figure/Diagram" />
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="external_url" className="block text-sm font-medium text-text mb-2">
                      External Paper URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <input
                        type="url"
                        id="external_url"
                        name="external_url"
                        value={formData.external_url}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                        placeholder="https://arxiv.org/abs/2301.00000"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="pdf_url" className="block text-sm font-medium text-text mb-2">
                      PDF URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <input
                        type="url"
                        id="pdf_url"
                        name="pdf_url"
                        value={formData.pdf_url}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                        placeholder="https://example.com/paper.pdf"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Full Content Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Research Content
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="full_content" className="block text-sm font-medium text-text mb-2">
                    Full Research Notes (Markdown) *
                  </label>
                  <textarea
                    id="full_content"
                    name="full_content"
                    rows={15}
                    className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60 resize-none font-mono text-sm"
                    required
                    placeholder="## Introduction
Describe the research background and motivation...

## Methodology
Explain the research methods used...

## Results
Present key findings and data...

## Conclusion
Summarize the implications and future work..."
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-text-secondary">Use Markdown for formatting. Include sections like Introduction, Methodology, Results, and Conclusion</p>
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
                        Create Research Note
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
