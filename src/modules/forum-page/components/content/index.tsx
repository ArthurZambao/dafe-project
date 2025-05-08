'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TopicList } from '../topic-list';
import { Jumbotron } from '../jumbotron';
import { Filter } from '@/global/components/Filter';
import { forumFilterOptions } from '../../../../global/constants/forumFilterOptions';
import { CreateTopicButton } from '../topic-button';
import { typeTopic } from '@/global/constants/typeTopic';
import { useAuthGuard } from '@/hooks/useAuthGuard'; // Importando o useAuthGuard

export function ForumPageData() {
  useAuthGuard();

  const [topics, setTopics] = useState<typeTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchTopics = async (topicFilter: string | null, token: string) => {
    setLoading(true);
    try {
      const url = topicFilter
        ? `http://localhost:3030/posts?topico=${topicFilter}`
        : `http://localhost:3030/posts`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTopics(res.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar tópicos:', err);
      setError('Erro ao carregar os tópicos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchTopics(selectedTopic, token);
    }
  }, [router, selectedTopic]);

  return (
    <>
      <Jumbotron />

      <Filter
        selectedFilter={selectedTopic}
        setSelectedFilter={setSelectedTopic}
        filterOptions={forumFilterOptions}
      />

      {loading ? (
        <p className="text-center text-white text-lg">Carregando tópicos...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : (
        <TopicList topics={topics} />
      )}

      <CreateTopicButton />
    </>
  );
}
