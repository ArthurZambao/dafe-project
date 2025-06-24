import { useEffect, useState } from 'react';
import { typePostList } from '@/types/typePostList';
import { getValidToken } from '@/global/utils/auth';
import { UserPostList } from '../../user-post-list';
import { api } from '@/libs/api/axios';
import { useCurrentUser } from '@/hooks/currentUser';
import { JwtPayload } from '@/types/jwt';

export function UserPosts() {
  const [posts, setPosts] = useState<typePostList[]>([]);
  const user = useCurrentUser();
  const currentUser = user as JwtPayload | undefined;

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const token = getValidToken();
        const response = await api.get(`http://localhost:3030/posts?autor=${currentUser!.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    }

    if (currentUser) fetchUserPosts();
  }, [currentUser]);

  async function handleDelete(postId: string) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este post?');
    if (!confirmDelete) return;

    try {
      const token = getValidToken();
      await api.delete(`http://localhost:3030/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      alert('Erro ao deletar post.');
    }
  }
  if (!currentUser) return null;

  return <UserPostList posts={posts} handleDelete={handleDelete} />;
}
