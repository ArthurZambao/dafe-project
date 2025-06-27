import { z } from 'zod';

export const createNoticeSchema = z.object({
  NoticiaTitulo: z.string().min(3, 'Título é obrigatório'),
  noticiaDesc: z.string().min(3, 'Descrição é obrigatória'),
  noticiaConteudo: z.string().min(10, 'Conteúdo é obrigatório'),
  imagem: z
    .any()
    .optional()
    .refine((file) => file instanceof File || file === undefined, {
      message: 'Imagem inválida',
    }),
});

export type CreateNoticeDataSchema = z.infer<typeof createNoticeSchema>;
