import Image from 'next/image';
import { news } from '../../constants/news';
import { AnimatedContent } from '@/global/animations/animatedContent';

export function NoticesPageData() {
  return (
    <AnimatedContent inverse>
      <div className="w-full bg-[#007BFF] text-white py-10">
        <h1 className="text-4xl font-bold text-center">Noticias</h1>
      </div>
      <div className="grid grid-cols-3 grid-rows-auto gap-2 h-[600px] overflow-y-scroll px-10 sm:px-0 lg:mx-30 md:mx-10 sm:mx-20 my-20">
        {news.map((item, index) => (
          <div
            key={item.id}
            className={`
            relative
            ${index === 0 ? 'col-span-2 row-span-2' : ''}
            bg-gray-200 rounded-md overflow-hidden h-[12rem] sm:h-[20rem] cursor-pointer min-w-[6rem]
          `}
          >
            <Image
              src={item.image}
              alt={`Imagem da notícia ${item.title}`}
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <div className="absolute bottom-0 w-full bg-[#007BFF] bg-opacity-10 text-white p-2 sm:p-4 z-10">
              <h3 className=" text-sm sm:text-xl font-bold pb-2 sm:pb-0">{item.title}</h3>
              <p className="text-xs sm:text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </AnimatedContent>
  );
}
