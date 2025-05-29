import { ProtectedPage } from '@/global/components/protectedPage';
import { CreatePostData } from '@/modules/create-post/components/content';

export const metadata = {
  title: 'Criar Tópico',
};

export default function CreatePostPage() {
  return (
    <ProtectedPage>
      <CreatePostData />
    </ProtectedPage>
  );
}
