import type { Metadata } from "next";
import { PostPageData } from "@/modules/post/components/content";
import { AuthGate } from "@/global/components/authGate/authGate";
import { getPostById } from "@/libs/api/posts/posts"; 

export const dynamic = "force-dynamic";

// 1. Defina o tipo base dos parâmetros de rota
type PostPageParams = {
  postId: string;
};

// 2. Defina o tipo de Props completo para os componentes de página (Page e generateMetadata)
// É mais seguro usar um nome específico (ex: ForumPostPageProps) em vez de PageParams
// para evitar conflitos com definições de tipo globais.
type ForumPostPageProps = {
  params: PostPageParams;
};

// ----------------------
// METADATA
// ----------------------
export async function generateMetadata({ params }: ForumPostPageProps): Promise<Metadata> {
  // Garantimos que 'params' é o objeto esperado, e não uma Promise.
  const postId = params.postId;

  try {
    const post = await getPostById(postId); 
    return {
      title: post.titulo ?? "Postagem",
      // Adicione a descrição ou outras meta tags aqui, se necessário
    };
  } catch {
    return {
      title: "Postagem",
      description: "Conteúdo da postagem não encontrado ou inacessível.",
    };
  }
}

// ----------------------
// PAGE COMPONENT
// ----------------------
// Aplica o tipo renomeado aqui também.
export default async function PostPage({ params }: ForumPostPageProps) {
  const postId = params.postId;

  return (
    <AuthGate mode="auth">
      <PostPageData postId={postId} />
    </AuthGate>
  );
}