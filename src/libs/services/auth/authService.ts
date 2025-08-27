// src/services/auth/authService.ts
import { api } from '@/libs/http/axios';

export interface LoginData {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export async function loginRequest(data: LoginData): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/login-jwt', data);
  return response.data;
}
