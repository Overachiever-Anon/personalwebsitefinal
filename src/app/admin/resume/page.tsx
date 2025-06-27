// src/app/admin/resume/page.tsx
export const dynamic = 'force-dynamic';

import { createServerClient } from '@/utils/supabase';
import { FileText, Briefcase, GraduationCap, Code, FolderKanban, Award } from 'lucide-react';
import PersonalInfoForm from './components/PersonalInfoForm';
import ExperienceManager from './components/ExperienceManager';
import EducationManager from './components/EducationManager';
import SkillsManager from './components/SkillsManager';
import ProjectsManager from './components/ProjectsManager';
import CertificationsManager from './components/CertificationsManager';

async function getResumeData() {
  const supabase = await createServerClient();
  
  // Fetch personal information
  const { data: personalInfo } = await supabase
    .from('resume_personal_info')
    .select('*')
    .single();
  
  // Fetch all resume data
  const { data: experience } = await supabase
    .from('resume_experience')
    .select('*')
    .order('order_num');
  
  const { data: education } = await supabase
    .from('resume_education')
    .select('*')
    .order('order_num');
  
  const { data: skills } = await supabase
    .from('resume_skills')
    .select('*')
    .order('order_num');
  
  const { data: projects } = await supabase
    .from('resume_projects')
    .select('*')
    .order('order_num');
  
  const { data: certifications } = await supabase
    .from('resume_certifications')
    .select('*')
    .order('order_num');
  
  return {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
  };
}

export default async function ResumeAdminPage() {
  const { personalInfo, experience, education, skills, projects, certifications } = await getResumeData();

  return (
    <div className="container-main py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <FileText className="w-8 h-8 text-accent" />
          <h1 className="text-4xl font-bold text-text">Manage Resume</h1>
        </div>

        {/* View Public Resume Link */}
        <div className="mb-8 flex justify-end">
          <a 
            href="/resume" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-background-light hover:bg-border/10 text-text border border-border/50 rounded-lg transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>View Public Resume</span>
          </a>
        </div>

        {/* Personal Information Section */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold">Personal Information</h2>
          </div>
          <PersonalInfoForm personalInfo={personalInfo} />
        </div>

        {/* Experience Section Management */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold">Experience</h2>
          </div>
          <ExperienceManager experience={experience || []} />
        </div>

        {/* Education Section Management */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold">Education</h2>
          </div>
          <EducationManager education={education || []} />
        </div>

        {/* Skills Section Management */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold">Skills</h2>
          </div>
          <SkillsManager skills={skills || []} />
        </div>

        {/* Projects Section Management */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FolderKanban className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold">Projects</h2>
          </div>
          <ProjectsManager projects={projects || []} />
        </div>

        {/* Certifications Section Management */}
        <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-semibold">Certifications</h2>
          </div>
          <CertificationsManager certifications={certifications || []} />
        </div>
      </div>
    </div>
  );
}
