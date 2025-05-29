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