interface NoticeAuthor {
  _id: string;
  nome: string;
  usuario: string;
  instituicao: string;
  role: string;
}

export interface NoticeFromAPI {
  _id: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  imageUrl?: string;
  slugify: string;
  autor: NoticeAuthor;
  createdAt: string;
  updateAt: string;
  cursoDestino: 'Desenvolvimento de Sistemas' | 'Administração' | 'Logística' | 'Gestão de Recursos Humanos' | 'Marketing' | 'Todos os Cursos';
}
