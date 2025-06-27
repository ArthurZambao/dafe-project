import { FormInputProps } from '@/types/createFormInput';
import { CreateNoticeDataSchema } from '../../schemas/create-notices-schema';

export const CreateFormInput = ({ register, name, placeholder, isFormHeader }: FormInputProps) => (
  <input
    {...register(name as keyof CreateNoticeDataSchema)}
    placeholder={placeholder}
    className={`${
      isFormHeader ? 'text-xl sm:text-4xl' : 'text-lg sm:text-2xl rounded-t-2xl bg-[#B7DAFF] w-full'
    } border-b p-2 focus:outline-none`}
  />
);

export const CreateFormTextarea = ({ register, name, placeholder, rows }: FormInputProps) => (
  <textarea
    {...register(name as keyof CreateNoticeDataSchema)}
    rows={rows}
    placeholder={placeholder}
    className="border-b p-2 my-2 focus:outline-none w-full"
  />
);

export const CreateFormImageInput = ({ register, name }: FormInputProps) => (
  <input
    type="file"
    accept="image/*"
    {...register(name as keyof CreateNoticeDataSchema)}
    className="flex flex-col border p-2 rounded-md bg-white  file:bg-azure-primary file:text-white file:border-none file:py-2 file:px-4 file:cursor-pointer"
  />
);
