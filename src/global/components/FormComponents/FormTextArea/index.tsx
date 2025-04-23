import { ChangeEvent } from 'react';
import { FieldError, UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface TextAreaProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  mask?: string;
  rows: number;
}

export function TextArea<T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  error,
  mask,
  rows,
}: TextAreaProps<T>) {
  const applyMask = (value: string, maskType?: string) => {
    if (!maskType) return value;

    // Máscara de data 00/00/0000
    if (maskType === 'date') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 2) return digits;
      if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    }

    return value;
  };

  const { onChange, ...rest } = register(id);

  return (
    <div className="flex flex-col text-[#6C757D]">
      <p className="text-lg sm:text-2xl font-semibold text-left">
        {label} {error && <span className="text-red-500">*</span>}
      </p>
      <textarea
        id={id}
        placeholder={placeholder}
        {...rest}
        rows={rows}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          const maskedValue = applyMask(e.target.value, mask);
          e.target.value = maskedValue;
          onChange(e);
        }}
        className={`${error ? 'border-red-500' : 'border-[#007BFF]'} w-full px-4 py-2 text-sm tsm:text-base border border-[#007BFF] rounded-2xl outline-none justify-center`}
      />
      {error && <span className="text-red-500 text-sm text-left ml-4">{error.message}</span>}
    </div>
  );
}
