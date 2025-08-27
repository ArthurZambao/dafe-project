import { api } from '@/libs/http/axios';
import { getValidToken } from '@/global/utils/auth';
import { CreateFormData } from '@/modules/create-post/schemas/create-form.schema';
import { typePostList } from '@/types/typePostList';

// Função para criar um novo post
export async function createPost(data: CreateFormData) {
  const token = getValidToken();
  const response = await api.post('/posts', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Função para obter todos os posts ou por tópico
export async function getPosts(filter?: string): Promise<typePostList[]> {
  const endpoint = filter ? `/posts?topico=${filter}` : `/posts`;
  const res = await api.get<typePostList[]>(endpoint);
  return res.data;
}

// Função para obter posts de um usuário específico
export async function getUserPosts(userId: string): Promise<typePostList[]> {
  const res = await api.get<typePostList[]>(`/posts?autor=${userId}`);
  return res.data;
}

// Função para deletar um post
export async function deletePost(postId: string) {
  const token = getValidToken();
  await api.delete(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}


