'use client';

import { Filter } from '@/global/components/Filter';
import { forumFilterOptions } from '@/global/constants/forumFilterOptions';
import { AnimatedContent } from '@/global/animations/animatedContent';
import { ForumState } from '../forum-state';
import { useForumPosts } from '../../hooks/useForumPosts';

export function ForumPageData() {
  const { posts, selectedPost, setSelectedPost, loading, error, message } = useForumPosts();

  return (
    <AnimatedContent inverse>
      <Filter
        selectedFilter={selectedPost}
        setSelectedFilter={setSelectedPost}
        filterOptions={forumFilterOptions}
      />
      <ForumState posts={posts} loading={loading} error={error} message={message} />
    </AnimatedContent>
  );
}
