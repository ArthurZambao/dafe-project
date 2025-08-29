
'use client';

import { Paperclip } from 'lucide-react';
import { FieldValues, UseFormRegister, FieldError } from 'react-hook-form';

interface FileAttachmentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: string;
  error?: { message?: string}; // Correção de erro de tipagem que ocorreu no media-form: usando agora uma tipagem mais flexível que apenas VERIFICA A PROPRIEDADE 'MESSAGE'
}

export function FileAttachment<T extends FieldValues>({
  register,
  name,
  error,
}: FileAttachmentProps<T>) {


  
  return (
    <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <input
        type="file"
        id={name}
        multiple
        {...register(name as any)} 
        className="sr-only"
      />

      <label
        htmlFor={name}
        className="cursor-pointer flex flex-col items-center justify-center text-azure-primary hover:text-azure-secondary transition-colors"
      >
        <Paperclip size={40} />
        <span className="mt-2 text-base font-semibold">Anexar arquivos ou Mídia</span>
        <p className="text-sm text-slate-gray">Clique aqui para selecionar</p>
      </label>
    
      {error && <p className="mt-2 text-sm text-red-500 text-center">{error.message}</p>}

    </div>
  );
}