import { api } from "@/libs/http/axios";
import { PostApiType } from "@/types/post";

export async function getPostById(postId: string) {
  const res = await api.get<PostApiType>(`/posts/${postId}`, {
    headers: { "Cache-Control": "no-store" }, // força a não cachear
  });
  return res.data;
}

export async function listPosts() {
  const res = await api.get<PostApiType[]>("/posts", {
    headers: { "Cache-Control": "no-store" },
  });
  return res.data;
}
