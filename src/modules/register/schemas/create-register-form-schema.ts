import { z } from 'zod';

export const createRegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Nome Inválido!')
      .max(100, 'Nome Inválido!')
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Nome Inválido!'),

    username: z
      .string()
      .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.')
      .max(20, 'O nome de usuário deve ter no máximo 20 caracteres.')
      .regex(/^[a-zA-Z0-9_]+$/, 'O nome de usuário só pode conter letras!'),

    email: z
      .string()
      .email('E-mail inválido!')
      .min(5, 'E-mail inválido!')
      .max(100, 'E-mail inválido!'),

    institution: z
      .string()
      .min(2, 'Instituição inválida!')
      .max(100, 'Instituição inválida!'),

    course: z
      .string()
      .min(2, 'Curso inválido!')
      .max(100, 'Curso inválido!'),

    grade: z
      .string()
      .min(1, 'Série inválida!')
      .max(20, 'Série inválida!'),

    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
      .max(64, 'A senha deve ter no máximo 64 caracteres.')
      .regex(/[A-Z]/, 'A senha deve conter ao menos uma letra maiúscula.')
      .regex(/[a-z]/, 'A senha deve conter ao menos uma letra minúscula.')
      .regex(/[0-9]/, 'A senha deve conter ao menos um número.')
      .regex(/[^A-Za-z0-9]/, 'A senha deve conter ao menos um caractere especial.'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem!',
    path: ['confirmPassword'],
  });

export type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;
