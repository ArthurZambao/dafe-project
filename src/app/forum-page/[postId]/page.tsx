import type { Metadata } from "next";
import { PostPageData } from "@/modules/post/components/content";
import { AuthGate } from "@/global/components/authGate/authGate";
import { getPostById } from "@/libs/api/posts/posts";

export const dynamic = "force-dynamic";

type ForumPostPageProps = {
  params: Promise<{ postId: string }>;
};

export async function generateMetadata(
  props: ForumPostPageProps
): Promise<Metadata> {
  const { postId } = await props.params;

  try {
    const post = await getPostById(postId);
    return {
      title: post?.titulo ?? "Postagem",
    };
  } catch {
    return {
      title: "Postagem",
      description: "Conteúdo da postagem não encontrado ou inacessível.",
    };
  }
}

export default async function PostPage(props: ForumPostPageProps) {
  const { postId } = await props.params;

  return (
    <AuthGate mode="auth">
      <PostPageData postId={postId} />
    </AuthGate>
  );
}
