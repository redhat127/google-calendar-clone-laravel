import EventController from '@/actions/App/Http/Controllers/EventController';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export const DeleteEventForm = ({ eventId }: { eventId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.delete(EventController.delete({ eventId }), {
          onBefore() {
            if (!confirm('Are you sure you want to delete this event?')) return false;
            setIsLoading(true);
          },
          onSuccess() {
            setIsLoading(false);
          },
        });
      }}
    >
      <button type="submit" disabled={isLoading}>
        <Trash
          className={cn('size-4 text-red-600', {
            'opacity-60': isLoading,
          })}
        />
      </button>
    </form>
  );
};
