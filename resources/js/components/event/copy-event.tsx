import book from '@/routes/book';
import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';

export const CopyEvent = ({ userId, eventId }: { userId: string; eventId: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      const textToCopy = `${window.location.origin}${book.index.url({ userId, eventId })}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, [userId, eventId]);
  return (
    <Button variant="outline" onClick={handleCopy} className="w-full gap-1.5 sm:w-auto" disabled={copied} aria-label="Copy event url">
      {copied ? <Check /> : <Copy />}
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
};
