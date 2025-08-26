import { useAuth } from '@/global/context/useAuth';
import { typeComments } from '@/types/typeComments';
import { useEffect, useState } from 'react';
import { UserCommentList } from '../../user-comment-list';
import { deleteComment, getUserComments } from '@/services/comments/commentsServices';

export function UserComments() {
  const [comments, setComments] = useState<typeComments[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUserComments() {
      if (!user) return;

      try {
        const data = await getUserComments(user.id);
        setComments(data);
      } catch (error) {
        console.error('Erro ao buscar os comentários:', error);
      }
    }

    fetchUserComments();
  }, [user]);

  async function handleDelete(commentId: string) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este comentário?');
    if (!confirmDelete) return;

    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
      alert('Erro ao deletar comentário.');
    }
  }

  if (!user) return null;

  return <UserCommentList comments={comments} handleDelete={handleDelete} />;
}
