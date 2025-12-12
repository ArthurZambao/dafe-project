import { z } from 'zod';

export const createEditUserFormSchema = z
  .object({
    nome: z
      .string()
      .min(3, 'Nome Inválido!')
      .max(100, 'Nome Inválido!')
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Nome Inválido!'),

    usuario: z
      .string()
      .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.')
      .max(20, 'O nome de usuário deve ter no máximo 20 caracteres.')
      .regex(/^[a-zA-Z0-9_]+$/, 'O nome de usuário só pode conter letras!'),

    email: z
      .string()
      .email('E-mail inválido!')
      .min(5, 'E-mail inválido!')
      .max(100, 'E-mail inválido!'),

    instituicao: z
      .string()
      .min(2, 'Instituição inválida!')
      .max(100, 'Instituição inválida!'),

    curso: z
      .string().optional(),
    modulo: z
      .string().optional(),

    senha: z
      .string()
      .optional()
      .transform(val => val === "" ? undefined : val)
      .refine(
        (val) => {
          if (!val) return true; // Se não informou senha → OK
          return val.length >= 8;
        },
        { message: "A senha deve ter no mínimo 8 caracteres." }
      )
      .refine(
        (val) => {
          if (!val) return true;
          return /[A-Z]/.test(val);
        },
        { message: "A senha deve conter ao menos uma letra maiúscula." }
      )
      .refine(
        (val) => {
          if (!val) return true;
          return /[a-z]/.test(val);
        },
        { message: "A senha deve conter ao menos uma letra minúscula." }
      )
      .refine(
        (val) => {
          if (!val) return true;
          return /[0-9]/.test(val);
        },
        { message: "A senha deve conter ao menos um número." }
      )
      .refine(
        (val) => {
          if (!val) return true;
          return /[^A-Za-z0-9]/.test(val);
        },
        { message: "A senha deve conter ao menos um caractere especial." }
      ),
    anexos: z
      .any()
      .optional(),
  })


export type CreateEditUserFormData = z.infer<typeof createEditUserFormSchema>;
