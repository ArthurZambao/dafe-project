import { z } from 'zod';

export const createFormSchema = z.object({
  post_titulo: z.string().nonempty('Título é obrigatório!'),
  post_descricao: z.string().nonempty('Descrição é obrigatória!'),
  post_conteudo: z.string().nonempty('Assunto é obrigatório!'),
  post_topico: z.string().nonempty('Selecione um tópico!'),
  post_interacao: z.number().optional(),
});

export type CreateFormData = z.infer<typeof createFormSchema>;
