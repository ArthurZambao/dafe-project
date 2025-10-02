import { api } from "@/libs/http/axios";
import { getValidToken } from "@/global/utils/auth";
import { CreateFormDataSchema } from "@/modules/create-form/schemas/create-form-schema";
import { StoredForm } from "@/types/form";


export async function createForm(data: CreateFormDataSchema) {
  const token = getValidToken();
  const response = await api.post("/forms", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getForms(): Promise<StoredForm[]> {
  const token = getValidToken();
  const res = await api.get<StoredForm[]>("/forms", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getFormById(id: string) {
  const response = await api.get(`/forms/${id}`);
  return response.data;
}

export async function deleteForm(id: string) {
  const token = getValidToken();
  await api.delete(`/forms/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
