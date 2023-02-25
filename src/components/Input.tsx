import { InputProps as NativeInputProps } from 'react-html-props';

interface InputProps extends NativeInputProps {
  id: string;
  label: string;
}

export default function Input({ id, label, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-label">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          className="block w-full rounded-md border border-border/20 p-3.5 text-sm placeholder:text-label focus:border-indigo-500 focus:ring-indigo-500"
          {...props}
        />
      </div>
    </div>
  );
}
