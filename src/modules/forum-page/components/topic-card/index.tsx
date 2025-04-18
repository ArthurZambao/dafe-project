'use client';
import Image from 'next/image';
import { Topic } from '../../constants/types';

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
}

export function TopicCard({ topic, onClick }: TopicCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer text-white flex flex-col sm:flex-row gap-6 py-10 px-6 sm:px-16 hover:bg-[#f9f9f9] mx-10 rounded-3xl"
    >
      <div className="flex flex-col gap-2 rounded-2xl mx-auto sm:mx-0">
        <div className="bg-[#007BFF] p-4 rounded-xl self-start">
          <Image src={topic.imagem} width={150} height={150} alt={`Imagem de ${topic.usuario}`} />
        </div>
        <p className="text-[#6C757D] text-sm mt-2 text-center">
          Data da Publicação: <span className="font-bold">{topic.data}</span> <br />
          Feito por: <span className="font-bold">{topic.usuario}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 justify-center">
        <h3 className="font-bold text-3xl sm:text-4xl text-[#007BFF] mx-auto sm:mx-0">
          {topic.titulo}
        </h3>
        <p className="leading-relaxed text-lg text-[#6C757D] text-center sm:text-start sm:max-w-[60rem]">
          {topic.descricao}
        </p>
        <button className="self-start bg-[#007BFF] text-lg text-white px-6 py-2 mx-auto sm:mx-0 rounded-tl-xl rounded-br-xl">
          <span className="font-bold">{topic.interacoes}</span> Interações
        </button>
      </div>
    </div>
  );
}
