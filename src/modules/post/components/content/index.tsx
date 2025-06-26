'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getValidToken } from '@/global/utils/auth';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { PostPageDataProps } from '@/types/post';
import { typePostList } from '@/types/typePostList';
import Image from 'next/image';
import { PostInfoSection } from '@/global/components/postInfoSection';
import { typeComments } from '@/types/typeComments';
import { CommentsList } from '../comments-list';

export function PostPageData({ postId }: PostPageDataProps) {
  const [post, setPost] = useState<typePostList | null>(null);
  const [comments, setComments] = useState<typeComments[] | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    if (typeof postId !== 'string') return;

    async function fetchPostAndComments() {
      setLoading(true);
      try {
        const token = getValidToken();

        const [postRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:3030/posts/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3030/comments/post/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar o tópico ou os comentários.');
      } finally {
        setLoading(false);
      }
    }

    fetchPostAndComments();
  }, [postId]);

  const formatarData = (data: string) => new Date(data).toLocaleDateString('pt-BR');

  const addInteration = async () => {
    if (isInteracted || !post) return;
    try {
      const token = getValidToken();
      const response = await axios.patch(
        `http://localhost:3030/posts/${post._id}`,
        { interacao: post.interacao + 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(response.data);
      setIsInteracted(true);
    } catch (err) {
      console.error('Erro ao interagir com o post:', err);
      setError('Erro ao interagir com o post.');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !post) return;

    try {
      const token = getValidToken();
      const response = await axios.post(
        `http://localhost:3030/comments/post/${post._id}`,
        { conteudo: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setComments((prev) => (prev ? [response.data, ...prev] : [response.data]));

      setPost((prevPost) =>
        prevPost ? { ...prevPost, commentsCount: prevPost.commentsCount + 1 } : prevPost
      );

      setNewComment('');
    } catch (err) {
      console.error('Erro ao postar comentário:', err);
      setError('Erro ao postar comentário.');
    }
  };

  if (loading) return <p className="p-10 text-xl min-h-screen">Carregando tópico...</p>;
  if (error) return <p className="p-10 text-xl text-red-500 min-h-screen">{error}</p>;
  if (!post) return <p className="p-10 text-xl min-h-screen">Tópico não encontrado.</p>;

  return (
    <AnimatedContent inverse>
      <div className="p-6 sm:p-10 space-y-6 min-h-screen w-full max-w-screen-2xl mx-auto">
        <div className="flex gap-2 items-center">
          <div className="flex w-2 rounded-full p-6 bg-slate-gray"></div>
          <div className="flex-col">
            <p className="text-lg sm:text-xl font-semibold">{post.autor.usuario}</p>
            <p className="text-sm text-slate-gray">{formatarData(post.data)}</p>
          </div>
        </div>

        <div className="flex-col gap-10 items-center">
          <h1 className="text-xl sm:text-3xl text-azure-primary break-words">{post.titulo}</h1>
          <p className="text-xs sm:text-sm text-slate-gray">
            Tópico: <span className="font-semibold">{post.topico}</span>
          </p>
        </div>

        <div className="flex items-center justify-center bg-[#D9D9D9] py-20 sm:py-30">
          <Image
            src="/icons/ig-logo.svg"
            width={100}
            height={100}
            alt={`Imagem de ${post.usuario}`}
            className="object-contain"
          />
        </div>

        <div className="max-w-screen-lg">
          <p className="break-words text-base sm:text-lg">{post.conteudo}</p>
        </div>

        <PostInfoSection
          interacao={post.interacao}
          addInterationFunc={addInteration}
          commentsCount={post.commentsCount}
        />

        <div className="border-t-1 border-slate-gray">
          <h2 className="text-2xl text-azure-primary font-semibold pt-8 pb-2">Comentários</h2>

          <form onSubmit={handleCommentSubmit} className="mb-6 space-y-4 flex gap-4 items-center">
            <input
              type="text"
              placeholder="Escreva um Comentário"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              className=" text-sm sm:text-base w-full p-4 mt-4"
            />
            <button
              type="submit"
              className="btn-dafe btn-dafe-hover text-sm sm:text-base text-white px-6 py-2"
            >
              Enviar
            </button>
          </form>

          {comments && comments.length > 0 ? (
            <CommentsList comments={comments} />
          ) : (
            <p className="text-gray-500">Nenhum comentário ainda.</p>
          )}
        </div>
      </div>
    </AnimatedContent>
  );
}
