import type { ReactNode } from 'react';
import type { SelectProps as NativeSelectProps } from 'react-html-props';

interface SelectProps extends NativeSelectProps {
  children: ReactNode;
  id: string;
  label: string;
}

export default function Select({ id, label, children, ...props }: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-label">
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          className="block w-full rounded-md border border-border/20 p-3.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...props}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
