'use client';

import { useAuth } from "@/global/context/useAuth";
import { updateUser } from "@/libs/services/users/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateEditUserFormData, createEditUserFormSchema } from "../schemas/create-edit-user-form-schema";

export function useEditUser() {
  const router = useRouter();
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<CreateEditUserFormData>({
      resolver: zodResolver(createEditUserFormSchema),
    });

  const moduloMapping: Record<string, number> = { '1º ano': 1, '2º ano': 2, '3º ano': 3 };

  const onSubmit = async (data: CreateEditUserFormData) => {
    if (!user) return; // evita submit sem user
    try {
      const baseData = { ...data };
      const roleData =
        user.role === 'student'
          ? {
              studentDetails: {
                curso: data.curso,
                modulo: moduloMapping[data.modulo!] ?? 1,
              },
            }
          : {};

      await updateUser(user.id, { ...baseData, ...roleData });
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

  return { register, handleSubmit, errors, onSubmit, currentUser: user };
}
