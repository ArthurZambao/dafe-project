import { Input } from '@/global/components/FormComponents/FormInput';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { TextArea } from '@/global/components/FormComponents/FormTextArea';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { CreateFormData, createFormSchema } from '../../schemas/create-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { forumFilterOptions } from '@/global/constants/forumFilterOptions';

export function CreateTopicData() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const ano = hoje.getFullYear();
  const formatedData = `${dia}/${mes}/${ano}`;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit = (data: CreateFormData) => {
    try {
      // TODO: Fazer chamada para a API
      console.log(data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <div className=" px-10 sm:px-0">
      {/* Título principal */}
      <div className="py-10">
        <h1 className="text-4xl text-center sm:text-5xl lg:text-6xl font-bold text-[#007BFF]">
          Criar Assunto
        </h1>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-[#6C757D] border-3 border-[#007BFF] rounded-2xl p-6  sm:p-10 w-full max-w-5xl my-10 mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Imagem e Data */}
          <div className="flex flex-col gap-4 items-center lg:items-start w-full lg:w-1/3">
            <div className="w-40 h-40 sm:w-60 sm:h-60 bg-[#007BFF] rounded-2xl relative overflow-hidden">
              <Image
                src="/ig-logo.svg"
                alt="Imagem do tópico"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <p className="text-center lg:text-left">
              Publicar em: <span className="font-bold">{formatedData}</span>
            </p>

            <div className="w-full">
              <Select<CreateFormData>
                id="selectTopic"
                label="Tópico:"
                register={register}
                error={errors.selectTopic}
                selectOptions={forumFilterOptions}
              />
            </div>
          </div>

          {/* Inputs de título e descrição */}
          <div className="flex flex-col gap-4 flex-1 w-full">
            <Input<CreateFormData>
              id="topicTitle"
              label="Título:"
              type="text"
              placeholder="Título do seu assunto"
              register={register}
              error={errors.topicTitle}
            />

            <TextArea<CreateFormData>
              id="topicDescription"
              label="Descrição:"
              placeholder="Digite a descrição aqui..."
              register={register}
              error={errors.topicDescription}
              rows={5}
            />
          </div>
        </div>

        {/* Conteúdo do tópico */}
        <div className="py-6">
          <TextArea<CreateFormData>
            id="topicMain"
            label="Assunto:"
            placeholder="Digite o conteúdo do assunto aqui..."
            register={register}
            error={errors.topicMain}
            rows={10}
          />
        </div>

        {/* Botão de envio */}
        <div className="flex justify-center pt-8">
          <input
            type="submit"
            value="Criar Assunto"
            className="cursor-pointer bg-[#007BFF] text-2xl sm:text-3xl font-bold text-white px-10 sm:px-20 py-4 rounded-tl-xl rounded-br-xl"
          />
        </div>
      </form>
    </div>
  );
}
