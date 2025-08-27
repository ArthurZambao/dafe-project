import { api } from '@/libs/http/axios';
import { typeComments } from '@/types/typeComments';

export async function getUserComments(userId: string): Promise<typeComments[]> {
  const response = await api.get(`/comments/User/${userId}`);
  return response.data;
}

export async function deleteComment(commentId: string): Promise<void> {
  await api.delete(`/comments/${commentId}`);
}
