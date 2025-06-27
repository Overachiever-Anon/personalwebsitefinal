// src/app/admin/resume/components/ExperienceManager.tsx
'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Briefcase, Plus, Pencil, Trash2, Check, X, ChevronUp, ChevronDown } from 'lucide-react';
import { addExperience, updateExperience, deleteExperience } from '../actions';

type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  highlights: string[];
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
      {pending ? 'Saving...' : isEditing ? 'Update Experience' : 'Add Experience'}
    </button>
  );
}

export default function ExperienceManager({ experience }: { experience: Experience[] }) {
  const [formState, formAction] = useActionState(addExperience, { error: undefined, success: undefined });
  const [editFormState, editFormAction] = useActionState(updateExperience, { error: undefined, success: undefined });
  const [deleteFormState, deleteFormAction] = useActionState(deleteExperience, { error: undefined, success: undefined });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

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

  const handleEditClick = (exp: Experience) => {
    setIsFormOpen(true);
    setEditingId(exp.id);
  };

  const handleCancelClick = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      // Format as YYYY-MM-DD for input field
      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error('Error formatting date:', e);
      return '';
    }
  };

  const displayDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch (e) {
      console.error('Error formatting date for display:', e);
      return dateString;
    }
  };

  const selectedExperience = editingId
    ? experience.find((exp) => exp.id === editingId)
    : undefined;

  return (
    <div>
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      {/* List of existing experiences */}
      {experience.length > 0 ? (
        <div className="space-y-4 mb-6">
          {experience.map((exp) => (
            <div key={exp.id} className="border border-border/50 rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between bg-background-light p-4 cursor-pointer"
                onClick={() => toggleExpanded(exp.id)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{exp.position}</h3>
                  <p className="text-text-secondary">{exp.company} · {exp.location}</p>
                  <p className="text-sm text-text-secondary">
                    {displayDate(exp.start_date)} — {exp.is_current ? 'Present' : displayDate(exp.end_date)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleEditClick(exp); }}
                    className="p-1 hover:bg-border/30 rounded-full transition-colors"
                    aria-label="Edit experience"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <form action={deleteFormAction} onSubmit={(e) => {
                    if (!confirm('Are you sure you want to delete this experience?')) {
                      e.preventDefault();
                    }
                  }}>
                    <input type="hidden" name="id" value={exp.id} />
                    <button 
                      type="submit"
                      className="p-1 hover:bg-border/30 rounded-full transition-colors text-red-500"
                      aria-label="Delete experience"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                  {expandedItems.includes(exp.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
              
              {expandedItems.includes(exp.id) && (
                <div className="p-4 bg-background/50">
                  <p className="mb-3 whitespace-pre-wrap">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Highlights:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-secondary italic mb-6">No experience entries yet. Add your work experience below.</p>
      )}

      {/* Button to add new experience */}
      {!isFormOpen && (
        <button
          type="button"
          onClick={handleNewClick}
          className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg hover:bg-border/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Work Experience
        </button>
      )}

      {/* Form for adding or editing experience */}
      {isFormOpen && (
        <div className="border border-border/50 rounded-lg p-4 bg-background-light">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            {editingId ? 'Edit' : 'Add'} Work Experience
          </h3>
          
          <form action={editingId ? editFormAction : formAction} className="space-y-4">
            {editingId && <input type="hidden" name="id" value={editingId} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-text-secondary mb-1">Company*</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  defaultValue={selectedExperience?.company || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-text-secondary mb-1">Position*</label>
                <input 
                  type="text" 
                  id="position" 
                  name="position" 
                  defaultValue={selectedExperience?.position || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-text-secondary mb-1">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  defaultValue={selectedExperience?.location || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                />
              </div>
              
              <div>
                <label htmlFor="order_num" className="block text-sm font-medium text-text-secondary mb-1">Display Order</label>
                <input 
                  type="number" 
                  id="order_num" 
                  name="order_num" 
                  defaultValue={selectedExperience?.order_num || 0}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-text-secondary mb-1">Start Date*</label>
                <input 
                  type="date" 
                  id="start_date" 
                  name="start_date" 
                  defaultValue={formatDate(selectedExperience?.start_date)}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-text-secondary mb-1">End Date</label>
                <input 
                  type="date" 
                  id="end_date" 
                  name="end_date" 
                  defaultValue={formatDate(selectedExperience?.end_date)}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  disabled={selectedExperience?.is_current}
                />
                <div className="mt-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="is_current" 
                      defaultChecked={selectedExperience?.is_current}
                      className="sr-only peer"
                      onChange={(e) => {
                        const endDateInput = document.getElementById('end_date') as HTMLInputElement;
                        if (endDateInput) {
                          endDateInput.disabled = e.target.checked;
                          if (e.target.checked) {
                            endDateInput.value = '';
                          }
                        }
                      }}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    <span className="ms-3 text-sm font-medium">Current Position</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description*</label>
              <textarea 
                id="description" 
                name="description" 
                defaultValue={selectedExperience?.description || ''}
                className="w-full bg-background border border-border/50 rounded-lg p-2 min-h-[100px]"
                required
              />
            </div>

            <div>
              <label htmlFor="highlights" className="block text-sm font-medium text-text-secondary mb-1">
                Highlights (one per line)
              </label>
              <textarea 
                id="highlights" 
                name="highlights" 
                defaultValue={(selectedExperience?.highlights || []).join('\n')}
                className="w-full bg-background border border-border/50 rounded-lg p-2 min-h-[100px]"
                placeholder="Key accomplishments or responsibilities\nOne item per line"
              />
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
