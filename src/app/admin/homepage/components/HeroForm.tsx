// src/app/admin/homepage/components/HeroForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { updateHero, type FormState } from '../actions';

const initialState: FormState = {
  error: undefined,
  success: undefined,
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

type HeroData = {
  title?: string;
  subtitle?: string;
  profile_image_url?: string;
  cta_text?: string;
  cta_link?: string;
};

export default function HeroForm({ heroData }: { heroData: HeroData }) {
  const [state, formAction] = useFormState(updateHero, initialState);
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
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">Title</label>
        <input type="text" id="title" name="title" defaultValue={heroData.title || ''} className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent" />
      </div>
      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium text-text-secondary mb-1">Subtitle</label>
        <input type="text" id="subtitle" name="subtitle" defaultValue={heroData.subtitle || ''} className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent" />
      </div>
      <div>
        <label htmlFor="profile_image_url" className="block text-sm font-medium text-text-secondary mb-1">Profile Image URL</label>
        <input type="text" id="profile_image_url" name="profile_image_url" defaultValue={heroData.profile_image_url || ''} className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent" />
      </div>
      <div>
        <label htmlFor="cta_text" className="block text-sm font-medium text-text-secondary mb-1">CTA Button Text</label>
        <input type="text" id="cta_text" name="cta_text" defaultValue={heroData.cta_text || ''} className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent" />
      </div>
      <div>
        <label htmlFor="cta_link" className="block text-sm font-medium text-text-secondary mb-1">CTA Button Link</label>
        <input type="text" id="cta_link" name="cta_link" defaultValue={heroData.cta_link || ''} className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent" />
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
