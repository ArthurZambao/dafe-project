'use client';

import { CirclePlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FadeInUp } from '@/global/animations/fadeInUp';
import { CreateFormInput, CreateFormTextarea } from '../form-inputs-components';
import { FieldArray } from '../field-array';
import { useCreateForm } from '../../hooks/useCreateForm';

export function CreateForm() {
  const {
    formRef,
    register,
    handleSubmit,
    onSubmit,
    fields,
    remove,
    perguntas,
    questionsOption,
    setQuestionsOption,
    handleClick,
    formState: { errors },
  } = useCreateForm();

  return (
    <>
      <section className="flex justify-between items-center pb-10 mx-0 sm:mx-10">
        <Link href="/forms-page" className="inline-flex">
          <h2 className="inline-flex gap-2 items-center text-3xl font-semibold text-azure-secondary hover:text-azure-footer transition-colors duration-300">
            <ArrowLeft /> Formulários
          </h2>
        </Link>
        <button
          onClick={() => formRef.current?.requestSubmit()}
          className="btn-dafe btn-dafe-hover text-white px-2 sm:px-4 py-2"
        >
          Publicar Formulário
        </button>
      </section>

      <FadeInUp delay={0.1}>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-white p-10 rounded-2xl mx-0 sm:mx-10"
        >
          <CreateFormInput
            isFormHeader={true}
            register={register}
            name="formTitulo"
            placeholder="Título do Formulário"
            error={errors.formTitulo}
          />

          <CreateFormTextarea
            rows={1}
            register={register}
            name="formDesc"
            placeholder="Descrição"
            error={errors.formDesc}
          />

          <FieldArray fields={fields} register={register} remove={remove} perguntas={perguntas} errors={errors} />

          <div className="flex pl-26 gap-4 justify-center items-center">
            <button type="button" onClick={handleClick} className="flex justify-center">
              <CirclePlus
                size={30}
                className="cursor-pointer text-azure-primary hover:text-azure-secondary transition-colors duration-300"
              />
            </button>
            <select
              value={questionsOption}
              onChange={(e) => setQuestionsOption(e.target.value as typeof questionsOption)}
              className="border rounded-3xl p-2"
            >
              <option value="MÚLTIPLA_ESCOLHA">Múltipla Escolha</option>
              <option value="ESCOLHA_ÚNICA">Escolha Única</option>
              <option value="DISSERTATIVA">Dissertativa</option>
            </select>
          </div>
        </form>
      </FadeInUp>
    </>
  );
}
