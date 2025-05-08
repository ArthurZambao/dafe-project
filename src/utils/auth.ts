import { jwtDecode } from 'jwt-decode';

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const now = Date.now() / 1000; // em segundos
    return decoded.exp > now; // ainda não expirado
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return false;
  }
}
