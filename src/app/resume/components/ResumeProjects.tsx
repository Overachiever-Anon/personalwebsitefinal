// src/app/resume/components/ResumeProjects.tsx
import Image from 'next/image';
import { ExternalLink, Github, Calendar } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  github_url?: string;
  image_url?: string;
  start_date?: string;
  end_date?: string;
  order: number;
};

interface ResumeProjectsProps {
  projects: Project[];
}

export default function ResumeProjects({ projects }: ResumeProjectsProps) {
  // Format dates for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-accent print:text-base">
        Notable Projects
      </h2>
      
      <div className="space-y-6 print:space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="pb-2">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Project Image (if available) */}
              {project.image_url && (
                <div className="md:w-1/4 hidden md:block print:hidden">
                  <div className="relative w-full h-32 rounded-lg overflow-hidden">
                    <Image 
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Project Details */}
              <div className={project.image_url ? "md:w-3/4" : "w-full"}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <h3 className="text-lg font-semibold print:text-sm">
                    {project.title}
                  </h3>
                  
                  {/* Project dates if available */}
                  {(project.start_date || project.end_date) && (
                    <div className="flex items-center text-sm text-gray-500 mt-1 md:mt-0 print:text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>
                        {formatDate(project.start_date)} 
                        {project.end_date && ` - ${formatDate(project.end_date)}`}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Project description */}
                <p className="text-gray-700 mt-1 print:text-xs">
                  {project.description}
                </p>
                
                {/* Technologies used */}
                {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 print:gap-1">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs print:text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Links */}
                <div className="mt-2 flex gap-4 print:gap-2">
                  {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-accent hover:text-accent/80 text-sm print:text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Project
                    </a>
                  )}
                  
                  {project.github_url && (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-accent hover:text-accent/80 text-sm print:text-xs"
                    >
                      <Github className="w-3 h-3 mr-1" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
