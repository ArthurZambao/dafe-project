export interface CustomJwtPayload {
  nome: string;
  email: string;
  usuario: string;
  instituicao: string;
  id: string;
  modulo: string;
  curso: string;
  exp?: number;
  role: 'student' | 'teacher' | 'admin' | 'manager';
}
