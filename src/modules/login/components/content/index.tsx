import { Input } from '@/global/components/FormComponents/FormInput';
import { CreateLoginFormData, createLoginFormSchema } from '../../schemas/create-login-form-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/global/components/FormComponents/CheckBoxInput';
import Link from 'next/link';
import { useState } from 'react';

export function LoginData() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateLoginFormData>({
    resolver: zodResolver(createLoginFormSchema),
  });

  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (data: CreateLoginFormData) => {
    try {
      // TODO: Fazer chamada para a API
      console.log(data);
      setSuccessMessage('Login com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
    reset();
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="px-6 sm:px-0 flex items-center justify-center min-h-screen">
      {successMessage && (
        <p className="text-center text-green-600 font-semibold text-lg mb-4">{successMessage}</p>
      )}

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
          id="password"
          label="Senha:"
          type="password"
          placeholder="**********"
          register={register}
          error={errors.password}
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
            value="Entrar"
            className="cursor-pointer bg-[#007BFF] text-xl sm:text-3xl font-bold text-white mx-8 sm:mx-20 py-4 rounded-tr-xl rounded-bl-xl"
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
  );
}
