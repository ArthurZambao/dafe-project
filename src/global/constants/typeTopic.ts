export interface typeTopic {
  post_id: number;
  post_titulo: string;
  post_usuario: string;
  post_conteudo: string;
  post_descricao: string;
  post_data: string; // formato: 'YYYY-MM-DD'
  post_topico: 'aulas' | 'diretores' | 'alunos' | 'atividades' | 'extracurriculares';
  post_interacao: number;
}