'use client';

import { ProtectedPage } from '@/global/components/protectedPage';
import { PostPageData } from '@/modules/post/components/content';

import { useParams } from 'next/navigation';

export default function PostPage() {
  const { postId } = useParams();

  if (typeof postId !== 'string') return null;

  return (
    <ProtectedPage>
      <PostPageData postId={postId} />
    </ProtectedPage>
  );
}
