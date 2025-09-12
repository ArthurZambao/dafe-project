import { calculateFileHash } from "@/global/utils/hash";
import { createPost } from "@/libs/services/posts/postsService";
import { PostDraftData } from "@/types/draftsDatas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateFormData, createFormSchema } from "../schemas/create-form.schema";

export function useCreatePosts() {
  const hoje = new Date();
  const dataFormatada = hoje.toISOString().slice(0, 10);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
  });

  const [activeTab, setActiveTab] = useState<'texto' | 'midia'>('texto');
  const [drafts, setDrafts] = useState<PostDraftData[]>([]);

  const anexos = watch('anexos');

  useEffect(() => {
    if (anexos && anexos.length > 0) {
      const primeiroArquivo = anexos[0] as File;
      console.log('Arquivo selecionado:', primeiroArquivo.name);

      calculateFileHash(primeiroArquivo)
        .then(hash => {
          console.log('Impressão Digital (Hash MD5):', hash);
          toast.info(`Hash do arquivo: ${hash}`);
        })

        .catch(err => {
          console.error('Erro ao calcular o hash:', err);
          toast.error('Não foi possível gerar o hash do arquivo.');
        })
    }
  }, [anexos]);

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

    const finalData = { ...data, data: dataFormatada };

    try {
      await createPost(finalData);

      localStorage.setItem(
        'forumDrafts',
        JSON.stringify(drafts.filter((d) => JSON.stringify(d) !== JSON.stringify(finalData)))
      );

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

  return {
    register,
    errors,
    handleSubmit,
    activeTab,
    setActiveTab,
    drafts,
    handleSaveDraft,
    handleLoadDraft,
    deleteDraft,
    onSubmit,
  };
}