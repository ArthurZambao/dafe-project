'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNoticesList } from '../../hooks/useNoticesList';
import { useRouter } from 'next/navigation';

export function MainNotices() {
  const { notices, isLoading, error } = useNoticesList();
  const router = useRouter();
  if (isLoading) {
    return <p className="text-center text-slate-gray mt-10">Carregando notícias...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <section className="w-full mb-10">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {notices.map((notice, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              router.push(`/notices-page/${notice._id}`);
            }}
          >
            <div
              className="cursor-pointer w-full relative flex items-end h-100 sm:h-96 md:h-[30rem] 
             bg-cover bg-no-repeat overflow-hidden"
              style={{
                backgroundImage: `url(${
                  index % 2 === 0
                    ? '/svgs/news-image-example.svg'
                    : '/svgs/news-image-example-2.svg'
                })`,
              }}
            >
              <div className="absolute inset-0 bg-black/40 z-0"></div>
              <div className="relative z-10 w-full">
                <div className="ml-10 sm:ml-24 my-10 sm:my-20 pl-2 border-l-8 border-azure-primary">
                  <h2 className="text-xl sm:text-4xl md:text-5xl text-white font-semibold">
                    {notice.titulo}
                  </h2>
                  <h3>
                    <span className="text-sm sm:text-lg text-white">{notice.descricao}</span>
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
