import { Eye, EyeOff } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { FieldError, UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
  type: string;
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
  placeholder,
  register,
  error,
  mask,
  showPasswordToggle = false,
}: InputProps<T>) {
  const [passwordVisible, setPasswordVisible] = useState(false); 

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
      {label && (
        <p className="text-lg sm:text-2xl font-semibold text-left">
          {label} {error && <span className="text-red-500">*</span>}
        </p>
      )}

      <div className="relative">
        <input
          id={id}
          type={type === 'password' && !passwordVisible ? 'password' : 'text'} 
          placeholder={placeholder}
          {...rest}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const maskedValue = applyMask(e.target.value, mask);
            e.target.value = maskedValue;
            onChange(e);
          }}
          className={`${error ? 'border-red-500' : 'border-[#007BFF]'} w-full text-sm tsm:text-base px-4 py-2 border rounded-2xl outline-none`}
        />
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)} 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {passwordVisible ? <Eye/> : <EyeOff/>} 
          </button>
        )}
      </div>

      {error && <span className="text-red-500 text-sm text-left ml-4">{error.message}</span>}
    </div>
  );
}
