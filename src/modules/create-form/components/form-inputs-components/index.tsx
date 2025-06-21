import { FieldValues, UseFormRegister } from 'react-hook-form';
import { CreateFormDataSchema } from '../../schemas/create-form-schema';

interface InputProps {
  register: UseFormRegister<CreateFormDataSchema>;
  name: keyof FieldValues | string;
  placeholder: string;
  isFormHeader?: boolean;
  rows?: number;
}

export const CreateFormInput = ({ register, name, placeholder, isFormHeader }: InputProps) => (
  <input
    {...register(name as keyof CreateFormDataSchema)}
    placeholder={placeholder}
    className={`${isFormHeader ? 'text-xl sm:text-4xl' : 'text-lg sm:text-2xl rounded-t-2xl bg-[#B7DAFF] w-full'} border-b p-2 focus:outline-none`}
  />
);

export const CreateFormTextarea = ({ register, name, placeholder, rows }: InputProps) => (
  <textarea
    {...register(name as keyof CreateFormDataSchema)}
    rows={rows}
    placeholder={placeholder}
    className="border-b p-2 my-2 focus:outline-none w-full"
  />
);
