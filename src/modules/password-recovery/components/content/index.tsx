'use client';

import { Input } from '@/global/components/FormComponents/FormInput';
import { PasswordRecoveryFormData } from '../../schemas/password-recovery-schema';
import { usePasswordRecovery } from '../../hooks/usePasswordRecovery';
import Image from 'next/image';

export function PasswordRecoveryPageData() {
  const { register, handleSubmit, onSubmit, errors } = usePasswordRecovery();

  return (
    <section className="min-h-screen flex items-center justify-center bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col gap-5 rounded-lg shadow-lg sm:mx-auto w-full sm:w-[50rem] my-20 pt-6"
      >
        <div className="flex items-center px-6">
          <Image
            src="/icons/dafe-logo.svg"
            alt="Logo"
            width={180}
            height={100}
            className="h-auto max-h-[9rem] w-auto"
            priority
          />
          <h2 className="text-2xl sm:text-3xl text-azure-primary font-semibold pb-5">
            Esqueci a Senha
          </h2>
        </div>

        <section className="flex flex-col gap-6 px-6 mx-14 sm:mx-30">
          <p className="text-sm text-slate-gray">Insira seu e-mail para recuperar a senha</p>

          <Input<PasswordRecoveryFormData>
            id="email"
            type="text"
            maxlength={50}
            placeholder="Seu E-mail:"
            register={register}
            error={errors.email}
          />

          <div className="flex flex-col justify-center py-4">
            <input
              type="submit"
              value="Enviar"
              className="cursor-pointer btn-dafe btn-dafe-hover text-white text-lg sm:text-xl font-bold mx-14 sm:mx-35 py-4 transition-opacity"
            />
          </div>
        </section>
      </form>
    </section>
  );
}
