'use client';

import { getNoticesByIdOrSlug } from '@/libs/services/notices/noticesService';
import { NoticeFromAPI } from '@/types/notices';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function NewsPageData({ id }: { id: string }) {
  const [news, setNews] = useState<NoticeFromAPI | null>(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const data = await getNoticesByIdOrSlug(id);
        setNews(data);
      } catch (error) {
        console.error('Erro ao buscar notícia:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
        fetchNews();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-slate-gray">Carregando notícia...</div>;
  }

  if (!news) {
    return <div className="text-center mt-10 text-red-500">Notícia não encontrada.</div>;
  }

  const bgImage = news.imageUrl || '/svgs/news-image-example.svg';

  return (
    <section className="min-h-screen pb-10">
      <Link href="/notices-page" className="inline-flex">
        <h2 className="inline-flex gap-2 pl-4 sm:pl-6 md:pl-10 pb-6 sm:pb-10 pt-0 sm:pt-10 items-center text-2xl sm:text-3xl font-semibold text-azure-secondary hover:text-azure-footer transition-colors duration-300">
          <ArrowLeft /> Voltar
        </h2>
      </Link>

      <div 
        className="w-full relative flex items-end h-72 sm:h-96 md:h-[30rem] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <p className="absolute top-4 left-4 text-white text-xs sm:text-sm z-10 font-medium bg-black/30 px-2 py-1 rounded">
          Publicado por: {news.autor.usuario}
        </p>

        <div className="relative z-10 w-full mb-10">
          <div className="ml-4 sm:ml-10 pl-4 border-l-8 border-azure-primary">
            <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-bold drop-shadow-lg">
              {news.titulo}
            </h2>
            <h3 className="mt-2">
              <span className="text-sm sm:text-xl text-gray-200 drop-shadow-md">
                {news.descricao}
              </span>
            </h3>
          </div>
        </div>
      </div>

      <div className="max-w-4xl sm:max-w-5xl md:max-w-7xl mx-auto p-4 sm:p-10 space-y-6 overflow-x-auto">
        <p className="whitespace-pre-line break-words text-justify text-slate-gray text-base sm:text-lg leading-relaxed">
          {news.conteudo}
        </p>
      </div>
    </section>
  );
}