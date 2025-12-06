import { useAuth } from '@/hooks/use-auth';
import { useFlashMessage } from '@/hooks/use-flash-message';
import { home } from '@/routes';
import login from '@/routes/login';
import { Link } from '@inertiajs/react';
import { Calendar } from 'lucide-react';
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
        <Link href={home()} className="flex items-center gap-2 text-2xl font-bold text-orange-600">
          <Calendar />
          <span className="hidden sm:block">Google Calendar</span>
        </Link>
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
