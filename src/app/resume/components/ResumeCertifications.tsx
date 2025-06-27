// src/app/resume/components/ResumeCertifications.tsx
import { Award, Calendar, ExternalLink } from 'lucide-react';

type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  expires?: string;
  description?: string;
  order_num: number;
};

interface ResumeCertificationsProps {
  certifications: Certification[];
}

export default function ResumeCertifications({ certifications }: ResumeCertificationsProps) {
  if (!certifications.length) return null;

  // Format dates for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-accent print:text-base print:mb-2 flex items-center gap-2">
        <Award className="h-5 w-5 print:h-4 print:w-4" />
        Certifications & Licenses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
        {certifications.map((cert) => (
          <div key={cert.id} className="border border-border/30 rounded-lg p-4 print:border-gray-200 print:p-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold print:text-sm">{cert.name}</h3>
                <p className="text-accent text-sm print:text-xs">{cert.issuer}</p>
              </div>
              
              {cert.url && (
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent hover:text-accent/80 print:hidden"
                  aria-label={`View certificate for ${cert.name}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-sm text-text-secondary mt-1 print:text-xs">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span>
                Issued: {formatDate(cert.date)}
                {cert.expires && ` • Expires: ${formatDate(cert.expires)}`}
              </span>
            </div>
            
            {cert.description && (
              <p className="mt-2 text-sm text-text-secondary print:text-xs print:mt-1">{cert.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
