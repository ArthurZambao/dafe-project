
import { CheckboxProps } from '@/types/formsTypes';
import { FieldValues } from 'react-hook-form';


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
        <span className="text-sm sm:text-base">{label}</span>
      </label>
      {error && <span className="text-red-500 text-sm text-left ml-6">{error.message}</span>}
    </div>
  );
}
