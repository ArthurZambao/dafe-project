'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNoticesList } from '../../hooks/useNoticesList';
import { useRouter } from 'next/navigation';

export function MainNotices() {
  const { notices, isLoading, error } = useNoticesList();
  const router = useRouter();

  if (isLoading) return <p className="text-center text-slate-gray mt-10">Carregando destaques...</p>;
  if (error) return null;

  const recentNotices = notices.slice(0, 5);

  return (
    <section className="w-full mb-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={recentNotices.length > 1}
      >
        {recentNotices.map((notice, index) => {
           const fallbackImage = index % 2 === 0 ? '/svgs/news-image-example.svg' : '/svgs/news-image-example-2.svg';
           const bgImage = notice.imageUrl || fallbackImage;

           return (
            <SwiperSlide
              key={notice._id}
              onClick={() => {
                 router.push(`/notices-page/${notice.slugify}`);
              }}
            >
              <div
                className="cursor-pointer w-full relative flex items-end h-100 sm:h-96 md:h-[30rem] 
               bg-cover bg-center bg-no-repeat overflow-hidden" 
                style={{
                  backgroundImage: `url(${bgImage})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0"></div>
                
                <div className="relative z-10 w-full mb-10">
                  <div className="ml-6 sm:ml-24 pl-4 border-l-8 border-azure-primary">
                    <h2 className="text-xl sm:text-4xl md:text-5xl text-white font-bold drop-shadow-lg max-w-3xl line-clamp-2">
                      {notice.titulo}
                    </h2>
                    <p className="mt-2 text-sm sm:text-lg text-gray-200 drop-shadow-md max-w-2xl line-clamp-2">
                      {notice.descricao}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}