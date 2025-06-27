// app/forum-page/[postId]/page.tsx

import type { Metadata } from 'next';
import { PostPageData } from '@/modules/post/components/content';
import { AuthGate } from '@/global/components/authGate/authGate';
import { api } from '@/libs/api/axios';


export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { postId: string } | Promise<{ postId: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const postId = awaitedParams.postId;

  try {
    const { data: post } = await api.get(`/posts/${postId}`, {
      
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return {
      title: post.titulo ?? 'Postagem',
    };
  } catch {
    return {
      title: 'Postagem',
    };
  }
}

export default async function PostPage({
  params,
}: {
  params: { postId: string } | Promise<{ postId: string }>;
}) {
  const awaitedParams = await params;
  const postId = awaitedParams.postId;

  return (
    <AuthGate mode="auth">
      <PostPageData postId={postId} />
    </AuthGate>
  );
}
