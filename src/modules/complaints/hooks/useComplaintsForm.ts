// modules/complaints/hooks/useComplaintsForm.ts
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ComplaintsDraftData } from '@/types/draftsDatas';
import { createComplaint } from '@/libs/api/complaints/complaints';
import { CreateComplaintData, createComplaintSchema } from '../schemas/create-complaint-schema';

export function useComplaintsForm() {
  const hoje = new Date();
  const dataFormatada = hoje.toISOString().slice(0, 10);

  const [drafts, setDrafts] = useState<ComplaintsDraftData[]>([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateComplaintData>({
    resolver: zodResolver(createComplaintSchema),
  });

  // Carregar rascunhos
  useEffect(() => {
    const saved = localStorage.getItem('complaintsDrafts');
    if (saved) {
      try {
        setDrafts(JSON.parse(saved));
      } catch (err) {
        console.error('Erro ao carregar rascunhos:', err);
      }
    }
  }, []);

  // Salvar rascunho
  const saveDraftToLocalStorage = (data: CreateComplaintData) => {
    const draftId = Date.now().toString();
    const draft: ComplaintsDraftData = { ...data, id: draftId, date: dataFormatada };
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

  const deleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== draftId);
    localStorage.setItem('complaintsDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
    toast.success('Rascunho excluído com sucesso!');
  };

  // Enviar denúncia
  const onSubmit = async (data: CreateComplaintData) => {
    const finalData = { ...data, data: dataFormatada };
    try {
      await createComplaint(finalData);

      localStorage.setItem(
        'complaintsDrafts',
        JSON.stringify(drafts.filter((d) => JSON.stringify(d) !== JSON.stringify(finalData)))
      );

      toast.success('Reclamação enviada com sucesso!');
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

  return {
    hoje,
    register,
    errors,
    handleSubmit,
    reset,
    drafts,
    handleSaveDraft,
    handleLoadDraft,
    deleteDraft,
    onSubmit,
  };
}
