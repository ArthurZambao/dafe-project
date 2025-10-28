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
  slugify: string;
  autor: NoticeAuthor;
  createdAt: string;
  updateAt: string;
}

// estrutura de dados enviados pelo back