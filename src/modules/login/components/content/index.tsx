'use client';

import { Input } from '@/global/components/FormComponents/FormInput';
import { CreateLoginFormData, createLoginFormSchema } from '../../schemas/create-login-form-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/global/components/FormComponents/CheckBoxInput';
import Link from 'next/link';
import { useLogin } from '@/hooks/useLogin';
import { AnimatedContent } from '@/global/animations/animatedContent';

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
      <div className="px-6 sm:px-0 flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 border-4 border-[#007BFF] rounded-tr-3xl rounded-bl-3xl mx-auto w-full sm:w-[40rem] my-10 px-5 py-20"
        >
          <h2 className="text-2xl sm:text-4xl text-center font-bold text-[#007BFF]">
            Entrar na sua conta
          </h2>
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

          <Checkbox<CreateLoginFormData>
            id="remember"
            label="Continuar conectado"
            register={register}
            error={errors.remember}
          />

          <div className="flex flex-col justify-center pt-4">
            <input
              type="submit"
              value={isSubmitting ? 'Entrando...' : 'Entrar'}
              disabled={isSubmitting}
              className={`cursor-pointer bg-[#007BFF] text-xl sm:text-3xl font-bold text-white mx-8 sm:mx-20 py-4 rounded-tr-xl rounded-bl-xl transition-opacity ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            />
            <div className="text-center mt-4 text-[#007BFF]">
              <Link href="/register">
                <p className="hover:underline">Não possui Cadastro? Registre-se</p>
              </Link>
              <p className="cursor-pointer hover:underline">Esqueci minha senha</p>
            </div>
          </div>
        </form>
      </div>
    </AnimatedContent>
  );
}
