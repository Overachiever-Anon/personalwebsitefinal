// src/app/resume/components/ResumeHeader.tsx
'use client';

import Image from 'next/image';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

type PersonalInfo = {
  id?: string;
  full_name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  profile_image_url?: string;
};

interface ResumeHeaderProps {
  personalInfo: PersonalInfo;
}

export default function ResumeHeader({ personalInfo }: ResumeHeaderProps) {
  const {
    full_name,
    title,
    email,
    phone,
    location,
    website,
    linkedin,
    github,
    summary,
    profile_image_url,
  } = personalInfo;

  if (!full_name) return <div className="text-center py-4">No personal information available</div>;

  return (
    <div className="print:text-black">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Image */}
        {profile_image_url && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent/20 flex-shrink-0">
            <Image
              src={profile_image_url}
              alt={full_name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        )}
        
        {/* Personal Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-center md:text-left print:text-2xl">{full_name || 'Your Name'}</h1>
          <p className="text-xl text-accent text-center md:text-left mb-4 print:text-base print:mb-2">{title || 'Your Title'}</p>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm print:text-xs">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-accent flex-shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-accent">{email}</a>
            </div>
            
            {phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-accent">{phone}</a>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-accent flex-shrink-0" />
              <span>{location}</span>
            </div>
            
            {website && (
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-accent flex-shrink-0" />
                <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent truncate">{website.replace(/^https?:\/\//, '')}</a>
              </div>
            )}
            
            {linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={16} className="text-accent flex-shrink-0" />
                <a href={linkedin.startsWith('http') ? linkedin : `https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
              </div>
            )}
            
            {github && (
              <div className="flex items-center gap-2">
                <Github size={16} className="text-accent flex-shrink-0" />
                <a href={github.startsWith('http') ? github : `https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Professional Summary */}
      <div className="mt-6 print:mt-3">
        <h2 className="text-xl font-bold mb-2 text-accent print:text-base print:mb-1">Professional Summary</h2>
        <p className="text-text-secondary print:text-black print:text-sm">{summary}</p>
      </div>
    </div>
  );
}
