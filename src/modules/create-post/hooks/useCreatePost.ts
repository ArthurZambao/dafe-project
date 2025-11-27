'use client';

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

  // 1. Novos estados pra guardar resultados do anexo de imgs
  const [imageHash, setImageHash] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue, // Adicionado para limpar o input de arquivo se necessário
  } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
  });

  const [activeTab, setActiveTab] = useState<'texto' | 'midia'>('texto');
  const [drafts, setDrafts] = useState<PostDraftData[]>([]);

  const anexos = watch('anexos');
  const file = anexos && anexos.length > 0 ? (anexos[0] as File) : null;


  // 2. useEffect principal: Processa arquivo e gerencia a limpeza da URL de preview
  useEffect(() => {
    
    // 1. LÓGICA DE LIMPEZA (Cleanup Function): Executada antes do próximo efeito ou na desmontagem.
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
    
}, [filePreviewUrl]); // Dispara o cleanup quando o filePreviewUrl muda (para limpar o cache do navegador)


  // NOVO useEffect: Dispara o processamento SÓ quando anexos (o arquivo) muda
  useEffect(() => {
    
    // Se não houver arquivo, resetamos a hash e a URL de preview
    if (!file) {
        setImageHash(null);
        setFileName(null);
        setFilePreviewUrl(null); // Garante que o estado está limpo
        return;
    }

    // Se houver um arquivo, iniciamos o processamento
    setIsProcessingFile(true);
    const toastId = toast.loading('Processando arquivo...');
    
    setFileName(file.name);

    if (file.type.startsWith('image/')) {
        setFilePreviewUrl(URL.createObjectURL(file));
    }
    
    calculateFileHash(file)
        .then(hash => {
            console.log('Impressão Digital (Hash MD5):', hash);
            toast.success(`Arquivo pronto. Hash: ${hash.substring(0, 7)}...`, { id: toastId });
            setImageHash(hash); // Salva hash no estado
        })
        .catch(err => {
            console.error('Erro ao calcular o hash:', err);
            toast.error('Não foi possível processar o arquivo.', { id: toastId });
            setImageHash(null);
            
            // LIMPA O INPUT APÓS ERRO (OPCIONAL)
            setValue('anexos', undefined); 
        })
        .finally(() => {
            setIsProcessingFile(false); // Terminar processamento
        });
        
    // Dependências: Apenas o objeto 'file' (extraído do 'anexos')
  }, [file]); 


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

  // 3. reescrevendo essa function
  const onSubmit = async (data: CreateFormData) => {
      if (isProcessingFile) {
        toast.error('Aguarde o processamento do arquivo terminar');
        return;
      }
      
      // objeto formdata pra enviar os dados
      const formData = new FormData();

      // campos de texto do form
      formData.append('titulo', data.titulo);
      formData.append('descricao', data.descricao);
      formData.append('conteudo', data.conteudo);
      formData.append('topico', data.topico);
      formData.append('data', dataFormatada);
      
      // adiciona o hash 
    if (imageHash) {
      formData.append('imageHash', imageHash);
    }

    // o nome 'image' deve ser o mesmo do FileInterceptor('image') no backend
    if (data.anexos && data.anexos.length > 0) {
      formData.append('image', data.anexos[0]);
    }

    try {
      await createPost(formData);

      // Limpeza do estado após submissão bem sucedida
      setFilePreviewUrl(null);
      setFileName(null);
      setImageHash(null);
      reset(); // Reseta o formulário
      
      localStorage.setItem(
        'forumDrafts',
        JSON.stringify(drafts.filter((d) => JSON.stringify(d) !== JSON.stringify(data)))
      );

      router.push('/forum-page');
      toast.success('Tópico criado com sucesso!');
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
    isProcessingFile,
    filePreviewUrl,
    fileName,
  };
}