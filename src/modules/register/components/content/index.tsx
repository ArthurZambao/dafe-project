'use client';

import { Input } from '@/global/components/FormComponents/FormInput';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { cursoOptions } from '@/global/constants/curso-options';
import { moduloOptions, periodoOptions } from '@/global/constants/register-select-options';
import {
  CreateRegisterFormData,
  createRegisterFormSchema,
} from '../../schemas/create-register-form-schema';
import { useEffect, useState } from 'react';
import { createUser } from '@/services/users/userService';

export function RegisterPageData() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'professor'>('student');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  });

  // Atualiza o campo role no form sempre que mudar
  useEffect(() => {
    setValue('role', role, { shouldValidate: true, shouldDirty: true });
  }, [role, setValue]);

  const handleRoleChange = (value: 'student' | 'professor') => {
    setRole(value);
    setValue('role', value, { shouldValidate: true, shouldDirty: true });
  };

  const moduloMapping: Record<string, number> = { '1º ano': 1, '2º ano': 2, '3º ano': 3 };

  const onSubmit = async (data: CreateRegisterFormData) => {
    try {
      const baseData = {
        nome: data.nome,
        usuario: data.usuario,
        email: data.email,
        instituicao: data.instituicao,
        role: data.role,
        senha: data.senha,
        confirmarSenha: data.confirmarSenha,
      };

      const roleData =
        data.role === 'student'
          ? {
              studentDetails: {
                curso: data.curso,
                modulo: moduloMapping[data.modulo] ?? 1,
              },
            }
          : {
              professorDetails: {
                matricula: data.matricula,
                periodo: data.periodo,
              },
            };

      const finalData = { ...baseData, ...roleData };

      await createUser(finalData);

      router.push('/users');
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      let backendMessage = 'Erro ao cadastrar. Por favor, tente novamente mais tarde.';
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
      <div className="flex flex-col px-4 sm:px-0 items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 border-4 border-azure-primary rounded-tr-3xl rounded-bl-3xl mx-auto w-full max-w-screen-sm sm:w-[50rem] my-10 px-6 sm:px-10 py-10 sm:py-20"
        >
          <h2 className="text-2xl sm:text-4xl text-center font-bold text-azure-primary">
            Cadastrar-se
          </h2>

          {/* Seletor de Role */}
          <section className="flex-col justify-center mx-auto">
            <h3 className="text-center">Quem você é?</h3>
            <div className="flex gap-4 py-2">
              <button
                type="button"
                className={`text-xl px-2 ${role === 'student' ? 'btn-dafe text-white' : 'cursor-pointer text-azure-primary'}`}
                onClick={() => handleRoleChange('student')}
              >
                Sou Aluno
              </button>
              <button
                type="button"
                className={`text-xl px-2 ${role === 'professor' ? 'btn-dafe text-white' : 'cursor-pointer text-azure-primary'}`}
                onClick={() => handleRoleChange('professor')}
              >
                Sou Professor
              </button>
            </div>
          </section>

          {/* Campos Comuns */}
          <Input<CreateRegisterFormData>
            id="nome"
            type="text"
            label="Nome Completo:"
            placeholder="Dafe da Silva"
            register={register}
            error={errors.nome}
          />
          <Input<CreateRegisterFormData>
            id="usuario"
            label="Nome de Usuário:"
            type="text"
            placeholder="DafeSilva123"
            register={register}
            error={errors.usuario}
          />
          <Input<CreateRegisterFormData>
            id="email"
            label="E-mail:"
            type="text"
            placeholder="dafe@gmail.com"
            register={register}
            error={errors.email}
          />
          <Input<CreateRegisterFormData>
            id="instituicao"
            label="Intituição de Ensino:"
            type="text"
            placeholder="Etec de Guarulhos"
            register={register}
            error={errors.instituicao}
          />

          {/* Campos Específicos */}
          {role === 'student' ? (
            <div className="flex flex-col sm:flex-row gap-5">
              <Select<CreateRegisterFormData>
                id="curso"
                label="Curso:"
                register={register}
                error={errors.curso}
                selectOptions={cursoOptions}
              />
              <Select<CreateRegisterFormData>
                id="modulo"
                label="Ano Escolar:"
                register={register}
                error={errors.modulo}
                selectOptions={moduloOptions}
              />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-5">
              <Input<CreateRegisterFormData>
                id="matricula"
                label="Matrícula:"
                type="text"
                placeholder="86532"
                register={register}
                error={errors.matricula}
              />
              <Select<CreateRegisterFormData>
                id="periodo"
                label="Período:"
                register={register}
                error={errors.periodo}
                selectOptions={periodoOptions}
              />
            </div>
          )}

          {/* Senhas */}
          <Input<CreateRegisterFormData>
            id="senha"
            label="Senha:"
            type="password"
            placeholder="***********"
            register={register}
            error={errors.senha}
          />
          <Input<CreateRegisterFormData>
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
              value="Cadastrar-se"
              className="cursor-pointer bg-azure-primary text-lg sm:text-2xl font-bold text-white mx-4 sm:mx-20 py-3 sm:py-4 rounded-tr-xl rounded-bl-xl"
            />
          </div>
        </form>
      </div>
    </AnimatedContent>
  );
}
