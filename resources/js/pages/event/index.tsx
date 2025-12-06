import { EventList } from '@/components/event/event-list';
import { BaseLayout } from '@/components/layout/base';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTitle } from '@/lib/utils';
import { home } from '@/routes';
import event from '@/routes/event';
import type { Event } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function AllEvent() {
  const {
    props: {
      events: { data: events },
    },
  } = usePage<{ events: { data: Event[] } }>();
  return (
    <>
      <Head>
        <title>{generateTitle('All Event')}</title>
      </Head>
      <div className="space-y-4 p-4 px-8">
        <Card className="gap-4 py-4">
          <CardHeader className="gap-1">
            <CardTitle>
              <h1 className="font-bold">All Event</h1>
            </CardTitle>
            <p>
              <Link href={home()} className="text-sm font-normal text-muted-foreground underline underline-offset-4">
                Back to home
              </Link>
            </p>
          </CardHeader>
        </Card>
        <Card className="gap-4 py-4">
          <CardContent>
            <Button asChild>
              <Link href={event.create()}>Create a new Event</Link>
            </Button>
          </CardContent>
        </Card>
        {events.length > 0 ? <EventList events={events} /> : <p className="text-sm text-muted-foreground italic">No event found.</p>}
      </div>
    </>
  );
}

AllEvent.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
