import { ChangeEvent } from 'react';
import { FieldError, UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  mask?: string;
}

export function Input<T extends FieldValues>({
  id,
  label,
  type,
  placeholder,
  register,
  error,
  mask,
}: InputProps<T>) {
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

  return (
    <div className="flex flex-col text-[#6C757D]">
      <p className="text-2xl font-semibold text-left">
        {label} {error && <span className="text-red-500">*</span>}
      </p>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...rest}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const maskedValue = applyMask(e.target.value, mask);
          e.target.value = maskedValue;
          onChange(e);
        }}
        className={`${error ? 'border-red-500' : 'border-[#007BFF]'} w-full text-sm tsm:text-base px-4 py-2 border rounded-2xl outline-none justify-center`}
      />
      {error && <span className="text-red-500 text-sm text-left ml-4">{error.message}</span>}
    </div>
  );
}
