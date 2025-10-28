'use client';

import { ChangeEvent, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { InputProps } from '@/types/formsTypes';

export function Input<T extends FieldValues>({
  id,
  type,
  maxlength,
  placeholder,
  register,
  error,
  mask,
  label,
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const applyMask = (value: string, maskType?: string) => {
    if (!maskType) return value;
    if (maskType === 'date') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 2) return digits;
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return value;
  };

  const { onChange, ...rest } = register(id);
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col text-slate-gray relative">
      <p className="text-lg sm:text-2xl font-semibold text-left">
        {label} {error && <span className="text-red-500">*</span>}
      </p>
      <input
        id={id}
        type={inputType}
        maxLength={maxlength}
        placeholder={placeholder}
        {...rest}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const maskedValue = applyMask(e.target.value, mask);
          e.target.value = maskedValue;
          onChange(e);
        }}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`${
          error ? 'border-red-500' : 'border-slate-gray'
        } w-full text-sm tsm:text-base px-4 py-2 border-1 rounded-2xl outline-none `}
      />

      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={`${error ? 'top-1 bottom-6' : 'top-2 bottom-2'} cursor-pointer absolute right-3 flex items-center text-slate-gray`}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {error && (
        <span id={errorId} role="alert" className="text-red-500 text-sm text-left ml-4 mt-1">
          {error.message}
        </span>
      )}
    </div>
  );
}
