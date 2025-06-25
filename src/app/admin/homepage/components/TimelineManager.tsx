// src/app/admin/homepage/components/TimelineManager.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addTimelineEvent, deleteTimelineEvent, type FormState } from '../actions';
import { Trash2 } from 'lucide-react';

const initialState: FormState = {
  error: undefined,
  success: undefined,
};

function SubmitButton({ text, pendingText }: { text: string; pendingText: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200 font-medium disabled:bg-accent/50 disabled:cursor-not-allowed">
      {pending ? pendingText : text}
    </button>
  );
}

function DeleteTimelineEventForm({ eventId }: { eventId: string }) {
  const [state, formAction] = useFormState(deleteTimelineEvent, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={eventId} />
      <button type="submit" className="text-red-500 hover:text-red-400">
        <Trash2 className="w-5 h-5" />
      </button>
    </form>
  );
}

export default function TimelineManager({ timeline }: { timeline: any[] }) {
  const [addState, addFormAction] = useFormState(addTimelineEvent, initialState);
  const addFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (addState.success) {
      addFormRef.current?.reset();
    }
  }, [addState]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Add New Timeline Event</h3>
        <form ref={addFormRef} action={addFormAction} className="space-y-4">
          <div>
            <label htmlFor="date" className="sr-only">Date</label>
            <input type="text" id="date" name="date" placeholder="Date (e.g., 2023-10-26)" required className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent" />
          </div>
          <div>
            <label htmlFor="title" className="sr-only">Title</label>
            <input type="text" id="title" name="title" placeholder="Event Title" required className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent" />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">Description</label>
            <textarea id="description" name="description" placeholder="Event Description" required rows={3} className="w-full bg-background border border-border/50 rounded-lg p-2 focus:ring-accent focus:border-accent resize-y"></textarea>
          </div>
          <SubmitButton text="Add Event" pendingText="Adding..." />
        </form>
        {addState?.error && <p className="text-sm text-red-500 mt-2">{addState.error}</p>}
        {addState?.success && <p className="text-sm text-green-500 mt-2">{addState.success}</p>}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Current Timeline</h3>
        <ul className="space-y-3">
          {timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((event) => (
            <li key={event.id} className="flex items-start justify-between bg-background/50 border border-border/20 p-4 rounded-lg">
              <div>
                <p className="font-semibold text-text">{event.title}</p>
                <p className="text-sm text-text-secondary">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="mt-1 text-text-secondary">{event.description}</p>
              </div>
              <DeleteTimelineEventForm eventId={event.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
