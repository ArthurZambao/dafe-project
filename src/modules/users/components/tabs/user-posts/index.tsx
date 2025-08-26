import { useEffect, useState } from 'react';
import { typePostList } from '@/types/typePostList';
import { useAuth } from '@/global/context/useAuth';
import { UserPostList } from '../../user-post-list';
import { deletePost, getUserPosts } from '@/services/posts/postsService';

export function UserPosts() {
  const [posts, setPosts] = useState<typePostList[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const data = await getUserPosts(user.id);
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    };

    fetchPosts();
  }, [user]);

  async function handleDelete(postId: string) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este post?');
    if (!confirmDelete) return;

    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      alert('Erro ao deletar post.');
    }
  }

  if (!user) return null;

  return <UserPostList posts={posts} handleDelete={handleDelete} />;
}
