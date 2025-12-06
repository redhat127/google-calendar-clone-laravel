import { useAuth } from '@/hooks/use-auth';
import { useFlashMessage } from '@/hooks/use-flash-message';
import { home } from '@/routes';
import event from '@/routes/event';
import login from '@/routes/login';
import { Link } from '@inertiajs/react';
import { Calendar, Clock } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Toaster } from '../ui/sonner';
import { UserDropdown } from '../user-dropdown';

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  const flashMessage = useFlashMessage();
  useEffect(() => {
    if (flashMessage) {
      toast[flashMessage.type](flashMessage.text);
    }
  }, [flashMessage]);
  const auth = useAuth();
  return (
    <>
      <header className="flex items-center justify-between border-b p-4 px-8">
        <div className="flex items-center gap-4">
          <Link href={home()} className="flex items-center gap-2 text-orange-600">
            <Calendar className="inline-block sm:hidden" />
            <span className="hidden text-sm font-bold xs:block sm:text-2xl">Google Calendar</span>
          </Link>
          <div className="hidden items-center gap-4 sm:flex">
            <Link href={event.index()} className="flex items-center gap-1.5">
              <Calendar className="size-5" />
              Events
            </Link>
            <Link href={home()} className="flex items-center gap-1.5">
              <Clock className="size-5" />
              Schedule
            </Link>
          </div>
        </div>
        {auth ? (
          <UserDropdown user={auth} />
        ) : (
          <Button asChild>
            <Link href={login.index()}>Login</Link>
          </Button>
        )}
      </header>
      <main className="flex flex-1 flex-col">
        {children}
        <Toaster expand position="top-center" />
      </main>
    </>
  );
};
