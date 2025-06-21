import { AuthGate } from '@/global/components/authGate/authGate';
import { ForumPageData } from '@/modules/forum-page/components/content';

export const metadata = {
  title: 'Fórum',
};

export default function ForumPage() {
  return (
    <AuthGate mode="auth">
      <ForumPageData />
    </AuthGate>
  );
}
