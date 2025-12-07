import { cn, minutesToHuman } from '@/lib/utils';
import eventRoute from '@/routes/event';
import type { Event } from '@/types';
import { Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { CopyEvent } from './copy-event';

export const EventList = ({ events }: { events: Event[] }) => {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
      {events.map((event) => (
        <Card key={event.id} className="gap-4 py-4">
          <CardHeader className="gap-1">
            <CardTitle>
              <h2 className="leading-5 capitalize">
                <span>{event.name}</span>
                {!event.is_active && <span className="text-red-600"> (unavailable)</span>}
              </h2>
            </CardTitle>
            <CardDescription className="flex items-start gap-1">
              <Clock className="mt-0.5 size-4" />
              <p>{minutesToHuman(event.duration_in_minutes)}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p
              className={cn('text-sm', {
                'text-muted-foreground italic': !event.description,
              })}
            >
              {event.description ?? 'no description'}
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-2 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <Link href={eventRoute.edit({ eventId: event.id })}>Edit</Link>
            </Button>
            {event.is_active && <CopyEvent eventId={event.id} userId={event.user_id} />}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
