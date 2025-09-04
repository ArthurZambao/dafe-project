import { api } from "@/libs/http/axios";
import { CreateComplaintData } from "@/modules/complaints/schemas/create-complaint-schema";
import { ComplaintResponse } from "@/types/complaints";

export async function createComplaint(data: CreateComplaintData) {
  const res = await api.post<ComplaintResponse>("/complaints", data);
  return res.data;
}

export async function listComplaints() {
  const res = await api.get<ComplaintResponse[]>("/complaints");
  return res.data;
}
