'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { typeTopic } from '@/global/constants/typeTopic';


interface ForumTopicListProps {
  topics: typeTopic[];
}

export function TopicList({ topics }: ForumTopicListProps) {
  const router = useRouter();

  // Função para formatar a data no padrão brasileiro
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <>
      {topics.map((topic, index) => (
        <div
          key={index}
          onClick={() => {
            localStorage.setItem('selectedTopic', JSON.stringify(topic));
            router.push('/topic');
          }}
          className="cursor-pointer text-white flex flex-col sm:flex-row gap-6 py-10 px-6 sm:px-16 hover:bg-[#d4d4d4d3] mx-10 rounded-3xl"
        >
          <div className="flex flex-col gap-2 rounded-2xl mx-auto sm:mx-0">
            <div className="bg-[#007BFF] p-4 rounded-xl self-start">
              <Image
                src="/icons/ig-logo.svg"
                width={150}
                height={150}
                alt={`Imagem de ${topic.post_usuario}`}
              />
            </div>
            <p className="text-[#6C757D] text-sm mt-2 text-center">
              Publicação: <span className="font-bold">{formatarData(topic.post_data)}</span> <br />
              Feito por: <span className="font-bold">{topic.post_usuario}</span>
              <br />
              Tópico: <span className="font-bold">{topic.post_topico}</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <h3 className="font-bold text-3xl sm:text-4xl text-[#007BFF] mx-auto sm:mx-0">
              {topic.post_titulo}
            </h3>
            <p className="leading-relaxed text-lg text-[#6C757D] text-center sm:text-start sm:max-w-[60rem]">
              {topic.post_descricao}
            </p>
            <button className="self-start bg-[#007BFF] text-lg text-white px-6 py-2 mx-auto sm:mx-0 rounded-tl-xl rounded-br-xl">
              <span className="font-bold">{topic.post_interacao}</span> Interações
            </button>
          </div>
        </div>
      ))}
    </>
  );
}