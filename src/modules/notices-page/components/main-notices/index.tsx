"use client";

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
    <section className='w-full mb-10'>
      <Swiper modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {notices.map((notice, index) => (
          <SwiperSlide
            key={index}
            onClick={() => { router.push(`/notices-page/${notice._id}`)}}>
            <div className="cursor-pointer w-full bg-slate-gray relative flex items-end h-72 sm:h-96 md:h-[30rem]">
              <p className="absolute top-4 left-4 text-white text-xs sm:text-sm">
                Publicado por: {notice.autor.usuario}
              </p>

              <div className="ml-4 sm:ml-10 my-10 sm:my-20 pl-2 border-l-8 border-azure-primary">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold">
                  {notice.titulo}
                </h2>
                <h3>
                  <span className="text-sm sm:text-lg text-white">{notice.descricao}</span>
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}