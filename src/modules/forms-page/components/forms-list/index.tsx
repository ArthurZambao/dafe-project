import { StoredForm } from '@/types/form';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface FormListProps {
  filteredForms: StoredForm[];
}

export function FormsList({ filteredForms }: FormListProps) {
  if (filteredForms.length === 0) {
    return (
      <p className="text-sm sm:text-base text-slate-gray text-center">
        Nenhum Formulário encontrado.
      </p>
    );
  }
  console.log(filteredForms);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-12 sm:mx-24">
      {filteredForms.map((form) => (
        <Link href={`/forms-page/${form._id}`} key={form._id}>
          <div className="flex flex-col border-1 border-azure-primary rounded-3xl p-8 hover:bg-gray-300 transition-colors duration-300">
            <div className="flex-col sm:flex justify-between gap-4 md:gap-6">
              <h2 className="text-lg sm:text-3xl sm:truncate break-words">
                {form.formTitulo || 'Sem título'}
              </h2>
              <p className="text-xs mb-4 font-semibold">
                {form.data_final || new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-slate-gray text-xs sm:text-sm break-words">
                {form.formDesc || 'Sem descrição'}
              </p>
              <p className="flex text-xs sm:text-sm items-center gap-0 sm:gap-2">
                <MessageSquare size={16} /> {form.respostasCount || 0}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
