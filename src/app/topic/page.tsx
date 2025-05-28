'use client';

import { ProtectedPage } from '@/global/components/protectedPage';
import { TopicPageData } from '@/modules/topic/components/content';

export default function TopicPage() {
  return (
    <ProtectedPage>
      <TopicPageData />
    </ProtectedPage>
  );
}
