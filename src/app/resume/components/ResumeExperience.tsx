// src/app/resume/components/ResumeExperience.tsx
import { Briefcase, Calendar } from 'lucide-react';

type Experience = {
  id: string;
  company: string;
  position: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  highlights?: string[];
  order_num: number;
};

interface ResumeExperienceProps {
  experience: Experience[];
}

export default function ResumeExperience({ experience }: ResumeExperienceProps) {
  if (!experience.length) return null;

  // Format dates for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-accent print:text-base print:mb-2 flex items-center gap-2">
        <Briefcase className="h-5 w-5 print:h-4 print:w-4" />
        Professional Experience
      </h2>

      <div className="space-y-6 print:space-y-3">
        {experience.map((job) => (
          <div key={job.id} className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <h3 className="text-lg font-bold print:text-base">{job.position}</h3>
                <div className="flex items-center gap-1 text-accent print:text-sm">
                  <span>{job.company}</span>
                  {job.location && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{job.location}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-text-secondary print:text-xs mt-1 sm:mt-0">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{formatDate(job.start_date)} - {job.is_current ? 'Present' : formatDate(job.end_date)}</span>
              </div>
            </div>

            <div className="mt-2 print:mt-1 print:text-sm">
              <p className="text-text-secondary print:text-black whitespace-pre-line">{job.description}</p>
              
              {job.highlights && job.highlights.length > 0 && (
                <ul className="list-disc list-inside mt-2 print:mt-1 text-text-secondary print:text-black space-y-1 print:text-xs print:space-y-0.5">
                  {job.highlights.map((highlight, index) => (
                    <li key={index} className="pl-1">{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
