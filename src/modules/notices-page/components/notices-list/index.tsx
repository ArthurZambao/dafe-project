'use client';
import { useRouter } from 'next/navigation';
import { useNoticesList } from '../../hooks/useNoticesList';

export function NoticesList() {
  const { notices, isLoading, error } = useNoticesList();
  const router = useRouter();
  if (isLoading) {
    return <p className="text-center text-slate-gray mt-10">Carregando notícias...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[600px] overflow-y-scroll pr-2">
      {notices.length === 0 ? (
        <p className="col-span-full text-center text-slate-gray mt-10">
          Nenhuma notícia encontrada.
        </p>
      ) : (
        notices.map((notice, index) => (
          <div
          onClick={() => router.push(`/notices-page/${notice._id}`)}
            key={notice._id}
            className={`
              relative bg-gray-200 overflow-hidden cursor-pointer
              ${index % 3 === 0 ? 'col-span-1 sm:col-span-2 row-span-2 h-[32rem] sm:h-[44rem]' : 'h-[20rem] sm:h-[28rem]'}
            `}
          >
            <div className="absolute bottom-0 w-full bg-white bg-opacity-70 text-black p-4 z-10">
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
