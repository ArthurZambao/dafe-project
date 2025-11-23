'use client';

import { useAuth } from "@/global/context/useAuth";
import { updateUser } from "@/libs/services/users/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateEditUserFormData, createEditUserFormSchema } from "../schemas/create-edit-user-form-schema";
import { useState, useEffect } from "react";
import { calculateFileHash } from "@/global/utils/hash";

export function useEditUser() {
  const router = useRouter();
  const { user, updateUserContext } = useAuth();

  const [imageHash, setImageHash] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } =
    useForm<CreateEditUserFormData>({
      resolver: zodResolver(createEditUserFormSchema),
      defaultValues: {
        nome: user?.nome,
        usuario: user?.usuario,
        email: user?.email,
        instituicao: user?.instituicao,
        curso: user?.curso,
        modulo: user?.modulo ? `${user.modulo}º ano` : undefined,
      }
    });

  const moduloMapping: Record<string, number> = { '1º ano': 1, '2º ano': 2, '3º ano': 3 };

  const anexos = watch('anexos');

  useEffect(() => {
    if (anexos && anexos.length > 0) {
      const file = anexos[0] as File;

      if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/png')) {
        toast.error('Formato de arquivo inválido. Use apenas JPG ou PNG.');
        reset({ anexos: null }); 
        return; 
      }

      setIsProcessingFile(true);
      const toastId = toast.loading('Processando imagem...');
      
      setFileName(file.name);
      
      const newPreviewUrl = URL.createObjectURL(file);
      setFilePreviewUrl(newPreviewUrl);

      calculateFileHash(file)
        .then(hash => {
          toast.success(`Imagem pronta. Hash: ${hash.substring(0, 7)}...`, { id: toastId });
          setImageHash(hash);
        })
        .catch(err => {
          toast.error('Não foi possível processar a imagem.', { id: toastId });
          setImageHash(null);
        })
        .finally(() => {
          setIsProcessingFile(false);
        });

      return () => {
        URL.revokeObjectURL(newPreviewUrl);
        setFilePreviewUrl(null);
        setFileName(null);
        setImageHash(null);
        setIsProcessingFile(false);
      };
    }
  }, [anexos, reset]); 

  const onSubmit = async (data: CreateEditUserFormData) => {
    if (!user) return; 
    if (isProcessingFile) {
      toast.error('Aguarde o processamento da imagem.');
      return;
    }

    const formData = new FormData();

    if (data.nome) formData.append('nome', data.nome);
    if (data.usuario) formData.append('usuario', data.usuario);
    if (data.email) formData.append('email', data.email);
    if (data.instituicao) formData.append('instituicao', data.instituicao);
    if (data.senha) formData.append('senha', data.senha);

    if (imageHash) {
      formData.append('imageHash', imageHash);
    }

    if (user.role === 'student' && data.curso && data.modulo) {
      formData.append('studentDetails[curso]', data.curso);
      formData.append('studentDetails[modulo]', (moduloMapping[data.modulo] ?? 1).toString());
    }

    if (data.anexos && data.anexos.length > 0) {
      formData.append('image', data.anexos[0]);
    }

    try {
      const updatedUserResult = await updateUser(user.id, formData);

      updateUserContext ({
        ...updateUser,
        imageUrl: updatedUserResult.imageUrl
      });

      reset();
      router.push('/users');
      toast.success('Usuário atualizado com sucesso!');
    } catch (error) {
      let backendMessage =
        'Erro ao atualizar usuário. Por favor, tente novamente mais tarde.';
    
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string | string[] } } };
        const message = err.response?.data?.message;
        
        backendMessage = Array.isArray(message)
          ? message.join(' ')
          : message || backendMessage;
      }
      toast.error(backendMessage);
    }
  };

  return { 
    register, 
    handleSubmit, 
    errors, 
    onSubmit, 
    currentUser: user,
    filePreviewUrl,
    fileName, 
  };
} 