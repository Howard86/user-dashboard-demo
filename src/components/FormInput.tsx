import type {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import type { InputProps } from 'react-html-props';
import clsx from 'clsx';

import { getAriaDescribedBy } from '@/services/utils';

interface FormInputProps<T extends FieldValues> extends InputProps {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options?: RegisterOptions<T, Path<T>>;
  errors: FieldErrors<T>;
  helperText?: string;
}

export default function FormInput<T extends FieldValues>({
  label,
  name,
  register,
  options,
  errors,
  className,
  helperText,
  ...props
}: FormInputProps<T>) {
  const errorMessage = errors?.[name]?.message;
  const isInvalid = Boolean(errorMessage);

  const text = typeof errorMessage === 'string' ? errorMessage : helperText;

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-xs font-semibold text-label">
        {label}
      </label>
      <input
        id={name}
        className={clsx(
          isInvalid
            ? 'border-red-300 placeholder-red-300 focus:border-red-500'
            : 'border-border/20 focus:border-primary',
          'mt-2 block w-full rounded-md border-2 p-3.5 text-sm placeholder:text-label focus:outline-none focus:ring-0',
        )}
        aria-invalid={isInvalid ? 'true' : undefined}
        aria-describedby={getAriaDescribedBy(name, text, isInvalid)}
        {...register(name, options)}
        {...props}
      />
      {text && (
        <p
          className={clsx(
            isInvalid ? 'text-red-500' : ' text-zinc-500',
            'ml-3.5 mt-2 text-sm',
          )}
          id={getAriaDescribedBy(name, text, isInvalid)}
        >
          {text}
        </p>
      )}
    </div>
  );
}
