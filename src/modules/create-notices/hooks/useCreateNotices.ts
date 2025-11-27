'use client';

import { calculateFileHash } from "@/global/utils/hash";
import { createNotice } from "@/libs/services/notices/noticesService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createNoticeSchema, CreateNoticeDataSchema } from "../schemas/create-notices-schema";

export function useCreateNotices() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'texto' | 'midia'>('texto');

  const [imageHash, setImageHash] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    watch, 
    setValue,
    formState: { errors } 
  } = useForm<CreateNoticeDataSchema>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      conteudo: '',
    },
  });

  // Observa o campo de anexo para detectar quando o usuário escolhe um arquivo
  const anexos = watch('anexos');
  const file = anexos && anexos.length > 0 ? (anexos[0] as File) : null;

  // 1. Limpeza de memória (URL do preview)
  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);

  // 2. Processa a imagem assim que ela é selecionada
  useEffect(() => {
    if (!file) {
      setImageHash(null);
      setFileName(null);
      setFilePreviewUrl(null);
      return;
    }

    setIsProcessingFile(true);
    const toastId = toast.loading('Processando imagem...');
    setFileName(file.name);

    if (file.type.startsWith('image/')) {
      setFilePreviewUrl(URL.createObjectURL(file));
    }

    calculateFileHash(file)
      .then(hash => {
        toast.success(`Imagem pronta.`, { id: toastId });
        setImageHash(hash);
      })
      .catch(err => {
        console.error('Erro no hash:', err);
        toast.error('Erro ao processar imagem.', { id: toastId });
        setImageHash(null);
        setValue('anexos', undefined); // Remove o arquivo se der erro
      })
      .finally(() => {
        setIsProcessingFile(false);
      });

  }, [file, setValue]);

  const onSubmit = async (data: CreateNoticeDataSchema) => {
    
    if (isProcessingFile) {
      toast.warning('Aguarde o processamento da imagem terminar.');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('titulo', data.titulo);
      formData.append('descricao', data.descricao);
      formData.append('conteudo', data.conteudo);


      if (imageHash)  { 
        formData.append('imageHash', imageHash);
      }

      if (file) { 
        formData.append('image', file); 
      }

      await createNotice(formData);

      toast.success('Notícia criada com sucesso!');
      
      setFilePreviewUrl(null);
      setImageHash(null);
      reset();
      router.push('/notices-page');

    } catch (error) {
      console.error(error);
      let errorMessage = 'Erro ao criar notícia.';
      
      if (error && typeof error === 'object' && 'response' in error) {
         const err = error as { response?: { data?: { message?: string | string[] } } };
         const message = err.response?.data?.message;
         errorMessage = Array.isArray(message) ? message.join(' ') : message || errorMessage;
      }
      
      toast.error(errorMessage);
    }
  };

  return { 
    register, 
    handleSubmit, 
    activeTab, 
    setActiveTab, 
    onSubmit, 
    errors,
    filePreviewUrl,   
    isProcessingFile, 
    fileName
  };
}