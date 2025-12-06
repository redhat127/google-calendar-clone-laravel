import { CreateEventForm } from '@/components/form/event/create-event-form';
import { BaseLayout } from '@/components/layout/base';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTitle } from '@/lib/utils';
import event from '@/routes/event';
import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function CreateEvent() {
  return (
    <>
      <Head>
        <title>{generateTitle('Create Event')}</title>
      </Head>
      <div className="space-y-4 p-4 px-8">
        <Card className="gap-4 py-4">
          <CardHeader className="gap-1">
            <CardTitle>
              <h1 className="font-bold">Create a new Event</h1>
            </CardTitle>
            <p>
              <Link href={event.index()} className="text-sm font-normal text-muted-foreground underline underline-offset-4">
                Back to events
              </Link>
            </p>
          </CardHeader>
          <CardContent>
            <CreateEventForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

CreateEvent.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
