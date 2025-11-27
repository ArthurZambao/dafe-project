import { api } from '@/libs/http/axios';
import { getValidToken } from '@/global/utils/auth';

export type SubmittedAnswer = string | string[] | number | number[];

export interface FormAnswer {
  questionId: string;
  questionText: string;
  submittedAnswer: SubmittedAnswer;
}


export async function sendResponses(formId: string, respostas: FormAnswer[]) {
  const token = getValidToken();

  const res = await api.post('/responses', {
    formIdOrSlug: formId,
    respostas,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
}