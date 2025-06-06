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
import { AnimatedContent } from '@/global/animations/animatedContent';
import { useState } from 'react';
import { TextForm } from '../text-form';
import { MediaForm } from '../media-form';

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
      await axios.post('http://localhost:3030/posts', finalData, {
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

  const [activeTab, setActiveTab] = useState<'texto' | 'midia'>(
    'texto'
  );

  return (
    <AnimatedContent inverse>
      <div className="px-10 sm:px-0 min-h-screen">
        <div className="pt-8 px-20">
          <h1 className="text-4xl text-left sm:text-5xl lg:text-6xl font-bold text-azure-secondary">
            Criar Assunto
          </h1>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-6 text-xl text-azure-primary font-medium border-b border-gray-300 px-2 sm:justify-center">
          <button
            className={`cursor-pointer whitespace-nowrap ${
              activeTab === 'texto' ? 'border-b-2 border-azure-primary pb-1' : ''
            }`}
            onClick={() => setActiveTab('texto')}
          >
            Texto
          </button>
          <button
            className={`cursor-pointer whitespace-nowrap ${
              activeTab === 'midia' ? 'border-b-2 border-azure-primary pb-1' : ''
            }`}
            onClick={() => setActiveTab('midia')}
          >
            Mídia
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-slate-gray px-6 sm:p-10 w-full max-w-4xl mx-auto"
        >
          {activeTab === 'texto' && (
            <TextForm register={register} errors={errors} />
          )}

          {activeTab === 'midia' && (
            <MediaForm register={register} errors={errors} />
          )}

          <div className="flex flex-col pl-auto pt-4">
            <div className="flex gap-8 justify-end w-full">
              <button
                type="submit"
                className="cursor-pointer text-xl sm:text-2xl text-azure-primary px-3 sm:px-6 py-2 border-2 border-azure-primary rounded-xl"
              >
                Salvar Rascunho
              </button>
              <input
                type="submit"
                value="Criar Assunto"
                className="cursor-pointer btn-dafe btn-dafe-hover text-xl sm:text-2xl font-bold text-white px-5 sm:px-10 py-2 rounded-tl-xl rounded-br-xl"
              />
            </div>
            <p className="text-center lg:text-right pt-4">
              Publicar em:{' '}
              <span className="font-bold">
                <FormattedDate date={hoje} />
              </span>
            </p>
          </div>
        </form>
      </div>
    </AnimatedContent>
  );
}
