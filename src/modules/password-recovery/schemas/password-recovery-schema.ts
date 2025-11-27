import { z } from 'zod';

export const PasswordRecoverySchema = z.object({
  email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório!'),
});

export type PasswordRecoveryFormData = z.infer<typeof PasswordRecoverySchema>;
