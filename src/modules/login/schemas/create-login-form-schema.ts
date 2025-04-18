import { z } from 'zod';

export const createLoginFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().nonempty('Senha inválida!'),
  remember: z.boolean().optional(),
});

export type CreateLoginFormData = z.infer<typeof createLoginFormSchema>;
