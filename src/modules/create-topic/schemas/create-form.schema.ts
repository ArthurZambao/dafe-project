import { z } from 'zod';

export const createFormSchema = z.object({
  titulo: z.string().nonempty('Título é obrigatório!'),
  descricao: z.string().nonempty('Descrição é obrigatória!'),
  conteudo: z.string().nonempty('Assunto é obrigatório!'),
  topico: z.string().nonempty('Selecione um tópico!'),
  interacao: z.number().optional(),
});

export type CreateFormData = z.infer<typeof createFormSchema>;
