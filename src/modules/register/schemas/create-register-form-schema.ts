import { z } from 'zod';

export const createRegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Nome muito curto!') 
      .max(100, 'Nome muito longo!'), 

    username: z
      .string()
      .min(4, 'Nome de Usuário muito curto!') 
      .max(20, 'Nome de Usuário muito longo!') 
      .regex(/^\S+$/, 'Nome de Usuário não pode conter espaços!'), 

    email: z
      .string()
      .email('E-mail inválido')
      .max(255, 'E-mail muito longo!'), 

    institution: z
      .string()
      .min(2, 'Instituição muito curta!')
      .max(100, 'Instituição muito longa!'),

    course: z
      .string()
      .min(2, 'Curso muito curto!')
      .max(100, 'Curso muito longo!'),

    grade: z
      .string()
      .min(1, 'Série inválida!')
      .max(10, 'Série inválida!'),

    password: z
      .string()
      .min(8, 'A senha precisa ter no mínimo 8 caracteres!')
      .regex(/[A-Z]/, 'A senha precisa de pelo menos uma letra maiúscula!')
      .regex(/[a-z]/, 'A senha precisa de pelo menos uma letra minúscula!')
      .regex(/[0-9]/, 'A senha precisa de pelo menos um número!')
      .regex(/[\W_]/, 'A senha precisa de pelo menos um caractere especial!')
      .max(255, 'Senha muito longa!'),

    confirmPassword: z
      .string()
      .min(8, 'A confirmação de senha precisa ter no mínimo 8 caracteres!')
      .max(255, 'Confirmação de senha muito longa!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem!',
    path: ['confirmPassword'],
  })

export type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;
