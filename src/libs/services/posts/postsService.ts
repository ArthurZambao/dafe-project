import { api } from '@/libs/http/axios';
import { getValidToken } from '@/global/utils/auth';
import { typePostList } from '@/types/typePostList';

export async function createPost(data: FormData) {
  const token = getValidToken();
  const response = await api.post('/posts', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function getPosts(filter?: string): Promise<typePostList[]> {
  const endpoint = filter ? `/posts?topico=${filter}` : `/posts`;
  const res = await api.get<typePostList[]>(endpoint);
  return res.data;
}

export async function getUserPosts(userId: string): Promise<typePostList[]> {
  const res = await api.get<typePostList[]>(`/posts?autor=${userId}`);
  return res.data;
}
export async function deletePost(postId: string) {
  const token = getValidToken();
  await api.delete(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}


