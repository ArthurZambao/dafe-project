import { ProtectedPage } from '@/global/components/protectedPage';
import { ForumPageData } from '@/modules/forum-page/components/content';

export const metadata = {
  title: 'Fórum',
};

export default function ForumPage() {
  return (
    <ProtectedPage>
      <ForumPageData />
    </ProtectedPage>
  );
}
