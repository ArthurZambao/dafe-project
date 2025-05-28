'use client';

import { ProtectedPage } from '@/global/components/protectedPage';
import { ForumPageData } from '@/modules/forum-page/components/content';

export default function ForumPage() {
  return (
    <ProtectedPage>
      <ForumPageData />
    </ProtectedPage>
  );
}
