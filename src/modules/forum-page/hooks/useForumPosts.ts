import { useEffect, useState } from 'react';
import { typePostList } from '@/types/typePostList';
import { getPosts } from '@/libs/services/posts/postsService';

export function useForumPosts() {
  const [posts, setPosts] = useState<typePostList[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (postFilter: string | null) => {
    setLoading(true);
    try {
      const data = await getPosts(postFilter || undefined);
      setPosts(data);
      setMessage(data.length === 0 ? 'Nenhum post encontrado.' : null);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar tópicos:', err);
      setError('Erro ao carregar os tópicos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(selectedPost);
  }, [selectedPost]);

  return { posts, selectedPost, setSelectedPost, loading, message, error };
}
