'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatedContent } from '@/global/animations/animatedContent';
import Link from 'next/link';
import { FormFilter } from '../form-filter';
import { StoredForm } from '@/types/form';
import { FilteredFormsList } from '../filtered-forms-list';

export function FormsPageData() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [storedForms, setStoredForms] = useState<StoredForm[]>([]);

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

        <section className="flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between items-center p-6 sm:p-10 mx-10 sm:mx-8">
          <h1 className="text-2xl sm:text-5xl text-azure-secondary font-semibold">Formulários</h1>
          <div className="flex gap-8">
            <Link href={'/forms-page/create-form'}>
              <button className="btn-dafe btn-dafe-hover px-6 sm:px-12 py-2 text-xl font-bold text-white whitespace-nowrap">
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

        {filteredForms.length === 0 && <p className="text-center">Nenhum Formulário encontrado.</p>}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-12 sm:mx-28">
          <FilteredFormsList filteredForms={filteredForms}/>
        </section>
      </div>
    </AnimatedContent>
  );
}
