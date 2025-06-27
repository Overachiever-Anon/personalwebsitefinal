// src/app/admin/resume/components/CertificationsManager.tsx
'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Award, Plus, Pencil, Trash2, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { addCertification, updateCertification, deleteCertification } from '../actions';

type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  url?: string;
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
      {pending ? 'Saving...' : isEditing ? 'Update Certification' : 'Add Certification'}
    </button>
  );
}

export default function CertificationsManager({ certifications }: { certifications: Certification[] }) {
  const [formState, formAction] = useActionState(addCertification, { error: undefined, success: undefined });
  const [editFormState, editFormAction] = useActionState(updateCertification, { error: undefined, success: undefined });
  const [_deleteFormState, deleteFormAction] = useActionState(deleteCertification, { error: undefined, success: undefined });
  
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

  const handleEditClick = (cert: Certification) => {
    setIsFormOpen(true);
    setEditingId(cert.id);
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

  const selectedCertification = editingId
    ? certifications.find((cert) => cert.id === editingId)
    : undefined;

  return (
    <div>
      {/* List of existing certifications */}
      {certifications.length > 0 ? (
        <div className="space-y-4 mb-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="border border-border/50 rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between bg-background-light p-4 cursor-pointer"
                onClick={() => toggleExpanded(cert.id)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{cert.name}</h3>
                  <p className="text-text-secondary">{cert.issuer}</p>
                  <p className="text-sm text-text-secondary">
                    Issued: {displayDate(cert.date)}
                    {cert.expires && ` • Expires: ${displayDate(cert.expires)}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleEditClick(cert); }}
                    className="p-1 hover:bg-border/30 rounded-full transition-colors"
                    aria-label="Edit certification"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <form action={deleteFormAction} onSubmit={(e) => {
                    if (!confirm('Are you sure you want to delete this certification?')) {
                      e.preventDefault();
                    }
                  }}>
                    <input type="hidden" name="id" value={cert.id} />
                    <button 
                      type="submit"
                      className="p-1 hover:bg-border/30 rounded-full transition-colors text-red-500"
                      aria-label="Delete certification"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                  {expandedItems.includes(cert.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
              
              {expandedItems.includes(cert.id) && (
                <div className="p-4 bg-background/50">
                  {cert.description && (
                    <p className="mb-3 whitespace-pre-wrap">{cert.description}</p>
                  )}
                  {cert.url && (
                    <div className="flex gap-2 items-center">
                      <a 
                        href={cert.url}
                        target="_blank" 
                        rel="noreferrer noopener"
                        className="flex items-center gap-1 text-sm text-accent hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3" /> View Certificate
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-secondary italic mb-6">No certifications yet. Add your certifications below.</p>
      )}

      {/* Button to add new certification */}
      {!isFormOpen && (
        <button
          type="button"
          onClick={handleNewClick}
          className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg hover:bg-border/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      )}

      {/* Form for adding or editing certification */}
      {isFormOpen && (
        <div className="border border-border/50 rounded-lg p-4 bg-background-light">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            {editingId ? 'Edit' : 'Add'} Certification
          </h3>
          
          <form action={editingId ? editFormAction : formAction} className="space-y-4">
            {editingId && <input type="hidden" name="id" value={editingId} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Certification Name*</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  defaultValue={selectedCertification?.name || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  required
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
              </div>
              
              <div>
                <label htmlFor="issuer" className="block text-sm font-medium text-text-secondary mb-1">Issuing Organization*</label>
                <input 
                  type="text" 
                  id="issuer" 
                  name="issuer" 
                  defaultValue={selectedCertification?.issuer || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  required
                  placeholder="e.g., Amazon Web Services"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-text-secondary mb-1">Issue Date*</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  defaultValue={formatDate(selectedCertification?.date)}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="expires" className="block text-sm font-medium text-text-secondary mb-1">Expiration Date</label>
                <input 
                  type="date" 
                  id="expires" 
                  name="expires" 
                  defaultValue={formatDate(selectedCertification?.expires)}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  placeholder="Leave blank if doesn't expire"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-text-secondary mb-1">Certificate URL</label>
                <input 
                  type="url" 
                  id="url" 
                  name="url" 
                  defaultValue={selectedCertification?.url || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  placeholder="https://"
                />
                <p className="text-xs text-text-secondary mt-1">Link to verify credential or view certificate</p>
              </div>
              
              <div>
                <label htmlFor="order_num" className="block text-sm font-medium text-text-secondary mb-1">Display Order</label>
                <input 
                  type="number" 
                  id="order_num" 
                  name="order_num" 
                  defaultValue={selectedCertification?.order_num || 0}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
              <textarea 
                id="description" 
                name="description" 
                defaultValue={selectedCertification?.description || ''}
                className="w-full bg-background border border-border/50 rounded-lg p-2 min-h-[100px]"
                placeholder="Optional details about this certification"
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
