'use client';

import { Input } from '@/global/components/FormComponents/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AnimatedContent } from '@/global/animations/animatedContent';
import {
  CreateEditUserFormData,
  createEditUserFormSchema,
} from '../../schemas/create-edit-user-form-schema';
import { cursoOptions } from '@/global/constants/curso-options';
import { moduloOptions } from '@/global/constants/modulo-options';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { useAuth } from '@/global/context/useAuth';

export function EditUserData() {
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateEditUserFormData>({
    resolver: zodResolver(createEditUserFormSchema),
  });

  const onSubmit = async (data: CreateEditUserFormData) => {
    const moduloMapping: { [key: string]: number } = {
      '1º ano': 1,
      '2º ano': 2,
      '3º ano': 3,
    };

    const finalData = {
      ...data,
      modulo: moduloMapping[data.modulo] ?? data.modulo,
    };
    console.log(currentUser.id, finalData);

    try {
      await axios.patch(`http://localhost:3030/students/${currentUser.id}`, finalData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      reset();
      router.push('/users');
      toast.success('Usuário Atualizado com sucesso!');
    } catch (error) {
      let backendMessage = 'Erro ao Atualizar Usuário. Por favor, tente novamente mais tarde.';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string | string[] } } };
        const message = err.response?.data?.message;
        backendMessage = Array.isArray(message) ? message.join(' ') : message || backendMessage;
      }

      toast.error(backendMessage);
    }
  };

  if (!user) return null;

  const currentUser = user;

  return (
    <AnimatedContent inverse>
      <div className="flex flex-col px-4 sm:px-0 items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 border-4 border-azure-primary rounded-tr-3xl rounded-bl-3xl mx-auto w-full max-w-screen-sm sm:w-[50rem] my-10 px-6 sm:px-10 py-10 sm:py-20"
        >
          <h2 className="text-2xl sm:text-4xl text-center font-bold text-azure-primary">
            Editar Usuário
          </h2>

          <Input<CreateEditUserFormData>
            id="nome"
            type="text"
            label="Nome Completo:"
            placeholder={currentUser.nome}
            register={register}
            error={errors.nome}
          />

          <Input<CreateEditUserFormData>
            id="usuario"
            label="Nome de Usuário:"
            type="text"
            placeholder={currentUser.usuario}
            register={register}
            error={errors.usuario}
          />

          <Input<CreateEditUserFormData>
            id="email"
            label="E-mail:"
            type="text"
            placeholder={currentUser.email}
            register={register}
            error={errors.email}
          />

          <Input<CreateEditUserFormData>
            id="instituicao"
            label="Intituição de Ensino:"
            type="text"
            placeholder={currentUser.instituicao}
            register={register}
            error={errors.instituicao}
          />

          <div className="flex flex-col sm:flex-row gap-5">
            <Select<CreateEditUserFormData>
              id="curso"
              label="Curso:"
              register={register}
              error={errors.curso}
              selectOptions={cursoOptions}
              primarySelectOption={currentUser.curso}
            />

            <Select<CreateEditUserFormData>
              id="modulo"
              label="Ano Escolar:"
              register={register}
              error={errors.modulo}
              selectOptions={moduloOptions}
              primarySelectOption={`${currentUser.modulo}º ano`}
            />
          </div>

          <Input<CreateEditUserFormData>
            id="senha"
            label="Senha:"
            type="password"
            placeholder="***********"
            register={register}
            error={errors.senha}
          />

          <Input<CreateEditUserFormData>
            id="confirmarSenha"
            label="Confirmar Senha:"
            type="password"
            placeholder="***********"
            register={register}
            error={errors.confirmarSenha}
          />

          <div className="flex flex-col justify-center pt-4">
            <input
              type="submit"
              value="Confirmar"
              className="cursor-pointer bg-azure-primary text-lg sm:text-2xl font-bold text-white mx-4 sm:mx-20 py-3 sm:py-4 rounded-tr-xl rounded-bl-xl"
            />
          </div>
        </form>
      </div>
    </AnimatedContent>
  );
}
