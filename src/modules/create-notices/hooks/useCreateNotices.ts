'use client';

import { createNotice } from "@/libs/services/notices/noticesService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createNoticeSchema, CreateNoticeDataSchema } from "../schemas/create-notices-schema";

export function useCreateNotices() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'texto' | 'midia'>('texto');



  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateNoticeDataSchema>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: {
      NoticiaTitulo: '',
      noticiaDesc: '',
      noticiaConteudo: '',
      imagem: undefined,
    },
  });


  const onSubmit = async (data: CreateNoticeDataSchema) => {
    try {
      const payload = {
        titulo: data.NoticiaTitulo,
        descricao: data.noticiaDesc,
        conteudo: data.noticiaConteudo,
      };

      await createNotice(payload);

      console.log('Form data submitted:', payload);
      toast.success('Notícia criada com sucesso!');
      reset();
      router.push('/notices-page');

    } catch (error) {
      toast.error('Erro ao criar notícia. Tente novamente.');
      console.error(error);
    }
  };

  return { formRef, register, handleSubmit, activeTab, setActiveTab, onSubmit, errors };
}