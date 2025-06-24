'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormattedDate } from '@/global/components/FormatedDate';
import { toast } from 'sonner';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { useState, useEffect } from 'react';
import { CreateComplaintData, createComplaintSchema } from '../../schemas/create-complaint-schema';
import { ComplaintsDraftData } from '@/types/draftsDatas';
import { UlComplaintsPostDraftList } from '../ulComplaintsDraftList';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { TextArea } from '@/global/components/FormComponents/FormTextArea';
import { complaintOptions } from '../../constants/complaint-options';
import { Input } from '@/global/components/FormComponents/FormInput';
import { api } from '@/libs/api/axios';

export function ComplaintsData() {
  const [drafts, setDrafts] = useState<ComplaintsDraftData[]>([]);

  const hoje = new Date();
  const dataFormatada = hoje.toISOString().slice(0, 10);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateComplaintData>({
    resolver: zodResolver(createComplaintSchema),
  });

  useEffect(() => {
    const saved = localStorage.getItem('complaintsDrafts');
    if (saved) {
      try {
        const parsed: ComplaintsDraftData[] = JSON.parse(saved);
        setDrafts(parsed);
      } catch (err) {
        console.error('Erro ao carregar rascunhos:', err);
      }
    }
  }, []);

  const saveDraftToLocalStorage = (data: CreateComplaintData) => {
    const draftId = Date.now().toString();
    const draft: ComplaintsDraftData = {
      ...data,
      id: draftId,
      date: dataFormatada,
    };

    const updatedDrafts = [...drafts, draft];
    localStorage.setItem('complaintsDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleSaveDraft = () => {
    handleSubmit((data) => {
      saveDraftToLocalStorage(data);
      toast.success('Rascunho salvo com sucesso!');
      reset();
    })();
  };

  const handleLoadDraft = (draft: ComplaintsDraftData) => {
    reset(draft);
    toast.info('Rascunho carregado.');
  };

  const deleteDraft = (draftId: string) => () => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== draftId);
    localStorage.setItem('complaintsDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
    toast.success('Rascunho excluído com sucesso!');
  };

  const onSubmit = async (data: CreateComplaintData) => {
    const finalData = { ...data, data: dataFormatada };

    try {
      await api.post('http://localhost:3030/complaints', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem(
        'complaintsDrafts',
        JSON.stringify(drafts.filter((d) => JSON.stringify(d) !== JSON.stringify(finalData)))
      );

      toast.success('Denúncia enviada com sucesso!');
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-azure-secondary">
              Fazer Denúncia
            </h1>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-black mb-2">Rascunhos</h2>
              <UlComplaintsPostDraftList
                drafts={drafts}
                handleLoadDraft={handleLoadDraft}
                deleteDraft={deleteDraft}
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-slate-gray px-4 py-10 p-10 w-full max-w-4xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="w-full flex flex-col gap-2">
                <Input<CreateComplaintData>
                  id="titulo"
                  label="Título:"
                  type="text"
                  maxlength={50}
                  placeholder="Título da denúncia"
                  register={register}
                  error={errors.titulo}
                />
                <div className="w-auto inline-block">
                  <Select<CreateComplaintData>
                    id="topico"
                    label="Tópico:"
                    register={register}
                    error={errors.topico}
                    selectOptions={complaintOptions}
                  />
                </div>
              </div>
            </div>
            <div className="py-6">
              <TextArea<CreateComplaintData>
                id="conteudo"
                label="Conteúdo:"
                maxlength={300}
                placeholder="Digite sua denúncia aqui..."
                register={register}
                error={errors.conteudo}
                rows={10}
              />
            </div>

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
                  value="Fazer Denúncia"
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
