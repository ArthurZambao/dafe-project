'use client';

import { getNotices } from '@/libs/services/notices/noticesService';
import { NoticeFromAPI } from '@/types/notices';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function NewsPageData({ newsId }: { newsId: string }) {
  const [news, setNews] = useState<NoticeFromAPI | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await getNotices();
        setNews(response.find((n) => n._id === newsId) || null);
      } catch (error) {
        console.error('Erro ao buscar notícia:', error);
      }
    }
    fetchNews();
  }, [newsId]);

  if (!news) {
    return <div>Carregando...</div>;
  }
  return (
    <section className="min-h-screen">
      <Link href="/notices-page" className="inline-flex">
        <h2 className="inline-flex gap-2 pl-4 sm:pl-6 md:pl-10 pb-6 sm:pb-10 pt-0 sm:pt-10 items-center text-2xl sm:text-3xl font-semibold text-azure-secondary hover:text-azure-footer transition-colors duration-300">
          <ArrowLeft /> Formulários
        </h2>
      </Link>

      <div className="w-full bg-slate-gray relative flex items-end h-72 sm:h-96 md:h-[30rem]">
        <p className="absolute top-4 left-4 text-white text-xs sm:text-sm">
          Publicado por: {news.autor.usuario}
        </p>

        <div className="ml-4 sm:ml-10 my-10 sm:my-20 pl-2 border-l-8 border-azure-primary">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold">
            {news.titulo}
          </h2>
          <h3>
            <span className="text-sm sm:text-lg text-white">{news.descricao}</span>
          </h3>
        </div>
      </div>

      <div className="max-w-4xl sm:max-w-5xl md:max-w-7xl mx-auto p-4 sm:p-10 space-y-6 overflow-x-auto">
        <p className="whitespace-pre-line break-words text-justify text-sm sm:text-base">
          {news.conteudo}
        </p>
      </div>
    </section>
  );
}
