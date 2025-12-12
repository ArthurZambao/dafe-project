export type ComplaintResponse = {
  _id: string;
  titulo: string;
  conteudo: string;
  topico: string;
  data: string;
  status: 'Pendente' | 'Em Análise' | 'Resolvida' | 'Arquivada';
};