export type StoredForm = {
  id: string;
  formTitulo: string;
  formDesc: string;
  perguntas: {
    tipo: 'MÚLTIPLA_ESCOLHA' | 'ESCOLHA_ÚNICA' | 'DISSERTATIVA';
    titulo: string;
    enunciado: string;
    obrigatoria: boolean;
    opcoes?: { label: string; checked: boolean }[];
    resposta?: string;
  }[];
  data_final?: string;
  respostasCount?: number;
  createdAt?: string;
};
