export interface JwtPayload {
  nome: string;
  email: string;
  usuario: string;
  instituicao: string;
  id: string;
  modulo: string;
  curso: string;
  exp?: number;
}