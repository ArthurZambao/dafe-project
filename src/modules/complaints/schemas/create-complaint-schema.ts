import { z } from 'zod';

export const createComplaintSchema = z.object({
  titulo: z.string().nonempty('Título é obrigatório!'),
  conteudo: z.string().nonempty('denuncia é obrigatório!'),
  topico: z.string().nonempty('Tópico obrigatório!'),
});

export type CreateComplaintData = z.infer<typeof createComplaintSchema>;