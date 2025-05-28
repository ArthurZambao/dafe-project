'use client';

import { ProtectedPage } from '@/global/components/protectedPage';
import { CreateTopicData } from '@/modules/create-topic/components/content';

export default function CreateTopicPage() {
  return (
  <ProtectedPage>
    <CreateTopicData />
  </ProtectedPage>
  );
}
