import React from 'react';

interface Props {
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder: string;
  className?: string;
  required?: boolean;
  value: string | number | readonly string[] | undefined;
  onChange: (val: string) => void;
}

export const TextField: React.FC<Props> = ({
  type,
  placeholder,
  className,
  value,
  onChange,
  required,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full mt-2 p-3 rounded outline-none text-xl border-2 focus:border-slate-900 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  );
};
