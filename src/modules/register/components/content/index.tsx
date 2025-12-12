'use client';
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
import { createUser } from '@/libs/services/users/userService';
import Image from 'next/image';
import { EnterInput } from '@/global/components/FormComponents/EnterFormInput';
import { instituicaoOptions } from '@/global/constants/instituicao-options';

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
              modulo: moduloMapping[data.modulo],
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

      router.push('/login');
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
          className="flex flex-col gap-2 rounded-2xl shadow-2xl mx-auto w-full max-w-screen-sm sm:w-[50rem] my-10  py-10 sm:py-10"
        >
          <div className="flex items-center">
            <Image
              src="/icons/dafe-logo.svg"
              alt="Logo do DAFE"
              width={180}
              height={100}
              className="h-auto max-h-[9rem] w-auto"
              priority
            />
            <h2 className="text-xl sm:text-3xl text-azure-primary font-semibold pb-5">Registrar-se</h2>
          </div>

          <section className='px-6 sm:px-10 flex flex-col gap-5 '>
            <section className="flex-col justify-center mx-auto">
              <h3 className="text-center">Quem você é?</h3>
              <div className="flex gap-4 py-2">
                <button
                  type="button"
                  className={`text-xl px-2 ${role === 'student' ? 'btn-dafe text-white' : 'cursor-pointer text-azure-primary'}`}
                  onClick={() => handleRoleChange('student')}
                >
                  Sou aluno
                </button>
                <button
                  type="button"
                  className={`text-xl px-2 ${role === 'professor' ? 'btn-dafe text-white' : 'cursor-pointer text-azure-primary'}`}
                  onClick={() => handleRoleChange('professor')}
                >
                  Sou professor
                </button>
              </div>
            </section>

            {/* Campos Comuns */}
            <EnterInput<CreateRegisterFormData>
              id="nome"
              type="text"
              placeholder="Nome Completo:"
              register={register}
              error={errors.nome}
            />
            <EnterInput<CreateRegisterFormData>
              id="usuario"
              type="text"
              placeholder="Nome de Usuário:"
              register={register}
              error={errors.usuario}
            />
            <EnterInput<CreateRegisterFormData>
              id="email"
              type="text"
              placeholder="E-mail:"
              register={register}
              error={errors.email}
            />
            <Select<CreateRegisterFormData>
              id="instituicao"
              label="Instituição:"
              register={register}
              error={errors.instituicao}
              selectOptions={instituicaoOptions}
            />

            <div className=' ml-0 px-6 sm:px-0 sm:ml-8'>
              {role === 'student' && (
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
              )}
            </div>
            {role === 'professor' && (
              <>
                <EnterInput<CreateRegisterFormData>
                  id="matricula"
                  type="text"
                  placeholder="Matrícula:"
                  maxlength={5}
                  register={register}
                  error={errors.matricula}
                />
                <div className='flex pl-6'>
                  <Select<CreateRegisterFormData>
                    id="periodo"
                    label="Período:"
                    register={register}
                    error={errors.periodo}
                    selectOptions={periodoOptions}
                  />
                </div>
              </>
            )}

            <EnterInput<CreateRegisterFormData>
              id="senha"
              type="password"
              placeholder="Senha:"
              register={register}
              error={errors.senha}
            />
            <EnterInput<CreateRegisterFormData>
              id="confirmarSenha"
              type="password"
              placeholder="Confirmar Senha:"
              register={register}
              error={errors.confirmarSenha}
            />

            <div className="flex flex-col justify-center pt-4">
              <input
                type="submit"
                value="Cadastrar-se"
                className="btn-dafe btn-dafe-hover text-base sm:text-2xl text-white px-6 py-3 mx-5 sm:mx-25"
              />
            </div>
          </section>
        </form>
      </div>
    </AnimatedContent>
  );
}
