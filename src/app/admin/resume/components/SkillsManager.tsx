// src/app/admin/resume/components/SkillsManager.tsx
'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Code, Plus, Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { addSkill, updateSkill, deleteSkill } from '../actions';

type Skill = {
  id: string;
  category: string;
  skills: string[];
  order_num: number;
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors disabled:bg-accent/50"
    >
      {pending ? 'Saving...' : isEditing ? 'Update Skills' : 'Add Skills'}
    </button>
  );
}

export default function SkillsManager({ skills }: { skills: Skill[] }) {
  const [formState, formAction] = useActionState(addSkill, { error: undefined, success: undefined });
  const [editFormState, editFormAction] = useActionState(updateSkill, { error: undefined, success: undefined });
  const [deleteFormState, deleteFormAction] = useActionState(deleteSkill, { error: undefined, success: undefined });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const handleNewClick = () => {
    setIsFormOpen(true);
    setEditingId(null);
  };

  const handleEditClick = (skill: Skill) => {
    setIsFormOpen(true);
    setEditingId(skill.id);
  };

  const handleCancelClick = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const selectedSkill = editingId
    ? skills.find((skill) => skill.id === editingId)
    : undefined;

  return (
    <div>
      {/* List of existing skill categories */}
      {skills.length > 0 ? (
        <div className="space-y-4 mb-6">
          {skills.map((skill) => (
            <div key={skill.id} className="border border-border/50 rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between bg-background-light p-4 cursor-pointer"
                onClick={() => toggleExpanded(skill.id)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{skill.category}</h3>
                  <p className="text-text-secondary text-sm">{skill.skills.length} skills</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleEditClick(skill); }}
                    className="p-1 hover:bg-border/30 rounded-full transition-colors"
                    aria-label="Edit skill category"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <form action={deleteFormAction} onSubmit={(e) => {
                    if (!confirm('Are you sure you want to delete this skill category?')) {
                      e.preventDefault();
                    }
                  }}>
                    <input type="hidden" name="id" value={skill.id} />
                    <button 
                      type="submit"
                      className="p-1 hover:bg-border/30 rounded-full transition-colors text-red-500"
                      aria-label="Delete skill category"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                  {expandedItems.includes(skill.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
              
              {expandedItems.includes(skill.id) && (
                <div className="p-4 bg-background/50">
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((skillItem, index) => (
                      <div 
                        key={index} 
                        className="px-3 py-1 bg-background-light rounded-full text-sm"
                      >
                        {skillItem}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-secondary italic mb-6">No skill categories yet. Add your skills below.</p>
      )}

      {/* Button to add new skill category */}
      {!isFormOpen && (
        <button
          type="button"
          onClick={handleNewClick}
          className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg hover:bg-border/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill Category
        </button>
      )}

      {/* Form for adding or editing skill category */}
      {isFormOpen && (
        <div className="border border-border/50 rounded-lg p-4 bg-background-light">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            {editingId ? 'Edit' : 'Add'} Skill Category
          </h3>
          
          <form action={editingId ? editFormAction : formAction} className="space-y-4">
            {editingId && <input type="hidden" name="id" value={editingId} />}
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">Category Name*</label>
              <input 
                type="text" 
                id="category" 
                name="category" 
                defaultValue={selectedSkill?.category || ''}
                className="w-full bg-background border border-border/50 rounded-lg p-2"
                required 
                placeholder="e.g., Programming Languages, Design Tools, Soft Skills"
              />
            </div>

            <div>
              <label htmlFor="order_num" className="block text-sm font-medium text-text-secondary mb-1">Display Order</label>
              <input 
                type="number" 
                id="order_num" 
                name="order_num" 
                defaultValue={selectedSkill?.order_num || 0}
                className="w-full md:w-1/4 bg-background border border-border/50 rounded-lg p-2"
                min="0"
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-text-secondary mb-1">
                Skills* (comma-separated)
              </label>
              <textarea 
                id="skills" 
                name="skills" 
                defaultValue={selectedSkill?.skills.join(', ') || ''}
                className="w-full bg-background border border-border/50 rounded-lg p-2 min-h-[100px]"
                required
                placeholder="JavaScript, TypeScript, React, Node.js"
              />
              <p className="text-xs text-text-secondary mt-1">Enter skills separated by commas</p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <SubmitButton isEditing={!!editingId} />
              <button
                type="button"
                onClick={handleCancelClick}
                className="px-4 py-2 border border-border/50 rounded-lg hover:bg-border/20 transition-colors"
              >
                Cancel
              </button>
              {(formState.error || editFormState.error) && (
                <p className="text-red-500">{formState.error || editFormState.error}</p>
              )}
              {(formState.success || editFormState.success) && (
                <p className="text-green-500">{formState.success || editFormState.success}</p>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
