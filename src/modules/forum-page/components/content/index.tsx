'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Jumbotron } from '../jumbotron';
import { Filter } from '@/global/components/Filter';
import { forumFilterOptions } from '../../../../global/constants/forumFilterOptions';

import { useAuthGuard } from '@/hooks/useAuthGuard';
import { CreatePostButton } from '../post-button';
import { PostList } from '../post-list';
import { typePost } from '@/global/constants/typePost';

export function ForumPageData() {
  useAuthGuard();

  const [posts, setPosts] = useState<typePost[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Função para ler token dos cookies
  const getTokenFromCookie = (): string | null => {
    const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  };

  const fetchPosts = async (postFilter: string | null, token: string) => {
    setLoading(true);
    try {
      const url = postFilter
        ? `http://localhost:3030/posts?topico=${postFilter}`
        : `http://localhost:3030/posts`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(res.data);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar tópicos:', error);
      setError('Erro ao carregar os tópicos. Verifique sua conexão ou autenticação.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getTokenFromCookie();
    if (token) {
      fetchPosts(selectedPost, token);
    } else {
      console.warn('Token ausente nos cookies');
      setError('Você não está autenticado.');
    }
  }, [router, selectedPost]);

  return (
    <>
      <Jumbotron />

      <Filter
        selectedFilter={selectedPost}
        setSelectedFilter={setSelectedPost}
        filterOptions={forumFilterOptions}
      />

      {loading ? (
        <p className=" min-h-screen text-center text-white text-lg">Carregando tópicos...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : (
        <PostList posts={posts} />
      )}

      <CreatePostButton />
    </>
  );
}
