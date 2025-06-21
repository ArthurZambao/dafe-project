import { useAuth } from '@/global/context/useAuth';
import { getValidToken } from '@/global/utils/auth';
import { typeComments } from '@/types/typeComments';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserCommentList } from '../../user-comment-list';

export function UserComments() {
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

  return <UserCommentList comments={comments} handleDelete={handleDelete} />;
}
