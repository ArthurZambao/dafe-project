'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { StoredForm } from '@/types/form';
import { FormsList } from '../forms-list';
import { FilterCard } from '../filter-card';
import { getForms } from '@/libs/services/forms/formService';


export function FormsPageData() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [storedForms, setStoredForms] = useState<StoredForm[]>([]);

  useEffect(() => {
    getForms()
      .then(setStoredForms)
      .catch((e) => console.error('Erro ao carregar formulários do backend:', e));
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
        <FilterCard
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterOptions={filterOptions}
        />
        <FormsList filteredForms={filteredForms} />
      </div>
    </AnimatedContent>
  );
}
