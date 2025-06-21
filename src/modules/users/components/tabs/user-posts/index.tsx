import { useEffect, useState } from 'react';
import axios from 'axios';
import { typePostList } from '@/types/typePostList';
import { useAuth } from '@/global/context/useAuth';
import { getValidToken } from '@/global/utils/auth';
import { UserPostList } from '../../user-post-list';

export function UserPosts() {
  const [posts, setPosts] = useState<typePostList[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const token = getValidToken();
        const response = await axios.get(`http://localhost:3030/posts?autor=${user!.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    }

    if (user) fetchUserPosts();
  }, [user]);

  async function handleDelete(postId: string) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este post?');
    if (!confirmDelete) return;

    try {
      const token = getValidToken();
      await axios.delete(`http://localhost:3030/posts/${postId}`, {
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

  if (!user) return null;

  return <UserPostList posts={posts} handleDelete={handleDelete}/>
}
