// src/app/admin/resume/components/PersonalInfoForm.tsx
'use client';

import { useState, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updatePersonalInfo } from '../actions';

type PersonalInfo = {
  id?: string;
  full_name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  profile_image_url?: string;
};


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200 font-medium disabled:bg-accent/50 disabled:cursor-not-allowed"
    >
      {pending ? 'Saving...' : 'Save Changes'}
    </button>
  );
}

export default function PersonalInfoForm({ personalInfo }: { personalInfo: PersonalInfo }) {
  const [state, formAction] = useActionState(updatePersonalInfo, {
    error: undefined,
    success: undefined,
  });
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    if (state?.success) {
      setMessage({ type: 'success', text: state.success });
    }
    if (state?.error) {
      setMessage({ type: 'error', text: state.error });
    }
    if (state?.success || state?.error) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      {personalInfo?.id && (
        <input type="hidden" name="id" value={personalInfo.id} />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-text-secondary mb-1">Full Name*</label>
          <input 
            type="text" 
            id="full_name" 
            name="full_name" 
            defaultValue={personalInfo?.full_name || ''} 
            className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent"
            required 
          />
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">Professional Title*</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            defaultValue={personalInfo?.title || ''} 
            className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email*</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            defaultValue={personalInfo?.email || ''} 
            className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            defaultValue={personalInfo?.phone || ''} 
            className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-text-secondary mb-1">Location*</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            defaultValue={personalInfo?.location || ''} 
            className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-text-secondary mb-1">Website URL</label>
          <input 
            type="url" 
            id="website" 
            name="website" 
            defaultValue={personalInfo?.website || ''} 
            className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-text-secondary mb-1">LinkedIn URL or Username</label>
          <input 
            type="text" 
            id="linkedin" 
            name="linkedin" 
            defaultValue={personalInfo?.linkedin || ''} 
            className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent"
          />
        </div>
        
        <div>
          <label htmlFor="github" className="block text-sm font-medium text-text-secondary mb-1">GitHub URL or Username</label>
          <input 
            type="text" 
            id="github" 
            name="github" 
            defaultValue={personalInfo?.github || ''} 
            className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="profile_image_url" className="block text-sm font-medium text-text-secondary mb-1">Profile Image URL</label>
        <input 
          type="url" 
          id="profile_image_url" 
          name="profile_image_url" 
          defaultValue={personalInfo?.profile_image_url || ''} 
          className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-text-secondary mb-1">Professional Summary*</label>
        <textarea 
          id="summary" 
          name="summary" 
          defaultValue={personalInfo?.summary || ''} 
          className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent min-h-[120px]"
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <SubmitButton />
        {message && (
          <div className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.text}
          </div>
        )}
      </div>
    </form>
  );
}
