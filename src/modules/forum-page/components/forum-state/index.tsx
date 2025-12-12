import { typePostList } from '@/types/typePostList';
import { PostList } from '../post-list';
import { SlideIn } from '@/global/animations/slideIn';

interface ForumStateProps {
  posts: typePostList[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

export function ForumState({ posts, loading, error, message }: ForumStateProps) {
  if (loading)
    return <p className="min-h-screen text-center text-white text-lg">Carregando tópicos...</p>;
  if (error) return <p className="text-center text-red-500 text-lg min-h-screen pt-10">{error}</p>;
  if (message)
    return <p className="text-center text-gray-500 text-lg min-h-screen pt-10">{message}</p>;

  return (
    <SlideIn from="bottom" triggerOnView={false}>
      <PostList posts={posts} />
    </SlideIn>
  );
}
