'use client';

import { CreateFormDataSchema } from '@/modules/create-form/schemas/create-form-schema';
import { UseFormRegister } from 'react-hook-form';


interface RequiredToggleProps {
  name: `perguntas.${number}.obrigatoria`;
  register: UseFormRegister<CreateFormDataSchema>;
}

export function RequiredToggle({ name, register }: RequiredToggleProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div className="relative">
        <input type="checkbox" {...register(name)} className="sr-only peer" />
        <div
          className={`
            w-10 h-5 rounded-full shadow-inner transition-colors duration-300
            bg-gray-300 peer-checked:bg-blue-500
          `}
        />
        <div
          className={`
            dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full
            transition-transform duration-300
            peer-checked:translate-x-5
          `}
        />
      </div>
      <span className="text-xs sm:text-sm font-medium">Obrigatória</span>
    </label>
  );
}
