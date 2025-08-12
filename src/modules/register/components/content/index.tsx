'use client';

import { Input } from '@/global/components/FormComponents/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  CreateRegisterFormData,
  createRegisterFormSchema,
} from '../../schemas/create-register-form-schema';
import { Select } from '@/global/components/FormComponents/FormSelect';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { cursoOptions } from '@/global/constants/curso-options';
import { moduloOptions } from '@/global/constants/modulo-options';
import { api } from '@/libs/api/axios';
import { useEffect, useState } from 'react';

export function RegisterPageData() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'professor'>('student');

  const {
    register,
    formState: { errors },
    handleSubmit,
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

  const onSubmit = async (data: CreateRegisterFormData) => {
    const moduloMapping: { [key: string]: number } = {
      '1º ano': 1,
      '2º ano': 2,
      '3º ano': 3,
    };

    let finalData;

    if (data.role === 'student') {
      finalData = {
        nome: data.nome,
        usuario: data.usuario,
        email: data.email,
        instituicao: data.instituicao,
        role: data.role,
        senha: data.senha,
        studentDetails: {
          curso: data.curso,
          modulo: moduloMapping[data.modulo] as number,
        },
      };
    } else {
      // Para o professor, o objeto studentDetails não é necessário
      finalData = {
        nome: data.nome,
        usuario: data.usuario,
        email: data.email,
        instituicao: data.instituicao,
        role: data.role,
        senha: data.senha,
      };
    }

    try {
      await api.post('/users', finalData);

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
            <div className="text-center mt-4 text-azure-primary">
              <Link href="/login">
                <p className="hover:underline">Já possui Cadastro? Entre por aqui</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AnimatedContent>
  );
}
