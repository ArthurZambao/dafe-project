import { z } from "zod";

const optionSchema = z.object({
  label: z.string().min(1, 'Opção obrigatória'),
  checked: z.boolean().optional(), // só usado em múltipla escolha
});

const questionSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('MÚLTIPLA_ESCOLHA'),
    titulo: z.string().min(1, 'Título obrigatório'),
    enunciado: z.string().min(1, 'Enunciado obrigatório'),
    obrigatoria: z.boolean().optional(),
    opcoes: z.array(optionSchema).min(1, 'Adicione pelo menos uma opção'),
  }),
  z.object({
    tipo: z.literal('ESCOLHA_ÚNICA'),
    titulo: z.string().min(1, 'Título obrigatório'),
    enunciado: z.string().min(1, 'Enunciado obrigatório'),
    obrigatoria: z.boolean().optional(),
    opcoes: z.array(optionSchema).min(1, 'Adicione pelo menos uma opção'),
    resposta: z.number().optional(), // índice da opção selecionada
  }),
  z.object({
    tipo: z.literal('DISSERTATIVA'),
    titulo: z.string().min(1, 'Título obrigatório'),
    enunciado: z.string().min(1, 'Enunciado obrigatório'),
    obrigatoria: z.boolean().optional(),
    resposta: z.string().optional(),
  }),
]);

export const createFormSchema = z.object({
  formTitulo: z.string().min(3, 'Título obrigatório'),
  formDesc: z.string().min(3, 'Descrição obrigatória'),
  perguntas: z.array(questionSchema).optional(),
});

export type CreateFormDataSchema = z.infer<typeof createFormSchema>;
