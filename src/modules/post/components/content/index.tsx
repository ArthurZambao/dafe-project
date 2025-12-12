'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { PostPageDataProps } from '@/types/post';
import { typePostList } from '@/types/typePostList';
import Image from 'next/image';
import { PostInfoSection } from '@/global/components/postInfoSection';
import { typeComments } from '@/types/typeComments';
import { CommentsList } from '../comments-list';
import { useAuth } from '@/global/context/useAuth';
import { api } from '@/libs/http/axios';
import { deletePost } from '@/libs/services/posts/postsService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '@/global/components/confirmModal';

export function PostPageData({ postId }: PostPageDataProps) {
  const router = useRouter();
  const [post, setPost] = useState<typePostList | null>(null);
  const [comments, setComments] = useState<typeComments[] | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInteracted, setIsInteracted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (typeof postId !== 'string') return;
    if (!user) return;

    async function fetchPostAndComments() {
      setLoading(true);
      try {
        const [postRes, commentsRes] = await Promise.all([
          api.get(`/posts/${postId}`),
          api.get(`/comments/post/${postId}`),
        ]);

        setPost(postRes.data);
        setComments(commentsRes.data);

        const interactedByIds: string[] =
          postRes.data.interactedBy?.map((u: string) => u.toString()) || [];
        if (interactedByIds.includes(user!.id)) {
          setIsInteracted(true);
        }
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar o tópico ou os comentários.');
      } finally {
        setLoading(false);
      }
    }

    fetchPostAndComments();
  }, [postId, user]);

  const formatarData = (data: string) => new Date(data).toLocaleDateString('pt-BR');

  const addInteration = async () => {
    if (isInteracted || !post) return;

    try {
      const response = await api.patch(`/posts/${post._id}/interacao`);
      setPost(response.data);
      setIsInteracted(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setIsInteracted(true);
      } else {
        console.error('Erro ao interagir com o post:', err);
        setError('Erro ao interagir com o post.');
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !post) return;

    try {
      const response = await api.post(`/comments/post/${post._id}`, {
        conteudo: newComment,
      });

      setComments((prev) => (prev ? [response.data, ...prev] : [response.data]));
      setPost((prevPost) =>
        prevPost ? { ...prevPost, commentsCount: prevPost.commentsCount + 1 } : prevPost
      );
      setNewComment('');
      console.log(comments);
    } catch (err) {
      console.error('Erro ao postar comentário:', err);
      setError('Erro ao postar comentário.');
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      toast.success('Post deletado com sucesso!');
      router.push('/forum-page');
    } catch (err) {
      console.error('Erro ao deletar o post:', err);
      setError('Erro ao deletar o post.');
    }
  };

  const isAutor = post?.autor._id === user?.id;

  const handleDeleteCommentLocal = (commentId: string) => {
    setComments((prev) => (prev ? prev.filter((c) => c._id !== commentId) : prev));

    setPost((prev) => (prev ? { ...prev, commentsCount: prev.commentsCount - 1 } : prev));
  };

  if (!user) return null;
  if (loading) return <p className="p-10 text-xl min-h-screen">Carregando tópico...</p>;
  if (error) return <p className="p-10 text-xl text-red-500 min-h-screen">{error}</p>;
  if (!post) return <p className="p-10 text-xl min-h-screen">Tópico não encontrado.</p>;

  return (
    <>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Deletar post"
        message="Tem certeza que deseja deletar este post? Esta ação é irreversível."
        confirmText="Deletar"
        cancelText="Cancelar"
        onConfirm={() => {
          setShowDeleteModal(false);
          handleDeletePost(post._id);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />

      <AnimatedContent inverse>
        <div className="p-6 sm:p-10 space-y-6 min-h-screen w-full max-w-screen-2xl mx-auto">
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                <Image
                  src={post.autor.imageUrl || '/icons/user-icon.svg'}
                  alt={post.autor.usuario}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-col">
                <p className="text-lg sm:text-xl font-semibold text-azure-secondary">
                  {post.autor.usuario}
                </p>
                <p className="text-sm text-slate-gray">{formatarData(post.data)}</p>
              </div>
            </div>

            {(user.role === 'admin' || user.role === 'manager') && (
              <span>
                <button
                  className="text-xs sm:text-base btn-dafe-delete btn-dafe-delete-hover px-2 sm:px-6 py-2 text-white cursor-pointer"
                  onClick={() => setShowDeleteModal(true)}
                >Deletar Post</button>
              </span>
            )}
          </div>

          <div className="flex-col gap-10 items-center">
            <h2 className="text-xl sm:text-3xl text-azure-primary break-words">{post.titulo}</h2>
            <p className="text-xs sm:text-sm text-slate-gray">
              Tópico: <span className="font-semibold">{post.topico}</span>
            </p>
          </div>

          {post.imageUrl && (
            <div className="relative w-full h-64 sm:h-96 md:h-[30rem] mt-4 rounded-md overflow-hidden bg-gray-100">
              <Image
                src={post.imageUrl}
                alt={`Imagem do post: ${post.titulo}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          )}

          <div className="max-w-screen-lg">
            <p className="break-words text-base sm:text-lg">{post.conteudo}</p>
          </div>

          <PostInfoSection
            interacao={post.interacao}
            addInterationFunc={addInteration}
            commentsCount={post.commentsCount}
            isInteracted={isInteracted}
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
              <CommentsList
                comments={comments}
                onDelete={handleDeleteCommentLocal}
                autorValidator={isAutor}
              />
            ) : (
              <p className="text-gray-500">Nenhum comentário ainda.</p>
            )}
          </div>
        </div>
      </AnimatedContent>
    </>
  );
}
