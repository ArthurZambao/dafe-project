'use client';
import { useState } from 'react';
import { topics } from '../../constants/topics';
import { Jumbotron } from '../jumbotron';
import { TopicList } from '../topic-list';
import { CreateTopicButton } from '../topic-button';
import { Filter } from '@/global/components/Filter';
import { forumFilterOptions } from '../../../../global/constants/forumFilterOptions';

export function ForumPageData() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredTopics = selectedTopic
    ? topics.filter((topic) => topic.topico === selectedTopic)
    : topics;

  return (
    <>
      <Jumbotron />
      <Filter
        selectedFilter={selectedTopic}
        setSelectedFilter={setSelectedTopic}
        filterOptions={forumFilterOptions}
      />
      <TopicList topics={filteredTopics} />
      <CreateTopicButton />
    </>
  );
}
