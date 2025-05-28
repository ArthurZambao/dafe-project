export interface typePost {
  _id: string;
  titulo: string;
  usuario: string;
  conteudo: string;
  descricao: string;
  data: string;
  topico: 'aulas' | 'diretores' | 'alunos' | 'atividades' | 'extracurriculares';
  interacao: number;
}