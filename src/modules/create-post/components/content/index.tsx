'use client';

import { useForm } from 'react-hook-form';
import { CreateFormData, createFormSchema } from '../../schemas/create-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CurrentTime, FormattedDate } from '@/global/components/FormatedDate';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getValidToken } from '@/global/utils/auth';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { useState, useEffect } from 'react';
import { TextForm } from '../text-form';
import { MediaForm } from '../media-form';

import { PostDraftData } from '@/types/draftsDatas';
import { UlPostDraftList } from '../ulDraftList';
import { api } from '@/libs/api/axios';

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

  const [activeTab, setActiveTab] = useState<'texto' | 'midia'>('texto');
  const [drafts, setDrafts] = useState<PostDraftData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('forumDrafts');
    if (saved) {
      try {
        const parsed: PostDraftData[] = JSON.parse(saved);
        setDrafts(parsed);
      } catch (err) {
        console.error('Erro ao carregar rascunhos:', err);
      }
    }
  }, []);

  const saveDraftToLocalStorage = (data: CreateFormData) => {
    const draftId = Date.now().toString();
    const draft: PostDraftData = {
      ...data,
      id: draftId,
      date: dataFormatada,
    };

    const updatedDrafts = [...drafts, draft];
    localStorage.setItem('forumDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleSaveDraft = () => {
    handleSubmit((data) => {
      saveDraftToLocalStorage(data);
      toast.success('Rascunho salvo com sucesso!');
      reset();
    })();
  };

  const handleLoadDraft = (draft: PostDraftData) => {
    reset(draft);
    toast.info('Rascunho carregado.');
  };

  const deleteDraft = (draftId: string) => () => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== draftId);
    localStorage.setItem('forumDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
    toast.success('Rascunho excluído com sucesso!');
  };

  const onSubmit = async (data: CreateFormData) => {
    // Teste da integração do FileAttachment console.log
    console.log('Arquivos anexados:', data.anexos);

    const finalData = { ...data, data: dataFormatada };
    const token = getValidToken();

    try {
      await api.post('/posts', finalData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem(
        'forumDrafts',
        JSON.stringify(drafts.filter((d) => JSON.stringify(d) !== JSON.stringify(finalData)))
      );

      router.push('/forum-page');
      toast.success('Tópico criado com sucesso!', {
        description: (
          <p className="flex">
            Criado às <CurrentTime />
          </p>
        ),
      });
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
    <AnimatedContent inverse>
      <div className="flex justify-center px-4 sm:px-10 min-h-screen">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-8 px-2 sm:px-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-azure-secondary">
              Criar Assunto
            </h2>
            <div>
              <h2 className="text-base text-center sm:text-lg font-semibold text-black mb-2">
                Rascunhos
              </h2>
              <UlPostDraftList
                drafts={drafts}
                handleLoadDraft={handleLoadDraft}
                deleteDraft={deleteDraft}
              />
            </div>
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-6 text-lg sm:text-xl text-azure-primary font-medium px-4 sm:px-8 mt-6 justify-center">
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
            className="text-slate-gray px-4 sm:p-10 w-full max-w-4xl mx-auto"
          >
            {activeTab === 'texto' && <TextForm register={register} errors={errors} />}
            {activeTab === 'midia' && <MediaForm register={register} errors={errors} />}

            <div className="flex flex-col pt-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-end w-full">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="text-base sm:text-xl text-azure-primary px-4 sm:px-6 py-2 border-2 border-azure-primary rounded-xl"
                >
                  Salvar Rascunho
                </button>
                <input
                  type="submit"
                  value="Criar Assunto"
                  className="btn-dafe btn-dafe-hover text-base sm:text-xl font-bold text-white px-5 sm:px-10 py-2 rounded-tl-xl rounded-br-xl"
                />
              </div>
              <p className="text-center sm:text-right pt-4 pb-10 sm:pb-0">
                Publicar em:{' '}
                <span className="font-bold">
                  <FormattedDate date={hoje} />
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AnimatedContent>
  );
}
