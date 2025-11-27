export interface CustomJwtPayload {
  nome: string;
  email: string;
  usuario: string;
  instituicao: string;
  id: string;
  modulo?: string;
  curso?: string;
  periodo?: string;
  exp?: number;
  role: 'student' | 'teacher' | 'admin' | 'manager';
  imageUrl?: string;
}
