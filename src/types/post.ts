export type PostType = {
  id: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  interacoes: number;
  imagem: string;
  data: string;
  usuario: string;
  topico: string;
};

export type PostPageDataProps = {
  postId: string;
};

export type PostApiType = {
  id: string;
  titulo: string;
  conteudo: string;
  autor: { id: string; nome: string };
  createdAt: string;
  updatedAt: string;
};