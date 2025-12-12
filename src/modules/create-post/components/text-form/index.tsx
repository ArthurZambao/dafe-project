import { Input } from '@/global/components/FormComponents/FormInput';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { TextArea } from '@/global/components/FormComponents/FormTextArea';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CreateFormData } from '../../schemas/create-form.schema';
import { forumFilterOptions } from '@/global/constants/forumFilterOptions';

interface TextFormProps {
  register: UseFormRegister<CreateFormData>;
  errors: FieldErrors<CreateFormData>;
}

export function TextForm({ register, errors }: TextFormProps) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 py-10 sm:py-0">
        <div className="w-full flex flex-col gap-2">
          <Input<CreateFormData>
            id="titulo"
            label="Título:"
            type="text"
            maxlength={50}
            placeholder="Título do seu assunto"
            register={register}
            error={errors.titulo}
          />
          <div className="w-auto inline-block">
            <Select<CreateFormData>
              id="topico"
              label="Tópico:"
              register={register}
              error={errors.topico}
              selectOptions={forumFilterOptions}
            />
          </div>
          <TextArea<CreateFormData>
            id="descricao"
            label="Descrição:"
            maxlength={100}
            placeholder="Digite a descrição aqui..."
            register={register}
            error={errors.descricao}
            rows={2}
          />
        </div>
      </div>
      <div className="py-6">
        <TextArea<CreateFormData>
          id="conteudo"
          label="Assunto:"
          maxlength={300}
          placeholder="Digite o conteúdo do assunto aqui..."
          register={register}
          error={errors.conteudo}
          rows={10}
        />
      </div>
    </>
  );
}
