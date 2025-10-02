import { useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { CreateFormDataSchema, createFormSchema } from '../schemas/create-form-schema';
import { createForm } from '@/libs/services/forms/formService';


export function useCreateForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const [questionsOption, setQuestionsOption] = useState<
    'MÚLTIPLA_ESCOLHA' | 'ESCOLHA_ÚNICA' | 'DISSERTATIVA'
  >('MÚLTIPLA_ESCOLHA');

  const { register, control, watch, handleSubmit, reset } = useForm<CreateFormDataSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues: { perguntas: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'perguntas',
  });

  const perguntas = watch('perguntas') ?? [];

  const onSubmit = (data: CreateFormDataSchema) => {
    createForm(data);
    console.log('Final data saved:', data);
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

  return {
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
  };
}
