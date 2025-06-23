// src/app/admin/new-post/page.tsx
'use client';

import { useState } from 'react';
import { createPost } from './actions';
import MDEditor from '@uiw/react-md-editor';

import ImageUpload from '@/components/admin/ImageUpload';

export default function NewPostPage() {
  const [content, setContent] = useState('**Hello world!!!**');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    tags: '',
    readTime: '',
    category: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-text">Create New Blog Post</h1>
            </div>
            <p className="text-text-secondary text-lg">Share your thoughts, insights, and expertise with your audience.</p>
          </div>

          <form onSubmit={handleSubmit} action={createPost} className="space-y-10">
            {/* Basic Information Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-text mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                    required
                    placeholder="Enter an engaging title..."
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-text mb-2">
                    Excerpt *
                  </label>
                  <input
                    type="text"
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                    required
                    placeholder="Brief description for the post card..."
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
                  <ImageUpload name="image_url" label="Featured Image" />
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-text mb-2">
                      Category
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
                      <option value="Technology">Technology</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Design">Design</option>
                      <option value="Research">Research</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="tags" className="block text-sm font-medium text-text mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="AI, Technology, Tutorial"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-text-secondary">Separate tags with commas for better discoverability</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Post Settings Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Post Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-background/40 rounded-lg border border-border/30">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    className="w-5 h-5 text-accent bg-background border-border rounded focus:ring-accent focus:ring-2"
                    disabled={isSubmitting}
                  />
                  <div>
                    <label htmlFor="featured" className="font-medium text-text cursor-pointer">
                      Featured Post
                    </label>
                    <p className="text-xs text-text-secondary">Highlight this post on your homepage</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="readTime" className="block text-sm font-medium text-text mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    id="readTime"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                    placeholder="5 min read"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="flex items-center justify-center p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <div className="text-center">
                    <div className="text-sm font-medium text-accent">Auto-Publishing</div>
                    <div className="text-xs text-text-secondary">Post will be live immediately</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Content Editor Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Content Editor
              </h2>
              
              <div data-color-mode="dark">
                <label className="block text-sm font-medium text-text mb-4">
                  Post Content *
                </label>
                <div className="border border-border rounded-lg overflow-hidden">
                  <MDEditor
                    value={content}
                    onChange={(val) => setContent(val || '')}
                    height={500}
                    preview="live"
                    visibleDragbar={false}
                  />
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Use Markdown formatting for rich content. Preview is available on the right.
                </p>
                {/* Hidden textarea to pass the content to the form */}
                <textarea name="content" value={content} readOnly required className="sr-only" />
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
                    onClick={() => window.history.back()}
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
                        Publishing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Publish Post
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
