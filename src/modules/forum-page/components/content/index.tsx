'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Jumbotron } from '../jumbotron';
import { Filter } from '@/global/components/Filter';
import { forumFilterOptions } from '../../../../global/constants/forumFilterOptions';

import { CreatePostButton } from '../post-button';
import { PostList } from '../post-list';
import { typePost } from '@/global/constants/typePost';
import { getValidToken } from '@/global/utils/auth';

export function ForumPageData() {
  const [posts, setPosts] = useState<typePost[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
    const token = getValidToken();

    if (token) {
      fetchPosts(selectedPost, token);
    } else {
      setError('Você não está autenticado.');
      router.push('/login');
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
        <p className="min-h-screen text-center text-white text-lg">Carregando tópicos...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : (
        <PostList posts={posts} />
      )}

      <CreatePostButton />
    </>
  );
}
