import { z } from 'zod';

export const createFormSchema = z.object({
  topicTitle: z.string().nonempty('Título é obrigatório!'),
  topicDescription: z.string().nonempty('Descrição é obrigatória!'),
  topicMain: z.string().nonempty('assunto é obrigatório!'),
  selectTopic: z.string().nonempty('Selecione um tópico!'),
});

export type CreateFormData = z.infer<typeof createFormSchema>;
