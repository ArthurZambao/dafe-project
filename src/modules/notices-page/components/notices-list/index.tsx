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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-2 mx-5 sm:mx-20">
      {notices.length === 0 ? (
        <p className="col-span-full text-center text-slate-gray mt-10">
          Nenhuma notícia encontrada.
        </p>
      ) : (
        notices.map((notice, index) => {
          const bgImage =
            index % 2 === 0 ? '/svgs/news-image-example.svg' : '/svgs/news-image-example-2.svg';

          return (
            <div
              onClick={() => {
                router.push(`/notices-page/${notice._id}`);
                console.log(notice._id);
              }}
              key={notice._id}
              style={{
                backgroundImage: `url(${bgImage})`,
              }}
              className={`relative bg-cover bg-center bg-no-repeat overflow-hidden cursor-pointer rounded-lg border border-gray-200
                ${
                  index % 3 === 0
                    ? 'col-span-1 sm:col-span-2 row-span-2 h-[32rem] sm:h-[44rem]'
                    : 'h-[20rem] sm:h-[28rem]'
                }`}
            >
              <div className="absolute inset-0 bg-black/30 z-0"></div>

              <div className="absolute bottom-0 w-full bg-white bg-opacity-70 text-black p-4 z-10">
                <h3 className="text-sm sm:text-lg font-bold pb-1">{notice.titulo}</h3>
                <p className="text-xs sm:text-sm">{notice.descricao}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
