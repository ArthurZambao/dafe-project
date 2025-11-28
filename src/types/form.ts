export type StoredForm = {
  _id: string;
  formTitulo: string;
  formDesc: string;
  perguntas: {
    _id: string; 
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
  isAnswered?: boolean;
};
