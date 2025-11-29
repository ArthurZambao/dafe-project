import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createNoticeSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, "Título deve ter ao menos 3 caracteres.")
    .max(100, "Título pode ter no máximo 100 caracteres.")
    .refine((v) => v.trim().length > 0, "Título não pode ser vazio."),

  descricao: z
    .string()
    .trim()
    .min(3, "Descrição deve ter ao menos 3 caracteres.")
    .max(300, "Descrição pode ter no máximo 300 caracteres.")
    .refine((v) => v.trim().length > 0, "Descrição não pode ser vazia."),

  conteudo: z
    .string()
    .trim()
    .min(10, "Conteúdo deve ter ao menos 10 caracteres.")
    .max(5000, "Conteúdo pode ter no máximo 5000 caracteres.")
    .refine((v) => v.trim().length > 0, "Conteúdo não pode ser vazio."),

  cursoDestino: z
    .string()
    .trim()
    .max(50, "Curso pode ter no máximo 50 caracteres.")
    .optional(),

  moduloDestino: z
    .string()
    .trim()
    .max(50, "Módulo pode ter no máximo 50 caracteres.")
    .optional(),

  anexos: z
    .custom<FileList>()
    .refine((files) => !files || files.length <= 1, "Máximo de 1 arquivo.")
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      "O tamanho máximo é 5MB."
    )
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      "Formato inválido. Use JPG, JPEG, PNG ou WEBP."
    )
    .optional(),
});

export type CreateNoticeDataSchema = z.infer<typeof createNoticeSchema>;
