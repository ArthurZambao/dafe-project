import { filterOptions } from '@/global/constants/FilterOptions';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
}

export function Select<T extends FieldValues>({
  id,
  label,
  register,
  error,
  required,
}: SelectProps<T>) {
  const { onChange, ...rest } = register(id);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-2xl font-semibold text-left">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <select
        id={id}
        defaultValue=""
        {...rest}
        onChange={(e) => {
          const value = e.target.value;
          console.log('Selecionado:', value);
          onChange(e);
        }}
        className="px-4 py-2 border border-[#007BFF] rounded-lg text-[#6C757D] focus:outline-none"
      >
        <option value="" disabled hidden>
          Selecione...
        </option>
        {filterOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm text-left ml-4">{error.message}</span>}
    </div>
  );
}
