import EventController from '@/actions/App/Http/Controllers/EventController';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { Textarea } from '@/components/ui/textarea';
import { setServerValidationErrors } from '@/lib/utils';
import type { Event } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const profileDetailsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'name is required.')
    .max(50, 'name is too long.')
    .regex(/^[a-zA-Z0-9\s\-._&()'"]+$/, {
      error: 'name can only contain letters, numbers, spaces, hyphens, underscores, periods, ampersands, and parentheses.',
    }),
  description: z.string().trim().max(150, 'description is too long.'),
  durationInMinutes: z
    .number()
    .int('duration must be a whole number.')
    .positive('duration must be greater than 0.')
    .max(60 * 12, `duration must be less than 12 hours (${60 * 12} minutes).`),
  isActive: z.boolean(),
});

export const CreateEditEventForm = ({ event }: { event?: Event }) => {
  const form = useForm<z.infer<typeof profileDetailsSchema>>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      name: event?.name ?? '',
      description: event?.description ?? '',
      durationInMinutes: event?.duration_in_minutes ?? 30,
      isActive: event?.is_active ?? true,
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending;
  return (
    <form
      noValidate
      className="max-w-lg"
      onSubmit={handleSubmit((data) => {
        router[event ? 'patch' : 'post'](event ? EventController.edit({ eventId: event.id }) : EventController.create(), data, {
          onBefore() {
            setIsPending(true);
          },
          onFinish() {
            setIsPending(false);
          },
          onError(errors) {
            setServerValidationErrors(errors, setError);
          },
        });
      })}
    >
      <FieldGroup className="gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="on" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="on" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
        <Controller
          control={control}
          name="durationInMinutes"
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Duration (in minutes)</FieldLabel>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
        <Controller
          control={control}
          name="isActive"
          render={({ field: { name, onBlur, onChange, ref, value, disabled }, fieldState }) => {
            return (
              <Field orientation="horizontal" data-invalid={fieldState.invalid} className="gap-2">
                <Checkbox
                  name={name}
                  onBlur={onBlur}
                  onCheckedChange={onChange}
                  ref={ref}
                  checked={value}
                  disabled={disabled}
                  id={name}
                  aria-invalid={fieldState.invalid}
                />
                <FieldContent>
                  <FieldLabel htmlFor={name}>Is Active?</FieldLabel>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </FieldContent>
              </Field>
            );
          }}
        />
        <Button type="submit" disabled={isFormDisabled} className="self-start">
          <LoadingSwap isLoading={isFormDisabled}>{event ? 'Update' : 'Create'}</LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  );
};
