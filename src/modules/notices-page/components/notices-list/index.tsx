'use client';

import { Notice } from '@/types/notices';
import { useEffect, useState } from 'react';

export function NoticesList() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('finalDataNotices');
    if (stored) {
      try {
        const parsed: Notice[] = JSON.parse(stored);
        setNotices(parsed);
      } catch (err) {
        console.error('Erro ao parsear localStorage:', err);
      }
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[600px] overflow-y-scroll pr-2">
      {notices.map((notice, index) => (
        <div
          key={index}
          className={`
                relative bg-gray-200 overflow-hidden cursor-pointer
                ${index % 3 === 0 ? 'col-span-2 row-span-2 h-[32rem] sm:h-[44rem]' : 'h-[20rem] sm:h-[28rem]'}
              `}
        >
          <div className="absolute bottom-0 w-full bg-white bg-opacity-70 text-black p-4 z-10">
            <h3 className="text-sm sm:text-lg font-bold pb-1">{notice.NoticiaTitulo}</h3>
            <p className="text-xs sm:text-sm">{notice.noticiaDesc}</p>
          </div>
          <span className="absolute bottom-2 right-2 text-[10px] sm:text-xs bg-white bg-opacity-80 text-black px-2 rounded">
            Postado dia:
          </span>
        </div>
      ))}
    </div>
  );
}
