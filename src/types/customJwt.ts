export interface CustomJwtPayload {
  id: string;
  nome: string;
  email: string;
  usuario: string;
  instituicao: string;
  modulo?: string;
  curso?: string;
  periodo?: string;
  exp?: number;
  role: 'student' | 'professor' | 'admin' | 'manager';
  imageUrl?: string;
}
