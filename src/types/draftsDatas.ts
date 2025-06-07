import { CreateComplaintData } from '@/modules/complaints/schemas/create-complaint-schema';
import { CreateFormData } from "@/modules/create-post/schemas/create-form.schema";

export type PostDraftData = CreateFormData & {
  id: string;
  date: string;
};

export type ComplaintsDraftData = CreateComplaintData & {
  id: string;
  date: string;
};