import { news } from '../../constants/news';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { SlidersHorizontal } from 'lucide-react';

export function NoticesPageData() {
  return (
    <AnimatedContent inverse>
      <div className="w-full px-6 sm:px-10 md:px-20 lg:px-40 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-azure-secondary">Notícias</h1>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Pesquisar notícias:"
              className="border border-azure-primary rounded-full px-4 py-2 w-[250px] outline-none"
            />
            <button className="p-2">
              <SlidersHorizontal className="text-azure-primary" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[600px] overflow-y-scroll pr-2">
          {news.map((item, index) => (
            <div
              key={item.id}
              className={`
                relative bg-gray-200 overflow-hidden cursor-pointer
                ${index % 3 === 0 ? 'col-span-2 row-span-2 h-[32rem] sm:h-[44rem]' : 'h-[20rem] sm:h-[28rem]'}
              `}
            >
              <div className="absolute bottom-0 w-full bg-white bg-opacity-70 text-black p-4 z-10">
                <h3 className="text-sm sm:text-lg font-bold pb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm">{item.description}</p>
              </div>
              <span className="absolute bottom-2 right-2 text-[10px] sm:text-xs bg-white bg-opacity-80 text-black px-2 rounded">
                Postado dia:
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedContent>
  );
}
