'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { FormFilter } from '../form-filter';
import { StoredForm } from '@/types/form';

export function FormsPageData() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [storedForms, setStoredForms] = useState<StoredForm[]>([]);

  // Carrega dados do localStorage no carregamento do componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('finalData');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setStoredForms(parsed);
          }
        } catch (e) {
          console.error('Erro ao ler os formulários do localStorage:', e);
        }
      }
    }
  }, []);

  const filterOptions = useMemo(() => {
    const meses = storedForms.map((form) => {
      const date = new Date(form.data_final || form.createdAt || Date.now());
      return date.toLocaleString('pt-BR', { month: 'long' });
    });
    return [...new Set(meses)];
  }, [storedForms]);

  const filteredForms = useMemo(() => {
    if (!selectedFilter) return storedForms;

    return storedForms.filter((form) => {
      const date = new Date(form.data_final || form.createdAt || Date.now());
      const mes = date.toLocaleString('pt-BR', { month: 'long' });
      return mes === selectedFilter;
    });
  }, [selectedFilter, storedForms]);

  return (
    <AnimatedContent inverse>
      <div className="min-h-screen">
        <section className="flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between items-center py-10 sm:p-10 mx-6 sm:mx-10">
          <h1 className="text-3xl sm:text-5xl font-semibold text-azure-secondary">Formulários</h1>
          <div className="flex gap-8">
            <Link href={'/forms-page/create-form'}>
              <button className="btn-dafe btn-dafe-hover px-4 sm:px-12 py-2 text-xl font-bold text-white whitespace-nowrap">
                Criar Formulário
              </button>
            </Link>
            <FormFilter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              filterOptions={filterOptions}
            />
          </div>
        </section>

        {filteredForms.length === 0 && <p className=" text-sm sm:text-base text-slate-gray text-center">Nenhum Formulário encontrado.</p>}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-12 sm:mx-24">
          {filteredForms.map((form) => (
            <Link
              onClick={() => {
                console.log(form);
              }}
              href={`/forms-page/${form.id}`}
              key={form.id}
            >
              <div className="flex flex-col border-1 border-azure-primary rounded-3xl p-8 hover:bg-gray-300 transition-colors duration-300">
                <div className="flex justify-between gap-6">
                  <h2 className="text-xl sm:text-3xl mb-2 sm:truncate break-words">
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
      </div>
    </AnimatedContent>
  );
}
