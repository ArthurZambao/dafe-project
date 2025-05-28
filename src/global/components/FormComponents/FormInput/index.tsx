import { ChangeEvent, useState } from 'react';
import { FieldError, UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
  type: string;
  maxlength?: number;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  mask?: string;
  showPasswordToggle?: boolean; // Propriedade para alternar a visibilidade da senha
}

export function Input<T extends FieldValues>({
  id,
  label,
  type,
  maxlength,
  placeholder,
  register,
  error,
  mask,
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
    <div className="flex flex-col text-[#6C757D] relative">
      {label && (
        <label htmlFor={id} className="text-lg sm:text-2xl font-semibold text-left">
          {label} {error && <span className="text-red-500">*</span>}
        </label>
      )}

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
          error ? 'border-red-500' : 'border-[#007BFF]'
        } w-full text-sm tsm:text-base px-4 py-2 border rounded-2xl outline-none pr-10`}
      />

      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="cursor-pointer absolute right-3 bottom-2 top-9 flex items-center text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {error && (
        <span
          id={errorId}
          role="alert"
          className="text-red-500 text-sm text-left ml-4 mt-1"
        >
          {error.message}
        </span>
      )}
    </div>
  );
}