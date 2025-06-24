import { useAuth } from '@/global/context/useAuth';
import { getValidToken } from '@/global/utils/auth';
import { typeComments } from '@/types/typeComments';

import { useEffect, useState } from 'react';
import { UserCommentList } from '../../user-comment-list';
import { api } from '@/libs/api/axios';
import { JwtPayload } from 'jwt-decode';

type CustomJwtPayload = JwtPayload & { id?: string };

export function UserComments() {
  const [comments, setComments] = useState<typeComments[]>([]);
  const { user } = useAuth();
  const currentUser = user as CustomJwtPayload;

  useEffect(() => {
    async function fetchUserComments() {
      try {
        const token = getValidToken();
        const response = await api.get(`http://localhost:3030/comments/aluno/${currentUser?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    }

    if (currentUser) fetchUserComments();
  }, [currentUser]);

  async function handleDelete(commentId: string) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este post?');
    if (!confirmDelete) return;

    try {
      const token = getValidToken();
      await api.delete(`http://localhost:3030/comments/${commentId}`, {
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

