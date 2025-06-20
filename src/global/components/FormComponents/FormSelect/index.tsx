import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  selectOptions: string[];
  primarySelectOption?: string;
}

export function Select<T extends FieldValues>({
  id,
  label,
  register,
  error,
  selectOptions,
  primarySelectOption,
}: SelectProps<T>) {
  const { onChange, ...rest } = register(id);

  return (
    <div className="flex flex-col gap-1 text-slate-gray">
      <p className="text-lg sm:text-2xl font-semibold text-left">
        {label} {error && <span className="text-red-500">*</span>}
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
        className={`${error ? 'border-red-500' : 'border-azure-primary'} px-4 py-2 border rounded-xl text-slate-gray focus:outline-none w-auto min-w-[150px]`}
      >
        <option value="" disabled hidden>
          {primarySelectOption ? primarySelectOption : 'Selecione...'}
        </option>
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm text-left ml-4">{error.message}</span>}
    </div>
  );
}

