import { Metadata } from 'next';
import { ProtectedPage } from '@/global/components/protectedPage';
import { PostPageData } from '@/modules/post/components/content';
import { getValidToken } from '@/global/utils/auth';

type Props = {
  params: { postId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = params;

  try {
    const token = getValidToken();
    const res = await fetch(`http://localhost:3030/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    const post = await res.json();
    return {
      title: post.titulo ?? 'Postagem',
    };
  } catch {
    return {
      title: 'Postagem',
    };
  }
}

export default async function PostPage({ params }: Props) {
  const { postId } = await params;

  return (
    <ProtectedPage>
      <PostPageData postId={postId} />
    </ProtectedPage>
  );
}
