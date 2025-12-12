import { UseFormRegister, FieldError } from 'react-hook-form';
import { CreateFormDataSchema } from '../../schemas/create-form-schema';

interface InputProps {
  register: UseFormRegister<CreateFormDataSchema>;
  name: keyof CreateFormDataSchema | string;
  placeholder: string;
  isFormHeader?: boolean;
  rows?: number;
  error?: FieldError;
}

export const CreateFormInput = ({
  register,
  name,
  placeholder,
  isFormHeader,
  error,
}: InputProps) => (
  <div className="flex flex-col w-full">
    <input
      {...register(name as keyof CreateFormDataSchema)}
      placeholder={placeholder}
      className={`${
        isFormHeader
          ? 'text-xl sm:text-4xl'
          : 'text-lg sm:text-2xl rounded-t-2xl bg-[#B7DAFF] w-full'
      } ${error ? 'border-red-500' : 'border-b'} p-2 focus:outline-none`}
    />

    {error && (
      <span role="alert" className="text-red-500 text-sm mt-1 ml-1">
        {error.message}
      </span>
    )}
  </div>
);

export const CreateFormTextarea = ({
  register,
  name,
  placeholder,
  rows,
  error,
  readOnly,
}: InputProps & { readOnly?: boolean }) => (
  <div className="flex flex-col w-full">
    <textarea
      {...register(name as keyof CreateFormDataSchema)}
      rows={rows}
      placeholder={placeholder}
      className={`border-b p-2 my-2 focus:outline-none w-full ${error ? 'border-red-500' : ''}`}
      readOnly={readOnly}
    />
    {error && (
      <span role="alert" className="text-red-500 text-sm mt-1 ml-1">
        {error.message}
      </span>
    )}
  </div>
);
