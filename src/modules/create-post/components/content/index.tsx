'use client';

import { Input } from '@/global/components/FormComponents/FormInput';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { TextArea } from '@/global/components/FormComponents/FormTextArea';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { CreateFormData, createFormSchema } from '../../schemas/create-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { forumFilterOptions } from '@/global/constants/forumFilterOptions';
import { FormattedDate } from '@/global/components/FormatedDate';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getValidToken } from '@/global/utils/auth';

export function CreatePostData() {
  const hoje = new Date();
  const dataFormatada = hoje.toISOString().slice(0, 10);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit = async (data: CreateFormData) => {
    const finalData = { ...data, data: dataFormatada };
    const token = getValidToken();

    if (!token) {
      toast.error('Token inválido ou expirado. Faça login novamente.');
      router.push('/login');
      return;
    }

    try {
      await axios.post("http://localhost:3030/posts", finalData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      router.push('/forum-page');
      toast.success('Tópico criado com sucesso!');
      reset();
    } catch (error) {
      let backendMessage = 'Erro ao criar tópico. Por favor, tente novamente mais tarde.';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string | string[] } } };
        const message = err.response?.data?.message;
        backendMessage = Array.isArray(message) ? message.join(' ') : message || backendMessage;
      }
      toast.error(backendMessage);
    }
  };

  return (
    <div className="px-10 sm:px-0 min-h-screen">
      <div className="py-10">
        <h1 className="text-4xl text-center sm:text-5xl lg:text-6xl font-bold text-[#007BFF]">
          Criar Assunto
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-[#6C757D] border-3 border-[#007BFF] rounded-2xl p-6 sm:p-10 w-full max-w-5xl my-10 mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-4 items-center lg:items-start w-full lg:w-1/3">
            <div className="w-40 h-40 sm:w-60 sm:h-60 bg-[#007BFF] rounded-2xl relative overflow-hidden">
              <Image
                src="/icons/ig-logo.svg"
                alt="Imagem do tópico"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <p className="text-center lg:text-left">
              Publicar em:{' '}
              <span className="font-bold">
                <FormattedDate date={hoje} />
              </span>
            </p>

            <div className="w-full">
              <Select<CreateFormData>
                id="topico"
                label="Tópico:"
                register={register}
                error={errors.topico}
                selectOptions={forumFilterOptions}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 w-full">
            <Input<CreateFormData>
              id="titulo"
              label="Título:"
              type="text"
              maxlength={50}
              placeholder="Título do seu assunto"
              register={register}
              error={errors.titulo}
            />

            <TextArea<CreateFormData>
              id="descricao"
              label="Descrição:"
              maxlength={100}
              placeholder="Digite a descrição aqui..."
              register={register}
              error={errors.descricao}
              rows={5}
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
