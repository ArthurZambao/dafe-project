export interface typeTopic {
  id: number;
  titulo: string;
  usuario: string;
  conteudo: string;
  descricao: string;
  data: string; // formato: 'YYYY-MM-DD'
  topico: 'aulas' | 'diretores' | 'alunos' | 'atividades' | 'extracurriculares';
  interacao: number;
}