'use client';

import { ProtectedPage } from '@/global/components/protectedPage';
import { UserPageData } from '@/modules/user-page/components/content';

export default function CreateTopicPage() {
  return (
    <ProtectedPage>
      <UserPageData />
    </ProtectedPage>
  );
}
