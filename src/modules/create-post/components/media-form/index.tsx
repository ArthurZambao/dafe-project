import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CreateFormData } from '../../schemas/create-form.schema';

interface MediaFormProps {
  register: UseFormRegister<CreateFormData>;
  errors: FieldErrors<CreateFormData>;
}

export function MediaForm({ register, errors }: MediaFormProps) {
  return (
    <div className="py-6 flex flex-col gap-4">
      <label
        className="text-lg sm:text-2xl font-semibold text-slate-gray"
        htmlFor="imagem"
      >
        Upload de Imagem:
      </label>
      <input
        id="imagem"
        type="file"
        accept="image/*"
        // {...register('imagem')}
        className="border border-gray-300 rounded-md p-2"
      />
      {/* {errors.imagem && (
        <span className="text-red-500 text-sm">{errors.imagem.message}</span>
      )} */}
    </div>
  );
}
