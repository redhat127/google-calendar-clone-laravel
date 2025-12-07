import { CreateEditEventForm } from '@/components/form/event/create-edit-event-form';
import { BaseLayout } from '@/components/layout/base';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTitle } from '@/lib/utils';
import eventRoute from '@/routes/event';
import type { Event } from '@/types';
import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function EditEvent({ event }: { event: { data: Event } }) {
  return (
    <>
      <Head>
        <title>{generateTitle('Edit Event')}</title>
      </Head>
      <div className="space-y-4 p-4 px-8">
        <Card className="gap-4 py-4">
          <CardHeader className="gap-1">
            <CardTitle>
              <h1 className="font-bold">Edit Event</h1>
            </CardTitle>
            <p>
              <Link href={eventRoute.index()} className="text-sm font-normal text-muted-foreground underline underline-offset-4">
                Back to events
              </Link>
            </p>
          </CardHeader>
          <CardContent>
            <CreateEditEventForm event={event.data} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

EditEvent.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
