'use client';

import { useEffect, useState } from 'react';
import { comentariosPorTopico } from '../../constants/mockComentarios';
import Image from 'next/image';

type TopicType = {
  id: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  interacoes: number;
  imagem: string;
  data: string;
  usuario: string;
  topico: string;
};

export function TopicPageData() {
  const [topic, setTopic] = useState<TopicType | null>(null);

  useEffect(() => {
    const storedTopic = localStorage.getItem('selectedTopic');
    if (storedTopic) {
      setTopic(JSON.parse(storedTopic));
    }
  }, []);

  if (!topic) return <p className="p-10 text-xl">Carregando tópico...</p>;

  const comentarios = comentariosPorTopico[topic.id] || [];

  return (
    <div className="p-6 sm:p-10 space-y-6 min-h-screen w-full max-w-screen-2xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Imagem e infos do usuário */}
        <div className="flex flex-col gap-6 items-center lg:items-start">
          <div className="w-60 h-60 sm:w-80 sm:h-80 bg-[#007BFF] rounded-2xl relative overflow-hidden">
            <Image
              src={topic.imagem}
              alt={topic.usuario}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <p className="text-gray-500 text-sm sm:text-base text-center lg:text-left">
            Data da Publicação: <span className="font-bold">{topic.data}</span>
            <br />
            Feito Por: <span className="font-bold">{topic.usuario}</span>
            <br />
            Tópico: <span className="font-bold">{topic.topico}</span>
          </p>
        </div>

        {/* Título, descrição e botão */}
        <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left py-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#007BFF]">
            {topic.titulo}
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl">{topic.descricao}</p>
          <button className="cursor-pointer mx-auto bg-[#007BFF] text-2xl sm:text-3xl font-bold text-white px-10 py-3 rounded-tl-xl rounded-br-xl">
            Interagir
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <p className="text-gray-700 text-lg sm:text-xl mb-10">{topic.conteudo}</p>

      {/* Comentários */}
      <p className="text-3xl sm:text-4xl text-[#007BFF] font-bold">
        {comentarios.length} Comentários
      </p>

      <div className="mt-6 space-y-4">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="flex gap-4 p-4 flex-col sm:flex-row sm:w-[40rem]">
            <Image
              src={comentario.imagem}
              width={50}
              height={50}
              alt="Imagem do Autor"
              className="w-12 h-12"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h2 className="font-bold text-2xl text-[#007BFF]">{comentario.autor}</h2>
                <p className="text-[#6C757D] text-lg">{comentario.data}</p>
              </div>
              <p className="text-gray-800 mt-2 sm:mt-0">{comentario.mensagem}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
