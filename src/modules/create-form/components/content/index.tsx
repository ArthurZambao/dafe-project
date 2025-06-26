'use client';

import { useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CirclePlus } from 'lucide-react';
import { CreateFormDataSchema, createFormSchema } from '../../schemas/create-form-schema';
import { CreateFormInput, CreateFormTextarea } from '../form-inputs-components';
import { FadeInUp } from '@/global/animations/fadeInUp';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { useRouter } from 'next/navigation';
import { FieldArray } from '../field-array';
import Link from 'next/link';

export function CreateFormData() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const [questionsOption, setQuestionsOption] = useState<
    'MÚLTIPLA_ESCOLHA' | 'ESCOLHA_ÚNICA' | 'DISSERTATIVA'
  >('MÚLTIPLA_ESCOLHA');

  const { register, control, watch, handleSubmit, reset } = useForm<CreateFormDataSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      perguntas: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'perguntas',
  });

  const perguntas = watch('perguntas') ?? [];

  // Função de Enivar, posteriormente, dar o POST aqui !!
  const onSubmit = (data: CreateFormDataSchema) => {
    const stored = localStorage.getItem('finalData');
    const parsed = stored ? JSON.parse(stored) : [];

    const newForm = {
      id: crypto.randomUUID(),
      ...data,
    };

    const updated = [...parsed, newForm];
    localStorage.setItem('finalData', JSON.stringify(updated));

    console.log('Final data saved:', updated);
    reset();
    router.push('/forms-page');
  };

  const handleClick = () => {
    if (questionsOption === 'MÚLTIPLA_ESCOLHA') {
      append({
        tipo: 'MÚLTIPLA_ESCOLHA',
        titulo: '',
        enunciado: '',
        obrigatoria: false,
        opcoes: Array.from({ length: 5 }, () => ({ label: '', checked: false })),
      });
    } else if (questionsOption === 'ESCOLHA_ÚNICA') {
      append({
        tipo: 'ESCOLHA_ÚNICA',
        titulo: '',
        enunciado: '',
        obrigatoria: false,
        resposta: 0,
        opcoes: Array.from({ length: 5 }, () => ({ label: '' })),
      });
    } else {
      append({
        tipo: 'DISSERTATIVA',
        titulo: '',
        enunciado: '',
        obrigatoria: false,
        resposta: '',
      });
    }
  };

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat">
      <AnimatedContent inverse>
        <section className="flex justify-between items-center pb-10 mx-0 sm:mx-10">
          <Link href="/forms-page" className="inline-flex">
            <h1 className="inline-flex gap-2 items-center text-3xl font-semibold text-azure-secondary hover:text-azure-footer transition-colors duration-300">
              <ArrowLeft /> Formulários
            </h1>
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
            />
            <CreateFormTextarea
              rows={1}
              register={register}
              name="formDesc"
              placeholder="Descrição"
            />

            <FieldArray fields={fields} register={register} remove={remove} perguntas={perguntas} />

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
      </AnimatedContent>
    </div>
  );
}
