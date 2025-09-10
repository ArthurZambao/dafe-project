
'use client';

import { useEffect, useState } from 'react';
import { getNotices } from '@/libs/services/notices/noticesService';
import { NoticeFromAPI } from '@/types/notices';

export function NoticesList() {
  const [notices, setNotices] = useState<NoticeFromAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotices();
        setNotices(data);
      } catch (err) {
        setError('Não foi possível carregar as notícias. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []); 

  if (isLoading) {
    return <p className="text-center text-slate-gray mt-10">Carregando notícias...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[600px] overflow-y-scroll pr-2">
      {notices.length === 0 ? (
        <p className="col-span-full text-center text-slate-gray mt-10">Nenhuma notícia encontrada.</p>
      ) : (
        notices.map((notice, index) => (
          <div
            key={notice._id} // Use o _id do banco de dados como chave
            className={`
              relative bg-gray-200 overflow-hidden cursor-pointer
              ${index % 3 === 0 ? 'col-span-1 sm:col-span-2 row-span-2 h-[32rem] sm:h-[44rem]' : 'h-[20rem] sm:h-[28rem]'}
            `}
          >
            <div className="absolute bottom-0 w-full bg-white bg-opacity-70 text-black p-4 z-10">
              {/* ATENÇÃO: Os nomes dos campos mudaram para corresponder ao backend */}
              <h3 className="text-sm sm:text-lg font-bold pb-1">{notice.titulo}</h3>
              <p className="text-xs sm:text-sm">{notice.descricao}</p>
            </div>
            <span className="absolute bottom-2 right-2 text-[10px] sm:text-xs bg-white bg-opacity-80 text-black px-2 rounded">
              Postado dia: {new Date(notice.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        ))
      )}
    </div>
  );
}