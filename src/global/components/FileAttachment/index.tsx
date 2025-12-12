'use client';

import { Paperclip, FileText } from 'lucide-react';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import Image from 'next/image';

interface FileAttachmentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: { message?: string };
  filePreviewUrl: string | null;
  fileName: string | null;
}

export function FileAttachment<T extends FieldValues>({
  register,
  name,
  error,
  filePreviewUrl,
  fileName,
}: FileAttachmentProps<T>) {
  return (
    <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <input type="file" id={name} multiple {...register(name)} className="sr-only" />

      {/* se não houver arquivo selecionado, botão de upload: */}
      {!filePreviewUrl && !fileName && (
        <label
          htmlFor={name}
          className="cursor-pointer flex flex-col items-center justify-center text-azure-primary hover:text-azure-secondary transition-colors"
        >
          <Paperclip size={40} />
          <span className="mt-2 text-base font-semibold">Anexar arquivos ou Mídia</span>
          <p className="text-sm text-slate-gray">Clique aqui para selecionar</p>
        </label>
      )}

      {/* caso haja um preview de imagem, ela será mostrada: */}
      {filePreviewUrl && (
        <label htmlFor={name} className="cursor-pointer block">
          <p className="text-sm text-slate-gray text-center mb-2">
            Arquivo selecionado (clique para trocar):
          </p>
          <div className="relative w-full h-48 rounded-md overflow-hidden">
            <Image
              src={filePreviewUrl}
              alt="Preview do anexo"
              layout="fill"
              objectFit="cover" //contain
            />
          </div>
        </label>
      )}

      {/* caso não haja imagem, mostra nome do arquivo somente: */}
      {!filePreviewUrl && fileName && (
        <label htmlFor={name} className="cursor-pointer block">
          <p className="text-sm text-slate-gray text-center mb-2">
            Arquivo selecionado (clique para trocar):
          </p>
          <div className="flex items-center justify-center gap-2 p-4 bg-gray-200 rounded-md">
            <FileText size={24} className="text-gray-600" />
            <span className="text-gray-800 font-medium">{fileName}</span>
          </div>
        </label>
      )}

      {error && <p className="mt-2 text-sm text-red-500 text-center">{error.message}</p>}
    </div>
  );
}
