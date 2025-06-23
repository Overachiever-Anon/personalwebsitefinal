'use client';

import { useTransition } from 'react';
import { deleteItem } from '../actions';

interface DeleteButtonProps {
  id: number;
  tableName: string;
  sectionSlug: string; // Keep this prop
}

export default function DeleteButton({ id, tableName, sectionSlug }: DeleteButtonProps) {
  // useTransition provides a pending state to disable the button during the action
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // 1. Show the confirmation dialog first
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      // 2. If confirmed, start the transition
      startTransition(async () => {
        // 3. Call the server action directly with arguments
        const result = await deleteItem(tableName, id, sectionSlug);
        if (result.error) {
          // Optional: Show an error to the user if deletion fails
          alert(`Deletion failed: ${result.error}`);
        }
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:text-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
    >
      {isPending ? (
        'Deleting...'
      ) : (
        <>
          <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </>
      )}
    </button>
  );
}
