// src/app/admin/resume/components/EducationManager.tsx
'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { GraduationCap, Plus, Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { addEducation, updateEducation, deleteEducation } from '../actions';

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  start_date: string;
  end_date?: string;
  gpa?: string;
  honors?: string;
  description?: string;
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
      {pending ? 'Saving...' : isEditing ? 'Update Education' : 'Add Education'}
    </button>
  );
}

export default function EducationManager({ education }: { education: Education[] }) {
  const [formState, formAction] = useActionState(addEducation, { error: undefined, success: undefined });
  const [editFormState, editFormAction] = useActionState(updateEducation, { error: undefined, success: undefined });
  const [deleteFormState, deleteFormAction] = useActionState(deleteEducation, { error: undefined, success: undefined });
  
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

  const handleEditClick = (edu: Education) => {
    setIsFormOpen(true);
    setEditingId(edu.id);
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

  const selectedEducation = editingId
    ? education.find((edu) => edu.id === editingId)
    : undefined;

  return (
    <div>
      {/* List of existing education */}
      {education.length > 0 ? (
        <div className="space-y-4 mb-6">
          {education.map((edu) => (
            <div key={edu.id} className="border border-border/50 rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between bg-background-light p-4 cursor-pointer"
                onClick={() => toggleExpanded(edu.id)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-text-secondary">{edu.institution} {edu.location && `· ${edu.location}`}</p>
                  <p className="text-sm text-text-secondary">
                    {displayDate(edu.start_date)} — {displayDate(edu.end_date)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleEditClick(edu); }}
                    className="p-1 hover:bg-border/30 rounded-full transition-colors"
                    aria-label="Edit education"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <form action={deleteFormAction} onSubmit={(e) => {
                    if (!confirm('Are you sure you want to delete this education record?')) {
                      e.preventDefault();
                    }
                  }}>
                    <input type="hidden" name="id" value={edu.id} />
                    <button 
                      type="submit"
                      className="p-1 hover:bg-border/30 rounded-full transition-colors text-red-500"
                      aria-label="Delete education"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                  {expandedItems.includes(edu.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
              
              {expandedItems.includes(edu.id) && (
                <div className="p-4 bg-background/50">
                  {(edu.gpa || edu.honors) && (
                    <div className="mb-3">
                      {edu.gpa && <p className="text-sm"><strong>GPA:</strong> {edu.gpa}</p>}
                      {edu.honors && <p className="text-sm"><strong>Honors:</strong> {edu.honors}</p>}
                    </div>
                  )}
                  {edu.description && (
                    <p className="whitespace-pre-wrap">{edu.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-secondary italic mb-6">No education entries yet. Add your education below.</p>
      )}

      {/* Button to add new education */}
      {!isFormOpen && (
        <button
          type="button"
          onClick={handleNewClick}
          className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg hover:bg-border/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      )}

      {/* Form for adding or editing education */}
      {isFormOpen && (
        <div className="border border-border/50 rounded-lg p-4 bg-background-light">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            {editingId ? 'Edit' : 'Add'} Education
          </h3>
          
          <form action={editingId ? editFormAction : formAction} className="space-y-4">
            {editingId && <input type="hidden" name="id" value={editingId} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-text-secondary mb-1">Institution*</label>
                <input 
                  type="text" 
                  id="institution" 
                  name="institution" 
                  defaultValue={selectedEducation?.institution || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-text-secondary mb-1">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  defaultValue={selectedEducation?.location || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-text-secondary mb-1">Degree*</label>
                <input 
                  type="text" 
                  id="degree" 
                  name="degree" 
                  defaultValue={selectedEducation?.degree || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-text-secondary mb-1">Field of Study*</label>
                <input 
                  type="text" 
                  id="field" 
                  name="field" 
                  defaultValue={selectedEducation?.field || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  required
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
                  defaultValue={formatDate(selectedEducation?.start_date)}
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
                  defaultValue={formatDate(selectedEducation?.end_date)}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gpa" className="block text-sm font-medium text-text-secondary mb-1">GPA</label>
                <input 
                  type="text" 
                  id="gpa" 
                  name="gpa" 
                  defaultValue={selectedEducation?.gpa || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  placeholder="e.g., 3.8/4.0"
                />
              </div>
              
              <div>
                <label htmlFor="honors" className="block text-sm font-medium text-text-secondary mb-1">Honors</label>
                <input 
                  type="text" 
                  id="honors" 
                  name="honors" 
                  defaultValue={selectedEducation?.honors || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  placeholder="e.g., Summa Cum Laude"
                />
              </div>
            </div>

            <div>
              <label htmlFor="order_num" className="block text-sm font-medium text-text-secondary mb-1">Display Order</label>
              <input 
                type="number" 
                id="order_num" 
                name="order_num" 
                defaultValue={selectedEducation?.order_num || 0}
                className="w-full md:w-1/4 bg-background border border-border/50 rounded-lg p-2"
                min="0"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
              <textarea 
                id="description" 
                name="description" 
                defaultValue={selectedEducation?.description || ''}
                className="w-full bg-background border border-border/50 rounded-lg p-2 min-h-[100px]"
                placeholder="Additional details about your education"
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
