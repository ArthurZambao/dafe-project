'use client';

import { ProtectedPage } from '@/global/components/protectedPage';
import { TopicPageData } from '@/modules/post/components/content';

export default function TopicPage() {
  return (
    <ProtectedPage>
      <TopicPageData />
    </ProtectedPage>
  );
}
