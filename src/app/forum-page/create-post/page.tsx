import { AuthGate } from '@/global/components/authGate/authGate';
import { CreatePostData } from '@/modules/create-post/components/content';

export const metadata = {
  title: 'Criar Tópico',
};

export default function CreatePostPage() {
  return (
    <AuthGate mode="auth">
      <CreatePostData />
    </AuthGate>
  );
}
