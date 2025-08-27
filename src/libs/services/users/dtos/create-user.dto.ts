// create-user.dto.ts
export interface CreateUserDTO {
  nome: string;
  usuario: string;
  email: string;
  instituicao: string;
  role: 'student' | 'professor';
  senha: string;
  confirmarSenha: string;
  studentDetails?: {
    curso: string;
    modulo: number;
  };
  professorDetails?: {
    matricula: number;
    periodo: string;
  };
}
