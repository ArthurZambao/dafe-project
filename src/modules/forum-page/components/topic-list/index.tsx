'use client';
import { useRouter } from 'next/navigation';
import { TopicCard } from '../topic-card';
import { Topic } from '../../constants/types';
import { Key } from 'react';


interface TopicListProps {
  topics: Topic[];
}

export function TopicList({ topics }: TopicListProps) {
  const router = useRouter();

  return (
    <>
      {topics.map((topic: Topic, index: Key | null | undefined) => (
        <TopicCard
          key={index}
          topic={topic}
          onClick={() => {
            localStorage.setItem('selectedTopic', JSON.stringify(topic));
            router.push('/topic');
          }}
        />
      ))}
    </>
  );
}
