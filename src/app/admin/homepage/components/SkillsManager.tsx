// src/app/admin/homepage/components/SkillsManager.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addSkill, deleteSkill, type FormState } from '../actions';
import { Trash2 } from 'lucide-react';

const initialState: FormState = {
  error: undefined,
  success: undefined,
};

function AddSkillSubmit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200 font-medium disabled:bg-accent/50 disabled:cursor-not-allowed">
      {pending ? 'Adding...' : 'Add Skill'}
    </button>
  );
}

function DeleteSkillSubmit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending} className="text-red-500 hover:text-red-400 disabled:text-red-500/50">
      <Trash2 className="w-5 h-5" />
    </button>
  );
}

function DeleteSkillForm({ skillId }: { skillId: string }) {
  const [_state, formAction] = useFormState(deleteSkill, initialState);
  // You can display the state (error/success) here if needed
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={skillId} />
      <DeleteSkillSubmit />
    </form>
  );
}

type Skill = {
  id: string;
  name: string;
  icon_svg?: string;
};

export default function SkillsManager({ skills }: { skills: Skill[] }) {
  const [addState, addFormAction] = useFormState(addSkill, initialState);
  const addFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (addState.success) {
      addFormRef.current?.reset();
    }
  }, [addState]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Add New Skill</h3>
        <form ref={addFormRef} action={addFormAction} className="flex items-start gap-4">
          <div className="flex-grow">
            <label htmlFor="name" className="sr-only">Skill Name</label>
            <input type="text" id="name" name="name" placeholder="Skill Name (e.g., TypeScript)" required className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent" />
          </div>
          <div className="flex-grow">
            <label htmlFor="icon_svg" className="sr-only">Icon SVG</label>
            <textarea id="icon_svg" name="icon_svg" placeholder="<svg>...</svg>" rows={1} className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent resize-y"></textarea>
          </div>
          <AddSkillSubmit />
        </form>
        {addState?.error && <p className="text-sm text-red-500 mt-2">{addState.error}</p>}
        {addState?.success && <p className="text-sm text-green-500 mt-2">{addState.success}</p>}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Current Skills</h3>
        <ul className="space-y-2">
          {skills.map((skill) => (
            <li key={skill.id} className="flex items-center justify-between bg-background/50 border border-border/20 p-3 rounded-lg">
              <div className="flex items-center gap-4">
                {skill.icon_svg && <div dangerouslySetInnerHTML={{ __html: skill.icon_svg }} className="w-6 h-6 text-accent" />} 
                <span className="font-medium">{skill.name}</span>
              </div>
              <DeleteSkillForm skillId={skill.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
