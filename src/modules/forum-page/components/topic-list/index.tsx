'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { typeTopic } from '@/global/constants/typeTopic';

interface ForumTopicListProps {
  topics: typeTopic[];
}

export function TopicList({ topics }: ForumTopicListProps) {
  const router = useRouter();

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-10">
      {topics.map((topic, index) => (
        <div
          key={index}
          onClick={() => {
            localStorage.setItem('selectedTopic', JSON.stringify(topic));
            router.push('/topic');
          }}
          className="cursor-pointer text-white flex flex-col sm:flex-row gap-6 py-6 sm:py-10 px-4 sm:px-8 hover:bg-[#d4d4d4d3] rounded-3xl transition-all duration-300"
        >
          {/* Left Section */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#007BFF] p-3 sm:p-4 rounded-xl">
              <Image
                src="/icons/ig-logo.svg"
                width={100}
                height={100}
                alt={`Imagem de ${topic.usuario}`}
                className="object-contain"
              />
            </div>
            <p className="text-[#6C757D] text-sm text-center sm:text-left">
              Publicação: <span className="font-bold">{formatarData(topic.data)}</span><br />
              Feito por: <span className="font-bold">{topic.usuario}</span><br />
              Tópico: <span className="font-bold">{topic.topico}</span>
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-4 w-full sm:w-3/4">
            <h3 className="font-bold sm:text-4xl text-3xl text-[#007BFF] text-center sm:text-left break-words w-full">
              {topic.titulo}
            </h3>
            <p className="leading-relaxed text-sm sm:text-base lg:text-lg text-[#6C757D] text-center sm:text-left break-words w-full">
              {topic.descricao}
            </p>
            <button className="self-center sm:self-start bg-[#007BFF] text-base sm:text-lg text-white px-4 sm:px-6 sm:py-2 rounded-tl-xl rounded-br-xl">
              <span className="font-bold">{topic.interacao}</span> Interações
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
