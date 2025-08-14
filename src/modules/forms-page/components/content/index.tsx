'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { StoredForm } from '@/types/form';
import { FormsList } from '../forms-list';
import { FilterCard } from '../filter-card';

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
