import { z } from 'zod';

const baseSchema = {
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

  senha: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .max(64, 'A senha deve ter no máximo 64 caracteres.')
    .regex(/[A-Z]/, 'A senha deve conter ao menos uma letra maiúscula.')
    .regex(/[a-z]/, 'A senha deve conter ao menos uma letra minúscula.')
    .regex(/[0-9]/, 'A senha deve conter ao menos um número.')
    .regex(/[^A-Za-z0-9]/, 'A senha deve conter ao menos um caractere especial.'),

  confirmarSenha: z.string(),
};

// Schema para aluno (curso e modulo obrigatórios)
const studentSchema = z
  .object({
    role: z.literal('student'),
    curso: z.string({ required_error: 'Curso é obrigatório.' }),
    modulo: z.string({ required_error: 'Ano escolar é obrigatório.' }),
  })
  .merge(z.object(baseSchema))
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem!',
    path: ['confirmarSenha'],
  });

// Schema para professor (curso e modulo opcionais)
const professorSchema = z
  .object({
    role: z.literal('professor'),
    curso: z.string().optional(),
    modulo: z.string().optional(),
  })
  .merge(z.object(baseSchema))
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem!',
    path: ['confirmarSenha'],
  });

// Union of schemas due to use of .refine()
export const createRegisterFormSchema = z.union([
  studentSchema,
  professorSchema,
]);

export type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;
