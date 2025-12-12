import type { Metadata } from "next";
import { PostPageData } from "@/modules/post/components/content";
import { AuthGate } from "@/global/components/authGate/authGate";
import { getPostById } from "@/libs/api/posts/posts"; 

export const dynamic = "force-dynamic";

// Defina o tipo MANUALMENTE para ignorar o bug da Vercel/Next
type PageParams = {
  params: {
    postId: string;
  };
};

// ----------------------
// METADATA
// ----------------------
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const postId = params.postId;

  try {
    const post = await getPostById(postId); 
    return {
      title: post.titulo ?? "Postagem",
    };
  } catch {
    return {
      title: "Postagem",
    };
  }
}

// ----------------------
// PAGE COMPONENT
// ----------------------
export default async function PostPage({ params }: PageParams) {
  const postId = params.postId;

  return (
    <AuthGate mode="auth">
      <PostPageData postId={postId} />
    </AuthGate>
  );
}
