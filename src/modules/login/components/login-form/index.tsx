'use client';

import { FadeInUp } from '@/global/animations/fadeInUp';
import { Checkbox } from '@/global/components/FormComponents/CheckBoxInput';
import Image from 'next/image';
import Link from 'next/link';
import { CreateLoginFormData, createLoginFormSchema } from '../../schemas/create-login-form-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/useLogin';
import { EnterInput } from '@/global/components/FormComponents/EnterFormInput';

export function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateLoginFormData>({
    resolver: zodResolver(createLoginFormSchema),
  });

  const { login, isSubmitting } = useLogin();

  const onSubmit = (data: CreateLoginFormData) => {
    login(data, reset);
  };

  return (
    <FadeInUp>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col gap-5 rounded-lg shadow-lg sm:mx-auto w-full sm:w-[40rem] my-10 pt-6"
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
          <h2 className="text-2xl sm:text-3xl text-azure-primary font-semibold pb-5">Login</h2>
        </div>

        <section className="flex flex-col gap-6 px-10 sm:px-30">
          <EnterInput<CreateLoginFormData>
            id="email"
            type="text"
            label="E-mail:"
            placeholder="exemplo@gmail.com"
            register={register}
            error={errors.email}
          />

          <EnterInput<CreateLoginFormData>
            id="senha"
            label="Senha:"
            type="password"
            placeholder="**********"
            showPasswordToggle={true}
            register={register}
            error={errors.senha}
          />

          <div className="mx-auto py-4">
            <Checkbox<CreateLoginFormData>
              id="lembrar"
              label="Continuar conectado"
              register={register}
              error={errors.lembrar}
            />
          </div>
          <div className="flex flex-col justify-center pt-0 sm:pt-4">
            <input
              type="submit"
              value={isSubmitting ? 'Entrando...' : 'Entrar'}
              disabled={isSubmitting}
              className={`cursor-pointer btn-dafe btn-dafe-hover text-white text-xl sm:text-3xl font-bold mx-10 sm:mx-24 py-4 transition-opacity ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            />
            <div className="text-center text-sm sm:text-base mt-10 text-[#1363B9] pt-0 sm:pt-8 pb-6">
              <Link href="/register">
                <p>
                  Não possui Cadastro?{' '}
                  <span className="text-azure-primary underline">Registre-se!</span>
                </p>
              </Link>
            </div>
          </div>
        </section>
      </form>
    </FadeInUp>
  );
}
