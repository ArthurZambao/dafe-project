'use client';

import { useEffect, useState } from 'react';

import { Filter } from '@/global/components/Filter';
import { forumFilterOptions } from '../../../../global/constants/forumFilterOptions';
import { PostList } from '../post-list';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { typePostList } from '@/types/typePostList';
import { api } from '@/libs/api/axios';

export function ForumPageData() {
  const [posts, setPosts] = useState<typePostList[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (postFilter: string | null) => {
    setLoading(true);
    try {
      const endpoint = postFilter ? `/posts?topico=${postFilter}` : `/posts`;

      const res = await api.get(endpoint);
      console.log('Posts fetched:', res.data);
      if (res.data.length === 0) {
        setMessage('Nenhum post encontrado.');
      } else {
        setMessage(null);
      }
      setPosts(res.data);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar tópicos:', error);
      setError('Erro ao carregar os tópicos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(selectedPost);
  }, [selectedPost]);

  return (
    <AnimatedContent inverse>
      <Filter
        selectedFilter={selectedPost}
        setSelectedFilter={setSelectedPost}
        filterOptions={forumFilterOptions}
      />

      {loading ? (
        <p className="min-h-screen text-center text-white text-lg">Carregando tópicos...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg min-h-screen pt-10">{error}</p>
      ) : message ? (
        <p className="text-center text-gray-500 text-lg min-h-screen pt-10">{message}</p>
      ) : (
        <PostList posts={posts} />
      )}
    </AnimatedContent>
  );
}
