import { z } from 'zod';

export const createRegisterFormSchema = z
  .object({
    name: z.string().nonempty('Nome inválido!'),
    username: z.string().nonempty('Nome de Usuário Inválido!').regex(/^\S+$/, 'Nome de Usuário Inválido!'),
    email: z.string().email('E-mail inválido'),
    institution: z.string().nonempty('Instituição inválida!'),
    course: z.string().nonempty('Curso inválido!'),
    grade: z.string().nonempty('Série inválida!'),
    password: z.string().nonempty('Senha inválida!'),
    confirmPassword: z.string().nonempty('Confirmação de senha inválida!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem!',
    path: ['confirmPassword'],
  })
  
export type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;
