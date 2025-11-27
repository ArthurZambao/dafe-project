import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/pmg', 'image/webp'];

export const createNoticeSchema = z.object({
  titulo: z.string().min(3, 'Título é obrigatório'),
  descricao: z.string().min(3, 'Descrição é obrigatória'),
  conteudo: z.string().min(10, 'Conteúdo é obrigatório'),
  cursoDestino: z.string().optional(),
  moduloDestino: z.string().optional(),

  anexos: z
    .custom<FileList>()
    .refine((files) => !files || files.length <= 1, 'Máximo de 1 arquivo.')
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      'O tamanho máximo é 5MB.'
    )
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      'Formato inválido. Use JPG, JPEG, PNG ou WEBP.'
    )
    .optional(),
});

export type CreateNoticeDataSchema = z.infer<typeof createNoticeSchema>;
