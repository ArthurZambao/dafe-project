'use client';

import { useAuth } from '@/global/context/useAuth';
import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export function NoticesFilterCard() {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-azure-secondary">Notícias</h2>

      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <input
          type="text"
          placeholder="Pesquisar notícias:"
          className="border border-azure-primary rounded-full px-4 py-2 w-[250px] outline-none"
        />
        <button className="p-2">
          <SlidersHorizontal className="text-azure-primary" />
        </button>

        {user.role !== 'student' && (
          <Link href={'/notices-page/create-notices'}>
            <button className="btn-dafe btn-dafe-hover text-white px-2 sm:px-4 py-2">
              Criar Notícias
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
