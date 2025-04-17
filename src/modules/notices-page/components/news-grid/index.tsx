import Image from 'next/image';
import { news } from '../../constants/news';

export function NewsGrid() {
  return (
    <div className="grid grid-cols-3 grid-rows-auto gap-2 h-[600px] overflow-y-scroll px-10 sm:px-0 lg:mx-30 md:mx-10 sm:mx-20 my-10">
      {news.map((item, index) => (
        <div
          key={item.id}
          className={`
            relative
            ${index === 0 ? 'col-span-2 row-span-2' : ''}
            bg-gray-200 rounded-md overflow-hidden h-[15rem] sm:h-[20rem] cursor-pointer
          `}
        >
          <Image
            src="/ig-logo.svg"
            alt="Imagem da Notícia"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="absolute bottom-0 w-full bg-[#007BFF] bg-opacity-10 text-white p-4 z-10">
            <h3 className=" text-base sm:text-xl font-bold">{item.title}</h3>
            <p className="text-xs sm:text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
