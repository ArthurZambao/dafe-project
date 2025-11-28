import Link from 'next/link';
import { FormFilter } from '../form-filter';
import { useAuth } from '@/global/context/useAuth';

interface FilterCardProps {
  selectedFilter: string | null;
  setSelectedFilter: (filter: string | null) => void;
  filterOptions: string[];
}

export function FilterCard({ selectedFilter, setSelectedFilter, filterOptions }: FilterCardProps) {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <section className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center pt-10 pb-20 px-10 mx-6 sm:mx-10">
      <h2 className="text-3xl sm:text-5xl font-semibold text-azure-secondary">Formulários</h2>
      <div className="flex gap-8">
        {user.role !== 'student'  && (
          <Link href={'/forms-page/create-form'}>
            <button className="btn-dafe btn-dafe-hover px-4 sm:px-12 py-2 text-xl font-bold text-white whitespace-nowrap">
              Criar Formulário
            </button>
          </Link>
        )}
        <FormFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterOptions={filterOptions}
        />
      </div>
    </section>
    
  );
}
