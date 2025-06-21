'use client';

import { useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus, Trash2 } from 'lucide-react';
import { CreateFormDataSchema, createFormSchema } from '../../schemas/create-form-schema';
import { CreateFormInput, CreateFormTextarea } from '../form-inputs-components';
import { OptionInput } from '../form-inputs-options';
import { RequiredToggle } from '@/global/components/RequiredToggle';

export function CreateFormData() {
  const formRef = useRef<HTMLFormElement | null>(null);

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

  const onSubmit = (data: CreateFormDataSchema) => {
    console.log('Final data:', data);
    reset();
  };

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat">
      <section className="flex justify-between items-center pb-10 mx-0 sm:mx-10">
        <h1 className="text-lg sm:text-3xl text-azure-secondary font-bold">Criar Formulário</h1>
        <button
          onClick={() => formRef.current?.requestSubmit()}
          className="btn-dafe btn-dafe-hover text-white px-2 sm:px-4 py-2"
        >
          Publicar Formulário
        </button>
      </section>

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
        <CreateFormTextarea rows={1} register={register} name="formDesc" placeholder="Descrição" />

        {fields.map((field, qIndex) => (
          <div key={field.id} className="py-4 border-b-2 border-azure-primary">
            <div className="flex flex-col-reverse sm:flex-row pb-4 gap-2 items-center">
              <CreateFormInput
                isFormHeader={false}
                register={register}
                name={`perguntas.${qIndex}.titulo`}
                placeholder="Título da pergunta"
              />
              <select
                {...register(`perguntas.${qIndex}.tipo` as const)}
                className="border rounded-3xl p-2"
                defaultValue={field.tipo || 'MÚLTIPLA_ESCOLHA'}
              >
                <option value="MÚLTIPLA_ESCOLHA">Múltipla Escolha</option>
                <option value="ESCOLHA_ÚNICA">Escolha Única</option>
                <option value="DISSERTATIVA">Dissertativa</option>
              </select>
            </div>

            <CreateFormTextarea
              rows={1}
              register={register}
              name={`perguntas.${qIndex}.enunciado`}
              placeholder="Enunciado da pergunta"
            />

            {['MÚLTIPLA_ESCOLHA', 'ESCOLHA_ÚNICA'].includes(perguntas?.[qIndex]?.tipo ?? '') &&
              Array.from({ length: 5 }).map((_, i) => (
                <OptionInput
                  key={i}
                  register={register}
                  index={i}
                  qIndex={qIndex}
                  type={perguntas?.[qIndex]?.tipo as 'MÚLTIPLA_ESCOLHA' | 'ESCOLHA_ÚNICA'}
                />
              ))}

            {perguntas?.[qIndex]?.tipo === 'DISSERTATIVA' && (
              <CreateFormTextarea
                rows={1}
                register={register}
                name={`perguntas.${qIndex}.resposta`}
                placeholder="Resposta dissertativa do aluno"
              />
            )}
            <div className="flex gap-2 justify-end pt-2">
              <RequiredToggle register={register} name={`perguntas.${qIndex}.obrigatoria`} />
              <button
                type="button"
                onClick={() => remove(qIndex)}
                className="cursor-pointer text-azure-primary border-l-2 border-azure-primary pl-2 hover:text-red-500 transition-colors duration-300"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              tipo: 'MÚLTIPLA_ESCOLHA',
              titulo: '',
              enunciado: '',
              obrigatoria: false,
              opcoes: Array.from({ length: 5 }, () => ({ label: '', checked: false })),
            })
          }
          className="flex justify-center"
        >
          <CirclePlus
            size={30}
            className="cursor-pointer text-azure-primary hover:text-azure-secondary transition-colors duration-300"
          />
        </button>
      </form>
    </div>
  );
}
