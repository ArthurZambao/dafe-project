'use client';

import { Input } from '@/global/components/FormComponents/FormInput';
import { CreateLoginFormData, createLoginFormSchema } from '../../schemas/create-login-form-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/global/components/FormComponents/CheckBoxInput';
import Link from 'next/link';
import { useLogin } from '@/hooks/useLogin';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { FadeInUp } from '@/global/animations/fadeInUp';
import Image from 'next/image';

export function LoginData() {
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
    <AnimatedContent inverse>
      <div className="bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat px-6 sm:px-0 flex flex-col items-center justify-center min-h-screen z-0">
        <h1 className="text-2xl sm:text-4xl text-center font-bold text-azure-footer">
          Entrar na sua conta
        </h1>
        <FadeInUp>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" bg-white flex flex-col gap-5 border-2 border-azure-primary rounded-2xl sm:mx-auto w-full sm:w-[40rem] my-10 px-10 sm:px-5 pt-20"
          >
            <Image
              src="/icons/dafe-logo.svg"
              alt="Logo do DAFE"
              width={180}
              height={100}
              className="h-auto max-h-[9rem] w-auto"
              priority
            />

            <Input<CreateLoginFormData>
              id="email"
              type="text"
              label="E-mail:"
              placeholder="exemplo@gmail.com"
              register={register}
              error={errors.email}
            />

            <Input<CreateLoginFormData>
              id="senha"
              label="Senha:"
              type="password"
              placeholder="**********"
              showPasswordToggle={true}
              register={register}
              error={errors.senha}
            />

            <p className="pl-2 text-sm cursor-pointer hover:underline text-azure-primary">
              Esqueci minha senha
            </p>

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
              <div className="text-center mt-10 text-[#1363B9] pt-0 sm:pt-8 pb-6">
                <Link href="/register">
                  <p className="hover:underline">
                    Não possui Cadastro?{' '}
                    <span className="text-azure-primary underline">Registre-se!</span>
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </FadeInUp>
      </div>
    </AnimatedContent>
  );
}
