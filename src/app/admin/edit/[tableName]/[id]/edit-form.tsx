// src/app/admin/edit/[tableName]/[id]/edit-form.tsx
'use client';

import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import ImageUpload from '@/components/admin/ImageUpload';

// A type for the form action prop
type FormAction = (formData: FormData) => Promise<void>;

// Define a proper type for database items
interface DatabaseItem {
  id: string;
  created_at?: string;
  updated_at?: string;
  content?: string;
  [key: string]: unknown;
}

export default function EditForm({ item, tableName, action }: { item: DatabaseItem; tableName: string; action: FormAction }) {
  const [content, setContent] = useState(item.content || '');

  // When the component mounts, check if we are editing a blog post and set the editor theme
  useEffect(() => {
    if (tableName === 'blog_posts') {
      const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      document.documentElement.setAttribute('data-color-mode', theme);
    }
  }, [tableName]);

  const renderField = (key: string, value: unknown) => {
    if (['id', 'created_at', 'updated_at'].includes(key)) return null;

    const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (key.includes('image_url')) {
      return (
        <div key={key}>
          <ImageUpload name={key} defaultValue={typeof value === 'string' ? value : ''} />
        </div>
      );
    }

    if (key === 'content' && tableName === 'blog_posts') {
      return (
        <div key={key} className="mb-6">
          <label className="block text-lg font-medium mb-2">{label}</label>
          <MDEditor value={content} onChange={(val) => setContent(val || '')} height={400} />
          <textarea name="content" value={content} readOnly className="hidden" />
        </div>
      );
    }

    if (key === 'content') {
        return (
            <div key={key}>
              <label htmlFor={key} className="block text-lg font-medium mb-2">{label}</label>
              <textarea
                id={key}
                name={key}
                defaultValue={typeof value === 'string' ? value : ''}
                rows={8}
                className="input-field"
              />
            </div>
          );
    }

    if (typeof value === 'boolean') {
      return (
        <div key={key} className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            id={key}
            name={key}
            defaultChecked={value}
            className="h-5 w-5 rounded border-border text-primary focus:ring-accent"
          />
          <label htmlFor={key} className="text-lg font-medium">{label}</label>
        </div>
      );
    }

    if (Array.isArray(value)) {
        return (
            <div key={key}>
              <label htmlFor={key} className="block text-lg font-medium mb-2">{label} (comma-separated)</label>
              <input
                type="text"
                id={key}
                name={key}
                defaultValue={value.join(', ')}
                className="input-field"
              />
            </div>
          );
    }

    return (
      <div key={key}>
        <label htmlFor={key} className="block text-lg font-medium mb-2">{label}</label>
        <input
          type="text"
          id={key}
          name={key}
          defaultValue={typeof value === 'string' ? value : typeof value === 'number' ? String(value) : ''}
          className="input-field"
        />
      </div>
    );
  };

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="id" value={item.id} />
      <input type="hidden" name="tableName" value={tableName} />
      
      {Object.entries(item).map(([key, value]) => renderField(key, value))}
      
      <div className="flex justify-end gap-4 pt-6">
        <button type="button" onClick={() => window.history.back()} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </div>
    </form>
  );
}
