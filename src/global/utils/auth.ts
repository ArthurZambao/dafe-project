import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function getValidToken(): string | null {
  const token = Cookies.get('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      Cookies.remove('token');
      return null;
    }
    return token;
  } catch {
    Cookies.remove('token');
    return null;
  }
}
