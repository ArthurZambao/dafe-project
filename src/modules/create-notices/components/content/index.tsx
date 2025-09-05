'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreateFormInput, CreateFormTextarea } from '../form-components';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CreateNoticeDataSchema, createNoticeSchema } from '../../schemas/create-notices-schema';
import { CreateNoticesHeaderCard } from '../create-notices-header-card';

export function CreateNoticesData() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  console.log('createNoticeSchema:', createNoticeSchema);

  const { register, handleSubmit, reset } = useForm<CreateNoticeDataSchema>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: {
      NoticiaTitulo: '',
      noticiaDesc: '',
      noticiaConteudo: '',
      imagem: undefined,
    },
  });

  const onSubmit = (data: CreateNoticeDataSchema) => {
    const stored = localStorage.getItem('finalDataNotices');
    const parsed = stored ? JSON.parse(stored) : [];

    const newForm = {
      id: crypto.randomUUID(),
      ...data,
    };

    const updated = [...parsed, newForm];

    localStorage.setItem('finalDataNotices', JSON.stringify(updated));

    console.log('Final data saved:', updated);
    reset();
    router.push('/notices-page');
  };

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat">
      <CreateNoticesHeaderCard formRef={formRef} />
      <section>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10 bg-white p-10 rounded-2xl mx-0 sm:mx-10"
        >
          <div className="flex justify-between">
            <section className="flex flex-col gap-8">
              <CreateFormInput
                isFormHeader={true}
                register={register}
                name="NoticiaTitulo"
                placeholder="Título da Notícia"
              />
              <CreateFormTextarea
                rows={1}
                register={register}
                name="noticiaDesc"
                placeholder="Descrição da notícia"
              />
            </section>
            {/* <CreateFormImageInput
              register={register}
              name="imagem"
              placeholder="Adicione a Imagem da Notícia"
            /> */}
          </div>
          <section>
            <CreateFormTextarea
              rows={10}
              register={register}
              name="noticiaConteudo"
              placeholder="Conteúdo da notícia"
            />
          </section>
        </form>
      </section>
    </div>
  );
}
