import { api } from "@/libs/http/axios";


// Tipagem opcional, ajuda muito
export type Post = {
  id: string;
  titulo: string;
  conteudo: string;
  autor: { id: string; nome: string };
  createdAt: string;
  updatedAt: string;
};

export async function getPostById(postId: string) {
  const res = await api.get<Post>(`/posts/${postId}`, {
    headers: { "Cache-Control": "no-store" }, // força a não cachear
  });
  return res.data;
}

export async function listPosts() {
  const res = await api.get<Post[]>("/posts", {
    headers: { "Cache-Control": "no-store" },
  });
  return res.data;
}
