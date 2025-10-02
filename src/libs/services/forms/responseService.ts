// src/libs/services/forms/responseService.ts
import { api } from '@/libs/http/axios';
import { getValidToken } from '@/global/utils/auth';

export async function sendResponses(formId: string, usuario: string, respostas: (number | number[] | string)[]) {
  const token = getValidToken();
  const res = await api.post(`/forms/${formId}/responses`, {
    usuario,
    respostas,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

