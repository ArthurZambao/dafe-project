import { Input } from '@/global/components/FormComponents/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  CreateRegisterFormData,
  createRegisterFormSchema,
} from '../../schemas/create-register-form-schema';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { courseOptions } from '../../constants/course-options';
import { gradeOptions } from '../../constants/grade-options';
import { useState } from 'react';

export function RegisterData() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  });

  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (data: CreateRegisterFormData) => {
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
    <div className="flex flex-col px-6 sm:px-0 items-center justify-center min-h-screen">

      {successMessage && (
        <p className="text-center text-green-600 font-semibold text-lg mb-4">{successMessage}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 border-4 border-[#007BFF] rounded-tr-3xl rounded-bl-3xl mx-auto w-full sm:w-[50rem] my-10 px-10 py-20"
      >
        <h2 className="text-2xl sm:text-4xl text-center font-bold text-[#007BFF]">Cadastrar-se</h2>
        <Input<CreateRegisterFormData>
          id="name"
          type="text"
          label="Nome Completo:"
          placeholder="Dafe da Silva"
          register={register}
          error={errors.name}
        />

        <Input<CreateRegisterFormData>
          id="username"
          label="Nome de Usuário:"
          type="text"
          placeholder="DafeSilva123"
          register={register}
          error={errors.username}
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
          id="institution"
          label="Intituição de Ensino:"
          type="text"
          placeholder="Etec de Guarulhos"
          register={register}
          error={errors.institution}
        />

        <div className="flex gap-5">
          <Select<CreateRegisterFormData>
            id="course"
            label="Curso:"
            register={register}
            error={errors.course}
            selectOptions={courseOptions}
          />

          <Select<CreateRegisterFormData>
            id="grade"
            label="Ano Escolar:"
            register={register}
            error={errors.grade}
            selectOptions={gradeOptions}
          />
        </div>

        <Input<CreateRegisterFormData>
          id="password"
          label="Senha:"
          type="password"
          placeholder="***********"
          register={register}
          error={errors.password}
        />

        <Input<CreateRegisterFormData>
          id="confirmPassword"
          label="Confirmar Senha:"
          type="password"
          placeholder="***********"
          register={register}
          error={errors.confirmPassword}
        />

        <div className="flex flex-col justify-center pt-4">
          <input
            type="submit"
            value="Cadastrar-se"
            className="cursor-pointer bg-[#007BFF] text-xl sm:text-3xl font-bold text-white mx-8 sm:mx-20 py-4 rounded-tr-xl rounded-bl-xl"
          />
          <div className="text-center mt-4 text-[#007BFF]">
            <Link href="/login">
              <p className="hover:underline">Já possui Cadastro? Entre por aqui</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
