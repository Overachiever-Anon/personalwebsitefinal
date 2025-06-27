// src/app/resume/components/ResumeEducation.tsx
import { GraduationCap, Calendar } from 'lucide-react';

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  location?: string;
  gpa?: string;
  honors?: string;
  description?: string;
  order_num: number;
};

interface ResumeEducationProps {
  education: Education[];
}

export default function ResumeEducation({ education }: ResumeEducationProps) {
  if (!education.length) return null;

  // Format dates for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-accent print:text-base print:mb-2 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 print:h-4 print:w-4" />
        Education
      </h2>

      <div className="space-y-6 print:space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <h3 className="text-lg font-bold print:text-base">{edu.institution}</h3>
                <p className="text-accent print:text-sm">{edu.degree} in {edu.field}</p>
                {edu.location && <p className="text-sm text-text-secondary print:text-xs">{edu.location}</p>}
              </div>
              <div className="flex items-center gap-1 text-sm text-text-secondary print:text-xs mt-1 sm:mt-0">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}</span>
              </div>
            </div>

            <div className="mt-2 print:mt-1 space-y-2 print:space-y-1">
              {(edu.gpa || edu.honors) && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm print:text-xs">
                  {edu.gpa && <span className="text-text-secondary print:text-black">GPA: {edu.gpa}</span>}
                  {edu.honors && <span className="text-text-secondary print:text-black">Honors: {edu.honors}</span>}
                </div>
              )}
              
              {edu.description && (
                <p className="text-text-secondary print:text-black print:text-sm whitespace-pre-line">{edu.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
