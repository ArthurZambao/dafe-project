'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Jumbotron } from '../jumbotron';
import { Filter } from '@/global/components/Filter';
import { forumFilterOptions } from '../../../../global/constants/forumFilterOptions';

import { CreatePostButton } from '../post-button';
import { PostList } from '../post-list';
import { typePost } from '@/global/constants/typePost';
import { getValidToken } from '@/global/utils/auth';
import { AnimatedContent } from '@/global/animations/animatedContent';

export function ForumPageData() {
  const [posts, setPosts] = useState<typePost[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (postFilter: string | null) => {
    setLoading(true);
    try {
      const token = getValidToken();
      const url = postFilter
        ? `http://localhost:3030/posts?topico=${postFilter}`
        : `http://localhost:3030/posts`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.length === 0) {
        setMessage('Nenhum tópico encontrado para o filtro selecionado.');
      }else {
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
      <Jumbotron />

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
        <p className="text-center text-black text-lg min-h-screen pt-10">{message}</p>
      ) : (
        <PostList posts={posts} />
      )}

      <CreatePostButton />
    </AnimatedContent>
  );
}
