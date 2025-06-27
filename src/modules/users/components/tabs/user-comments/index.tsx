import { useAuth } from '@/global/context/useAuth';
import { typeComments } from '@/types/typeComments';
import { useEffect, useState } from 'react';
import { UserCommentList } from '../../user-comment-list';
import { api } from '@/libs/api/axios';

export function UserComments() {
  const [comments, setComments] = useState<typeComments[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUserComments() {
      try {
        const response = await api.get(`/comments/aluno/${user!.id}`);

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
      await api.delete(`/comments/${commentId}`);

      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
      alert('Erro ao deletar comentário.');
    }
  }

  if (!user) return null;

  return <UserCommentList comments={comments} handleDelete={handleDelete} />;
}
