'use client';

import { ProtectedPage } from '@/global/components/protectedPage';
import { FormsPageData } from '@/modules/forms-page/components/content';

export default function CreateTopicPage() {
  return (
    <ProtectedPage>
      <FormsPageData />
    </ProtectedPage>
  );
}
