// src/app/admin/homepage/page.tsx
export const dynamic = 'force-dynamic';

import { createServerClient } from '@/utils/supabase';
import { redirect } from 'next/navigation';
import { Home, Pencil, Book, Clock } from 'lucide-react';
import HeroForm from './components/HeroForm';
import SkillsManager from './components/SkillsManager';
import TimelineManager from './components/TimelineManager';

async function getHomepageData() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const safeQuery = async (table: string) => {
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Error fetching ${table}:`, error);
      return [];
    }
  };

  const [heroData, skillsData, timelineData] = await Promise.all([
    safeQuery('homepage_hero'),
    safeQuery('homepage_skills'),
    safeQuery('homepage_timeline'),
  ]);

  return {
    hero: heroData[0] || {},
    skills: skillsData || [],
    timeline: timelineData || [],
  };
}

export default async function HomepageAdminPage() {
  const { hero, skills, timeline } = await getHomepageData();

  return (
    <div className="container-main py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Home className="w-8 h-8 text-accent" />
          <h1 className="text-4xl font-bold text-text">Manage Homepage</h1>
        </div>

        {/* Hero Section Management */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Pencil className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold">Hero Section</h2>
          </div>
          <HeroForm heroData={hero} />
        </div>

        {/* Skills Section Management */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold">Skills Section</h2>
          </div>
          <SkillsManager skills={skills} />
        </div>

        {/* Timeline Section Management */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold">Timeline Section</h2>
          </div>
          <TimelineManager timeline={timeline} />
        </div>
      </div>
    </div>
  );
}
