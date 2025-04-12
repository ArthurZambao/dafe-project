'use client';
import { useState } from 'react';
import { topics } from '../../constants/topics';
import { Jumbotron } from '../jumbotron';
import { FilterBar } from '../filter-bar';
import { FilterModal } from '../filter-modal';
import { TopicList } from '../topic-list';
import { CreateTopicButton } from '../topic-button';


export function ForumPageData() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredTopics = selectedTopic
    ? topics.filter((topic) => topic.topico === selectedTopic)
    : topics;

  return (
    <>
      <Jumbotron />
      <FilterBar onToggle={() => setFilterOpen(!filterOpen)} />
      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
      <TopicList topics={filteredTopics} />
      <CreateTopicButton />
    </>
  );
}
