import { CreateNoticeDataSchema } from '../../schemas/create-notices-schema';

import { Input } from '@/global/components/FormComponents/FormInput';
import { TextArea } from '@/global/components/FormComponents/FormTextArea';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FileAttachment } from '@/global/components/FileAttachment';

interface MediaFormProps {
  register: UseFormRegister<CreateNoticeDataSchema>;
  errors: FieldErrors<CreateNoticeDataSchema>;
}

interface TextFormProps {
  register: UseFormRegister<CreateNoticeDataSchema>;
  errors: FieldErrors<CreateNoticeDataSchema>;
}

export function TextNoticeForm({ register, errors }: TextFormProps) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 pt-10 sm:pt-0">
        <div className="w-full flex flex-col gap-2">
          <Input<CreateNoticeDataSchema>
            id="NoticiaTitulo"
            label="Título:"
            type="text"
            maxlength={50}
            placeholder="Título do seu assunto"
            register={register}
            error={errors.NoticiaTitulo}
          />
          <TextArea<CreateNoticeDataSchema>
            id="noticiaDesc"
            label="Descrição:"
            maxlength={100}
            placeholder="Digite a descrição aqui..."
            register={register}
            error={errors.noticiaDesc}
            rows={2}
          />
        </div>
      </div>
      <div className="py-2 sm:py-6">
        <TextArea<CreateNoticeDataSchema>
          id="noticiaConteudo"
          label="Assunto:"
          maxlength={300}
          placeholder="Digite o conteúdo do assunto aqui..."
          register={register}
          error={errors.noticiaConteudo}
          rows={10}
        />
      </div>
    </>
  );
}



export function MediaNoticeForm({ register, errors }: MediaFormProps) {
  return (
    <div className="py-6 flex flex-col gap-4">
        <FileAttachment
        register={register}
        name="imagem"
        error={errors.imagem}
        />
    </div>
  );
}
