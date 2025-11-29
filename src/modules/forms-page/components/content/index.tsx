'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { StoredForm } from '@/types/form';
import { FormsList } from '../forms-list';
import { FilterCard } from '../filter-card';
import { getForms, getAnsweredFormIds } from '@/libs/services/forms/formService';

interface FormWithStatus extends StoredForm {
  hasResponded: boolean;
}

export function FormsPageData() {
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'answered' | 'unanswered' | string | null
  >('all');
  const [storedForms, setStoredForms] = useState<StoredForm[]>([]);
  const [answeredFormIds, setAnsweredFormIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadAllFormsData() {
      try {
        const [formsData, answeredIdsData] = await Promise.all([getForms(), getAnsweredFormIds()]);
        setStoredForms(formsData);
        setAnsweredFormIds(answeredIdsData);
      } catch (e) {
        console.error('Erro ao carregar dados do backend:', e);
      }
    }
    loadAllFormsData();
  }, []);

  const formsWithStatus = useMemo((): FormWithStatus[] => {
    return storedForms.map((form) => ({
      ...form,
      hasResponded: answeredFormIds.includes(form._id.toString()),
    }));
  }, [storedForms, answeredFormIds]);

  const filterOptions = useMemo(() => {
    const meses = storedForms.map((form) => {
      const date = new Date(form.data_final || form.createdAt || Date.now());
      return date.toLocaleString('pt-BR', { month: 'long' });
    });
    return [...new Set(meses)];
  }, [storedForms]);

  const filteredForms = useMemo(() => {
    let list = formsWithStatus;

    if (
      typeof selectedFilter === 'string' &&
      selectedFilter !== 'all' &&
      selectedFilter !== 'answered' &&
      selectedFilter !== 'unanswered'
    ) {
      list = list.filter((form) => {
        const date = new Date(form.data_final || form.createdAt || Date.now());
        const mes = date.toLocaleString('pt-BR', { month: 'long' });
        return mes === selectedFilter;
      });
    }
    if (selectedFilter === 'answered') {
      return list.filter((form) => form.hasResponded);
    }
    if (selectedFilter === 'unanswered') {
      return list.filter((form) => !form.hasResponded);
    }

    return list;
  }, [selectedFilter, formsWithStatus]);

  return (
    <AnimatedContent inverse>
           {' '}
      <div className="min-h-screen">
        {' '}
        <FilterCard
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterOptions={filterOptions}
        />
                <FormsList filteredForms={filteredForms} />     {' '}
      </div>
         {' '}
    </AnimatedContent>
  );
}
