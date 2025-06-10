import { useAuth } from '@/global/context/useAuth';
import { getValidToken } from '@/global/utils/auth';
import { typeComments } from '@/types/typeComments';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function UserComments() {
  const router = useRouter();
  const [comments, setComments] = useState<typeComments[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUserComments() {
      try {
        const token = getValidToken();
        const response = await axios.get(`http://localhost:3030/comments/aluno/${user!.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    }

    if (user) fetchUserComments();
  }, [user]);

  async function handleDelete(commentId: string) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este post?');
    if (!confirmDelete) return;

    try {
      const token = getValidToken();
      await axios.delete(`http://localhost:3030/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
      alert('Erro ao deletar comentário.');
    }
  }

  if (!user) return null;

  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm mt-6">Você não tem nenhum comentário.</div>
    );
  }

  return comments.map((comment) => (
    <div
      key={comment._id}
      className="mb-4 p-4 rounded flex gap-4 cursor-pointer hover:bg-[#d1d1d1]"
      onClick={() => {
        if (!comment.post._id) return alert('ID do tópico ausente!');
        router.push(`/forum-page/${comment.post._id}`);
      }}
    >
      <div className="flex-1 w-full">
        <p className=" text-sm text-gray-600 break-words w-full">{comment.autor.nome}</p>
        <p className="text-sm sm:text-base break-words w-full">{comment.conteudo}</p>
        <p className="text-xs text-gray-400">{new Date(comment.data).toLocaleString()}</p>
        <p className="text-xs sm:text-sm text-gray-400 break-words">
          Comentado em: <span className="font-semibold">{comment.post.titulo}</span>
        </p>
      </div>
      <Trash2
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(comment._id);
        }}
        className="cursor-pointer hover:text-red-600 transition-colors duration-200 "
      />
    </div>
  ));
}
