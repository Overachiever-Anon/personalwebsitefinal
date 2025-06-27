// src/app/admin/resume/components/ProjectsManager.tsx
'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { FolderKanban, Plus, Pencil, Trash2, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { addProject, updateProject, deleteProject } from '../actions';
import Image from 'next/image';

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
      {pending ? 'Saving...' : isEditing ? 'Update Project' : 'Add Project'}
    </button>
  );
}

export default function ProjectsManager({ projects }: { projects: Project[] }) {
  const [formState, formAction] = useActionState(addProject, { error: undefined, success: undefined });
  const [editFormState, editFormAction] = useActionState(updateProject, { error: undefined, success: undefined });
  const [deleteFormState, deleteFormAction] = useActionState(deleteProject, { error: undefined, success: undefined });
  
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

  const handleEditClick = (project: Project) => {
    setIsFormOpen(true);
    setEditingId(project.id);
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

  const selectedProject = editingId
    ? projects.find((project) => project.id === editingId)
    : undefined;

  return (
    <div>
      {/* List of existing projects */}
      {projects.length > 0 ? (
        <div className="space-y-4 mb-6">
          {projects.map((project) => (
            <div key={project.id} className="border border-border/50 rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between bg-background-light p-4 cursor-pointer"
                onClick={() => toggleExpanded(project.id)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-background rounded-full">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-0.5 bg-background rounded-full">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleEditClick(project); }}
                    className="p-1 hover:bg-border/30 rounded-full transition-colors"
                    aria-label="Edit project"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <form action={deleteFormAction} onSubmit={(e) => {
                    if (!confirm('Are you sure you want to delete this project?')) {
                      e.preventDefault();
                    }
                  }}>
                    <input type="hidden" name="id" value={project.id} />
                    <button 
                      type="submit"
                      className="p-1 hover:bg-border/30 rounded-full transition-colors text-red-500"
                      aria-label="Delete project"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                  {expandedItems.includes(project.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
              
              {expandedItems.includes(project.id) && (
                <div className="p-4 bg-background/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.image_url && (
                      <div className="col-span-1">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                          <Image 
                            src={project.image_url} 
                            alt={project.title} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                      </div>
                    )}
                    <div className={`${project.image_url ? 'col-span-2' : 'col-span-3'}`}>
                      <p className="whitespace-pre-wrap mb-3">{project.description}</p>
                      
                      {(project.start_date || project.end_date) && (
                        <div className="text-sm text-text-secondary mb-2">
                          Duration: {displayDate(project.start_date)} {project.end_date ? `— ${displayDate(project.end_date)}` : '— Present'}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-background-light rounded-full">{tech}</span>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        {project.url && (
                          <a 
                            href={project.url}
                            target="_blank" 
                            rel="noreferrer noopener"
                            className="flex items-center gap-1 text-sm text-accent hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" /> Live Preview
                          </a>
                        )}
                        {project.github_url && (
                          <a 
                            href={project.github_url}
                            target="_blank" 
                            rel="noreferrer noopener"
                            className="flex items-center gap-1 text-sm text-accent hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" /> GitHub Repo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-secondary italic mb-6">No projects yet. Add your projects below.</p>
      )}

      {/* Button to add new project */}
      {!isFormOpen && (
        <button
          type="button"
          onClick={handleNewClick}
          className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg hover:bg-border/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      )}

      {/* Form for adding or editing project */}
      {isFormOpen && (
        <div className="border border-border/50 rounded-lg p-4 bg-background-light">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FolderKanban className="w-5 h-5" />
            {editingId ? 'Edit' : 'Add'} Project
          </h3>
          
          <form action={editingId ? editFormAction : formAction} className="space-y-4">
            {editingId && <input type="hidden" name="id" value={editingId} />}
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">Project Title*</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                defaultValue={selectedProject?.title || ''}
                className="w-full bg-background border border-border/50 rounded-lg p-2"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-text-secondary mb-1">Start Date</label>
                <input 
                  type="date" 
                  id="start_date" 
                  name="start_date" 
                  defaultValue={formatDate(selectedProject?.start_date)}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                />
              </div>
              
              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-text-secondary mb-1">End Date</label>
                <input 
                  type="date" 
                  id="end_date" 
                  name="end_date" 
                  defaultValue={formatDate(selectedProject?.end_date)}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description*</label>
              <textarea 
                id="description" 
                name="description" 
                defaultValue={selectedProject?.description || ''}
                className="w-full bg-background border border-border/50 rounded-lg p-2 min-h-[100px]"
                required
              />
            </div>

            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-text-secondary mb-1">
                Technologies* (comma-separated)
              </label>
              <textarea 
                id="technologies" 
                name="technologies" 
                defaultValue={selectedProject?.technologies.join(', ') || ''}
                className="w-full bg-background border border-border/50 rounded-lg p-2"
                required
                placeholder="React, Next.js, Tailwind CSS, TypeScript"
              />
              <p className="text-xs text-text-secondary mt-1">Enter technologies separated by commas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-text-secondary mb-1">Live Demo URL</label>
                <input 
                  type="url" 
                  id="url" 
                  name="url" 
                  defaultValue={selectedProject?.url || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  placeholder="https://"
                />
              </div>
              
              <div>
                <label htmlFor="github_url" className="block text-sm font-medium text-text-secondary mb-1">GitHub URL</label>
                <input 
                  type="url" 
                  id="github_url" 
                  name="github_url" 
                  defaultValue={selectedProject?.github_url || ''}
                  className="w-full bg-background border border-border/50 rounded-lg p-2"
                  placeholder="https://github.com/"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-text-secondary mb-1">Project Image URL</label>
              <input 
                type="url" 
                id="image_url" 
                name="image_url" 
                defaultValue={selectedProject?.image_url || ''}
                className="w-full bg-background border border-border/50 rounded-lg p-2"
                placeholder="https://"
              />
              <p className="text-xs text-text-secondary mt-1">Use a direct link to an image (e.g., from your gallery)</p>
            </div>

            <div>
              <label htmlFor="order_num" className="block text-sm font-medium text-text-secondary mb-1">Display Order</label>
              <input 
                type="number" 
                id="order_num" 
                name="order_num" 
                defaultValue={selectedProject?.order_num || 0}
                className="w-full md:w-1/4 bg-background border border-border/50 rounded-lg p-2"
                min="0"
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
