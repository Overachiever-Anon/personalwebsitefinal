'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGameplayItem } from '@/lib/actions/gameplay';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewGameplayPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    game_name: '',
    platform: '',
    description: '',
    video_url: '',
    achievement: '',
    difficulty: '',
    play_time: '',
    highlights: ''
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-text">Add New Gameplay Clip</h1>
            </div>
            <p className="text-text-secondary text-lg">Share your gaming highlights, achievements, and memorable moments.</p>
          </div>

          <form onSubmit={handleSubmit} action={createGameplayItem} className="space-y-10">
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
                      Clip Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      required
                      placeholder="e.g., Epic Clutch in Valorant"
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
                    Description / Commentary *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60 resize-none"
                    required
                    placeholder="Describe the gameplay moment, your strategy, or what makes this clip special..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </section>

            {/* Game Details Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Game Details
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="game_name" className="block text-sm font-medium text-text mb-2">
                      Game Name *
                    </label>
                    <input
                      type="text"
                      id="game_name"
                      name="game_name"
                      value={formData.game_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      required
                      placeholder="e.g., Valorant, Cyberpunk 2077, Elden Ring"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="platform" className="block text-sm font-medium text-text mb-2">
                      Platform
                    </label>
                    <select
                      id="platform"
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      <option value="">Select platform...</option>
                      <option value="PC">PC</option>
                      <option value="PlayStation 5">PlayStation 5</option>
                      <option value="PlayStation 4">PlayStation 4</option>
                      <option value="Xbox Series X/S">Xbox Series X/S</option>
                      <option value="Xbox One">Xbox One</option>
                      <option value="Nintendo Switch">Nintendo Switch</option>
                      <option value="Mobile">Mobile</option>
                      <option value="VR">VR</option>
                    </select>
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
                      <option value="Easy">Easy</option>
                      <option value="Normal">Normal</option>
                      <option value="Hard">Hard</option>
                      <option value="Expert">Expert</option>
                      <option value="Nightmare">Nightmare</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="achievement" className="block text-sm font-medium text-text mb-2">
                      Achievement/Milestone
                    </label>
                    <input
                      type="text"
                      id="achievement"
                      name="achievement"
                      value={formData.achievement}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="e.g., First Victory, Boss Defeat, Speedrun PB"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="play_time" className="block text-sm font-medium text-text mb-2">
                      Total Play Time
                    </label>
                    <input
                      type="text"
                      id="play_time"
                      name="play_time"
                      value={formData.play_time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="e.g., 50 hours, 120+ hours, New Game"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="highlights" className="block text-sm font-medium text-text mb-2">
                      Key Highlights
                    </label>
                    <input
                      type="text"
                      id="highlights"
                      name="highlights"
                      value={formData.highlights}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                      placeholder="clutch, headshot, perfect combo, speedrun"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-text-secondary">Separate highlights with commas</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Media & Video Section */}
            <section className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-accent rounded-full"></div>
                Media & Video
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ImageUpload name="thumbnail_url" label="Thumbnail/Screenshot" />
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="video_url" className="block text-sm font-medium text-text mb-2">
                      Video URL *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        type="url"
                        id="video_url"
                        name="video_url"
                        value={formData.video_url}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 placeholder:text-text-secondary/60"
                        required
                        placeholder="https://www.youtube.com/watch?v=..."
                        disabled={isSubmitting}
                      />
                    </div>
                    <p className="text-xs text-text-secondary">YouTube, Twitch, Streamable, or other video platform URL</p>
                  </div>
                  
                  <div className="bg-background/40 border border-border/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-text mb-2">Video Guidelines</h3>
                    <ul className="text-xs text-text-secondary space-y-1">
                      <li>• Use public video URLs that can be embedded</li>
                      <li>• YouTube shorts and regular videos both supported</li>
                      <li>• Ensure video showcases the gameplay moment clearly</li>
                      <li>• Consider adding timestamps for longer videos</li>
                    </ul>
                  </div>
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
                        Add Gameplay Clip
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
