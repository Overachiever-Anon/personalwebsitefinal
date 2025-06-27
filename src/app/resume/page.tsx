// src/app/resume/page.tsx
export const dynamic = 'force-dynamic';

import { createServerClient } from '@/utils/supabase';

import ResumeHeader from './components/ResumeHeader';
import ResumeExperience from './components/ResumeExperience';
import ResumeEducation from './components/ResumeEducation';
import ResumeSkills from './components/ResumeSkills';
import ResumeProjects from './components/ResumeProjects';
import ResumeCertifications from './components/ResumeCertifications';
import DownloadPDFButton from './components/DownloadPDFButton';

async function getResumeData() {
  const supabase = await createServerClient();
  
  // Helper to fetch data and handle errors gracefully
  const fetchData = async (table: string, orderBy?: string) => {
    try {
      let query = supabase.from(table).select('*');
      
      if (orderBy) {
        query = query.order(orderBy, { ascending: true });
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Error fetching ${table}:`, error);
      return [];
    }
  };

  const [personalInfo, experience, education, skills, projects, certifications] = await Promise.all([
    fetchData('resume_personal_info'),
    fetchData('resume_experience', 'order_num'),
    fetchData('resume_education', 'order_num'),
    fetchData('resume_skills', 'order_num'),
    fetchData('resume_projects', 'order_num'),
    fetchData('resume_certifications', 'order_num'),
  ]);

  return {
    personalInfo: personalInfo[0] || {},
    experience,
    education,
    skills,
    projects,
    certifications,
  };
}

export default async function ResumePage() {
  const { personalInfo, experience, education, skills, projects, certifications } = await getResumeData();

  return (
    <div className="container-main py-12">
      <div className="max-w-4xl mx-auto">
        {/* Download PDF Button - positioned at top right */}
        <div className="flex justify-end mb-6 print:hidden">
          <DownloadPDFButton />
        </div>
        
        {/* Resume Content */}
        <div id="resume-content" className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-lg print:shadow-none print:border-none print:p-0 print:bg-white">
          <ResumeHeader personalInfo={personalInfo} />
          
          <div className="mt-8 print:mt-4">
            <ResumeExperience experience={experience} />
          </div>
          
          <div className="mt-8 print:mt-4">
            <ResumeEducation education={education} />
          </div>
          
          <div className="mt-8 print:mt-4">
            <ResumeSkills skills={skills} />
          </div>
          
          <div className="mt-8 print:mt-4">
            <ResumeProjects projects={projects} />
          </div>
          
          <div className="mt-8 print:mt-4">
            <ResumeCertifications certifications={certifications} />
          </div>
        </div>
        
        {/* Download PDF Button - positioned at bottom as well for convenience */}
        <div className="flex justify-end mt-6 print:hidden">
          <DownloadPDFButton />
        </div>
      </div>
    </div>
  );
}
