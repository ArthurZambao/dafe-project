'use client';
import { useRouter } from 'next/navigation';
import { useNoticesList } from '../../hooks/useNoticesList';
import { useLazyLoadList } from '@/hooks/useLazyLoading';

export function NoticesList() {
  const { notices, isLoading, error } = useNoticesList();
  const router = useRouter();

  const { visibleItems, loadMoreRef } = useLazyLoadList(notices, 6);

  if (isLoading) {
    return <p className="text-center text-slate-gray mt-10">Carregando notícias...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  console.log(notices);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-2 mx-5 sm:mx-20">
        {notices.length === 0 ? (
          <p className="col-span-full text-center text-slate-gray mt-10">
            Nenhuma notícia encontrada.
          </p>
        ) : (
          visibleItems.map((notice, index) => {
            const fallbackImage =
              index % 2 === 0 ? '/svgs/news-image-example.svg' : '/svgs/news-image-example-2.svg';

            const bgImage = notice.imageUrl || fallbackImage;

            return (
              <div
                key={notice._id}
                onClick={() => {
                  router.push(`/notices-page/${notice.slugify}`);
                }}
                style={{
                  backgroundImage: `url(${bgImage})`,
                }}
                className={`relative bg-cover bg-center bg-no-repeat overflow-hidden cursor-pointer rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow
                ${
                  index % 3 === 0
                    ? 'col-span-1 sm:col-span-2 row-span-2 h-[32rem] sm:h-[44rem]'
                    : 'h-[20rem] sm:h-[28rem]'
                }`}
              >
                <section className="flex flex-col gap-2">
                  <p className="absolute top-4 left-4 text-white text-xs sm:text-sm z-10 font-medium bg-black/30 px-2 py-1 rounded">
                    Feito por: <span className="font-semibold">{notice.autor.usuario}</span>
                  </p>
                  <p className="absolute top-12 left-4 text-white text-xs sm:text-sm z-10 font-medium bg-black/30 px-2 py-1 rounded">
                    Para: {notice.moduloDestino ? `${notice.moduloDestino}º` : ''}{' '}
                    {notice.cursoDestino ? notice.cursoDestino : 'Todos os Cursos'}
                  </p>
                </section>

                <div className="absolute inset-0 bg-black/30 z-0 transition-opacity hover:bg-black/40"></div>

                <div className="absolute bottom-0 w-full bg-white bg-opacity-90 text-black p-4 z-10">
                  <h3 className="text-sm sm:text-lg font-bold pb-1 line-clamp-2">
                    {notice.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm line-clamp-2">{notice.descricao}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={loadMoreRef} className="h-10"></div>
      </div>
    </>
  );
}
