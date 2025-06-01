import { FieldError, UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface CheckboxProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export function Checkbox<T extends FieldValues>({ id, label, register, error }: CheckboxProps<T>) {
  return (
    <div className="flex flex-col text-azure-primary pl-2">
      <label className="flex items-center space-x-2 text-left cursor-pointer hover:underline">
        <input
          id={id}
          type="checkbox"
          {...register(id)}
          className="accent-azure-primary w-4 h-4 rounded-md"
        />
        <span className="text-sm tsm:text-base">{label}</span>
      </label>
      {error && <span className="text-red-500 text-sm text-left ml-6">{error.message}</span>}
    </div>
  );
}
