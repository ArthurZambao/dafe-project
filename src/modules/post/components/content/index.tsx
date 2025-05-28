'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { typePost } from '@/global/constants/typePost';
import { TopicPageDataProps } from '../../constants/types';
import { getValidToken } from '@/global/utils/auth';

export function PostPageData({ postId }: TopicPageDataProps) {
  const [post, setPost] = useState<typePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInteracted, setIsInteracted] = useState(false);


  useEffect(() => {
    if (typeof postId !== 'string') {
      console.log('postId não é string:', postId);
      return;
    }

    async function fetchPost() {
      setLoading(true);
      setError(null);
      try {
        const token = getValidToken();
        if (!token) {
          setError('Você não está autenticado.');
          setLoading(false);
          return;
        }
        console.log('Buscando tópico com id:', postId, 'com token:', token);
        const response = await axios.get(`http://localhost:3030/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Resposta da API:', response.data);
        setPost(response.data);
      } catch (err) {
        console.error('Erro na requisição do tópico:', err);
        setError('Erro ao carregar o tópico.');
        setPost(null);
      } finally {
        setLoading(false);
        console.log('Finalizado loading');
      }
    }

    fetchPost();
  }, [postId]);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  if (loading) return <p className="p-10 text-xl min-h-screen">Carregando tópico...</p>;
  if (error) return <p className="p-10 text-xl text-red-500 min-h-screen">{error}</p>;
  if (!post) return <p className="p-10 text-xl min-h-screen">Tópico não encontrado.</p>;

  const addInteration = () => {
    if (isInteracted) return;
    post.interacao++;
    setIsInteracted(true);
  };

  return (
    <div className="p-6 sm:p-10 space-y-6 min-h-screen w-full max-w-screen-2xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-6 items-center lg:items-start">
          <div className="w-60 h-60 sm:w-80 sm:h-80 bg-[#007BFF] rounded-2xl relative overflow-hidden">
            <Image
              src="/icons/ig-logo.svg"
              alt="Imagem"
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <p className="text-gray-500 text-sm sm:text-base text-center lg:text-left">
            Data da Publicação: <span className="font-bold">{formatarData(post.data)}</span>
            <br />
            Feito Por: <span className="font-bold">{post.usuario}</span>
            <br />
            Tópico: <span className="font-bold">{post.topico}</span>
          </p>
        </div>

        <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left py-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#007BFF]">
            {post.titulo}
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl">{post.descricao}</p>
          <button
            onClick={addInteration}
            className="cursor-pointer mx-auto bg-[#007BFF] text-2xl sm:text-3xl font-bold text-white px-10 py-3 rounded-tl-xl rounded-br-xl"
          >
            <span className="font-extrabold">{post.interacao}</span> Interagir
          </button>
        </div>
      </div>

      <p className="text-gray-700 text-lg sm:text-xl mb-10">{post.conteudo}</p>
    </div>
  );
}
