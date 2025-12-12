
import { CreateNoticeDataSchema } from '@/modules/create-notices/schemas/create-notices-schema';
import { FieldValues, UseFormRegister } from 'react-hook-form';


export interface FormInputProps {
  register: UseFormRegister<CreateNoticeDataSchema>;
  name: keyof FieldValues | string;
  placeholder: string;
  isFormHeader?: boolean;
  rows?: number;
}
