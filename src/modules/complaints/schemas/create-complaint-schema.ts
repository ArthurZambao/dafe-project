import { z } from 'zod';

export const createComplaintSchema = z.object({
  complaintTitle: z.string().nonempty('Título é obrigatório!'),
  complaintMain: z.string().nonempty('denuncia é obrigatório!'),
  selectComplaintTopic: z.string().nonempty('Tópico obrigatório!'),
});

export type CreateComplaintData = z.infer<typeof createComplaintSchema>;