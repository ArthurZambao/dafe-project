import { z } from 'zod';

export const createLoginFormSchema = z.object({
  email: z
    .string()
    .min(5, 'E-mail Inválido!')
    .max(100, 'E-mail Inválido!')
    .email('E-mail inválido!'),

  password: z
    .string()
    .min(8, 'Senha Inválida!')
    .max(64, 'Senha Inválida!')
    .nonempty('Senha inválida!'),

  remember: z.boolean().optional(),
});

export type CreateLoginFormData = z.infer<typeof createLoginFormSchema>;
