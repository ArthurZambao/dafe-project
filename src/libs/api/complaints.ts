import { api } from "@/libs/http/axios";
import { CreateComplaintData } from "@/modules/complaints/schemas/create-complaint-schema";

// Tipos opcionais (se o backend devolver algo mais elaborado)
export type ComplaintResponse = {
  id: string;
  titulo: string;
  conteudo: string;
  topico: string;
  data: string;
};

export async function createComplaint(data: CreateComplaintData) {
  const res = await api.post<ComplaintResponse>("/complaints", data);
  return res.data;
}

export async function listComplaints() {
  const res = await api.get<ComplaintResponse[]>("/complaints");
  return res.data;
}
