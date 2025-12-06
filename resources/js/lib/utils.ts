import { clientEnvs } from '@/env';
import { clsx, type ClassValue } from 'clsx';
import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateTitle = (title: string) => {
  return `${clientEnvs.VITE_APP_NAME} - ${title}`;
};

export const setServerValidationErrors = <TFieldValues extends FieldValues = FieldValues>(
  errors: Partial<Record<keyof TFieldValues, string | undefined>>,
  setError: UseFormSetError<TFieldValues>,
) => {
  (Object.entries(errors) as Array<[keyof TFieldValues, string | undefined]>).forEach(([key, message]) => {
    if (message) {
      setError(key as FieldPath<TFieldValues>, { message });
    }
  });
};

export const minutesToHuman = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const parts = [];
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  }
  if (mins > 0) {
    parts.push(`${mins} ${mins === 1 ? 'minute' : 'minutes'}`);
  }
  return parts.length ? parts.join(' and ') : '0 minutes';
};
