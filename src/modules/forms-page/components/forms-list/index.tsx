'use client';

import { useAuth } from '@/global/context/useAuth';
import { StoredForm } from '@/types/form';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FormWithStatus extends StoredForm {
  hasResponded: boolean;
}

interface FormListProps {
  filteredForms: FormWithStatus[];
}

export function FormsList({ filteredForms }: FormListProps) {
  const { user } = useAuth();

  if (filteredForms.length === 0) {
    return (
      <p className="text-sm sm:text-base text-slate-gray text-center">
        Nenhum Formulário encontrado.
      </p>
    );
  }

  if (!user) return null;
  return (
    <section className="flex flex-col gap-16 mx-12 sm:mx-24 pb-10 select-none">
      {filteredForms.map((form) => {
        const CardContent = (
          <div
            className={`flex flex-col rounded-lg shadow-lg ${
              form.hasResponded ? '' : 'hover:shadow-2xl'
            } transition-shadow duration-300 ${
              form.hasResponded ? 'opacity-60' : 'cursor-pointer'
            }`}
          >
            <div className="w-full h-40 bg-gray-300 rounded-t-lg relative overflow-hidden">
              <Image
                src={form.hasResponded ? '/svgs/image-example-sad.svg' : '/svgs/image-example.svg'}
                alt="Imagem do Forms"
                fill
                className="object-cover"
              />
            </div>

            <section className="flex flex-col mx-2 sm:mx-10 my-2 sm:my-4 pl-2 border-l-2 border-azure-primary">
              <div className="flex justify-between">
                <div className="flex-col sm:flex justify-between w-full">
                  <div className="flex justify-between">
                    <h2 className="text-lg sm:text-3xl font-semibold text-azure-primary sm:truncate break-words">
                      {form.formTitulo || 'Sem título'}
                    </h2>
                    {user.role === 'student' && (
                      <p className="text-sm sm:text-lg">
                        {form.hasResponded ? 'Respondido' : 'Não respondido'}
                      </p>
                    )}
                  </div>
                  <p className="text-black text-xs sm:text-base break-words">
                    {form.formDesc || 'Sem descrição'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <p className="text-xs font-semibold">
                  {form.createdAt
                    ? new Date(form.createdAt).toLocaleDateString('pt-BR')
                    : 'Data não informada'}
                </p>
                <p className="flex text-xs sm:text-sm items-center gap-0 sm:gap-2">
                  <MessageSquare size={16} /> {form.responsesCount}
                </p>
              </div>
            </section>
          </div>
        );

        return form.hasResponded ? (
          <div key={form._id}>{CardContent}</div>
        ) : (
          <Link href={`/forms-page/${form._id}`} key={form._id}>
            {CardContent}
          </Link>
        );
      })}
    </section>
  );
}
