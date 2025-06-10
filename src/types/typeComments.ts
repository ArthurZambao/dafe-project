import { PostAutor } from "./postAutor";
import { typePostList } from "./typePostList";

export interface typeComments {
  _id: string;
  conteudo: string;
  data: string;
  autor: PostAutor;
  post: typePostList;
}